import json
import logging
from app.ai_engine.services.chatbot_service import get_llm_client # Gunakan client yang sudah kamu buat

logger = logging.getLogger("neokarir.cv_analyzer")

async def analyze_cv_with_groq(extracted_cv_text: str) -> dict:
    """
    Mengirim teks CV ke Groq API dan mengembalikan hasil analisis 
    dalam format dictionary yang siap dikirim ke UI Frontend.
    """
    client = get_llm_client()
    
    # SYSTEM PROMPT: Memaksa model menjadi expert HR dan output JSON
    system_prompt = """
    You are an expert Senior Technical Recruiter and ATS (Applicant Tracking System) Specialist.
    Your task is to analyze the provided CV text and output your analysis strictly in JSON format.
    
    The JSON object MUST contain exactly these 3 keys, matching the UI requirements:
    1. "ats_optimization": A concise paragraph evaluating ATS compatibility, formatting, and keyword usage.
    2. "strengths_analysis": A concise paragraph highlighting the candidate's strongest skills, experiences, or unique selling points.
    3. "improvement_tips": 3 actionable bullet points on how to improve the CV (e.g., adding metrics, changing action verbs, formatting).
    
    Respond ONLY with the JSON object. Do not include any introductory or concluding text. Answer in Bahasa Indonesia
    """

    user_prompt = f"Here is the CV text to analyze:\n\n{extracted_cv_text}"

    try:
        response = await client.chat.completions.create(
            model="llama-3.1-8b-instant", # Cepat dan sangat pintar untuk tugas instruksional
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}, # <--- INI KUNCINYA
            temperature=0.4, # Gunakan temperature rendah agar responnya konsisten dan profesional
            max_tokens=1024
        )
        
        # Ekstrak string JSON dari respon Groq
        raw_json_string = response.choices[0].message.content or "{}"
        
        # Ubah string JSON menjadi Python Dictionary
        analysis_result = json.loads(raw_json_string)
        
        return analysis_result

    except Exception as e:
        logger.error(f"❌ Gagal menganalisis CV via Groq: {e}")
        # Kembalikan data fallback jika API bermasalah agar UI tidak crash
        return {
            "ats_optimization": "Failed to analyze ATS compatibility at this time. Please try again.",
            "strengths_analysis": "Unable to load strengths analysis.",
            "improvement_tips": "Unable to generate improvement tips."
        }