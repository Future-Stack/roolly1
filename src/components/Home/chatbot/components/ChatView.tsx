import React from 'react';
import chatbot from '../../../../assets/chatbot-img.png';
import { SendIcon } from '@/assets/svg/sendIcon';
import PropertyCard from './PropertyCard';
import ChoiceButtons from './ChoiceButtons';

interface ChatMessage {
    sender: "user" | "bot";
    text?: string;
    properties?: any[];
    options?: string[];
}

interface ChatViewProps {
    chatMessages: ChatMessage[];
    message: string;
    setMessage: (val: string) => void;
    handleSendMessage: (text?: string, propertyId?: string | number) => void;
    navigate: (path: string) => void;
}

const ChatView: React.FC<ChatViewProps> = ({
    chatMessages, message, setMessage, handleSendMessage, navigate
}) => (
    <div className="p-5 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300 h-full overflow-hidden">
        {/* Chat Header/Info */}
        <div className="flex justify-end">
            <div className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] flex items-center gap-2">
                <span className="text-sm font-medium">Hi, I'm Ronald Richards from broker360. How can I help you today?</span>
            </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 scrollbar-hide">
            {chatMessages.map((msg, index) => (
                <div key={index} className={`flex flex-col gap-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-start gap-3 w-full ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-blue-600 shadow-blue-100'}`}>
                                {msg.sender === 'bot' ? (
                                    <img src={chatbot} alt="chatbot" className="w-6 h-6 object-contain" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                        <img src="https://i.pravatar.cc/150?u=user" alt="user" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`p-4 shadow-sm border rounded-3xl max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-50 border-blue-100 rounded-tr-none' : 'bg-white border-[#EBEFFE] rounded-tl-none'}`}>
                            <p className={`${msg.sender === 'user' ? 'text-blue-900' : 'text-[#0D4B99]'} text-sm leading-relaxed font-medium whitespace-pre-wrap`}>
                                {msg.text || (msg.properties && msg.properties.length > 0 ? "Here are the properties I found:" : "")}
                            </p>
                        </div>
                    </div>

                    {msg.sender === 'bot' && msg.properties && msg.properties.length > 0 && (
                        <div className="w-full pl-13 pr-2">
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {msg.properties.map((prop, pIndex) => (
                                    <PropertyCard
                                        key={pIndex}
                                        property={prop}
                                        onNavigate={(id) => navigate(`/details/${id}`)}
                                        onAskAbout={(id) => handleSendMessage("I want to know more about this property", id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
                        <div className="w-full pl-13">
                            <ChoiceButtons
                                options={msg.options}
                                onSelect={(opt) => handleSendMessage(opt)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div className="mt-auto px-1 pb-4">
            <div className="bg-white rounded-[17px] p-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 ">
                <div className="flex items-center gap-3 bg-[#E7F0FB] px-[19px] py-[17px] rounded-[12px] ">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 text-base bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <div onClick={() => handleSendMessage()} className="cursor-pointer hover:scale-110 transition-transform">
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ChatView;
