"""
app/services/roadmap.py
========================
Service: Job-Specific Learning Roadmap
Menghasilkan response yang siap dikonsumsi frontend sesuai tampilan UI NeoKarir.

UI yang dituju menampilkan:
  - Required Skills  : chip/tag skill yang dibutuhkan loker
  - Match Score      : persentase kecocokan (0-100%)
  - Learning Roadmap : Foundation / Intermediate / Advanced
    → setiap item: judul_materi + provider + link + status required
"""

import json
import ast
import copy
from app.config import df_jobs

# ─────────────────────────────────────────────────────────────────────────────
# LOAD DATA ROADMAP
# ─────────────────────────────────────────────────────────────────────────────
try:
    with open("data/roadmap_new.json", "r") as f:
        roadmap_data = json.load(f)
except Exception as e:
    print(f"[WARN] Gagal memuat roadmap_new.json: {e}")
    roadmap_data = {}


# ─────────────────────────────────────────────────────────────────────────────
# MAPPING: Domain CSV → Kandidat Roadmap (urutan = prioritas)
#
# Setiap domain punya beberapa kandidat roadmap.
# Sistem akan memilih yang paling banyak overlap skill-nya secara otomatis.
# ─────────────────────────────────────────────────────────────────────────────
DOMAIN_PRIORITY_MAP = {
    "Software Development":         [
        "Back-End Developer Python",
        "Back-End Developer JavaScript",
        "Front-End Web Developer",
        "Web Developer (AI-Assisted)",
        "IT Support Specialist",
        "DevOps Engineer",
    ],
    "Web Development":              [
        "Front-End Web Developer",
        "React Developer",
        "Back-End Developer Python",
        "Back-End Developer JavaScript",
        "Web Developer (AI-Assisted)",
    ],
    "Data Analytics":               ["Data Analyst", "Data Scientist", "MLOps Engineer"],
    "Data Engineering":             ["MLOps Engineer", "Data Scientist", "Data Analyst"],
    "Data Science & AI":            ["AI Engineer", "Gen AI Engineer", "Data Scientist", "MLOps Engineer"],
    "DevOps & Cloud":               ["DevOps Engineer", "Google Cloud Professional"],
    "Cyber Security":               ["Cyber Security Analyst"],
    "Mobile Development":           ["Android Developer", "Multi-Platform App Developer", "iOS Developer"],
    "UI/UX Design":                 ["UI/UX Designer"],
    "Quality Assurance":            ["QA Engineer"],
    "ERP & Enterprise":             ["ERP Consultant"],
    "Game Development":             ["Game Developer"],
    "IT Support & Infrastructure":  ["IT Support Specialist", "DevOps Engineer"],
    "Project Management":           ["IT Project Manager"],
    "Product Management":           ["Product Manager"],
    "Sales & Business Development": ["IT Sales & Business Development"],
}

# Label waktu per level (sesuai UI Figma)
LEVEL_LABELS = {
    "Foundation":   "Foundation (Month 1-2)",
    "Intermediate": "Intermediate (Month 3-4)",
    "Advanced":     "Advanced (Month 5-6)",
}


# ─────────────────────────────────────────────────────────────────────────────
# HELPER UTILITIES
# ─────────────────────────────────────────────────────────────────────────────

def _parse_skills(raw) -> list:
    """Parse required_skills dari format apapun → list string bersih."""
    if isinstance(raw, list):
        return [str(s).strip() for s in raw if str(s).strip()]
    if isinstance(raw, str):
        try:
            parsed = ast.literal_eval(raw)
            if isinstance(parsed, list):
                return [str(s).strip() for s in parsed if str(s).strip()]
        except Exception:
            pass
        clean = raw.replace("[", "").replace("]", "").replace("'", "").replace('"', "")
        return [s.strip() for s in clean.split(",") if s.strip()]
    return []


def _normalize(text: str) -> str:
    """Normalisasi untuk fuzzy matching: lowercase, hapus simbol."""
    return text.lower().replace(".", "").replace("-", "").replace(" ", "").replace("/", "")


def _skills_overlap(job_skills: list, roadmap_key: str) -> dict:
    """
    Hitung overlap antara required_skills loker dengan target_skills roadmap.
    Menggunakan substring matching agar 'Node.js' cocok dengan 'NodeJS', dll.
    """
    target      = roadmap_data.get(roadmap_key, {}).get("target_skills", [])
    job_norm    = [_normalize(s) for s in job_skills]
    target_norm = [_normalize(s) for s in target]

    matched = []
    for orig, norm in zip(job_skills, job_norm):
        for t in target_norm:
            if norm in t or t in norm:
                matched.append(orig)
                break

    count = len(matched)
    ratio = count / max(len(job_skills), 1)
    return {"overlap_count": count, "overlap_ratio": ratio, "matched_skills": matched}


def _pick_best_roadmap(domain: str, job_skills: list) -> tuple:
    """
    Pilih roadmap key terbaik berdasarkan overlap skill.

    Langkah:
    1. Cek kandidat prioritas domain
    2. Jika tidak ada overlap → perluas ke semua roadmap
    3. Jika masih 0 → pakai default pertama domain
    """
    all_keys   = list(roadmap_data.keys())
    candidates = DOMAIN_PRIORITY_MAP.get(domain, all_keys)

    best_key  = None
    best_info = {"overlap_count": -1, "overlap_ratio": 0, "matched_skills": []}

    for key in candidates:
        if key not in roadmap_data:
            continue
        info = _skills_overlap(job_skills, key)
        if info["overlap_count"] > best_info["overlap_count"]:
            best_key  = key
            best_info = info

    # Fallback: perluas ke semua roadmap jika masih 0
    if (best_key is None) or (best_info["overlap_count"] == 0):
        for key in all_keys:
            if key in candidates:
                continue
            info = _skills_overlap(job_skills, key)
            if info["overlap_count"] > best_info["overlap_count"]:
                best_key  = key
                best_info = info

    # Fallback akhir: default domain
    if best_key is None or best_info["overlap_count"] == 0:
        defaults = DOMAIN_PRIORITY_MAP.get(domain, all_keys)
        best_key  = next((k for k in defaults if k in roadmap_data), all_keys[0])
        best_info = _skills_overlap(job_skills, best_key)

    return best_key, best_info


def _calc_match_score(job_skills: list, roadmap_key: str) -> float:
    """
    Hitung match score (0.0–100.0).

    Formula:
      skill_coverage    (70%): berapa % skill loker yang ada di target_skills roadmap
      roadmap_relevance (30%): berapa % target_skills roadmap yang cocok skill loker
    """
    if not job_skills:
        return 0.0

    info   = _skills_overlap(job_skills, roadmap_key)
    target = roadmap_data.get(roadmap_key, {}).get("target_skills", [])

    skill_coverage = info["overlap_ratio"]

    job_norm = [_normalize(s) for s in job_skills]
    target_matched = sum(
        1 for t in target
        if any(_normalize(t) in j or j in _normalize(t) for j in job_norm)
    )
    roadmap_relevance = target_matched / max(len(target), 1)

    raw = (skill_coverage * 0.70 + roadmap_relevance * 0.30) * 100

    # Floor: jika minimal 1 skill match → minimal 40%
    if info["overlap_count"] >= 1:
        raw = max(raw, 40.0)

    return round(min(raw, 100.0), 1)


def _build_roadmap_levels(roadmap_key: str, job_skills: list) -> list:
    """
    Bangun daftar level roadmap dengan format siap pakai untuk frontend.

    Setiap level adalah dict:
      level_key       : "Foundation" / "Intermediate" / "Advanced"
      level_label     : label dengan info waktu, e.g. "Foundation (Month 1-2)"
      items           : list materi, urutan: required dulu baru non-required
      total_items     : int
      required_count  : int
    """
    courses = copy.deepcopy(roadmap_data.get(roadmap_key, {}).get("courses", {}))
    if not courses:
        return []

    items_list = list(courses.items())
    total      = len(items_list)
    job_norm   = [_normalize(s) for s in job_skills]

    def _get_level(idx: int) -> str:
        if idx < total * 0.40:
            return "Foundation"
        elif idx < total * 0.70:
            return "Intermediate"
        else:
            return "Advanced"

    buckets = {"Foundation": [], "Intermediate": [], "Advanced": []}

    for idx, (skill_name, detail) in enumerate(items_list):
        skill_norm  = _normalize(skill_name)
        is_required = any(
            skill_norm in j or j in skill_norm
            for j in job_norm
        )
        level = _get_level(idx)
        buckets[level].append({
            "skill":                    skill_name,
            "judul_materi":             detail.get("judul", ""),
            "provider":                 detail.get("provider", ""),
            "link":                     detail.get("link", ""),
            "is_required_by_company":   is_required,
        })

    result = []
    for level_key in ["Foundation", "Intermediate", "Advanced"]:
        bucket = buckets[level_key]
        # Materi required naik ke atas
        bucket.sort(key=lambda x: (not x["is_required_by_company"]))
        required_count = sum(1 for m in bucket if m["is_required_by_company"])
        result.append({
            "level_key":      level_key,
            "level_label":    LEVEL_LABELS[level_key],
            "items":          bucket,
            "total_items":    len(bucket),
            "required_count": required_count,
        })

    return result


# ─────────────────────────────────────────────────────────────────────────────
# FUNGSI UTAMA — dipanggil dari main.py
# ─────────────────────────────────────────────────────────────────────────────

def get_job_specific_roadmap(job_id: str) -> dict:
    """
    Menghasilkan roadmap belajar yang sesuai untuk suatu lowongan,
    dengan format response yang langsung siap dikonsumsi UI NeoKarir.

    Dipanggil dari endpoint:
        GET /api/roadmap/job-sync/{job_id}

    Response siap mapping ke komponen UI:
    ─────────────────────────────────────────────────────────────────
    required_skills  → chip/tag di bagian atas halaman
    match_score      → angka di lingkaran (mis: 92%)
    match_label      → label di bawah lingkaran
    learning_roadmap → section Foundation / Intermediate / Advanced
      items[].judul_materi          → judul kursus (teks utama)
      items[].provider              → nama platform (teks abu)
      items[].link                  → href tombol
      items[].is_required_by_company→ beri highlight/badge "Required"
    ─────────────────────────────────────────────────────────────────
    """
    # ── 1. Ambil data loker ────────────────────────────────────────────────
    job_row = df_jobs[df_jobs["job_id"] == job_id]
    if job_row.empty:
        return {"status": "error", "message": f"ID Lowongan '{job_id}' tidak ditemukan."}

    job        = job_row.iloc[0]
    domain     = str(job["job_domain"]).strip()
    title      = str(job["job_title"]).strip()
    req_skills = _parse_skills(job["required_skills"])

    # ── 2. Pilih roadmap terbaik ───────────────────────────────────────────
    best_key, _ = _pick_best_roadmap(domain, req_skills)

    # ── 3. Hitung match score ──────────────────────────────────────────────
    match_score = _calc_match_score(req_skills, best_key)
    match_label = (
        "Sangat Cocok"    if match_score >= 75 else
        "Cocok"           if match_score >= 55 else
        "Cukup Cocok"     if match_score >= 35 else
        "Perlu Persiapan"
    )

    # ── 4. Bangun learning roadmap ─────────────────────────────────────────
    roadmap_levels = _build_roadmap_levels(best_key, req_skills)

    # ── 5. Hitung ringkasan ────────────────────────────────────────────────
    total_materi   = sum(lvl["total_items"]    for lvl in roadmap_levels)
    total_required = sum(lvl["required_count"] for lvl in roadmap_levels)

    all_roadmap_skills_norm = set()
    for v in roadmap_data.values():
        for s in v.get("target_skills", []):
            all_roadmap_skills_norm.add(_normalize(s))

    skills_not_covered = [
        s for s in req_skills
        if not any(
            _normalize(s) in t or t in _normalize(s)
            for t in all_roadmap_skills_norm
        )
    ]

    # ── 6. Response final ──────────────────────────────────────────────────
    return {
        "job_id":           job_id,
        "job_title":        title,
        "job_domain":       domain,
        "required_skills":  req_skills,      # → chip di UI
        "match_score":      match_score,     # → lingkaran % di UI
        "match_label":      match_label,     # → label di bawah lingkaran
        "roadmap_category": best_key,
        "learning_roadmap": roadmap_levels,  # → section level di UI
        "summary": {
            "total_materi":           total_materi,
            "total_required_matched": total_required,
            "skills_not_in_roadmap":  skills_not_covered,
        },
    }