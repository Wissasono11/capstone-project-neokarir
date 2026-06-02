"""
app/services/timeseries/predict.py
"""

import os
import json
import pickle
import datetime
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras

# Monkeypatch Keras Layer deserialization to bypass quantization_config errors in some Keras 3 versions
original_layer_init = keras.layers.Layer.__init__
def patched_layer_init(self, *args, **kwargs):
    kwargs.pop("quantization_config", None)
    original_layer_init(self, *args, **kwargs)
keras.layers.Layer.__init__ = patched_layer_init


# ─── Custom Classes ───────────────────────────────────────────────────────────

class PositionalEncoding(keras.layers.Layer):
    def __init__(self, seq_len, d_model, **kwargs):
        super().__init__(**kwargs)
        self.seq_len = seq_len
        self.d_model = d_model
        p = np.arange(seq_len)[:, None]
        d = np.arange(d_model)[None, :]
        a = p / np.power(10000, (2 * (d // 2)) / d_model)
        a[:, 0::2] = np.sin(a[:, 0::2])
        a[:, 1::2] = np.cos(a[:, 1::2])
        self.pe = tf.cast(a[None], tf.float32)

    def call(self, inputs):
        return inputs + self.pe[:, :tf.shape(inputs)[1], :]

    def get_config(self):
        config = super().get_config()
        config.update({"seq_len": self.seq_len, "d_model": self.d_model})
        return config


class TemporalAttention(keras.layers.Layer):
    def __init__(self, units, **kwargs):
        super().__init__(**kwargs)
        self.units = units
        self.W = keras.layers.Dense(units, use_bias=False)
        self.V = keras.layers.Dense(1,     use_bias=False)

    def call(self, inputs):
        w = tf.nn.softmax(self.V(tf.nn.tanh(self.W(inputs))), axis=1)
        return tf.reduce_sum(w * inputs, axis=1), w

    def get_config(self):
        config = super().get_config()
        config.update({"units": self.units})
        return config


class TrendAwareLoss(keras.losses.Loss):
    def __init__(self, dir_weight=0.2, **kwargs):
        super().__init__(**kwargs)
        self.dir_weight = dir_weight

    def call(self, y_true, y_pred):
        y_true = tf.cast(y_true, tf.float32)
        y_pred = tf.cast(y_pred, tf.float32)
        mae    = tf.reduce_mean(tf.abs(y_true - y_pred))
        ref    = tf.constant(0.5, dtype=tf.float32)
        wrong  = tf.cast(
            tf.not_equal(tf.sign(y_true - ref), tf.sign(y_pred - ref)),
            tf.float32)
        return mae + self.dir_weight * tf.reduce_mean(
            wrong * tf.abs(y_true - y_pred))

    def get_config(self):
        config = super().get_config()
        config.update({"dir_weight": self.dir_weight})
        return config


# ─── Load aset model (sekali saat module di-import) ──────────────────────────

BASE_DIR    = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH  = os.path.join(BASE_DIR, "model", "it_trend_model.keras")
SCALER_PATH = os.path.join(BASE_DIR, "model", "domain_scalers.pkl")
META_PATH   = os.path.join(BASE_DIR, "model", "model_metadata.json")
CSV_PATH    = os.path.join(BASE_DIR, "model", "market_trend_smooth.csv")

CUSTOM_OBJECTS = {
    "PositionalEncoding": PositionalEncoding,
    "TemporalAttention" : TemporalAttention,
    "TrendAwareLoss"    : TrendAwareLoss,
}

with open(META_PATH) as f:
    META = json.load(f)

with open(SCALER_PATH, "rb") as f:
    SCALERS = pickle.load(f)

MODEL   = keras.models.load_model(MODEL_PATH, custom_objects=CUSTOM_OBJECTS)
SEQ_LEN = META["seq_len"]   # 12
DOMAINS = META["domains"]   # 9 domain


# ─── Helper ──────────────────────────────────────────────────────────────────

def _load_history_from_csv() -> list:
    """Baca 12 bulan terakhir dari CSV sebagai pengganti database."""
    df = pd.read_csv(CSV_PATH)
    df["date_recorded"] = pd.to_datetime(df["date_recorded"])

    pivot = (df.groupby(["date_recorded", "job_domain"])["demand_count"]
               .sum()
               .reset_index()
               .pivot(index="date_recorded", columns="job_domain",
                      values="demand_count")
               .sort_index()
               .fillna(0))

    recent = pivot.tail(SEQ_LEN)
    history = []
    for date_idx, row in recent.iterrows():
        history.append({
            "date"  : date_idx.strftime("%Y-%m-%d"),
            "demand": {d: float(row.get(d, 0.0)) for d in DOMAINS},
        })
    return history


def _scale(raw_window: np.ndarray) -> np.ndarray:
    log_v = np.log1p(raw_window.astype(np.float32))
    sc_v  = np.zeros_like(log_v)
    for i, domain in enumerate(DOMAINS):
        sc_v[:, i] = SCALERS[domain].transform(log_v[:, i:i+1]).ravel()
    return sc_v


def _inverse(sc_arr: np.ndarray) -> np.ndarray:
    log_v = np.zeros(len(DOMAINS), dtype=np.float32)
    for i, domain in enumerate(DOMAINS):
        log_v[i] = SCALERS[domain].inverse_transform([[sc_arr[i]]])[0, 0]
    return np.expm1(log_v)


# ─── Fungsi utama ─────────────────────────────────────────────────────────────

def forecast(history: list = None, n_months: int = 3,
             domain: str = None) -> dict:
    """
    Prediksi demand job IT N bulan ke depan.

    Parameters
    ----------
    history  : list of dict, opsional.
               Format: [{"date": "YYYY-MM-DD", "demand": {domain: count}}]
               Jika None → otomatis baca dari market_trend_smooth.csv
               Minimal 12 item jika diisi manual.
    n_months : int 1–12, default 3.
    domain   : str opsional. Jika diisi, hanya return domain tersebut.

    Returns
    -------
    dict dengan keys: predictions, top_domain, generated_at, history_source
    """
    # Ambil data historis
    if not history:
        history        = _load_history_from_csv()
        history_source = "csv"
    else:
        history_source = "request"

    # Validasi input
    if len(history) < SEQ_LEN:
        raise ValueError(
            f"Butuh minimal {SEQ_LEN} bulan history. Diterima: {len(history)}")
    if not (1 <= n_months <= 12):
        raise ValueError("n_months harus antara 1 dan 12")
    if domain and domain not in DOMAINS:
        raise ValueError(
            f"Domain '{domain}' tidak dikenal. Pilihan: {DOMAINS}")

    # Bangun input window
    raw_window = np.zeros((SEQ_LEN, len(DOMAINS)), dtype=np.float32)
    for t, record in enumerate(history[-SEQ_LEN:]):
        for i, dom in enumerate(DOMAINS):
            raw_window[t, i] = float(record["demand"].get(dom, 0.0))

    sc_window   = _scale(raw_window)
    predictions = []

    # Auto-regressive forecasting
    for _ in range(n_months):
        pred_sc  = MODEL.predict(sc_window[np.newaxis], verbose=0)[0]
        pred_act = _inverse(pred_sc)
        entry    = {dom: round(float(pred_act[i]), 1)
                    for i, dom in enumerate(DOMAINS)}
        if domain:
            entry = {domain: entry[domain]}
        predictions.append(entry)
        sc_window = np.vstack([sc_window[1:], pred_sc])

    top = max(predictions[0], key=predictions[0].get) if not domain else domain

    return {
        "predictions"   : predictions,
        "top_domain"    : top,
        "generated_at"  : datetime.datetime.now().isoformat() + "Z",
        "history_source": history_source,
    }
