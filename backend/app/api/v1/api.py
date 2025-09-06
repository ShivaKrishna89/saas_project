from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, workspaces, workspace_members, projects, issues, notifications, websocket, search, test

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["workspaces"])
api_router.include_router(workspace_members.router, prefix="/workspace-members", tags=["workspace-members"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(issues.router, prefix="/issues", tags=["issues"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(websocket.router, prefix="/ws", tags=["websocket"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(test.router, prefix="/test", tags=["test"])
