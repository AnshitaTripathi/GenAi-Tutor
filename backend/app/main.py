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

# CORS Configuration for Production
# This allows your frontend (Vercel) to communicate with backend (Railway)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Local development
        "http://127.0.0.1:3000",          # Local development alternative
        "https://*.vercel.app",            # All Vercel preview deployments
        "https://genai-tutor.vercel.app",  # Your production Vercel URL (update this!)
        "*"  # Allow all origins (for development - can remove later)
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
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
        "status": "running",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "cors": "enabled",
        "api_version": "1.0.0",
        "environment": "production"
    }

# Add OPTIONS handler for CORS preflight requests
@app.options("/{path:path}")
async def options_handler(path: str):
    """Handle CORS preflight requests"""
    return {"message": "OK"}