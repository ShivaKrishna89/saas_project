from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base
import enum


class WorkType(str, enum.Enum):
    FEATURE = "feature"
    TASK = "task"
    BUG = "bug"


class TaskStatus(str, enum.Enum):
    TODO = "todo"
    INPROGRESS = "inprogress"
    DONE = "done"


class Priority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project = Column(String(255), nullable=False, index=True)
    work_type = Column(Enum(WorkType), nullable=False, default=WorkType.FEATURE)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.TODO)
    summary = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(Enum(Priority), nullable=False, default=Priority.MEDIUM)
    assignee = Column(String(255), nullable=True)
    reporter = Column(String(255), nullable=False)
    # User-centric ownership
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
