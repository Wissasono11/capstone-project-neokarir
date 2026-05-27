import json
import logging
from app.ai_engine.services.chatbot_service import get_llm_client # Gunakan client yang sudah kamu buat

logger = logging.getLogger("neokarir.cv_analyzer")

async def analyze_cv_with_groq(extracted_cv_text: str) -> dict:
    client = get_llm_client()
    
    # Skema JSON disesuaikan persis dengan kebutuhan UI
    system_prompt = """
    You are an ELITE, highly strict Senior Technical Recruiter and ATS Specialist reviewing CVs for a Top-Tier Tech Company. You have exceptionally high standards and are highly critical of vague claims.
    
    Your task is to analyze the provided CV text and output STRICTLY in JSON format.
    Answer entirely in professional, objective, and highly critical Bahasa Indonesia.

    ATURAN KRITIS PENILAIAN (HARUS TEGAS NAMUN MEMAHAMI KONTEKS):

    1. PENILAIAN BERBASIS KONTEKS (LEVEL KANDIDAT): Segera deteksi level kandidat. JIKA CV milik mahasiswa, fresh graduate, atau level junior: JANGAN hukum mereka karena kurangnya pengalaman kerja profesional. Sebagai gantinya, evaluasi secara ketat kompleksitas proyek akademik, portofolio bootcamp, sertifikasi, dan tech stack mereka.
    2. BAGIAN WAJIB (MANDATORY SECTIONS):
    - Kontak: Wajib ada Nama, Email, Telepon, dan Tautan (LinkedIn & GitHub/Portofolio WAJIB untuk posisi IT). Potong poin jika tautan ini tidak ada.
    - Ringkasan Profesional: 2-3 kalimat padat di bagian atas yang menunjukkan nilai jual (tanpa basa-basi).
    - Keahlian Teknis: Harus berupa teks bersih (dipisah koma atau bullet). Beri peringatan jika formatnya berantakan atau tidak bisa di-parsing.
    - Pengalaman Kerja: Wajib urutan kronologis terbalik (terbaru di atas), memuat Jabatan, Perusahaan, Lokasi, dan Bulan/Tahun.
    - Pendidikan: Wajib memuat Gelar, Jurusan, Kampus, Tahun Lulus (IPK wajib untuk fresh graduate).
    3. ANTI BASA-BASI & WAJIB DETAIL: Hukum keras soft skills yang ambigu (misal: "pekerja keras"). Gunakan kata kerja aktif yang kuat. Setiap proyek WAJIB menyertakan tech stack dan peran spesifik (Contoh: Jangan hanya menulis "Membangun model AI", wajibkan "Membangun model sentimen analisis menggunakan IndoBERT dengan akurasi 92%").
    4. BAHASA & FORMAT SUPER KETAT: Pindai seluruh teks dari singkatan obrolan/bahasa gaul (misal: 'ttg', 'dgn', 'yg', 'dlm'). Sistem ATS gagal membaca singkatan ini. Beri penalti skor yang sangat berat jika ditemukan.
    5. KONSISTENSI & SKORING YANG KEJAM TAPI ADIL: JANGAN NAIKKAN SKOR SECARA SEMBARANGAN. Skor rata-rata CV adalah 50-70. Skor 85-100 HANYA untuk CV sempurna kelas dunia. Pastikan argumen kelemahan Anda konsisten dengan skor yang diberikan.
    6. BATAS MAKSIMAL SKOR (WAJIB DIPATUHI):
    - Jika CV menggunakan kata singkatan/tidak baku: SKOR MAKSIMAL 60.
    - Jika CV tidak memuat semua Bagian Wajib (Mandatory Sections): SKOR MAKSIMAL 65.
    - Jika proyek atau pengalaman kerja tidak memiliki metrik kuantitatif: SKOR MAKSIMAL 70.
    7. REKOMENDASI YANG SPESIFIK: Kritik Anda harus bisa dieksekusi. Beritahu kandidat secara persis kalimat mana yang salah dan berikan contoh konkret bagaimana cara menulis ulangnya.
    
    REQUIRED JSON SCHEMA:
    {
      "step_1_checklist_mandatory_sections": {
        "has_contact_details": <boolean, WAJIB true jika ada email dan nomor telepon>,
        "has_linkedin_link": <boolean, WAJIB true jika ada tautan/ID LinkedIn>,
        "has_github_or_portfolio": <boolean, WAJIB true jika ada tautan GitHub/Portofolio teknis>,
        "has_professional_summary": <boolean, WAJIB true jika ada paragraf ringkasan profil di atas>,
        "has_education": <boolean, WAJIB true jika ada riwayat pendidikan/kampus>,
        "has_work_experience": <boolean, WAJIB true jika ada riwayat kerja profesional>,
        "has_projects": <boolean, WAJIB true jika ada daftar proyek akademik/pribadi/bootcamp>,
        "has_technical_skills": <boolean, WAJIB true jika ada daftar skill teknis>
      },
      "step_2_detected_slang_words": [
        "<string, KUTIP HANYA singkatan chat/tidak baku (misal: 'yg', 'dgn', 'krn', 'Skrg'). PERINGATAN KERAS: JANGAN pernah memasukkan kata baku Bahasa Indonesia seperti 'dengan', 'secara', 'memastikan', 'untuk', dll. Kosongkan array [] jika teks sudah menggunakan bahasa formal.>"
      ],
      "step_3_missing_sections": [
        "<string, EVALUASI step_1. Masukkan nama bagian untuk setiap key yang bernilai false. Khusus kandidat Fresh Grad/Student: abaikan jika 'has_work_experience' false asalkan 'has_projects' true.>"
      ],
      "calculated_max_limit": <int, JIKA step_2 terisi maka 60. JIKA step_3 terisi maka 65. JIKA keduanya terisi maka 60. Jika aman maka 100.>,
      
      "ats_score": <int, skor akhir. WAJIB <= calculated_max_limit>,
      
      "match_analysis_text": "<string, paragraf evaluasi kritis...>",
      "star_rating": <int, 1-5>,
      "strengths": [
        "<string, kekuatan utama>"
      ],
      "weaknesses": [
        "<string, kelemahan kritikal. WAJIB sebutkan isi dari missing_sections dan slang_words jika ada!>"
      ],
      "recommendations": [
        {
          "advice": "<string, saran perbaikan yang spesifik>",
          "priority": "<string, High/Medium/Low Priority>"
        }
      ]
    }
    """

    user_prompt = f"Here is the CV text to analyze:\n\n{extracted_cv_text}"

    try:
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile", # Disarankan menggunakan model ini untuk akurasi checklist
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.3, # Suhu rendah agar format JSON konsisten
            max_tokens=1024
        )
        
        # 1. Ekstrak string JSON dan ubah menjadi Python dictionary
        raw_json_string = response.choices[0].message.content or "{}"
        analysis_result = json.loads(raw_json_string)

        # 2. Daftar variabel "otak" LLM yang harus dihapus
        keys_to_remove = [
            "step_1_checklist_mandatory_sections",
            "step_2_detected_slang_words",
            "step_3_missing_sections",
            "calculated_max_limit"
        ]
        
        # 3. Proses pembersihan (pop) sebelum dikirim ke Frontend
        for key in keys_to_remove:
            analysis_result.pop(key, None) # Gunakan None agar tidak crash jika key tidak ditemukan

        return analysis_result

    except Exception as e:
        logger.error(f"❌ Gagal menganalisis CV via Groq: {e}")
        return {"error": "Failed to analyze CV"}