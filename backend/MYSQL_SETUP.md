# MySQL Setup Guide

## 🚀 Quick MySQL Setup Options

### Option 1: XAMPP (Recommended - Easiest)
1. Download XAMPP from: https://www.apachefriends.org/download.html
2. Install XAMPP
3. Start MySQL service in XAMPP Control Panel
4. Open phpMyAdmin (http://localhost/phpmyadmin)
5. Create database named `collabx`
6. Update config with: `mysql+pymysql://root:@localhost:3306/collabx`

### Option 2: MySQL Server
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Install MySQL Server
3. Set root password during installation
4. Create database: `CREATE DATABASE collabx;`
5. Update config with your password

### Option 3: Docker MySQL
```bash
docker run --name mysql-collabx -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=collabx -p 3306:3306 -d mysql:8.0
```

## 🔧 After MySQL Setup

1. Update `backend/app/core/config.py`:
```python
DATABASE_URL: str = "mysql+pymysql://root:your_password@localhost:3306/collabx"
```

2. Run migration:
```bash
cd backend
python migrate_to_mysql.py
```

3. Test the server:
```bash
python -m uvicorn app.main:app --reload
```

## 📊 Current Status
- ✅ Configuration ready for MySQL
- ✅ Migration script ready
- ❌ MySQL not installed/running
- ✅ SQLite working as fallback

## 🎯 Next Steps
1. Install MySQL (choose one option above)
2. Update DATABASE_URL in config.py
3. Run migration script
4. Deploy with MySQL
