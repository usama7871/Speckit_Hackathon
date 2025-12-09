# 🤖 Physical AI & Humanoid Robotics Textbook
### *The First AI-Native, Interactive Textbook for the Robot Revolution.*

![Project Banner](https://img.shields.io/badge/Status-Hackathon_Winner_Candidate-gold?style=for-the-badge) ![Stack](https://img.shields.io/badge/Tech-Docusaurus_x_FastAPI_x_Gemini-blueviolet?style=for-the-badge)

Welcome to the future of education. This isn't just a PDF; it's a **living, breathing platform** that adapts to the student. Built for the **SpecKit Hackathon**, this project demonstrates the power of Agentic Coding to create high-fidelity educational tools.

---

## 🚀 Key Features

### 1. 🧠 Intelligent RAG Chatbot (The Core)
Embedded directly into the learning experience is an AI Assistant powered by **Google Gemini 2.5 Flash**.
*   **Context Aware**: Select any text in the book, click "Ask", and the AI explains *that specific concept*.
*   **Personalization Engine**: The AI knows if you are a "Python Expert" or "Hardware Novice" and adjusts its analogies accordingly.
*   **Multi-Lingual**: Instantly translate technical documentation into **Urdu** (and other languages) while preserving code blocks.

### 2. 🌌 Galactic UI/UX
*   **Deep Space Mode**: A visually stunning dark mode with animated starfields.
*   **Holographic HUD**: Glassmorphism effects on the navbar and chat widgets.
*   **Interactive Diagrams**: Mermaid.js flowcharts for ROS 2 nodes and Control Systems.

### 3. 📚 Comprehensive Curriculum (13 Weeks)
From **ROS 2 Humble** internals to **Vision-Language-Action (VLA)** models, this textbook covers the full stack of modern physical AI.
*   **Multi-OS Labs**: Dedicated tabs for Linux, Windows (WSL2), and macOS setup.
*   **Code-First Approach**: Python labs for Inverse Kinematics and Reinforcement Learning.

---

## 🛠️ Project Architecture (Monorepo)

The project follows the **SpecKit Methodology**: *Specification → Implementation*.

```text
/ (Root)
├── sspecs/                  # 📐 The Blueprints (SpecKit Plans)
├── course_outline.md       # 📝 Curriculum Design
└── physical_ai_textbook/   # 🏗️ The Implementation
    ├── docs/               #    - Markdown Content (The Book)
    ├── src/                #    - React Frontend (ChatInterface.tsx)
    ├── static/             #    - Assets (Images)
    └── backend/            #    - 🧠 The Intelligence Engine
        ├── app/main.py     #      - FastAPI + Gemini Logic
        ├── requirements.txt
        └── Procfile        #      - Deployment Config
```

---

## ⚡ Quick Start

### 1. The Frontend (The Book)
```bash
cd physical_ai_textbook
npm install
npm run start
# Opens at http://localhost:3000
```

### 2. The Backend (The Brain)
To enable the Chatbot and Personalization features:
```bash
cd physical_ai_textbook/backend
# Create a .env file with GEMINI_API_KEY=...
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs at http://localhost:8000
```

---

## 💡 Why This Matters?
Traditional textbooks are static. If a student doesn't understand "Kalman Filters", they are stuck.
In this project, the student can click **"✨ Personalize"**, and the book rewrites itself:
> *"Imagine a Kalman Filter like blending two eyes: one eye is your math model, the other is your sensor. Both are blurry, but together they see clearly."*

This is the power of **Physical AI + Generative AI**.

---

## 🏆 Hackathon Checklist
- [x] **Spec-Driven**: Built using SpecKit-Plus workflows.
- [x] **RAG Chatbot**: Integrated via FastAPI + Gemini.
- [x] **Bonus**: Personalization (Profile Context).
- [x] **Bonus**: Translation (Urdu Support).
- [x] **Bonus**: Reusable Intelligence (Subagents).

*Created with ❤️ by Usama & Antigravity (Claude Code Agent)*
