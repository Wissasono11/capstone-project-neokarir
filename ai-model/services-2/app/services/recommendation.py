from app.config import df_jobs
from app.services.skill_gap import check_education_gap, check_experience_gap

def csv_id_to_uuid(csv_id):
    if not csv_id:
        return csv_id
    csv_id_str = str(csv_id).strip()
    if csv_id_str.startswith("J-"):
        try:
            num = int(csv_id_str.replace("J-", ""))
            hex_str = f"{num:012x}"
            return f"00000000-0000-0000-0000-{hex_str}"
        except Exception:
            pass
    return csv_id_str

def calculate_match_score(user_skills, job_skills):
    set_user = {str(s).lower().strip() for s in user_skills}
    set_job = {str(s).lower().strip() for s in job_skills}
    intersection = set_user.intersection(set_job)
    if len(set_job) == 0: return 0
    return len(intersection) / len(set_job)

def get_full_recommendation(payload, top_n=10):
    jobs = df_jobs.copy()
    final_scores = []
    
    for index, row in jobs.iterrows():
        score = 0.0
        skill_match = calculate_match_score(payload.owned_skills, row['required_skills']) * 100
        score += skill_match
        
        if payload.target_domain != row['job_domain']: score = score * 0.2 
        if payload.target_role.lower() in str(row['job_title']).lower(): score += 15
            
        if payload.user_experience == "Belum ada (Fresh Graduate / Sedang belajar)" or payload.user_experience == "Belum ada pengalaman":
            if "Tahun" in str(row['min_experience']): score -= 10
                
        if payload.user_education == "SMA / SMK" and "S1" in str(row['min_education']):
            score -= 5
            
        final_score = min(100, max(0, round(score)))
        final_scores.append(final_score)

    jobs['final_match_score'] = final_scores
    jobs_sorted = jobs.sort_values(by='final_match_score', ascending=False)
    top_jobs = jobs_sorted.head(top_n).copy()
    
    if not top_jobs.empty:
        max_score = top_jobs['final_match_score'].max()
        if 0 < max_score < 95:
            scale_factor = 95.0 / max_score
            top_jobs['final_match_score'] = top_jobs['final_match_score'] * scale_factor
            top_jobs['final_match_score'] = top_jobs['final_match_score'].clip(upper=98.0).round().astype(int)
    
    hasil_rekomendasi = []
    for _, row in top_jobs.iterrows():
        # Compute match breakdown
        req_skills = row['required_skills']
        skills_match_ratio = calculate_match_score(payload.owned_skills, req_skills)
        
        min_exp = row.get('min_experience', 'Tidak Ditentukan')
        min_edu = row.get('min_education', 'Tidak Ditentukan')
        
        has_exp_gap, _, _ = check_experience_gap(payload.user_experience, min_exp)
        has_edu_gap, _, _ = check_education_gap(payload.user_education, min_edu)
        
        company_name = row.get('company', row.get('company_name', 'Perusahaan Terkait'))
        company_clean = str(company_name).lower().replace(' ', '').replace('pt', '')
        logo = f"https://logo.clearbit.com/{company_clean}.com"
        
        match_breakdown = {
            "skills": round(skills_match_ratio * 100),
            "experience": 100 if not has_exp_gap else 50,
            "education": 100 if not has_edu_gap else 60
        }
        
        hasil_rekomendasi.append({
            "job_id": csv_id_to_uuid(row['job_id']),
            "job_title": row['job_title'],
            "company": company_name,
            "job_domain": row['job_domain'],
            "match_score": row['final_match_score'],
            "required_skills": req_skills,
            "min_experience": min_exp,
            "min_education": min_edu,
            "logo": logo,
            "match_breakdown": match_breakdown
        })
        
    return {
        "status": "success",
        "total_jobs_analyzed": len(jobs),
        "recommendations": hasil_rekomendasi
    }