from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient
from redis import Redis
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

if settings.DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=settings.DEBUG
    )
else:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        echo=settings.DEBUG
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

try:
    mongo_client = MongoClient(settings.MONGODB_URL)
    mongo_db = mongo_client["user-events"]  # Database name: user-events
    logger.info("MongoDB connection established")
except Exception as e:
    logger.error(f"MongoDB connection failed: {e}")
    mongo_client = None
    mongo_db = None

try:
    redis_client = Redis.from_url(settings.REDIS_URL, decode_responses=True)
    redis_client.ping()
    logger.info("Redis connection established")
except Exception as e:
    logger.info("Redis not available - running without caching")
    redis_client = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_mongo_db():
    return mongo_db

def get_redis_client():
    return redis_client
