# 🎓 GenAI Tutor

An AI-powered personalized tutoring platform that adapts to student proficiency levels, generates interactive quizzes, visualizes data structures with real-time animations, and tracks learning progress with detailed analytics.

> 🚧 **Active Development** — Built step by step as a learning project. Star ⭐ the repo to follow progress!

---

## 🌟 Features (Current)

### ✅ Completed Features

- **Student Profile System** — Multi-step onboarding with username, level, and learning style preferences
- **Adaptive AI Explanations** — Real-time topic explanations tailored to beginner, intermediate, and advanced levels
- **Personalized Greetings** — AI-generated welcome messages based on student profile
- **Learning History** — Every studied topic is saved and displayed on the dashboard with timestamps
- **Session Tracking** — Tracks total sessions and topics studied per student
- **Practice Questions** — AI-generated questions with hints for any topic
- **Quiz System** — Complete quiz functionality with:
  - AI-generated multiple choice questions (5 questions per quiz)
  - Adaptive difficulty based on student level
  - Timer-based quiz sessions (5 minutes)
  - Automatic grading and scoring
  - Detailed answer explanations
  - Performance breakdown by difficulty (easy/medium/hard)
  - Quiz history and results tracking
- **Interactive Data Structure Visualizations** — Three complete visualizers with animations:
  - **Visualizer Selector** — Choose between Array, Stack, or Queue
  - **Array Visualizer** — Push, Pop, Insert, Delete, Access operations with O(1) demonstration
  - **Stack Visualizer** — Push, Pop, Peek, isEmpty with LIFO visualization
  - **Queue Visualizer** — Enqueue, Dequeue, Front, Rear with FIFO demonstration
  - Memory addresses and position indicators
  - Real-time animations with Framer Motion
  - Visual highlighting and smooth transitions
  - Educational tooltips and key concepts
- **Persistent Profiles** — Profiles and learning data saved to database and remembered across sessions

### 🔮 Features (Coming Soon)

- **More Visualizations** — Linked Lists, Binary Trees
- **Analytics Dashboard** — Charts for progress tracking and weak area identification
- **User Authentication** — Secure login with JWT tokens
- **Spaced Repetition** — Smart review system for optimal learning
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
- **Framer Motion** — Smooth animations for visualizations
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

#### Learning Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/learning/greeting` | Generate personalized greeting |
| `POST` | `/api/learning/explain` | Get AI explanation for any topic |
| `POST` | `/api/learning/practice` | Generate practice questions |

#### Profile Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/profile/create` | Create new student profile |
| `GET` | `/api/profile/{username}` | Get profile and learning history |
| `PUT` | `/api/profile/{username}/update` | Update level or learning style |
| `GET` | `/api/profile/{username}/history` | Get all learning sessions |

#### Quiz Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/quiz/generate` | Generate new quiz for a topic |
| `POST` | `/api/quiz/submit` | Submit quiz answers and get score |
| `GET` | `/api/quiz/{username}/history` | Get quiz history and results |

#### System Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root endpoint with API info |
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
│   │   │   ├── session.py           # LearningSession model
│   │   │   └── quiz.py              # QuizSession and QuizQuestion models
│   │   │
│   │   ├── routes/                  # API endpoint handlers
│   │   │   ├── learning.py          # Learning and explanation routes
│   │   │   ├── profile.py           # Profile management routes
│   │   │   └── quiz.py              # Quiz generation and submission routes
│   │   │
│   │   ├── schemas/                 # Pydantic request/response models
│   │   │   ├── learning.py          # Learning schemas
│   │   │   ├── profile.py           # Profile schemas
│   │   │   └── quiz.py              # Quiz schemas
│   │   │
│   │   └── services/                # Business logic
│   │       └── ai_service.py        # Groq AI integration
│   │
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Python gitignore rules
│   └── genai_tutor.db               # SQLite database (auto-created)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main learning dashboard with 3 visualizers
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles and animations
│   │
│   └── src/
│       ├── components/
│       │   ├── ProfileSetup/
│       │   │   └── index.tsx        # 3-step profile setup wizard
│       │   ├── QuizPlayer/
│       │   │   └── index.tsx        # Quiz taking interface
│       │   ├── QuizResults/
│       │   │   └── index.tsx        # Quiz results and review
│       │   └── Visualizations/
│       │       ├── ArrayVisualizer.tsx   # Interactive array visualization
│       │       ├── StackVisualizer.tsx   # Interactive stack visualization
│       │       └── QueueVisualizer.tsx   # Interactive queue visualization
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

### Users Table
```
users
├── id (UUID, Primary Key)
├── username (Unique)
├── email (Unique)
├── is_active
└── created_at, updated_at
```

### Student Profiles Table
```
student_profiles
├── id (UUID, Primary Key)
├── user_id (FK → users)
├── proficiency_level (beginner/intermediate/advanced)
├── learning_style (visual/hands-on/conceptual)
├── preferred_topics (JSON Array)
├── total_sessions
└── created_at, updated_at
```

### Learning Sessions Table
```
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

### Quiz Sessions Table
```
quiz_sessions
├── id (UUID, Primary Key)
├── user_id (FK → users)
├── topic
├── level
├── total_questions
├── correct_answers
├── score (percentage)
├── time_taken (seconds)
├── completed
└── started_at, completed_at
```

### Quiz Questions Table
```
quiz_questions
├── id (UUID, Primary Key)
├── quiz_session_id (FK → quiz_sessions)
├── question_number
├── question_text
├── options (JSON: A, B, C, D)
├── correct_answer
├── user_answer
├── is_correct
├── difficulty (easy/medium/hard)
├── concept
└── explanation
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

### Test All Visualizers

1. Create a profile or log in
2. Enter any topic (e.g., "data structures")
3. Click "Explain Topic"
4. Scroll down to see **three visualizer buttons**:
   - 📊 **Array** — Index-based access, contiguous memory
   - 🥞 **Stack** — LIFO operations, push/pop/peek
   - 🎫 **Queue** — FIFO operations, enqueue/dequeue
5. Click any button to open the interactive visualizer
6. Experiment with operations and watch the smooth animations!

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
- [x] **Step 4** — Quiz system with AI-generated questions
  - [x] QuizSession and QuizQuestion models
  - [x] AI-powered quiz generation with adaptive difficulty
  - [x] Multiple choice questions (4 options per question)
  - [x] Quiz submission and automatic grading
  - [x] Score calculation with performance breakdown
  - [x] Answer explanations for learning
  - [x] Quiz history and results tracking
  - [x] Quiz player UI with timer
  - [x] Quiz results UI with detailed review
- [x] **Step 5A-C** — Data Structure Visualizations (3 complete)
  - [x] Array Visualizer with contiguous memory demonstration
  - [x] Stack Visualizer with LIFO operations
  - [x] Queue Visualizer with FIFO operations
  - [x] Visualizer selector UI with gradient buttons
  - [x] Framer Motion animations for all operations
  - [x] Visual highlighting and real-time feedback
  - [x] Memory addresses and position indicators
  - [x] Educational tooltips and key concepts
  - [x] Time complexity demonstrations

### 🔲 In Progress / Coming Next

- [ ] **Step 5D** — Linked List Visualizer (nodes with pointers)
- [ ] **Step 5E** — Binary Tree Visualizer (hierarchical structure)
- [ ] **Step 6** — Analytics dashboard with charts
- [ ] **Step 7** — User authentication (JWT)
- [ ] **Step 8** — Deployment (Vercel + Railway)

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Groq API (Llama 3.3 70B) | **$0.00 / month** |
| SQLite (development) | **$0.00** |
| Framer Motion | **$0.00** |
| Next.js (Vercel — coming soon) | **$0.00** |
| **Total** | **$0.00** 🎉 |

---

## 🎯 Key Features Showcase

### Interactive Visualizations (3 Complete!)

#### Visualizer Selector
- **Beautiful UI** — Three gradient buttons with emojis and descriptions
- **User Choice** — Select between Array, Stack, or Queue
- **Easy Access** — Available after every topic explanation
- **Responsive Design** — Works on all screen sizes

#### Array Visualizer 📊
- **Operations**: Push, Pop, Insert at Index, Delete at Index, Access Element
- **Key Features**: 
  - Memory addresses displayed (simulated hex values)
  - Index numbers for each element
  - O(1) access time demonstration
  - Smooth add/remove animations
- **Educational Value**: Shows contiguous memory and index-based access principles

#### Stack Visualizer 🥞
- **Operations**: Push (add to top), Pop (remove from top), Peek (view top), isEmpty (check if empty)
- **Key Features**:
  - Vertical stacking visualization
  - Top element highlighting
  - Position labels for each element
  - Real-time size and status display
- **Educational Value**: Demonstrates LIFO (Last In, First Out) principle with visual feedback

#### Queue Visualizer 🎫
- **Operations**: Enqueue (add to rear), Dequeue (remove from front), Front (view first), Rear (view last), isEmpty
- **Key Features**:
  - Horizontal line visualization
  - Front and rear indicators
  - Direction arrows (IN → and ← OUT)
  - Real-time tracking of both ends
- **Educational Value**: Demonstrates FIFO (First In, First Out) principle like a real waiting line

### Quiz System
- **Adaptive Difficulty**: Questions adjust based on student level (beginner/intermediate/advanced)
- **Multiple Choice**: 4 options per question with only one correct answer
- **Timer**: 5-minute countdown with auto-submit
- **Instant Grading**: Automatic scoring with percentage calculation
- **Performance Analytics**: Breakdown by difficulty (easy/medium/hard)
- **Learning-Focused**: Detailed explanations for every answer
- **Progress Tracking**: Complete quiz history saved to database

### Learning Experience
- **Personalized**: Content adapts to individual student level
- **Comprehensive**: Explanations include analogies, examples, and key takeaways
- **Interactive**: Practice questions, quizzes, and visual learning tools
- **Visual**: Three complete data structure visualizations with real-time animations
- **Tracked**: Every session saved with timestamps and metadata
- **Engaging**: Clean, modern UI with smooth transitions and gradient designs

---

## 🎨 Visualization Features

### Available Visualizers

| Visualizer | Operations | Key Concepts | Time Complexity | Status |
|------------|-----------|--------------|-----------------|--------|
| **Array** 📊 | Push, Pop, Insert, Delete, Access | Contiguous memory, Index-based, O(1) access | Access: O(1), Insert/Delete: O(n) | ✅ Complete |
| **Stack** 🥞 | Push, Pop, Peek, isEmpty | LIFO, Top-only access | All: O(1) | ✅ Complete |
| **Queue** 🎫 | Enqueue, Dequeue, Front, Rear, isEmpty | FIFO, Front/Rear pointers | All: O(1) | ✅ Complete |
| **Linked List** 🔗 | Insert, Delete, Traverse, Search | Nodes, Pointers, Dynamic memory | Access: O(n), Insert/Delete: O(1) | 🔄 Coming Soon |
| **Binary Tree** 🌳 | Insert, Delete, Traversals | Parent-child, Recursive | Search: O(log n) avg | 🔄 Coming Soon |

### Common Features Across All Visualizers
- ✨ Smooth Framer Motion animations
- 🎯 Visual highlighting during operations
- 📊 Real-time status updates and operation feedback
- ⏱️ Time complexity demonstrations
- 🔄 Reset functionality to restore initial state
- 💡 Educational tooltips and key concept explanations
- 🎨 Beautiful gradient color schemes for each type
- 📍 Position indicators (indices, top/bottom, front/rear)
- 🖱️ Interactive controls with input validation
- 📱 Responsive design for all screen sizes

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
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

## 📸 Features in Action

### Profile Setup
Multi-step wizard with level and learning style selection

### Learning Dashboard
Personalized greeting, stats, topic exploration, and recent history

### Quiz Interface
Timer-based multiple choice questions with progress tracking and animations

### Quiz Results
Detailed score breakdown with answer review and explanations

### Visualizer Selector
Three beautiful gradient buttons to choose between Array, Stack, and Queue visualizations

### Array Visualizer
Contiguous memory layout with indices, memory addresses, and smooth animations for all operations

### Stack Visualizer
Vertical LIFO visualization with push/pop animations, top element highlighting, and position labels

### Queue Visualizer
Horizontal FIFO visualization with enqueue/dequeue animations, front/rear indicators, and directional flow

---

**Note**: This project is under active development. More visualizations and features coming soon! Star ⭐ the repo to follow progress!
