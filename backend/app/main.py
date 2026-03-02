from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import learning, profile, quiz

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GenAI Tutor API",
    description="AI-powered personalized tutoring platform",
    version="1.0.0"
)

# CORS Configuration - FIXED
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
)
   
# Include routers
app.include_router(learning.router)
app.include_router(profile.router)
app.include_router(quiz.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to GenAI Tutor API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}