# 🎓 GenAI Tutor

An AI-powered personalized tutoring platform that adapts to student proficiency levels, provides interactive learning experiences, and tracks progress with detailed session history.

> 🚧 **Active Development** — Built step by step as a learning project. Star ⭐ the repo to follow progress!

---

## 🌟 Features (Current)

- **Student Profile System** — Multi-step onboarding with username, level, and learning style
- **Adaptive AI Explanations** — Real-time topic explanations tailored to beginner, intermediate, and advanced levels
- **Personalized Greetings** — AI-generated welcome messages based on student profile
- **Learning History** — Every studied topic is saved and displayed on the dashboard
- **Session Tracking** — Tracks total sessions and topics studied per student
- **Practice Questions** — AI-generated questions with hints for any topic
- **Persistent Profiles** — Profiles saved to database and remembered across sessions

## 🔮 Features (Coming Soon)

- **Quiz System** — Auto-generated multiple choice quizzes with scoring
- **Data Structure Visualizations** — Interactive memory diagrams
- **Analytics Dashboard** — Charts for progress tracking and weak area identification
- **User Authentication** — Secure login with JWT tokens
- **Deployment** — Live URL via Vercel and Railway

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** — Modern async Python web framework
- **LangChain** — AI orchestration and prompt management
- **Groq API** — FREE AI inference (Llama 3.3 70B) — no credit card required!
- **SQLAlchemy** — ORM for database operations
- **SQLite** — Lightweight file-based database (development)
- **Pydantic** — Data validation and serialization
- **Uvicorn** — ASGI server

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **React Hooks** — useState, useEffect for state management

### AI
- **Groq (FREE)** — Llama 3.3 70B Versatile model
- **LangChain** — Prompt templates and chain orchestration
- **Cost: $0.00** — Completely free tier (30 req/min, 14,400/day)

---

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- Groq API key (FREE — no credit card needed!)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/AnshitaTripathi/genai-tutor.git
cd genai-tutor
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Start the server
uvicorn app.main:app --reload
```

Backend runs on: **http://localhost:8000**

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

### 4. Get Your FREE Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with Google or GitHub (no credit card!)
3. Click **API Keys** → **Create API Key**
4. Copy and paste into your `backend/.env` file

---

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/profile/create` | Create new student profile |
| `GET` | `/api/profile/{username}` | Get profile and learning history |
| `PUT` | `/api/profile/{username}/update` | Update level or learning style |
| `GET` | `/api/profile/{username}/history` | Get all learning sessions |
| `POST` | `/api/learning/greeting` | Generate personalized greeting |
| `POST` | `/api/learning/explain` | Get AI explanation for any topic |
| `POST` | `/api/learning/practice` | Generate practice questions |
| `GET` | `/health` | API health check |

---

## 📁 Project Structure

```
genai-tutor/
│
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app entry point
│   │   ├── config.py                # Environment variable management
│   │   ├── database.py              # SQLAlchemy engine and session setup
│   │   │
│   │   ├── models/                  # Database table definitions
│   │   │   ├── user.py              # User model
│   │   │   ├── profile.py           # StudentProfile model
│   │   │   └── session.py           # LearningSession model
│   │   │
│   │   ├── routes/                  # API endpoint handlers
│   │   │   ├── learning.py          # Learning and explanation routes
│   │   │   └── profile.py           # Profile management routes
│   │   │
│   │   ├── schemas/                 # Pydantic request/response models
│   │   │   ├── learning.py          # Learning schemas
│   │   │   └── profile.py           # Profile schemas
│   │   │
│   │   └── services/                # Business logic
│   │       └── ai_service.py        # Groq AI integration
│   │
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment variables template
│   └── .gitignore                   # Python gitignore rules
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main learning dashboard
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles and animations
│   │
│   └── src/
│       ├── components/
│       │   └── ProfileSetup/
│       │       └── index.tsx        # 3-step profile setup wizard
│       └── services/
│           └── api.ts               # Type-safe API client
│
└── README.md
```

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
# FREE AI API Key — get at console.groq.com
GROQ_API_KEY=gsk_your_key_here

# Database
DATABASE_URL=sqlite:///./genai_tutor.db

# Application
APP_NAME=GenAI Tutor
ENVIRONMENT=development
SECRET_KEY=your-secret-key-here

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🗄️ Database Schema

```
users
├── id (UUID, Primary Key)
├── username (Unique)
├── email (Unique)
├── is_active
└── created_at, updated_at

student_profiles
├── id (UUID, Primary Key)
├── user_id (FK → users)
├── proficiency_level (beginner/intermediate/advanced)
├── learning_style (visual/hands-on/conceptual)
├── preferred_topics (JSON Array)
├── total_sessions
└── created_at, updated_at

learning_sessions
├── id (UUID, Primary Key)
├── user_id (FK → users)
├── topic
├── level
├── explanation (full AI response)
├── word_count
├── estimated_reading_time
└── created_at
```

---

## 🧪 Testing

### Backend

```bash
# Test Groq API connection
cd backend
python test_groq.py

# Start server and test endpoints
uvicorn app.main:app --reload
# Then visit: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm run dev
# Then visit: http://localhost:3000
```

---

## 📈 Development Progress

### ✅ Completed

- [x] **Step 1** — Project setup (FastAPI backend + Next.js frontend)
- [x] **Step 2** — FREE AI integration with Groq (Llama 3.3 70B)
  - [x] LangChain orchestration
  - [x] Adaptive topic explanations by level
  - [x] Personalized greeting generation
  - [x] Practice question generation
- [x] **Step 3** — Database and user profiles
  - [x] SQLite database with SQLAlchemy ORM
  - [x] User, StudentProfile, LearningSession models
  - [x] Full profile CRUD API endpoints
  - [x] 3-step profile setup wizard (UI)
  - [x] Learning dashboard with stats
  - [x] Session persistence and history tracking

### 🔲 In Progress / Coming Next

- [ ] **Step 4** — Quiz system with scoring and results
- [ ] **Step 5** — Interactive data structure visualizations
- [ ] **Step 6** — Analytics dashboard with charts
- [ ] **Step 7** — User authentication (JWT)
- [ ] **Step 8** — Deployment (Vercel + Railway)

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Groq API (Llama 3.3 70B) | **$0.00 / month** |
| SQLite (development) | **$0.00** |
| Next.js (Vercel — coming soon) | **$0.00** |
| **Total** | **$0.00** 🎉 |

---

## 🤝 Contributing

This is a learning project built step by step. Contributions, issues, and feature requests are welcome!

---

## 📝 License

MIT License — feel free to use this project for learning purposes.

---

## 👤 Author

**Anshita Tripathi**
- GitHub: [@AnshitaTripathi](https://github.com/AnshitaTripathi)

---

## 🙏 Acknowledgments

- AI orchestration by [LangChain](https://langchain.com/)
- Free AI inference by [Groq](https://groq.com/)
- Framework by [FastAPI](https://fastapi.tiangolo.com/) and [Next.js](https://nextjs.org/)
