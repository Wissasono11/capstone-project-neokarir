from pydantic import BaseModel
from typing import List, Optional

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