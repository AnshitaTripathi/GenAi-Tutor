from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from ..database import Base

class User(Base):
    """
    User table - stores basic user information.
    
    Think of this as the 'login' information.
    
    Columns:
    - id: Unique identifier for each user
    - username: Their chosen username
    - email: Their email address
    - is_active: Whether account is active
    - created_at: When they signed up
    """
    
    # Table name in database
    __tablename__ = "users"
    
    # Columns (fields in the table)
    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )
    username = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )
    email = Column(
        String(255),
        unique=True,
        nullable=False
    )
    is_active = Column(
        Boolean,
        default=True
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )
    
    # Relationships (links to other tables)
    profile = relationship(
        "StudentProfile",
        back_populates="user",
        uselist=False
    )
    learning_sessions = relationship(
        "LearningSession",
        back_populates="user"
    )
    # No quiz_sessions relationship - not needed!
    
    def __repr__(self):
        return f"<User(username={self.username}, email={self.email})>"