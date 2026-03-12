import { useState } from 'react';
import bannerImg from '../../assets/bannerImg.webp';
import { useNavigate } from 'react-router-dom';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  // const [loaded, setLoaded] = useState(false);

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
  const propertyOptions = [
    { label: 'Industrial', value: 'industrial' },
    { label: 'Land', value: 'land' },
    { label: 'Office', value: 'office' },
    { label: 'Retail', value: 'retail' },
    // { label: 'House', value: 'house' },
    // { label: 'Other', value: 'other' }
  ];

  const transactionOptions = [
    { label: 'Lease', value: 'lease' },
    { label: 'Sale', value: 'sale' }
  ];

  const sqftOptions = [
    { label: '1,000-2,000 sq ft', gte: 1000, lte: 2000 },
    { label: '2,000-4,000 sq ft', gte: 2000, lte: 4000 },
    { label: '4,000-8,000 sq ft', gte: 4000, lte: 8000 },
    { label: '8,000-15,000 sq ft', gte: 8000, lte: 15000 },
    { label: '15,000-30,000 sq ft', gte: 15000, lte: 30000 },
    { label: '30,000-60,000 sq ft', gte: 30000, lte: 60000 },
  ];

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Add search query
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }

    // Add sqft range
    if (sqft) {
      const selectedSqft = sqftOptions.find(opt => opt.label === sqft);
      if (selectedSqft) {
        queryParams.append('built_area__gte', selectedSqft.gte.toString());
        queryParams.append('built_area__lte', selectedSqft.lte.toString());
      }
    }

    // Add property type
    if (propertyType) {
      const selectedProp = propertyOptions.find(opt => opt.label === propertyType);
      if (selectedProp) {
        queryParams.append('property_type', selectedProp.value);
      }
    }

    // Add transaction type
    if (transaction) {
      const selectedTrans = transactionOptions.find(opt => opt.label === transaction);
      if (selectedTrans) {
        queryParams.append('transaction', selectedTrans.value);
      }
    }


    queryParams.append('page', '1');

    navigate(`/all-properties?${queryParams.toString()}`);
  };

  const handleClickOutside = () => {
    setIsPropertyOpen(false);
    setIsTransactionOpen(false);
    setIsSqftOpen(false);
  };

  const getPropertyValue = (label: string) => {
    const option = propertyOptions.find(opt => opt.label === label);
    return option ? option.value : '';
  };

  const getTransactionValue = (label: string) => {
    const option = transactionOptions.find(opt => opt.label === label);
    return option ? option.value : '';
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
      {/* <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <img
          src={bannerImg}
          className="hidden"
          onLoad={() => setLoaded(true)}
        />
      </div> */}

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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
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
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPropertyType(option.label);
                        setIsPropertyOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transaction Dropdown */}
              <div className="relative w-full lg:flex-1">
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
                      key={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTransaction(option.label);
                        setIsTransactionOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option.label}
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
                      key={option.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSqft(option.label);
                        setIsSqftOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option.label}
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
                className="w-full px-6 py-3 text-base bg-[#126AD8] text-white border border-[#0D4B99] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Selected Filters Display */}
          {(propertyType || transaction || sqft || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="text-sm text-gray-600">Selected filters:</div>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {propertyType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Property: {propertyType} ({getPropertyValue(propertyType)})
                  <button
                    onClick={() => setPropertyType('')}
                    className="text-green-500 hover:text-green-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {transaction && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  Transaction: {transaction} ({getTransactionValue(transaction)})
                  <button
                    onClick={() => setTransaction('')}
                    className="text-purple-500 hover:text-purple-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {sqft && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                  SQFT: {sqft}
                  <button
                    onClick={() => setSqft('')}
                    className="text-amber-500 hover:text-amber-700"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default Banner;