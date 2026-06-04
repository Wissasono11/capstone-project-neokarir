from fastapi import APIRouter, UploadFile, File, HTTPException
import asyncio

# Import service NER kamu (sesuaikan nama file/fungsinya)
from app.ai_engine.services.cv_service import extract_text_from_cv, _clean_entities, _run_ner_pipeline
from app.ai_engine.services.cv_analyzer_service import analyze_cv_with_groq

router = APIRouter()

@router.post("/analyze")
async def process_cv_analyzer(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        extracted_text = extract_text_from_cv(file_bytes, file.filename)
        
        if len(extracted_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Teks CV terlalu pendek.")

        # JALANKAN DUA AI SECARA PARALEL AGAR RESPON API CEPAT
        # 1. Groq (Llama-3) untuk Analisis & Skor
        # 2. XLM-RoBERTa untuk Ekstraksi Entitas (NER)
        groq_task = analyze_cv_with_groq(extracted_text)
        
        # Karena pipeline Transformers itu synchronous, kita bungkus pakai to_thread
        ner_task = asyncio.to_thread(_run_ner_pipeline, extracted_text)
        
        # Tunggu keduanya selesai bersamaan
        ai_analysis, ner_extraction = await asyncio.gather(groq_task, ner_task)
        
        # Group NER extraction into format expected by the frontend
        entities_grouped = {
            "skills": [],
            "roles": [],
            "education": [],
            "certifications": [],
            "companies": [],
            "experience": []
        }
        
        for entity in ner_extraction:
            label = entity.get("label")
            text = entity.get("text")
            if not text:
                continue
                
            if label == "SKILL":
                entities_grouped["skills"].append(text)
            elif label == "ROLE":
                entities_grouped["roles"].append(text)
            elif label == "EDU":
                entities_grouped["education"].append(text)
            elif label == "CERT":
                entities_grouped["certifications"].append(text)
            elif label == "COMP":
                entities_grouped["companies"].append(text)
        
        # BUNGKUS MENJADI 1 JSON UTUH UNTUK FRONTEND
        return {
            "status": "success",
            "data": {
                "overview": ai_analysis,           # Berisi skor, kekuatan, kelemahan dari Groq
                "entities": entities_grouped       # Berisi data entitas NER ter-ekstrak
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))