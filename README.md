# 🚀 NeoKarir - AI Recommendation & Scoring API

Repositori ini berisi layanan AI (Microservice) untuk aplikasi NeoKarir. Branch ini secara khusus menangani logika sistem Rekomendasi Karir, Job Match Score, Skill Gap Analysis, dan Learning Roadmap menggunakan FastAPI dengan pendekatan Clean Architecture.

## 🛠️ Teknologi yang Digunakan
* Python 3.9+
* FastAPI (Web Framework)
* Uvicorn (ASGI Server)
* Pandas & Scikit-Learn (Data Processing & ML)

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

* **`data/`**: Direktori penyimpanan dataset.
  * `master_job_catalog.csv`: Database utama katalog pekerjaan.
  * `dummy_user_profiles.csv`: Data testing profil user.
  * `roadmap_new.json`: Template data untuk *learning roadmap*.

---

## 🚀 Cara Menjalankan Server (Panduan untuk Tim Back-end)

Jika ingin menjalankan service AI ini di lingkungan *local* atau *server deployment*, jalankan perintah berikut di terminal:

1. **Install environment & library:**
   ```bash
   pip install -r requirements.txt

2. **Jalankan server aplikasi:**
uvicorn app.main:app --reload

3. **Akses Dokumentasi Swagger UI:**
http://localhost:8000/docs