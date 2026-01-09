"""
Progress model for tracking student progress on tasks
"""
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Progress(Base):
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False, index=True)
    progress_value = Column(Integer, default=0, nullable=False)  # 0-100
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Ensure one progress record per user-task combination
    __table_args__ = (UniqueConstraint('user_id', 'task_id', name='_user_task_uc'),)
    
    # Relationships
    user = relationship("User", back_populates="progress_records")
    task = relationship("Task", back_populates="progress_records")

