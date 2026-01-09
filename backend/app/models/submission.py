"""
Submission model for student task submissions
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Submission(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False, index=True)
    file_path = Column(String, nullable=True)  # Path to uploaded file
    file_name = Column(String, nullable=True)  # Original filename
    text_content = Column(Text, nullable=True)  # Optional text submission
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="submissions")
    task = relationship("Task", back_populates="submissions")

