#!/usr/bin/env python3
"""
Database migration script to update existing chat SaaS database to project management system.
This script will:
1. Create new tables for the project management system
2. Migrate existing data where possible
3. Clean up old tables
"""

import os
import sys
from sqlalchemy import create_engine, text, MetaData, Table, Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import enum

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.core.config import settings
from app.models import Base, User, Workspace, WorkspaceMember, Project, Issue, Notification

def parse_datetime(date_string):
    """Parse datetime string to Python datetime object"""
    if not date_string:
        return datetime.utcnow()
    
    try:
        # Try to parse the datetime string
        if isinstance(date_string, str):
            # Handle different datetime formats
            for fmt in [
                '%Y-%m-%d %H:%M:%S',
                '%Y-%m-%d %H:%M:%S.%f',
                '%Y-%m-%dT%H:%M:%S',
                '%Y-%m-%dT%H:%M:%S.%f'
            ]:
                try:
                    return datetime.strptime(date_string, fmt)
                except ValueError:
                    continue
            
            # If none of the formats work, return current time
            print(f"Warning: Could not parse datetime '{date_string}', using current time")
            return datetime.utcnow()
        else:
            return date_string
    except Exception as e:
        print(f"Warning: Error parsing datetime '{date_string}': {e}, using current time")
        return datetime.utcnow()

def drop_existing_tables(engine):
    """Drop existing tables that might have constraints"""
    print("Dropping existing tables with constraints...")
    
    # List of tables to drop
    tables_to_drop = [
        'workspaces',
        'channels',
        'messages', 
        'organizations',
        'members'
    ]
    
    with engine.connect() as conn:
        for table_name in tables_to_drop:
            try:
                # Check if table exists
                result = conn.execute(text(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'"))
                if result.fetchone():
                    conn.execute(text(f"DROP TABLE {table_name}"))
                    conn.commit()
                    print(f"✓ Dropped table: {table_name}")
            except Exception as e:
                print(f"Warning: Could not drop table {table_name}: {e}")

def update_users_table(engine):
    """Update the users table to add the role column"""
    print("Updating users table...")
    
    with engine.connect() as conn:
        try:
            # Check if role column exists
            result = conn.execute(text("PRAGMA table_info(users)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'role' not in columns:
                # Add role column
                conn.execute(text("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'member'"))
                conn.commit()
                print("✓ Added role column to users table")
            else:
                print("✓ Role column already exists")
                
        except Exception as e:
            print(f"Warning: Could not update users table: {e}")

def create_new_tables(engine):
    """Create new tables for the project management system"""
    print("Creating new tables...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✓ New tables created successfully")

def migrate_existing_data(engine):
    """Migrate existing data to new structure"""
    print("Migrating existing data...")
    
    # Create a session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Check if we have existing users
        existing_users = db.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='users'"))
        if existing_users.fetchone():
            print("✓ Found existing users table")
            
            # Get existing users
            users = db.execute(text("SELECT id, email, username, full_name, hashed_password, is_active, is_verified, avatar_url, timezone, language, created_at, updated_at FROM users"))
            user_data = users.fetchall()
            
            if user_data:
                print(f"Found {len(user_data)} existing users")
                
                # Create default workspace for existing users
                default_workspace = Workspace(
                    name="Default Workspace",
                    description="Migrated from existing system",
                    is_active=True,
                    is_default=True
                )
                db.add(default_workspace)
                db.commit()
                db.refresh(default_workspace)
                print(f"✓ Created default workspace with ID: {default_workspace.id}")
                
                # Add users to the default workspace
                for user_row in user_data:
                    user_id, email, username, full_name, hashed_password, is_active, is_verified, avatar_url, timezone, language, created_at, updated_at = user_row
                    
                    # Update user role in database
                    db.execute(
                        text("UPDATE users SET role = :role WHERE id = :user_id"),
                        {"role": "admin" if user_id == 1 else "member", "user_id": user_id}
                    )
                    
                    # Parse datetime strings
                    parsed_created_at = parse_datetime(created_at)
                    
                    # Add user to workspace
                    member = WorkspaceMember(
                        user_id=user_id,
                        workspace_id=default_workspace.id,
                        role="admin" if user_id == 1 else "member",
                        is_active=True,
                        joined_at=parsed_created_at
                    )
                    db.add(member)
                
                db.commit()
                print(f"✓ Migrated {len(user_data)} users to new system")
        
        # Create a sample project
        sample_project = Project(
            title="Sample Project",
            description="This is a sample project to get you started",
            key="SAMPLE",
            workspace_id=1,
            creator_id=1,
            is_active=True
        )
        db.add(sample_project)
        
        # Create sample issues
        sample_issues = [
            Issue(
                title="Welcome to the new system",
                description="This is your first issue in the new project management system!",
                status="todo",
                priority="medium",
                project_id=1,
                reporter_id=1,
                assignee_id=1
            ),
            Issue(
                title="Explore the features",
                description="Take some time to explore the new features and interface",
                status="in_progress",
                priority="high",
                project_id=1,
                reporter_id=1,
                assignee_id=1
            )
        ]
        
        for issue in sample_issues:
            db.add(issue)
        
        db.commit()
        print("✓ Created sample project and issues")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        db.rollback()
        raise
    finally:
        db.close()

def main():
    """Main migration function"""
    print("Starting database migration...")
    print("=" * 50)
    
    # Create engine
    if settings.DATABASE_URL.startswith("sqlite"):
        engine = create_engine(
            settings.DATABASE_URL,
            connect_args={"check_same_thread": False},
            echo=False
        )
    else:
        engine = create_engine(settings.DATABASE_URL)
    
    try:
        # Update users table first
        update_users_table(engine)
        
        # Drop existing tables with constraints
        drop_existing_tables(engine)
        
        # Create new tables
        create_new_tables(engine)
        
        # Migrate existing data
        migrate_existing_data(engine)
        
        print("=" * 50)
        print("✓ Database migration completed successfully!")
        print("\nYour database has been updated to support:")
        print("- Workspaces and projects")
        print("- Issues with status tracking")
        print("- User roles and permissions")
        print("- Notifications system")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        sys.exit(1)
    finally:
        engine.dispose()

if __name__ == "__main__":
    main()
