# Backend Setup Instructions

## Prerequisites
- Python 3.11+
- MySQL server running
- MongoDB server running  
- Redis server running

## Step 1: Install Python Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Step 2: Configure Environment Variables

```bash
# Copy the example environment file
cp env.example .env

# Edit .env file with your database credentials
# Update these values:
# DATABASE_URL=mysql+pymysql://username:password@localhost:3306/slack_saas
# MONGODB_URL=mongodb://localhost:27017/slack_saas
# REDIS_URL=redis://localhost:6379/0
```

## Step 3: Database Setup

### MySQL Setup
```sql
CREATE DATABASE slack_saas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'slack_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON slack_saas.* TO 'slack_user'@'localhost';
FLUSH PRIVILEGES;
```

### MongoDB Setup
```bash
# Start MongoDB (if not already running)
mongod

# Create database (will be created automatically when first accessed)
```

### Redis Setup
```bash
# Start Redis (if not already running)
redis-server
```

## Step 4: Run FastAPI Backend

```bash
# Make sure you're in the backend directory with venv activated
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Step 5: Verify Backend is Running

- Open browser: http://localhost:8000/docs
- You should see the FastAPI interactive documentation
- Test the health endpoint: http://localhost:8000/health

## Troubleshooting

### Common Issues:
1. **Database Connection Error**: Check your DATABASE_URL in .env
2. **Port Already in Use**: Change port in uvicorn command
3. **Missing Dependencies**: Run `pip install -r requirements.txt` again

### Useful Commands:
```bash
# Check if all services are running
mysql -u root -p -e "SHOW DATABASES;"
mongo --eval "db.adminCommand('listDatabases')"
redis-cli ping

# View logs
tail -f logs/app.log
```
