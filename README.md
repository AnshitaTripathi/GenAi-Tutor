# 🎓 GenAI Tutor

An AI-powered personalized tutoring platform that adapts to student proficiency levels, generates interactive quizzes, visualizes data structures with real-time animations, tracks learning progress with analytics dashboards, and provides comprehensive performance insights.

> 🚀 **Complete Learning Platform** — Built step by step as a portfolio project showcasing full-stack development, AI integration, and data visualization skills!

---

## 🌟 Features

### ✅ Complete Feature Set

- **Student Profile System** 
  - Multi-step onboarding wizard
  - Username, email, proficiency level (beginner/intermediate/advanced)
  - Learning style preferences (visual/hands-on/conceptual)
  - Preferred topics selection
  
- **AI-Powered Learning**
  - Adaptive topic explanations tailored to student level
  - Personalized AI-generated greetings
  - Practice questions with hints
  - Real-time topic exploration
  - Word count and reading time estimates
  
- **Interactive Quiz System**
  - AI-generated multiple choice questions (5 per quiz)
  - Adaptive difficulty distribution by level
  - Timer-based sessions (5 minutes with countdown)
  - Automatic grading and instant feedback
  - Performance breakdown by difficulty (easy/medium/hard)
  - Detailed answer explanations
  - Complete quiz history with timestamps
  
- **Data Structure Visualizations** (5 Complete!)
  - **Array Visualizer** 📊 — Push, Pop, Insert, Delete, Access with memory addresses
  - **Stack Visualizer** 🥞 — Push, Pop, Peek, isEmpty with LIFO demonstration
  - **Queue Visualizer** 🎫 — Enqueue, Dequeue, Front, Rear with FIFO visualization
  - **Linked List Visualizer** 🔗 — Insert Head/Tail, Delete, Search, Traverse with pointer animations
  - **Binary Tree Visualizer** 🌳 — Insert, Delete, Inorder/Preorder/Postorder traversals with BST properties
  - **25+ total operations** across all visualizers
  - Smooth Framer Motion animations
  - Educational tooltips and time complexity displays
  
- **Analytics Dashboard** 📊
  - Performance metrics and statistics cards
  - Line chart: Score progression over time
  - Bar chart: Performance by topic
  - Radar chart: Performance by difficulty level
  - Recent quizzes table with detailed breakdown
  - AI-generated insights and recommendations
  - Improvement rate tracking
  
- **Learning History & Progress**
  - Every topic studied is saved with timestamps
  - Session tracking and statistics
  - Recent topics quick access
  - Persistent profiles across sessions

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** — Modern async Python web framework
- **LangChain** — AI orchestration and prompt management
- **Groq API** — FREE AI inference (Llama 3.3 70B Versatile)
- **SQLAlchemy** — ORM for database operations
- **SQLite** — Lightweight file-based database
- **Pydantic** — Data validation and serialization
- **Uvicorn** — ASGI server

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **Framer Motion** — Smooth animations for visualizations
- **Recharts** — Beautiful responsive charts for analytics
- **React Hooks** — Modern state management

### AI & External Services
- **Groq (FREE)** — Llama 3.3 70B Versatile model
- **LangChain** — Prompt templates and chain orchestration
- **Cost: $0.00** — Completely free tier (30 requests/minute, 14,400/day)

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
2. Sign up with Google or GitHub (no credit card required!)
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
│   │   ├── config.py                # Environment configuration
│   │   ├── database.py              # Database setup
│   │   │
│   │   ├── models/                  # Database models
│   │   │   ├── user.py
│   │   │   ├── profile.py
│   │   │   ├── session.py
│   │   │   └── quiz.py
│   │   │
│   │   ├── routes/                  # API endpoints
│   │   │   ├── learning.py
│   │   │   ├── profile.py
│   │   │   └── quiz.py
│   │   │
│   │   ├── schemas/                 # Pydantic models
│   │   │   ├── learning.py
│   │   │   ├── profile.py
│   │   │   └── quiz.py
│   │   │
│   │   └── services/
│   │       └── ai_service.py        # Groq AI integration
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── genai_tutor.db               # SQLite database
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main dashboard
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   └── src/
│       ├── components/
│       │   ├── ProfileSetup/
│       │   │   └── index.tsx
│       │   ├── QuizPlayer/
│       │   │   └── index.tsx
│       │   ├── QuizResults/
│       │   │   └── index.tsx
│       │   ├── AnalyticsDashboard/
│       │   │   └── index.tsx        # Analytics with charts
│       │   └── Visualizations/
│       │       ├── ArrayVisualizer.tsx
│       │       ├── StackVisualizer.tsx
│       │       ├── QueueVisualizer.tsx
│       │       ├── LinkedListVisualizer.tsx
│       │       └── BinaryTreeVisualizer.tsx
│       └── services/
│           └── api.ts
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

### Users Table
- id, username, email, is_active, timestamps

### Student Profiles Table
- id, user_id, proficiency_level, learning_style, preferred_topics, total_sessions, timestamps

### Learning Sessions Table
- id, user_id, topic, level, explanation, word_count, estimated_reading_time, created_at

### Quiz Sessions Table
- id, user_id, topic, level, total_questions, correct_answers, score, time_taken, completed, timestamps

### Quiz Questions Table
- id, quiz_session_id, question_number, question_text, options (JSON), correct_answer, user_answer, is_correct, difficulty, concept, explanation

---

## 🧪 Testing the Application

### 1. Backend Testing
```bash
cd backend
uvicorn app.main:app --reload
# Visit: http://localhost:8000/docs
```

### 2. Frontend Testing
```bash
cd frontend
npm run dev
# Visit: http://localhost:3000
```

### 3. Test All Features

**Profile Setup:**
- Create a profile with your details
- Choose proficiency level and learning style

**Learning:**
- Enter a topic (e.g., "arrays", "linked lists")
- Read AI-generated explanation
- Try practice questions

**Visualizations:**
- Click any of the 5 visualizer buttons
- Experiment with all operations
- Watch smooth animations

**Quizzes:**
- Generate a quiz on any topic
- Answer questions within 5 minutes
- Review results and explanations

**Analytics:**
- Click "📊 Analytics" button
- View your performance charts
- Read AI-generated insights

---

## 📈 Development Journey

### ✅ Completed Steps

- [x] **Step 1** — Project setup (FastAPI + Next.js)
- [x] **Step 2** — FREE AI integration with Groq
- [x] **Step 3** — Database and user profiles
- [x] **Step 4** — Quiz system with AI questions
- [x] **Step 5** — Data structure visualizations (5 complete!)
  - [x] Array Visualizer
  - [x] Stack Visualizer
  - [x] Queue Visualizer
  - [x] Linked List Visualizer
  - [x] Binary Tree Visualizer
- [x] **Step 6** — Analytics Dashboard with charts

### 🔮 Future Enhancements

- [ ] User authentication with JWT tokens
- [ ] Spaced repetition system for reviews
- [ ] More data structures (Graphs, Heaps)
- [ ] Code execution environment
- [ ] Deployment to production (Vercel + Railway)
- [ ] Mobile app version

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Groq API (Llama 3.3 70B) | **$0.00 / month** |
| SQLite Database | **$0.00** |
| Framer Motion | **$0.00** |
| Recharts | **$0.00** |
| Hosting (Future) | **~$0-5 / month** |
| **Total Current** | **$0.00** 🎉 |

---

## 🎯 Key Features Showcase

### Analytics Dashboard 📊
- **5 Stat Cards**: Total quizzes, average score, topics studied, best score, improvement rate
- **Line Chart**: Score progression over time showing learning trends
- **Bar Chart**: Average performance by topic
- **Radar Chart**: Performance breakdown by difficulty (easy/medium/hard)
- **Recent Quizzes Table**: Detailed history with scores, time, and dates
- **AI Insights**: Personalized recommendations based on performance

### Data Structure Visualizations

| Visualizer | Operations | Animations | Key Learning |
|------------|-----------|------------|--------------|
| **Array** 📊 | Push, Pop, Insert, Delete, Access | Element sliding, highlighting | Contiguous memory, O(1) access |
| **Stack** 🥞 | Push, Pop, Peek, isEmpty | Vertical stacking | LIFO principle, function calls |
| **Queue** 🎫 | Enqueue, Dequeue, Front, Rear | Horizontal flow | FIFO principle, task scheduling |
| **Linked List** 🔗 | Insert Head/Tail, Delete, Search, Traverse | Pointer connections, traversal | Dynamic memory, pointers |
| **Binary Tree** 🌳 | Insert, Delete, 3 Traversals | Node placement, highlighting | BST property, recursion |

**Total: 25+ operations with smooth animations**

### Quiz System
- AI-generated questions adapted to your level
- Multiple choice with 4 options
- 5-minute timer with auto-submit
- Instant grading and feedback
- Performance analytics by difficulty
- Complete history tracking

### Learning Experience
- Personalized AI explanations by level
- Reading time estimates
- Practice questions with hints
- Session tracking and history
- Recent topics quick access
- Profile persistence

---

## 🎨 Technology Highlights

### Frontend Excellence
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Responsive design with utility classes
- **Framer Motion**: 60fps animations for all visualizations
- **Recharts**: Beautiful, responsive charts
- **Component Architecture**: Modular and reusable

### Backend Excellence
- **Async/Await**: Non-blocking API operations
- **SQLAlchemy ORM**: Clean database interactions
- **Pydantic Validation**: Type-safe request/response models
- **LangChain**: Efficient AI prompt management
- **RESTful API**: Well-structured endpoints

### AI Integration
- **Groq API**: Fast, free AI inference
- **Adaptive Prompts**: Level-based content generation
- **JSON Parsing**: Structured quiz generation
- **Error Handling**: Robust AI response processing

---

## 🤝 Contributing

This project was built as a learning experience and portfolio piece. Contributions, issues, and feature requests are welcome!

### Ways to Contribute
- Report bugs or issues
- Suggest new features or visualizations
- Improve documentation
- Optimize performance
- Add new data structures

---

## 📝 License

MIT License — free to use for learning and personal projects.

---

## 👤 Author

**Anshita Tripathi**
- GitHub: [@AnshitaTripathi](https://github.com/AnshitaTripathi)
- Project: [GenAI Tutor](https://github.com/AnshitaTripathi/GenAi-Tutor)

---

## 🙏 Acknowledgments

- **AI orchestration**: [LangChain](https://langchain.com/)
- **Free AI inference**: [Groq](https://groq.com/)
- **Web frameworks**: [FastAPI](https://fastapi.tiangolo.com/) and [Next.js](https://nextjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

---

## 📊 Project Stats

- **Lines of Code**: ~8,000+
- **Components**: 15+
- **API Endpoints**: 11
- **Database Tables**: 5
- **Visualizers**: 5 complete
- **Operations**: 25+
- **Charts**: 3 types
- **Development Time**: Built step-by-step over multiple sessions
- **Cost**: $0.00 (completely free!)

---

## 🎓 What I Learned

Building this project taught me:
- Full-stack development with modern tools
- AI integration and prompt engineering
- Data structure implementation and visualization
- State management in React
- Database design and ORM usage
- RESTful API development
- Animation and chart libraries
- TypeScript and type safety
- Responsive design principles
- Git workflow and version control

---

## 🚀 Getting Started Guide

### For Beginners
1. Clone the repository
2. Follow the Quick Start guide above
3. Get your free Groq API key
4. Start the backend and frontend
5. Create your profile and start learning!

### For Developers
1. Explore the codebase structure
2. Check out the API documentation
3. Review the component architecture
4. Understand the AI integration
5. Contribute or fork for your own projects!

---

**⭐ Star this repo if you find it helpful!**

**🔗 Live Demo**: Coming soon (Deployment in progress)

---

**Note**: This is a complete, functional learning platform built from scratch as a portfolio project. It demonstrates full-stack development skills, AI integration, data visualization, and modern web development practices.
