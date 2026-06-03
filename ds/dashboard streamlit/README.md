# 💼 NeoKarir Intelligence Dashboard

NeoKarir Intelligence Dashboard adalah dashboard interaktif berbasis **Streamlit** yang dirancang untuk membantu analisis pasar kerja IT serta melakukan evaluasi performa fitur rekomendasi karier berbasis AI melalui simulasi **A/B Testing**.

Dashboard ini dikembangkan sebagai bagian dari **Capstone Project NeoKarir 2026**.

---

# 🚀 Features

## 📊 Analisis Pasar Kerja IT

Dashboard menyediakan insight interaktif terkait tren lowongan pekerjaan di bidang teknologi, seperti:

* Distribusi lowongan berdasarkan domain IT
* Top skills paling dicari perusahaan
* Distribusi jumlah skill yang diminta
* Persentase syarat pengalaman kerja
* Filter berdasarkan:

  * Domain pekerjaan
  * Pengalaman kerja

---

## 🧪 Evaluasi A/B Testing

Dashboard juga menyediakan simulasi evaluasi performa fitur AI Job Match menggunakan pendekatan statistik.

Fitur yang tersedia:

* Simulasi CTR antara:

  * Control Group (Keyword Search)
  * Variant Group (AI Match Score)
* Perhitungan:

  * Z-Test Proportion
  * P-Value
  * Effect Size
  * Power Analysis
* Visualisasi hasil eksperimen
* Download data mentah eksperimen (.csv)

---

# 🛠️ Technologies Used

* Python
* Streamlit
* Pandas
* Plotly
* Statsmodels
* NumPy

---

# 📂 Project Structure

```bash
.
├── dash.py
├── master_job_catalog.csv
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/username/neokarir-dashboard.git
cd neokarir-dashboard
```

---

## 2. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Run Streamlit App

```bash
streamlit run dash.py
```

---

# 📈 Dataset

Dataset utama yang digunakan:

* `master_job_catalog.csv`

Dataset berisi informasi terkait:

* Domain pekerjaan IT
* Required skills
* Pengalaman minimum
* Katalog lowongan kerja

---

# 🧠 Statistical Methods

Dashboard A/B Testing menggunakan beberapa metode statistik, antara lain:

## Z-Test Proportions

Digunakan untuk menguji apakah terdapat perbedaan signifikan antara CTR kelompok kontrol dan kelompok varian.

## Power Analysis

Digunakan untuk menentukan apakah ukuran sampel eksperimen sudah cukup valid secara statistik.

---

# 🎨 Dashboard Highlights

## Halaman 1 — Analisis Pasar Kerja

Menampilkan:

* KPI utama
* Bar chart distribusi domain
* Top skills visualization
* Pie chart pengalaman kerja
* Distribusi jumlah skill

## Halaman 2 — Evaluasi A/B Testing

Menampilkan:

* Simulasi CTR
* Hasil Z-Test
* Validasi statistik
* Insight bisnis berbasis data
* Export data eksperimen

---

# 📌 Notes

* Dashboard menggunakan cache data dengan `@st.cache_data`
* Visualisasi dibuat menggunakan Plotly Interactive Charts
* Tampilan menggunakan branding warna NeoKarir

---

# 👨‍💻 Author

**NeoKarir Data Science Team**
Capstone Project 2026

---

# 📜 License

This project is created for educational and capstone purposes.
