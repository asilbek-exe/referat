"""
Pydantic schemas for Resource model
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.resource import ResourceCategory


class ResourceBase(BaseModel):
    title: str
    url: str
    description: Optional[str] = None
    category: ResourceCategory = ResourceCategory.OTHER


class ResourceCreate(ResourceBase):
    pass


class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ResourceCategory] = None


class ResourceResponse(ResourceBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class Resource(ResourceResponse):
    pass

