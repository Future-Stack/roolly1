import { MapPin } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png';
import { useState, useEffect, useMemo } from 'react';
import { useGetPublicPropertiesQuery } from '@/redux/features/public/publicPropertyApi';
import PropertyCard from './components/PropertyCard';

const ExploreCityModal: React.FC<{
    onClose: any;
    selectedCity: any;
    onBack?: () => void;
    onViewDetails?: () => void;
}> = ({ selectedCity, onViewDetails }) => {
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
    const [showSearching, setShowSearching] = useState(false);
    const [showProperties, setShowProperties] = useState(false);

    // Helper to map size labels to numeric ranges
    const getAreaRange = (size: string | null) => {
        if (!size) return { gte: undefined, lte: undefined };
        const cleanSize = size.toLowerCase();
        if (cleanSize.includes('upto 1,000')) return { gte: 0, lte: 1000 };
        if (cleanSize.includes('1,000 - 2,000')) return { gte: 1000, lte: 2000 };
        if (cleanSize.includes('2,000 - 4,000')) return { gte: 2000, lte: 4000 };
        if (cleanSize.includes('4,000 - 8,000')) return { gte: 4000, lte: 8000 };
        if (cleanSize.includes('8,000 - 15,000')) return { gte: 8000, lte: 15000 };
        if (cleanSize.includes('15,000 - 30,000')) return { gte: 15000, lte: 30000 };
        if (cleanSize.includes('30,000 - 60,000')) return { gte: 30000, lte: 60000 };
        if (cleanSize.includes('60,000 sq ft. & above')) return { gte: 60000, lte: 1000000 };
        return { gte: undefined, lte: undefined };
    };

    const areaRange = useMemo(() => getAreaRange(selectedPricing), [selectedPricing]);

    // Prepare API search query
    const transactionLabel = selectedMethod === 'Purchase' ? 'sale' : 'lease';
    const { data: propertiesData, isFetching } = useGetPublicPropertiesQuery(
        {
            search: `${selectedCity?.name || ""} ${selectedProperty || ""} ${transactionLabel}`.trim(),
            built_area__gte: areaRange.gte,
            built_area__lte: areaRange.lte,
            page_size: 10
        },
        {
            skip: !selectedPricing 
        }
    );

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
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [selectedPricing]);

    const MessageWrapper: React.FC<{ children: React.ReactNode, type?: 'bot' | 'user' }> = ({ children, type = 'bot' }) => (
        <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-5 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {type === 'bot' && (
                <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                        <img src={chatbot} alt="chatbot" className="w-6 h-6 object-contain" />
                    </div>
                </div>
            )}
            <div className={`${type === 'user'
                ? 'bg-[#0446DE] text-white rounded-tr-none'
                : 'bg-white text-[#2F3237] border border-gray-100 rounded-tl-none'
                } px-5 py-3 rounded-2xl shadow-sm max-w-[80%]`}>
                {children}
            </div>
        </div>
    );

    return (
        <div className="p-5 flex flex-col gap-2 custom-scrollbar overflow-x-hidden">
            {/* Initial Context */}
            <div className="flex justify-end mb-4">
                <div className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] flex items-center gap-2">
                    <span className="text-sm font-medium">Show property by location.</span>
                    <MapPin size={16} />
                </div>
            </div>

            <MessageWrapper>
                <p className="text-sm leading-relaxed">
                    Here is the locations.. Choose your preferred location:
                </p>
            </MessageWrapper>

            {/* Selected City Display */}
            <div className="mb-6 animate-in zoom-in-95 duration-300">
                <div className="relative rounded-2xl overflow-hidden h-40 shadow-lg border border-gray-100">
                    <img src={selectedCity.image} alt={selectedCity.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                        <h3 className="text-[#FDFEFF] text-lg font-bold">{selectedCity.name}</h3>
                    </div>
                </div>
            </div>

            {/* Step 1: Property Type */}
            <MessageWrapper>
                <p className="text-sm leading-relaxed">What type of property are you looking for?</p>
            </MessageWrapper>

            <div className="flex flex-wrap gap-2 mb-6 ml-13">
                {['industrial', 'land', 'office', 'retail'].map(type => (
                    <button
                        key={type}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm capitalize ${selectedProperty === type
                            ? 'bg-blue-600 text-white shadow-blue-200'
                            : 'bg-[#E7F0FB] text-[#0D4B99] hover:bg-blue-100 border border-blue-50'
                            }`}
                        onClick={() => setSelectedProperty(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Step 2: Transaction Type */}
            {selectedProperty && (
                <>
                    <div className="flex justify-end mb-5">
                        <div
                            onClick={() => {
                                setSelectedProperty(null);
                                setSelectedMethod(null);
                                setSelectedPricing(null);
                            }}
                            className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] cursor-pointer hover:bg-blue-700 transition-colors group flex items-center gap-2"
                        >
                            <span className="text-sm font-medium">{selectedProperty}</span>
                            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">(Click to change)</span>
                        </div>
                    </div>
                    <MessageWrapper>
                        <p className="text-sm leading-relaxed">Choose transaction type.</p>
                    </MessageWrapper>
                    <div className="flex gap-2 mb-6 ml-13">
                        {['Rent', 'Purchase'].map(method => (
                            <button
                                key={method}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${selectedMethod === method
                                    ? 'bg-blue-600 text-white shadow-blue-200'
                                    : 'bg-[#E7F0FB] text-[#0D4B99] hover:bg-blue-100 border border-blue-50'
                                    }`}
                                onClick={() => setSelectedMethod(method)}
                            >
                                {method}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Step 3: Size */}
            {selectedMethod && (
                <>
                    <div className="flex justify-end mb-5">
                        <div
                            onClick={() => {
                                setSelectedMethod(null);
                                setSelectedPricing(null);
                            }}
                            className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] cursor-pointer hover:bg-blue-700 transition-colors group flex items-center gap-2"
                        >
                            <span className="text-sm font-medium">{selectedMethod}</span>
                            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">(Click to change)</span>
                        </div>
                    </div>
                    <MessageWrapper>
                        <p className="text-sm leading-relaxed">What's your preferred property size?</p>
                    </MessageWrapper>
                    <div className="space-y-2 mb-6 ml-13">
                        {selectedPricing ? (
                            <div className="flex justify-end">
                                <div
                                    onClick={() => setSelectedPricing(null)}
                                    className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] cursor-pointer hover:bg-blue-700 transition-colors group flex items-center gap-2"
                                >
                                    <span className="text-sm font-medium">{selectedPricing}</span>
                                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">(Click to change)</span>
                                </div>
                            </div>
                        ) : (
                            propertySizes.map(size => (
                                <button
                                    key={size}
                                    className="w-full text-left px-5 py-3 bg-[#E7F0FB] text-[#0D4B99] rounded-xl text-sm font-semibold border border-blue-50 hover:bg-blue-100 transition-all shadow-sm"
                                    onClick={() => setSelectedPricing(size)}
                                >
                                    {size}
                                </button>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* Final States */}
            {(showSearching || isFetching) && (
                <MessageWrapper>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
                        <span className="text-sm font-medium ml-2">Searching...</span>
                    </div>
                </MessageWrapper>
            )}

            {showProperties && !isFetching && (
                <>
                    <MessageWrapper>
                        <p className="text-sm leading-relaxed">Here are your properties:</p>
                    </MessageWrapper>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {propertiesData?.results?.length > 0 ? (
                            propertiesData.results.map((prop: any) => (
                                <div key={prop.id} className="animate-in zoom-in-95 duration-500">
                                    <PropertyCard
                                        property={prop}
                                        onNavigate={() => onViewDetails?.()}
                                        onAskAbout={() => onViewDetails?.()} // Lead to Survey/Contact
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-gray-400 text-sm">No properties found with these filters.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ExploreCityModal;
