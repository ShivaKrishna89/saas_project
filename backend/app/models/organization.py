from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    logo_url = Column(String(500), nullable=True)
    domain = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    plan_type = Column(String(50), default="free")  # free, pro, enterprise
    max_members = Column(Integer, default=10)
    settings = Column(Text, nullable=True)  # JSON string for flexible settings
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    members = relationship("Member", back_populates="organization")
    channels = relationship("Channel", back_populates="organization")
    workspaces = relationship("Workspace", back_populates="organization")
    
    def __repr__(self):
        return f"<Organization(id={self.id}, name='{self.name}', slug='{self.slug}')>"
