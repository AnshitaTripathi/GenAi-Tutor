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
    db: Session = Depends(get_db)
):
    """
    Get AI explanation and save to learning history.
    Username is read from the request body so sessions are always saved.
    """
    try:
        result = await ai_service.explain_topic(
            topic=request.topic,
            level=request.level,
            learning_style=request.learning_style
        )

        # ── FIX: username now comes from request body (not query param)
        if request.username:
            user = db.query(User).filter(
                User.username == request.username
            ).first()

            if user:
                # Save learning session to DB
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

                # Increment total_sessions on the profile
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
