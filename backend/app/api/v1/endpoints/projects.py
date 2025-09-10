from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.workspace import Workspace
from app.models.workspace_member import WorkspaceMember, WorkspaceRole
from app.models.project import Project
from app.models.issue import Issue
from app.schemas.project import (
    ProjectCreate, 
    ProjectUpdate, 
    ProjectResponse, 
    ProjectWithIssueCount
)

router = APIRouter()

DEFAULT_WORKSPACE_ID = 1  # Temporary to satisfy FK while removing workspace usage

@router.post("/", response_model=ProjectResponse)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new project in a workspace"""
    # User-centric: Avoid touching workspaces; attach to a default workspace id
    
    # Check if project key already exists
    existing_project = db.query(Project).filter(Project.key == project_data.key).first()
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project key already exists"
        )
    
    # Create new project
    new_project = Project(
        title=project_data.title,
        description=project_data.description,
        key=project_data.key,
        workspace_id=DEFAULT_WORKSPACE_ID,
        creator_id=current_user.id,
        user_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    
    return new_project

@router.get("/mine", response_model=List[ProjectWithIssueCount])
def get_my_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all active projects created by the current user"""
    projects = db.query(Project).filter(
        Project.creator_id == current_user.id,
        Project.is_active == True
    ).all()

    result: List[ProjectWithIssueCount] = []
    for project in projects:
        issue_count = db.query(Issue).filter(Issue.project_id == project.id).count()
        project_data = ProjectWithIssueCount(
            **project.__dict__,
            issue_count=issue_count
        )
        result.append(project_data)

    return result

@router.get("/workspace/{workspace_id}", response_model=List[ProjectWithIssueCount])
def get_workspace_projects(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all projects in a workspace"""
    # Check if user is a member of the workspace
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == workspace_id
    ).first()
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this workspace"
        )
    
    # Get all projects with issue count
    projects = db.query(Project).filter(
        Project.workspace_id == workspace_id,
        Project.is_active == True
    ).all()
    
    result = []
    for project in projects:
        issue_count = db.query(Issue).filter(Issue.project_id == project.id).count()
        project_data = ProjectWithIssueCount(
            **project.__dict__,
            issue_count=issue_count
        )
        result.append(project_data)
    
    return result

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific project by ID"""
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
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a project"""
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
    
    # Only creator or admin can update project
    if project.creator_id != current_user.id and member.role != WorkspaceRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to update project"
        )
    
    # Update project
    for field, value in project_update.dict(exclude_unset=True).items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    
    return project

@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a project (hard delete)"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # Only the creator/owner can delete in user-centric mode
    if project.creator_id != current_user.id and project.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to delete project"
        )

    # Hard delete
    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}
