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

const ChatbotMain: React.FC<{ onClose: any }> = ({ onClose }) => {
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showExploreModal, setShowExploreModal] = useState(false);
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [showChatInterface, setShowChatInterface] = useState(false); 
    const [selectedCity, setSelectedCity] = useState<any>(null);
    
    const messages = [
        'I am researching real estate marketing platforms.',
        'I\'m looking to speak to a broker about a property.',
        'I heard about Broker 360 & want to learn more.',
        'Show property by location.',
    ];

    const handleMessageClick = (message: string) => {
        if (message === 'Show property by location.') {
            setShowLocationModal(true);
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
        onClose();
    };

    // If showChatInterface is true, return ChatInterface
    if (showChatInterface) {
        return <ChatInterface onClose={handleCloseAll} />;
    }

    // If showSurveyModal is true, return SurveyModal
    if (showSurveyModal) {
        return <SurveyModal onClose={handleCloseAll} />;
    }

    // If showExploreModal is true, return ExploreCityModal
    if (showExploreModal && selectedCity) {
        return (
            <ExploreCityModal 
                onClose={handleCloseAll}
                selectedCity={selectedCity}
                onBack={handleBackToLocations}
                onViewDetails={handleViewDetails}
            />
        );
    }

    // If showLocationModal is true, return LocationSelectionModal
    if (showLocationModal) {
        return (
            <LocationSelectionModal 
                onClose={handleCloseAll}
                onSelectCity={handleSelectCity}
            />
        );
    }

    return (
        <div className="flex items-start justify-center p-4">
            <div className="w-full max-w-md bg-[#FDFEFF] rounded-2xl shadow-sm h-[520px]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {/* Bot Icon */}
                        <div className="relative">
                            <img src={chatbotLogo} alt="" />
                        </div>

                        {/* Logo */}
                        <div className="flex items-center gap-1">
                            <img src={mainLogo} alt="" />
                        </div>
                    </div>

                    {/* Minimize Button */}
                    <button className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors" onClick={onClose}>
                        <Minus size={18} strokeWidth={2.5} className="text-gray-900" />
                    </button>
                </div>

                <div className='flex gap-1'>
                    <div className="flex-shrink-0 mt-1 px-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <img src={chatbot} alt="chatbot" />
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="px-3 py-5 space-y-4">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`flex items-start gap-3 bg-[#FFFFFF] p-4 shadow-md rounded-r-2xl rounded-l-2xl rounded-tl-none cursor-pointer transition-all hover:bg-blue-50 hover:shadow-lg ${
                                    message === 'Show property by location.' ? 'border border-blue-200' : ''
                                }`}
                                onClick={() => handleMessageClick(message)}
                            >
                                {/* Message Bubble */}
                                <div className="flex-1">
                                    <p className="text-md text-[#0D4B99] leading-relaxed">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotMain;