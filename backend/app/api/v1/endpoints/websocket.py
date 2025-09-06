import json
import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from app.core.security import verify_token
from app.services.websocket_manager import websocket_manager

logger = logging.getLogger(__name__)
router = APIRouter()

@router.websocket("/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    """WebSocket endpoint for real-time messaging"""
    try:
        # Verify token and get user_id
        payload = verify_token(token)
        if not payload:
            await websocket.close(code=4001, reason="Invalid token")
            return
        
        user_id = int(payload.get("sub"))
        if not user_id:
            await websocket.close(code=4001, reason="Invalid token")
            return
        
        # Connect to WebSocket
        await websocket_manager.connect(websocket, user_id)
        
        # Send connection confirmation
        await websocket.send_text(json.dumps({
            "type": "connection_established",
            "data": {"user_id": user_id}
        }))
        
        try:
            while True:
                # Receive message from client
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # Handle different message types
                await handle_websocket_message(user_id, message)
                
        except WebSocketDisconnect:
            websocket_manager.disconnect(user_id)
        except Exception as e:
            logger.error(f"WebSocket error for user {user_id}: {e}")
            websocket_manager.disconnect(user_id)
            
    except Exception as e:
        logger.error(f"WebSocket connection error: {e}")
        await websocket.close(code=4000, reason="Connection error")

async def handle_websocket_message(user_id: int, message: dict):
    """Handle incoming WebSocket messages"""
    message_type = message.get("type")
    
    if message_type == "subscribe_channel":
        channel_id = message.get("data", {}).get("channel_id")
        if channel_id:
            websocket_manager.subscribe_to_channel(user_id, channel_id)
            # Send confirmation
            await websocket_manager.send_personal_message(
                json.dumps({
                    "type": "channel_subscribed",
                    "data": {"channel_id": channel_id}
                }),
                user_id
            )
    
    elif message_type == "unsubscribe_channel":
        channel_id = message.get("data", {}).get("channel_id")
        if channel_id:
            websocket_manager.unsubscribe_from_channel(user_id, channel_id)
            # Send confirmation
            await websocket_manager.send_personal_message(
                json.dumps({
                    "type": "channel_unsubscribed",
                    "data": {"channel_id": channel_id}
                }),
                user_id
            )
    
    elif message_type == "typing_start":
        channel_id = message.get("data", {}).get("channel_id")
        if channel_id:
            # Broadcast typing indicator to channel
            await websocket_manager.broadcast_to_channel(
                channel_id,
                {
                    "type": "user_typing",
                    "data": {
                        "user_id": user_id,
                        "channel_id": channel_id,
                        "action": "start"
                    }
                }
            )
    
    elif message_type == "typing_stop":
        channel_id = message.get("data", {}).get("channel_id")
        if channel_id:
            # Broadcast typing stop to channel
            await websocket_manager.broadcast_to_channel(
                channel_id,
                {
                    "type": "user_typing",
                    "data": {
                        "user_id": user_id,
                        "channel_id": channel_id,
                        "action": "stop"
                    }
                }
            )
    
    elif message_type == "ping":
        # Respond to ping with pong
        await websocket_manager.send_personal_message(
            json.dumps({"type": "pong"}),
            user_id
        )
    
    else:
        logger.warning(f"Unknown WebSocket message type: {message_type}")
