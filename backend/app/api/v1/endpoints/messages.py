from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user
from app.models.user import User
from app.models.message import Message
from app.models.channel import Channel
from app.schemas.message import MessageCreate, MessageUpdate, MessageResponse, ReactionUpdate
from app.services.websocket_manager import websocket_manager
from app.services.mongodb_logger import mongodb_logger

router = APIRouter()

# MongoDB Chat History Endpoints
@router.get("/history/{channel_id}")
async def get_chat_history(
    channel_id: int,
    limit: int = Query(50, ge=1, le=100),
    skip: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get chat history from MongoDB"""
    # Verify user has access to channel
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    # Get chat history from MongoDB
    chat_history = await mongodb_logger.get_chat_history(
        channel_id=channel_id,
        limit=limit,
        skip=skip
    )
    
    return chat_history

@router.get("/search")
async def search_chat_messages(
    search_term: str = Query(..., description="Search term"),
    channel_id: Optional[int] = Query(None, description="Filter by channel"),
    limit: int = Query(50, ge=1, le=100),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Search chat messages in MongoDB"""
    # If channel_id provided, verify access
    if channel_id:
        channel = db.query(Channel).filter(Channel.id == channel_id).first()
        if not channel:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Channel not found"
            )
    
    # Search messages in MongoDB
    results = await mongodb_logger.search_chat_messages(
        search_term=search_term,
        channel_id=channel_id,
        user_id=current_user.id,
        limit=limit
    )
    
    return results

@router.post("/", response_model=MessageResponse)
async def create_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new message"""
    # Verify channel exists and user has access
    channel = db.query(Channel).filter(Channel.id == message_data.channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    # Create message
    db_message = Message(
        content=message_data.content,
        message_type=message_data.message_type,
        attachments=message_data.attachments,
        user_id=current_user.id,
        channel_id=message_data.channel_id,
        thread_id=message_data.thread_id,
        reply_to_id=message_data.reply_to_id
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Store message in MongoDB for real-time chat history
    await mongodb_logger.store_chat_message(
        message_id=db_message.id,
        user_id=current_user.id,
        user_name=current_user.full_name,
        user_email=current_user.email,
        channel_id=message_data.channel_id,
        content=message_data.content,
        message_type=message_data.message_type,
        attachments=message_data.attachments,
        reactions={}
    )
    
    # Log user activity
    await mongodb_logger.log_user_activity(
        user_id=current_user.id,
        user_name=current_user.full_name,
        user_email=current_user.email,
        action="SEND_MESSAGE",
        details={
            "message_id": db_message.id,
            "channel_id": message_data.channel_id,
            "content_length": len(message_data.content),
            "message_type": message_data.message_type
        }
    )
    
    # Notify WebSocket clients
    await websocket_manager.broadcast_to_channel(
        channel_id=message_data.channel_id,
        message={
            "type": "new_message",
            "data": {
                "id": db_message.id,
                "content": db_message.content,
                "user_id": db_message.user_id,
                "channel_id": db_message.channel_id,
                "created_at": db_message.created_at.isoformat()
            }
        }
    )
    
    return db_message

@router.get("/channel/{channel_id}", response_model=List[MessageResponse])
async def get_channel_messages(
    channel_id: int,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get messages from a channel"""
    # Verify channel exists and user has access
    channel = db.query(Channel).filter(Channel.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    messages = db.query(Message).filter(
        Message.channel_id == channel_id,
        Message.is_deleted == False
    ).order_by(Message.created_at.desc()).offset(offset).limit(limit).all()
    
    return messages

@router.get("/{message_id}", response_model=MessageResponse)
async def get_message(
    message_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific message"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    return message

@router.put("/{message_id}", response_model=MessageResponse)
async def update_message(
    message_id: int,
    message_data: MessageUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a message"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    # Check if user owns the message
    if message.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to edit this message"
        )
    
    # Update message
    if message_data.content is not None:
        message.content = message_data.content
    if message_data.attachments is not None:
        message.attachments = message_data.attachments
    
    message.is_edited = True
    db.commit()
    db.refresh(message)
    
    # Notify WebSocket clients
    await websocket_manager.broadcast_to_channel(
        channel_id=message.channel_id,
        message={
            "type": "message_updated",
            "data": {
                "id": message.id,
                "content": message.content,
                "updated_at": message.updated_at.isoformat()
            }
        }
    )
    
    return message

@router.delete("/{message_id}")
async def delete_message(
    message_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a message (soft delete)"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    # Check if user owns the message or is admin
    if message.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this message"
        )
    
    # Soft delete
    message.is_deleted = True
    db.commit()
    
    # Notify WebSocket clients
    await websocket_manager.broadcast_to_channel(
        channel_id=message.channel_id,
        message={
            "type": "message_deleted",
            "data": {"id": message.id}
        }
    )
    
    return {"message": "Message deleted successfully"}

@router.post("/{message_id}/reactions")
async def add_reaction(
    message_id: int,
    reaction_data: ReactionUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Add or remove a reaction to a message"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    if message.reactions is None:
        message.reactions = {}
    
    emoji = reaction_data.emoji
    if reaction_data.action == "add":
        if emoji not in message.reactions:
            message.reactions[emoji] = []
        if current_user.id not in message.reactions[emoji]:
            message.reactions[emoji].append(current_user.id)
    elif reaction_data.action == "remove":
        if emoji in message.reactions and current_user.id in message.reactions[emoji]:
            message.reactions[emoji].remove(current_user.id)
            if not message.reactions[emoji]:
                del message.reactions[emoji]
    
    db.commit()
    db.refresh(message)
    
    # Notify WebSocket clients
    await websocket_manager.broadcast_to_channel(
        channel_id=message.channel_id,
        message={
            "type": "reaction_updated",
            "data": {
                "message_id": message.id,
                "reactions": message.reactions
            }
        }
    )
    
    return {"reactions": message.reactions}
