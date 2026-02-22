export interface User {
  id: string;
  username?: string;
  full_name?: string;
  image?: string | null;
  avatar?: string | null;
  is_active?: string;
  user_type?: 'broker' | 'vendor' | 'admin';
}

export interface Conversation {
  id: string;
  other_user: User;
  created_at: string;
  last_message: {
    message: string;
    text?: string;
    message_id: string;
    timestamp: string;
    sender_id: string;
    is_seen: boolean;
    is_read?: boolean;
  } | null;
}

export interface ApiMessage {
  id: string;
  text: string;
  is_read: boolean;
  timestamp: string;
  sender: User;
}

export interface PaginatedApiResponse<T> {
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'other';
    avatar: string;
    time?: string;
    timestamp: string;
    isSeen?: boolean;
    senderId?: string;
    conversationId?: string;
    senderName?: string;
    status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatUser {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    isOnline?: boolean;
    lastSeen?: string;
    isSeen?: boolean;
    userId?: string;
    userType?: 'broker' | 'vendor' | 'admin';
}

export interface WebSocketMessage {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
