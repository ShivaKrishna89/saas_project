import logging
from datetime import datetime
from typing import Optional, Dict, Any
from pymongo import MongoClient
import pytz
from app.core.config import settings
from app.core.database import get_mongo_db

logger = logging.getLogger(__name__)

class MongoDBLogger:
    def __init__(self):
        self.mongo_db = get_mongo_db()
        if self.mongo_db is not None:
            self.events_collection = self.mongo_db.events  # Single collection for all events
        else:
            self.events_collection = None
            logger.warning("MongoDB not available - logging disabled")
        
        # IST timezone using pytz
        self.ist_timezone = pytz.timezone("Asia/Kolkata")
    
    def _get_ist_now(self):
        """Get current time in IST as a timezone-aware datetime.
        Use proper UTC localization before converting, so Mongo stores the correct instant.
        """
        utc_time = pytz.utc.localize(datetime.utcnow())
        ist_time = utc_time.astimezone(self.ist_timezone)
        return ist_time
    
    async def log_user_activity(
        self, 
        user_id: int, 
        user_name: str, 
        user_email: str, 
        action: str, 
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ):
        """Log user activity to MongoDB"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - skipping user activity log")
            return None
            
        try:
            ist_now = self._get_ist_now()
            # Store as naive datetime (MongoDB treats naive as UTC) with IST wall-clock time
            ist_naive = ist_now.replace(tzinfo=None)
            log_entry = {
                "event_type": "user_activity",
                "user_id": user_id,
                "user_name": user_name,
                "user_email": user_email,
                "action": action,
                "details": details or {},
                "ip_address": ip_address,
                "user_agent": user_agent,
                "timestamp": ist_naive,
                "created_at": ist_naive
            }
            
            result = self.events_collection.insert_one(log_entry)
            logger.info(f"User activity logged: {action} by user {user_id}")
            return result.inserted_id
            
        except Exception as e:
            logger.error(f"Failed to log user activity: {e}")
            return None
    
    async def log_application_event(
        self,
        event_type: str,
        message: str,
        user_id: Optional[int] = None,
        details: Optional[Dict[str, Any]] = None,
        severity: str = "INFO"
    ):
        """Log application events to MongoDB"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - skipping application event log")
            return None
            
        try:
            ist_now = self._get_ist_now()
            ist_naive = ist_now.replace(tzinfo=None)
            log_entry = {
                "event_type": event_type,
                "message": message,
                "user_id": user_id,
                "details": details or {},
                "severity": severity,
                "timestamp": ist_naive,
                "created_at": ist_naive
            }
            
            result = self.events_collection.insert_one(log_entry)
            logger.info(f"Application event logged: {event_type}")
            return result.inserted_id
            
        except Exception as e:
            logger.error(f"Failed to log application event: {e}")
            return None
    
    async def store_chat_message(
        self,
        message_id: int,
        user_id: int,
        user_name: str,
        user_email: str,
        channel_id: int,
        content: str,
        message_type: str = "text",
        attachments: Optional[list] = None,
        reactions: Optional[Dict[str, list]] = None
    ):
        """Store chat message in MongoDB for real-time history"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - skipping chat message storage")
            return None
            
        try:
            ist_now = self._get_ist_now()
            ist_naive = ist_now.replace(tzinfo=None)
            chat_entry = {
                "event_type": "chat_message",
                "message_id": message_id,
                "user_id": user_id,
                "user_name": user_name,
                "user_email": user_email,
                "channel_id": channel_id,
                "content": content,
                "message_type": message_type,
                "attachments": attachments or [],
                "reactions": reactions or {},
                "timestamp": ist_naive,
                "created_at": ist_naive
            }
            
            result = self.events_collection.insert_one(chat_entry)
            logger.info(f"Chat message stored in MongoDB: {message_id}")
            return result.inserted_id
            
        except Exception as e:
            logger.error(f"Failed to store chat message: {e}")
            return None
    
    async def get_user_activity_logs(
        self, 
        user_id: Optional[int] = None, 
        limit: int = 100,
        skip: int = 0
    ):
        """Get user activity logs"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - returning empty activity logs")
            return []
            
        try:
            query = {"event_type": "user_activity"}
            if user_id:
                query["user_id"] = user_id
            cursor = self.events_collection.find(query).sort("timestamp", -1).skip(skip).limit(limit)
            return list(cursor)
        except Exception as e:
            logger.error(f"Failed to get user activity logs: {e}")
            return []
    
    async def get_chat_history(
        self, 
        channel_id: int, 
        limit: int = 50,
        skip: int = 0
    ):
        """Get chat history from MongoDB"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - returning empty chat history")
            return []
            
        try:
            query = {"event_type": "chat_message", "channel_id": channel_id}
            cursor = self.events_collection.find(query).sort("timestamp", -1).skip(skip).limit(limit)
            return list(cursor)
        except Exception as e:
            logger.error(f"Failed to get chat history: {e}")
            return []
    
    async def search_chat_messages(
        self, 
        search_term: str, 
        channel_id: Optional[int] = None,
        user_id: Optional[int] = None,
        limit: int = 50
    ):
        """Search chat messages in MongoDB"""
        if self.events_collection is None:
            logger.warning("MongoDB not available - returning empty search results")
            return []
            
        try:
            query = {
                "event_type": "chat_message",
                "$text": {"$search": search_term}
            }
            
            if channel_id:
                query["channel_id"] = channel_id
            if user_id:
                query["user_id"] = user_id
            
            cursor = self.events_collection.find(query).sort("timestamp", -1).limit(limit)
            return list(cursor)
        except Exception as e:
            logger.error(f"Failed to search chat messages: {e}")
            return []

# Global MongoDB logger instance
mongodb_logger = MongoDBLogger()
