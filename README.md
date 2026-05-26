# 🚀 NeoKarir - AI Recommendation & Scoring API

Repositori ini berisi layanan AI (Microservice) untuk aplikasi NeoKarir. Branch ini secara khusus menangani logika sistem Rekomendasi Karir, Job Match Score, Skill Gap Analysis, Learning Roadmap, dan **Job Market Trend Forecasting** menggunakan FastAPI dengan pendekatan Clean Architecture.

## 🛠️ Teknologi yang Digunakan
* Python 3.9+
* FastAPI (Web Framework)
* Uvicorn (ASGI Server)
* Pandas & Scikit-Learn (Data Processing & ML)
* TensorFlow >= 2.15 (Deep Learning — Job Market Trend)

---

## 📂 Struktur Folder dan File

* **`app/`**: Direktori utama berjalannya aplikasi API.
  * `main.py`: Entry point aplikasi. Berisi inisialisasi FastAPI dan seluruh daftar *endpoints*.
  * `config.py`: File untuk memuat dan melakukan *preprocessing* awal pada dataset (`master_job_catalog.csv`) ke dalam DataFrame Pandas.
  * `schemas.py`: Berisi definisi model Pydantic untuk validasi format *Request* dan *Response* data JSON dari/ke Back-end.
  * `taxonomy.py`: Standarisasi/kamus data untuk *mapping* AI.

* **`app/services/`**: *Business Logic* dari model AI.
  * `recommendation.py`: Algoritma untuk menghasilkan rekomendasi pekerjaan (Top N) berdasarkan profil user.
  * `scoring.py`: Menghitung persentase kecocokan (*Job Match Score*) antara profil kandidat dengan kriteria lowongan.
  * `skill_gap.py`: Menganalisis *missing skills* dan menghasilkan data untuk grafik radar (*Radar Chart*).
  * `roadmap.py`: Menghasilkan rekomendasi alur belajar (*Learning Roadmap*) per lowongan.
  * **`timeseries/`** *(Fitur Baru — Job Market Trend)*
    * `predict.py`: Logic utama — load model, baca CSV historis, jalankan prediksi.
    * `test_run.py`: Script verifikasi model berfungsi sebelum deploy.
    * `__init__.py`: File init module.
    * **`model/`**: Aset model *(semua 4 file wajib ada)*.
      * `it_trend_model.keras` — Model deep learning terlatih.
      * `domain_scalers.pkl` — Scaler normalisasi per domain.
      * `model_metadata.json` — Konfigurasi dan daftar domain.
      * `market_trend_smooth.csv` — Data historis 204 bulan (sumber prediksi).

* **`data/`**: Direktori penyimpanan dataset.
  * `master_job_catalog.csv`: Database utama katalog pekerjaan.
  * `dummy_user_profiles.csv`: Data testing profil user.
  * `roadmap_new.json`: Template data untuk *learning roadmap*.

---

## 🚀 Cara Menjalankan Server

### 1. Buat dan aktifkan virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac / Linux
python -m venv venv
source venv/bin/activate
```

### 2. Install semua library
```bash
pip install -r requirements.txt
```

### 3. Jalankan server
```bash
uvicorn app.main:app --reload
```

### 4. Akses Swagger UI
```
http://localhost:8000/docs
```

> ⚠️ **Windows:** Warning GPU TensorFlow saat startup adalah **normal**.
> Model tetap berjalan di CPU, hasil prediksi tidak terpengaruh.

---

## 📡 Daftar Endpoint API

### Endpoint Lama (tidak berubah)

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/` | Health check |
| POST | `/api/recommendation/dynamic` | Rekomendasi karir |
| POST | `/api/profile/score` | Job match score |
| POST | `/api/profile/skill-gap` | Skill gap & radar chart |
| GET | `/api/roadmap/job-sync/{job_id}` | Learning roadmap |

### Endpoint Baru — Job Market Trend

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/trend/domains` | List 9 domain IT |
| POST | `/api/trend/forecast` | Prediksi demand N bulan ke depan |

---

## 📈 Panduan Fitur Job Market Trend

### Cara Kerja

Model membaca **12 bulan terakhir** dari `market_trend_smooth.csv` secara otomatis, lalu memprediksi demand lowongan IT untuk N bulan ke depan. **Tidak perlu kirim data apapun dari frontend** — cukup panggil endpoint-nya.

### 9 Domain yang Diprediksi

`Cyber Security` · `Data Analytics` · `Data Engineering` · `Data Science & AI` · `DevOps & Cloud` · `Product Management` · `Software Development` · `UI/UX Design` · `Web Development`

---

### GET /api/trend/domains

Mengembalikan daftar domain IT yang tersedia.

**Response:**
```json
{
  "status": "success",
  "domains": ["Cyber Security", "Data Analytics", "Data Engineering",
              "Data Science & AI", "DevOps & Cloud", "Product Management",
              "Software Development", "UI/UX Design", "Web Development"],
  "total": 9
}
```

---

### POST /api/trend/forecast

Prediksi demand job IT N bulan ke depan.

**Request Body:**

```json
{
  "n_months": 3,
  "domain": null
}
```

| Field | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `n_months` | int | `3` | Jumlah bulan prediksi, antara 1–12 |
| `domain` | string \| null | `null` | Nama domain untuk filter. `null` = semua domain |
| `history` | list \| null | `null` | Data historis manual. Biarkan `null` — otomatis dari CSV |

**Contoh 1 — Prediksi 3 bulan, semua domain:**
```json
{
  "n_months": 3
}
```

**Contoh 2 — Prediksi 6 bulan, 1 domain saja:**
```json
{
  "n_months": 6,
  "domain": "Data Science & AI"
}
```

**Response:**
```json
{
  "status": "success",
  "n_months": 3,
  "predictions": [
    {
      "Cyber Security": 274.5,
      "Data Analytics": 365.2,
      "Data Engineering": 940.1,
      "Data Science & AI": 2510.3,
      "DevOps & Cloud": 1318.7,
      "Product Management": 208.2,
      "Software Development": 498.4,
      "UI/UX Design": 318.9,
      "Web Development": 469.2
    },
    { "...": "prediksi bulan +2" },
    { "...": "prediksi bulan +3" }
  ],
  "top_domain": "Data Science & AI",
  "generated_at": "2026-05-26T10:00:00Z",
  "history_source": "csv"
}
```

| Field Response | Keterangan |
|----------------|------------|
| `predictions` | Array prediksi, index 0 = bulan depan, index 1 = 2 bulan lagi, dst |
| `top_domain` | Domain dengan demand tertinggi di bulan pertama |
| `generated_at` | Waktu prediksi dibuat (ISO 8601) |
| `history_source` | `"csv"` = otomatis dari file, `"request"` = dari body kiriman |

**Error Responses:**

| HTTP | Pesan | Penyebab |
|------|-------|---------|
| 422 | `Butuh minimal 12 bulan history` | Jika kirim history manual tapi kurang dari 12 item |
| 422 | `Domain 'X' tidak dikenal` | Nama domain salah |
| 422 | `n_months harus antara 1 dan 12` | Nilai n_months di luar range |
| 500 | `Model error: ...` | File model tidak ditemukan atau korup |

---

### Contoh Integrasi Frontend

**JavaScript / TypeScript:**
```javascript
// Prediksi semua domain — paling simpel
const res = await fetch('http://localhost:8000/api/trend/forecast', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ n_months: 3 })
});
const data = await res.json();

// Gunakan untuk chart:
const bulanDepan = data.predictions[0];  // { "Data Science & AI": 2510, ... }
const topDomain  = data.top_domain;      // "Data Science & AI"
```

**Render ke Bar Chart (contoh dengan Chart.js):**
```javascript
const labels = Object.keys(data.predictions[0]);
const values = Object.values(data.predictions[0]);

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{ label: 'Prediksi Demand Bulan Depan', data: values }]
  }
});
```

---

## ⚠️ requirements.txt

Pastikan file `requirements.txt` sudah mengandung baris ini:

```txt
fastapi
uvicorn[standard]
pandas
scikit-learn
tensorflow>=2.15.0
numpy
python-multipart
```
