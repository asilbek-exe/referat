"""
Main API router that includes all endpoint routers
"""
from fastapi import APIRouter
from app.api.v1.endpoints import auth, tasks, submissions, progress, resources

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(submissions.router, prefix="/submissions", tags=["submissions"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])

