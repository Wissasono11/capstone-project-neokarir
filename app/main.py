from fastapi import FastAPI
from app.schemas import UserProfilePayload, ProfileScorePayload, SkillGapPayload
from app.services.recommendation import get_full_recommendation
from app.services.scoring import calculate_profile_score
from app.services.skill_gap import calculate_radar_data, generate_recommended_actions
from app.services.roadmap import get_job_specific_roadmap

app = FastAPI(title="NeoKarir - AI Recommendation API")

@app.get("/")
def home():
    return {"message": "API NeoKarir AI 2 Berjalan Normal - Clean Architecture Mode"}

@app.post("/api/recommendation/dynamic")
def fetch_recommendation(payload: UserProfilePayload):
    return get_full_recommendation(payload, top_n=10)

@app.post("/api/profile/score")
def fetch_profile_score(payload: ProfileScorePayload):
    skor_tertinggi = calculate_profile_score(
        target_domain=payload.target_domain,
        target_role=payload.target_role,
        owned_skills=payload.owned_skills
    )
    return {"status": "success", "overall_profile_score": skor_tertinggi}

@app.post("/api/profile/skill-gap")
def fetch_skill_gap(payload: SkillGapPayload):
    
    radar_data = calculate_radar_data(
        target_domain=payload.target_domain,
        target_role=payload.target_role,
        user_skills=payload.owned_skills # Ini harus berisi list gabungan
    )
    
    # Hitung gap ringkasan
    gap_summary = {item["category"]: item["gap"] for item in radar_data}
    actions = generate_recommended_actions(gap_summary)
    if not radar_chart_data:
        return {"status": "error", "message": "Data role belum tersedia untuk dikalkulasi."}
    
    gap_results = {item["category"]: item["gap"] for item in radar_chart_data}
    recommended_actions = generate_recommended_actions(gap_results)
    
    return {
        "status": "success",
        "data": {
            "radar_chart": radar_data,
            "recommendations": actions
        }
    }

@app.get("/api/roadmap/job-sync/{job_id}")
def fetch_roadmap_sync(job_id: str):
    result = get_job_specific_roadmap(job_id)
    
    if not result:
        return {"status": "error", "message": "ID Lowongan tidak ditemukan."}
        
    return {
        "status": "success",
        "data": result
    }