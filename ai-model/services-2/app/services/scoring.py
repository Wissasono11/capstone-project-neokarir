from app.config import df_jobs

def calculate_profile_score(target_domain, target_role, owned_skills):
    jobs = df_jobs.copy()
    max_score = 0
    
    # Normalisasi owned_skills
    set_user = {str(s).lower().strip() for s in owned_skills}
    
    for index, row in jobs.iterrows():
        score = 0.0
        # Normalisasi skill di dataset
        set_job = {str(s).lower().strip() for s in row['required_skills']}
        intersection = set_user.intersection(set_job)
        
        # 1. Skill Match (Bobot 60%) - Lebih besar pengaruhnya
        if len(set_job) > 0:
            skill_match = (len(intersection) / len(set_job)) * 60
        else:
            skill_match = 0
        score += skill_match
        
        # 2. Bonus Banyak Skill (Hanya jika skill tersebut relevan/masuk intersection)
        # Jangan kasih bonus cuma karena user input skill random yang tidak nyambung
        bonus_relevansi = min(10, len(intersection) * 2)
        score += bonus_relevansi
        
        # 3. Domain & Role Match (Bobot 30%)
        if target_domain.lower() == str(row['job_domain']).lower(): 
            score += 15
        if target_role.lower() in str(row['job_title']).lower(): 
            score += 15
            
        final_score = min(100, max(0, round(score)))
        if final_score > max_score: 
            max_score = final_score
            
    return max_score