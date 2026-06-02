from pydantic import BaseModel
from typing import List, Optional, Dict

class UserProfilePayload(BaseModel):
    target_domain: str
    target_role: str
    owned_skills: List[str]
    user_experience: str
    user_education: str

class ProfileScorePayload(BaseModel):
    target_domain: str
    target_role: str
    owned_skills: List[str]

class SkillGapPayload(BaseModel):
    target_domain: Optional[str] = "Teknologi Informasi"
    target_role: Optional[str] = "Software Engineer"
    owned_skills: List[str] = []
    user_experience: Optional[str] = "Belum ada pengalaman"
    user_education: Optional[str] = "Tidak Disebutkan"
    current_role: Optional[str] = None

class MonthRecord(BaseModel):
    date: str
    demand: Dict[str, float]

class ForecastReq(BaseModel):
    history: Optional[List[MonthRecord]] = None
    n_months: int = 3
    domain: Optional[str] = None