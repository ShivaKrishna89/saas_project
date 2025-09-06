# 🚀 Quick Start Guide - Slack-like SaaS Application

## Option 1: Docker Setup (Easiest - Recommended)

### Prerequisites
- Docker Desktop installed
- Git installed

### Steps
1. **Clone and Setup**
   ```bash
   git clone <your-repo-url>
   cd saas_project
   ```

2. **Run with Docker**
   ```bash
   # On Windows:
   setup.bat
   
   # On macOS/Linux:
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Access the Application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Option 2: Manual Setup (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 18+
- MySQL server
- MongoDB server
- Redis server

### Backend Setup

1. **Install Python Dependencies**
   ```bash
   cd backend
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

2. **Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Start Databases**
   ```bash
   # Start MySQL, MongoDB, and Redis
   # (Use your system's method to start these services)
   ```

4. **Run FastAPI Backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Angular Development Server**
   ```bash
   ng serve --open
   ```

## 🎯 Quick Commands Reference

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

### Backend Commands
```bash
# Run FastAPI
uvicorn app.main:app --reload --port 8000

# Run with specific host
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Celery worker
celery -A app.celery_app worker --loglevel=info

# Run Celery beat
celery -A app.celery_app beat --loglevel=info
```

### Frontend Commands
```bash
# Run Angular dev server
ng serve

# Run with specific port
ng serve --port 4201

# Build for production
ng build --prod

# Run tests
ng test
```

## 🔧 Environment Configuration

### Backend (.env file)
```env
APP_NAME=Slack-like SaaS
SECRET_KEY=your-secret-key-here
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/slack_saas
MONGODB_URL=mongodb://localhost:27017/slack_saas
REDIS_URL=redis://localhost:6379/0
ELASTICSEARCH_URL=http://localhost:9200
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1',
  wsUrl: 'http://localhost:8000/api/v1/ws'
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on specific port
   npx kill-port 8000 4200
   ```

2. **Database Connection Issues**
   - Check if MySQL/MongoDB/Redis are running
   - Verify connection strings in .env file
   - Check firewall settings

3. **Node Modules Issues**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Python Virtual Environment Issues**
   ```bash
   # Recreate virtual environment
   rm -rf venv
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate
   pip install -r requirements.txt
   ```

## 📊 Service Status Check

### Check if all services are running:
```bash
# Docker services
docker-compose ps

# Manual services
curl http://localhost:8000/health  # Backend
curl http://localhost:4200         # Frontend
redis-cli ping                     # Redis
mysql -u root -p -e "SELECT 1;"   # MySQL
mongo --eval "db.adminCommand('ping')"  # MongoDB
```

## 🎉 Success Indicators

✅ **Backend Running**: http://localhost:8000/docs shows FastAPI docs
✅ **Frontend Running**: http://localhost:4200 shows the application
✅ **Database Connected**: No connection errors in backend logs
✅ **WebSocket Working**: Real-time features function properly

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f [service_name]`
2. Verify all prerequisites are installed
3. Ensure ports 8000, 4200, 3306, 27017, 6379 are available
4. Check firewall and antivirus settings
