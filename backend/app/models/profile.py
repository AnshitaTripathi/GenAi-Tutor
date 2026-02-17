from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from ..database import Base

class StudentProfile(Base):
    """
    Student Profile table - stores learning preferences.
    
    Think of this as the student's 'academic record card'.
    
    Columns:
    - id: Unique profile identifier
    - user_id: Links to User table
    - proficiency_level: beginner/intermediate/advanced
    - learning_style: visual/hands-on/conceptual
    - preferred_topics: List of topics they like
    - total_sessions: How many learning sessions they've had
    """
    
    __tablename__ = "student_profiles"
    
    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )
    user_id = Column(
        String,
        ForeignKey("users.id"),     # Links to users table
        nullable=False,
        unique=True                 # One profile per user
    )
    proficiency_level = Column(
        String(20),
        default="beginner"          # Default to beginner
    )
    learning_style = Column(
        String(50),
        default="visual"
    )
    preferred_topics = Column(
        JSON,                       # Stores a list as JSON
        default=list
    )
    total_sessions = Column(
        String,
        default="0"
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )
    
    # Relationship back to User
    user = relationship(
        "User",
        back_populates="profile"
    )
    
    def __repr__(self):
        return f"<StudentProfile(level={self.proficiency_level}, style={self.learning_style})>"