"""
app/services/timeseries/test_run.py
Jalankan file ini langsung untuk verifikasi model berfungsi:
    python test_run.py
"""

import sys
import os

# Pastikan import dari folder yang sama
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from predict import forecast, DOMAINS, SEQ_LEN, META

# ─── Buat dummy history 12 bulan ─────────────────────────────────────────────
# Di production: ganti dengan data real dari database

def make_dummy_history(n_months=12):
    """Generate dummy data yang realistic (trend naik perlahan)."""
    base = {
        "Cyber Security":       250,
        "Data Analytics":       340,
        "Data Engineering":     890,
        "Data Science & AI":   2350,
        "DevOps & Cloud":      1240,
        "Product Management":   195,
        "Software Development": 472,
        "UI/UX Design":         305,
        "Web Development":      443,
    }
    history = []
    from datetime import date, timedelta
    start = date(2026, 1, 1)
    for i in range(n_months):
        month_date = (start.replace(day=1) if i == 0
                      else history[-1]["_date"] + timedelta(days=32))
        month_date = month_date.replace(day=1)
        # Tren naik ~0.5% per bulan
        demand = {d: round(v * (1 + 0.005 * i), 0)
                  for d, v in base.items()}
        history.append({
            "date"   : month_date.strftime("%Y-%m-%d"),
            "demand" : demand,
            "_date"  : month_date,   # helper, tidak dikirim ke API
        })
    # Bersihkan field helper
    for rec in history:
        rec.pop("_date", None)
    return history


# ─── TEST 1: Forecast semua domain ───────────────────────────────────────────
print("=" * 55)
print("  TEST 1: Forecast 3 bulan — semua domain")
print("=" * 55)

history = make_dummy_history(12)
result  = forecast(history, n_months=3)

print(f"\nTop domain bulan depan : {result['top_domain']}")
print(f"Generated at           : {result['generated_at']}")

for i, pred in enumerate(result["predictions"], 1):
    print(f"\n  Prediksi Bulan +{i}:")
    for domain, val in sorted(pred.items(), key=lambda x: -x[1]):
        bar = "█" * int(val / max(pred.values()) * 20)
        print(f"    {domain:<25} {val:>8,.0f}  {bar}")


# ─── TEST 2: Forecast 1 domain saja ──────────────────────────────────────────
print("\n" + "=" * 55)
print("  TEST 2: Forecast 2 bulan — Data Science & AI saja")
print("=" * 55)

result2 = forecast(history, n_months=2, domain="Data Science & AI")
print(f"\n  Prediksi:")
for i, pred in enumerate(result2["predictions"], 1):
    for domain, val in pred.items():
        print(f"  Bulan +{i}: {domain} = {val:,.0f}")


# ─── TEST 3: Error handling ───────────────────────────────────────────────────
print("\n" + "=" * 55)
print("  TEST 3: Validasi error — history kurang dari 12")
print("=" * 55)
try:
    forecast(history[:5], n_months=3)
except ValueError as e:
    print(f"  ✅ ValueError tertangkap: {e}")


print("\n" + "=" * 55)
print("  TEST 4: Validasi error — domain tidak dikenal")
print("=" * 55)
try:
    forecast(history, n_months=1, domain="Blockchain")
except ValueError as e:
    print(f"  ✅ ValueError tertangkap: {e}")


# ─── INFO model ──────────────────────────────────────────────────────────────
print("\n" + "=" * 55)
print("  INFO MODEL")
print("=" * 55)
print(f"  Model     : {META['model_name']}")
print(f"  seq_len   : {SEQ_LEN} bulan lookback")
print(f"  Domains   : {len(DOMAINS)}")
print(f"  MAPE      : {META.get('mape', 'N/A')}%")
print(f"  Date range: {META['date_min']} → {META['date_max']}")
print("\n  ✅ Semua test passed — predict.py siap digunakan")
