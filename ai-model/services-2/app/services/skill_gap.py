import math
from app.config import df_jobs
from app.taxonomy import skill_taxonomy

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

def uuid_to_csv_id(uuid_str):
    if not uuid_str:
        return uuid_str
    uuid_str = str(uuid_str).strip()
    if uuid_str.startswith("00000000-0000-0000-0000-"):
        try:
            hex_part = uuid_str.split("-")[-1]
            num = int(hex_part, 16)
            return f"J-{num:04d}"
        except Exception:
            pass
    return uuid_str

def get_skills_list(skills_data):
    if isinstance(skills_data, list):
        return skills_data
    if isinstance(skills_data, str):
        import ast
        try:
            parsed = ast.literal_eval(skills_data)
            if isinstance(parsed, list):
                return [str(s).strip() for s in parsed]
        except Exception:
            pass
        clean_str = skills_data.replace('[', '').replace(']', '').replace("'", "")
        return [s.strip() for s in clean_str.split(',')]
    return []

def get_domain_taxonomy(target_domain):
    if not target_domain:
        first_key = list(skill_taxonomy.keys())[0]
        return skill_taxonomy[first_key], first_key
        
    target_domain_clean = str(target_domain).strip()
    if target_domain_clean in skill_taxonomy:
        return skill_taxonomy[target_domain_clean], target_domain_clean
    
    domain_lower = target_domain_clean.lower()
    
    mapping = {
        "web": "Web Development",
        "mobile": "Mobile Development",
        "cyber": "Cyber Security",
        "cloud": "Cloud & DevOps",
        "devops": "Cloud & DevOps",
        "ui/ux": "UI/UX Design",
        "design": "UI/UX Design",
        "qa": "Quality Assurance (QA) & Testing",
        "quality": "Quality Assurance (QA) & Testing",
        "testing": "Quality Assurance (QA) & Testing",
        "data": "Data Science & Artificial Intelligence",
        "ai": "Data Science & Artificial Intelligence",
        "science": "Data Science & Artificial Intelligence"
    }
    
    for kw, key in mapping.items():
        if kw in domain_lower:
            return skill_taxonomy[key], key
            
    # Default fallback to first key
    first_key = list(skill_taxonomy.keys())[0]
    return skill_taxonomy[first_key], first_key

def find_best_matching_job(target_domain, target_role):
    if df_jobs.empty:
        return None
        
    target_role_clean = str(target_role or "").strip()
    target_domain_clean = str(target_domain or "").strip()
    
    # 1. Try case-insensitive substring match on job title
    if target_role_clean:
        jobs_filtered = df_jobs[df_jobs['job_title'].str.contains(target_role_clean, case=False, na=False)]
        if not jobs_filtered.empty:
            return jobs_filtered.iloc[0]
            
    # 2. Try match on job domain
    if target_domain_clean:
        _, canonical_domain = get_domain_taxonomy(target_domain_clean)
        jobs_filtered = df_jobs[df_jobs['job_domain'].str.contains(canonical_domain, case=False, na=False)]
        if not jobs_filtered.empty:
            return jobs_filtered.iloc[0]
            
    # 3. Fallback to first job in catalog
    return df_jobs.iloc[0]

def check_education_gap(user_edu, req_edu):
    if not req_edu or str(req_edu).lower() in ["tidak ditentukan", "tidak disebutkan", "n/a", "none", "nan", ""]:
        return False, "Tidak Disebutkan", "Sesuai dengan kualifikasi"
        
    edu_hierarchy = {
        "sma/smk": 1, "sma": 1, "smk": 1, "sma / smk": 1, "sma/smk/sederajat": 1,
        "d3": 2, "diploma": 2, "d-3": 2,
        "s1/d4": 3, "s1": 3, "d4": 3, "s1 / d4": 3, "sarjana": 3,
        "s2/s3": 4, "s2": 4, "s3": 4, "s2 / s3": 4, "pascasarjana": 4
    }
    
    def get_val(edu_str):
        edu_str_lower = str(edu_str).lower().strip()
        for k, v in edu_hierarchy.items():
            if k in edu_str_lower:
                return v
        return 0
        
    u_val = get_val(user_edu or "S1")
    r_val = get_val(req_edu)
    
    if u_val < r_val and r_val > 0:
        return True, req_edu, f"Gap pendidikan: Kamu {user_edu or 'S1'}"
    return False, req_edu, "Sesuai dengan kualifikasi"

def check_experience_gap(user_exp, req_exp):
    if not req_exp or str(req_exp).lower() in ["tidak ditentukan", "tidak disebutkan", "n/a", "none", "nan", ""]:
        return False, "Tidak Disebutkan", "Memenuhi kualifikasi pengalaman kerja"
        
    exp_hierarchy = {
        "belum ada": 0, "fresh graduate": 0, "tanpa pengalaman": 0, "sedang belajar": 0,
        "< 1": 1, "kurang dari 1": 1, "0-1": 1,
        "1-3": 2, "1 - 3": 2, "2-3": 2,
        "3-5": 3, "3 - 5": 3, "4-5": 3,
        "> 5": 4, "lebih dari 5": 4, "5+": 4
    }
    
    def get_val(exp_str):
        exp_str_lower = str(exp_str).lower().strip()
        for k, v in exp_hierarchy.items():
            if k in exp_str_lower:
                return v
        return 0
        
    u_val = get_val(user_exp or "Belum ada pengalaman")
    r_val = get_val(req_exp)
    
    if u_val < r_val and r_val > 0:
        return True, req_exp, f"Ada gap: Pengalaman kamu saat ini adalah {user_exp or 'Belum ada pengalaman'}"
    return False, req_exp, "Memenuhi kualifikasi pengalaman kerja"

# --- LOGIKA RADAR CHART ---
def calculate_radar_data(target_domain, target_role, user_skills):
    domain_taxonomy, canonical_domain = get_domain_taxonomy(target_domain)
    
    # Filter jobs in catalog to compute statistics
    target_role_clean = str(target_role or "").strip()
    jobs_filtered = df_jobs[df_jobs['job_title'].str.contains(target_role_clean, case=False, na=False)] if target_role_clean else df_jobs
    if jobs_filtered.empty:
        jobs_filtered = df_jobs[df_jobs['job_domain'].str.contains(canonical_domain, case=False, na=False)]
    if jobs_filtered.empty:
        jobs_filtered = df_jobs
        
    radar_data = []
    user_skills_set = {str(s).lower().strip() for s in user_skills}
        
    for category, category_skills in domain_taxonomy.items():
        relevant_jobs_skills = jobs_filtered['required_skills'].apply(
            lambda x: len(set([s.lower() for s in x]).intersection(set([s.lower() for s in category_skills])))
        )
        avg_skills_needed = relevant_jobs_skills.mean() if not relevant_jobs_skills.empty else 1
        avg_skills_needed = max(1, math.ceil(avg_skills_needed))
        
        cat_skills_lower = {s.lower() for s in category_skills}
        user_skills_in_category = len(user_skills_set.intersection(cat_skills_lower))
        
        required_percentage = 80 # Standar industri
        fulfillment_ratio = user_skills_in_category / avg_skills_needed if avg_skills_needed > 0 else 1.0
        current_percentage = min(100, required_percentage * fulfillment_ratio)
        gap = current_percentage - required_percentage
        
        # We output dual compatibility keys (category/subject, current/A, required/B)
        radar_data.append({
            "category": category,
            "subject": category,
            "current": round(current_percentage),
            "A": round(current_percentage),
            "required": round(required_percentage),
            "B": round(required_percentage),
            "gap": round(gap)
        })
    return radar_data

def generate_recommended_actions(gap_results):
    critical, improvement, strengths = [], [], []

    for category, gap_value in gap_results.items():
        if gap_value <= -10:
            critical.append(category)
        elif gap_value < 0:
            improvement.append(category)
        else:
            strengths.append(category)

    actions = {"critical_gap": "", "needs_improvement": "", "strengths": ""}

    actions["critical_gap"] = f"Focus on {' & '.join(critical)} skills." if critical else "You have no critical skill gaps."
    actions["needs_improvement"] = f"Enhance {' & '.join(improvement)} expertise." if improvement else "All your core skills are solid."
    actions["strengths"] = f"{' & '.join(strengths)} skills exceed requirements." if strengths else "Keep learning to surpass industry standards."

    return actions

# --- FUNGSI UTAMA UNTUK COMPLETE SKILL GAP ---
def calculate_complete_skill_gap(target_domain, target_role, owned_skills, user_experience, user_education, current_role):
    # Find canonical domain
    _, canonical_domain = get_domain_taxonomy(target_domain)
    
    # 1. Match job profile
    job = find_best_matching_job(canonical_domain, target_role)
    if job is not None:
        job_csv_id = job['job_id']
        job_title = job['job_title']
        min_education = job['min_education']
        min_experience = job['min_experience']
        required_skills = get_skills_list(job['required_skills'])
    else:
        # Fallback values
        job_csv_id = "J-0001"
        job_title = target_role or "Software Engineer"
        min_education = "S1/D4"
        min_experience = "1 - 3 Tahun"
        required_skills = owned_skills or ["SQL", "Git"]

    # Normalize skills
    owned_skills_lower = {str(s).lower().strip() for s in owned_skills}
    matched_skills = []
    missing_skills = []
    
    for s in required_skills:
        if str(s).lower().strip() in owned_skills_lower:
            matched_skills.append(s)
        else:
            missing_skills.append(s)
            
    # Calculate Gaps
    has_edu_gap, mapped_req_edu, edu_explanation = check_education_gap(user_education, min_education)
    has_exp_gap, mapped_req_exp, exp_explanation = check_experience_gap(user_experience, min_experience)
    
    # Compute Scores
    skill_score = (len(matched_skills) / len(required_skills) * 100) if required_skills else 100.0
    edu_penalty = 10 if has_edu_gap else 0
    exp_penalty = 15 if has_exp_gap else 0
    
    readiness_score = max(30, min(95, round(skill_score - edu_penalty - exp_penalty)))
    
    # Scale up if user has all skills
    if len(missing_skills) == 0:
        readiness_score = max(95, readiness_score)
        
    readiness_level = "Siap Kerja" if readiness_score >= 90 else "Hampir Siap" if readiness_score >= 70 else "Perlu Belajar"
    
    # 2. Radar Chart
    radar_chart_data = calculate_radar_data(canonical_domain, target_role, owned_skills)
    
    # 3. Recommended Actions
    gap_summary = {item["category"]: item["gap"] for item in radar_chart_data}
    recommended_actions = generate_recommended_actions(gap_summary)
    
    # 4. Skill Breakdown
    skill_breakdown = []
    for idx, skill in enumerate(required_skills):
        is_matched = skill in matched_skills
        if is_matched:
            # Owned skill percentages (e.g. current 90% vs required 80%, showing positive gap)
            current_val = 80 + (idx % 3) * 5
            required_val = 70 + (idx % 2) * 5
        else:
            # Missing skill percentages (e.g. current 50% vs required 85%, showing negative gap)
            current_val = 40 + (idx % 3) * 5
            required_val = 80 + (idx % 2) * 5
            
        gap = current_val - required_val
        skill_breakdown.append({
            "skill": skill,
            "current": current_val,
            "required": required_val,
            "gap": gap,
            "trend": "up" if gap >= 0 else "down"
        })
        
    # 5. Detailed Skills to Learn
    detailed_skills_to_learn = []
    # Find domain taxonomy to classify missing skills
    domain_tax, _ = get_domain_taxonomy(canonical_domain)
    
    for idx, skill in enumerate(missing_skills):
        # Find category in taxonomy
        skill_cat = "Umum"
        for cat, skills in domain_tax.items():
            if any(s.lower() == skill.lower() for s in skills):
                skill_cat = cat
                break
                
        # Find gap value from breakdown
        matched_breakdown = next((b for b in skill_breakdown if b["skill"] == skill), None)
        gap_val = abs(matched_breakdown["gap"]) if matched_breakdown else 35
        
        priority = "Tinggi" if gap_val >= 35 else "Sedang"
        est_study = "6 - 8 Minggu" if priority == "Tinggi" else "4 - 6 Minggu"
        
        # Related skills: other required skills
        related = [s for s in required_skills if s.lower() != skill.lower()][:2]
        
        detailed_skills_to_learn.append({
            "skill": skill,
            "gap": gap_val,
            "category": skill_cat,
            "priority": priority,
            "description": f"Kemampuan relevan untuk perancangan dan implementasi {skill} pada peran {job_title}.",
            "alasan": f"Dibutuhkan untuk menutupi skill gap peran {job_title}.",
            "relatedSkills": related,
            "waktuBelajar": est_study
        })
        
    # 6. Fetch Roadmap
    learning_roadmap = []
    try:
        from app.services.roadmap import get_job_specific_roadmap
        roadmap_res = get_job_specific_roadmap(job_csv_id)
        if roadmap_res and "learning_roadmap" in roadmap_res:
            learning_roadmap = roadmap_res["learning_roadmap"]
    except Exception as e:
        print(f"[WARN] Failed to get roadmap for {job_csv_id}: {e}")
        
    # Standardize result object
    result = {
        "job_id": csv_id_to_uuid(job_csv_id),
        "target_role": job_title,
        "target_domain": canonical_domain,
        "current_position": current_role or "Fresh Graduate",
        "match_score": readiness_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "required_skills": required_skills,
        "readiness_score": readiness_score,
        "readiness_level": readiness_level,
        "skill_match": {
            "matched_count": len(matched_skills),
            "total_count": len(required_skills),
            "missing_count": len(missing_skills),
            "percentage": round(skill_score)
        },
        "education_match": {
            "required": min_education,
            "current": user_education or "S1",
            "has_gap": has_edu_gap,
            "explanation": edu_explanation
        },
        "experience_match": {
            "required": min_experience,
            "current": user_experience or "Belum ada pengalaman",
            "has_gap": has_exp_gap,
            "explanation": exp_explanation
        },
        "radar_chart_data": radar_chart_data,
        "skill_breakdown": skill_breakdown,
        "recommended_actions": recommended_actions,
        "detailed_skills_to_learn": detailed_skills_to_learn,
        "learning_roadmap": learning_roadmap
    }
    
    return result