from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Slack-like SaaS"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database - Using SQLite for development (no setup required)
    DATABASE_URL: str = "sqlite:///./slack_saas.db"
    MONGODB_URL: str = "mongodb+srv://pallewarshiva:krishkrish@cluster0.cjlomlw.mongodb.net/fastAPI?retryWrites=true&w=majority"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://localhost:9200"
    
    # CORS - Fixed to include specific origins
    ALLOWED_HOSTS: List[str] = [
        "http://localhost:4200",
        "http://127.0.0.1:4200", 
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"  # Allow all origins in development
    ]
    
    # File upload
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Email (for notifications)
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    # WebSocket
    WS_MESSAGE_QUEUE_SIZE: int = 100
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # OAuth (Google)
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/google/callback"
    OAUTH_FRONTEND_SUCCESS: str = "http://localhost:4200/auth/callback"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
