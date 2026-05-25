from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# INI KUNCINYA: Import fungsi utama dari chatbot_service yang sudah terhubung ke RAG & Groq
from app.ai_engine.services.chatbot_service import generate_chatbot_response

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/")
async def process_chat(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Pesan tidak boleh kosong.")
        
    try:
        # Panggil fungsi yang akan mengeksekusi Klasifikasi Intent -> PostgreSQL RAG -> Groq Llama 3
        result = await generate_chatbot_response(payload.user_id, payload.message)
        
        return {
            "status": "success",
            "data": {
                "user_message": payload.message,
                "detected_intent": result["intent"],
                "confidence_score": result["confidence"],
                "bot_response": result["bot_response"]  # Ini sekarang akan berisi jawaban cerdas dari Llama-3!
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal: {str(e)}")