from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.workspace_member import WorkspaceRole

class WorkspaceMemberBase(BaseModel):
    role: WorkspaceRole = WorkspaceRole.MEMBER

class WorkspaceMemberCreate(WorkspaceMemberBase):
    user_id: int
    workspace_id: int

class WorkspaceMemberUpdate(BaseModel):
    role: Optional[WorkspaceRole] = None
    is_active: Optional[bool] = None

class WorkspaceMemberResponse(WorkspaceMemberBase):
    id: int
    user_id: int
    workspace_id: int
    is_active: bool
    joined_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class WorkspaceMemberWithUser(WorkspaceMemberResponse):
    user_email: str
    user_username: str
    user_full_name: str
    user_avatar_url: Optional[str] = None
