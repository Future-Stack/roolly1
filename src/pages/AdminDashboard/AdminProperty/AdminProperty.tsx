import React, { useState } from 'react';
import { Search, MapPin, Clock, Calendar, Info, MessageSquare, ArrowDown } from 'lucide-react';

interface PropertyCard {
    id: number;
    name: string;
    location: string;
    timeAgo: string;
    date: string;
    alertMessage: string;
    propertyType: string;
    estimatedPrice: string;
    sqft: string;
    transaction: string;
    broker: string;
}


const AdminProperty: React.FC = () => {
    const [selectedAssignment, setSelectedAssignment] = useState('All');
    const [selectedSource, setSelectedSource] = useState('All Sources');
    const [assignmentFilterOpen, setAssignmentFilterOpen] = useState(false);
    const [sourceFilterOpen, setSourceFilterOpen] = useState(false);
    const properties: PropertyCard[] = Array(5).fill({
        name: 'Lisa Anderson',
        location: 'PR001: Central Manchester Office Suite',
        timeAgo: '6m ago',
        date: '22/10/2025',
        alertMessage: 'Property Information From Vendor. Ready to process quickly.',
        propertyType: 'Land',
        estimatedPrice: '£2,500-£3,500',
        sqft: '1,000',
        transaction: 'Rent',
        broker: 'Floyd Miles'
    });


    const toggleAssignmentFilter = () => {
        setAssignmentFilterOpen(!assignmentFilterOpen);
        setSourceFilterOpen(false);
    };

    const toggleSourceFilter = () => {
        setSourceFilterOpen(!sourceFilterOpen);
        setAssignmentFilterOpen(false);
    };

    const closeAllDropdowns = () => {
        setAssignmentFilterOpen(false);
        setSourceFilterOpen(false);
    };

    const handleAssignmentSelect = (option: string) => {
        setSelectedAssignment(option);
        setAssignmentFilterOpen(false);
    };

    const handleSourceSelect = (option: string) => {
        setSelectedSource(option);
        setSourceFilterOpen(false);
    };

    return (
        <div>
            <h1 className='font-bold text-2xl mb-3'  onClick={closeAllDropdowns}>Dashboard Overview</h1>
            <p className='mb-5'>Welcome back! Here's what's happening with your platform today.</p>
            <div className="min-h-screen bg-gray-50 p-3 rounded-lg">
                {/* Header Section */}
                <div className="flex justify-between w-full">
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full">

                            {/* Search — 2/3 */}
                            <div className="relative w-full lg:w-2/3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                />
                            </div>

                            {/* Filters — 1/3 */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/3 relative">
                                {/* Assignment Filter */}
                                <div className="relative w-full sm:w-1/2">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleAssignmentFilter();
                                        }}
                                        className="flex justify-between items-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white cursor-pointer"
                                    >
                                        <button className="flex-1 text-left">{selectedAssignment}</button>
                                        <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${assignmentFilterOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Assignment Dropdown */}
                                    {assignmentFilterOpen && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="p-2">
                                                <button
                                                    onClick={() => handleAssignmentSelect('Land')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Land
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('Industrial')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Industrial
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('Office')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Office
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('Retail')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Retail
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Source Filter */}
                                <div className="relative w-full sm:w-1/2">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSourceFilter();
                                        }}
                                        className="flex justify-between items-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white cursor-pointer"
                                    >
                                        <button className="flex-1 text-left">{selectedSource}</button>
                                        <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${sourceFilterOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Source Dropdown */}
                                    {sourceFilterOpen && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="p-2">
                                                <button
                                                    onClick={() => handleSourceSelect('Floyd Miles')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Floyd Miles
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('Cameron Williamson')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Cameron Williamson
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('Darrell Steward')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Darrell Steward
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('Marvin McKinney')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Marvin McKinney
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('Guy Hawkins')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Guy Hawkins
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Cards */}
                <div className="mt-5">
                    <div className="space-y-4">
                        {properties.map((property, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                {/* Card Header */}
                                <div className="px-5 py-4">
                                    <div className="flex items-start justify-between ">
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-gray-900 mb-2">
                                                {property.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{property.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{property.timeAgo}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{property.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Alert Message */}
                                <div className='px-5'>
                                    <div className="px-5 py-3 bg-blue-50 border border-[#92BAED] rounded-sm">
                                        <div className="flex items-start gap-2">
                                            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-blue-700">{property.alertMessage}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="px-5 py-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                        {/* Property Type */}
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Property Type</div>
                                            <div className="text-sm font-medium text-gray-900">{property.propertyType}</div>
                                        </div>

                                        {/* Estimated Price */}
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Estimated Price</div>
                                            <div className="text-sm font-medium text-gray-900">{property.estimatedPrice}</div>
                                        </div>

                                        {/* Broker - Mobile/Tablet positioned here */}
                                        <div className="md:hidden">
                                            <div className="text-xs text-gray-500 mb-1.5">Broker</div>
                                            <input
                                                type="text"
                                                value={property.broker}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 bg-white"
                                            />
                                        </div>

                                        {/* SQFT */}
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">SQFT</div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {property.sqft} <span className="text-xs">sq</span>
                                            </div>
                                        </div>

                                        {/* Transaction */}
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Transaction</div>
                                            <div className="text-sm font-medium text-gray-900">{property.transaction}</div>
                                        </div>
                                    </div>

                                    {/* Bottom Section with Broker and Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                        {/* Broker Input - Desktop only */}
                                        <div className="hidden md:block flex-1">
                                            <div className="text-xs text-gray-500 mb-1.5">Broker</div>
                                            <input
                                                type="text"
                                                value={property.broker}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 bg-white"
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 md:ml-auto md:pt-5">
                                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-colors">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>Message Broker</span>
                                            </button>
                                            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                                                Edit Listing
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProperty;