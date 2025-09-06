# 🚀 Manual Setup Guide with Your Database Credentials

## Your Database Configuration

### MySQL (Local)
- **URL**: `mysql+pymysql://root:secret@localhost:3306/local`
- **Host**: localhost
- **Port**: 3306
- **Database**: local
- **Username**: root
- **Password**: secret

### MongoDB (Cloud - Atlas)
- **URL**: `mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/`
- **Type**: MongoDB Atlas (Cloud)
- **Username**: pallewarshiva
- **Password**: krishkrish
- **Cluster**: cluster0.cjlomlw.mongodb.net

## 🎯 Quick Start Commands

### Option 1: Docker Setup (Recommended)
```bash
# 1. Make sure you're in the project directory
cd C:\Users\palle\projects\saas\saas_project

# 2. Run the Windows setup script
setup.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment (Windows)
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file manually (since it's blocked)
# Copy the content below to backend/.env:

APP_NAME=Slack-like SaaS
VERSION=1.0.0
DEBUG=true
SECRET_KEY=your-super-secret-key-change-this-in-production-12345
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=mysql+pymysql://root:secret@localhost:3306/local
MONGODB_URL=mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200
ALLOWED_HOSTS=["*"]
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
WS_MESSAGE_QUEUE_SIZE=100
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# 6. Start your local services
# Make sure MySQL is running on localhost:3306
# Make sure Redis is running on localhost:6379

# 7. Run FastAPI backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run Angular development server
ng serve --open
```

## 🔧 Database Setup

### MySQL Setup (Local)
```bash
# 1. Make sure MySQL is running
# 2. Create database if it doesn't exist
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Verify connection
mysql -u root -p -e "USE local; SHOW TABLES;"
```

### MongoDB Setup (Cloud)
```bash
# MongoDB Atlas is already configured
# The connection string is: mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/

# Test connection (if you have mongo shell installed)
mongo "mongodb+srv://cluster0.cjlomlw.mongodb.net/" --username pallewarshiva
```

### Redis Setup (Local)
```bash
# 1. Start Redis server
redis-server

# 2. Test connection
redis-cli ping
# Should return: PONG
```

## 🧪 Testing Your Setup

### Test Backend
```bash
# From project root
python test_backend.py
```

### Test Database Connections
```bash
# Test MySQL
mysql -u root -p -e "SELECT 1;" local

# Test Redis
redis-cli ping

# Test MongoDB (if mongo shell is installed)
mongo "mongodb+srv://cluster0.cjlomlw.mongodb.net/" --username pallewarshiva --eval "db.adminCommand('ping')"
```

### Test Frontend
```bash
cd frontend
ng serve --port 4200
```

## 🎉 Success Indicators

✅ **Backend**: http://localhost:8000/docs shows FastAPI docs  
✅ **Frontend**: http://localhost:4200 loads the application  
✅ **MySQL**: Connection established to local database  
✅ **MongoDB**: Connection established to Atlas cluster  
✅ **Redis**: Connection established for caching  

## 🐛 Troubleshooting

### MySQL Connection Issues
```bash
# Check if MySQL is running
net start mysql

# Check if database exists
mysql -u root -p -e "SHOW DATABASES;"

# Create database if missing
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS local;"
```

### MongoDB Connection Issues
- Verify your MongoDB Atlas cluster is accessible
- Check if your IP is whitelisted in Atlas
- Verify username/password are correct

### Redis Connection Issues
```bash
# Start Redis if not running
redis-server

# Test connection
redis-cli ping
```

## 📞 Quick Commands

```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

## 🎯 Next Steps

1. **Run the test script**: `python test_backend.py`
2. **Start with Docker**: `setup.bat`
3. **Or start manually**: Follow the manual setup steps above
4. **Access the application**: http://localhost:4200
5. **Check API docs**: http://localhost:8000/docs
