import { Minus } from 'lucide-react';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import SurveyModal from './SurveyModal';
import { useDispatch } from 'react-redux';
import { setChatbotView } from '@/redux/features/chatbot/chatbotSlice';

const ChatbotMain: React.FC<{ onClose: any }> = ({ onClose }) => {
    const dispatch = useDispatch();

    const handleCloseAll = () => {
        dispatch(setChatbotView('survey'));
        onClose();
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

    return (
        <ChatWindow>
            <SurveyModal onClose={handleCloseAll} />
        </ChatWindow>
    );
};

export default ChatbotMain;