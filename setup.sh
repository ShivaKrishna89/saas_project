#!/bin/bash

echo "🚀 Setting up Slack-like SaaS Application..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp backend/env.example backend/.env
    echo "✅ Backend .env file created"
fi

# Build and start all services
echo "🐳 Building and starting all services with Docker Compose..."
docker-compose up --build -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "✅ All services are running!"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:4200"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "📊 Service Status:"
docker-compose ps
echo ""
echo "📝 To view logs: docker-compose logs -f [service_name]"
echo "📝 To stop: docker-compose down"
