# 🎓 GenAI Tutor

An AI-powered personalized tutoring platform that adapts to student proficiency levels, provides interactive visualizations, and offers intelligent assessments with detailed analytics.

## 🌟 Features

- **Adaptive Learning**: Content tailored to beginner, intermediate, and advanced levels
- **AI-Powered Explanations**: Real-time topic explanations using Claude/GPT
- **Interactive Visualizations**: Memory diagrams for data structures
- **Smart Quizzes**: Auto-generated questions based on difficulty
- **Analytics Dashboard**: Track progress and identify weak areas
- **Personalized Recommendations**: AI suggests next topics based on performance

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **LangChain** - AI orchestration framework
- **Claude API** - AI content generation
- **PostgreSQL** - Production database
- **SQLAlchemy** - ORM for database operations

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **React Flow** - Interactive diagrams

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- Anthropic API key (or OpenAI API key)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/genai-tutor.git
cd genai-tutor
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your API keys
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start the server
uvicorn app.main:app --reload
```

Backend will run on: http://localhost:8000

### 3. Frontend Setup
```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: http://localhost:3000

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📁 Project Structure

```
genai-tutor/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── config.py            # Configuration management
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic & AI services
│   │   ├── models/              # Database models
│   │   └── schemas/             # Pydantic schemas
│   │
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # Reusable React components
│   │   └── services/            # API client & utilities
│   │
│   └── package.json             # Node dependencies
│
└── README.md
```
## 🔧 Environment Variables

### Backend (.env)
```env
ANTHROPIC_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./genai_tutor.db
SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📈 Current Progress

- [x] Project setup and initialization
- [x] AI service integration (Claude API)
- [x] Basic learning endpoints
- [x] Frontend-backend connection
- [ ] Database models and migrations
- [ ] User authentication
- [ ] Quiz generation system
- [ ] Visualization components
- [ ] Analytics dashboard
- [ ] Deployment configuration

## 🤝 Contributing

This is a learning project. Contributions, issues, and feature requests are welcome!

## 📝 License

MIT License - feel free to use this project for learning purposes.

## 👤 Author

**Anshita Tripathi**
- GitHub: [AnshitaTripathi](https://github.com/AnshitaTripathi)

## 🙏 Acknowledgments

- Built with [LangChain](https://langchain.com/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- UI components inspired by modern design patterns

---

**Note**: This project is under active development. Star ⭐ the repo to follow progress!

