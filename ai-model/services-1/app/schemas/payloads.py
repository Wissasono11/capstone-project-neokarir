"""
==============================================================================
PAYLOADS.PY - Skema Data (Pydantic Models) untuk NeoKarir API
==============================================================================
Pydantic adalah library yang memungkinkan kita mendefinisikan "bentuk" data
menggunakan Python class dengan type hints.

Keuntungan menggunakan Pydantic di FastAPI:
1. Validasi otomatis: FastAPI akan otomatis menolak request yang datanya tidak sesuai
2. Serialisasi: Otomatis mengubah objek Python ke JSON dan sebaliknya
3. Dokumentasi: FastAPI otomatis membuat dokumentasi Swagger dari skema ini
4. Type safety: IDE bisa memberikan autocomplete dan error checking

Konvensi penamaan:
- `...Request` atau `...Input` = skema untuk DATA MASUK (dari client ke server)
- `...Response` atau `...Output` = skema untuk DATA KELUAR (dari server ke client)
==============================================================================
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field, field_validator


# ==============================================================================
# [FITUR 1] SKEMA CV ANALYZER
# ==============================================================================

class CVAnalysisResponse(BaseModel):
    """
    Skema respons setelah CV dianalisis oleh model NER (Named Entity Recognition).
    
    Model NER akan mengekstrak entitas-entitas penting dari teks CV.
    Hasilnya berupa list untuk setiap kategori entitas.
    """
    
    # Field yang diekstrak dari CV
    # `Field(default=[])` artinya jika tidak ada data, default-nya list kosong
    nama: str = Field(default="", description="Nama lengkap kandidat")
    
    skills: List[str] = Field(
        default=[],
        description="Daftar skill teknis dan non-teknis yang ditemukan di CV",
        examples=[["Python", "Machine Learning", "TensorFlow", "SQL"]],
    )
    
    pengalaman_kerja: List[Dict[str, str]] = Field(
        default=[],
        description="Daftar pengalaman kerja beserta detail perusahaan dan durasi",
        examples=[[
            {"posisi": "Data Scientist", "perusahaan": "Tokopedia", "durasi": "2021-2023"}
        ]],
    )
    
    pendidikan: List[Dict[str, str]] = Field(
        default=[],
        description="Riwayat pendidikan kandidat",
        examples=[[
            {"gelar": "S1 Informatika", "universitas": "UGM", "tahun_lulus": "2020"}
        ]],
    )
    
    sertifikasi: List[str] = Field(
        default=[],
        description="Daftar sertifikasi yang dimiliki",
        examples=[["AWS Certified ML Specialty", "TensorFlow Developer Certificate"]],
    )
    
    target_role: str = Field(
        default="",
        description="Role karir yang dituju (diekstrak dari CV atau profil tujuan)",
    )
    
    raw_text_preview: str = Field(
        default="",
        description="Cuplikan teks mentah dari CV (200 karakter pertama untuk debug)",
    )


# ==============================================================================
# [FITUR 2] SKEMA CAREER PROFILING & DASHBOARD
# ==============================================================================

class SkillRadarItem(BaseModel):
    """
    Satu item dalam grafik radar skill gap.
    Grafik radar (spider chart) menampilkan kemampuan user di berbagai dimensi.
    """
    kategori: str = Field(description="Nama kategori skill (misal: 'Machine Learning')")
    skor_user: float = Field(
        ge=0, le=100,
        description="Skor skill user saat ini (0-100)",
    )
    skor_target: float = Field(
        ge=0, le=100,
        description="Skor skill yang dibutuhkan untuk role target (0-100)",
    )
    gap: float = Field(
        description="Selisih antara target dan skor user (positif = kurang, negatif = lebih)"
    )


class RoadmapStep(BaseModel):
    """
    Satu langkah dalam roadmap belajar yang direkomendasikan AI.
    """
    urutan: int = Field(description="Urutan langkah (1, 2, 3, ...)")
    judul: str = Field(description="Judul topik/skill yang perlu dipelajari")
    deskripsi: str = Field(description="Penjelasan singkat mengapa ini penting")
    durasi_estimasi: str = Field(
        description="Estimasi waktu belajar (misal: '2 minggu', '1 bulan')"
    )
    resources: List[str] = Field(
        default=[],
        description="Daftar sumber belajar yang direkomendasikan (nama kursus, buku, dll)",
    )
    prioritas: str = Field(
        default="medium",
        description="Tingkat prioritas: 'high', 'medium', atau 'low'",
    )
    
    @field_validator("prioritas")
    @classmethod
    def validate_prioritas(cls, v: str) -> str:
        """Validasi bahwa prioritas hanya boleh 'high', 'medium', atau 'low'."""
        allowed = {"high", "medium", "low"}
        if v not in allowed:
            raise ValueError(f"Prioritas harus salah satu dari: {allowed}")
        return v


class CareerProgressScore(BaseModel):
    """
    Skor progress karir user secara keseluruhan.
    """
    skor_total: float = Field(
        ge=0, le=100,
        description="Skor progress keseluruhan (0-100)",
    )
    level: str = Field(
        description="Level karir saat ini (misal: 'Junior', 'Mid-level', 'Senior')"
    )
    persentil: float = Field(
        ge=0, le=100,
        description="Posisi user dibanding pengguna lain (0-100 persentil)",
    )
    kekuatan: List[str] = Field(
        default=[],
        description="Daftar kekuatan utama yang terdeteksi dari profil",
    )
    kelemahan: List[str] = Field(
        default=[],
        description="Daftar area yang perlu ditingkatkan",
    )


class JobMatchItem(BaseModel):
    """
    Satu item lowongan pekerjaan beserta skor kecocokan.
    Skor ini dihasilkan oleh Siamese Network di match_service.
    """
    job_id: str = Field(description="ID unik lowongan pekerjaan")
    judul_posisi: str = Field(description="Judul posisi pekerjaan")
    perusahaan: str = Field(description="Nama perusahaan")
    lokasi: str = Field(default="Remote", description="Lokasi pekerjaan")
    match_score: float = Field(
        ge=0, le=100,
        description="Skor kecocokan profil user dengan lowongan (0-100)",
    )
    alasan_cocok: List[str] = Field(
        default=[],
        description="Alasan mengapa lowongan ini cocok (dari analisis AI)",
    )
    skill_yang_kurang: List[str] = Field(
        default=[],
        description="Skill yang dimiliki lowongan tapi belum dimiliki user",
    )


class DashboardResponse(BaseModel):
    """
    Skema respons utama untuk halaman Dashboard.
    Ini adalah 'mega-response' yang menggabungkan semua data yang dibutuhkan
    frontend untuk menampilkan seluruh dashboard dalam SATU kali request.
    
    Keuntungan pendekatan ini:
    - Mengurangi jumlah request dari frontend (lebih efisien)
    - Frontend tidak perlu menunggu multiple API calls
    - Lebih mudah di-cache
    """
    user_id: str = Field(description="ID user yang dashboardnya sedang ditampilkan")
    
    # Data dari CV Analysis
    profil_cv: Optional[CVAnalysisResponse] = Field(
        default=None,
        description="Hasil analisis CV user (null jika belum upload CV)",
    )
    
    # Data dari Career Progress Scoring
    progress: Optional[CareerProgressScore] = Field(
        default=None,
        description="Skor dan detail progress karir user",
    )
    
    # Data untuk grafik radar skill gap
    skill_radar: List[SkillRadarItem] = Field(
        default=[],
        description="Data untuk menampilkan grafik radar perbandingan skill",
    )
    
    # Data roadmap belajar yang dipersonalisasi
    roadmap: List[RoadmapStep] = Field(
        default=[],
        description="Langkah-langkah roadmap belajar yang direkomendasikan AI",
    )
    
    # Data job matching
    rekomendasi_pekerjaan: List[JobMatchItem] = Field(
        default=[],
        description="Daftar pekerjaan yang paling cocok dengan profil user",
    )
    
    # Metadata
    terakhir_diperbarui: str = Field(
        description="Timestamp terakhir data diperbarui (format ISO 8601)"
    )
    pesan: str = Field(
        default="Dashboard berhasil dimuat.",
        description="Pesan status untuk ditampilkan ke user",
    )


# ==============================================================================
# [FITUR 3] SKEMA JOB MATCHING
# ==============================================================================

class JobMatchRequest(BaseModel):
    """
    Skema request untuk menjalankan job matching secara manual.
    User bisa meminta pencocokan dengan input teks langsung (tanpa upload CV).
    """
    profil_teks: str = Field(
        min_length=50,
        description="Teks deskripsi profil user (bisa dari summary CV atau bio)",
        examples=["Data Scientist dengan 3 tahun pengalaman di Python, ML, dan SQL..."],
    )
    deskripsi_lowongan: str = Field(
        min_length=50,
        description="Teks deskripsi lowongan pekerjaan yang ingin dicocokkan",
        examples=["Kami mencari Data Scientist yang berpengalaman dalam TensorFlow..."],
    )


class JobMatchResponse(BaseModel):
    """
    Respons dari endpoint job matching individual.
    """
    match_score: float = Field(
        ge=0, le=100,
        description="Skor kecocokan dalam persen (100 = sangat cocok)",
    )
    interpretasi: str = Field(
        description="Penjelasan teks dari skor (misal: 'Sangat Cocok', 'Cukup Cocok')"
    )
    detail_analisis: Dict[str, Any] = Field(
        default={},
        description="Detail analisis tambahan dari model",
    )


# ==============================================================================
# [FITUR 4] SKEMA CHATBOT RAG
# ==============================================================================

class ChatMessage(BaseModel):
    """
    Representasi satu pesan dalam percakapan.
    """
    role: str = Field(
        description="Pengirim pesan: 'user' atau 'assistant'",
    )
    content: str = Field(
        min_length=1,
        description="Isi pesan",
    )
    
    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        """Validasi bahwa role hanya 'user' atau 'assistant'."""
        allowed = {"user", "assistant"}
        if v not in allowed:
            raise ValueError(f"Role harus salah satu dari: {allowed}")
        return v


class ChatRequest(BaseModel):
    """
    Skema request untuk mengirim pesan ke chatbot.
    Kita sertakan `history` agar chatbot bisa memahami konteks percakapan sebelumnya.
    """
    pesan: str = Field(
        min_length=1,
        max_length=2000,
        description="Pesan terbaru dari user",
        examples=["Bagaimana cara menjadi Data Scientist di usia 25 tahun?"],
    )
    
    history: List[ChatMessage] = Field(
        default=[],
        description="""
        Riwayat percakapan sebelumnya (opsional).
        Frontend bertanggung jawab menyimpan dan mengirimkan history ini.
        Format: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
        """,
    )
    
    user_id: Optional[str] = Field(
        default=None,
        description="ID user (opsional, untuk personalisasi respons chatbot)",
    )
    
    konteks_karir: Optional[str] = Field(
        default=None,
        description="""
        Konteks karir user saat ini (opsional).
        Jika diberikan, chatbot akan memberikan respons yang lebih relevan.
        Misal: 'Data Analyst dengan 2 tahun pengalaman, ingin pindah ke ML Engineer'
        """,
    )


class ChatResponse(BaseModel):
    """
    Respons dari chatbot.
    """
    jawaban: str = Field(
        description="Jawaban dari AI Career Assistant"
    )
    
    sumber_referensi: List[str] = Field(
        default=[],
        description="""
        Sumber dokumen yang digunakan RAG untuk menjawab pertanyaan.
        Ini adalah fitur 'transparency' agar user tahu jawaban berasal dari mana.
        """,
    )
    
    pertanyaan_lanjutan: List[str] = Field(
        default=[],
        description="""
        Daftar pertanyaan lanjutan yang mungkin ingin ditanyakan user.
        Berguna untuk UX chatbot yang lebih smooth.
        """,
    )
    
    is_career_related: bool = Field(
        default=True,
        description="""
        Apakah pertanyaan user berkaitan dengan karir.
        Jika False, chatbot akan meminta user untuk bertanya tentang karir.
        """,
    )


# ==============================================================================
# SKEMA UMUM (SHARED SCHEMAS)
# ==============================================================================

class ErrorResponse(BaseModel):
    """
    Format standar untuk respons error.
    Konsistensi format error penting agar frontend mudah menanganinya.
    """
    status: str = Field(default="error")
    kode_error: str = Field(description="Kode error yang spesifik (misal: 'CV_PARSE_FAILED')")
    pesan: str = Field(description="Pesan error yang user-friendly dalam Bahasa Indonesia")
    detail: Optional[str] = Field(
        default=None,
        description="Detail teknis error (hanya tampil di mode development)",
    )


class SuccessResponse(BaseModel):
    """
    Format standar untuk respons sukses sederhana.
    Digunakan untuk endpoint yang tidak perlu mengembalikan data spesifik.
    """
    status: str = Field(default="success")
    pesan: str = Field(description="Pesan sukses")
    data: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Data tambahan jika ada",
    )
