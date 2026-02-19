from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from ..database import Base

class QuizSession(Base):
    """Quiz Session table - stores each quiz attempt."""
    
    __tablename__ = "quiz_sessions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    learning_session_id = Column(String, ForeignKey("learning_sessions.id"), nullable=True)
    topic = Column(String(255), nullable=False)
    level = Column(String(20), nullable=False)
    total_questions = Column(Integer, default=5)
    correct_answers = Column(Integer, default=0)
    score = Column(Float, default=0.0)
    time_taken = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User")
    questions = relationship("QuizQuestion", back_populates="quiz_session", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<QuizSession(topic={self.topic}, score={self.score}%)>"


class QuizQuestion(Base):
    """Quiz Question table - stores individual questions."""
    
    __tablename__ = "quiz_questions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    quiz_session_id = Column(String, ForeignKey("quiz_sessions.id"), nullable=False)
    question_number = Column(Integer, nullable=False)
    question_text = Column(String(1000), nullable=False)
    options = Column(String(2000), nullable=False)
    correct_answer = Column(String(1), nullable=False)
    user_answer = Column(String(1), nullable=True)
    is_correct = Column(Boolean, nullable=True)
    difficulty = Column(String(20), default="medium")
    concept = Column(String(255), nullable=True)
    explanation = Column(String(1000), nullable=True)
    
    # Relationship
    quiz_session = relationship("QuizSession", back_populates="questions")
    
    def __repr__(self):
        return f"<QuizQuestion(#{self.question_number}, correct={self.is_correct})>"