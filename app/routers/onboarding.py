"""
==============================================================================
ONBOARDING.PY - Router untuk Endpoint Onboarding & CV Analysis
==============================================================================
Router ini telah diperbarui untuk mendukung pipeline NeoKarir Profiling Engine.
Flow onboarding:
1. User upload file CV (PDF) lewat form-data.
2. Router memvalidasi ukuran dan format file.
3. Router mendelegasikan pemrosesan utuh ke cv_service.process_cv_to_profile().
4. Hasil JSON terstruktur langsung dikembalikan ke Frontend untuk di-review.
5. User mengkonfirmasi hasil via endpoint /save-profile.
==============================================================================
"""

import logging
from typing import List, Dict, Any
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel

# Pastikan import service kamu benar
from app.ai_engine.services import cv_service

logger = logging.getLogger("neokarir.router.onboarding")

router = APIRouter()

# Batasi ukuran file upload (10 MB)
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024


# ==========================================
# 1. PYDANTIC SCHEMAS (Validasi Output/Input)
# ==========================================
# Skema ini merepresentasikan format data dari profil database
class UserProfilePayload(BaseModel):
    user_id: str
    career_goal:str
    target_domain: str
    target_role: str
    owned_skills: List[str]
    user_experience: str
    user_education: str
    metadata: Dict[str, Any]

class SuccessResponse(BaseModel):
    status: str
    pesan: str
    data: dict


# ==========================================
# 2. ENDPOINTS
# ==========================================
@router.post(
    "/auto-profiling",
    summary="Upload dan Analisis CV (Auto-Profiling)",
    description="Menerima PDF CV, menjalankan XLM-RoBERTa NER, dan mengonversinya menjadi Profil Database.",
    status_code=status.HTTP_200_OK,
)
async def analyze_cv(
    cv_file: UploadFile = File(..., description="File CV dalam format PDF (maks 10 MB)"),
    user_id: str = Form(..., description="ID user pemilik CV")
):
    logger.info(f"Menerima request analisis CV dari user: {user_id}, file: {cv_file.filename}")
    
    # --- 1. Validasi Ekstensi File ---
    if not cv_file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format tidak didukung. Harap unggah dokumen PDF."
        )
    
    # --- 2. Validasi Ukuran File (Baca ke Memori) ---
    try:
        file_bytes = await cv_file.read()
    except Exception as e:
        logger.error(f"Gagal membaca byte stream file: {e}")
        raise HTTPException(status_code=500, detail="Gagal membaca file dari sistem.")
        
    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ukuran file terlalu besar. Maksimal 10 MB."
        )
        
    # --- 3. Eksekusi AI Engine (Delegasi ke cv_service) ---
    try:
        # Service ini otomatis melakukan ekstraksi PDF -> NER -> Mapping Profile
        profile_result = cv_service.process_cv_to_profile(
            user_id=user_id, 
            file_bytes=file_bytes, 
            filename=cv_file.filename
        )
    except RuntimeError as re:
        # Error jika PDF rusak atau model belum siap
        raise HTTPException(status_code=422, detail=str(re))
    except Exception as e:
        logger.error(f"Fatal Error pada AI Engine: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Terjadi kesalahan pada mesin AI saat menganalisis CV."
        )
        
    # Kembalikan dictionary hasil profiling ke Frontend
    return profile_result


@router.post(
    "/save-profile",
    response_model=SuccessResponse,
    summary="Simpan Profil Onboarding User",
    description="Menerima data JSON hasil konfirmasi user dari halaman CV Analyzer dan menyimpannya ke DB.",
)
async def save_user_profile(payload: UserProfilePayload):
    """
    Endpoint ini menerima data FINAL setelah user mereview dan 
    memilih Domain & Role di UI (Step 3).
    """
    logger.info(f"Menyimpan profil final untuk user: {payload.user_id} dengan Role: {payload.target_role}")
    
    try:
        # --- LOGIKA DATABASE ---
        # Di sini kamu cukup melakukan "Upsert" (Update or Insert) ke tabel profil.
        # Data yang di-insert adalah data final pilihan user (payload), 
        # sehingga menimpa/menimpa tebakan awal dari AI jika user mengubahnya.
        
        # Contoh jika pakai MongoDB (Motor):
        # user_dict = payload.model_dump() # Ubah pydantic ke dictionary
        # await db.user_profiles.update_one(
        #     {"user_id": payload.user_id},
        #     {"$set": user_dict},
        #     upsert=True
        # )
        
        return SuccessResponse(
            status="success",
            pesan="Profil berhasil disimpan secara permanen!",
            data={
                "user_id": payload.user_id,
                "saved_domain": payload.target_domain,
                "saved_role": payload.target_role,
                "total_skills": len(payload.owned_skills)
            }
        )
    except Exception as e:
        logger.error(f"Gagal menyimpan profil {payload.user_id}: {e}")
        raise HTTPException(status_code=500, detail="Gagal menyimpan ke database.")