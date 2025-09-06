#!/usr/bin/env python3
"""
Script to fix enum values in the database
"""

import os
import sys
from sqlalchemy import create_engine, text

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.core.config import settings

def fix_enum_values():
	"""Fix enum values in the database"""
	print("Fixing enum values in database...")
	print("=" * 40)
	
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
		with engine.connect() as conn:
			# Fix user roles
			print("Fixing user roles...")
			conn.execute(text("UPDATE users SET role = 'ADMIN' WHERE role NOT IN ('ADMIN','MEMBER') OR role = 'admin'"))
			conn.execute(text("UPDATE users SET role = 'MEMBER' WHERE role = 'member'"))
			
			# Fix workspace member roles
			print("Fixing workspace member roles...")
			conn.execute(text("UPDATE workspace_members SET role = 'ADMIN' WHERE role = 'admin'"))
			conn.execute(text("UPDATE workspace_members SET role = 'MEMBER' WHERE role = 'member'"))
			conn.execute(text("UPDATE workspace_members SET role = 'VIEWER' WHERE role = 'viewer'"))
			
			# Fix issue statuses
			print("Fixing issue statuses...")
			conn.execute(text("UPDATE issues SET status = 'TODO' WHERE status = 'todo'"))
			conn.execute(text("UPDATE issues SET status = 'IN_PROGRESS' WHERE status = 'in_progress'"))
			conn.execute(text("UPDATE issues SET status = 'DONE' WHERE status = 'done'"))
			
			# Fix issue priorities
			print("Fixing issue priorities...")
			conn.execute(text("UPDATE issues SET priority = 'LOW' WHERE priority = 'low'"))
			conn.execute(text("UPDATE issues SET priority = 'MEDIUM' WHERE priority = 'medium'"))
			conn.execute(text("UPDATE issues SET priority = 'HIGH' WHERE priority = 'high'"))
			
			conn.commit()
			print("✅ Enum values fixed successfully!")
			
			# Show current values
			print("\nCurrent values in database:")
			users = conn.execute(text("SELECT id, email, role FROM users"))
			for user in users.fetchall():
				print(f"User {user[0]} ({user[1]}): role = {user[2]}")
			
	except Exception as e:
		print(f"❌ Error fixing enum values: {e}")
	finally:
		engine.dispose()

if __name__ == "__main__":
	fix_enum_values()
