/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, MapPin, Minus } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import { useState, useEffect } from 'react';

const ExploreCityModal: React.FC<{
    onClose: any;
    selectedCity: any;
    onBack?: () => void;
    onViewDetails?: () => void; 
}> = ({ onClose, selectedCity, onBack, onViewDetails }) => {
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
    const [showSearching, setShowSearching] = useState(false);
    const [showProperties, setShowProperties] = useState(false);

    // Property size options
    const propertySizes = [
        'Upto 1,000 sq ft.',
        '1,000 - 2,000 sq ft.',
        '2,000 - 4,000 sq ft.',
        '4,000 - 8,000 sq ft.',
        '8,000 - 15,000 sq ft.',
        '15,000 - 30,000 sq ft.',
        '30,000 - 60,000 sq ft.',
        '60,000 sq ft. & above'
    ];

    // Effect to handle the searching timer
    useEffect(() => {
        if (selectedPricing) {
            setShowSearching(true);
            setShowProperties(false);
            
            const timer = setTimeout(() => {
                setShowSearching(false);
                setShowProperties(true);
            }, 4000); // 4 seconds

            return () => clearTimeout(timer);
        }
    }, [selectedPricing]);

    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails();
        }
    };

    return (
        <div className="flex items-start justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[520px]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-2"
                            >
                                <ArrowLeft size={20} className="text-gray-700" />
                            </button>
                        )}

                        {/* Bot Icon */}
                        <div>
                            <img src={chatbotLogo} alt="" />
                        </div>

                        {/* Logo */}
                        <div>
                            <img src={mainLogo} alt="" />
                        </div>
                    </div>
                    <button
                        className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={onClose}
                    >
                        <Minus size={18} strokeWidth={2.5} className="text-gray-900" />
                    </button>
                </div>

                {/* Content - Scrollable area */}
                <div className="p-5 h-[calc(520px-80px)] overflow-y-auto">
                    {/* Show property by location link */}
                    <div className="flex items-center justify-end gap-2 mb-5">
                        <div className='bg-white p-2 rounded-md shadow-xs'>
                            <span className="text-[#0D4B99] text-sm font-medium">Show property by location.</span>
                        </div>
                        <MapPin size={20} className="text-[#0D4B99]" />
                    </div>

                    {/* Location instruction */}
                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <img src={chatbot} alt="chatbot-img" />
                        </div>
                        <div className='bg-white p-2 rounded-md shadow-sm'>
                            <p className="text-gray-900 text-base leading-relaxed">
                                Here is the locations..
                            </p>
                            <p className="text-gray-900 text-base leading-relaxed">
                                Choose your preferred location:
                            </p>
                        </div>
                    </div>

                    {/* Selected City Card */}
                    <div className="mb-6">
                        <div className="relative rounded-2xl overflow-hidden cursor-pointer group h-56 w-50">
                            {/* Background Image */}
                            <img
                                src={selectedCity.image}
                                alt={selectedCity.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-4">
                                {/* Location Name */}
                                <h3 className="text-[#FDFEFF] text-xl font-semibold tracking-wide">
                                    {selectedCity.name}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* New content */}
                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <img src={chatbot} alt="chatbot-img" />
                        </div>
                        <div className='bg-white p-2 rounded-md shadow-sm'>
                            <p className="text-gray-900 text-base leading-relaxed">
                                What type of property are you looking for?
                            </p>
                        </div>
                    </div>

                    {/* More content to show scroll */}
                    <div className='flex gap-2 pl-12'>
                        <button
                            className={`rounded-md border px-2 py-1.5 hover:bg-gray-100 hover:text-black ${selectedProperty === 'Industrial'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C]'
                                }`}
                            onClick={() => setSelectedProperty('Industrial')}
                        >
                            Industrial
                        </button>
                        <button
                            className={`rounded-md border px-2 py-1.5 hover:bg-gray-100 hover:text-black  ${selectedProperty === 'Land'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C]'
                                }`}
                            onClick={() => setSelectedProperty('Land')}
                        >
                            Land
                        </button>
                        <button
                            className={`rounded-md border px-2 py-1.5 hover:bg-gray-100 hover:text-black  ${selectedProperty === 'Office'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C]'
                                }`}
                            onClick={() => setSelectedProperty('Office')}
                        >
                            Office
                        </button>
                        <button
                            className={`rounded-md border px-2 py-1.5 hover:bg-gray-100 hover:text-black  ${selectedProperty === 'Retail'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C]'
                                }`}
                            onClick={() => setSelectedProperty('Retail')}
                        >
                            Retail
                        </button>
                    </div>

                    {/* selection */}
                    {selectedProperty && (
                        <div className='mt-6'>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <img src={chatbot} alt="chatbot-img" />
                                </div>
                                <div className='bg-white p-2 rounded-md shadow-sm w-full'>
                                    <p className="text-gray-900 text-base leading-relaxed">
                                        Choose transaction type.
                                    </p>
                                </div>
                            </div>

                            {/* More content to show scroll */}
                            <div className='flex gap-2 pl-12'>
                                <button
                                    className={`rounded-md border px-2 py-1.5 ${selectedMethod === 'Rent'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C] hover:bg-gray-100'
                                        }`}
                                    onClick={() => setSelectedMethod('Rent')}
                                >
                                    Rent
                                </button>
                                <button
                                    className={`rounded-md border px-2 py-1.5 ${selectedMethod === 'Purchase'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-[#E7F0FB] border-[#B6D1F3] text-[#25292C] hover:bg-gray-100'
                                        }`}
                                    onClick={() => setSelectedMethod('Purchase')}
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    )}


                    {/* pricing */}
                    {selectedMethod && (
                        <div className='mt-6'>
                            <div className="flex items-start gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <img src={chatbot} alt="chatbot-img" />
                                </div>
                                <div className='bg-white p-2 rounded-md shadow-sm w-full'>
                                    <p className="text-gray-900 text-base leading-relaxed">
                                        What's your preferred property size?
                                    </p>
                                </div>
                            </div>

                            {/* Property size options */}
                            <div className='pl-12'>
                                {selectedPricing ? (
                                    // Show only selected button
                                    <button
                                        className='bg-blue-600 text-white rounded-md border border-blue-600 px-2 py-1.5 block'
                                    >
                                        {selectedPricing}
                                    </button>
                                ) : (
                                    // Show all buttons
                                    <>
                                        {propertySizes.map((size, index) => (
                                            <button
                                                key={index}
                                                className='bg-[#E7F0FB] rounded-md border border-[#B6D1F3] px-2 py-1.5 text-[#25292C] hover:bg-gray-100 mt-2 block w-full text-left'
                                                onClick={() => setSelectedPricing(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Searching message (shown for 4 seconds) */}
                    {selectedPricing && showSearching && (
                        <div className="flex items-start gap-3 mb-6 mt-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                <img src={chatbot} alt="chatbot-img" />
                            </div>
                            <div className='bg-white p-2 rounded-md shadow-sm w-full'>
                                <p className="text-gray-900 text-base leading-relaxed">
                                    Searching ...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Properties (shown after 4 seconds) */}
                    {selectedPricing && showProperties && (
                        <div>
                            <div className="flex items-start gap-3 mb-6 mt-4">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <img src={chatbot} alt="chatbot-img" />
                                </div>
                                <div>
                                    <div className='bg-white p-2 rounded-md shadow-sm w-full'>
                                        <p className="text-gray-900 text-base leading-relaxed">
                                            Here is your properties:
                                        </p>
                                    </div>

                                    {/* property */}
                                    <div className="mt-5 border border-[#E7F0FB] p-2 rounded-xl">
                                        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                                            {/* Property Image */}
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop"
                                                    alt="Property"
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                {/* POA and For Sale Badge */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <h2 className="text-[#0D4B99] text-lg font-bold">POA</h2>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                                        <span className="text-[#10B981] text-sm font-medium">For Sale</span>
                                                    </div>
                                                </div>

                                                {/* Property Title */}
                                                <div className="mb-4">
                                                    <h3 className="text-gray-900 text-base font-semibold leading-tight">
                                                        Cotton Mill B9 TILEYARD
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mt-1">P 6391</p>
                                                </div>

                                                {/* View Details Button */}
                                                <button 
                                                    className="w-full py-3 border-2 border-[#0D4B99] text-[#0D4B99] text-base font-semibold rounded-lg hover:bg-[#0D4B99] hover:text-white transition-colors"
                                                    onClick={handleViewDetails}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreCityModal;