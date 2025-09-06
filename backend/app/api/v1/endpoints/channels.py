from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models.user import User
from app.models.channel import Channel
from app.models.organization import Organization
from app.schemas.channel import ChannelCreate, ChannelUpdate, ChannelResponse

router = APIRouter()

@router.post("/", response_model=ChannelResponse)
async def create_channel(
    channel_data: ChannelCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new channel"""
    # Verify organization exists
    organization = db.query(Organization).filter(Organization.id == channel_data.organization_id).first()
    if not organization:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found"
        )
    
    # Create channel
    db_channel = Channel(
        name=channel_data.name,
        description=channel_data.description,
        is_private=channel_data.is_private,
        topic=channel_data.topic,
        purpose=channel_data.purpose,
        organization_id=channel_data.organization_id,
        creator_id=current_user.id,
        workspace_id=channel_data.workspace_id
    )
    
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    
    return db_channel

@router.get("/", response_model=List[ChannelResponse])
async def get_channels(
    organization_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get channels for an organization"""
    channels = db.query(Channel).filter(
        Channel.organization_id == organization_id,
        Channel.is_archived == False
    ).all()
    
    return channels

@router.get("/{channel_id}", response_model=ChannelResponse)
async def get_channel(
    channel_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific channel"""
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    return channel

@router.put("/{channel_id}", response_model=ChannelResponse)
async def update_channel(
    channel_id: int,
    channel_data: ChannelUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a channel"""
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    # Check if user is creator or admin
    if channel.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to edit this channel"
        )
    
    # Update channel fields
    for field, value in channel_data.dict(exclude_unset=True).items():
        setattr(channel, field, value)
    
    db.commit()
    db.refresh(channel)
    
    return channel

@router.delete("/{channel_id}")
async def delete_channel(
    channel_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Archive a channel (soft delete)"""
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    # Check if user is creator or admin
    if channel.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this channel"
        )
    
    # Archive channel
    channel.is_archived = True
    db.commit()
    
    return {"message": "Channel archived successfully"}
