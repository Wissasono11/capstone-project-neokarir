import math
from app.config import df_jobs
from app.taxonomy import skill_taxonomy

# --- FUNGSI BARU YANG LEBIH PINTAR ---
def get_skills_list(skills_data):
    # Jika data sudah berbentuk List asli (hasil dari config.py)
    if isinstance(skills_data, list):
        return skills_data
    
    # Jika data masih berupa Teks String (jaga-jaga jika config.py gagal)
    if isinstance(skills_data, str):
        import ast
        try:
            parsed = ast.literal_eval(skills_data)
            if isinstance(parsed, list):
                return [str(s).strip() for s in parsed]
        except Exception:
            pass
        # Bersihkan manual jika ast gagal
        clean_str = skills_data.replace('[', '').replace(']', '').replace("'", "")
        return [s.strip() for s in clean_str.split(',')]
        
    return []

# --- LOGIKA RADAR CHART ---
def calculate_radar_data(target_domain, target_role, user_skills):
    domain_taxonomy = skill_taxonomy.get(target_domain, {})
    # Filter job dengan case insensitive
    jobs_filtered = df_jobs[df_jobs['job_title'].str.contains(target_role, case=False, na=False)]
    total_jobs = len(jobs_filtered)
    
    radar_data = []
    if total_jobs == 0: return radar_data

    # NORMALISASI: Ubah semua skill user ke lowercase agar cocok dengan taxonomy
    user_skills_set = {str(s).lower().strip() for s in user_skills}
        
    for category, category_skills in domain_taxonomy.items():
        # Ambil rata-rata jumlah skill yang dibutuhkan di kategori ini dari dataset
        relevant_jobs_skills = jobs_filtered['required_skills'].apply(
            lambda x: len(set([s.lower() for s in x]).intersection(set([s.lower() for s in category_skills])))
        )
        avg_skills_needed = relevant_jobs_skills.mean() if not relevant_jobs_skills.empty else 1
        avg_skills_needed = max(1, math.ceil(avg_skills_needed))
        
        # Hitung skill user yang cocok (Case Insensitive)
        cat_skills_lower = {s.lower() for s in category_skills}
        user_skills_in_category = len(user_skills_set.intersection(cat_skills_lower))
        
        required_percentage = 80 # Standar industri
        fulfillment_ratio = user_skills_in_category / avg_skills_needed
        current_percentage = min(100, required_percentage * fulfillment_ratio)
        gap = current_percentage - required_percentage
        
        radar_data.append({
            "category": category,
            "current": round(current_percentage),
            "required": round(required_percentage),
            "gap": round(gap)
        })
    return radar_data

def generate_recommended_actions(gap_results):
    critical, improvement, strengths = [], [], []

    for category, gap_value in gap_results.items():
        if gap_value <= -10: critical.append(category)
        elif gap_value < 0: improvement.append(category)
        else: strengths.append(category)

    actions = {"critical_gap": "", "needs_improvement": "", "strengths": ""}

    actions["critical_gap"] = f"Focus on {' & '.join(critical)} skills." if critical else "You have no critical skill gaps."
    actions["needs_improvement"] = f"Enhance {' & '.join(improvement)} expertise." if improvement else "All your core skills are solid."
    actions["strengths"] = f"{' & '.join(strengths)} skills exceed requirements." if strengths else "Keep learning to surpass industry standards."

    return actions