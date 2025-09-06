from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.notification import NotificationType, NotificationStatus

class NotificationResponse(BaseModel):
    id: int
    type: NotificationType
    title: str
    message: Optional[str] = None
    status: NotificationStatus
    issue_id: Optional[int] = None
    project_id: Optional[int] = None
    created_at: datetime
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True
