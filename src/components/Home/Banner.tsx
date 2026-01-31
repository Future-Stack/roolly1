import { useState } from 'react';
import bannerImg from '../../assets/bnnnerImg.svg';
import chatbotImg from '../../assets/chatbot-img.png';
import ChatbotMain from './chatbot/ChatbotMain';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  // States
  const [propertyType, setPropertyType] = useState('');
  const [transaction, setTransaction] = useState('');
  const [sqft, setSqft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Dropdown open states
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isSqftOpen, setIsSqftOpen] = useState(false);

  // Options
  const propertyOptions = ['Industrial', 'Land', 'Office', 'Retail'];
  const transactionOptions = ['Rent', 'Purchase'];
  const sqftOptions = [
    'Upto 1,000 sq ft',
    '1,000-2,000 sq ft',
    '2,000-4,000 sq ft',
    '4,000-8,000 sq ft',
    '8,000-15,000 sq ft',
    '15,000-30,000 sq ft',
    '30,000-60,000 sq ft',
    '60,000+ sq ft',
  ];

  const handleSearch = () => {
    console.log({ searchQuery, propertyType, transaction, sqft });
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = () => {
    setIsPropertyOpen(false);
    setIsTransactionOpen(false);
    setIsSqftOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImg})`,
          filter: 'brightness(0.6)',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 xl:px-8"
        onClick={handleClickOutside}
      >
        {/* Hero Text */}
        <div className="text-center mb-8 sm:mb-12 xl:mb-16 mt-16 sm:mt-0">
          <h1
            style={{ textShadow: '0 4px 22px rgba(0, 0, 0, 0.25)' }}
            className="text-white text-2xl sm:text-3xl md:text-4xl xl:text-5xl mb-2 sm:mb-4"
          >
            Commercial Property?
          </h1>
          <h2
            style={{ textShadow: '0 4px 22px rgba(0, 0, 0, 0.25)' }}
            className="text-white text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-medium"
          >
            We've Got it Covered.
          </h2>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-5xl bg-white rounded-2xl p-4">
          <div className="flex flex-wrap gap-3 sm:gap-[18px] items-center">
            {/* Search Input */}
            <div className="flex-1 min-w-[180px]">
              <input
                style={{ background: '#ECEDEE' }}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#82868A] placeholder-[#82868A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1 min-w-[180px] relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPropertyOpen(!isPropertyOpen);
                  setIsTransactionOpen(false);
                  setIsSqftOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 bg-[#ECEDEE] border border-gray-200 rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-sm text-[#82868A]">
                  {propertyType || 'Property Type'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M0 0L5 5L10 0H0Z" fill="#444A50" />
                </svg>
              </div>
              {isPropertyOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-20">
                  {propertyOptions.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPropertyType(option);
                        setIsPropertyOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transaction Dropdown */}
            <div className="flex-1 min-w-[180px] relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTransactionOpen(!isTransactionOpen);
                  setIsPropertyOpen(false);
                  setIsSqftOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 bg-[#ECEDEE] border border-gray-200 rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-sm text-[#82868A]">
                  {transaction || 'Transaction'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M0 0L5 5L10 0H0Z" fill="#444A50" />
                </svg>
              </div>
              {isTransactionOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-20">
                  {transactionOptions.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTransaction(option);
                        setIsTransactionOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SQFT Dropdown */}
            <div className="flex-1 min-w-[180px] relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSqftOpen(!isSqftOpen);
                  setIsPropertyOpen(false);
                  setIsTransactionOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 bg-[#ECEDEE] border border-gray-200 rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-sm text-[#82868A]">{sqft || 'SQFT'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M0 0L5 5L10 0H0Z" fill="#444A50" />
                </svg>
              </div>
              {isSqftOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-20">
                  {sqftOptions.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSqft(option);
                        setIsSqftOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="w-32">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                className="w-full px-6 py-3 text-base bg-[#126AD8] text-white border border-[#0D4B99] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Link to='/all-properties'>
                <span>Search</span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 mb-[68px] mr-[61px] rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-50"
        >
          <img src={chatbotImg} alt="chatbot_img" />
        </button>

        {/* Chatbot Modal */}
        {isChatbotOpen && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md">
              <ChatbotMain onClose={() => setIsChatbotOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;