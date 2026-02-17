/* eslint-disable @typescript-eslint/no-explicit-any */
import { Minus } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import { useState } from 'react';
import LocationSelectionModal from './LocationSelectModal';
import ExploreCityModal from './ExploreCityModal';
import SurveyModal from './SurveyModal';
import ChatInterface from './ChatInterface ';
import BrokerFAQ from './BrokerFAQ';

const ChatbotMain: React.FC<{ onClose: any }> = ({ onClose }) => {
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showExploreModal, setShowExploreModal] = useState(false);
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [showChatInterface, setShowChatInterface] = useState(false);
    const [showFAQ, setShowFAQ] = useState(false);
    const [selectedCity, setSelectedCity] = useState<any>(null);

    const messages = [
        'I am researching real estate marketing platforms.',
        'I heard about Broker 360 & want to learn more.',
        'Show property by location.',
        'I\'m looking for customer support.',
    ];

    const handleMessageClick = (message: string) => {
        if (message === 'Show property by location.') {
            setShowLocationModal(true);
        } else if (message === 'I\'m looking for customer support.') {
            setShowSurveyModal(true);
        } else if (message === 'I am researching real estate marketing platforms.') {
            setShowSurveyModal(true);
        }
        else if (message === 'I heard about Broker 360 & want to learn more.') {
            setShowFAQ(true);
        }
    };

    const handleSelectCity = (cityData: any) => {
        setSelectedCity(cityData);
        setShowLocationModal(false);
        setShowExploreModal(true);
    };

    const handleBackToLocations = () => {
        setShowExploreModal(false);
        setShowLocationModal(true);
    };

    const handleViewDetails = () => {
        setShowExploreModal(false);
        setShowSurveyModal(true);
    };

    const handleCloseAll = () => {
        setShowLocationModal(false);
        setShowExploreModal(false);
        setShowSurveyModal(false);
        setShowChatInterface(false);
        setShowFAQ(false);
        onClose();
    };

    // Common Wrapper to maintain consistency and responsiveness
    const ChatWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="fixed inset-0 sm:inset-auto sm:right-6 sm:bottom-6 z-50 flex items-end justify-center sm:block p-4 sm:p-0">
            <div className="w-full sm:w-[400px] bg-[#FDFEFF] rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] sm:h-[600px] border border-gray-100 transition-all duration-300 ease-in-out">
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

    if (showChatInterface) {
        return (
            <ChatWindow>
                <ChatInterface onClose={handleCloseAll} />
            </ChatWindow>
        );
    }

    if (showFAQ) {
        return (
            <ChatWindow>
                <BrokerFAQ onBack={() => setShowFAQ(false)} />
            </ChatWindow>
        );
    }

    if (showSurveyModal) {
        return (
            <ChatWindow>
                <SurveyModal onClose={handleCloseAll} />
            </ChatWindow>
        );
    }

    if (showExploreModal && selectedCity) {
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

    if (showLocationModal) {
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