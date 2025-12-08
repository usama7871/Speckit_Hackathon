# Physical AI & Humanoid Robotics Textbook with RAG

This project is a complete course platform built with Docusaurus, featuring a local RAG agent backend.

## 🚀 Quick Start

### 1. Docusaurus Frontend
Install dependencies and start the book:
```bash
cd physical_ai_textbook
npm install
npm run start
```
*The book will be available at http://localhost:3000*

### 2. RAG Backend
In a separate terminal, start the Python backend:
```bash
cd physical_ai_textbook/backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```
*The API will be available at http://localhost:8000*

## 📚 Project Structure
*   `docs/`: Markdown content for the 13-week course.
*   `src/theme/Root/`: Contains the ChatInterface component globally embedded.
*   `backend/`: FastAPI application for the RAG agent.

## 🤖 RAG Features
*   **Contextual Q&A**: Select text on any page and ask the chatbot about it.
*   **General Search**: Ask about any topic in the course (e.g., "What is ROS 2?").

## 📝 Bonus Features Implementation Status
1.  **RAG Chatbot**: ✅ Implemented (FastAPI + React Widget).
2.  **Course Content**: ✅ Weeks 1-2 drafted.
3.  **Authentication**: 🚧 (Requires Supabase/Neon config).
4.  **Personalization**: 🚧 (Ready for integration).

## Deployment to GitHub Pages
1.  Update `docusaurus.config.ts` with your repo details.
2.  Run `npm run deploy`.
