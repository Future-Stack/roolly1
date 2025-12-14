/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Minus } from 'lucide-react';
import chatbotLogo from '../../../assets/logo2.png';
import mainLogo from '../../../assets/main-logo.png';
import chatbot from '../../../assets/chatbot-img.png';

const LocationSelectionModal: React.FC<{ 
  onClose: any;
  onSelectCity: (cityData: any) => void;
}> = ({ onClose, onSelectCity }) => {
    const locations = [
        {
            name: 'Manchester',
            image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=500&fit=crop'
        },
        {
            name: 'Liverpool',
            image: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?w=400&h=500&fit=crop'
        },
        {
            name: 'London',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=500&fit=crop'
        }
    ];

    const handleExploreClick = (location: any) => {
        onSelectCity(location);
    };

    return (
        <div className="flex items-start justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[520px]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
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

                    {/* Location Cards */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-3 pb-4">
                        {locations.map((location, index) => (
                            <div
                                key={index}
                                className="relative rounded-2xl overflow-hidden cursor-pointer group h-56"
                            >
                                {/* Background Image */}
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                                    {/* Explore Button */}
                                    <button 
                                        className="px-6 py-2 text-white text-sm font-medium rounded-sm hover:bg-white hover:text-black transition-colors shadow-lg border border-white"
                                        onClick={() => handleExploreClick(location)}
                                    >
                                        Explore
                                    </button>

                                    {/* Location Name */}
                                    <h3 className="text-white text-xl font-semibold tracking-wide">
                                        {location.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSelectionModal;