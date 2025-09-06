from pydantic import BaseModel, Field
from typing import Optional, Dict, List, Any
from datetime import datetime

class MessageBase(BaseModel):
    content: str = Field(..., min_length=1)
    message_type: str = "text"
    attachments: Optional[Dict[str, Any]] = None

class MessageCreate(MessageBase):
    channel_id: int
    thread_id: Optional[int] = None
    reply_to_id: Optional[int] = None

class MessageUpdate(BaseModel):
    content: Optional[str] = Field(None, min_length=1)
    attachments: Optional[Dict[str, Any]] = None

class MessageResponse(MessageBase):
    id: int
    user_id: int
    channel_id: int
    thread_id: Optional[int] = None
    reply_to_id: Optional[int] = None
    is_edited: bool
    is_deleted: bool
    is_pinned: bool
    reactions: Optional[Dict[str, List[int]]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class MessageWithUser(MessageResponse):
    user: "UserResponse"
    reply_to: Optional["MessageResponse"] = None
    thread_messages: List["MessageResponse"] = []

class ReactionUpdate(BaseModel):
    emoji: str
    action: str  # "add" or "remove"
