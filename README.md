# Slack-like SaaS Application

A modern, scalable Slack-like messaging platform built with Angular (frontend) and FastAPI (backend).

## Features

### Frontend (Angular)
- 🎨 Modern UI with Angular Material + LESS
- 📱 Responsive design inspired by Slack
- 🔄 Real-time messaging with WebSocket
- 🔍 Advanced search with Elasticsearch
- 👥 User management and team collaboration
- 🔐 JWT-based authentication
- 📊 Analytics dashboard
- 🤖 AI-powered features

### Backend (FastAPI)
- 🚀 High-performance REST APIs
- 🔌 WebSocket endpoints for real-time chat
- 🔐 OAuth2 Password flow with JWT
- 🔍 Elasticsearch integration for fast search
- 📊 MySQL + MongoDB hybrid database
- ⚡ Async processing with Celery/Redis
- 📈 Horizontal scaling support

## Tech Stack

### Frontend
- Angular 17+
- Angular Material
- LESS for styling
- RxJS for reactive programming
- WebSocket for real-time features

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Pydantic for data validation
- WebSocket support
- JWT authentication
- Elasticsearch
- Celery + Redis for async tasks

### Database
- MySQL (primary database)
- MongoDB (for flexible data)
- Redis (caching & sessions)

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Environment-based configuration

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Running with Docker

```bash
# Clone and setup
git clone <repository-url>
cd saas_project

# Start all services
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Elasticsearch: http://localhost:9200

### Local Development

#### Backend Setup
```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
saas_project/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configurations
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── alembic/            # Database migrations
│   └── tests/              # Backend tests
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # UI components
│   │   │   ├── services/   # API services
│   │   │   ├── models/     # TypeScript models
│   │   │   └── shared/     # Shared modules
│   │   ├── assets/         # Static assets
│   │   └── styles/         # LESS styles
│   └── tests/              # Frontend tests
├── docker-compose.yml      # Docker services
└── README.md              # This file
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

The application is designed for horizontal scaling and can be deployed to:
- Kubernetes
- AWS ECS
- Google Cloud Run
- Azure Container Instances

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
