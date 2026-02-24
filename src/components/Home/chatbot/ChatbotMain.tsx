/* eslint-disable @typescript-eslint/no-explicit-any */
import { Minus } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import LocationSelectionModal from './LocationSelectModal';
import ExploreCityModal from './ExploreCityModal';
import SurveyModal from './SurveyModal';
import ChatInterface from './ChatInterface ';
import BrokerFAQ from './BrokerFAQ';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setChatbotView, setSelectedCity } from '@/redux/features/chatbot/chatbotSlice';
import { useNavigate } from 'react-router-dom';

const ChatbotMain: React.FC<{ onClose: any }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { view, selectedCity } = useSelector((state: RootState) => state.chatbot);

    const messages = [
        'I am researching real estate marketing platforms.',
        'I heard about Broker 360 & want to learn more.',
        'Show property by location.',
        'I\'m looking for customer support.',
    ];

    const handleMessageClick = (message: string) => {
        if (message === 'Show property by location.') {
            dispatch(setChatbotView('location'));
        } else if (message === 'I\'m looking for customer support.') {
            dispatch(setChatbotView('survey'));
        } else if (message === 'I am researching real estate marketing platforms.') {
            dispatch(setChatbotView('survey'));
        }
        else if (message === 'I heard about Broker 360 & want to learn more.') {
            dispatch(setChatbotView('faq'));
        }
    };

    const handleSelectCity = (cityData: any) => {
        dispatch(setSelectedCity(cityData));
        dispatch(setChatbotView('explore'));
    };

    const handleBackToLocations = () => {
        dispatch(setChatbotView('location'));
    };

    const handleCloseAll = () => {
        dispatch(setChatbotView('main'));
        onClose();
    };

    const handleViewDetails = (id: string | number) => {
        handleCloseAll();
        navigate(`/details/${id}`);
    };

    // Common Wrapper to maintain consistency and responsiveness
    const ChatWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="fixed inset-0 sm:inset-auto sm:right-6 sm:bottom-6 z-[60] flex items-end justify-center sm:block">
            <div className="w-full sm:w-[400px] bg-[#FDFEFF] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[100dvh] sm:h-[600px] border-t sm:border border-gray-100 transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={chatbotLogo} alt="Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={mainLogo} alt="Broker 360" className="h-5 object-contain" />
                        </div>
                    </div>

                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                        onClick={onClose}
                    >
                        <Minus size={18} strokeWidth={2.5} className="text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );

    if (view === 'chat') {
        return (
            <ChatWindow>
                <ChatInterface onClose={handleCloseAll} />
            </ChatWindow>
        );
    }

    if (view === 'faq') {
        return (
            <ChatWindow>
                <BrokerFAQ onBack={() => dispatch(setChatbotView('main'))} />
            </ChatWindow>
        );
    }

    if (view === 'survey') {
        return (
            <ChatWindow>
                <SurveyModal onClose={handleCloseAll} />
            </ChatWindow>
        );
    }

    if (view === 'explore' && selectedCity) {
        return (
            <ChatWindow>
                <ExploreCityModal
                    onClose={handleCloseAll}
                    selectedCity={selectedCity}
                    onBack={handleBackToLocations}
                    onViewDetails={handleViewDetails}
                />
            </ChatWindow>
        );
    }

    if (view === 'location') {
        return (
            <ChatWindow>
                <LocationSelectionModal
                    onClose={handleCloseAll}
                    onSelectCity={handleSelectCity}
                />
            </ChatWindow>
        );
    }

    return (
        <ChatWindow>
            <div className='flex flex-col p-5 '>
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                            <img src={chatbot} alt="chatbot" className="w-6 h-6 object-contain" />
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-2xl rounded-tl-none">
                        <p className="text-[#2F3237] text-sm leading-relaxed">
                            Hi! I'm your Broker 360 assistant. How can I help you today?
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`group flex items-center justify-between bg-white px-5 py-4 border border-gray-100 rounded-2xl cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-200 hover:shadow-md active:scale-[0.98] ${message === 'Show property by location.' || message === 'I\'m looking for customer support.' ? 'border-blue-100' : ''
                                }`}
                            onClick={() => handleMessageClick(message)}
                        >
                            <p className="text-sm font-medium text-[#0D4B99]">
                                {message}
                            </p>
                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ChatWindow>
    );
};

export default ChatbotMain;