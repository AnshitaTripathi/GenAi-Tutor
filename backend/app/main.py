from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routes import learning, profile
from . import models  # Import models so tables are created

# Create all database tables automatically on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=f"{settings.app_name} API",
    version="1.0.0",
    description="AI-powered tutoring platform with Groq (Llama 3.3)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(learning.router)
app.include_router(profile.router)

@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name}!",
        "status": "running",
        "database": "SQLite (connected)",
        "ai_provider": "Groq - Llama 3.3 70B",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected",
        "ai": "connected"
    }