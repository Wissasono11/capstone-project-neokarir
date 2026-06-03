import pandas as pd
import random
import os

# ================= KONFIGURASI =================
BASE_DIR = ".."  # naik ke folder dataset utama
DOMAIN_ROLE_FILE = os.path.join(BASE_DIR, "job match score", "domain role", "domain_role.csv")
SKILL_POOL_FILE = os.path.join(BASE_DIR, "job match score", "skill pool", "skill_pool.csv")

OUTPUT_DIR = "."
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "intent_dataset_v2.csv")
TARGET_PER_INTENT = 100   # total 500 baris

# ================= MUAT ROLE & SKILL DARI CSV =================
try:
    df_role = pd.read_csv(DOMAIN_ROLE_FILE)
    roles_dari_kita = df_role["role"].str.strip().str.lower().tolist()
    print(f"✅ {len(roles_dari_kita)} role dimuat dari {DOMAIN_ROLE_FILE}")
except FileNotFoundError:
    print(f"❌ {DOMAIN_ROLE_FILE} tidak ditemukan. Pakai daftar role default.")
    roles_dari_kita = ["data analyst", "frontend developer", "backend developer"]

try:
    df_skill = pd.read_csv(SKILL_POOL_FILE)
    skills_dari_pool = df_skill["skill"].str.strip().str.lower().tolist()
    print(f"✅ {len(skills_dari_pool)} skill dimuat dari {SKILL_POOL_FILE}")
except FileNotFoundError:
    print(f"❌ {SKILL_POOL_FILE} tidak ditemukan. Pakai daftar skill default.")
    skills_dari_pool = ["python", "sql", "excel", "tableau", "machine learning", "react", "git", "agile"]

# ================= BANK KATA LAINNYA =================

# ----- SALAM SAPIAN (sudah banyak, kita tambah sedikit) -----
salam_sapaan = [
    "halo", "hai", "hai min", "halo kak", "pagi min", "siang", "sore kak",
    "malam", "hai bro", "halo gan", "permisi", "assalamualaikum", 
    "halo admin", "hai guys", "p", "Halo", "Haii", "haloo", "pagi brow",
    "met pagi", "met siang", "met malam", "selamat pagi", "selamat siang",
    "selamat malam", "halo semuanya", "hei", "heyy", "yooo",
    "pagi", "sore", "selamat sore", "malam gan", "halo sis", "hai kak",
    "permisi min", "maaf ganggu", "selamat pagi min", "halo bestie",
    "yuhuu", "halo halo", "test", "ping", "selamat siang kak",
    "halo dunia", "assalamu'alaikum wr wb", "salam sejahtera"
]
salam_terima_kasih = [
    "makasih", "terima kasih", "thanks", "thx", "makasih ya", "terima kasih banyak",
    "thank you", "tq", "makasih min", "makasih kak", "suwun", "matur nuwun",
    "makasih bgt", "thx ya", "terima kasih semuanya", "sangat membantu, makasih",
    "makasih banyak min", "makasih penjelasannya", "thank you so much",
    "terima kasih atas bantuannya", "suwun ya", "hatur nuhun", "arigatou"
]
salam_balasan = [
    "iya", "oke", "sip", "baik", "ok", "siap", "done", "mantap", "oke min", "sip kak",
    "baiklah", "ok deh", "sip deh", "noted", "ok siap", "okei", "okee", "baik min",
    "siap laksanakan", "wilujeng", "gas", "let's go", "ok boss", "ready"
]

# ----- TANYA SYARAT LOKER (DIPERBANYAK) -----
template_syarat = [
    "Klo mau jadi {role} hrs bisa {skill} gak?",
    "skill apa aja yg dibutuhin buat {role}?",
    "{role} wajib paham {skill} ya?",
    "min, syarat jadi {role} apa aja?",
    "mau tanya dong, buat melamar {role} perlu pengalaman gak?",
    "{role} tu harus jago {skill} gak sih?",
    "apakah {role} harus punya sertifikasi?",
    "kak, {role} wajib bisa {skill} gak?",
    "kualifikasi utama {role} apa ya?",
    "apa aja tools yg harus dikuasai {role}?",
    "bg, syarat minimal buat {role} apa?",
    "kalo mau jadi {role} perlu kuliah IT gak?",
    "apakah lulusan smk bisa jadi {role}?",
    "skill paling penting buat {role} apa min?",
    "bro, jadi {role} perlu pengalaman berapa tahun?",
    "kalo mau daftar {role} harus bisa apa aja?",
    "apa syarat penting buat posisi {role}?",
    "menurutmu, {role} perlu skill {skill} gak?",
    "kualifikasi {role} di perusahaan biasanya apa?",
    "butuh sertifikat apa aja buat jadi {role}?",
    "apakah {role} harus jago coding?",
    "gimana tips biar lolos seleksi {role}?",
    "kalo fresh graduate bisa daftar {role} gak?",
    "apa {skill} itu wajib buat {role}?",
    "kak, mau nanya syarat jadi {role} dong",
    "pengen jadi {role}, tapi bingung harus bisa apa",
    "apa aja ya skill wajib buat {role}?",
    "min, {role} harus bisa bahasa inggris gak?",
    "kalo mau {role} harus bisa {skill} dari sekarang?",
    "apakah ada batasan umur buat jadi {role}?",
    "kalo gak bisa {skill} apa masih bisa jadi {role}?",
    "apa beda syarat {role} sama role lain?",
    "skill yang paling dicari buat {role} apa sih?",
    "kak, butuh portfolio gak buat {role}?",
    "apa bisa jadi {role} tanpa gelar IT?",
    "kalo dari jurusan non-IT bisa jadi {role} gak?",
    "min, pengalaman magang dihitung gak buat {role}?",
    "kalo skill {skill} masih pemula, boleh daftar {role}?",
    "apakah {role} harus punya github?",
    "syarat {role} di startup sama corporate beda ya?",
    "min, share dong kualifikasi lengkap buat {role}",
    "kalo mau {role} harus belajar apa dulu?",
    "apa {role} perlu skill manajemen juga?",
    "kalo pindah karir ke {role} gimana syaratnya?",
    "kak, kalo mau {role} harus bisa tools apa?",
    "min, apakah {skill} wajib banget buat {role}?",
    "kalo mau {role} di perusahaan besar, apa syarat tambahannya?",
    "kak, apa saja sertifikasi yang direkomendasikan untuk {role}?",
    "apakah {role} harus menguasai banyak bahasa pemrograman?",
    "min, boleh minta daftar skill yang harus dipelajari buat {role}?",
]

# ----- TANYA ROADMAP (DIPERBANYAK) -----
template_roadmap = [
    "roadmap belajar {role} dong min",
    "urutan belajar buat jadi {role} gimana ya?",
    "dari nol sampe jago {role} belajarnya apa aja?",
    "step by step belajar {role}",
    "mau jadi {role} harus mulai dari mana?",
    "kak, share dong roadmap {role}",
    "alur belajar {role} buat pemula",
    "belajar {role} dari mana dulu ya?",
    "kalo mau switch career ke {role} belajarnya gimana?",
    "bg, rekomendasiin roadmap {role} dong",
    "urutan belajar {role} yang bener apa aja?",
    "gimana caranya belajar {role} secara sistematis?",
    "apa aja tahapan belajar {role}?",
    "bisa gak belajar {role} otodidak?",
    "min, kasih tau dong roadmap {role} yang realistis",
    "guide belajar {role} buat pemula",
    "langkah awal belajar {role} tuh apa?",
    "kalo mau belajar {role}, butuh berapa lama sampe bisa?",
    "apa aja materi yang harus dipelajari buat {role}?",
    "belajar {role} tuh susah gak sih?",
    "kak, tolong bikinin learning path {role}",
    "gimana sih caranya belajar {role} dari nol?",
    "tahapan belajar {role} yang efektif",
    "rekomendasiin website buat belajar {role} dong",
    "belajar {role} pake kursus online apa buku?",
    "apa harus kuliah dulu buat belajar {role}?",
    "kalo mau belajar {role}, skill apa yang harus dikuasai duluan?",
    "min, ada saran tempat belajar {role}?",
    "belajar {role} tuh mulai dari teori apa langsung praktek?",
    "kak, kalo mau jago {role} harus belajar apa aja?",
    "pengen bisa {role}, tapi bingung mulai dari mana",
    "bagaimana cara cepat belajar {role}?",
    "apa saja rintangan saat belajar {role}?",
    "min, pengen belajar {role} tapi budget terbatas, gimana?",
    "rekomendasi channel youtube buat belajar {role}",
    "kalo mau belajar {role} secara intensif, berapa jam sehari?",
    "apa aja proyek yang harus dibuat saat belajar {role}?",
    "belajar {role} lebih baik fokus satu bahasa atau banyak?",
    "kak, kalo otodidak belajar {role} gimana caranya?",
    "gimana cara tetap motivasi saat belajar {role}?",
    "apa ada komunitas buat yang lagi belajar {role}?",
    "min, kasih tau step-by-step jadi {role}",
    "kalo udah tua, apa masih bisa belajar {role}?",
    "belajar {role} dari buku atau video, mana yang lebih bagus?",
    "kalo mau magang sebagai {role}, harus udah bisa apa?",
    "apa ada sertifikat yang wajib buat belajar {role}?",
    "panduan belajar {role} dari pemula sampai profesional",
    "belajar {role} dari pengalaman orang lain gimana?",
    "apa ada mentor yang bisa bantu belajar {role}?",
]

# ----- BANTUAN FITUR APLIKASI (DIPERBANYAK) -----
fitur = [
    "job match score", "skill gap analysis", "cv analyzer", "career recommendation",
    "dashboard job market", "radar chart", "profil", "upload cv", "lihat lowongan",
    "simpan lowongan", "bandingkan skor", "baca grafik", "isi survei onboarding",
    "ganti password", "notifikasi", "pengaturan akun", "riwayat aplikasi"
]
template_fitur = [
    "cara baca {fitur} gimana sih?",
    "min, {fitur} itu fungsinya buat apa?",
    "gimana cara pakai {fitur}?",
    "aku bingung cara lihat {fitur}",
    "cara akses {fitur} dimana ya?",
    "kok {fitur} error ya?",
    "kenapa {fitur} gak muncul?",
    "minta tolong cara {fitur} dong",
    "apakah {fitur} bisa diakses gratis?",
    "cara meningkatkan {fitur} gimana?",
    "apa arti skor di {fitur}?",
    "gimana cara bandingin {fitur}?",
    "cara save hasil {fitur} gimana?",
    "fitur {fitur} ada tutorialnya gak?",
    "aku gak ngerti cara kerja {fitur}",
    "tolong jelasin fungsi {fitur}",
    "{fitur} bisa dipake buat apa aja?",
    "ada batasan penggunaan {fitur} gak?",
    "kenapa {fitur} saya gak bisa dibuka?",
    "cara reset {fitur} gimana?",
    "apakah data di {fitur} tersimpan otomatis?",
    "gimana cara ekspor data dari {fitur}?",
    "kenapa hasil {fitur} saya gak akurat?",
    "apakah {fitur} tersedia di versi mobile?",
    "min, {fitur} kok lambat loadingnya?",
    "cara ngilangin error di {fitur}?",
    "apakah {fitur} bisa digunakan offline?",
    "gimana cara custom {fitur}?",
    "apa saja komponen di {fitur}?",
    "bagaimana cara menghubungkan {fitur} dengan akun lain?",
    "apakah {fitur} bisa dipakai oleh pemula?",
    "min, ada video cara pakai {fitur} gak?",
    "kenapa tombol {fitur} gak berfungsi?",
    "cara menginterpretasi hasil {fitur}?",
    "apakah {fitur} sudah termasuk dalam paket gratis?",
    "gimana cara upgrade {fitur}?",
    "apa perbedaan {fitur} versi free sama pro?",
    "kak, help! {fitur} saya tiba-tiba hilang",
    "cara membandingkan dua {fitur} sekaligus?",
    "apakah {fitur} bisa diintegrasikan dengan tools lain?",
    "saya tidak bisa menemukan {fitur}, ada di menu mana?",
    "cara mendapatkan notifikasi dari {fitur}?",
    "apakah {fitur} bisa menghapus data?",
    "gimana cara filter di {fitur}?",
    "apakah {fitur} support dark mode?",
    "min, {fitur} saya hanya loading terus",
    "cara mengaktifkan {fitur} untuk pertama kali",
    "apakah {fitur} bisa diakses tanpa login?",
    "apa yang dimaksud dengan angka di {fitur}?",
    "kak, {fitur} ini aman gak buat data pribadi?",
    "apakah {fitur} butuh koneksi internet?",
    "gimana cara menghapus cache {fitur}?",
    "bagaimana jika {fitur} tidak sesuai harapan?",
    "apakah {fitur} bisa memberikan rekomendasi yang dipersonalisasi?",
    "bisa gak ganti pengaturan {fitur}?",
]

# ----- OUT OF CONTEXT (sudah banyak, kita tambah sedikit) -----
out_of_context_texts = [
    "cara bikin rendang daging yang empuk gimana ya?",
    "resep nasi goreng enak",
    "hari ini cuacanya gimana?",
    "siapa presiden indonesia sekarang?",
    "kapan pemilu 2024?",
    "film action terbaru apa ya?",
    "gimana cara daftar bpjs?",
    "harga bitcoin sekarang berapa?",
    "ceritain dong soal perang dunia ke 2",
    "kenapa langit warnanya biru?",
    "cara mengatasi jerawat meradang",
    "minta nomor yang bisa dihubungi dong",
    "aku mau pesan tiket kereta",
    "rekomendasi hp 2 jutaan",
    "cara transfer pulsa",
    "lagu barat yang lagi hits apa?",
    "skor pertandingan tadi malam",
    "apakah alien itu ada?",
    "cara merawat tanaman hias",
    "min, boleh minta uang?",
    "aku lagi galau",
    "gimana cara move on?",
    "kalkulator online",
    "siapa penemu lampu?",
    "cerita horor singkat",
    "apakah kucing bisa terbang?",
    "siapa nama pacar kamu?",
    "minta link download film",
    "cara memperbaiki kulkas tidak dingin",
    "cuaca besok hujan gak ya?",
    "saat ini jam berapa di new york?",
    "obat flu yang ampuh",
    "cara membuat kue brownies",
    "apakah bumi itu bulat?",
    "kapan hari kemerdekaan indonesia?",
    "kenapa air laut asin?",
    "bagaimana cara menurunkan berat badan?",
    "siapa artis favoritmu?",
    "apakah kamu manusia?",
    "definisi cinta itu apa?",
    "gimana cara jadi youtuber sukses?",
    "minta tips investasi saham",
    "apakah saya bisa pinjam uang?",
    "ceritakan tentang dirimu",
    "apakah kamu punya pacar?",
    "gimana cara mengatasi bosan?",
    "apa itu metaverse?",
    "siapa nama asli batman?",
    "cara download video youtube",
    "rekomendasi tempat wisata di bandung",
    "apakah kamu bisa bernyanyi?",
    "kenapa ayam menyeberang jalan?",
    "siapa bilang hidup itu mudah?",
    "apakah saya bisa bertanya?",
    "di mana letak gunung everest?",
    "apa warna favoritmu?",
    "siapa ceo google?",
    "kenapa harus belajar matematika?",
    "rekomendasi laptop untuk mahasiswa",
    "cara memilih ban motor yang bagus",
    "di mana beli sayur online terpercaya?",
    "resep martabak manis rumahan",
    "tips merawat kulit wajah kering",
    "apa arti mimpi dikejar orang?",
    "rekomendasi film horor indonesia terbaru",
    "cara menaikkan followers instagram",
    "jadwal bioskop hari ini",
    "kenapa kucing saya muntah?",
    "cara mengurus sim yang hilang",
    "menu masakan sehari-hari agar tidak bosan",
]

# ================= GENERATE DATASET =================
random.seed(99)
data = []

# Salam sapaan (gabungan pembuka, terima kasih, balasan)
salams = salam_sapaan + salam_terima_kasih + salam_balasan
salams += ["halo min, makasih sebelumnya", "pagi kak, terima kasih", "hai, oke sip", "selamat siang, terima kasih", "selamat pagi, ada yang bisa dibantu?", "maaf ganggu, mau tanya"]
for _ in range(TARGET_PER_INTENT):
    data.append([random.choice(salams), "salam_sapaan"])

# Tanya syarat loker (pakai role & skill dari file)
for _ in range(TARGET_PER_INTENT):
    role = random.choice(roles_dari_kita)
    skill = random.choice(skills_dari_pool)
    template = random.choice(template_syarat)
    chat = template.format(role=role, skill=skill)
    data.append([chat, "tanya_syarat_loker"])

# Tanya roadmap (pakai role dari file)
for _ in range(TARGET_PER_INTENT):
    role = random.choice(roles_dari_kita)
    template = random.choice(template_roadmap)
    chat = template.format(role=role)
    data.append([chat, "tanya_roadmap"])

# Bantuan fitur
for _ in range(TARGET_PER_INTENT):
    f = random.choice(fitur)
    template = random.choice(template_fitur)
    chat = template.format(fitur=f)
    data.append([chat, "bantuan_fitur_aplikasi"])

# Out of context
out_samples = random.choices(out_of_context_texts, k=TARGET_PER_INTENT)
for chat in out_samples:
    data.append([chat, "out_of_context"])

# Buat DataFrame dan acak
df = pd.DataFrame(data, columns=["chat_text", "intent"])
df = df.sample(frac=1).reset_index(drop=True)

# Simpan
os.makedirs(OUTPUT_DIR, exist_ok=True)
df.to_csv(OUTPUT_FILE, index=False)
print(f"✅ {len(df)} baris berhasil dibuat (masing‑masing intent {TARGET_PER_INTENT} baris).")
print(f"📁 File disimpan di: {os.path.abspath(OUTPUT_FILE)}")