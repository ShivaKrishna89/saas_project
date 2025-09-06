from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class OrganizationBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    domain: Optional[str] = None

class OrganizationUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    logo_url: Optional[str] = None
    domain: Optional[str] = None
    settings: Optional[str] = None

class OrganizationResponse(OrganizationBase):
    id: int
    logo_url: Optional[str] = None
    domain: Optional[str] = None
    is_active: bool
    plan_type: str
    max_members: int
    settings: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
