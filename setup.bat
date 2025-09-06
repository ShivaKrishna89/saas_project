@echo off
echo 🚀 Setting up Slack-like SaaS Application...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker found

REM Create .env file for backend if it doesn't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    copy "backend\env.example" "backend\.env"
    echo ✅ Backend .env file created
)

REM Build and start all services
echo 🐳 Building and starting all services with Docker Compose...
docker-compose up --build -d

echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

echo ✅ All services are running!
echo.
echo 🌐 Application URLs:
echo    Frontend: http://localhost:4200
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo 📊 Service Status:
docker-compose ps
echo.
echo 📝 To view logs: docker-compose logs -f [service_name]
echo 📝 To stop: docker-compose down
pause
