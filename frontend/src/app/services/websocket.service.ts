import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface WebSocketMessage {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<WebSocketMessage>();
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  
  public messages$ = this.messageSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor(private authService: AuthService) {}

  connect(): void {
    const token = this.authService.token;
    if (!token) {
      console.error('No authentication token available');
      return;
    }

    const wsUrl = environment.wsUrl.replace('http', 'ws');
    this.socket = new WebSocket(`${wsUrl}/${token}`);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.connectionStatusSubject.next(true);
    };

    this.socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.messageSubject.next(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.connectionStatusSubject.next(false);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (this.authService.isAuthenticated()) {
          this.connect();
        }
      }, 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionStatusSubject.next(false);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: WebSocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  subscribeToChannel(channelId: number): void {
    this.sendMessage({
      type: 'subscribe_channel',
      data: { channel_id: channelId }
    });
  }

  unsubscribeFromChannel(channelId: number): void {
    this.sendMessage({
      type: 'unsubscribe_channel',
      data: { channel_id: channelId }
    });
  }

  startTyping(channelId: number): void {
    this.sendMessage({
      type: 'typing_start',
      data: { channel_id: channelId }
    });
  }

  stopTyping(channelId: number): void {
    this.sendMessage({
      type: 'typing_stop',
      data: { channel_id: channelId }
    });
  }

  ping(): void {
    this.sendMessage({
      type: 'ping',
      data: {}
    });
  }

  // Helper methods for specific message types
  onNewMessage(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'new_message')
    );
  }

  onMessageUpdated(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'message_updated')
    );
  }

  onMessageDeleted(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'message_deleted')
    );
  }

  onReactionUpdated(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'reaction_updated')
    );
  }

  onUserTyping(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'user_typing')
    );
  }

  onConnectionEstablished(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'connection_established')
    );
  }

  onChannelSubscribed(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'channel_subscribed')
    );
  }

  onChannelUnsubscribed(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'channel_unsubscribed')
    );
  }

  onPong(): Observable<WebSocketMessage> {
    return this.messages$.pipe(
      filterMessages(message => message.type === 'pong')
    );
  }
}

// Helper function for filtering observables
function filterMessages<T>(predicate: (value: T) => boolean) {
  return (source: Observable<T>) => source.pipe(
    filter(predicate)
  );
}
