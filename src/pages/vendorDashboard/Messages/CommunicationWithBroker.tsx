/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentToken } from '@/redux/features/auth/authSlice';
import { useGetAllMessagesQuery } from '@/redux/features/message/getAllMessagesApi';
import { useGetSingleUserMessageQuery } from '@/redux/features/message/getSingleUserMessageApi';
import { useAppSelector } from '@/redux/hook';
import { Check, CheckCheck, Clock, Menu, MoreVertical, Plus, RefreshCw, Search, SendHorizontal, Smile, Wifi, WifiOff, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Conversation {
  id: string;
  other_user: {
    id: string;
    full_name: string;
    image: string | null;
    is_active: string;
  };
  created_at: string;
  last_message: {
    message: string;
    message_id: string;
    timestamp: string;
    sender_id: string;
    is_seen: boolean;
  } | null;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  isOnline?: boolean;
  lastSeen?: string;
  isSeen?: boolean;
  userId?: string;
}

interface Message {
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

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

interface ApiMessage {
  id: string;
  text: string;
  is_read: boolean;
  timestamp: string;
  sender: {
    id: string;
    username: string;
    avatar: string | null;
  };
}

interface PaginatedApiResponse {
  next: string | null;
  previous: string | null;
  results: ApiMessage[];
}

const CommunicationWithBroker: React.FC = () => {
  const [messageInput, setMessageInput] = useState('');
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'vendor' | 'admin'>('chat');
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newConversations, setNewConversations] = useState<Conversation[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const [currentUserId, setCurrentUserId] = useState<string>('');
  console.log(setNewConversations)

  const location = useLocation();
  const { res: initialConversation } = location.state || {};
  const token = useAppSelector(useCurrentToken);

  // Fetch all conversations
  const {
    data: conversationsData,
    isLoading: isLoadingConversations
  } = useGetAllMessagesQuery(undefined, {
    skip: !token,
  });

  // Fetch single user messages
  const {
    data: singleUserMessagesData,
    refetch: refetchSingleUserMessages,
    isLoading: isLoadingSingleMessages
  } = useGetSingleUserMessageQuery(selectedChat?.id || '', {
    skip: !selectedChat?.id || !token,
  });

  const socketRef = useRef<WebSocket | null>(null);
  const newConversationSocketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current user ID from local storage or token
  useEffect(() => {
    console.log('🔑 Token:', token ? 'Present' : 'Missing');
    
    // First, check localStorage
    const storedUserId = localStorage.getItem('currentUserId');
    if (storedUserId) {
      console.log('✅ Using User ID from localStorage:', storedUserId);
      setCurrentUserId(storedUserId);
      return;
    }
    
    // If not in localStorage, try to extract from token
    if (token) {
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('🔍 Token payload:', payload);
          
          // Try different possible keys for user ID
          const userId = payload.user_id || payload.userId || payload.sub || payload.id || '';
          if (userId) {
            console.log('✅ Extracted User ID from token:', userId);
            setCurrentUserId(userId);
            localStorage.setItem('currentUserId', userId);
          } else {
            console.error('❌ No user ID found in token payload');
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    
    // If still no ID, manually set based on your actual user
    // Check which user you are by looking at your API response
    if (!currentUserId) {
      console.warn('⚠️ No user ID found, please manually set YOUR_USER_ID below');
      // Manually set your user ID here based on which user you are
      // If you are "broker" user:
      // const YOUR_USER_ID = 'f03b0e80-7b74-4304-b444-1401367aa090';
      // If you are "Md.Shishir" user:
      // const YOUR_USER_ID = 'e30feddb-d33a-4062-8275-88b576fb9f66';
      // setCurrentUserId(YOUR_USER_ID);
      // localStorage.setItem('currentUserId', YOUR_USER_ID);
    }
  }, [token, currentUserId]);

  // Activity tracking
  const updateActivityTime = () => {
    setLastActivityTime(Date.now());
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupWebSockets();
    };
  }, []);

  // Load conversations from API
  useEffect(() => {
    if (conversationsData) {
      let conversationsArray: Conversation[] = [];

      if (Array.isArray(conversationsData)) {
        conversationsArray = conversationsData;
      } else if (conversationsData.results && Array.isArray(conversationsData.results)) {
        conversationsArray = conversationsData.results;
      } else if (conversationsData.data && Array.isArray(conversationsData.data)) {
        conversationsArray = conversationsData.data;
      }

      setConversations(conversationsArray);

      if (initialConversation) {
        const chatUser = convertConversationToChatUser(initialConversation);
        setSelectedChat(chatUser);
      } else if (!selectedChat && conversationsArray.length > 0) {
        const firstChat = conversationsArray[0];
        const chatUser = convertConversationToChatUser(firstChat);
        setSelectedChat(chatUser);
      }
    }
  }, [conversationsData, selectedChat, initialConversation]);

  // Load single user messages when chat is selected
  useEffect(() => {
    if (selectedChat?.id && singleUserMessagesData && currentUserId) {
      console.log('📥 Loading messages with currentUserId:', currentUserId);
      console.log('📊 Single User Messages Data:', singleUserMessagesData);
      loadMessagesFromApi(singleUserMessagesData);
    }
  }, [selectedChat?.id, singleUserMessagesData, currentUserId]);

  // Connect to WebSocket when chat is selected
  useEffect(() => {
    if (selectedChat?.id && token && currentUserId) {
      console.log('🔗 Connecting WebSocket with User ID:', currentUserId);
      cleanupWebSockets();
      connectToConversation(selectedChat.id);
    }

    return () => {
      cleanupWebSockets();
    };
  }, [selectedChat?.id, token, currentUserId]);

  // Keep connection alive
  useEffect(() => {
    const activityCheck = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      if (timeSinceLastActivity > 30000 && isConnected && socketRef.current?.readyState === WebSocket.OPEN) {
        sendPing();
      }
    }, 10000);

    return () => {
      clearInterval(activityCheck);
    };
  }, [lastActivityTime, isConnected]);

  // Convert conversation to chat user
  const convertConversationToChatUser = (conversation: Conversation): ChatUser => {
    const otherUser = conversation.other_user;
    const lastSeen = conversation.other_user.is_active === 'offline'
      ? conversation.other_user.is_active
      : 'online';

    return {
      id: conversation.id,
      name: otherUser.full_name,
      avatar: otherUser.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      message: conversation.last_message?.message || 'Start a conversation',
      time: conversation.last_message
        ? formatTime(conversation.last_message.timestamp)
        : formatTime(conversation.created_at),
      isOnline: otherUser.is_active === 'online',
      lastSeen: lastSeen,
      isSeen: conversation.last_message?.is_seen || false,
      userId: otherUser.id,
    };
  };

  // Format time helper
  const formatTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  // Format time for message display
  const formatMessageTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  // Load messages from API response
  const loadMessagesFromApi = (apiResponse: PaginatedApiResponse | any) => {
    if (!apiResponse || !selectedChat || !currentUserId) {
      console.log('❌ Cannot load messages: Missing data');
      return;
    }

    console.log('📊 API Response:', apiResponse);
    console.log('👤 Current User ID:', currentUserId);
    console.log('👥 Chat User ID:', selectedChat.userId);

    let messagesArray: ApiMessage[] = [];

    if (apiResponse.results && Array.isArray(apiResponse.results)) {
      messagesArray = apiResponse.results;
    } else if (Array.isArray(apiResponse)) {
      messagesArray = apiResponse;
    } else {
      setIsLoadingMessages(false);
      return;
    }

    console.log(`📨 Found ${messagesArray.length} messages to process`);

    // Debug: Show all sender IDs to help identify which is yours
    const uniqueSenderIds = [...new Set(messagesArray.map(msg => msg.sender.id))];
    console.log('🔍 Unique Sender IDs in conversation:', uniqueSenderIds);
    console.log('🔍 Current User ID for comparison:', currentUserId);

    const formattedMessages: Message[] = messagesArray.map((msg: ApiMessage, index: number) => {
      // Get sender ID from message
      const senderId = msg.sender?.id;
      
      // DEBUG: Log detailed comparison
      console.log(`Message ${index + 1} Comparison:`, {
        text: msg.text.substring(0, 30) + '...',
        messageSenderId: senderId,
        currentUserId: currentUserId,
        isEqual: senderId === currentUserId,
        senderUsername: msg.sender?.username
      });

      // Determine if this message is from current user
      const isUserMessage = senderId === currentUserId;
      
      console.log(`Message ${index + 1} Alignment:`, {
        text: msg.text.substring(0, 30) + '...',
        sender: msg.sender?.username,
        isUserMessage: isUserMessage,
        side: isUserMessage ? 'RIGHT' : 'LEFT'
      });

      // Avatars - Use appropriate avatar based on sender
      const yourAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop';
      const otherAvatar = selectedChat.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop';

      return {
        id: msg.id,
        text: msg.text,
        sender: isUserMessage ? 'user' : 'other', // CRITICAL: 'user' = RIGHT side, 'other' = LEFT side
        avatar: isUserMessage ? yourAvatar : otherAvatar,
        time: formatMessageTime(msg.timestamp),
        timestamp: msg.timestamp,
        isSeen: msg.is_read,
        senderId: senderId,
        senderName: msg.sender?.username,
        conversationId: selectedChat.id,
        status: isUserMessage ? (msg.is_read ? 'read' : 'sent') : undefined,
      };
    });

    // Sort by timestamp (oldest to newest)
    formattedMessages.sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Log final distribution for debugging
    const userMessages = formattedMessages.filter(m => m.sender === 'user').length;
    const otherMessages = formattedMessages.filter(m => m.sender === 'other').length;
    
    console.log('✅ Final message distribution:', {
      total: formattedMessages.length,
      userMessages: userMessages,
      otherMessages: otherMessages,
      userSide: 'RIGHT (Your messages)',
      otherSide: 'LEFT (Other\'s messages)'
    });

    console.log('📋 All messages with alignment:');
    formattedMessages.forEach((msg, index) => {
      console.log(`${index + 1}. "${msg.text.substring(0, 20)}..." - ${msg.senderName} - ${msg.sender === 'user' ? 'RIGHT (Your)' : 'LEFT (Other\'s)'}`);
    });

    setMessages(formattedMessages);
    setIsLoadingMessages(false);
  };

  // Send ping to keep connection alive
  const sendPing = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      try {
        socketRef.current.send(JSON.stringify({ type: 'ping' }));
        console.log('📡 Ping sent');
      } catch (error) {
        console.error('Error sending ping:', error);
      }
    }
  };

  // Setup ping interval
  const setupPingInterval = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }

    pingIntervalRef.current = setInterval(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        sendPing();
      }
    }, 25000);
  };

  // Cleanup WebSocket connections
  const cleanupWebSockets = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }

    if (socketRef.current) {
      try {
        socketRef.current.close(1000, 'Closing connection');
      } catch (error) {
        console.error('Error closing WebSocket:', error);
      }
      socketRef.current = null;
    }

    if (newConversationSocketRef.current) {
      try {
        newConversationSocketRef.current.close();
      } catch (error) {
        console.log(error);
      }
      newConversationSocketRef.current = null;
    }

    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  // Connect to WebSocket
  const connectToConversation = useCallback((conversationId: string) => {
    if (!conversationId || !token || !currentUserId) {
      console.log('❌ Missing data for WebSocket connection');
      return;
    }

    cleanupWebSockets();

    setConnectionStatus('connecting');
    setConnectionError('');
    setReconnectAttempts(0);

    const wsUrl = `wss://broker360re.com/ws/conversation/${conversationId}/?token=${token}`;
    console.log('🔗 Connecting to WebSocket:', wsUrl);

    try {
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('✅ WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        setConnectionError('');
        setReconnectAttempts(0);

        setupPingInterval();
        updateActivityTime();
      };

      socket.onmessage = (event) => {
        updateActivityTime();

        try {
          let data: WebSocketMessage;
          if (typeof event.data === 'string') {
            data = JSON.parse(event.data);
          } else {
            const decoder = new TextDecoder();
            data = JSON.parse(decoder.decode(event.data));
          }

          console.log('📨 WebSocket message:', data);

          if (data.type === 'pong') {
            return;
          }

          switch (data.type) {
            case 'chat_message':
              handleChatMessage(data);
              break;
            case 'user_status':
              handleUserStatus(data);
              break;
            case 'message_seen':
              handleMessageSeen(data);
              break;
            case 'error':
              handleError(data);
              break;
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setConnectionStatus('error');
        setConnectionError('Connection error');
        setIsConnected(false);
      };

      socket.onclose = (event) => {
        console.log(`🔌 WebSocket closed: Code ${event.code}, Reason: ${event.reason}`);
        setIsConnected(false);
        setConnectionStatus('disconnected');

        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = null;
        }

        if (event.code !== 1000 && event.code !== 1001) {
          scheduleReconnect(conversationId);
        }
      };

    } catch (error) {
      console.error('❌ Failed to create WebSocket:', error);
      setConnectionStatus('error');
      setConnectionError('Failed to connect');
      scheduleReconnect(conversationId);
    }
  }, [token, currentUserId]);

  // Schedule reconnection
  const scheduleReconnect = (conversationId: string) => {
    if (reconnectAttempts >= 5) {
      console.log('Max reconnection attempts reached');
      setConnectionError('Unable to connect. Please refresh.');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
    console.log(`🔄 Reconnecting in ${delay/1000}s (Attempt ${reconnectAttempts + 1})`);

    reconnectTimerRef.current = setTimeout(() => {
      setReconnectAttempts(prev => prev + 1);
      connectToConversation(conversationId);
    }, delay);
  };

  // Manual reconnect
  const manualReconnect = () => {
    if (selectedChat?.id) {
      cleanupWebSockets();
      setReconnectAttempts(0);
      connectToConversation(selectedChat.id);
    }
  };

  // Handle incoming chat message
  const handleChatMessage = (data: WebSocketMessage) => {
    if (!currentUserId) {
      console.error('❌ Cannot handle message: currentUserId not set');
      return;
    }

    // Get sender ID from WebSocket data
    const senderId = data.sender?.id;
    const isUserMessage = senderId === currentUserId;
    
    console.log('📨 Processing incoming WebSocket message:', {
      senderId: senderId,
      currentUserId: currentUserId,
      isUserMessage: isUserMessage,
      alignment: isUserMessage ? 'RIGHT (Your message)' : 'LEFT (Other\'s message)',
      senderUsername: data.sender?.username
    });

    // Avatars
    const yourAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop';
    const otherAvatar = data.sender?.avatar || selectedChat?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop';

    const newMessage: Message = {
      id: data.message_id,
      text: data.message,
      sender: isUserMessage ? 'user' : 'other', // This determines side
      avatar: isUserMessage ? yourAvatar : otherAvatar,
      time: formatMessageTime(data.timestamp),
      timestamp: data.timestamp,
      senderId: senderId,
      senderName: data.sender?.username,
      isSeen: false,
      conversationId: data.conversation_id || selectedChat?.id,
      status: isUserMessage ? 'sent' : undefined,
    };

    // If it's your message, replace the temporary one
    if (isUserMessage) {
      setMessages(prev => prev.map(msg => 
        msg.id.startsWith('temp-') ? { ...msg, ...newMessage, id: data.message_id, status: 'sent' } : msg
      ));
      console.log('✅ Updated temporary message to permanent (RIGHT side)');
    } else {
      setMessages(prev => [...prev, newMessage]);
      console.log('✅ Added new message from other user (LEFT side)');
    }

    // Refetch messages
    if (selectedChat?.id) {
      setTimeout(() => {
        refetchSingleUserMessages();
      }, 500);
    }

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle user status
  const handleUserStatus = (data: WebSocketMessage) => {
    const userId = data.user_id;
    const status = data.status;
    setUserStatus(prev => ({ ...prev, [userId]: status }));
  };

  // Handle message seen
  const handleMessageSeen = (data: WebSocketMessage) => {
    const messageId = data.message_id;
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, isSeen: true, status: 'read' } : msg
    ));
  };

  // Handle error
  const handleError = (data: WebSocketMessage) => {
    if (data.code === 'ACCOUNT_DEACTIVATED') {
      setConnectionError('Your account has been deactivated');
      setIsConnected(false);
      setConnectionStatus('error');
    } else {
      setConnectionError(data.message || 'An error occurred');
    }
  };

  // Send message
  const sendMessage = () => {
    const message = messageInput.trim();
    if (!message || !socketRef.current || !isConnected) {
      console.log('❌ Cannot send message');
      return;
    }

    try {
      const messageData = { message: message };
      socketRef.current.send(JSON.stringify(messageData));

      // Add temporary message on RIGHT side (your side)
      const tempId = `temp-${Date.now()}`;
      const yourAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop';
      
      const optimisticMessage: Message = {
        id: tempId,
        text: message,
        sender: 'user', // ALWAYS 'user' for sent messages (RIGHT side)
        avatar: yourAvatar,
        time: formatMessageTime(new Date().toISOString()),
        timestamp: new Date().toISOString(),
        isSeen: false,
        senderId: currentUserId,
        conversationId: selectedChat?.id,
        status: 'sending',
      };

      console.log('📤 Adding temporary message on RIGHT side:', optimisticMessage);

      setMessages(prev => [...prev, optimisticMessage]);
      setMessageInput('');
      updateActivityTime();

      // Remove "sending..." status after timeout
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId && msg.status === 'sending' 
            ? { ...msg, status: 'sent' } 
            : msg
        ));
      }, 2000);

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('❌ Error sending message:', error);
      setConnectionError('Failed to send message');
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    updateActivityTime();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle chat selection
  const handleChatSelect = (user: ChatUser) => {
    console.log('💬 Selecting chat:', user.name);
    setIsLoadingMessages(true);
    setSelectedChat(user);
    setIsChatListOpen(false);
    setMessages([]);
    updateActivityTime();
  };

  // Combine all conversations
  const allChatUsers: ChatUser[] = [
    ...conversations.map(convertConversationToChatUser),
    ...newConversations.map(convertConversationToChatUser),
  ];

  // Get current user info
  const currentUser = selectedChat ? {
    name: selectedChat.name,
    status: userStatus[selectedChat.userId || ''] === 'online'
      ? 'Online now'
      : selectedChat.lastSeen
        ? `Last seen ${selectedChat.lastSeen === 'online' ? 'now' : selectedChat.lastSeen}`
        : 'Offline',
    avatar: selectedChat.avatar,
    isOnline: userStatus[selectedChat.userId || ''] === 'online',
  } : {
    name: 'Select a chat',
    status: 'Not connected',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isOnline: false,
  };

  // Tab counts
  const tabCounts = {
    chat: allChatUsers.length,
    vendor: 0,
    admin: 0
  };

  const getCurrentUsers = () => {
    switch (activeTab) {
      case 'chat':
        return allChatUsers;
      case 'vendor':
        return [];
      case 'admin':
        return [];
      default:
        return allChatUsers;
    }
  };

  // Get connection status
  const getConnectionStatusInfo = () => {
    switch (connectionStatus) {
      case 'connected':
        return { color: 'bg-green-100 text-green-800 border-green-300', text: 'Connected', icon: <Wifi size={16} /> };
      case 'connecting':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', text: 'Connecting...', icon: <RefreshCw size={16} className="animate-spin" /> };
      case 'error':
        return { color: 'bg-red-100 text-red-800 border-red-300', text: 'Connection Error', icon: <WifiOff size={16} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-300', text: 'Disconnected', icon: <WifiOff size={16} /> };
    }
  };

  const statusInfo = getConnectionStatusInfo();

  // Scroll to bottom
  useEffect(() => {
    if (messages.length > 0 && !isLoadingMessages && !isLoadingSingleMessages) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoadingMessages, isLoadingSingleMessages]);

  // Get read receipt icon
  const getReadReceiptIcon = (status?: string, isSeen?: boolean) => {
    if (status === 'sending') {
      return <span className="text-xs text-gray-400">Sending...</span>;
    }
    
    if (status === 'sent') {
      return <Check size={12} className="text-gray-400" />;
    }
    
    if (isSeen || status === 'read') {
      return <CheckCheck size={12} className="text-blue-500" />;
    }
    
    return null;
  };

  return (
    <div className="w-full min-h-screen" onClick={updateActivityTime} onKeyDown={updateActivityTime}>

      {/* Connection Status */}
      <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg ${statusInfo.color}`}>
        {statusInfo.icon}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{statusInfo.text}</span>
          {connectionError && (
            <span className="text-xs mt-1 max-w-xs">{connectionError}</span>
          )}
          {connectionStatus !== 'connected' && selectedChat?.id && (
            <button
              onClick={manualReconnect}
              className="text-xs underline mt-1 text-left"
            >
              Reconnect Now
            </button>
          )}
        </div>
      </div>


      {/* Header */}
      <div className="pb-4 md:pb-6">
        <div className="flex items-center justify-between md:block">
          <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-1 leading-tight">
            Communication with Broker
          </h1>
          <button
            onClick={() => setIsChatListOpen(!isChatListOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isChatListOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <p className="text-sm md:text-[15px] text-gray-600 font-normal">
          {connectionStatus === 'connected'
            ? 'Real-time messaging system'
            : connectionError || 'Establishing connection...'}
        </p>
      </div>

      {/* Chat Interface */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] md:h-[calc(100vh-150px)] p-2 md:p-4 border-gray-200 border rounded-xl md:rounded-2xl">
        {/* Left Sidebar - Chat List */}
        <div className={`
          ${isChatListOpen ? 'block' : 'hidden'}
          md:block
          w-full md:w-[380px] 
          md:border-r 
          border-gray-200 
          flex flex-col 
          bg-white 
          p-3
          rounded-lg
          md:rounded-none
          absolute md:relative
          top-0 left-0
          h-full md:h-auto
          z-10 md:z-auto
          shadow-lg md:shadow-none
        `}>
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h2 className="text-lg font-semibold">Chats</h2>
            <button
              onClick={() => setIsChatListOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="pb-2 pt-0 md:pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full h-10 md:h-[44px] pl-10 pr-4 text-sm md:text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-3 flex gap-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-sm md:text-[15px] font-medium px-4 py-2 rounded-full transition-colors ${activeTab === 'chat'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Chat <span className="ml-1">({tabCounts.chat})</span>
            </button>
            <button
              onClick={() => setActiveTab('vendor')}
              className={`text-sm md:text-[15px] font-medium px-4 py-2 rounded-full transition-colors ${activeTab === 'vendor'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Vendor <span className="ml-1">({tabCounts.vendor})</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`text-sm md:text-[15px] font-medium px-4 py-2 rounded-full transition-colors ${activeTab === 'admin'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Admin <span className="ml-1">({tabCounts.admin})</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingConversations ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : getCurrentUsers().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No conversations found
              </div>
            ) : (
              getCurrentUsers().map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleChatSelect(user)}
                  className={`w-full flex items-center gap-3 px-3 md:px-4 py-3 hover:bg-blue-50 hover:rounded-sm transition-colors ${selectedChat?.id === user.id ? 'bg-blue-50' : ''
                    }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    {user.isOnline && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-[15px] font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {user.time}
                      </span>
                    </div>
                    <p className="text-xs md:text-[13px] text-gray-500 truncate">
                      {user.message}
                    </p>
                    {!user.isSeen && user.lastSeen && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={10} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500">
                          {user.lastSeen === 'online' ? 'Online' : `Last seen ${user.lastSeen}`}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsChatListOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                  {currentUser.isOnline && connectionStatus === 'connected' && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm md:text-[16px] font-semibold text-gray-900">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs md:text-[13px] text-gray-500">
                    {currentUser.status}
                    {connectionStatus !== 'connected' && ' • Connection issue'}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#ECEDEE]">
            {isLoadingMessages || isLoadingSingleMessages ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">No messages yet</p>
                  <p className="text-sm">Start the conversation</p>
                  {connectionStatus !== 'connected' && (
                    <p className="text-sm text-yellow-600 mt-2">
                      Waiting for connection...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-200`}
                >
                  {/* LEFT SIDE: Other person's messages (RECEIVED) */}
                  {message.sender === 'other' && (
                    <div className="flex items-start gap-2 md:gap-3 max-w-[85%] md:max-w-[600px]">
                      {/* Other person's avatar - ALWAYS ON LEFT */}
                      <img
                        src={message.avatar}
                        alt="Other User"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow"
                      />
                      
                      {/* Message bubble - LEFT */}
                      <div className="flex flex-col">
                        <div className="bg-white border border-gray-200 text-gray-900 px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm">
                          <p className="text-sm md:text-[14px] leading-relaxed">{message.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 ml-1">
                          <span className="text-xs text-gray-500">
                            {message.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RIGHT SIDE: Your messages (SENT) */}
                  {message.sender === 'user' && (
                    <div className="flex items-start gap-2 md:gap-3 max-w-[85%] md:max-w-[600px]">
                      {/* Message bubble - RIGHT */}
                      <div className="flex flex-col items-end">
                        <div className="bg-blue-50 text-gray-900 px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm">
                          <p className="text-sm md:text-[14px] leading-relaxed">{message.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 mr-1">
                          <span className="text-xs text-gray-500">
                            {message.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {getReadReceiptIcon(message.status, message.isSeen)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Your avatar - ALWAYS ON RIGHT */}
                      <img
                        src={message.avatar}
                        alt="You"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="px-2 py-2 border-t bg-white">
            <div className="flex items-center gap-2 md:gap-3">
              <button className="p-1 md:p-0.5 hover:bg-gray-100 transition-colors border border-gray-600 rounded-full">
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" strokeWidth={2} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={connectionStatus === 'connected' ? "Type your message" : "Connecting..."}
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    updateActivityTime();
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={connectionStatus !== 'connected' || !!connectionError}
                  className={`w-full h-10 md:h-[42px] px-3 md:px-4 pr-10 md:pr-12 text-sm md:text-[14px] text-gray-900 placeholder-gray-400 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${connectionStatus === 'connected' && !connectionError
                      ? 'border-gray-300 focus:ring-blue-500'
                      : 'border-gray-200 focus:ring-gray-300 cursor-not-allowed'
                    }`}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2} />
                </button>
              </div>
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim() || connectionStatus !== 'connected' || !!connectionError}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors ${messageInput.trim() && connectionStatus === 'connected' && !connectionError
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                <SendHorizontal className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
              </button>
            </div>
            {connectionStatus !== 'connected' && (
              <p className="text-xs text-center text-gray-500 mt-2">
                {connectionError || 'Trying to establish connection...'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationWithBroker;