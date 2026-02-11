import { MapPin } from 'lucide-react';
import chatbot from '../../../assets/chatbot-img.png';
import locImg1 from '../../../assets/searchLocation1.jpg'
import locImg2 from '../../../assets/searchLocation2.jpg'
import locImg3 from '../../../assets/searchLocation3.jpg'
import locImg4 from '../../../assets/searchLocation4.jpg'
const LocationSelectionModal: React.FC<{ 
  onClose: any;
  onSelectCity: (cityData: any) => void;
}> = ({ onSelectCity }) => {
    const locations = [
        {
            name: 'Dhaka',
            image: locImg1
        },
        {
            name: 'Liverpool',
            image: locImg2
        },
        {
            name: 'Lancashire',
            image: locImg3
        },
        {
            name: 'North Wales',
            image: locImg4
        }
    ];

    const handleExploreClick = (location: any) => {
        onSelectCity(location);
    };

    return (
        <div className="p-5 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* User Choice (Simulated chat) */}
            <div className="flex justify-end">
                <div className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] flex items-center gap-2">
                    <span className="text-sm font-medium">Show property by location.</span>
                    <MapPin size={16} />
                </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                        <img src={chatbot} alt="chatbot" className="w-6 h-6 object-contain" />
                    </div>
                </div>
                <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-[#2F3237] text-sm leading-relaxed">
                        Here is the locations.. Choose your preferred location:
                    </p>
                </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 gap-4 pb-4">
                {locations.map((location, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl overflow-hidden cursor-pointer group h-40 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Background Image */}
                        <img
                            src={location.image}
                            alt={location.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-end justify-between p-5 mt-auto">
                            <h3 className="text-white text-lg font-bold tracking-wide">
                                {location.name}
                            </h3>
                            <button 
                                className="px-6 py-2 bg-white text-[#0D4B99] text-sm font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 shadow-lg"
                                onClick={() => handleExploreClick(location)}
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationSelectionModal;