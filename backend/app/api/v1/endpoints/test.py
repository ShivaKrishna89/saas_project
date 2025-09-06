from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def test_endpoint():
    """Simple test endpoint to verify frontend-backend connectivity"""
    return {
        "message": "Backend is working!",
        "status": "success",
        "timestamp": "2025-08-31T08:30:00Z"
    }

@router.post("/test-login")
async def test_login():
    """Test login endpoint that doesn't require database"""
    return {
        "message": "Login endpoint is accessible",
        "status": "success",
        "note": "This is a test endpoint - no actual authentication"
    }
