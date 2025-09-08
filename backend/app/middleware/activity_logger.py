import time
import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.services.mongodb_logger import mongodb_logger
from app.core.security import verify_token

logger = logging.getLogger(__name__)

class ActivityLoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, exclude_paths: list = None):
        super().__init__(app)
        self.exclude_paths = exclude_paths or [
            "/health",
            "/docs",
            "/redoc",
            "/openapi.json",
            "/favicon.ico"
        ]
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Skip logging for excluded paths
        if request.url.path in self.exclude_paths:
            response = await call_next(request)
            return response
        
        # Extract user information from token
        user_info = await self._extract_user_info(request)
        
        # Process request
        response = await call_next(request)
        
        # Calculate processing time
        process_time = time.time() - start_time
        
        # Log user activity
        await self._log_activity(request, response, user_info, process_time)
        
        return response
    
    async def _extract_user_info(self, request: Request):
        """Extract user information from Authorization header"""
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return None
            
            token = auth_header.split(" ")[1]
            payload = verify_token(token)
            
            if payload:
                return {
                    "user_id": int(payload.get("sub")),
                    "token_payload": payload
                }
        except Exception as e:
            logger.error(f"Failed to extract user info: {e}")
        
        return None
    
    async def _log_activity(self, request: Request, response: Response, user_info: dict, process_time: float):
        """Log user activity to MongoDB"""
        try:
            if not user_info:
                return
            
            # Get user details from database
            user_id = user_info["user_id"]
            user_details = await self._get_user_details(user_id)
            
            if not user_details:
                logger.warning(f"Could not fetch user details for user_id: {user_id}")
                return
            
            # Extract request details - use custom event type if provided
            custom_event_type = request.headers.get("X-Event-Type")
            if custom_event_type:
                action = custom_event_type
            else:
                # Fallback to HTTP method and path for backward compatibility
                action = f"{request.method} {request.url.path}"
            
            details = {
                "method": request.method,
                "path": request.url.path,
                "query_params": dict(request.query_params),
                "status_code": response.status_code,
                "process_time": process_time,
                "content_type": request.headers.get("content-type"),
                "user_agent": request.headers.get("user-agent"),
                "custom_event_type": custom_event_type
            }
            
            # Get IP address
            ip_address = request.client.host
            if "x-forwarded-for" in request.headers:
                ip_address = request.headers["x-forwarded-for"].split(",")[0].strip()
            
            # Log the activity
            await mongodb_logger.log_user_activity(
                user_id=user_id,
                user_name=user_details["full_name"],
                user_email=user_details["email"],
                action=action,
                details=details,
                ip_address=ip_address,
                user_agent=request.headers.get("user-agent")
            )
            
        except Exception as e:
            logger.error(f"Failed to log activity: {e}")
    
    async def _get_user_details(self, user_id: int):
        """Get user details from database"""
        try:
            from app.core.database import SessionLocal
            from app.models.user import User
            
            db = SessionLocal()
            try:
                user = db.query(User).filter(User.id == user_id).first()
                if user:
                    return {
                        "full_name": user.full_name,
                        "email": user.email,
                        "username": user.username
                    }
            finally:
                db.close()
        except Exception as e:
            logger.error(f"Failed to get user details: {e}")
        
        return None

class ClickTrackingMiddleware(BaseHTTPMiddleware):
    """Middleware to track specific user clicks and interactions"""
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Track specific actions
        if request.url.path.startswith("/api/v1/") and request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            await self._track_user_action(request, response)
        
        return response
    
    async def _track_user_action(self, request: Request, response: Response):
        """Track specific user actions"""
        try:
            # Extract user info
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return
            
            token = auth_header.split(" ")[1]
            payload = verify_token(token)
            
            if not payload:
                return
            
            user_id = int(payload.get("sub"))
            
            # Determine action type based on path and method
            action_type = self._get_action_type(request)
            
            if action_type:
                details = {
                    "method": request.method,
                    "path": request.url.path,
                    "status_code": response.status_code,
                    "timestamp": time.time()
                }
                
                # Get user details from database
                user_details = await self._get_user_details(user_id)
                if not user_details:
                    logger.warning(f"Could not fetch user details for user_id: {user_id}")
                    return
                
                # Log the specific action
                await mongodb_logger.log_user_activity(
                    user_id=user_id,
                    user_name=user_details["full_name"],
                    user_email=user_details["email"],
                    action=f"CLICK_{action_type}",
                    details=details,
                    ip_address=request.client.host,
                    user_agent=request.headers.get("user-agent")
                )
                
        except Exception as e:
            logger.error(f"Failed to track user action: {e}")
    
    def _get_action_type(self, request: Request) -> str:
        """Determine action type from request"""
        path = request.url.path
        method = request.method
        
        if "/auth/login" in path:
            return "LOGIN"
        elif "/auth/register" in path:
            return "REGISTER"
        elif "/workspaces" in path and method == "POST":
            return "CREATE_WORKSPACE"
        elif "/projects" in path and method == "POST":
            return "CREATE_PROJECT"
        elif "/issues" in path and method == "POST":
            return "CREATE_ISSUE"
        elif "/issues" in path and method == "PATCH":
            return "UPDATE_ISSUE"
        elif "/messages" in path and method == "POST":
            return "SEND_MESSAGE"
        elif method == "DELETE":
            return "DELETE_ITEM"
        elif method == "PUT":
            return "UPDATE_ITEM"
        
        return None
