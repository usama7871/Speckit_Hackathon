# 🧠 Physical AI Intelligence Engine (Backend)

This is the **FastAPI** backend that powers the intelligent features of the textbook. It uses **Google Gemini 1.5 Flash** to provide RAG (Retrieval Augmented Generation), personalization, and translation capabilities.

## ⚡ Quick Start

### 1. Prerequisites
- Python 3.10 or higher.
- A Google Cloud Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/app/apikey)).

### 2. Installation

```bash
# Navigate to backend
cd physical_ai_textbook/backend

# Create virtual environment (Optional but Recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration (.env)
Create a `.env` file in this directory:
```bash
GEMINI_API_KEY=AIzSy...YourKeyHere
# Optional: Qdrant keys if using vector search
# QDRANT_URL=...
# QDRANT_API_KEY=...
```

### 4. Running Locally
```bash
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.
Swagger Documentation is available at `http://localhost:8000/docs`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/chat` | Chat with the AI Tutor. Supports context and user profiles. |
| `POST` | `/personalize` | Rewrites text content to match the user's specific background. |
| `POST` | `/translate` | Translates technical content into Urdu (or target language). |

---

## ☁️ Deployment

This backend allows for deployment on any standard Python hosting service (Render, Railway, Heroku).
*   **Procfile**: Included for easy deployment.
*   **Runtime**: Python 3.11 recommended.

### Deploy on Render.com
1.  Connect your Repo.
2.  Set **Root Directory** to `physical_ai_textbook/backend`.
3.  Set **Build Command** to `pip install -r requirements.txt`.
4.  Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5.  Add your `GEMINI_API_KEY` in Environment Variables.
