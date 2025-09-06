#!/usr/bin/env python3
"""
Simple test script to verify the backend can start without errors
"""

import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def test_backend_imports():
    """Test if all backend imports work correctly"""
    try:
        print("🔍 Testing backend imports...")
        
        # Test core imports
        from app.core.config import settings
        print("✅ Config imported successfully")
        
        from app.core.database import engine, Base
        print("✅ Database imported successfully")
        
        from app.models import User, Organization, Channel, Message, Workspace, Member
        print("✅ Models imported successfully")
        
        from app.core.security import create_access_token, verify_password
        print("✅ Security imported successfully")
        
        from app.api.v1.api import api_router
        print("✅ API router imported successfully")
        
        from app.main import app
        print("✅ FastAPI app imported successfully")
        
        print("\n🎉 All backend imports successful!")
        return True
        
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_database_connection():
    """Test database connection"""
    try:
        print("\n🔍 Testing database connection...")
        
        from app.core.database import engine
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
            print("✅ Database connection successful")
            return True
            
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        print("💡 Make sure your database is running and .env file is configured")
        return False

def main():
    """Main test function"""
    print("🚀 Testing Slack-like SaaS Backend")
    print("=" * 50)
    
    # Test imports
    imports_ok = test_backend_imports()
    
    if imports_ok:
        # Test database connection
        db_ok = test_database_connection()
        
        if db_ok:
            print("\n✅ Backend is ready to run!")
            print("💡 Run: uvicorn app.main:app --reload --port 8000")
        else:
            print("\n⚠️  Backend imports work but database connection failed")
            print("💡 Check your database configuration in .env file")
    else:
        print("\n❌ Backend has import errors")
        print("💡 Check the error messages above")

if __name__ == "__main__":
    main()
