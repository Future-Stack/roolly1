import { Minus, Send } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png'
import chatbotLogo from '../../../assets/logo2.png'
import mainLogo from '../../../assets/main-logo.png'

interface ChatInterfaceProps {
    onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
    return (
        <div>
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Bot Icon */}
                        <div>
                            <img src={chatbotLogo} alt="chatbot logo" />
                        </div>

                        <div>
                            <img src={mainLogo} alt="main logo" />
                        </div>
                    </div>

                    {/* Minimize Button */}
                    <button
                        className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={onClose}
                    >
                        <Minus size={18} strokeWidth={2.5} className="text-gray-900" />
                    </button>
                </div>

                {/* Chat Content - Scrollable */}
                <div className="p-5 space-y-4 flex-grow overflow-y-auto">
                    {/* Bot Message 1 */}
                    <div className="flex items-start gap-3">
                        <div>
                            <img src={chatbot} alt="" className='w-8 h-8' />
                        </div>
                        <div className="bg-[#F3F4F6] rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
                            <p className="text-gray-900 text-sm leading-relaxed">
                                Hi, how can we help?
                            </p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-[#0446DE] rounded-3xl rounded-tr-md px-5 py-3 max-w-[75%]">
                            <p className="text-white text-sm leading-relaxed mb-1">
                                need a home.
                            </p>
                            <p className="text-white text-sm leading-relaxed mb-2">
                                connect with a broker.
                            </p>
                            <p className="text-white text-xs">
                                3:01 PM
                            </p>
                        </div>
                    </div>

                    {/* Bot Message 2 */}
                    <div className="flex items-start gap-3">
                        <div>
                            <img src={chatbot} alt="" className='w-8 h-8' />
                        </div>
                        <div className="bg-[#F3F4F6] rounded-3xl rounded-tl-md px-5 py-3 max-w-[75%]">
                            <p className="text-gray-900 text-sm leading-relaxed">
                                Connecting to broker...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className='px-6'>
                    <div className="flex items-center justify-center  bg-white shadow-lg rounded-br-2xl rounded-bl-2xl p-3 mt-5 mb-5">
                        <div className="w-full">
                            {/* Message Bubble */}
                            <div className="">
                                <div className="bg-[#E8F1FD] rounded-xl px-5 py-3.5 flex items-center gap-3 shadow-sm">
                                    <input
                                        type="text"
                                        placeholder="I need a land (12000sq * 3000sq)"
                                        className="flex-1 bg-transparent text-gray-900 text-base font-medium leading-relaxed placeholder-gray-500 focus:outline-none"
                                    />

                                    <Send
                                        size={22}
                                        className="text-[#0D4B99] flex-shrink-0 cursor-pointer hover:text-blue-400"
                                        strokeWidth={2}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;