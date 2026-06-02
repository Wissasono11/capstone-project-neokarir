"""
==============================================================================
CV_SERVICE.PY - Service untuk Analisis CV (NeoKarir Profiling Engine)
==============================================================================
Service ini adalah "Otak Utama" pemrosesan CV yang mengkombinasikan:
1. PyMuPDF untuk ekstraksi teks dokumen.
2. HuggingFace XLM-RoBERTa Large untuk Named Entity Recognition (NER).
3. Config-Driven Heuristics: Aturan pembersihan berbasis pola (regex) tanpa 
   hardcode di dalam fungsi agar bekerja untuk SEMUA jenis CV.
==============================================================================
"""

import logging
import os
import io
import re
import datetime
from typing import Dict, List, Any
import fitz  # PyMuPDF

logger = logging.getLogger("neokarir.cv_service")

# ==========================================
# KONFIGURASI GLOBAL (Bisa dipindah ke DB/JSON)
# ==========================================
HF_NER_REPO_ID = "laventiliz/neokarir-cv_ner"

# Kata-kata yang sering jadi noise di SEMUA jenis CV (Hobi, Header, URL)
GLOBAL_BLACKLIST = [
    "MINAT", "HOBI", "LINKEDIN", "GITHUB", "COM", "WWW", "HTTP", "HTTPS",
    "PENGALAMAN", "PENDIDIKAN", "SERTIFIKASI", "KEAHLIAN", "RINGKASAN", "PROFIL",
    "HIKING", "FOTOGRAFI", "VIDEOGRAFI", "GITAR", "PIANO", "MEMBACA", "MENULIS",
    "SKALABEL", "PIPELINE", "ENTERPRISE", "KEAMANAN", "MONOLITIK", "MICROSERVICES"
]

# Alat/Teknologi yang namanya sering disalahartikan model sebagai Gelar/Sertifikat
TECH_RECOVERY_LIST = ["AWS", "GCP", "VPC", "IAM", "EC2", "S3", "RDS", "CLOUD", "LOAD BALANCER", "AZURE"]

# Mapping Domain agar tidak hardcode di if-else
DOMAIN_MAPPING = {
    "Web Development": ["FRONTEND", "BACKEND", "WEB", "FULLSTACK", "PHP", "LARAVEL"],
    "Mobile Development": ["MOBILE", "ANDROID", "IOS", "FLUTTER", "KOTLIN", "SWIFT"],
    "Data Science & AI": ["DATA", "MACHINELEARNING", "AI", "NLP", "SCIENTIST"],
    "Cloud & DevOps": ["CLOUD", "DEVOPS", "INFRASTRUCTURE", "SRE", "SYSADMIN"]
}

# Ekstraksi dari Master Database (Excel)
MASTER_SKILLS_DB = {
    ".NET", "API", "AWS", "Adobe XD", "Agile", "Airflow", "Android", "Angular", "Ansible", "Automation", "Azure", 
    "B2B Sales", "BigQuery", "Business Analysis", "C#", "CCNA", "CI/CD", "COBOL", "CRM Management", "CSS", "Cisco", 
    "Computer Vision", "Cryptography", "Cyber Security", "DDL", "Dart", "Data Analysis", "Data Engineering", 
    "Deep Learning", "Design Sprint", "Django", "Docker", "ERP", "ETL", "Excel", "Express", "FastAPI", "Figma", 
    "Firebase", "Flask", "Flutter", "GCP", "Game Development", "Generative AI", "Git", "GitHub", "GitLab", "Go", 
    "GraphQL", "HTML", "Hadoop", "Hardware", "IT Management", "IT Support", "Infrastructure", "JSON", "Java", 
    "JavaScript", "Jenkins", "Jira", "Kafka", "Kali Linux", "Kotlin", "Kubernetes", "LLM", "Laravel", "Leadership", 
    "Linux", "MLOps", "MVVM", "Machine Learning", "Mainframe", "Microservices", "Mobile Development", "MongoDB", 
    "MySQL", "NLP", "Negotiation", "Networking", "Next.js", "Node.js", "Oracle", "PHP", "Pandas", "Penetration Testing", 
    "PostgreSQL", "Postman", "Power BI", "Presentation", "Product Development", "Project Management", "Prompt Engineering",
    "Prototyping", "PyTorch", "Python", "QA", "R", "REST API", "React", "React Native", "Redis", "Requirements Gathering", 
    "Roadmap", "Routing", "Ruby", "Ruby on Rails", "SAP", "SQL", "Salesforce", "Scrum", "Security Compliance", "Selenium", 
    "Sketch", "Software Development", "Software Testing", "Solution Selling", "Spark", "Spring", "Strategic Planning", 
    "Swift", "Switching", "System Architecture", "Tableau", "Tailwind", "Technical Documentation", "TensorFlow", "Terraform", 
    "Troubleshooting", "TypeScript", "UI/UX", "Unity", "User Research", "Vue", "Windows", "Windows Server", "Wireframing", 
    "Xcode", "iOS"
}

# Bikin versi lowercase untuk mempermudah pencocokan (Standardisasi)
# Hasil: {"sql": "SQL", "ci/cd": "CI/CD", "machine learning": "Machine Learning"}
SKILL_NORMALIZER = {skill.lower(): skill for skill in MASTER_SKILLS_DB}

# Global State
_ner_pipeline = None
_is_ready: bool = False

# ==========================================
# 1. INIT & MODEL LOADING
# ==========================================
def load_model() -> None:
    global _ner_pipeline, _is_ready
    try:
        from transformers import pipeline
        logger.info(f"Mengunduh/Memuat NER pipeline dari Hugging Face Hub: {HF_NER_REPO_ID}")
        
        # Cukup masukkan repo ID ke parameter 'model'. 
        # Transformers akan otomatis mengunduh atau membaca dari cache lokal.
        _ner_pipeline = pipeline(
            task="token-classification",
            model=HF_NER_REPO_ID,
            tokenizer=HF_NER_REPO_ID, # Ditambahkan agar memastikan tokenizer yang ditarik sama persis
            aggregation_strategy="max",
        )
        
        _is_ready = True
        logger.info("✅ XLM-RoBERTa NER Pipeline berhasil dimuat dari awan!")
        
    except Exception as e:
        logger.error(f"❌ Gagal memuat NER model dari awan: {e}")
        _ner_pipeline = None
        _is_ready = False

def is_ready() -> bool:
    return _is_ready

# ==========================================
# 2. PDF/DOC EXTRACTION
# ==========================================
def extract_text_from_cv(file_bytes: bytes, filename: str) -> str:
    """
    Mengekstrak teks dari file PDF atau DOCX yang diunggah via memori (bytes).
    """
    ext = os.path.splitext(filename)[-1].lower()
    raw_text = ""

    if ext == ".pdf":
        import fitz
        # Membaca PDF dari memory bytes (stream)
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        n_pages = len(doc)          
        pages = []
        for page in doc:
            pages.append(page.get_text("text"))
        doc.close()
        raw_text = "\n".join(pages)
        logger.info(f"📄 PDF berhasil dibaca: {n_pages} halaman")   

    elif ext in [".docx", ".doc"]:
        from docx import Document
        # Membaca DOCX dari memory bytes menggunakan io.BytesIO
        doc = Document(io.BytesIO(file_bytes))
        paragraphs = [para.text for para in doc.paragraphs if para.text.strip()]
        raw_text = "\n".join(paragraphs)
        logger.info(f"📝 DOCX berhasil dibaca: {len(paragraphs)} paragraf")

    else:
        raise ValueError(f"Format file tidak didukung: {ext}. Gunakan .pdf atau .docx")

    # Bersihkan teks dari baris kosong berlebih dan spasi di ujung
    cleaned = re.sub(r'\n{3,}', '\n\n', raw_text)
    cleaned = "\n".join(line.strip() for line in cleaned.splitlines())
    cleaned = cleaned.strip()

    logger.info(f"✅ Teks berhasil diekstrak: {len(cleaned)} karakter")
    return cleaned

# ==========================================
# 3. NER INFERENCE & POST-PROCESSING
# ==========================================
def _clean_entities(entities: List[Dict]) -> List[Dict]:
    cleaned = []
    
    for ent in entities:
        word = ent['word'].replace(' ', ' ').strip()
        
        # 1. Regex Murni (Bekerja untuk semua CV, semua bahasa, tanpa hardcode)
        word = re.sub(r'([a-z])([A-Z])', r'\1 \2', word)  # Pisah CamelCase
        word = re.sub(r'([A-Z])([A-Z][a-z])', r'\1 \2', word) # Pisah PascalCase
        word = re.sub(r'([a-zA-Z])(\d)', r'\1 \2', word) # Pisah Huruf-Angka
        word = re.sub(r'(\d)([a-zA-Z])', r'\1 \2', word) # Pisah Angka-Huruf
        
        # 2. Memperbaiki Spasi Lebar yang umum
        word = re.sub(r'\bS\s+([1-3])\b', r'S\1', word, flags=re.IGNORECASE) # S 1 -> S1
        word = re.sub(r'\bi\s+OS\b', 'iOS', word)
        
        # 3. Filter Universal (Buang Email dan Web Link)
        if "@" in word or re.search(r'\.(com|co|id|net|org)\b', word.lower()):
            continue
            
        clean_word_upper = word.upper().replace(" ", "")
        
        # 4. Filter Kualitas & Pengecekan Blacklist Global
        if ent['score'] > 0.65 and len(word) > 2 and clean_word_upper not in GLOBAL_BLACKLIST:
            word = re.sub(r'^[^\w]+|[^\w]+$', '', word).strip() # Hapus titik/koma di ujung
            if word:
                cleaned.append({
                    "label": ent['entity_group'],
                    "text": word,
                    "score": float(ent['score'])
                })
    return cleaned

def _run_ner_pipeline(text: str) -> List[Dict]:
    if not _ner_pipeline:
        raise RuntimeError("Model NER belum siap.")

    text = re.sub(r'([.,()|•])', r' \1 ', text)
    text = re.sub(r'\s+', ' ', text).strip()

    words = text.split()
    chunks = [" ".join(words[i:i+400]) for i in range(0, len(words), 400)]

    all_raw_entities = []
    for chunk in chunks:
        if chunk.strip():
            all_raw_entities.extend(_ner_pipeline(chunk))

    cleaned_data = _clean_entities(all_raw_entities)

    unique_results = {}
    for item in cleaned_data:
        key = (item['label'], item['text'].upper())
        if key not in unique_results or item['score'] > unique_results[key]['score']:
            unique_results[key] = item

    return list(unique_results.values())

# ==========================================
# 4. DATABASE MAPPING & METADATA LOGIC
# ==========================================
def _map_role_to_domain(role: str) -> str:
    """Pemetaan dinamis berdasarkan konfigurasi DOMAIN_MAPPING"""
    role_clean = re.sub(r'[^a-zA-Z]', '', role).upper()
    
    for domain, keywords in DOMAIN_MAPPING.items():
        if any(kw in role_clean for kw in keywords):
            return domain
    return "Lainnya"

def _extract_education_level(edus: List[str]) -> str:
    edu_text = " ".join(edus).upper()
    if any(kw in edu_text for kw in ["S1", "SARJANA", "BACHELOR"]): return "S1/D4"
    if any(kw in edu_text for kw in ["S2", "MASTER"]): return "S2"
    if any(kw in edu_text for kw in ["D3", "DIPLOMA"]): return "D3"
    return "Tidak Disebutkan"

def _calculate_metadata(pdf_text: str, entities: List[Dict]) -> Dict:
    ats_score = 100
    labels_found = set([e['label'] for e in entities])
    
    if 'SKILL' not in labels_found: ats_score -= 20
    if 'EDU' not in labels_found: ats_score -= 10
    if 'ROLE' not in labels_found: ats_score -= 10
    if len(pdf_text.split()) < 50: ats_score -= 40
    if "         " in pdf_text: ats_score -= 5 

    parsing_conf = "Low"
    if entities:
        avg_score = sum(e['score'] for e in entities) / len(entities)
        if avg_score >= 0.85: parsing_conf = "High"
        elif avg_score >= 0.65: parsing_conf = "Medium"

    return {
        "ats_friendly_score": max(0, ats_score),
        "parsing_confidence": parsing_conf
    }

def _calculate_experience_duration(pdf_text: str, comps: List[str]) -> str:
    """Mendeteksi pola tahun di teks CV untuk mengkalkulasi total masa kerja."""
    if not comps:
        return "Belum ada pengalaman"
        
    current_year = datetime.datetime.now().year
    total_years = 0
    
    # Mencari pola seperti "2018 - 2021", "2020 to Present", "2022 - Sekarang"
    year_pattern = r'\b(19\d{2}|20\d{2})\s*(?:-|to|s/d|–|—|sampai)\s*(19\d{2}|20\d{2}|sekarang|present|now|saat ini)\b'
    matches = re.findall(year_pattern, pdf_text.lower())
    
    if matches:
        for start_str, end_str in matches:
            try:
                start_yr = int(start_str)
                # Jika masih bekerja di sana, gunakan tahun berjalan
                if end_str in ['sekarang', 'present', 'now', 'saat ini']:
                    end_yr = current_year
                else:
                    end_yr = int(end_str)
                
                diff = end_yr - start_yr
                # Mencegah error jika user typo (selisih negatif) atau >20 tahun (biasanya salah baca teks)
                if 0 < diff <= 20:
                    total_years += diff
            except ValueError:
                continue
                
    # FALLBACK: Jika regex gagal cari tahun, tapi NER menemukan nama perusahaan.
    # Kita asumsikan rata-rata orang bekerja 1.5 tahun per perusahaan.
    if total_years == 0 and len(comps) > 0:
        total_years = len(comps) * 1.5

    # ==========================================
    # KATEGORISASI KE BUCKET FORMAT DATABASE
    # ==========================================
    if total_years == 0 and not comps:
        return "Belum ada pengalaman"
    elif total_years < 1:
        return "< 1 tahun"
    elif 1 <= total_years <= 3:
        return "1-3 tahun"
    elif 3 < total_years <= 5:
        return "3-5 tahun"
    else:
        return "> 5 tahun"

def _validate_and_normalize_skills(ner_skills: List[str]) -> List[str]:
    """
    Memvalidasi hasil NER dengan Master Database Skills.
    """
    validated_skills = set()
    
    for skill in ner_skills:
        skill_lower = skill.lower().strip()
        
        # 1. EXACT MATCHING (Sangat Yakin)
        # Jika skill NER ada di database Excel, ambil nama resminya dari SKILL_NORMALIZER
        if skill_lower in SKILL_NORMALIZER:
            validated_skills.add(SKILL_NORMALIZER[skill_lower])
            
        # 2. FUZZY / SUBSTRING MATCHING (Toleransi)
        # Mengakali penulisan CV yang aneh misal: "Python Programming" -> masuk "Python"
        else:
            for master_skill_lower, master_skill_asli in SKILL_NORMALIZER.items():
                if master_skill_lower in skill_lower:
                    validated_skills.add(master_skill_asli)
                    break
            
            # --- OPSI STRICT vs HYBRID ---
            # Jika kamu ingin sistem yang SANGAT KETAT, hapus bagian 'else' di bawah ini.
            # Namun, membiarkannya (Hybrid) berguna jika ada skill baru (misal: "LangChain") 
            # yang belum sempat kamu masukkan ke Excel tapi berhasil ditangkap NER.
            #else:
             #   if len(skill) > 2: # Tetap masukkan jika panjangnya logis
              #      validated_skills.add(skill.title()) 

    return list(validated_skills)

# ==========================================
# 5. MAIN SERVICE EXPORT
# ==========================================
def process_cv_to_profile(user_id: str, file_bytes: bytes, filename: str) -> Dict[str, Any]:
    raw_text = extract_text_from_cv(file_bytes, filename)
    entities = _run_ner_pipeline(raw_text)
    
    names, roles, skills, edus, comps, certs = [], [], [], [], [], []
    
    # Kumpulkan semua kata kunci skill dari SKILL_NORMALIZER (dari Master DB Excel kamu)
    # Ini jauh lebih pintar daripada TECH_RECOVERY_LIST manual
    official_skills_keywords = list(SKILL_NORMALIZER.keys())
    
    for e in entities:
        teks = e['text']
        label = e['label']
        teks_lower = teks.lower()
        
        # 1. DYNAMIC SKILL RESCUE
        # Mengecek apakah teks ini sebenarnya adalah skill resmi di database kita
        is_official_skill = any(master_skill in teks_lower for master_skill in official_skills_keywords)
        
        # 2. ROLE RESCUE
        # Mengecek apakah ada kata "Developer", "Engineer", "Admin" yang nyasar
        is_hidden_role = any(kw in teks_lower for kw in ["developer", "engineer", "admin", "specialist"])
        
        # --- LABEL ROUTING ---
        if label in ['PERSON', 'PER']:  
            names.append(teks)
        elif is_official_skill and label not in ['ROLE', 'PERSON']:
            # Tarik paksa RESTAPI dan Redis dari Sertifikat/Edukasi ke Skill
            skills.append(teks) 
        elif is_hidden_role and label != 'PERSON':
            # Tarik paksa "Junior Backend Developer" ke Role
            roles.append(teks)
        elif label == 'ROLE':
            roles.append(teks)
        elif label == 'SKILL':
            skills.append(teks)
        elif label == 'EDU':
            edus.append(teks)
        elif label == 'COMP':
            comps.append(teks)
        elif label == 'CERT':
            certs.append(teks)

    # ==========================================
    # FALLBACK ENGINE UNTUK NAMA (The Name Rescue)
    # ==========================================
    candidate_name = names[0] if names else "Tidak Terdeteksi"
    
    if candidate_name == "Tidak Terdeteksi":
        # Logika: Nama biasanya ada di baris pertama CV. 
        # Kita ambil baris pertama yang berisi lebih dari 1 kata dan bersihkan dari simbol.
        lines = [line.strip() for line in raw_text.split('\n') if len(line.strip()) > 3]
        if lines:
            # Ambil baris pertama, bersihkan angka/simbol, ambil max 3 kata pertama
            first_line_clean = re.sub(r'[^a-zA-Z\s]', '', lines[0]).strip()
            name_words = first_line_clean.split()[:3] 
            if len(name_words) >= 1:
                candidate_name = " ".join(name_words).title()
                
    primary_role = roles[0] if roles else "Belum Ditentukan"
    experience_status = _calculate_experience_duration(raw_text, comps)

    # Ambil raw skills dari NER dan Cloud tools
    raw_skills = list(set(skills))
    
    # 🔥 VALIDASI DENGAN EXCEL DATABASE 🔥
    final_verified_skills = _validate_and_normalize_skills(raw_skills)

    return {
        "user_id": user_id,
        "user_name": candidate_name,   # NAMA USER DITAMBAHKAN DI SINI
        "target_domain": _map_role_to_domain(primary_role),
        "target_role": primary_role,
        "owned_skills": final_verified_skills, 
        "user_experience": experience_status,
        "user_education": _extract_education_level(edus),
        "metadata": _calculate_metadata(raw_text, entities),
        "raw_entities": {
            "names": names,
            "companies": comps,
            "certifications": certs,
            "roles": roles,
            "educations": edus
        }
    }