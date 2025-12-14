import React, { useState } from 'react';
import { Search, Smile, MoreVertical, Plus, SendHorizontal, Menu, X } from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  avatar: string;
  time?: string;
}

const chatUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Bill',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    message: 'Can you Show  the property...',
    time: '9:41 AM',
    isOnline: true
  },
  {
    id: '2',
    name: 'Davis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'The new lens inventory...',
    time: '9:16 AM'
  },
  {
    id: '3',
    name: 'Davis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'The new lens inventory...',
    time: '9:16 AM'
  },
  {
    id: '4',
    name: 'Davis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'The new lens inventory...',
    time: '9:16 AM'
  },
];

// Different user lists for each tab
const vendorUsers: ChatUser[] = [
  {
    id: 'v1',
    name: 'Vendor Alex',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    message: 'Regarding the property listing...',
    time: '10:30 AM',
    isOnline: true
  },
  {
    id: 'v2',
    name: 'Vendor Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    message: 'Document submission completed...',
    time: 'Yesterday',
  },
  {
    id: 'v3',
    name: 'Vendor Mike',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'Payment confirmation needed...',
    time: '2 days ago'
  },
  {
    id: 'v4',
    name: 'Vendor Emma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    message: 'Meeting scheduled for tomorrow...',
    time: '3 days ago'
  },
  {
    id: 'v5',
    name: 'Vendor John',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    message: 'Property inspection report...',
    time: '1 week ago'
  },
  {
    id: 'v6',
    name: 'Vendor Lisa',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    message: 'Contract discussion...',
    time: '1 week ago'
  },
  {
    id: 'v7',
    name: 'Vendor Robert',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    message: 'New property available...',
    time: '2 weeks ago'
  },
  {
    id: 'v8',
    name: 'Vendor Maria',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    message: 'Feedback on last deal...',
    time: '2 weeks ago'
  },
];

const adminUsers: ChatUser[] = [
  {
    id: 'a1',
    name: 'Admin Support',
    avatar: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop',
    message: 'System maintenance scheduled...',
    time: 'Today',
    isOnline: true
  },
  {
    id: 'a2',
    name: 'Technical Team',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    message: 'Bug fix deployed...',
    time: 'Yesterday'
  },
  {
    id: 'a3',
    name: 'Billing Department',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    message: 'Invoice #12345 generated...',
    time: '2 days ago'
  },
  {
    id: 'a4',
    name: 'Sales Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    message: 'Monthly report ready...',
    time: '3 days ago'
  },
];

const AdminMessage: React.FC = () => {
  const [messageInput, setMessageInput] = useState('');
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'vendor' | 'admin'>('chat');
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(chatUsers[0]);

  // Messages for different tabs
  const chatMessages: Message[] = [
    {
      id: '1',
      text: 'Good news! I have a new, well-qualified lead, Mark C., who wants to see the Property.',
      sender: 'other',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      text: "Confirmed for Mark C. tomorrow at 3:30 PM. I'll text you immediately after the showing with his initial feedback. Thanks!",
      sender: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ];

  const vendorMessages: Message[] = [
    {
      id: 'v1',
      text: 'Hello, regarding the property documents you requested, I have uploaded all necessary files to the portal.',
      sender: 'other',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 'v2',
      text: 'Thank you for the update. I will review them and get back to you by tomorrow.',
      sender: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ];

  const adminMessages: Message[] = [
    {
      id: 'a1',
      text: 'System maintenance is scheduled for this weekend from 2 AM to 4 AM. The platform will be temporarily unavailable.',
      sender: 'other',
      avatar: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop'
    },
    {
      id: 'a2',
      text: 'Noted. Will complete all pending tasks before the maintenance window.',
      sender: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ];

  const currentUser = {
    name: activeTab === 'chat' ? 'Bill Kuphal' : 
          activeTab === 'vendor' ? 'Vendor Alex' : 'Admin Support',
    status: 'Online for 10 mins',
    avatar: activeTab === 'chat' ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' :
            activeTab === 'vendor' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' :
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop',
    isOnline: true
  };

  // Get current users based on active tab
  const getCurrentUsers = () => {
    switch (activeTab) {
      case 'chat':
        return chatUsers;
      case 'vendor':
        return vendorUsers;
      case 'admin':
        return adminUsers;
      default:
        return chatUsers;
    }
  };

  // Get current messages based on active tab
  const getCurrentMessages = () => {
    switch (activeTab) {
      case 'chat':
        return chatMessages;
      case 'vendor':
        return vendorMessages;
      case 'admin':
        return adminMessages;
      default:
        return chatMessages;
    }
  };

  // Tab count based on users length
  const tabCounts = {
    chat: chatUsers.length,
    vendor: vendorUsers.length,
    admin: adminUsers.length
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="pb-4 md:pb-6">
        <div className="flex items-center justify-between md:block">
          <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-1 leading-tight">
           Communication 
          </h1>
          <button
            onClick={() => setIsChatListOpen(!isChatListOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isChatListOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <p className="text-sm md:text-[15px] text-gray-600 font-normal">
          Integrated messaging & scheduling tools for seamless engagement
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
          {/* Mobile header for chat list */}
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
                placeholder="Search here"
                className="w-full h-10 md:h-[44px] pl-10 pr-4 text-sm md:text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-3 flex gap-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-sm md:text-[15px] font-medium px-4 py-2 rounded-full transition-colors ${
                activeTab === 'chat'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Broker list <span className="ml-1">({tabCounts.chat})</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`text-sm md:text-[15px] font-medium px-4 py-2 rounded-full transition-colors ${
                activeTab === 'admin'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Admin <span className="ml-1">({tabCounts.admin})</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {getCurrentUsers().map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  setSelectedChat(user);
                  if (window.innerWidth < 768) {
                    setIsChatListOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-3 hover:bg-blue-50 hover:rounded-sm transition-colors ${
                  selectedChat?.id === user.id ? 'bg-blue-50' : ''
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
                  <h3 className="text-sm md:text-[15px] font-semibold text-gray-900 mb-0.5">
                    {user.name}
                  </h3>
                  <p className="text-xs md:text-[13px] text-gray-500 truncate">
                    {user.message}
                  </p>
                </div>
                <span className="text-xs md:text-[13px] text-gray-500 flex-shrink-0">
                  {user.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header with back button for mobile */}
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
                  {currentUser.isOnline && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm md:text-[16px] font-semibold text-gray-900">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs md:text-[13px] text-gray-500">
                    {currentUser.status}
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
            {getCurrentMessages().map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 md:gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'other' && (
                  <img
                    src={message.avatar}
                    alt="User"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[85%] md:max-w-[600px] px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-50 text-gray-900'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm md:text-[14px] leading-relaxed">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <img
                    src={message.avatar}
                    alt="You"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
                {message.sender === 'other' && (
                  <div className="flex items-start gap-1 md:gap-2 mt-2">
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
            ))}
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
                  placeholder="Type your message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="w-full h-10 md:h-[42px] px-3 md:px-4 pr-10 md:pr-12 text-sm md:text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Smile className="w-4 h-4 md:w-5 md:h-5 text-gray-500" strokeWidth={2} />
                </button>
              </div>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#B4B7BB] hover:bg-gray-400 rounded-full transition-colors">
                <SendHorizontal className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessage;