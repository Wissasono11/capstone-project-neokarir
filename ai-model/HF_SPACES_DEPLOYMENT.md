# Hugging Face Spaces Deployment Guide

Panduan ini menyiapkan dua service AI di `ai-model/` sebagai Docker Space di Hugging Face.

## Service 1: `services-1`

Fungsi utama:
- CV analyzer
- chatbot RAG
- job matching berbasis model Hugging Face dan Groq

Env var yang perlu di-set di Space Settings:
- `GROQ_API_KEY`
- `DATABASE_URL`
- `SUPABASE_URL` jika dipakai langsung oleh service ini
- `SUPABASE_KEY` atau `SUPABASE_SERVICE_ROLE_KEY` jika diperlukan
- `PORT=7860` jika ingin eksplisit

Catatan:
- Service ini memakai model dari Hugging Face Hub, jadi pastikan repo model publik atau token sudah tersedia.
- Jika kamu memakai file `.env` lokal, jangan di-upload ke Space.

## Service 2: `services-2`

Fungsi utama:
- recommendation
- profile scoring
- skill gap
- roadmap dan forecasting tren

Env var yang diperlukan biasanya lebih sedikit. Jika tidak ada secret, Space bisa jalan hanya dengan file model dan dataset di repo.

## Langkah deploy

1. Buat Space baru di Hugging Face.
2. Pilih template `Docker`.
3. Jadikan isi folder `services-1` atau `services-2` sebagai isi repo Space, jadi file `Dockerfile` berada di root repo Space.
4. Pastikan file `Dockerfile` ikut terdeteksi di root, bukan hanya tersimpan di subfolder lokal.
5. Tambahkan secrets di menu Space Settings.
6. Tunggu build selesai, lalu cek log startup.
7. Tes endpoint `/health` atau `/`.

## Urutan yang disarankan

1. Deploy `services-2` dulu karena lebih sederhana dan biasanya tanpa secret.
2. Deploy `services-1` sesudahnya karena ada ketergantungan ke Groq, Supabase, dan model dari Hugging Face Hub.
