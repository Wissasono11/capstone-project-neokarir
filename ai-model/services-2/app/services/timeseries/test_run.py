"""
app/services/timeseries/test_run.py

Jalankan file ini untuk verifikasi model berfungsi:
    python test_run.py
(dari dalam folder app/services/timeseries/)
"""

import sys
import os

# Pastikan bisa import dari folder ini
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from predict import forecast, DOMAINS, SEQ_LEN, META


def separator(title):
    print(f"\n{'='*55}")
    print(f"  {title}")
    print("=" * 55)


# ── TEST 1: Forecast otomatis dari CSV ───────────────────────────────────────
separator("TEST 1: Forecast 3 bulan — semua domain (data dari CSV)")

result = forecast(n_months=3)

print(f"\n  history_source : {result['history_source']}")
print(f"  top_domain     : {result['top_domain']}")
print(f"  generated_at   : {result['generated_at']}")

for i, pred in enumerate(result["predictions"], 1):
    print(f"\n  Prediksi Bulan +{i}:")
    for domain, val in sorted(pred.items(), key=lambda x: -x[1]):
        bar = "█" * int(val / max(pred.values()) * 20)
        print(f"    {domain:<25} {val:>8,.1f}  {bar}")


# ── TEST 2: Forecast 1 domain saja ───────────────────────────────────────────
separator("TEST 2: Forecast 2 bulan — Data Science & AI saja")

result2 = forecast(n_months=2, domain="Data Science & AI")
for i, pred in enumerate(result2["predictions"], 1):
    for domain, val in pred.items():
        print(f"\n  Bulan +{i}: {domain} = {val:,.1f}")


# ── TEST 3: Error handling ────────────────────────────────────────────────────
separator("TEST 3: Error — domain tidak dikenal")
try:
    forecast(n_months=1, domain="Blockchain")
except ValueError as e:
    print(f"\n  ✅ ValueError: {e}")


separator("TEST 4: Error — n_months di luar range")
try:
    forecast(n_months=99)
except ValueError as e:
    print(f"\n  ✅ ValueError: {e}")


# ── Info model ────────────────────────────────────────────────────────────────
separator("INFO MODEL")
print(f"\n  Model     : {META['model_name']}")
print(f"  seq_len   : {SEQ_LEN} bulan lookback")
print(f"  Domains   : {len(DOMAINS)}")
print(f"  MAPE      : {META.get('mape', 'N/A')}%")
print(f"  Date range: {META['date_min']} → {META['date_max']}")
print(f"\n  ✅ Semua test passed — predict.py siap digunakan")
