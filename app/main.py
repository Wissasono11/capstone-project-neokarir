from fastapi import FastAPI, HTTPException
from app.schemas import UserProfilePayload, ProfileScorePayload, SkillGapPayload, ForecastReq
from app.services.recommendation import get_full_recommendation
from app.services.scoring import calculate_profile_score
from app.services.skill_gap import calculate_complete_skill_gap, uuid_to_csv_id
from app.services.roadmap import get_job_specific_roadmap
from app.services.timeseries.predict import forecast as run_forecast, DOMAINS

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
    result = calculate_complete_skill_gap(
        target_domain=payload.target_domain,
        target_role=payload.target_role,
        owned_skills=payload.owned_skills,
        user_experience=payload.user_experience,
        user_education=payload.user_education,
        current_role=payload.current_role
    )
    return {
        "status": "success",
        "data": result
    }

@app.get("/api/roadmap/job-sync/{job_id}")
def fetch_roadmap_sync(job_id: str):
    csv_job_id = uuid_to_csv_id(job_id)
    result = get_job_specific_roadmap(csv_job_id)
    
    if not result or (isinstance(result, dict) and result.get("status") == "error"):
        return {"status": "error", "message": f"ID Lowongan '{job_id}' tidak ditemukan."}
        
    return {
        "status": "success",
        "data": result
    }

@app.get("/api/trend/domains")
def get_trend_domains():
    return {
        "status": "success",
        "domains": DOMAINS,
        "total": len(DOMAINS)
    }

@app.post("/api/trend/forecast")
def fetch_trend_forecast(payload: ForecastReq):
    try:
        history_list = None
        if payload.history is not None:
            history_list = [item.dict() for item in payload.history]
        
        result = run_forecast(
            history=history_list,
            n_months=payload.n_months,
            domain=payload.domain
        )
        return {
            "status": "success",
            "n_months": payload.n_months,
            **result
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))