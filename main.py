from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import google.generativeai as genai

app = FastAPI(title="Quan Ly Chi Tieu API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Cấu hình API Key Gemini (Thay key của bạn vào đây)
GEMINI_API_KEY = "AQ.Ab8RN6J7HtR2H2LDNlkdTRXdrfVDw7dm9dbOiKE6ULyAGC44kA"
genai.configure(api_key=GEMINI_API_KEY)

@app.get("/")
def home():
    return {"message": "Server Quản lý chi tiêu đang chạy!"}

# API Chatbot AI cho người dùng
@app.post("/api/ai/chat")
def ai_chat(prompt: str, db: Session = Depends(get_db)):
    try:
        model = genai.GenerativeModel('gemini-3.6-flash')
        
        # System prompt định hướng AI
        system_instruction = (
            "Bạn là trợ lý tài chính cá nhân. Trả lời ngắn gọn, "
            "không đưa ra lời khuyên đầu tư chứng khoán hay pháp lý."
        )
        
        full_prompt = f"{system_instruction}\nCâu hỏi người dùng: {prompt}"
        response = model.generate_content(full_prompt)
        
        return {"status": "success", "reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))