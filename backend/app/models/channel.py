from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Channel(Base):
    __tablename__ = "channels"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    is_private = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    topic = Column(String(500), nullable=True)
    purpose = Column(Text, nullable=True)
    member_count = Column(Integer, default=0)
    
    # Foreign Keys
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="channels")
    creator = relationship("User", back_populates="created_channels")
    workspace = relationship("Workspace", back_populates="channels")
    messages = relationship("Message", back_populates="channel")
    
    def __repr__(self):
        return f"<Channel(id={self.id}, name='{self.name}', organization_id={self.organization_id})>"
