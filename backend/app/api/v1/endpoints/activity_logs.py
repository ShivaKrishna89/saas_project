from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user, get_current_user
from app.models.user import User
from app.services.mongodb_logger import mongodb_logger

router = APIRouter()

@router.get("/user-activity")
async def get_user_activity_logs(
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get user activity logs from MongoDB"""
    # If user_id is provided, verify it's the current user or admin
    if user_id and user_id != current_user.id and current_user.role != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own activity logs"
        )
    
    # Use current user ID if not specified
    target_user_id = user_id or current_user.id
    
    # Get activity logs from MongoDB
    activity_logs = await mongodb_logger.get_user_activity_logs(
        user_id=target_user_id,
        limit=limit,
        skip=skip
    )
    
    return {
        "user_id": target_user_id,
        "logs": activity_logs,
        "total": len(activity_logs)
    }

@router.get("/application-logs")
async def get_application_logs(
    event_type: Optional[str] = Query(None, description="Filter by event type"),
    severity: Optional[str] = Query(None, description="Filter by severity"),
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get application logs from MongoDB (Admin only)"""
    # Only admins can view application logs
    if current_user.role != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators can view application logs"
        )
    
    # Get application logs from MongoDB
    # Note: You might want to implement filtering by event_type and severity
    # For now, we'll get all logs
    logs = await mongodb_logger.get_user_activity_logs(
        user_id=None,  # Get all users
        limit=limit,
        skip=skip
    )
    
    return {
        "logs": logs,
        "total": len(logs),
        "filters": {
            "event_type": event_type,
            "severity": severity
        }
    }

@router.get("/my-activity")
async def get_my_activity_logs(
    limit: int = Query(50, ge=1, le=200),
    skip: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get current user's activity logs"""
    # Get current user's activity logs
    activity_logs = await mongodb_logger.get_user_activity_logs(
        user_id=current_user.id,
        limit=limit,
        skip=skip
    )
    
    return {
        "user_id": current_user.id,
        "user_name": current_user.full_name,
        "user_email": current_user.email,
        "logs": activity_logs,
        "total": len(activity_logs)
    }
