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

const CommunicationWithBroker: React.FC = () => {
  const [messageInput, setMessageInput] = useState('');
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(chatUsers[0]);



  const messages: Message[] = [
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

  const currentUser = {
    name: 'Bill Kuphal',
    status: 'Online for 10 mins',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isOnline: true
  };

  return (
    <div className="w-full min-h-screen">
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

          {/* Chat Tab */}
          <div className="mb-3">
            <button className="text-sm md:text-[15px] font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Chat <span className="ml-1">(5)</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chatUsers.map((user) => (
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
            {messages.map((message) => (
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

export default CommunicationWithBroker;