from fastapi import APIRouter, UploadFile, File, HTTPException
from app.ai_engine.services.cv_service import extract_text_from_cv
from app.ai_engine.services.cv_analyzer_service import analyze_cv_with_groq

router = APIRouter()

@router.post("/analyze")
async def process_cv_analyzer(file: UploadFile = File(...)):
    try:
        # 1. Baca bytes dari file yang diunggah
        file_bytes = await file.read()
        
        # 2. Ekstrak teks menggunakan fungsi hybrid (PDF/DOCX) yang sudah kamu rapikan kemarin
        extracted_text = extract_text_from_cv(file_bytes, file.filename)
        
        # Validasi jika teks terlalu pendek (misal: isinya cuma gambar)
        if len(extracted_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Teks CV terlalu pendek atau tidak terbaca. Pastikan CV berbasis teks, bukan gambar.")

        # 3. Kirim ke Groq untuk dianalisis
        ai_analysis = await analyze_cv_with_groq(extracted_text)
        
        # 4. Kirim balasan ke Frontend
        return {
            "status": "success",
            "data": ai_analysis
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))