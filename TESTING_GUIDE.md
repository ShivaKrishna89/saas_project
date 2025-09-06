# 🧪 Testing Guide - Verify Before Running

## Quick Test Commands

### 1. Test Backend (Python)
```bash
# From project root
python test_backend.py
```

### 2. Test Frontend (Node.js)
```bash
# From frontend directory
cd frontend
npm install
ng version
```

### 3. Test Docker Setup
```bash
# From project root
docker --version
docker-compose --version
```

## 🔍 Pre-Run Checklist

### Backend Prerequisites
- [ ] Python 3.11+ installed
- [ ] MySQL server running
- [ ] MongoDB server running  
- [ ] Redis server running
- [ ] Backend `.env` file configured

### Frontend Prerequisites
- [ ] Node.js 18+ installed
- [ ] Angular CLI installed globally
- [ ] Frontend dependencies installed

### Docker Prerequisites
- [ ] Docker Desktop installed
- [ ] Docker Compose available
- [ ] Ports 8000, 4200, 3306, 27017, 6379 available

## 🚨 Known Issues & Fixes

### Backend Issues

1. **Import Error: No module named 'app'**
   ```bash
   # Fix: Run from backend directory
   cd backend
   python -m uvicorn app.main:app --reload --port 8000
   ```

2. **Database Connection Error**
   ```bash
   # Fix: Check .env file
   cp env.example .env
   # Edit .env with correct database URLs
   ```

3. **Missing Dependencies**
   ```bash
   # Fix: Install requirements
   pip install -r requirements.txt
   ```

### Frontend Issues

1. **Angular CLI Not Found**
   ```bash
   # Fix: Install Angular CLI
   npm install -g @angular/cli
   ```

2. **Node Modules Issues**
   ```bash
   # Fix: Clear and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Port Already in Use**
   ```bash
   # Fix: Kill process or use different port
   npx kill-port 4200
   # Or
   ng serve --port 4201
   ```

## 🧪 Step-by-Step Testing

### Step 1: Test Backend Setup
```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Test imports
python ../test_backend.py

# 6. Test FastAPI startup
uvicorn app.main:app --reload --port 8000
```

### Step 2: Test Frontend Setup
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Test Angular CLI
ng version

# 4. Test build
ng build --prod

# 5. Test development server
ng serve --port 4200
```

### Step 3: Test Database Connections
```bash
# Test MySQL
mysql -u root -p -e "SELECT 1;"

# Test MongoDB
mongo --eval "db.adminCommand('ping')"

# Test Redis
redis-cli ping
```

## 🎯 Success Indicators

### Backend Success
- ✅ `python test_backend.py` runs without errors
- ✅ `uvicorn app.main:app --reload --port 8000` starts successfully
- ✅ http://localhost:8000/docs shows FastAPI documentation
- ✅ http://localhost:8000/health returns `{"status": "healthy"}`

### Frontend Success
- ✅ `ng serve` starts without errors
- ✅ http://localhost:4200 loads the application
- ✅ No console errors in browser developer tools
- ✅ Angular Material components render correctly

### Database Success
- ✅ MySQL connection established
- ✅ MongoDB connection established
- ✅ Redis connection established
- ✅ Database tables created successfully

## 🐛 Common Error Solutions

### Error: "ModuleNotFoundError: No module named 'app'"
**Solution:**
```bash
# Make sure you're in the backend directory
cd backend
export PYTHONPATH=$PYTHONPATH:$(pwd)
python -m uvicorn app.main:app --reload --port 8000
```

### Error: "Database connection failed"
**Solution:**
```bash
# Check if databases are running
sudo systemctl status mysql
sudo systemctl status mongod
sudo systemctl status redis

# Start if not running
sudo systemctl start mysql
sudo systemctl start mongod
sudo systemctl start redis
```

### Error: "Port 8000 is already in use"
**Solution:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
# Or use different port
uvicorn app.main:app --reload --port 8001
```

### Error: "Angular CLI not found"
**Solution:**
```bash
# Install Angular CLI globally
npm install -g @angular/cli@latest

# Verify installation
ng version
```

## 📞 Getting Help

If you encounter issues:

1. **Check the logs:**
   ```bash
   # Backend logs
   tail -f backend/logs/app.log
   
   # Docker logs
   docker-compose logs -f [service_name]
   ```

2. **Verify prerequisites:**
   ```bash
   python --version  # Should be 3.11+
   node --version    # Should be 18+
   docker --version  # Should be installed
   ```

3. **Test individual components:**
   ```bash
   # Test backend only
   python test_backend.py
   
   # Test frontend only
   cd frontend && ng serve
   ```

4. **Check configuration files:**
   - `backend/.env` - Database connections
   - `frontend/src/environments/environment.ts` - API URLs
   - `docker-compose.yml` - Service configuration
