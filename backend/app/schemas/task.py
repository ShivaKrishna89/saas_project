from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from app.models.task import WorkType, TaskStatus, Priority


class TaskBase(BaseModel):
    project: str = Field(..., min_length=1, max_length=255, description="Project name")
    work_type: WorkType = Field(default=WorkType.FEATURE, description="Type of work")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Task status")
    summary: str = Field(..., min_length=1, max_length=500, description="Task summary")
    description: Optional[str] = Field(None, description="Detailed description")
    priority: Priority = Field(default=Priority.MEDIUM, description="Task priority")
    assignee: Optional[str] = Field(None, max_length=255, description="Assigned person")
    reporter: str = Field(..., min_length=1, max_length=255, description="Reporter name")
    user_id: Optional[int] = Field(None, description="Owner user id")
    project_id: Optional[int] = Field(None, description="Related project id")

    @validator('project', 'summary', 'reporter')
    def validate_required_strings(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

    @validator('assignee')
    def validate_assignee(cls, v):
        if v is not None and not v.strip():
            return None
        return v.strip() if v else None

    @validator('description')
    def validate_description(cls, v):
        if v is not None and not v.strip():
            return None
        return v.strip() if v else None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    project: Optional[str] = Field(None, min_length=1, max_length=255)
    work_type: Optional[WorkType] = None
    status: Optional[TaskStatus] = None
    summary: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    priority: Optional[Priority] = None
    assignee: Optional[str] = Field(None, max_length=255)
    reporter: Optional[str] = Field(None, min_length=1, max_length=255)

    @validator('project', 'summary', 'reporter')
    def validate_required_strings(cls, v):
        if v is not None and (not v or not v.strip()):
            raise ValueError('Field cannot be empty')
        return v.strip() if v else None

    @validator('assignee')
    def validate_assignee(cls, v):
        if v is not None and not v.strip():
            return None
        return v.strip() if v else None

    @validator('description')
    def validate_description(cls, v):
        if v is not None and not v.strip():
            return None
        return v.strip() if v else None


class TaskRead(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

