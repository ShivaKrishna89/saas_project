#!/usr/bin/env python3
"""
Migration script to move from SQLite to MySQL
This script will:
1. Create MySQL database
2. Migrate data from SQLite to MySQL
3. Verify migration
"""

import os
import sys
import sqlite3
import pymysql
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models import Base
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_mysql_database():
    """Create MySQL database if it doesn't exist"""
    try:
        # Parse MySQL URL
        mysql_url = settings.DATABASE_URL.replace("mysql+pymysql://", "")
        user_pass, host_port_db = mysql_url.split("@")
        user, password = user_pass.split(":")
        host_port, database = host_port_db.split("/")
        host, port = host_port.split(":")
        
        # Connect to MySQL server (without database)
        connection = pymysql.connect(
            host=host,
            port=int(port),
            user=user,
            password=password
        )
        
        with connection.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
            logger.info(f"Database '{database}' created or already exists")
        
        connection.close()
        return True
        
    except Exception as e:
        logger.error(f"Failed to create MySQL database: {e}")
        return False

def migrate_sqlite_to_mysql():
    """Migrate data from SQLite to MySQL"""
    try:
        # SQLite connection
        sqlite_path = "slack_saas.db"
        if not os.path.exists(sqlite_path):
            logger.error(f"SQLite database not found: {sqlite_path}")
            return False
        
        sqlite_conn = sqlite3.connect(sqlite_path)
        sqlite_cursor = sqlite_conn.cursor()
        
        # MySQL connection
        mysql_engine = create_engine(settings.DATABASE_URL)
        mysql_session = sessionmaker(bind=mysql_engine)()
        
        # Create tables in MySQL
        Base.metadata.create_all(bind=mysql_engine)
        logger.info("MySQL tables created")
        
        # Get list of tables from SQLite
        sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in sqlite_cursor.fetchall()]
        
        # Skip system tables
        tables = [t for t in tables if not t.startswith('sqlite_')]
        
        logger.info(f"Found tables to migrate: {tables}")
        
        # Migrate each table
        for table in tables:
            try:
                # Get table structure
                sqlite_cursor.execute(f"PRAGMA table_info({table})")
                columns = sqlite_cursor.fetchall()
                
                # Get data from SQLite
                sqlite_cursor.execute(f"SELECT * FROM {table}")
                rows = sqlite_cursor.fetchall()
                
                if not rows:
                    logger.info(f"Table {table} is empty, skipping")
                    continue
                
                # Create column names
                column_names = [col[1] for col in columns]
                
                # Insert data into MySQL
                for row in rows:
                    try:
                        # Create INSERT statement
                        placeholders = ", ".join(["%s"] * len(row))
                        columns_str = ", ".join(column_names)
                        insert_sql = f"INSERT INTO {table} ({columns_str}) VALUES ({placeholders})"
                        
                        mysql_session.execute(text(insert_sql), row)
                        
                    except Exception as e:
                        logger.warning(f"Failed to insert row in {table}: {e}")
                        continue
                
                mysql_session.commit()
                logger.info(f"Migrated {len(rows)} rows from {table}")
                
            except Exception as e:
                logger.error(f"Failed to migrate table {table}: {e}")
                continue
        
        # Close connections
        sqlite_conn.close()
        mysql_session.close()
        
        logger.info("Migration completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        return False

def verify_migration():
    """Verify that migration was successful"""
    try:
        # Connect to both databases
        sqlite_conn = sqlite3.connect("slack_saas.db")
        sqlite_cursor = sqlite_conn.cursor()
        
        mysql_engine = create_engine(settings.DATABASE_URL)
        mysql_session = sessionmaker(bind=mysql_engine)()
        
        # Get table counts from both databases
        sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in sqlite_cursor.fetchall()]
        tables = [t for t in tables if not t.startswith('sqlite_')]
        
        logger.info("Verifying migration...")
        
        for table in tables:
            # Count rows in SQLite
            sqlite_cursor.execute(f"SELECT COUNT(*) FROM {table}")
            sqlite_count = sqlite_cursor.fetchone()[0]
            
            # Count rows in MySQL
            mysql_result = mysql_session.execute(text(f"SELECT COUNT(*) FROM {table}"))
            mysql_count = mysql_result.fetchone()[0]
            
            if sqlite_count == mysql_count:
                logger.info(f"✅ {table}: {sqlite_count} rows migrated successfully")
            else:
                logger.warning(f"⚠️ {table}: SQLite={sqlite_count}, MySQL={mysql_count}")
        
        sqlite_conn.close()
        mysql_session.close()
        
        return True
        
    except Exception as e:
        logger.error(f"Verification failed: {e}")
        return False

def main():
    """Main migration function"""
    logger.info("Starting SQLite to MySQL migration...")
    
    # Step 1: Create MySQL database
    if not create_mysql_database():
        logger.error("Failed to create MySQL database")
        return False
    
    # Step 2: Migrate data
    if not migrate_sqlite_to_mysql():
        logger.error("Migration failed")
        return False
    
    # Step 3: Verify migration
    if not verify_migration():
        logger.error("Verification failed")
        return False
    
    logger.info("🎉 Migration completed successfully!")
    logger.info("You can now update your DATABASE_URL to use MySQL")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
