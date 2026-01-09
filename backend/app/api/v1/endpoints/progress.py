"""
Progress tracking endpoints
"""
from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_active_user, get_current_admin_user
from app.models.user import User
from app.models.task import Task
from app.models.progress import Progress
from app.schemas.progress import ProgressResponse, ProgressUpdate

router = APIRouter()


@router.get("/me", response_model=List[ProgressResponse])
def get_my_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get current user's progress on all tasks"""
    progress_records = db.query(Progress).filter(Progress.user_id == current_user.id).all()
    return progress_records


@router.get("/me/overall", response_model=Dict)
def get_overall_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get overall progress percentage for current user"""
    # Get all tasks
    all_tasks = db.query(Task).all()
    if not all_tasks:
        return {"overall_progress": 0, "total_tasks": 0, "completed_tasks": 0}
    
    # Get user's progress records
    progress_records = db.query(Progress).filter(Progress.user_id == current_user.id).all()
    progress_dict = {p.task_id: p.progress_value for p in progress_records}
    
    # Calculate overall progress
    total_progress = sum(progress_dict.get(task.id, 0) for task in all_tasks)
    max_possible = sum(task.max_progress for task in all_tasks)
    
    overall_progress = (total_progress / max_possible * 100) if max_possible > 0 else 0
    completed_tasks = sum(1 for task in all_tasks if progress_dict.get(task.id, 0) >= task.max_progress)
    
    return {
        "overall_progress": round(overall_progress, 2),
        "total_tasks": len(all_tasks),
        "completed_tasks": completed_tasks
    }


@router.put("/{user_id}/{task_id}", response_model=ProgressResponse)
def update_progress(
    user_id: int,
    task_id: int,
    progress_data: ProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update user progress on a task (admin only)"""
    # Verify task exists
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate progress value
    if progress_data.progress_value < 0 or progress_data.progress_value > task.max_progress:
        raise HTTPException(
            status_code=400,
            detail=f"Progress must be between 0 and {task.max_progress}"
        )
    
    # Get or create progress record
    progress_record = db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.task_id == task_id
    ).first()
    
    if progress_record:
        progress_record.progress_value = progress_data.progress_value
    else:
        progress_record = Progress(
            user_id=user_id,
            task_id=task_id,
            progress_value=progress_data.progress_value
        )
        db.add(progress_record)
    
    db.commit()
    db.refresh(progress_record)
    return progress_record

