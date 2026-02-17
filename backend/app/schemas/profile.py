from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Literal
from datetime import datetime

#  Request Schemas (What frontend sends) 

class UserCreate(BaseModel):
    """Data needed to create a new user"""
    username: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=255)
    
    class Config:
        json_schema_extra = {
            "example": {
                "username": "anshita",
                "email": "anshita@example.com"
            }
        }

class ProfileCreate(BaseModel):
    """Data needed to create/update a student profile"""
    username: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=255)
    proficiency_level: Literal["beginner", "intermediate", "advanced"]
    learning_style: Literal["visual", "hands-on", "conceptual"] = "visual"
    preferred_topics: Optional[List[str]] = []
    
    class Config:
        json_schema_extra = {
            "example": {
                "username": "anshita",
                "email": "anshita@example.com",
                "proficiency_level": "beginner",
                "learning_style": "visual",
                "preferred_topics": ["arrays", "linked lists"]
            }
        }

class ProfileUpdate(BaseModel):
    """Data to update existing profile (all fields optional)"""
    proficiency_level: Optional[Literal["beginner", "intermediate", "advanced"]] = None
    learning_style: Optional[Literal["visual", "hands-on", "conceptual"]] = None
    preferred_topics: Optional[List[str]] = None

# ─── Response Schemas (What backend sends back) ──────────────────

class UserResponse(BaseModel):
    """User data returned from API"""
    id: str
    username: str
    email: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True      # Allows converting SQLAlchemy model to schema

class ProfileResponse(BaseModel):
    """Profile data returned from API"""
    id: str
    user_id: str
    proficiency_level: str
    learning_style: str
    preferred_topics: List[str]
    total_sessions: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class LearningSessionResponse(BaseModel):
    """Learning session data returned from API"""
    id: str
    topic: str
    level: str
    word_count: int
    estimated_reading_time: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class FullProfileResponse(BaseModel):
    """Complete profile with user info and learning history"""
    user: UserResponse
    profile: ProfileResponse
    recent_sessions: List[LearningSessionResponse]
    total_topics_studied: int