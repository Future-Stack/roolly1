import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, MapPin, Clock, Calendar, Info, MessageSquare, ArrowDown, Mail, Phone } from 'lucide-react';
import { useGetAllPropertyQuery } from '@/redux/features/admin/proper-management/getAllPropertyApi';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination';
import { useCreateMessageMutation } from '@/redux/features/message/createMessageApi';

interface PropertyOwner {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
}

interface Broker {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
}

interface PropertyData {
    id: number;
    property_onwer: PropertyOwner;
    broker: Broker;
    property_name: string;
    location: string;
    created_at: string;
    property_type: string;
    estimated_price: string;
    built_area: string;
    transaction: string;
    is_listed: boolean;
}

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
    brokerEmail: string;
    brokerPhone: string;
    propertyData: PropertyData;
}

const AdminProperty: React.FC = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState('All');
    const [selectedBroker, setSelectedBroker] = useState('All Brokers');
    const [propertyTypeFilterOpen, setPropertyTypeFilterOpen] = useState(false);
    const [brokerFilterOpen, setBrokerFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrokers, setFilteredBrokers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [createMessage] = useCreateMessageMutation();

    // Use useMemo for queryParams to prevent unnecessary re-renders
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {
            page: currentPage.toString(),
            page_size: itemsPerPage.toString(),
        };

        if (selectedPropertyType !== 'All') {
            params.property_type = selectedPropertyType.toLowerCase();
        }
        if (selectedBroker !== 'All Brokers') {
            params.broker__full_name = selectedBroker;
        }
        if (searchTerm) {
            params.search = searchTerm;
        }

        return params;
    }, [currentPage, selectedPropertyType, selectedBroker, searchTerm]);

    const { data: propertyResponse, isLoading, error } = useGetAllPropertyQuery(queryParams, {
    });

    const propertiesData: PropertyData[] = useMemo(() =>
        propertyResponse?.results || propertyResponse || []
        , [propertyResponse]);

    // Calculate pagination values
    const totalProperties = propertyResponse?.count || 0;
    const totalPages = Math.ceil(totalProperties / itemsPerPage);

    // Calculate display range
    const getDisplayRange = useCallback(() => {
        const start = ((currentPage - 1) * itemsPerPage) + 1;
        const end = Math.min(currentPage * itemsPerPage, totalProperties);
        return { start, end };
    }, [currentPage, itemsPerPage, totalProperties]);

    const { start, end } = getDisplayRange();

    // Helper function to format time ago
    const getTimeAgo = useCallback((dateString: string): string => {
        const createdDate = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }, []);

    // Helper function to format date
    const formatDate = useCallback((dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }, []);

    // Helper function to format property type
    const formatPropertyType = useCallback((type: string): string => {
        const typeMap: Record<string, string> = {
            'house': 'House',
            'land': 'Land',
            'industrial': 'Industrial',
            'office': 'Office',
            'retail': 'Retail',
            'other': 'Other'
        };
        return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
    }, []);

    // Helper function to format transaction type
    const formatTransaction = useCallback((transaction: string): string => {
        const transactionMap: Record<string, string> = {
            'sale': 'Sale',
            'rent': 'Rent',
            'lease': 'Lease'
        };
        return transactionMap[transaction] || transaction.charAt(0).toUpperCase() + transaction.slice(1);
    }, []);

    // Helper function to format price
    const formatPrice = useCallback((price: string): string => {
        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) return '£0';

        if (priceNum >= 1000000) {
            return `£${(priceNum / 1000000).toFixed(2)}M`;
        } else if (priceNum >= 1000) {
            return `£${(priceNum / 1000).toFixed(2)}K`;
        } else {
            return `£${priceNum.toFixed(2)}`;
        }
    }, []);

    // Helper function to format area
    const formatArea = useCallback((area: string): string => {
        const areaNum = parseFloat(area);
        if (isNaN(areaNum)) return '0 sqft';

        return `${areaNum.toLocaleString('en-US', { maximumFractionDigits: 2 })} sqft`;
    }, []);

    // Generate alert message based on property status
    const getAlertMessage = useCallback((property: PropertyData): string => {
        if (!property.is_listed) {
            return 'Property is not listed. Needs review before publishing.';
        }

        const price = parseFloat(property.estimated_price);
        if (price > 5000000) {
            return 'Premium property. High-value transaction expected.';
        } else if (price < 100000) {
            return 'Budget-friendly property. Quick sale expected.';
        } else {
            return 'Property information from vendor. Ready to process quickly.';
        }
    }, []);

    // Extract unique brokers for filter
    useEffect(() => {
        if (propertiesData && propertiesData.length > 0) {
            const uniqueBrokers = Array.from(
                new Set(propertiesData
                    .map(p => p.broker?.full_name)
                    .filter((name): name is string => !!name) // Filter out undefined/null
                )
            );
            setFilteredBrokers(uniqueBrokers);
        } else {
            setFilteredBrokers([]);
        }
    }, [propertiesData]);

    // Transform API data to PropertyCard format
    const properties: PropertyCard[] = useMemo(() =>
        propertiesData.map((property: PropertyData) => ({
            id: property.id,
            name: property.property_onwer?.full_name || 'Unknown Owner',
            location: property.location,
            timeAgo: getTimeAgo(property.created_at),
            date: formatDate(property.created_at),
            alertMessage: getAlertMessage(property),
            propertyType: formatPropertyType(property.property_type),
            estimatedPrice: formatPrice(property.estimated_price),
            sqft: formatArea(property.built_area),
            transaction: formatTransaction(property.transaction),
            broker: property.broker?.full_name || 'Unassigned',
            brokerEmail: property.broker?.email || '',
            brokerPhone: property.broker?.phone_number || '',
            propertyData: property
        }))
        , [propertiesData, getTimeAgo, formatDate, getAlertMessage, formatPropertyType, formatPrice, formatArea, formatTransaction]);

    const togglePropertyTypeFilter = useCallback(() => {
        setPropertyTypeFilterOpen(prev => !prev);
        setBrokerFilterOpen(false);
    }, []);

    const toggleBrokerFilter = useCallback(() => {
        setBrokerFilterOpen(prev => !prev);
        setPropertyTypeFilterOpen(false);
    }, []);

    const closeAllDropdowns = useCallback(() => {
        setPropertyTypeFilterOpen(false);
        setBrokerFilterOpen(false);
    }, []);

    const handlePropertyTypeSelect = useCallback((option: string) => {
        setSelectedPropertyType(option);
        setPropertyTypeFilterOpen(false);
        setCurrentPage(1);
    }, []);

    const handleBrokerSelect = useCallback((option: string) => {
        setSelectedBroker(option);
        setBrokerFilterOpen(false);
        setCurrentPage(1);
    }, []);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setCurrentPage(1);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSelectedPropertyType('All');
        setSelectedBroker('All Brokers');
        setSearchTerm('');
        setCurrentPage(1);
    }, []);

    // const handleEditListing = useCallback((propertyId: number) => {
    //     console.log('Edit property:', propertyId);
    //     navigate(`/admin/property/edit/${propertyId}`);
    // }, [navigate]);


    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const propertyTypeOptions = useMemo(() =>
        ['All', 'House', 'Land', 'Industrial', 'Office', 'Retail', 'Other']
        , []);

    const handleCreateMessage = useCallback(async (ownerId: string) => {
        console.log('Owner ID:', ownerId);
        try {
            const res = await createMessage({
                user_id: ownerId
            }).unwrap();
            navigate(`/admin-dashboard/messages`, {
                state: { res }
            });

        } catch (err) {
            console.log('Error creating message:', err);
        }
    }, [createMessage]);

    return (
        <div>
            <h1 className='font-bold text-2xl mb-3' onClick={closeAllDropdowns}>Property Management</h1>
            <p className='mb-5'>Manage and track all properties in your portfolio.</p>

            {isLoading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 mt-2">Loading properties...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600 text-sm">
                        Error loading properties. Please try again.
                    </p>
                </div>
            )}

            {!isLoading && !error && (
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
                                        placeholder="Search by property name, location, owner, broker..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={handleClearSearch}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* Filters — 1/3 */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/3 relative">
                                    {/* Property Type Filter */}
                                    <div className="relative w-full sm:w-1/2">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePropertyTypeFilter();
                                            }}
                                            className="flex justify-between items-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white cursor-pointer"
                                        >
                                            <button className="flex-1 text-left truncate">Type: {selectedPropertyType}</button>
                                            <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${propertyTypeFilterOpen ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Property Type Dropdown */}
                                        {propertyTypeFilterOpen && (
                                            <div
                                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="p-2">
                                                    {propertyTypeOptions.map((option) => (
                                                        <button
                                                            key={option}
                                                            onClick={() => handlePropertyTypeSelect(option)}
                                                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-sm ${selectedPropertyType === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                                                }`}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Broker Filter */}
                                    <div className="relative w-full sm:w-1/2">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleBrokerFilter();
                                            }}
                                            className="flex justify-between items-center px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white cursor-pointer"
                                        >
                                            <button className="flex-1 text-left truncate">Broker: {selectedBroker}</button>
                                            <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${brokerFilterOpen ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Broker Dropdown */}
                                        {brokerFilterOpen && (
                                            <div
                                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div className="p-2">
                                                    <button
                                                        onClick={() => handleBrokerSelect('All Brokers')}
                                                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-sm ${selectedBroker === 'All Brokers' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                                            }`}
                                                    >
                                                        All Brokers
                                                    </button>
                                                    {filteredBrokers.map((broker) => (
                                                        <button
                                                            key={broker}
                                                            onClick={() => handleBrokerSelect(broker)}
                                                            className={`w-full text-left px-4 py-2 hover:bg-gray-50 rounded text-sm ${selectedBroker === broker ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                                                }`}
                                                        >
                                                            {broker}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Results Summary */}
                            {!isLoading && !error && totalProperties > 0 && (
                                <div className="mt-2 text-sm text-gray-600">
                                    Showing {start} to {end} of {totalProperties} propert{totalProperties !== 1 ? 'ies' : 'y'}
                                    {(selectedPropertyType !== 'All' || selectedBroker !== 'All Brokers' || searchTerm) && ' (filtered)'}
                                </div>
                            )}

                            {/* Active Filters */}
                            {(selectedPropertyType !== 'All' || selectedBroker !== 'All Brokers' || searchTerm) && (
                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                    <span className="text-sm text-gray-600">Active filters:</span>
                                    {selectedPropertyType !== 'All' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Type: {selectedPropertyType}
                                            <button
                                                onClick={() => handlePropertyTypeSelect('All')}
                                                className="ml-1 text-blue-800 hover:text-blue-900"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    )}
                                    {selectedBroker !== 'All Brokers' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Broker: {selectedBroker}
                                            <button
                                                onClick={() => handleBrokerSelect('All Brokers')}
                                                className="ml-1 text-green-800 hover:text-green-900"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    )}
                                    {searchTerm && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Search: {searchTerm}
                                            <button
                                                onClick={handleClearSearch}
                                                className="ml-1 text-yellow-800 hover:text-yellow-900"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    )}
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Property Cards */}
                    <div className="mt-5">
                        {properties.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    {searchTerm || selectedPropertyType !== 'All' || selectedBroker !== 'All Brokers'
                                        ? 'Try adjusting your filters or search terms.'
                                        : 'No properties available. Add your first property!'}
                                </p>
                                {(searchTerm || selectedPropertyType !== 'All' || selectedBroker !== 'All Brokers') && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {properties.map((property) => (
                                    <div key={property.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                        {/* Card Header */}
                                        <div className="px-5 py-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                                                        {property.name} (Owner)
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span className="font-medium">Property:</span>
                                                            <span>{property.propertyData.property_name}</span>
                                                        </div>
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
                                                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${property.propertyData.is_listed
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {property.propertyData.is_listed ? 'Listed' : 'Unlisted'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Alert Message */}
                                        <div className='px-5'>
                                            <div className={`px-5 py-3 border rounded-sm ${property.propertyData.is_listed
                                                ? 'bg-blue-50 border-[#92BAED]'
                                                : 'bg-yellow-50 border-yellow-200'
                                                }`}>
                                                <div className="flex items-start gap-2">
                                                    <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${property.propertyData.is_listed
                                                        ? 'text-blue-600'
                                                        : 'text-yellow-600'
                                                        }`} />
                                                    <p className={`text-sm ${property.propertyData.is_listed
                                                        ? 'text-blue-700'
                                                        : 'text-yellow-700'
                                                        }`}>
                                                        {property.alertMessage}
                                                    </p>
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

                                                {/* Built Area */}
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Built Area</div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {property.sqft}
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
                                                    <div className="text-xs text-gray-500 mb-1.5">Assigned Broker</div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={property.broker}
                                                            readOnly
                                                            className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 bg-white"
                                                        />
                                                        <div className="flex gap-1">
                                                            <a
                                                                href={`mailto:${property.brokerEmail}`}
                                                                className="p-2 hover:bg-gray-100 rounded"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Mail className="w-4 h-4 text-gray-500" />
                                                            </a>
                                                            <a
                                                                href={`tel:${property.brokerPhone}`}
                                                                className="p-2 hover:bg-gray-100 rounded"
                                                            >
                                                                <Phone className="w-4 h-4 text-gray-500" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 md:ml-auto md:pt-5">
                                                    <button
                                                        onClick={() => handleCreateMessage(property.propertyData.property_onwer?.id)}
                                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition-colors"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                        <span>Message Broker</span>
                                                    </button>
                                                    {/* <button
                                                        onClick={() => handleEditListing(property.id)}
                                                        className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                                                    >
                                                        Edit Listing
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination - Only show if we have more than 5 properties */}
                    {!isLoading && !error && totalPages > 1 && (
                        <div className='flex flex-col items-center my-8'>
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                            <div className="mt-3 text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminProperty;