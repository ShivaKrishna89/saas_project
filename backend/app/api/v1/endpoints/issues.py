from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.project import Project
from app.models.workspace_member import WorkspaceMember, WorkspaceRole
from app.models.issue import Issue, IssueStatus, IssuePriority
from app.models.notification import Notification, NotificationType
from app.schemas.issue import (
    IssueCreate, 
    IssueUpdate, 
    IssueResponse, 
    IssueWithDetails,
    IssueStatusUpdate
)

router = APIRouter()

@router.post("/", response_model=IssueResponse)
def create_issue(
    issue_data: IssueCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new issue"""
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == issue_data.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Create new issue
    new_issue = Issue(
        **issue_data.dict(),
        reporter_id=current_user.id
    )
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)
    
    # Create notification if issue is assigned
    if issue_data.assignee_id and issue_data.assignee_id != current_user.id:
        notification = Notification(
            type=NotificationType.ISSUE_ASSIGNED,
            title=f"New issue assigned: {new_issue.title}",
            message=f"You have been assigned to issue '{new_issue.title}' in project {project.key}",
            user_id=issue_data.assignee_id,
            issue_id=new_issue.id,
            project_id=project.id
        )
        db.add(notification)
        db.commit()
    
    return new_issue

@router.get("/project/{project_id}", response_model=List[IssueWithDetails])
def get_project_issues(
    project_id: int,
    status_filter: Optional[IssueStatus] = Query(None, description="Filter by issue status"),
    priority_filter: Optional[IssuePriority] = Query(None, description="Filter by issue priority"),
    assignee_filter: Optional[int] = Query(None, description="Filter by assignee ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all issues in a project with optional filters"""
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Build query with filters
    query = db.query(Issue).filter(Issue.project_id == project_id)
    
    if status_filter:
        query = query.filter(Issue.status == status_filter)
    if priority_filter:
        query = query.filter(Issue.priority == priority_filter)
    if assignee_filter:
        query = query.filter(Issue.assignee_id == assignee_filter)
    
    issues = query.all()
    
    # Add project and user details
    result = []
    for issue in issues:
        assignee = None
        if issue.assignee_id:
            assignee = db.query(User).filter(User.id == issue.assignee_id).first()
        
        reporter = db.query(User).filter(User.id == issue.reporter_id).first()
        
        issue_data = IssueWithDetails(
            **issue.__dict__,
            project_key=project.key,
            project_title=project.title,
            assignee_name=assignee.full_name if assignee else None,
            reporter_name=reporter.full_name if reporter else None
        )
        result.append(issue_data)
    
    return result

@router.get("/{issue_id}", response_model=IssueWithDetails)
def get_issue(
    issue_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific issue by ID"""
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )
    
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == issue.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Add project and user details
    assignee = None
    if issue.assignee_id:
        assignee = db.query(User).filter(User.id == issue.assignee_id).first()
    
    reporter = db.query(User).filter(User.id == issue.reporter_id).first()
    
    issue_data = IssueWithDetails(
        **issue.__dict__,
        project_key=project.key,
        project_title=project.title,
        assignee_name=assignee.full_name if assignee else None,
        reporter_name=reporter.full_name if reporter else None
    )
    
    return issue_data

@router.put("/{issue_id}", response_model=IssueResponse)
def update_issue(
    issue_id: int,
    issue_update: IssueUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an issue"""
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )
    
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == issue.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Track if assignee changed for notification
    old_assignee_id = issue.assignee_id
    new_assignee_id = issue_update.assignee_id
    
    # Update issue
    for field, value in issue_update.dict(exclude_unset=True).items():
        setattr(issue, field, value)
    
    db.commit()
    db.refresh(issue)
    
    # Create notification if assignee changed
    if new_assignee_id and new_assignee_id != old_assignee_id and new_assignee_id != current_user.id:
        notification = Notification(
            type=NotificationType.ISSUE_ASSIGNED,
            title=f"Issue assigned: {issue.title}",
            message=f"You have been assigned to issue '{issue.title}' in project {project.key}",
            user_id=new_assignee_id,
            issue_id=issue.id,
            project_id=project.id
        )
        db.add(notification)
        db.commit()
    
    return issue

@router.patch("/{issue_id}/status", response_model=IssueResponse)
def update_issue_status(
    issue_id: int,
    status_update: IssueStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update issue status (for Kanban board drag & drop)"""
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )
    
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == issue.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Update status
    issue.status = status_update.status
    db.commit()
    db.refresh(issue)
    
    return issue

@router.delete("/{issue_id}")
def delete_issue(
    issue_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an issue"""
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )
    
    # Check if user has access to the project
    project = db.query(Project).filter(Project.id == issue.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == project.workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Only reporter or admin can delete issue
    if issue.reporter_id != current_user.id and member.role != WorkspaceRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to delete issue"
        )
    
    db.delete(issue)
    db.commit()
    
    return {"message": "Issue deleted successfully"}
