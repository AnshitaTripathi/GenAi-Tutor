from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import learning

# Create app
app = FastAPI(
    title=f"{settings.app_name} API",
    version="1.0.0",
    description="FREE AI-powered tutoring platform using Groq (Llama 3)"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(learning.router)

@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name}!",
        "status": "running",
        "ai_provider": "Groq (FREE)",
        "model": "Llama 3.1 70B",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "ai_configured": bool(settings.groq_api_key),
        "free_tier": True
    }