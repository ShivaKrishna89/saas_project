from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class WorkspaceRole(str, enum.Enum):
	ADMIN = "ADMIN"
	MEMBER = "MEMBER"
	VIEWER = "VIEWER"

class WorkspaceMember(Base):
	__tablename__ = "workspace_members"
	
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	workspace_id = Column(Integer, ForeignKey("workspaces.id"), nullable=False)
	role = Column(Enum(WorkspaceRole), default=WorkspaceRole.MEMBER)
	is_active = Column(Boolean, default=True)
	joined_at = Column(DateTime(timezone=True), server_default=func.now())
	updated_at = Column(DateTime(timezone=True), onupdate=func.now())
	
	# Relationships
	user = relationship("User", back_populates="workspace_memberships")
	workspace = relationship("Workspace", back_populates="members")
	
	def __repr__(self):
		return f"<WorkspaceMember(user_id={self.user_id}, workspace_id={self.workspace_id}, role='{self.role}')>"
