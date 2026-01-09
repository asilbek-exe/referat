"""
Main FastAPI application entry point
Language Learning & Student Motivation Platform
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title="Language Learning Platform",
    description="Platform for developing student motivation for independent learning",
    version="1.0.0"
)

# CORS middleware for frontend communication
# WARNING: This allows all origins - only for local development!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Language Learning Platform API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

