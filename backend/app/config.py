from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """
    Application settings - loads from .env file
    """
    
    # FREE AI API Keys
    groq_api_key: str  # Primary (FREE!)
    google_api_key: Optional[str] = None  # Optional alternative
    huggingface_api_key: Optional[str] = None  # Optional alternative
    
    # Application
    app_name: str = "GenAI Tutor"
    environment: str = "development"
    secret_key: str = "dev-secret-key-change-in-production"
    
    # Database
    database_url: str = "sqlite:///./genai_tutor.db"
    
    # CORS
    frontend_url: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings()  