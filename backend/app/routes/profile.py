from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.user import User
from ..models.profile import StudentProfile
from ..models.session import LearningSession
from ..schemas.profile import (
    ProfileCreate,
    ProfileUpdate,
    UserResponse,
    ProfileResponse,
    FullProfileResponse,
    LearningSessionResponse
)

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)

@router.post("/create", response_model=FullProfileResponse)
def create_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db)   # Inject database session
):
    """
    Create a new user profile.
    
    This is called when a student signs up for the first time.
    Creates both a User AND a StudentProfile in one step.
    """
    
    # Check if username already exists
    existing_user = db.query(User).filter(
        User.username == profile_data.username
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=f"Username '{profile_data.username}' is already taken!"
        )
    
    # Check if email already exists
    existing_email = db.query(User).filter(
        User.email == profile_data.email
    ).first()
    
    if existing_email:
        raise HTTPException(
            status_code=400,
            detail=f"Email '{profile_data.email}' is already registered!"
        )
    
    # Create new User
    new_user = User(
        username=profile_data.username,
        email=profile_data.email
    )
    db.add(new_user)
    db.flush()              # Get the ID without committing
    
    # Create Student Profile linked to user
    new_profile = StudentProfile(
        user_id=new_user.id,
        proficiency_level=profile_data.proficiency_level,
        learning_style=profile_data.learning_style,
        preferred_topics=profile_data.preferred_topics or [],
        total_sessions="0"
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_user)
    db.refresh(new_profile)
    
    return FullProfileResponse(
        user=UserResponse.model_validate(new_user),
        profile=ProfileResponse.model_validate(new_profile),
        recent_sessions=[],
        total_topics_studied=0
    )

@router.get("/{username}", response_model=FullProfileResponse)
def get_profile(
    username: str,
    db: Session = Depends(get_db)
):
    """
    Get a student's complete profile by username.
    
    Returns user info, profile settings, and learning history.
    """
    
    # Find user
    user = db.query(User).filter(
        User.username == username
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"User '{username}' not found!"
        )
    
    # Get profile
    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == user.id
    ).first()
    
    # Get last 5 learning sessions
    sessions = db.query(LearningSession).filter(
        LearningSession.user_id == user.id
    ).order_by(
        LearningSession.created_at.desc()
    ).limit(5).all()
    
    # Count total unique topics
    total_topics = db.query(LearningSession).filter(
        LearningSession.user_id == user.id
    ).count()
    
    return FullProfileResponse(
        user=UserResponse.model_validate(user),
        profile=ProfileResponse.model_validate(profile),
        recent_sessions=[
            LearningSessionResponse.model_validate(s) for s in sessions
        ],
        total_topics_studied=total_topics
    )

@router.put("/{username}/update", response_model=ProfileResponse)
def update_profile(
    username: str,
    update_data: ProfileUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a student's profile settings.
    
    Used when a student wants to change their level or learning style.
    """
    
    # Find user
    user = db.query(User).filter(
        User.username == username
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"User '{username}' not found!"
        )
    
    # Get their profile
    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == user.id
    ).first()
    
    # Update only the fields that were provided
    if update_data.proficiency_level is not None:
        profile.proficiency_level = update_data.proficiency_level
    
    if update_data.learning_style is not None:
        profile.learning_style = update_data.learning_style
    
    if update_data.preferred_topics is not None:
        profile.preferred_topics = update_data.preferred_topics
    
    db.commit()
    db.refresh(profile)
    
    return ProfileResponse.model_validate(profile)

@router.get("/{username}/history", response_model=List[LearningSessionResponse])
def get_learning_history(
    username: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get a student's full learning history.
    
    Returns all topics they've studied, most recent first.
    """
    
    # Find user
    user = db.query(User).filter(
        User.username == username
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"User '{username}' not found!"
        )
    
    # Get sessions
    sessions = db.query(LearningSession).filter(
        LearningSession.user_id == user.id
    ).order_by(
        LearningSession.created_at.desc()
    ).limit(limit).all()
    
    return [LearningSessionResponse.model_validate(s) for s in sessions]