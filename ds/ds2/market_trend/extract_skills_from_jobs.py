# extract_skills_from_jobs.py

import pandas as pd
import re

# ==========================================
# CONFIG
# ==========================================

JOBS_FILE = "glints_jobs_detail.csv"
SKILL_FILE = "skill_pool.csv"

OUTPUT_FILE = "job_skill_matche.csv"

# ==========================================
# LOAD DATA
# ==========================================

jobs_df = pd.read_csv(JOBS_FILE)

skills_df = pd.read_csv(SKILL_FILE)

# ==========================================
# CLEAN SKILL LIST
# ==========================================

skills = (
    skills_df["skill"]
    .dropna()
    .unique()
    .tolist()
)

# Sort by length descending
# Important for matching longer skills first
skills = sorted(
    skills,
    key=len,
    reverse=True
)

print("===================================")
print(f"TOTAL SKILLS: {len(skills)}")
print("===================================")

# ==========================================
# STORAGE
# ==========================================

matches = []

# ==========================================
# SKILL EXTRACTION
# ==========================================

for idx, row in jobs_df.iterrows():

    description = str(
        row.get("job_description", "")
    ).lower()

    posted_date = row.get("posted_date", None)

    job_title = row.get("job_title", None)

    job_link = row.get("job_link", None)

    found_skills = set()

    for skill in skills:

        skill_lower = skill.lower()

        # Regex exact-ish match
        pattern = r"\b" + re.escape(skill_lower) + r"\b"

        if re.search(pattern, description):

            found_skills.add(skill)

    # Save matches
    for skill in found_skills:

        matches.append({
            "posted_date": posted_date,
            "job_title": job_title,
            "skill_name": skill,
            "job_link": job_link
        })

    print(
        f"[{idx+1}/{len(jobs_df)}] "
        f"FOUND {len(found_skills)} skills"
    )

# ==========================================
# SAVE RESULT
# ==========================================

if matches:

    out_df = pd.DataFrame(matches)

    out_df = out_df.drop_duplicates()

    out_df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print("\n===================================")
    print("SKILL EXTRACTION FINISHED")
    print("===================================")

    print(f"TOTAL MATCHES: {len(out_df)}")

    print("\nSAMPLE:")
    print(out_df.head())

else:

    print("NO SKILLS FOUND")