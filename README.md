# 🎓 GenAI Tutor

A complete AI-powered personalized learning platform featuring adaptive explanations, interactive quizzes, data structure visualizations, and comprehensive analytics - all powered by FREE AI.

> 🚀 **Fully Functional Learning Platform** — Built from scratch with modern full-stack technologies, featuring 5 interactive visualizers, AI-generated quizzes, and real-time analytics!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black.svg)](https://vercel.com/)
[![Deployed on Railway](https://img.shields.io/badge/Backend-Railway-purple.svg)](https://railway.app/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org/)

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
- **PostgreSQL** — Production-grade relational database (hosted on Railway)
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

### Deployment
- **Vercel** — Frontend hosting with global CDN
- **Railway** — Backend hosting with auto-scaling
- **PostgreSQL** — Production database on Railway

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

## ☁️ Deployment

This project is fully deployed using **Vercel** (frontend), **Railway** (backend), and **PostgreSQL** (database).

### 🖥️ Frontend — Vercel

1. Push your project to GitHub
2. Go to **[vercel.com](https://vercel.com)** and import your repository
3. Set the root directory to `frontend`
4. Add environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
   ```
5. Click **Deploy** — Vercel handles the rest automatically!

### ⚙️ Backend — Railway

1. Go to **[railway.app](https://railway.app)** and create a new project
2. Click **Deploy from GitHub repo** and select your repository
3. Set the root directory to `backend`
4. Add the following environment variables in Railway dashboard:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   DATABASE_URL=postgresql://user:password@host:port/dbname
   APP_NAME=GenAI Tutor
   ENVIRONMENT=production
   SECRET_KEY=your-secret-key-here
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
5. Railway will auto-detect the Python app and deploy it

### 🗄️ Database — PostgreSQL on Railway

1. In your Railway project, click **+ New** → **Database** → **PostgreSQL**
2. Railway automatically provisions the database and provides a `DATABASE_URL`
3. Copy the `DATABASE_URL` from Railway and add it to your backend environment variables
4. Your SQLAlchemy models will auto-create all tables on first run

### 🔗 Connecting Everything

After deployment, update CORS settings in `backend/app/main.py`:
```python
origins = [
    "https://your-vercel-app.vercel.app",
    "http://localhost:3000",  # for local dev
]
```

### 💰 Production Cost Breakdown

| Service | Monthly Cost |
|---------|--------------|
| Vercel (Frontend) | **$0** (Hobby tier) |
| Railway (Backend) | **~$5–10/month** |
| Railway PostgreSQL | **~$5/month** |
| Groq API | **$0.00** |
| **Total** | **~$10–15/month** |

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
│   └── genai_tutor.db                   # SQLite database (auto-created for local dev)
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

# Database (SQLite for local, PostgreSQL for production)
DATABASE_URL=sqlite:///./genai_tutor.db
# Production:
# DATABASE_URL=postgresql://user:password@host:port/dbname

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

- [x] **Step 1** — Project architecture (FastAPI + Next.js + PostgreSQL)
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
- [x] **Step 7** — Production deployment (Vercel + Railway + PostgreSQL)

### 🔮 Future Enhancements

- [ ] User authentication with JWT tokens
- [ ] Spaced repetition system for reviews
- [ ] More data structures (Graphs, Heaps, Hash Tables)
- [ ] Code execution environment
- [ ] Real-time collaboration features
- [ ] Mobile app version (React Native)

---

## 💰 Cost Breakdown

### Local Development

| Service | Monthly Cost |
|---------|--------------|
| Groq API (Llama 3.3 70B) | **$0.00** |
| SQLite Database | **$0.00** |
| Framer Motion | **$0.00** |
| Recharts | **$0.00** |
| **Total** | **$0.00** 🎉 |

### Production Deployment

| Service | Monthly Cost |
|---------|--------------|
| Vercel (Frontend) | **$0** (Hobby tier) |
| Railway (Backend) | **~$5–10/month** |
| Railway PostgreSQL | **~$5/month** |
| Groq API | **$0.00** |
| **Total** | **~$10–15/month** |

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
- **🚀 Deployed**: Vercel + Railway + PostgreSQL
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

### DevOps & Deployment
- **CI/CD** — Auto-deploy on push via Vercel & Railway
- **Environment Management** — Separate dev/prod configs
- **Database Migrations** — SQLAlchemy auto-create tables
- **Production Database** — PostgreSQL on Railway

---

## 🚀 Performance

- ⚡ **Quiz Generation**: <2 seconds
- ⚡ **Topic Explanation**: <3 seconds
- ⚡ **Page Load**: <1 second
- ⚡ **Visualizer Animations**: 60fps
- ⚡ **Database Queries**: <50ms

---

## 📸 Screenshots

### 🔗 Linked List Visualizer

**Node structure with HEAD/tail pointers and index labels:**

![Linked List Visualizer - Top](screenshots/linked_list_top.png)

**Insert, delete, search operations and key concepts panel:**

![Linked List Visualizer - Bottom](screenshots/linked_list_bottom.png)

> Features: Insert at Head/Tail, Delete Node, Search & Traverse, live stats (Total Nodes, Head Value, Tail Value). Complexity: Access O(n) · Insert/Delete at Head O(1) · Search O(n)

---

### 📊 Array Visualizer

**Contiguous memory layout with index labels and memory addresses:**

![Array Visualizer](screenshots/array_visualizer.png)

> Features: Push, Pop (Remove Last), Insert at Index, Delete at Index, Access Element. Shows live Length, Size in Memory, and Access Time O(1).

---

### 🥞 Stack Visualizer

**LIFO stack with TOP pointer and stacked element view:**

![Stack Visualizer - Top](screenshots/stack_top.png)

**Push, Pop, Peek operations and utility panel:**

![Stack Visualizer - Bottom](screenshots/stack_bottom.png)

> Features: Push, Pop (Remove Top), Peek (View Top), isEmpty(), Reset. Live stats: Current Size, Is Empty, Top Value. Complexity: Push/Pop O(1) · Peek O(1)

---

### 🎫 Queue Visualizer

**FIFO queue with ENQUEUE (IN) / DEQUEUE (OUT) direction labels:**

![Queue Visualizer - Top](screenshots/queue_top.png)

**Enqueue, Dequeue, Front/Rear operations and utility panel:**

![Queue Visualizer - Bottom](screenshots/queue_bottom.png)

> Features: Enqueue, Dequeue (Remove Front), Front, Rear, isEmpty(), Reset. Live stats: Current Size, Is Empty, Front Value, Rear Value. Complexity: Enqueue/Dequeue O(1) · Front/Rear Access O(1)

---

### 🌳 Binary Search Tree Visualizer

**Hierarchical BST with 7 nodes rendered as an interactive tree:**

![BST Visualizer - Top](screenshots/bst_top.png)

**Insert/Delete operations and all three tree traversal modes:**

![BST Visualizer - Bottom](screenshots/bst_bottom.png)

> Features: Insert Node, Delete Node, Reset Tree, Inorder (L→Root→R), Preorder (Root→L→R), Postorder (L→R→Root). Complexity: Search/Insert/Delete O(log n) avg

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
- **Frontend Hosting**: [Vercel](https://vercel.com/)
- **Backend Hosting**: [Railway](https://railway.app/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

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

### DevOps & Cloud Deployment
- Frontend deployment on Vercel with CI/CD
- Backend deployment on Railway
- PostgreSQL production database setup
- Environment variable management across dev/prod
- Cross-origin resource sharing (CORS) configuration

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**🚀 Built with passion as a learning journey — From concept to deployment!**

**💡 Perfect for portfolios, learning full-stack development, and understanding AI integration!**
