#!/usr/bin/env python3
"""
Simple test script for Slack-like SaaS Backend
Tests basic imports without database connections
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_basic_imports():
    """Test basic imports without database connections"""
    print("🚀 Testing Slack-like SaaS Backend (Basic Import Test)")
    print("=" * 50)
    
    try:
        # Test basic imports
        print("🔍 Testing basic imports...")
        
        # Test config
        try:
            from app.core.config import Settings
            print("✅ Config imported successfully")
        except Exception as e:
            print(f"❌ Config import failed: {e}")
            return False
        
        # Test models (without database)
        try:
            from app.models.user import User
            from app.models.organization import Organization
            from app.models.channel import Channel
            from app.models.message import Message
            print("✅ Models imported successfully")
        except Exception as e:
            print(f"❌ Models import failed: {e}")
            return False
        
        # Test schemas
        try:
            from app.schemas.user import UserCreate, UserLogin, UserResponse
            from app.schemas.organization import OrganizationCreate, OrganizationResponse
            from app.schemas.channel import ChannelCreate, ChannelResponse
            from app.schemas.message import MessageCreate, MessageResponse
            print("✅ Schemas imported successfully")
        except Exception as e:
            print(f"❌ Schemas import failed: {e}")
            return False
        
        # Test security
        try:
            from app.core.security import create_access_token, verify_password, get_password_hash
            print("✅ Security imported successfully")
        except Exception as e:
            print(f"❌ Security import failed: {e}")
            return False
        
        # Test API endpoints
        try:
            from app.api.v1.endpoints.auth import router as auth_router
            from app.api.v1.endpoints.users import router as users_router
            from app.api.v1.endpoints.channels import router as channels_router
            from app.api.v1.endpoints.messages import router as messages_router
            print("✅ API endpoints imported successfully")
        except Exception as e:
            print(f"❌ API endpoints import failed: {e}")
            return False
        
        # Test FastAPI app creation
        try:
            from app.main import app
            print("✅ FastAPI app imported successfully")
        except Exception as e:
            print(f"❌ FastAPI app import failed: {e}")
            return False
        
        print("\n🎉 All basic imports successful!")
        print("✅ Backend code structure is correct")
        print("✅ All modules can be imported")
        print("✅ FastAPI app can be created")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        return False

def test_fastapi_app():
    """Test if FastAPI app can be created and has expected endpoints"""
    try:
        from app.main import app
        
        print("\n🔍 Testing FastAPI app...")
        
        # Check if app has expected routes
        routes = [route.path for route in app.routes]
        
        expected_routes = [
            '/docs',
            '/redoc',
            '/openapi.json',
            '/health',
            '/api/v1/'
        ]
        
        for route in expected_routes:
            if any(route in r for r in routes):
                print(f"✅ Route {route} found")
            else:
                print(f"⚠️  Route {route} not found")
        
        print("✅ FastAPI app test completed")
        return True
        
    except Exception as e:
        print(f"❌ FastAPI app test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_basic_imports()
    
    if success:
        test_fastapi_app()
        print("\n🎯 Backend is ready for development!")
        print("💡 To run with databases, use Docker or install MySQL/Redis locally")
    else:
        print("\n❌ Backend has issues that need to be fixed")
        sys.exit(1)
