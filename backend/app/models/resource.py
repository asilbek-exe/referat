"""
Resource model for language learning resources
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
import enum
from app.core.database import Base


class ResourceCategory(str, enum.Enum):
    DICTIONARY = "dictionary"
    GRAMMAR = "grammar"
    EXCHANGE = "exchange"
    OTHER = "other"


class Resource(Base):
    __tablename__ = "resources"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    url = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(Enum(ResourceCategory), default=ResourceCategory.OTHER, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

