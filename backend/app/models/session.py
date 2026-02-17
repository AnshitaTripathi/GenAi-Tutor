from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from ..database import Base

class LearningSession(Base):
    """
    Learning Session table - stores what topics were studied.
    
    Think of this as a 'study log' entry.
    
    Every time a student asks for an explanation → New row added here!
    
    Columns:
    - id: Unique session identifier
    - user_id: Who studied
    - topic: What they studied
    - level: Their level at time of study
    - explanation: The AI-generated explanation
    - word_count: Length of explanation
    - created_at: When they studied it
    """
    
    __tablename__ = "learning_sessions"
    
    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )
    user_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=False
    )
    topic = Column(
        String(255),
        nullable=False
    )
    level = Column(
        String(20),
        nullable=False
    )
    learning_style = Column(
        String(50),
        default="visual"
    )
    explanation = Column(
        Text,                       # Long text for AI explanation
        nullable=True
    )
    word_count = Column(
        Integer,
        default=0
    )
    estimated_reading_time = Column(
        Integer,
        default=0
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    # Relationship back to User
    user = relationship(
        "User",
        back_populates="learning_sessions"
    )
    
    def __repr__(self):
        return f"<LearningSession(topic={self.topic}, level={self.level})>"