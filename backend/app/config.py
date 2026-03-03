from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    #  Pydantic v2 configuration
    model_config = SettingsConfigDict(
        env_file=".env",        # for local development
        case_sensitive=True     # match exact env variable names
    )

    # App Settings
    APP_NAME: str = "GenAI Tutor"
    ENVIRONMENT: str = "development"

    # API Keys
    GROQ_API_KEY: str

    # Database
    DATABASE_URL: str = "sqlite:///./genai_tutor.db"

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()

# Database URL configuration
database_url = settings.DATABASE_URL

# Fix postgres:// → postgresql:// for SQLAlchemy
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)