from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import Dict
import json
from ..database import get_db
from ..models.user import User
from ..models.quiz import QuizSession, QuizQuestion
from ..schemas.quiz import (
    QuizGenerateRequest,
    QuizAnswerSubmission,
    QuizSessionResponse,
    QuizQuestionResponse,
    QuizResultsResponse,
    QuizQuestionResult
)
from ..services.ai_service import ai_service

router = APIRouter(
    prefix="/api/quiz",
    tags=["Quiz"]
)

@router.post("/generate", response_model=QuizSessionResponse)
async def generate_quiz(
    request: QuizGenerateRequest,
    db: Session = Depends(get_db)
):
    """  
    Generate a new quiz for a topic.
    
    The AI creates questions based on student's level.
    Questions are saved to database but correct answers are hidden from response.
    """
    
    # Find user
    user = db.query(User).filter(User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        # Generate questions using AI
        questions_data = await ai_service.generate_quiz(
            topic=request.topic,
            level=request.level,
            num_questions=request.num_questions
        )
        
        # Create quiz session
        quiz_session = QuizSession(
            user_id=user.id,
            topic=request.topic,
            level=request.level,
            total_questions=len(questions_data)
        )
        db.add(quiz_session)
        db.flush()  # Get the ID
        
        # Save questions to database
        for q_data in questions_data:
            question = QuizQuestion(
                quiz_session_id=quiz_session.id,
                question_number=q_data["question_number"],
                question_text=q_data["question_text"],
                options=json.dumps(q_data["options"]),  # Store as JSON string
                correct_answer=q_data["correct_answer"],
                difficulty=q_data.get("difficulty", "medium"),
                concept=q_data.get("concept", request.topic),
                explanation=q_data.get("explanation", "")
            )
            db.add(question)
        
        db.commit()
        db.refresh(quiz_session)
        
        # Get questions without correct answers for response
        questions_for_response = []
        for q in quiz_session.questions:
            questions_for_response.append(
                QuizQuestionResponse(
                    id=q.id,
                    question_number=q.question_number,
                    question_text=q.question_text,
                    options=json.loads(q.options),
                    difficulty=q.difficulty
                )
            )
        
        return QuizSessionResponse(
            id=quiz_session.id,
            topic=quiz_session.topic,
            level=quiz_session.level,
            total_questions=quiz_session.total_questions,
            questions=sorted(questions_for_response, key=lambda x: x.question_number),
            started_at=quiz_session.started_at
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate quiz: {str(e)}"
        )

@router.post("/submit", response_model=QuizResultsResponse)
async def submit_quiz(
    submission: QuizAnswerSubmission,
    db: Session = Depends(get_db)
):
    """
    Submit quiz answers and calculate score.
    
    Returns detailed results with correct answers and explanations.
    """
    
    # Get quiz session
    quiz = db.query(QuizSession).filter(
        QuizSession.id == submission.quiz_session_id
    ).first()
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    if quiz.completed:
        raise HTTPException(status_code=400, detail="Quiz already submitted")
    
    # Get all questions
    questions = db.query(QuizQuestion).filter(
        QuizQuestion.quiz_session_id == quiz.id
    ).order_by(QuizQuestion.question_number).all()
    
    # Grade the quiz
    correct_count = 0
    easy_correct = 0
    easy_total = 0
    medium_correct = 0
    medium_total = 0
    hard_correct = 0
    hard_total = 0
    
    question_results = []
    
    for question in questions:
        # Frontend sends answers as {0: "B", 1: "A", 2: "C"}
        # question_number is 1-based, so subtract 1 to match frontend's 0-based index
        question_index = str(question.question_number - 1)
        user_answer = submission.answers.get(question_index)
        
        is_correct = user_answer == question.correct_answer
        
        # Update question with user's answer
        question.user_answer = user_answer
        question.is_correct = is_correct
        
        if is_correct:
            correct_count += 1
        
        # Track by difficulty
        if question.difficulty == "easy":
            easy_total += 1
            if is_correct:
                easy_correct += 1
        elif question.difficulty == "medium":
            medium_total += 1
            if is_correct:
                medium_correct += 1
        elif question.difficulty == "hard":
            hard_total += 1
            if is_correct:
                hard_correct += 1
        
        # Build result for this question
        question_results.append(
            QuizQuestionResult(
                question_number=question.question_number,
                question_text=question.question_text,
                options=json.loads(question.options),
                user_answer=user_answer,
                correct_answer=question.correct_answer,
                is_correct=is_correct,
                explanation=question.explanation,
                difficulty=question.difficulty
            )
        )
    
    # Calculate score
    score = (correct_count / len(questions)) * 100 if len(questions) > 0 else 0
    passed = score >= 60
    
    # Update quiz session
    quiz.correct_answers = correct_count
    quiz.score = score
    quiz.time_taken = submission.time_taken
    quiz.completed = True
    quiz.completed_at = func.now()
    
    db.commit()
    
    # Generate feedback
    if score >= 90:
        feedback = "🌟 Excellent! You have a strong understanding of this topic!"
    elif score >= 70:
        feedback = "👍 Good job! You're on the right track. Review the incorrect answers to improve."
    elif score >= 60:
        feedback = "✅ You passed! But there's room for improvement. Practice more on the concepts you missed."
    else:
        feedback = "📚 Keep practicing! Review the explanations and try studying this topic again."
    
    return QuizResultsResponse(
        quiz_id=quiz.id,
        topic=quiz.topic,
        total_questions=len(questions),
        correct_answers=correct_count,
        score=score,
        time_taken=submission.time_taken,
        passed=passed,
        questions=question_results,
        easy_correct=easy_correct,
        easy_total=easy_total,
        medium_correct=medium_correct,
        medium_total=medium_total,
        hard_correct=hard_correct,
        hard_total=hard_total,
        feedback=feedback
    )

@router.get("/{username}/history")
async def get_quiz_history(
    username: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get user's quiz history"""
    
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    quizzes = db.query(QuizSession).filter(
        QuizSession.user_id == user.id,
        QuizSession.completed == True
    ).order_by(
        QuizSession.completed_at.desc()
    ).limit(limit).all()
    
    return {
        "quizzes": [{
            "id": str(q.id),
            "topic": q.topic,
            "score": q.score,
            "correct_answers": q.correct_answers,
            "total_questions": q.total_questions,
            "time_taken": q.time_taken,
            "completed_at": q.completed_at,
            "questions": [
                {
                    "question_text": qq.question_text,
                    "user_answer": qq.user_answer,
                    "correct_answer": qq.correct_answer,
                    "is_correct": qq.is_correct,
                    "difficulty": qq.difficulty,
                    "explanation": qq.explanation,
                    "options": json.loads(qq.options)
                }
                for qq in q.questions
            ]
        } for q in quizzes]
    }