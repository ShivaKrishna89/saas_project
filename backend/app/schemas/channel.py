from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ChannelBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    is_private: bool = False
    topic: Optional[str] = Field(None, max_length=500)
    purpose: Optional[str] = None

class ChannelCreate(ChannelBase):
    organization_id: int
    workspace_id: Optional[int] = None

class ChannelUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    topic: Optional[str] = Field(None, max_length=500)
    purpose: Optional[str] = None
    is_archived: Optional[bool] = None

class ChannelResponse(ChannelBase):
    id: int
    organization_id: int
    creator_id: int
    workspace_id: Optional[int] = None
    is_archived: bool
    member_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
