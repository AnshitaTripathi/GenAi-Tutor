from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Create database engine
# SQLite stores everything in a single file: genai_tutor.db
engine = create_engine(
    settings.database_url,
    # This is needed for SQLite only
    connect_args={"check_same_thread": False}
)

# Each request gets its own database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all our database models
Base = declarative_base()

def get_db():
    """
    Dependency function that provides a database session.
    
    Usage in routes:
        def my_route(db: Session = Depends(get_db)):
            ...
    
    Automatically closes session when request is done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()