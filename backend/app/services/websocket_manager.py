import json
import logging
from typing import Dict, Set, Any
from fastapi import WebSocket
from collections import defaultdict

logger = logging.getLogger(__name__)

class WebSocketManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}  # user_id -> WebSocket
        self.channel_subscriptions: Dict[int, Set[int]] = defaultdict(set)  # channel_id -> set of user_ids
        self.user_channels: Dict[int, Set[int]] = defaultdict(set)  # user_id -> set of channel_ids
    
    async def connect(self, websocket: WebSocket, user_id: int):
        """Connect a user's WebSocket"""
        await websocket.accept()
        self.active_connections[user_id] = websocket
        logger.info(f"User {user_id} connected to WebSocket")
    
    def disconnect(self, user_id: int):
        """Disconnect a user's WebSocket"""
        if user_id in self.active_connections:
            del self.active_connections[user_id]
        
        # Remove user from all channel subscriptions
        if user_id in self.user_channels:
            for channel_id in self.user_channels[user_id]:
                self.channel_subscriptions[channel_id].discard(user_id)
            del self.user_channels[user_id]
        
        logger.info(f"User {user_id} disconnected from WebSocket")
    
    def subscribe_to_channel(self, user_id: int, channel_id: int):
        """Subscribe a user to a channel"""
        self.channel_subscriptions[channel_id].add(user_id)
        self.user_channels[user_id].add(channel_id)
        logger.info(f"User {user_id} subscribed to channel {channel_id}")
    
    def unsubscribe_from_channel(self, user_id: int, channel_id: int):
        """Unsubscribe a user from a channel"""
        self.channel_subscriptions[channel_id].discard(user_id)
        self.user_channels[user_id].discard(channel_id)
        logger.info(f"User {user_id} unsubscribed from channel {channel_id}")
    
    async def send_personal_message(self, message: str, user_id: int):
        """Send a message to a specific user"""
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_text(message)
            except Exception as e:
                logger.error(f"Error sending message to user {user_id}: {e}")
                self.disconnect(user_id)
    
    async def broadcast_to_channel(self, channel_id: int, message: Dict[str, Any]):
        """Broadcast a message to all users subscribed to a channel"""
        if channel_id not in self.channel_subscriptions:
            return
        
        message_json = json.dumps(message)
        disconnected_users = []
        
        for user_id in self.channel_subscriptions[channel_id]:
            if user_id in self.active_connections:
                try:
                    await self.active_connections[user_id].send_text(message_json)
                except Exception as e:
                    logger.error(f"Error broadcasting to user {user_id}: {e}")
                    disconnected_users.append(user_id)
            else:
                disconnected_users.append(user_id)
        
        # Clean up disconnected users
        for user_id in disconnected_users:
            self.disconnect(user_id)
    
    async def broadcast_to_organization(self, organization_id: int, message: Dict[str, Any]):
        """Broadcast a message to all users in an organization"""
        # This would need to be implemented based on your organization structure
        # For now, we'll broadcast to all connected users
        message_json = json.dumps(message)
        disconnected_users = []
        
        for user_id, websocket in self.active_connections.items():
            try:
                await websocket.send_text(message_json)
            except Exception as e:
                logger.error(f"Error broadcasting to user {user_id}: {e}")
                disconnected_users.append(user_id)
        
        # Clean up disconnected users
        for user_id in disconnected_users:
            self.disconnect(user_id)
    
    def get_connected_users(self) -> Set[int]:
        """Get all currently connected user IDs"""
        return set(self.active_connections.keys())
    
    def get_channel_subscribers(self, channel_id: int) -> Set[int]:
        """Get all users subscribed to a specific channel"""
        return self.channel_subscriptions.get(channel_id, set())

# Global WebSocket manager instance
websocket_manager = WebSocketManager()
