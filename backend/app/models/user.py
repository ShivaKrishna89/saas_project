from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class UserRole(str, enum.Enum):
	ADMIN = "ADMIN"
	MEMBER = "MEMBER"

class User(Base):
	__tablename__ = "users"
	
	id = Column(Integer, primary_key=True, index=True)
	email = Column(String(255), unique=True, index=True, nullable=False)
	username = Column(String(100), unique=True, index=True, nullable=False)
	full_name = Column(String(255), nullable=False)
	hashed_password = Column(String(255), nullable=False)
	role = Column(Enum(UserRole), default=UserRole.MEMBER)
	is_active = Column(Boolean, default=True)
	is_verified = Column(Boolean, default=False)
	avatar_url = Column(String(500), nullable=True)
	timezone = Column(String(50), default="UTC")
	language = Column(String(10), default="en")
	last_seen = Column(DateTime(timezone=True), server_default=func.now())
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	updated_at = Column(DateTime(timezone=True), onupdate=func.now())
	
	# Relationships
	workspace_memberships = relationship("WorkspaceMember", back_populates="user")
	organizations = relationship("Member", back_populates="user")
	created_issues = relationship("Issue", back_populates="reporter", foreign_keys="Issue.reporter_id")
	assigned_issues = relationship("Issue", back_populates="assignee", foreign_keys="Issue.assignee_id")
	created_projects = relationship("Project", back_populates="creator")
	created_channels = relationship("Channel", back_populates="creator")
	messages = relationship("Message", back_populates="user")
	
	def __repr__(self):
		return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>"
