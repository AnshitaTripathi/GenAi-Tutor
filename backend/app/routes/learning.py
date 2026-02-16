from fastapi import APIRouter, HTTPException
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
    """
    Get a personalized AI-generated greeting.
    
    This uses FREE Groq API (Llama 3.1 70B)
    - Cost: $0.00
    - Speed: 1-2 seconds
    """
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
        raise HTTPException(
            status_code=500,
            detail=f"Error generating greeting: {str(e)}"
        )

@router.post("/explain", response_model=TopicResponse)
async def explain_topic(request: TopicRequest):
    """
    Get AI-powered explanation of any topic.
    
    Adapts to student level:
    - Beginner: Simple language, analogies
    - Intermediate: Technical details
    - Advanced: Deep concepts, edge cases
    
    FREE API - No limits for reasonable use!
    """
    try:
        result = await ai_service.explain_topic(
            topic=request.topic,
            level=request.level,
            learning_style=request.learning_style
        )
        
        return TopicResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error explaining topic: {str(e)}"
        )

@router.post("/practice", response_model=PracticeQuestionsResponse)
async def get_practice_questions(request: PracticeQuestionsRequest):
    """
    Generate practice questions for a topic.
    
    Returns questions with hints to help learning.
    """
    try:
        result = await ai_service.generate_practice_questions(
            topic=request.topic,
            level=request.level,
            num_questions=request.num_questions
        )
        
        return PracticeQuestionsResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating questions: {str(e)}"
        )