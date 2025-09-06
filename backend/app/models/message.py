from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    message_type = Column(String(50), default="text")  # text, file, image, video, audio
    is_edited = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    is_pinned = Column(Boolean, default=False)
    thread_id = Column(Integer, ForeignKey("messages.id"), nullable=True)  # For threaded replies
    reply_to_id = Column(Integer, ForeignKey("messages.id"), nullable=True)  # For direct replies
    
    # File attachments (stored as JSON)
    attachments = Column(JSON, nullable=True)
    
    # Reactions (stored as JSON: {"emoji": ["user_id1", "user_id2"]})
    reactions = Column(JSON, nullable=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    channel_id = Column(Integer, ForeignKey("channels.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="messages")
    channel = relationship("Channel", back_populates="messages")
    
    # Fixed relationships with explicit foreign_keys
    thread_messages = relationship(
        "Message", 
        foreign_keys=[thread_id],
        remote_side=[id], 
        backref="parent_thread"
    )
    reply_to = relationship(
        "Message", 
        foreign_keys=[reply_to_id],
        remote_side=[id], 
        backref="replies"
    )
    
    def __repr__(self):
        return f"<Message(id={self.id}, user_id={self.user_id}, channel_id={self.channel_id})>"
