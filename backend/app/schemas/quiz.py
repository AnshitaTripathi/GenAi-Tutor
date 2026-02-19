from pydantic import BaseModel, Field
from typing import Dict, List, Literal, Optional
from datetime import datetime

# ─── Request Schemas ──────────────────────────────────────────────

class QuizGenerateRequest(BaseModel):
    """Request to generate a new quiz"""
    username: str = Field(..., min_length=2)
    topic: str = Field(..., min_length=2, max_length=200)
    level: Literal["beginner", "intermediate", "advanced"]
    num_questions: int = Field(default=5, ge=3, le=10)
    
    class Config:
        json_schema_extra = {
            "example": {
                "username": "anshita",
                "topic": "arrays",
                "level": "beginner",
                "num_questions": 5
            }
        }

class QuizAnswerSubmission(BaseModel):
    """User's answers to quiz questions"""
    quiz_session_id: str
    answers: Dict[str, str]  # {"question_id": "A", "question_id": "B", ...}
    time_taken: int  # seconds
    
    class Config:
        json_schema_extra = {
            "example": {
                "quiz_session_id": "uuid-here",
                "answers": {
                    "question-id-1": "A",
                    "question-id-2": "B",
                    "question-id-3": "C"
                },
                "time_taken": 245
            }
        }

# ─── Response Schemas ─────────────────────────────────────────────

class QuizQuestionResponse(BaseModel):
    """Single quiz question (without correct answer!)"""
    id: str
    question_number: int
    question_text: str
    options: Dict[str, str]  # {"A": "...", "B": "...", "C": "...", "D": "..."}
    difficulty: str
    
    class Config:
        from_attributes = True

class QuizSessionResponse(BaseModel):
    """Quiz session info when starting"""
    id: str
    topic: str
    level: str
    total_questions: int
    questions: List[QuizQuestionResponse]
    started_at: datetime
    
    class Config:
        from_attributes = True

class QuizQuestionResult(BaseModel):
    """Single question result after submission"""
    question_number: int
    question_text: str
    options: Dict[str, str]
    user_answer: Optional[str]
    correct_answer: str
    is_correct: bool
    explanation: str
    difficulty: str

class QuizResultsResponse(BaseModel):
    """Complete quiz results"""
    quiz_id: str
    topic: str
    total_questions: int
    correct_answers: int
    score: float  # Percentage
    time_taken: int
    passed: bool  # True if score >= 60%
    questions: List[QuizQuestionResult]
    
    # Performance by difficulty
    easy_correct: int
    easy_total: int
    medium_correct: int
    medium_total: int
    hard_correct: int
    hard_total: int
    
    # Feedback
    feedback: str  # AI-generated feedback based on performance