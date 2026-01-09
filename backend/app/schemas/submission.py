"""
Pydantic schemas for Submission model
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SubmissionBase(BaseModel):
    task_id: int
    text_content: Optional[str] = None


class SubmissionCreate(SubmissionBase):
    pass


class SubmissionResponse(BaseModel):
    id: int
    user_id: int
    task_id: int
    file_path: Optional[str] = None
    file_name: Optional[str] = None
    text_content: Optional[str] = None
    submitted_at: datetime
    
    class Config:
        from_attributes = True


class Submission(SubmissionResponse):
    pass

