# 🚀 NeoKarir Frontend

NeoKarir adalah platform pengembangan karir interaktif bertenaga AI yang membantu pengguna mengenali potensi diri, menganalisis kesenjangan keterampilan, mengoptimalkan CV, hingga merekomendasikan jalur karir dan lowongan pekerjaan yang relevan. 🌟

---

## ✨ Fitur Utama

Berikut adalah beberapa fitur utama yang telah dikembangkan di platform NeoKarir Frontend:

1. **🌐 Landing Page & Legal Info**
   * Tampilan beranda modern untuk memperkenalkan ekosistem NeoKarir kepada pengguna baru.
   * Dilengkapi halaman Syarat Ketentuan (*Terms of Service*) dan Kebijakan Privasi (*Privacy Policy*).

2. **🔐 Sistem Autentikasi**
   * Registrasi (*Register*) dan Masuk (*Login*) pengguna yang aman.
   * Manajemen sesi login terintegrasi melalui *Auth Context*.

3. **🎯 Onboarding & AI Career Profiling**
   * **Onboarding**: Alur pengenalan dan penyambutan bagi pengguna baru dengan pilihan pengisian data secara manual atau otomatis melalui **ekstraksi dokumen CV oleh AI**. 
   * **AI Career Profiling**: Penilaian kepribadian, minat, dan bakat bertenaga AI untuk memetakan arah karir masa depan.

4. **📊 Dashboard Utama**
   * Panel navigasi pusat yang menyajikan ringkasan profil, status karir saat ini, tips cepat pengembangan diri, serta pintasan ke fitur-fitur utama.

5. **📄 AI CV Analyzer**
   * Alat analisis resume/CV berbasis AI untuk mendeteksi kesesuaian format, memberikan skor penilaian (*CV Score*), dan menyarankan perbaikan pada resume agar lolos ATS (*Applicant Tracking System*).

6. **⚡ Skill Gap Analysis**
   * Fitur perbandingan kemampuan pengguna saat ini dengan kualifikasi yang dicari oleh industri untuk target karir tertentu, lengkap dengan rekomendasi keterampilan yang perlu dipelajari.

7. **💼 Rekomendasi Karir & Detail Karir**
   * Daftar rekomendasi jalur karir yang dipersonalisasi sesuai profil AI pengguna.
   * Halaman detail karir yang mengulas deskripsi peran, rentang gaji perkiraan, serta tren industri.

8. **🤖 AI Assistant Chatbot**
   * Asisten/konsultan karir pribadi berbasis AI dalam bentuk chat interaktif untuk membantu menjawab pertanyaan seputar persiapan kerja, pembuatan portofolio, simulasi wawancara, dan lainnya.

9. **⚙️ Pengaturan Profil (Settings)**
   * Manajemen profil pengguna termasuk pembaruan data diri dan preferensi karir.

10. **📈 Job Market (Pasar Kerja)**
    * Halaman yang menampilkan perbandingan tren pasar kerja antar domain, tren pertumbuhan jabatan, tingkat gaji rata-rata, dan prediksi tren di masa depan.
---

## 📁 Struktur Folder

```text
neokarir-fe/
├── public/          # Aset statis publik
├── src/             # Source code aplikasi
│   ├── assets/      # Aset statis seperti gambar, ikon, fonts
│   ├── components/  # Komponen UI yang dapat digunakan kembali (reusable)
│   ├── config/      # Konfigurasi aplikasi (seperti API, konstanta)
│   ├── contexts/    # Context API untuk state management global
│   ├── features/    # Modul per fitur yang memiliki komponen, hooks, dll
│   ├── hooks/       # Custom hooks (React hooks)
│   ├── layouts/     # Layout halaman (seperti header, sidebar, footer)
│   ├── pages/       # Komponen halaman utama yang terkait dengan rute
│   ├── utils/       # Fungsi utilitas/helper
│   ├── App.jsx      # Root komponen aplikasi
│   └── index.jsx    # Entry point aplikasi
├── index.html       # Entry point HTML utama
├── package.json     # Konfigurasi dependensi dan skrip proyek
└── vite.config.js   # Konfigurasi Vite
```

---

## 🛠️ Cara Instalasi dan Menjalankan di Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

1. **📥 Clone repositori** (jika belum):
   ```bash
   git clone <url-repositori>
   cd neokarir-fe
   ```

2. **📦 Instal dependensi**:
   Pastikan Anda telah menginstal Node.js di sistem Anda.
   ```bash
   npm install
   ```

3. **🚀 Jalankan aplikasi di mode development**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan dan Vite akan menampilkan URL lokal (biasanya di `http://localhost:5173`). Buka URL tersebut di browser Anda.

4. **🏗️ Build untuk produksi** (Opsional):
   ```bash
   npm run build
   ```

5. **👀 Preview hasil build produksi** (Opsional):
   ```bash
   npm run preview
   ```
