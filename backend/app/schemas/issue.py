from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.issue import IssueStatus, IssuePriority

class IssueBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: IssueStatus = IssueStatus.TODO
    priority: IssuePriority = IssuePriority.MEDIUM

class IssueCreate(IssueBase):
    project_id: int
    assignee_id: Optional[int] = None

class IssueUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[IssueStatus] = None
    priority: Optional[IssuePriority] = None
    assignee_id: Optional[int] = None

class IssueResponse(IssueBase):
    id: int
    project_id: int
    assignee_id: Optional[int] = None
    reporter_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class IssueWithDetails(IssueResponse):
    project_key: str
    project_title: str
    assignee_name: Optional[str] = None
    reporter_name: str

class IssueStatusUpdate(BaseModel):
    status: IssueStatus
