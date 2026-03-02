# 🎓 GenAI Tutor

A complete AI-powered personalized learning platform featuring adaptive explanations, interactive quizzes, data structure visualizations, and comprehensive analytics - all powered by FREE AI.

> 🚀 **Fully Functional Learning Platform** — Built from scratch with modern full-stack technologies, featuring 5 interactive visualizers, AI-generated quizzes, and real-time analytics!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)

---

## ✨ Features

### 🎯 Core Learning System
- **🤖 AI-Powered Explanations** — Adaptive content generation based on student proficiency level (beginner/intermediate/advanced)
- **📚 Personalized Learning** — Custom greetings, level-based content, and learning style preferences (visual/hands-on/conceptual)
- **📊 Progress Tracking** — Complete learning history with session tracking and topic statistics
- **💾 Persistent Profiles** — All data saved to database and persists across sessions

### 🧠 Interactive Quiz System
- **✨ AI-Generated Questions** — 5 unique multiple-choice questions per quiz, tailored to your level
- **⏱️ Timed Sessions** — 5-minute countdown timer with auto-submit
- **📈 Instant Grading** — Automatic scoring with detailed performance breakdown
- **🎯 Difficulty Distribution** — Questions balanced across easy/medium/hard levels
- **💡 Learning-Focused** — Detailed explanations for every answer
- **📝 Complete History** — All quiz attempts saved with full review capability
- **🔄 Retake Option** — Practice topics multiple times to improve

### 🎨 Interactive Visualizations (5 Complete!)

| Visualizer | Operations | Key Concepts | Status |
|------------|-----------|--------------|--------|
| **📊 Array** | Push, Pop, Insert, Delete, Access (5 ops) | Contiguous memory, O(1) access, index-based | ✅ Complete |
| **🥞 Stack** | Push, Pop, Peek, isEmpty (4 ops) | LIFO principle, top-only access | ✅ Complete |
| **🎫 Queue** | Enqueue, Dequeue, Front, Rear, isEmpty (5 ops) | FIFO principle, front/rear pointers | ✅ Complete |
| **🔗 Linked List** | Insert Head/Tail, Delete, Search, Traverse (5 ops) | Dynamic nodes, pointer navigation | ✅ Complete |
| **🌳 Binary Tree** | Insert, Delete, Inorder, Preorder, Postorder (6 ops) | BST property, hierarchical structure | ✅ Complete |

**Total: 25+ operations with smooth Framer Motion animations**

**Visualizer Features:**
- ✨ Smooth 60fps animations with spring physics
- 🎯 Visual highlighting during operations
- 📍 Position indicators (indices, top/bottom, front/rear, head/tail)
- ⏱️ Time complexity demonstrations
- 💡 Educational tooltips and key concepts
- 🎨 Unique gradient color schemes for each type
- 🔄 Reset functionality
- 📱 Fully responsive design

### 📊 Analytics Dashboard
- **📈 Line Chart** — Quiz score progression over time showing learning trends
- **📊 Bar Chart** — Average performance by topic
- **🎯 Radar Chart** — Performance breakdown by difficulty (easy/medium/hard)
- **📋 Stats Cards** — Total quizzes, average score, topics studied, best score, improvement rate
- **📝 Recent Quizzes Table** — Detailed history with scores, time taken, and dates
- **💡 AI Insights** — Personalized recommendations based on performance patterns

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** — Modern async Python web framework
- **LangChain** — AI orchestration and prompt management
- **Groq API** — FREE AI inference (Llama 3.3 70B Versatile)
- **SQLAlchemy** — ORM for database operations
- **SQLite** — Lightweight file-based database
- **Pydantic** — Data validation and serialization
- **Uvicorn** — High-performance ASGI server

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe JavaScript throughout
- **Tailwind CSS** — Utility-first CSS framework
- **Framer Motion** — Production-ready animation library
- **Recharts** — Beautiful responsive charts for analytics
- **React Hooks** — Modern state management

### AI & Services
- **Groq (FREE)** — Llama 3.3 70B Versatile model
- **LangChain** — Prompt templates and chain orchestration
- **Cost: $0.00** — Completely free tier (30 requests/minute, 14,400/day)

---

## 📋 Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**
- **Groq API Key** (FREE — no credit card required!)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnshitaTripathi/genai-tutor.git
cd genai-tutor
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Start the server
uvicorn app.main:app --reload
```

✅ Backend runs on: **http://localhost:8000**

### 3️⃣ Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend runs on: **http://localhost:3000**

### 4️⃣ Get Your FREE Groq API Key

1. Go to **[console.groq.com](https://console.groq.com)**
2. Sign up with Google or GitHub (no credit card required!)
3. Click **API Keys** → **Create API Key**
4. Copy and paste into your `backend/.env` file

---

## 📚 API Documentation

Once the backend is running, explore the interactive API docs:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

### Available Endpoints

#### Learning Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/learning/greeting` | Generate personalized AI greeting |
| `POST` | `/api/learning/explain` | Get adaptive topic explanation |
| `POST` | `/api/learning/practice` | Generate practice questions |

#### Profile Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/profile/create` | Create new student profile |
| `GET` | `/api/profile/{username}` | Get profile and learning history |
| `PUT` | `/api/profile/{username}/update` | Update proficiency level or style |
| `GET` | `/api/profile/{username}/history` | Get all learning sessions |

#### Quiz Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/quiz/generate` | Generate new quiz for a topic |
| `POST` | `/api/quiz/submit` | Submit quiz answers and get results |
| `GET` | `/api/quiz/{username}/history` | Get complete quiz history |

---

## 📁 Project Structure

```
genai-tutor/
│
├── backend/
│   ├── app/
│   │   ├── main.py                      # FastAPI app with CORS
│   │   ├── config.py                    # Environment configuration
│   │   ├── database.py                  # Database setup
│   │   │
│   │   ├── models/                      # SQLAlchemy models
│   │   │   ├── user.py                  # User model
│   │   │   ├── profile.py               # StudentProfile model
│   │   │   ├── session.py               # LearningSession model
│   │   │   └── quiz.py                  # QuizSession & QuizQuestion models
│   │   │
│   │   ├── routes/                      # API endpoints
│   │   │   ├── learning.py              # Learning & explanations
│   │   │   ├── profile.py               # Profile management
│   │   │   └── quiz.py                  # Quiz generation & grading
│   │   │
│   │   ├── schemas/                     # Pydantic request/response models
│   │   │   ├── learning.py
│   │   │   ├── profile.py
│   │   │   └── quiz.py
│   │   │
│   │   └── services/
│   │       └── ai_service.py            # Groq AI integration
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── genai_tutor.db                   # SQLite database (auto-created)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                     # Main dashboard
│   │   ├── layout.tsx                   # Root layout
│   │   └── globals.css                  # Global styles
│   │
│   └── src/
│       ├── components/
│       │   ├── ProfileSetup/
│       │   │   └── index.tsx            # 3-step profile wizard
│       │   ├── QuizPlayer/
│       │   │   └── index.tsx            # Interactive quiz interface
│       │   ├── QuizResults/
│       │   │   └── index.tsx            # Score & review display
│       │   ├── AnalyticsDashboard/
│       │   │   └── index.tsx            # Charts & insights
│       │   └── Visualizations/
│       │       ├── ArrayVisualizer.tsx
│       │       ├── StackVisualizer.tsx
│       │       ├── QueueVisualizer.tsx
│       │       ├── LinkedListVisualizer.tsx
│       │       └── BinaryTreeVisualizer.tsx
│       └── services/
│           └── api.ts                   # Type-safe API client
│
└── README.md
```

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
# FREE AI API Key from console.groq.com
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

### Users
- `id` (UUID, PK), `username` (unique), `email` (unique), `is_active`, timestamps

### Student Profiles
- `id` (UUID, PK), `user_id` (FK), `proficiency_level`, `learning_style`, `preferred_topics`, `total_sessions`, timestamps

### Learning Sessions
- `id` (UUID, PK), `user_id` (FK), `topic`, `level`, `explanation`, `word_count`, `estimated_reading_time`, `created_at`

### Quiz Sessions
- `id` (UUID, PK), `user_id` (FK), `topic`, `level`, `total_questions`, `correct_answers`, `score`, `time_taken`, `completed`, timestamps

### Quiz Questions
- `id` (UUID, PK), `quiz_session_id` (FK), `question_number`, `question_text`, `options` (JSON), `correct_answer`, `user_answer`, `is_correct`, `difficulty`, `concept`, `explanation`

---

## 🧪 Testing the Application

### 1. Test Backend
```bash
cd backend
uvicorn app.main:app --reload
# Visit: http://localhost:8000/docs
```

### 2. Test Frontend
```bash
cd frontend
npm run dev
# Visit: http://localhost:3000
```

### 3. Complete User Flow

**Profile Creation:**
1. Enter username and email
2. Select proficiency level (beginner/intermediate/advanced)
3. Choose learning style (visual/hands-on/conceptual)
4. Get personalized AI greeting

**Learning:**
1. Enter a topic (e.g., "linked lists", "binary trees")
2. Read AI-generated explanation tailored to your level
3. View estimated reading time and word count
4. Session automatically saved to history

**Visualizations:**
1. Click any of the 5 visualizer buttons after explanation
2. Experiment with all operations
3. Watch smooth animations and visual feedback
4. Learn time complexity and key concepts

**Quizzes:**
1. Click "Take Quiz" button after learning
2. Answer 5 AI-generated questions
3. Complete within 5-minute timer
4. Review results with detailed explanations
5. See performance breakdown by difficulty
6. Retake to improve your score

**Analytics:**
1. Click "📊 Analytics" button in header
2. View score progression over time
3. Analyze performance by topic and difficulty
4. Read AI-generated insights and recommendations
5. Review complete quiz history

---

## 📈 Development Journey

### ✅ Completed Features

- [x] **Step 1** — Project architecture (FastAPI + Next.js + SQLite)
- [x] **Step 2** — FREE AI integration with Groq (Llama 3.3 70B)
- [x] **Step 3** — User profiles and database design
- [x] **Step 4** — Complete quiz system with AI generation
- [x] **Step 5** — Five data structure visualizations
  - [x] Array Visualizer (contiguous memory)
  - [x] Stack Visualizer (LIFO operations)
  - [x] Queue Visualizer (FIFO operations)
  - [x] Linked List Visualizer (pointer navigation)
  - [x] Binary Tree Visualizer (hierarchical BST)
- [x] **Step 6** — Analytics dashboard with charts and insights

### 🔮 Future Enhancements

- [ ] User authentication with JWT tokens
- [ ] Spaced repetition system for reviews
- [ ] More data structures (Graphs, Heaps, Hash Tables)
- [ ] Code execution environment
- [ ] Real-time collaboration features
- [ ] Mobile app version (React Native)
- [ ] Deployment to production (Vercel + Railway)

---

## 💰 Cost Breakdown

| Service | Monthly Cost |
|---------|--------------|
| Groq API (Llama 3.3 70B) | **$0.00** |
| SQLite Database | **$0.00** |
| Framer Motion | **$0.00** |
| Recharts | **$0.00** |
| Development Hosting | **$0.00** |
| **Total** | **$0.00** 🎉 |

**Future Production Costs (Optional):**
- Vercel (Frontend): $0-20/month
- Railway (Backend): $0-10/month
- PostgreSQL (Upgrade from SQLite): $0-5/month

---

## 🎯 Project Statistics

- **📝 Total Lines of Code**: ~10,000+
- **🧩 Components**: 18+
- **🔌 API Endpoints**: 11
- **💾 Database Tables**: 5
- **🎨 Visualizers**: 5 complete
- **⚡ Operations**: 25+
- **📊 Chart Types**: 3 (Line, Bar, Radar)
- **💵 Development Cost**: $0.00
- **⏱️ Build Time**: Multiple focused sessions
- **🎓 Learning Value**: Immense!

---

## 🎨 Key Technical Highlights

### Backend Excellence
- **Async Operations** — Non-blocking API with async/await
- **Type Safety** — Pydantic models for validation
- **ORM Architecture** — Clean SQLAlchemy database layer
- **AI Integration** — Structured LangChain prompts
- **CORS Configuration** — Proper cross-origin handling
- **Error Handling** — Comprehensive exception management

### Frontend Excellence
- **TypeScript** — Full type safety across application
- **Component Architecture** — Modular, reusable design
- **State Management** — React Hooks (useState, useEffect)
- **Animations** — 60fps Framer Motion transitions
- **Responsive Design** — Mobile-first Tailwind CSS
- **Data Visualization** — Interactive Recharts graphs

### AI Integration
- **Fast Inference** — Groq's lightning-fast API
- **Adaptive Prompts** — Level-based content generation
- **Structured Output** — JSON parsing for quizzes
- **Error Recovery** — Robust AI response handling

---

## 🚀 Performance

- ⚡ **Quiz Generation**: <2 seconds
- ⚡ **Topic Explanation**: <3 seconds
- ⚡ **Page Load**: <1 second
- ⚡ **Visualizer Animations**: 60fps
- ⚡ **Database Queries**: <50ms

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

**Ways to contribute:**
- 🐛 Report bugs or issues
- 💡 Suggest new features or visualizations
- 📖 Improve documentation
- ⚡ Optimize performance
- 🎨 Enhance UI/UX
- 🆕 Add new data structures

---

## 📝 License

MIT License — Free to use for learning and personal projects.

See [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Anshita Tripathi**
- GitHub: [@AnshitaTripathi](https://github.com/AnshitaTripathi)
- Project: [GenAI Tutor](https://github.com/AnshitaTripathi/GenAi-Tutor)

---

## 🙏 Acknowledgments

- **AI Orchestration**: [LangChain](https://langchain.com/)
- **Free AI Inference**: [Groq](https://groq.com/)
- **Web Frameworks**: [FastAPI](https://fastapi.tiangolo.com/) & [Next.js](https://nextjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 🎓 What This Project Demonstrates

### Full-Stack Development
- RESTful API design and implementation
- Database modeling and ORM usage
- Frontend-backend integration
- State management in React
- TypeScript for type safety

### AI & ML Integration
- AI API integration (Groq/LangChain)
- Prompt engineering for quality outputs
- Structured data generation
- Error handling with AI responses

### Data Visualization
- Interactive animations with Framer Motion
- Data structure visualizations from scratch
- Chart implementation with Recharts
- Real-time performance tracking

### Software Engineering
- Clean code architecture
- Component-based design
- Git workflow and version control
- Environment configuration
- CORS and security basics

---

## 📸 Screenshots

*(Will be adding soon...)*

1. **Profile Setup** — 3-step onboarding wizard
2. **Learning Dashboard** — Personalized greeting and stats
3. **Topic Explanation** — AI-generated content with reading time
4. **Quiz Interface** — Timed questions with progress bar
5. **Quiz Results** — Score visualization and review
6. **Visualizer Selector** — 5 beautiful gradient buttons
7. **Array Visualizer** — Memory addresses and animations
8. **Stack Visualizer** — LIFO operations with highlighting
9. **Queue Visualizer** — FIFO demonstration
10. **Linked List Visualizer** — Pointer-based navigation
11. **Binary Tree Visualizer** — Hierarchical structure with traversals
12. **Analytics Dashboard** — Charts and performance insights

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**🚀 Built with passion as a learning journey — From concept to completion!**

**💡 Perfect for portfolios, learning full-stack development, and understanding AI integration!**
