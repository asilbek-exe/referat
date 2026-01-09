"""
Submission endpoints
"""
import os
from pathlib import Path
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.core.dependencies import get_current_active_user, get_current_admin_user
from app.models.user import User
from app.models.task import Task
from app.models.submission import Submission
from app.schemas.submission import SubmissionResponse
from datetime import datetime

router = APIRouter()

# Ensure upload directory exists (use absolute path)
UPLOAD_DIR = Path(settings.UPLOAD_DIR).resolve()
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/tasks/{task_id}/submit", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_task(
    task_id: int,
    file: UploadFile = File(None),
    text_content: str = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Submit a task (students can submit their work)"""
    # Verify task exists
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Check deadline if set
    if task.deadline and datetime.utcnow() > task.deadline:
        raise HTTPException(status_code=400, detail="Task deadline has passed")
    
    file_path = None
    file_name = None
    
    # Handle file upload
    if file:
        # Validate file size
        file_content = file.file.read()
        if len(file_content) > settings.MAX_UPLOAD_SIZE:
            raise HTTPException(status_code=400, detail="File too large")
        
        # Save file
        file_extension = os.path.splitext(file.filename)[1] if file.filename else ".pdf"
        file_name = f"{current_user.id}_{task_id}_{datetime.utcnow().timestamp()}{file_extension}"
        file_path = str(UPLOAD_DIR / file_name)
        
        with open(file_path, "wb") as f:
            f.write(file_content)
    
    # Create submission
    db_submission = Submission(
        user_id=current_user.id,
        task_id=task_id,
        file_path=file_path,
        file_name=file.filename if file else None,
        text_content=text_content
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    
    return db_submission


@router.get("/me", response_model=List[SubmissionResponse])
def get_my_submissions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get current user's submissions"""
    submissions = db.query(Submission).filter(Submission.user_id == current_user.id).all()
    return submissions


@router.get("/all", response_model=List[SubmissionResponse])
def get_all_submissions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all submissions (admin only)"""
    submissions = db.query(Submission).offset(skip).limit(limit).all()
    return submissions

