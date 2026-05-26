from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional

from app.schemas import UserProfilePayload, ProfileScorePayload, SkillGapPayload
from app.services.recommendation import get_full_recommendation
from app.services.scoring import calculate_profile_score
from app.services.skill_gap import calculate_radar_data, generate_recommended_actions
from app.services.roadmap import get_job_specific_roadmap
from app.services.timeseries.predict import forecast, DOMAINS

app = FastAPI(title="NeoKarir - AI Recommendation API")


# ─── Schema timeseries ────────────────────────────────────────────────────────

class MonthRecord(BaseModel):
    date: str
    demand: Dict[str, float]

class ForecastRequest(BaseModel):
    history : Optional[List[MonthRecord]] = None  # None = otomatis dari CSV
    n_months: int = 3
    domain  : Optional[str] = None


# ─── Endpoint lama (tidak diubah) ────────────────────────────────────────────

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
    radar_chart_data = calculate_radar_data(
        target_domain=payload.target_domain,
        target_role=payload.target_role,
        user_skills=payload.owned_skills
    )
    if not radar_chart_data:
        return {"status": "error", "message": "Data role belum tersedia untuk dikalkulasi."}
    gap_results = {item["category"]: item["gap"] for item in radar_chart_data}
    recommended_actions = generate_recommended_actions(gap_results)
    return {
        "status": "success",
        "data": {
            "radar_chart_data": radar_chart_data,
            "recommended_actions": recommended_actions
        }
    }

@app.get("/api/roadmap/job-sync/{job_id}")
def fetch_roadmap_sync(job_id: str):
    result = get_job_specific_roadmap(job_id)
    if not result:
        return {"status": "error", "message": "ID Lowongan tidak ditemukan."}
    return {"status": "success", "data": result}


# ─── Endpoint timeseries ──────────────────────────────────────────────────────

@app.get("/api/trend/domains")
def fetch_trend_domains():
    """List semua domain IT yang tersedia."""
    return {"status": "success", "domains": DOMAINS, "total": len(DOMAINS)}


@app.post("/api/trend/forecast")
def fetch_trend_forecast(req: ForecastRequest):
    """
    Prediksi demand job IT N bulan ke depan.

    - Kirim body KOSONG ({}) → otomatis pakai 12 bulan terakhir dari CSV
    - Atau kirim history manual jika punya data dari database sendiri
    """
    try:
        history_raw = None
        if req.history:
            history_raw = [
                {"date": r.date, "demand": dict(r.demand)}
                for r in req.history
            ]

        result = forecast(
            history  = history_raw,
            n_months = req.n_months,
            domain   = req.domain,
        )
        return {
            "status"        : "success",
            "n_months"      : req.n_months,
            "predictions"   : result["predictions"],
            "top_domain"    : result["top_domain"],
            "generated_at"  : result["generated_at"],
            "history_source": result["history_source"],
        }

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")
