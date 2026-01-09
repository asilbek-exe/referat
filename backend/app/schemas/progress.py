"""
Pydantic schemas for Progress model
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProgressBase(BaseModel):
    task_id: int
    progress_value: int = 0


class ProgressCreate(ProgressBase):
    pass


class ProgressUpdate(BaseModel):
    progress_value: int


class ProgressResponse(BaseModel):
    id: int
    user_id: int
    task_id: int
    progress_value: int
    updated_at: datetime
    
    class Config:
        from_attributes = True


class Progress(ProgressResponse):
    pass

