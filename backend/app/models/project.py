from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    key = Column(String(10), nullable=False, unique=True)  # Short project key like "PROJ"
    is_active = Column(Boolean, default=True)
    
    # Foreign Keys
    workspace_id = Column(Integer, ForeignKey("workspaces.id"), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    workspace = relationship("Workspace", back_populates="projects")
    creator = relationship("User", back_populates="created_projects")
    issues = relationship("Issue", back_populates="project")
    
    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}', key='{self.key}')>"
