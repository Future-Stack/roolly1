
import { useState } from 'react';
import bannerImg from '../../assets/bnnnerImg.svg';


const Banner: React.FC = () => {
  // States
  const [propertyType, setPropertyType] = useState('');
  const [transaction, setTransaction] = useState('');
  const [sqft, setSqft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 xl:px-8">
        {/* Hero Text */}
        <div className="text-center mb-8 sm:mb-12 xl:mb-16 mt-16 sm:mt-0">
          <h1
            style={{ textShadow: '0 4px 22px rgba(0, 0, 0, 0.25)' }}
            className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium mb-2 sm:mb-4"
          >
            Commercial Property?
          </h1>
          <h2
            style={{ textShadow: '0 4px 22px rgba(0, 0, 0, 0.25)' }}
            className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium"
          >
            We've Got it Covered.
          </h2>
        </div>

        {/* Search Bar */}
<div className="w-full max-w-5xl bg-white rounded-2xl  p-4 ">
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
        onClick={() => setIsPropertyOpen(!isPropertyOpen)}
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
              onClick={() => {
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
        onClick={() => setIsTransactionOpen(!isTransactionOpen)}
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
              onClick={() => {
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
        onClick={() => setIsSqftOpen(!isSqftOpen)}
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
              onClick={() => {
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
        onClick={handleSearch}
        className="w-full px-6 py-3 text-base bg-[#126AD8] text-white border border-[#0D4B99] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Search</span>
      </button>
    </div>

  </div>
</div>


        {/* Chat Button */}
        <button className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600  mb-[68px] mr-[61px] rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-50">
          
<svg xmlns="http://www.w3.org/2000/svg" width="49" height="51" viewBox="0 0 49 51" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1153 26.232C32.3207 27.3635 29.3041 28.0614 26.1489 28.2422C25.6048 28.2734 25.0565 28.2892 24.5046 28.2892C23.9527 28.2892 23.4044 28.2734 22.8603 28.2422C19.7044 28.0613 16.6872 27.3632 13.892 26.2312C8.02603 23.8556 3.13814 19.5695 0 14.1446C4.89134 5.68894 14.0336 0 24.5046 0C34.9756 0 44.1179 5.68894 49.0092 14.1446C45.8707 19.5701 40.9821 23.8566 35.1153 26.232Z" fill="white"/>
  <path d="M13.8916 28.4332C13.2158 28.1595 12.553 27.8605 11.9044 27.5373C9.79636 29.0222 8.01433 30.8717 6.67247 32.9818C8.95327 36.5683 12.5058 39.402 16.7692 40.9726C18.8007 41.721 20.9937 42.1825 23.2874 42.3021H25.6775C27.9707 42.1826 32.0012 44.4544 26.1485 50.1874C30.4125 48.617 40.0114 36.5687 42.2924 32.9818C40.9544 30.8777 39.1787 29.0328 37.0785 27.55C36.4374 27.8686 35.7825 28.1637 35.1149 28.434C32.3203 29.5655 29.3037 30.2634 26.1485 30.4442C25.6044 30.4754 25.0562 30.4912 24.5042 30.4912C23.9523 30.4912 23.404 30.4754 22.8599 30.4442C19.704 30.2633 16.6868 29.5652 13.8916 28.4332Z" fill="white"/>
  <rect x="12.6884" y="10.5263" width="23.684" height="8.45856" rx="4.22928" fill="#162550"/>
  <ellipse cx="31.0616" cy="14.7086" rx="1.55074" ry="1.55074" fill="#04FED1"/>
  <ellipse cx="24.4824" cy="35.5729" rx="1.55074" ry="1.55074" fill="#162550"/>
  <ellipse cx="18.2805" cy="14.7086" rx="1.55074" ry="1.55074" fill="#04FED1"/>
  <ellipse cx="18.2805" cy="35.5729" rx="1.55074" ry="1.55074" fill="#162550"/>
  <ellipse cx="30.6862" cy="35.5729" rx="1.55074" ry="1.55074" fill="#162550"/>
</svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
