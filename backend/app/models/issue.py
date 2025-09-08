from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class IssueStatus(str, enum.Enum):
	TODO = "TODO"
	IN_PROGRESS = "IN_PROGRESS"
	DONE = "DONE"

class IssuePriority(str, enum.Enum):
	LOW = "LOW"
	MEDIUM = "MEDIUM"
	HIGH = "HIGH"

class Issue(Base):
	__tablename__ = "issues"
	
	id = Column(Integer, primary_key=True, index=True)
	title = Column(String(255), nullable=False)
	description = Column(Text, nullable=True)
	status = Column(Enum(IssueStatus), default=IssueStatus.TODO)
	priority = Column(Enum(IssuePriority), default=IssuePriority.MEDIUM)
	project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
	assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
	reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	created_at = Column(DateTime(timezone=True), server_default=func.now())
	updated_at = Column(DateTime(timezone=True), onupdate=func.now())
	
	# Relationships
	project = relationship("Project", back_populates="issues")
	assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_issues")
	reporter = relationship("User", foreign_keys=[reporter_id], back_populates="created_issues")
	
	def __repr__(self):
		return f"<Issue(id={self.id}, title='{self.title}', status='{self.status}', priority='{self.priority}')>"
