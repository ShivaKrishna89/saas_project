from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskRead
from app.models.project import Project
from app.models.user import User
from app.core.security import get_current_user

router = APIRouter()


@router.post("/", response_model=TaskRead, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Create a new task"""
    payload = task.dict()
    payload["user_id"] = current_user.id
    # If project_id provided, validate it belongs to user
    if payload.get("project_id"):
        project = db.query(Project).filter(Project.id == payload["project_id"]).first()
        if not project or project.creator_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized for this project")
        payload["project"] = project.title
    db_task = Task(**payload)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a task by ID"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    """Update a task"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update only provided fields
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    db.commit()
    db.refresh(task)
    return task


@router.get("/", response_model=List[TaskRead])
def list_tasks(
    project: Optional[str] = Query(None, description="Filter by project"),
    status: Optional[str] = Query(None, description="Filter by status"),
    work_type: Optional[str] = Query(None, description="Filter by work type"),
    limit: int = Query(100, ge=1, le=1000, description="Number of tasks to return"),
    offset: int = Query(0, ge=0, description="Number of tasks to skip"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List tasks with optional filtering"""
    query = db.query(Task).filter(Task.user_id == current_user.id)
    
    if project:
        query = query.filter(Task.project.ilike(f"%{project}%"))
    if status:
        query = query.filter(Task.status == status)
    if work_type:
        query = query.filter(Task.work_type == work_type)
    
    tasks = query.offset(offset).limit(limit).all()
    return tasks


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return None
