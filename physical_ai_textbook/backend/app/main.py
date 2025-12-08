from fastapi import FastAPI, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
import time
import logging
from dotenv import load_dotenv
import google.generativeai as genai

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load Environment
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        # Use 1.5-flash for speed and better free tier limits
        model = genai.GenerativeModel('gemini-2.5-flash')
        logger.info("Gemini Model Initialized Successfully")
    except Exception as e:
        logger.error(f"Failed to configure Gemini: {e}")
        model = None
else:
    logger.warning("GEMINI_API_KEY not found in environment")
    model = None

app = FastAPI(title="Physical AI Textbook Intelligence Engine (Gemini Powered)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class UserProfile(BaseModel):
    user_id: str
    name: str
    software_bg: str
    hardware_bg: str

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None
    user_profile: Optional[UserProfile] = None

class PersonalizeRequest(BaseModel):
    content: str
    user_profile: UserProfile

class TranslateRequest(BaseModel):
    content: str
    target_language: str = "Urdu"

# --- Logic ---

SYSTEM_PROMPT = """You are the AI Teaching Assistant for the 'Physical AI & Humanoid Robotics' textbook.
Your goal is to explain complex robotics concepts (ROS 2, RL, Control Theory) clearly.
Always cite specific weeks/chapters if relevant."""

def safe_generate(prompt_parts):
    try:
        response = model.generate_content(prompt_parts)
        # Check if the response was blocked
        if response.prompt_feedback and response.prompt_feedback.block_reason:
            return f"⚠️ Response blocked. Reason: {response.prompt_feedback.block_reason}"
        
        # Check for valid text
        if not response.parts:
            return "⚠️ The model returned an empty response (Safety Filter likely triggered)."
            
        return response.text
    except Exception as e:
        logger.error(f"Gemini Generation Error: {e}")
        raise e

@app.get("/")
async def root():
    return {"status": "online", "service": "Physical AI Intelligence Engine (Gemini)", "model_status": "active" if model else "inactive"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not model:
        return {"reply": "⚠️ Backend Configuration Error: GEMINI_API_KEY missing or invalid.", "sources": []}
    
    prompt_parts = [SYSTEM_PROMPT]
    
    if request.user_profile:
        bg_context = f"User Context: Software BG: '{request.user_profile.software_bg}', Hardware BG: '{request.user_profile.hardware_bg}'."
        prompt_parts.append(bg_context)

    if request.context:
        prompt_parts.append(f"Context from Book:\n\n'{request.context}'")
    
    prompt_parts.append(f"Student Question: {request.message}")

    try:
        reply = safe_generate(prompt_parts)
        return {"reply": reply, "sources": ["Generated via Gemini 1.5 Flash"]}
    except Exception as e:
        logger.error(f"Chat Endpoint Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

@app.post("/personalize")
async def personalize_content(request: PersonalizeRequest):
    if not model:
        return {"content": "⚠️ Gemini Not Configured"}

    prompt = f"""
    Act as an expert technical editor. Rewrite the following content to be understandable for a student with this background:
    - Software: {request.user_profile.software_bg}
    - Hardware: {request.user_profile.hardware_bg}

    Maintain technical accuracy but use relevant analogies.
    
    Original Content:
    {request.content[:8000]} 
    """

    try:
        content = safe_generate([prompt])
        return {"content": content}
    except Exception as e:
        logger.error(f"Personalize Endpoint Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

@app.post("/translate")
async def translate_content(request: TranslateRequest):
    if not model:
        return {"content": "⚠️ Gemini Not Configured"}

    prompt = f"Translate technical documentation to {request.target_language}. Keep keywords (ROS 2, PID) in English.\n\n{request.content[:8000]}"

    try:
        content = safe_generate([prompt])
        return {"content": content}
    except Exception as e:
        logger.error(f"Translate Endpoint Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)