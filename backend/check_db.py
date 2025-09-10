#!/usr/bin/env python3
"""
Simple script to check the existing database schema
"""

import sqlite3
import os

def check_database():
    db_path = "slack_saas.db"
    
    if not os.path.exists(db_path):
        print(f"Database file {db_path} not found")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    
    print("Existing tables:")
    for table in tables:
        print(f"- {table[0]}")
    
    print("\nTable schemas:")
    for table in tables:
        table_name = table[0]
        print(f"\n{table_name}:")
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        for col in columns:
            print(f"  {col[1]} {col[2]} {'NOT NULL' if col[3] else 'NULL'} {'PRIMARY KEY' if col[5] else ''}")
    
    conn.close()

if __name__ == "__main__":
    check_database()


