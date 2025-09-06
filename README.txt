================================================================================
                    SLACK-LIKE SAAS APPLICATION
================================================================================

A modern Slack-like messaging platform built with Angular (Frontend) and FastAPI (Backend)

================================================================================
                                FEATURES
================================================================================

✅ Real-time messaging with WebSocket support
✅ Channel-based communication
✅ User authentication (JWT-based)
✅ File attachments and message reactions
✅ Search functionality (Elasticsearch)
✅ Modern UI with Angular Material
✅ Responsive design
✅ Multi-database support (MySQL + MongoDB)

================================================================================
                            PREREQUISITES
================================================================================

1. Python 3.11+ installed
2. Node.js 18+ installed
3. Docker Desktop installed (for Docker setup)
4. MySQL server running (for manual setup)
5. Redis server running (for manual setup)

================================================================================
                            DATABASE CONFIGURATION
================================================================================

Your application is configured with:

MySQL (Local):
- URL: mysql+pymysql://root:secret@localhost:3306/local
- Database: local
- Username: root
- Password: secret

MongoDB (Cloud - Atlas):
- URL: mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/
- Type: MongoDB Atlas (Cloud)
- Username: pallewarshiva
- Password: krishkrish

================================================================================
                            QUICK START
================================================================================

OPTION 1: DOCKER SETUP (RECOMMENDED - EASIEST)

1. Open Command Prompt/PowerShell
2. Navigate to project directory:
   cd C:\Users\palle\projects\saas\saas_project

3. Run the Windows setup script:
   setup.bat

4. Wait for all services to start (about 30-60 seconds)

5. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

================================================================================
                            MANUAL SETUP
================================================================================

STEP 1: BACKEND SETUP (FASTAPI)

1. Open Command Prompt/PowerShell
2. Navigate to backend directory:
   cd backend

3. Create Python virtual environment:
   python -m venv venv

4. Activate virtual environment:
   venv\Scripts\activate

5. Install Python dependencies:
   pip install -r requirements.txt

6. Create .env file in backend directory with this content:
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

7. Start your local services:
   - Make sure MySQL is running on localhost:3306
   - Make sure Redis is running on localhost:6379

8. Run FastAPI backend:
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

9. Verify backend is running:
   - Open browser: http://localhost:8000/docs
   - You should see FastAPI interactive documentation

STEP 2: FRONTEND SETUP (ANGULAR)

1. Open a NEW Command Prompt/PowerShell window
2. Navigate to frontend directory:
   cd frontend

3. Install Angular CLI globally (if not already installed):
   npm install -g @angular/cli

4. Install frontend dependencies:
   npm install

5. Run Angular development server:
   ng serve --open

6. Verify frontend is running:
   - Browser should automatically open to http://localhost:4200
   - You should see the Slack-like application interface

================================================================================
                            DATABASE SETUP
================================================================================

MYSQL SETUP (Local):

1. Make sure MySQL server is running
2. Create database if it doesn't exist:
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

3. Verify connection:
   mysql -u root -p -e "USE local; SHOW TABLES;"

MONGODB SETUP (Cloud):

1. MongoDB Atlas is already configured
2. Connection string: mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/
3. No additional setup required

REDIS SETUP (Local):

1. Start Redis server:
   redis-server

2. Test connection:
   redis-cli ping
   (Should return: PONG)

================================================================================
                            TESTING
================================================================================

TEST BACKEND:

1. From project root directory:
   python test_backend.py

2. This will test:
   - All Python imports
   - Database connections
   - FastAPI application startup

TEST DATABASE CONNECTIONS:

1. Test MySQL:
   mysql -u root -p -e "SELECT 1;" local

2. Test Redis:
   redis-cli ping

3. Test MongoDB (if mongo shell is installed):
   mongo "mongodb+srv://cluster0.cjlomlw.mongodb.net/" --username pallewarshiva --eval "db.adminCommand('ping')"

TEST FRONTEND:

1. Navigate to frontend directory:
   cd frontend

2. Run development server:
   ng serve --port 4200

3. Open browser: http://localhost:4200

================================================================================
                            USEFUL COMMANDS
================================================================================

DOCKER COMMANDS:

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# View running containers
docker-compose ps

BACKEND COMMANDS:

# Run FastAPI
 

# Run with specific host
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Celery worker
celery -A app.celery_app worker --loglevel=info

# Run Celery beat
celery -A app.celery_app beat --loglevel=info

FRONTEND COMMANDS:

# Run Angular dev server
ng serve

# Run with specific port
ng serve --port 4201

# Build for production
ng build --prod

# Run tests
ng test

# Run linting
ng lint

================================================================================
                            TESTING
================================================================================

TEST BACKEND:

1. From project root directory:
   python test_simple.py

2. This will test:
   - All Python imports
   - FastAPI application startup
   - API routes configuration
   - No database connections required

TEST FRONTEND:

1. Navigate to frontend directory:
   cd frontend

2. Test build process:
   ng build

3. Test development server:
   ng serve --port 4200

4. Open browser: http://localhost:4200

TEST DATABASE CONNECTIONS (Optional):

1. Test MySQL:
   mysql -u root -p -e "SELECT 1;" local

2. Test Redis:
   redis-cli ping

3. Test MongoDB (if mongo shell is installed):
   mongo "mongodb+srv://cluster0.cjlomlw.mongodb.net/" --username pallewarshiva --eval "db.adminCommand('ping')"

================================================================================
                            TROUBLESHOOTING
================================================================================

COMMON ISSUES:

1. PORT ALREADY IN USE:
   - Kill process on port: npx kill-port 8000 4200
   - Or use different ports: ng serve --port 4201

2. DATABASE CONNECTION ERROR:
   - Check if MySQL/Redis are running
   - Verify connection strings in .env file
   - Check firewall settings

3. NODE MODULES ISSUES:
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install

4. PYTHON VIRTUAL ENVIRONMENT ISSUES:
   rm -rf venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt

5. ANGULAR CLI NOT FOUND:
   npm install -g @angular/cli@latest

6. DOCKER ISSUES:
   - Make sure Docker Desktop is running
   - Check if ports 8000, 4200, 3306, 6379 are available
   - Restart Docker Desktop if needed

7. POWERSHELL EXECUTION POLICY ISSUES:
   - Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   - This allows npm and Angular CLI to run properly

8. PYTHON DEPENDENCY INSTALLATION ISSUES:
   - If you get Rust compilation errors for pydantic-core:
     pip install --upgrade pip
     pip install pydantic-core --no-build-isolation
   - For cryptography issues: pip install cryptography

9. ANGULAR WORKSPACE ISSUES:
   - Make sure you're in the frontend directory when running ng commands
   - Error: "This command is not available when running the Angular CLI outside a workspace"
   - Solution: cd frontend before running ng serve

ERROR SOLUTIONS:

"ModuleNotFoundError: No module named 'app'":
   - Make sure you're in the backend directory
   - Activate virtual environment: venv\Scripts\activate
   - Run: uvicorn app.main:app --reload --port 8000

"Database connection failed":
   - Check if MySQL is running: net start mysql
   - Check if Redis is running: redis-server
   - Verify .env file exists and has correct credentials

"Angular CLI not found":
   - Install globally: npm install -g @angular/cli
   - Verify: ng version

"Redis connection failed":
   - This is expected if Redis is not running locally
   - Use Docker or install Redis locally
   - For testing without Redis, use: python test_simple.py

"MySQL connection failed":
   - This is expected if MySQL is not running locally
   - Use Docker or install MySQL locally
   - For testing without MySQL, use: python test_simple.py

"TypeScript configuration errors":
   - Missing tsconfig files: Create tsconfig.json, tsconfig.app.json, tsconfig.spec.json
   - Missing test.ts and polyfills.ts: Create these files in src directory

"Angular build errors":
   - Missing components: Simplify app.module.ts to only include existing components
   - Import errors: Check component paths and fix imports
   - Build successful: Application is ready for development

================================================================================
                            SUCCESS INDICATORS
================================================================================

✅ BACKEND RUNNING:
   - http://localhost:8000/docs shows FastAPI documentation
   - http://localhost:8000/health returns {"status": "healthy"}

✅ FRONTEND RUNNING:
   - http://localhost:4200 loads the application
   - No console errors in browser developer tools
   - Angular Material components render correctly

✅ DATABASE CONNECTED:
   - MySQL connection established to local database
   - MongoDB connection established to Atlas cluster
   - Redis connection established for caching

✅ WEBSOCKET WORKING:
   - Real-time features function properly
   - No WebSocket connection errors

================================================================================
                            VERIFICATION & TESTING
================================================================================

TEST RESULTS SUMMARY:

✅ BACKEND VERIFICATION:
   - All Python modules import successfully
   - FastAPI app starts without errors
   - All API routes configured correctly
   - Dependencies installed and working
   - Test script: python test_simple.py

✅ FRONTEND VERIFICATION:
   - Angular application builds successfully
   - Development server runs on http://localhost:4200
   - All components compile without errors
   - TypeScript configuration working
   - Angular Material components rendering

✅ DEPENDENCIES VERIFIED:
   Backend:
   - FastAPI 0.116.1 ✅
   - SQLAlchemy 2.0.23 ✅
   - PyMySQL 1.1.0 ✅
   - PyMongo 4.6.0 ✅
   - Redis 6.4.0 ✅
   - Elasticsearch 9.1.0 ✅
   - Python-Jose 3.3.0 ✅
   - Passlib 1.7.4 ✅
   - Cryptography 45.0.6 ✅

   Frontend:
   - Angular 17.3.12 ✅
   - Angular Material 17.3.10 ✅
   - Angular CLI 17.3.17 ✅
   - TypeScript 5.2.2 ✅
   - RxJS 7.8.2 ✅

================================================================================
                            PROJECT STRUCTURE
================================================================================

saas_project/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Configuration, database, security
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend Docker configuration
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/           # Angular components, services
│   │   ├── environments/  # Environment configuration
│   │   └── styles.less    # Global styles
│   ├── package.json       # Node.js dependencies
│   └── Dockerfile         # Frontend Docker configuration
├── docker-compose.yml     # Docker services orchestration
├── setup.bat             # Windows setup script
├── setup.sh              # Linux/Mac setup script
└── README.txt            # This file

================================================================================
                            API ENDPOINTS
================================================================================

AUTHENTICATION:
- POST /api/v1/auth/register - Register new user
- POST /api/v1/auth/login - User login
- GET /api/v1/auth/me - Get current user
- POST /api/v1/auth/refresh - Refresh token

USERS:
- GET /api/v1/users/ - Get all users
- GET /api/v1/users/{user_id} - Get specific user
- PUT /api/v1/users/me - Update current user

ORGANIZATIONS:
- POST /api/v1/organizations/ - Create organization
- GET /api/v1/organizations/ - Get user organizations
- GET /api/v1/organizations/{org_id} - Get specific organization

CHANNELS:
- POST /api/v1/channels/ - Create channel
- GET /api/v1/channels/ - Get organization channels
- GET /api/v1/channels/{channel_id} - Get specific channel

MESSAGES:
- POST /api/v1/messages/ - Create message
- GET /api/v1/messages/channel/{channel_id} - Get channel messages
- PUT /api/v1/messages/{message_id} - Update message
- DELETE /api/v1/messages/{message_id} - Delete message

WEBSOCKET:
- WS /api/v1/ws/{token} - Real-time messaging

SEARCH:
- GET /api/v1/search/messages - Search messages
- GET /api/v1/search/users - Search users
- GET /api/v1/search/channels - Search channels

================================================================================
                            ENVIRONMENT VARIABLES
================================================================================

Backend (.env file):
- APP_NAME - Application name
- SECRET_KEY - JWT secret key
- DATABASE_URL - MySQL connection string
- MONGODB_URL - MongoDB connection string
- REDIS_URL - Redis connection string
- ELASTICSEARCH_URL - Elasticsearch URL
- DEBUG - Debug mode (true/false)

Frontend (environment.ts):
- apiUrl - Backend API URL
- wsUrl - WebSocket URL
- production - Production mode flag

================================================================================
                            DEPLOYMENT
================================================================================

PRODUCTION CONSIDERATIONS:

1. Change SECRET_KEY to a secure random string
2. Set DEBUG=false in production
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Configure proper database credentials
6. Set up monitoring and logging
7. Configure backup strategies
8. Set up CI/CD pipelines

DOCKER PRODUCTION:

1. Build production images:
   docker-compose -f docker-compose.prod.yml up --build

2. Use production environment variables
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Configure database backups

================================================================================
                            SUPPORT
================================================================================

If you encounter issues:

1. Check the logs:
   - Backend: docker-compose logs -f backend
   - Frontend: docker-compose logs -f frontend

2. Verify prerequisites:
   - Python 3.11+: python --version
   - Node.js 18+: node --version
   - Docker: docker --version

3. Test individual components:
   - Backend: python test_simple.py
   - Frontend: cd frontend && ng serve
   - Frontend build: cd frontend && ng build

4. Check configuration files:
   - backend/.env - Database connections
   - frontend/src/environments/environment.ts - API URLs
   - docker-compose.yml - Service configuration

5. Common solutions:
   - Restart Docker Desktop
   - Clear npm cache: npm cache clean --force
   - Recreate virtual environment
   - Check firewall/antivirus settings

================================================================================
                            VERSION INFO
================================================================================

- Backend: FastAPI with Python 3.11+
- Frontend: Angular 17+ with Angular Material
- Database: MySQL 8.0 + MongoDB Atlas
- Cache: Redis 7
- Search: Elasticsearch 8.11
- Container: Docker & Docker Compose
- Reverse Proxy: Nginx

================================================================================
                            LICENSE
================================================================================

This project is for educational and development purposes.
Modify and use according to your needs.

================================================================================
                            CONTACT
================================================================================

For support or questions, refer to the troubleshooting section above.

================================================================================
