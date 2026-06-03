---
title: neokarir-services-1
emoji: 🧠
colorFrom: red
colorTo: pink
sdk: docker
pinned: false
---

# NeoKarir Backend — Developer README


Panduan lengkap untuk developer backend: instalasi, struktur proyek, cara menjalankan, dan panduan migrasi database dari lingkungan lokal ke Supabase (cukup ganti `DATABASE_URL`).

-----

## Ringkasan Proyek
NeoKarir adalah backend FastAPI untuk platform career intelligence berbasis AI. Fitur utama:
- User auto profilling
- CV Analyzer (NER + heuristics)
- Job Match (Siamese/Keras model)
- RAG-powered Chatbot (Groq / LLM retrieval)

Proyek ini menyimpan model ML di `app/ai_engine/models/` dan service logic di `app/ai_engine/services/`.

-----

## Struktur Repositori

Proyek ini memiliki struktur folder yang terorganisir berdasarkan domain fungsional:

- `app/`
  - `main.py` — Entrypoint FastAPI. Menginisialisasi aplikasi, CORS, `lifespan` startup/shutdown, router registration, dan health checks.
  - `routers/` — Mengandung semua endpoint API yang berinteraksi langsung dengan request/response.
    - `onboarding.py` — Router untuk flow onboarding, upload CV, auto-profiling, dan penyimpanan profil user.
    - `chatbot.py` — Router chatbot RAG yang menerima request chat dan memanggil service chatbot.
    - `job_match.py` — Router untuk kalkulasi kecocokan job 1-to-1 menggunakan logika matching.
    - `cv_analyzer.py` — Router untuk menerima file CV, mengekstrak teks, dan menganalisis konten menggunakan Groq/LLM.
    - `__init__.py` — Penanda paket Python untuk router import central.
  - `ai_engine/`
    - `services/` — Semua business logic dan integrasi model AI.
      - `chatbot_service.py` — Logika RAG dan prompt engineering untuk chatbot, pengelolaan Groq/OpenAI client, serta akses knowledge base.
      - `cv_service.py` — Logika ekstraksi teks, NER, normalisasi skill, dan konversi CV menjadi profil user.
      - `cv_analyzer_service.py` — Logika analisis CV melalui Groq LLM yang menghasilkan respons JSON terstruktur.
      - `intent_service.py` — Klasifikasi intent pengirim pesan dengan model XLM-RoBERTa.
      - `match_service.py` — Model job matching Keras, tokenizer loading, dan helper untuk interpretasi hasil.
      - `__init__.py` — Penanda paket Python untuk service import central.
    - `models/` — Asset model dan metadata yang dibutuhkan oleh layanan AI.
      - `cv-model-xlm/` — Model NER XLM-RoBERTa untuk ekstraksi entitas dari CV.
      - `job_match_model/` — Model Keras & weight untuk job matching.
      - `neokarir_intent_model/` — Model intent classifier untuk chatbot.
  - `schemas/` — Pydantic schema untuk request/response API.
    - `payloads.py` — Semua definisi model data seperti CVAnalysisResponse, DashboardResponse, JobMatchRequest, ChatRequest, dan lainnya.
    - `__init__.py` — Penanda paket schema.
- `ingest_knowledge.py` — Skrip bantu ETL untuk memasukkan dokumen teks ke database embedding RAG.
- `requirements.txt` — Daftar dependensi Python untuk project.
- `README.md` — Dokumentasi developer dan panduan setup.

-----

## Prasyarat (Developer)
- Python 3.10 (disarankan di virtualenv/venv atau conda)
- PostgreSQL lokal (jika menggunakan DB lokal)
- Jika mau memakai Supabase: akun Supabase dan project

-----

## Persiapan environment
1. Buat virtual environment dan aktifkan:

```bash
python -m venv .venv
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1
# Windows (cmd)
.\.venv\Scripts\activate.bat
# macOS / Linux
source .venv/bin/activate
```

2. Install dependency:

```bash
pip install -r requirements.txt
```

3. Buat `.env` (jangan commit). Contoh minimal:

```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=postgresql://postgres:password@localhost:5432/neokarir_local
```

Catatan: Aplikasi membaca `DATABASE_URL` melalui `os.getenv("DATABASE_URL")`. Pastikan `.env` di-load (project menggunakan `python-dotenv`).

-----

## Menjalankan aplikasi (development)
Jalankan dengan `uvicorn` (pastikan virtualenv aktif):

```bash
uvicorn app.main:app --reload --port 8000
```

- API docs tersedia di `http://localhost:8000/docs`.
- Health endpoint: `GET /health`.

## Deploy ke Hugging Face Spaces

Gunakan `Docker Space` dan pastikan file `Dockerfile` di folder ini ikut ter-upload.

Env var yang perlu ditambahkan di Space Settings:

```env
GROQ_API_KEY=...
DATABASE_URL=...
SUPABASE_URL=...
SUPABASE_KEY=...
```

Endpoint yang bisa dipakai setelah build selesai:

- `/`
- `/health`
- `/docs`

-----

## Lokasi model & artifacts
- Taruh model NER, intent, dan job-match di `app/ai_engine/models/` sesuai struktur saat ini.
- Beberapa model besar (.safetensors, .keras, .h5) tidak di-commit — pastikan di-copy ke folder ini saat development.

-----

## Database (Local → Supabase) — Panduan Lengkap
Aplikasi menggunakan Postgres (pgvector) untuk menyimpan embedding RAG. Secara default, environment variable yang dipakai adalah `DATABASE_URL`.

Catatan penting: model embedding yang digunakan `all-MiniLM-L6-v2` menghasilkan vektor berdimensi 384 — kolom `vector` harus dibuat dengan dimensi ini.

### 1) Siapkan Supabase
- Buat project baru di https://app.supabase.com.
- Di dashboard project → Settings → Database → Connection string: salin `postgresql://...` connection string.
- Di SQL Editor Supabase jalankan (untuk mengaktifkan `pgvector` jika perlu):

```sql
-- Aktifkan ekstensi pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Buat tabel untuk knowledge base
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  file_name TEXT,
  content TEXT,
  embedding VECTOR(384)
);

-- Index cepat (opsional, sesuaikan parameter lists)
CREATE INDEX IF NOT EXISTS idx_kb_embedding ON knowledge_base USING ivfflat (embedding) WITH (lists = 100);
```

> Jika Supabase sudah menyediakan pgvector, ekstensi mungkin sudah terpasang. Jika tidak bisa menjalankan `CREATE EXTENSION`, gunakan SQL Editor di Supabase (biasanya diperbolehkan).

### 2) Mengisi data dari lokal ke Supabase
Ada beberapa cara untuk migrasi data:

Opsi A — Dump & Restore (jika akses diijinkan):

```bash
# Export local DB (binary custom)
pg_dump -h localhost -p 5432 -U postgres -Fc -f neokarir.dump neokarir_local

# Restore ke Supabase (gunakan connection string Supabase)
pg_restore --host db.your-supabase-host.supabase.co --port 5432 \
  --username postgres --dbname your_supabase_db --no-owner -d neokarir.dump
```

Catatan: Beberapa hosting managed (termasuk Supabase) membatasi perintah superuser — jika `pg_restore` gagal karena hak akses, gunakan Opsi B.

Opsi B — Export CSV dan import via SQL/GUI (paling kompatibel):

```sql
-- Ekspor tabel lokal ke CSV (contoh di psql):
COPY knowledge_base (file_name, content, embedding) TO '/tmp/kb.csv' CSV;
```

Lalu gunakan Supabase UI → Table Editor → Import CSV, atau tulis skrip Python untuk membaca CSV dan melakukan `INSERT` ke Supabase.

Opsi C — Gunakan skrip ETL Python (direkomendasikan untuk embedding):
- Jalankan `ingest_knowledge.py` tapi ubah `DATABASE_URL` di file atau set `DATABASE_URL` di environment ke Supabase connection string.
- Contoh (set env lalu jalankan skrip):

```bash
# PowerShell
$env:DATABASE_URL = "postgresql://postgres:...@db.your-supabase-host.supabase.co:5432/postgres"
python ingest_knowledge.py
```

> Pastikan `ingest_knowledge.py` tidak hardcode DATABASE_URL (lihat catatan di bawah). Lebih baik ubah agar membaca `os.getenv('DATABASE_URL')`.

### 3) Memperbarui aplikasi untuk menggunakan Supabase
- Ganti hanya satu hal: environment variable `DATABASE_URL`.
  - Di development gunakan `.env`.
  - Di production (Supabase/Azure/Heroku) set environment variable di dashboard hosting.

Contoh `.env`:

```env
DATABASE_URL=postgresql://postgres:your_password@db.your-supabase-host.supabase.co:5432/postgres
```

Setelah mengganti, restart aplikasi (uvicorn).

-----

## Troubleshooting cepat
- `ModuleNotFoundError` → pastikan `pip install -r requirements.txt` selesai.
- `connection refused` ke DB → cek nilai `DATABASE_URL`, port, dan apakah DB menerima koneksi eksternal.
- `pgvector` errors → pastikan ekstensi `vector` diaktifkan di Supabase.

-----

## Contoh perubahan cepat pada `ingest_knowledge.py` (agar memakai env)
Ganti header `DATABASE_URL = "..."` menjadi:

```python
import os
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/postgres')
```

-----