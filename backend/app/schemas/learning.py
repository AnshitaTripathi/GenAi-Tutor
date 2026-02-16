from pydantic import BaseModel, Field
from typing import Literal

class GreetingRequest(BaseModel):
    """Request to get a personalized greeting"""
    student_name: str = Field(..., min_length=1, max_length=100)
    level: Literal["beginner", "intermediate", "advanced"]
    
    class Config:
        json_schema_extra = {
            "example": {
                "student_name": "Alex",
                "level": "beginner"
            }
        }

class GreetingResponse(BaseModel):
    """Personalized greeting response"""
    greeting: str
    student_name: str
    level: str

class TopicRequest(BaseModel):
    """Request to explain a topic"""
    topic: str = Field(..., min_length=1, max_length=200)
    level: Literal["beginner", "intermediate", "advanced"]
    learning_style: str = Field(default="visual")
    
    class Config:
        json_schema_extra = {
            "example": {
                "topic": "arrays",
                "level": "beginner",
                "learning_style": "visual"
            }
        }

class TopicResponse(BaseModel):
    """Topic explanation response"""
    topic: str
    level: str
    explanation: str
    word_count: int
    estimated_reading_time: int
    model_used: str

class PracticeQuestionsRequest(BaseModel):
    """Request for practice questions"""
    topic: str
    level: Literal["beginner", "intermediate", "advanced"]
    num_questions: int = Field(default=3, ge=1, le=5)

class PracticeQuestionsResponse(BaseModel):
    """Practice questions response"""
    topic: str
    level: str
    questions: str
    count: int