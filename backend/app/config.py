from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "GenAI Tutor"
    ENVIRONMENT: str = "development"
    
    # API Keys
    GROQ_API_KEY: str
    
    # Database
    DATABASE_URL: str = "sqlite:///./genai_tutor.db"
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()

# Database URL configuration
# If DATABASE_URL starts with postgres://, replace with postgresql://
# (Some providers like Heroku use postgres:// but SQLAlchemy needs postgresql://)
database_url = settings.DATABASE_URL
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)