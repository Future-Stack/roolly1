import { MapPin, Minus, Send } from 'lucide-react';
import { useState } from 'react';
import chatbot from '../../../assets/chatbot-img.png';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import ChatInterface from './ChatInterface ';

const SurveyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+61');
    const [isStartChat, setIsStartChat] = useState(false);
    const [showChatInterface, setShowChatInterface] = useState(false); 

    const handleSubmit = () => {
        console.log({ name, email, phone: countryCode + phone });
        setIsStartChat(true);
    };

    const handleSendMessage = () => {
        setShowChatInterface(true);
    };


    if (showChatInterface) {
        return <ChatInterface onClose={onClose} />;
    }

    return (
        <div className="">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Bot Icon */}
                        <div>
                            <img src={chatbotLogo} alt="" />
                        </div>

                        {/* Logo */}
                        <div>
                            <img src={mainLogo} alt="" />
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

                {/* Content - Scrollable area */}
                <div className="px-5 py-4 overflow-y-auto flex-grow">
                    {/* Message with Icon */}
                    <div className="flex items-center justify-between mb-5 gap-2">
                        <span className="text-[#0D4B99] text-sm bg-white shadow-xs px-2 py-3 rounded-lg w-full">I'm looking for customer support.</span>
                        <MapPin size={20} className="text-[#0D4B99]" />
                    </div>

                    {/* Bot Avatar */}
                    <div className="flex items-start gap-3 mb-5">
                        <img src={chatbot} alt="chatbot" className='w-10 h-10' />
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#282D3E] text-md leading-relaxed mb-5">
                            Leave a message Provide your details to get notified
                        </p>

                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-[#282D3E] text-md font-normal mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-[#282D3E] text-md font-normal mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone Number Field */}
                            <div>
                                <label className="block text-[#282D3E] text-md font-normal mb-2">
                                    Phone Number
                                </label>
                                <div className="flex gap-2">
                                    {/* Country Code Selector */}
                                    <div className="relative">
                                        <select
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className="appearance-none w-20 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white pr-8"
                                        >
                                            <option value="+61">🇦🇺 +61</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+44">🇬🇧 +44</option>
                                            <option value="+880">🇧🇩 +880</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone number"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className={`w-full py-3.5 text-base font-semibold rounded-lg mt-6 ${isStartChat ? 'bg-[#0446DE4D] text-[#FFFFFF] hover:bg-gray-300' : 'bg-[#126AD8] text-white  hover:bg-[#0a3a7a] transition-colors '}`}
                            >
                                Start Chatting
                            </button>
                        </div>
                    </div>


                    {
                        isStartChat && (
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
                                                onClick={handleSendMessage}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SurveyModal;