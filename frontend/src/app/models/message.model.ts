export interface Message {
  id: number;
  content: string;
  message_type: 'text' | 'file' | 'image' | 'video' | 'audio';
  is_edited: boolean;
  is_deleted: boolean;
  is_pinned: boolean;
  thread_id?: number;
  reply_to_id?: number;
  attachments?: any[];
  reactions?: { [emoji: string]: number[] };
  user_id: number;
  channel_id: number;
  created_at: string;
  updated_at?: string;
  user?: User;
  reply_to?: Message;
  thread_messages?: Message[];
}

export interface MessageCreate {
  content: string;
  message_type?: string;
  attachments?: any[];
  channel_id: number;
  thread_id?: number;
  reply_to_id?: number;
}

export interface MessageUpdate {
  content?: string;
  attachments?: any[];
}

export interface ReactionUpdate {
  emoji: string;
  action: 'add' | 'remove';
}

export interface User {
  id: number;
  username: string;
  full_name: string;
  avatar_url?: string;
  status: string;
}
