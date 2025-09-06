from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.workspace import Workspace
from app.models.workspace_member import WorkspaceMember, WorkspaceRole
from app.schemas.workspace_member import (
    WorkspaceMemberCreate, 
    WorkspaceMemberUpdate, 
    WorkspaceMemberResponse, 
    WorkspaceMemberWithUser
)

router = APIRouter()

@router.post("/", response_model=WorkspaceMemberResponse)
def create_workspace_member(
    member_data: WorkspaceMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a user to a workspace"""
    # Check if user is already a member
    existing_member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == member_data.user_id,
        WorkspaceMember.workspace_id == member_data.workspace_id
    ).first()
    
    if existing_member:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already a member of this workspace"
        )
    
    # Check if current user has permission to add members
    current_member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == member_data.workspace_id
    ).first()
    
    if not current_member or current_member.role not in [WorkspaceRole.ADMIN, WorkspaceRole.MEMBER]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to add members"
        )
    
    # Create new member
    new_member = WorkspaceMember(**member_data.dict())
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    
    return new_member

@router.get("/workspace/{workspace_id}", response_model=List[WorkspaceMemberWithUser])
def get_workspace_members(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all members of a workspace"""
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
    
    # Get all members with user details
    members = db.query(WorkspaceMember).filter(
        WorkspaceMember.workspace_id == workspace_id,
        WorkspaceMember.is_active == True
    ).all()
    
    result = []
    for member in members:
        user = db.query(User).filter(User.id == member.user_id).first()
        if user:
            member_data = WorkspaceMemberWithUser(
                **member.__dict__,
                user_email=user.email,
                user_username=user.username,
                user_full_name=user.full_name,
                user_avatar_url=user.avatar_url
            )
            result.append(member_data)
    
    return result

@router.put("/{member_id}", response_model=WorkspaceMemberResponse)
def update_workspace_member(
    member_id: int,
    member_update: WorkspaceMemberUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a workspace member's role"""
    # Get the member to update
    member = db.query(WorkspaceMember).filter(WorkspaceMember.id == member_id).first()
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace member not found"
        )
    
    # Check if current user has permission to update members
    current_member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == member.workspace_id
    ).first()
    
    if not current_member or current_member.role != WorkspaceRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to update members"
        )
    
    # Update member
    for field, value in member_update.dict(exclude_unset=True).items():
        setattr(member, field, value)
    
    db.commit()
    db.refresh(member)
    
    return member

@router.delete("/{member_id}")
def remove_workspace_member(
    member_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove a user from a workspace"""
    # Get the member to remove
    member = db.query(WorkspaceMember).filter(WorkspaceMember.id == member_id).first()
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace member not found"
        )
    
    # Check if current user has permission to remove members
    current_member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.workspace_id == member.workspace_id
    ).first()
    
    if not current_member or current_member.role != WorkspaceRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions to remove members"
        )
    
    # Cannot remove yourself
    if member.user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot remove yourself from workspace"
        )
    
    # Soft delete by setting is_active to False
    member.is_active = False
    db.commit()
    
    return {"message": "Member removed from workspace"}
