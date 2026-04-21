import React from 'react';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentRole } from '@/redux/features/auth/authSlice';

interface PropertyCardProps {
    property: any;
    onNavigate: (id: string) => void;
    onAskAbout: (id: string | number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onNavigate, onAskAbout }) => {
    const role = useAppSelector(selectCurrentRole);
    const canSeePrice = role === 'ADMIN' || role === 'BROKER' || role === 'VENDOR';

    return (
        <div
            onClick={() => onAskAbout(property.id)}
            className="min-w-[240px] max-w-[240px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:border-blue-200 transition-colors group"
        >
            <div className="h-32 bg-gray-100 relative">
                <img
                    src={property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    alt={property.property_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-3 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-sm">
                        {canSeePrice ? (
                            property.estimated_price != null ? (
                                `£${Math.abs(parseFloat(property.estimated_price)).toLocaleString()}${property.price_type === 'pcm' ? ' PCM' : property.price_type === 'pa' ? ' PA' : (property.transaction === 'lease' ? '/month' : '')}`
                            ) : 'POA'
                        ) : (
                            property.is_poa || property.estimated_price === 'POA' || !property.estimated_price || parseFloat(property.estimated_price) < 0
                                ? 'POA'
                                : `£${parseFloat(property.estimated_price).toLocaleString()}${property.price_type === 'pcm' ? ' PCM' : property.price_type === 'pa' ? ' PA' : (property.transaction === 'lease' ? '/month' : '')}`
                        )}
                    </span>
                    <div className=" bg-[#C8FFDD] backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        <span className="text-[#0C7233] text-xs font-normal  tracking-wider">{property.transaction === 'sale' ? 'For Sale' : 'For Lease'}</span>
                    </div>
                </div>
                <hr className='w-full h-[1px] bg-gray-100 my-2' />
                <h4 className="text-gray-900 font-semibold text-xs truncate">{property.property_name}</h4>
                <div className="flex items-start gap-1">
                    <svg className="w-3 h-3 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500 text-[10px] line-clamp-1">{property.location}</p>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(property.id);
                    }}
                    className="mt-2 w-full py-1.5 border border-blue-600 text-blue-600 rounded-lg text-[10px] font-medium hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
