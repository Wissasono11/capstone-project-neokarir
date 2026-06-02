from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai_engine.services.match_service import calculate_single_job_match

router = APIRouter()

# Schema untuk request dari Frontend
class MatchRequest(BaseModel):
    user_id: str
    job_id: str

@router.post(
    "/evaluate",
    summary="Kalkulasi Kecocokan 1-to-1 (User vs Spesifik Job)",
)
async def evaluate_job_match(payload: MatchRequest):
    """
    Endpoint ini dipanggil saat user menekan tombol 'Match' pada sebuah Job Card.
    """
    
    # --- 1. AMBIL DATA DARI DATABASE ---
    # TODO: Ganti ini dengan query database aslimu
    # user_profile = await db.users.find_one({"user_id": payload.user_id})
    # job_detail = await db.jobs.find_one({"job_id": payload.job_id})
    
    # (Simulasi Data DB)
    user_profile = {
        "owned_skills": ["CI/CD", "Docker", "Kubernetes", "Python"],
        "user_education": "S1/D4",
        "user_experience": "1-3 tahun"
    }
    
    job_detail = {
        "job_title": "Senior DevOps",
        "required_skills": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
        "min_education": "S2",
        "min_experience": "3-5 tahun" # Membutuhkan 4 tahun (skor 4)
    }

    if not user_profile or not job_detail:
        raise HTTPException(status_code=404, detail="User atau Job tidak ditemukan")

    # --- 2. JALANKAN LOGIKA MATCHING ---
    match_result = calculate_single_job_match(user_profile, job_detail)

    # --- 3. KEMBALIKAN KE FRONTEND ---
    return {
        "user_id": payload.user_id,
        "job_id": payload.job_id,
        "job_title": job_detail["job_title"],
        "evaluation": match_result
    }