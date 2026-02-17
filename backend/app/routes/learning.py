from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.session import LearningSession
from ..models.user import User
from ..schemas.learning import (
    GreetingRequest,
    GreetingResponse,
    TopicRequest,
    TopicResponse,
    PracticeQuestionsRequest,
    PracticeQuestionsResponse
)
from ..services.ai_service import ai_service
from typing import Optional

router = APIRouter(
    prefix="/api/learning",
    tags=["Learning"]
)

@router.post("/greeting", response_model=GreetingResponse)
async def get_greeting(request: GreetingRequest):
    """Generate a personalized AI greeting"""
    try:
        greeting = await ai_service.generate_greeting(
            student_name=request.student_name,
            level=request.level
        )
        return GreetingResponse(
            greeting=greeting,
            student_name=request.student_name,
            level=request.level
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/explain", response_model=TopicResponse)
async def explain_topic(
    request: TopicRequest,
    username: Optional[str] = None,     # Optional: save to DB if provided
    db: Session = Depends(get_db)
):
    """
    Get AI explanation and optionally save to learning history.
    
    If username is provided, the session is saved to the database.
    """
    try:
        result = await ai_service.explain_topic(
            topic=request.topic,
            level=request.level,
            learning_style=request.learning_style
        )
        
        # Save to database if username provided
        if username:
            user = db.query(User).filter(
                User.username == username
            ).first()
            
            if user:
                session = LearningSession(
                    user_id=user.id,
                    topic=request.topic,
                    level=request.level,
                    learning_style=request.learning_style,
                    explanation=result["explanation"],
                    word_count=result["word_count"],
                    estimated_reading_time=result["estimated_reading_time"]
                )
                db.add(session)
                
                # Update total sessions count
                if user.profile:
                    current = int(user.profile.total_sessions or "0")
                    user.profile.total_sessions = str(current + 1)
                
                db.commit()
        
        return TopicResponse(**result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/practice", response_model=PracticeQuestionsResponse)
async def get_practice_questions(request: PracticeQuestionsRequest):
    """Generate practice questions for a topic"""
    try:
        result = await ai_service.generate_practice_questions(
            topic=request.topic,
            level=request.level,
            num_questions=request.num_questions
        )
        return PracticeQuestionsResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))