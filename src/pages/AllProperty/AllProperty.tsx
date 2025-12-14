import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface PropertyCardProps {
    image: string;
    badge: string;
    badgeType: 'sale' | 'rent';
    title: string;
    subtitle: string;
    description: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    image,
    badge,
    title,
    subtitle,
    description,
}) => {
    return (
        <div className="bg-white rounded-lg p-2 overflow-hidden border border-[#E7F0FB] hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
             
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-sm font-semibold">{title}</span>
                    <span className="text-green-500 text-sm font-medium bg-[#C8FFDD] rounded-full px-2

                    "><span className=''>•</span> {badge}</span>
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1">{subtitle}</h3>
                <p className="text-gray-500 text-sm mb-4">{description}</p>
                <button className="w-full py-2.5 hover:bg-gray-50  text-black border border-[#126AD8] text-sm font-medium rounded transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

const AllProperty: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'purchase' | 'rent'>('purchase');
    const [sortOpen, setSortOpen] = useState(false);
    const [propertyTypes, setPropertyTypes] = useState({
        propertyType: false,
        office: false,
        industrial: false,
        retail: false,
        land: false,
    });
    const [sqftRanges, setSqftRanges] = useState({
        upto1000: false,
        '1000-2000': false,
        '2000-4000': false,
        '4000-8000': false,
        '8000-15000': false,
        '15000-30000': false,
        '30000-60000': false,
        '60000-above': false,
    });

    const properties: PropertyCardProps[] = [
        {
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
        {
            image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=500&h=300&fit=crop',
            badge: 'For Sale',
            badgeType: 'sale',
            title: 'POA',
            subtitle: 'Cotton Mill B9 TILEYARD',
            description: 'Lorem Ipsum is simply dummy',
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row px-6 mb-6 mt-5
        ">
            {/* Left Sidebar - Filters */}
            <div className="w-full lg:w-64 bg-white p-6 border-r border-gray-200 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
                {/* Purchase/Rent Tabs */}
                <div className="flex mb-6">
                    <button
                        onClick={() => setActiveTab('purchase')}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'purchase'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Purchase
                    </button>
                    <button
                        onClick={() => setActiveTab('rent')}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'rent'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Rent
                    </button>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                    <h3 className="text-gray-900 font-bold text-sm mb-3">Property Type</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={propertyTypes.propertyType}
                                onChange={(e) =>
                                    setPropertyTypes({ ...propertyTypes, propertyType: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Property Type</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={propertyTypes.office}
                                onChange={(e) =>
                                    setPropertyTypes({ ...propertyTypes, office: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Office</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={propertyTypes.industrial}
                                onChange={(e) =>
                                    setPropertyTypes({ ...propertyTypes, industrial: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Industrial</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={propertyTypes.retail}
                                onChange={(e) =>
                                    setPropertyTypes({ ...propertyTypes, retail: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Retail</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={propertyTypes.land}
                                onChange={(e) =>
                                    setPropertyTypes({ ...propertyTypes, land: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Land</span>
                        </label>
                    </div>
                </div>

                {/* SQFT */}
                <div>
                    <h3 className="text-gray-900 font-bold text-sm mb-3">SQFT</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges.upto1000}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, upto1000: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Upto 1,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['1000-2000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '1000-2000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">1,000 - 2,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['2000-4000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '2000-4000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">2,000- 4,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['4000-8000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '4000-8000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">4,000 - 8,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['8000-15000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '8000-15000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">8,000 - 15,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['15000-30000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '15000-30000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">15,000 - 30,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['30000-60000']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '30000-60000': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">30,000 - 60,000</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={sqftRanges['60000-above']}
                                onChange={(e) =>
                                    setSqftRanges({ ...sqftRanges, '60000-above': e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">60,000 & above</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Right Content Area */}
            <div className='mt-6 p-2'>
                <div className="flex-1 p-2 border border-[#E7F0FB] rounded-2xl">
                    {/* Sort Dropdown */}
                    <div className="flex justify-end mb-2">
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900 bg-white px-4"
                            >
                                Short by: <span className='font-semibold'>Newest</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {sortOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                    <div className="py-1">
                                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Newest
                                        </button>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Price: Low to High
                                        </button>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Price: High to Low
                                        </button>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Most Popular
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Property Grid */}
                    <div className='border-t border-[#B6D1F3]'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            {properties.map((property, index) => (
                                <PropertyCard key={index} {...property} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProperty;