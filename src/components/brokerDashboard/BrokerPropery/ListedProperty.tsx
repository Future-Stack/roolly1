import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Calendar, Info, MoreVertical, MessageSquare} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetListedPropertyApiQuery } from '@/redux/features/broker/property/getListedPropertyApi';
import Pagination from '@/components/ui/Pagination';

interface PropertyOwner {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
}

interface PropertyItem {
    id: number;
    property_owner: PropertyOwner;
    property_name: string;
    location: string;
    estimated_price: string;
    property_type: string;
    built_area: string;
    created_at: string;
    transaction: string;
}

interface PropertyCardProps {
    property: PropertyItem;
}

// Helper function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

// Helper function to calculate time ago
const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
        return `${diffMins}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else {
        return `${diffDays}d ago`;
    }
};

// Helper function to format property type
const formatPropertyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
};

// Helper function to format transaction type
const formatTransaction = (transaction: string) => {
    return transaction.charAt(0).toUpperCase() + transaction.slice(1);
};

// Helper function to format price
const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numPrice);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const {
        property_owner,
        property_name,
        location,
        estimated_price,
        property_type,
        built_area,
        created_at,
        transaction,
        id
    } = property;

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 mb-4">
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[17px] font-medium text-gray-900">{property_owner.full_name}</h3>
                    <div className="relative -mt-1" ref={dropdownRef}>
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <MoreVertical size={20} />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-1 w-22 bg-[#FDFEFF] border border-gray-200 rounded-lg shadow-lg z-10 flex justify-center">
                                <div className="py-1">
                                    <Link to={`${id}/view`}>
                                        <button className="w-full py-2.5 text-center text-[#1D1F22] hover:bg-gray-50 text-sm font-medium">
                                            View
                                        </button>
                                    </Link>
                                    <Link to={`${id}`}>
                                        <button className="w-full py-2.5 text-center text-[#1D1F22] hover:bg-gray-50 text-sm font-medium">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Property Details Row */}
                <div className="flex items-center gap-4 text-[13px] text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} strokeWidth={2} />
                        <span>PRO{id.toString().padStart(3, '0')}: {location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} strokeWidth={2} />
                        <span>{getTimeAgo(created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} strokeWidth={2} />
                        <span>{formatDate(created_at)}</span>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="mx-5 mb-4 bg-blue-50 border border-blue-200 rounded-md px-3 py-2.5">
                <div className="flex items-start gap-2">
                    <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] text-blue-700">
                        Property Information From Vendor. Ready to process quickly.
                    </p>
                </div>
            </div>

            {/* Property Details Grid */}
            <div className="px-5 pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-5">
                    {/* Property Type */}
                    <div>
                        <div className="text-[13px] text-gray-500 mb-1">Property Type</div>
                        <div className="text-[15px] text-gray-900 font-normal">
                            {formatPropertyType(property_type)}
                        </div>
                    </div>

                    {/* SQFT */}
                    <div>
                        <div className="text-[13px] text-gray-500 mb-1">SQFT</div>
                        <div className="text-[15px] text-gray-900 font-normal">
                            {parseFloat(built_area).toLocaleString()} sqft
                        </div>
                    </div>

                    {/* Transaction */}
                    <div>
                        <div className="text-[13px] text-gray-500 mb-1">Transaction</div>
                        <div className="text-[15px] text-gray-900 font-normal">
                            {formatTransaction(transaction)}
                        </div>
                    </div>

                    {/* Property Name */}
                    <div className="md:col-span-3">
                        <div className="text-[13px] text-gray-500 mb-1">Property Name</div>
                        <div className="text-[15px] text-gray-900 font-normal">{property_name}</div>
                    </div>

                    {/* Estimated Price */}
                    <div className="md:col-span-3">
                        <div className="text-[13px] text-gray-500 mb-1">Estimated Price</div>
                        <div className="text-[15px] text-gray-900 font-normal">
                            {formatPrice(estimated_price)}
                        </div>
                    </div>
                </div>

                {/* Source and Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="text-[13px] text-gray-500 mb-1.5">Source</div>
                        <button className="px-4 py-1.5 text-[13px] text-blue-600 font-medium border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                            From Vendor
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-medium rounded-sm transition-colors">
                            <MessageSquare size={18} strokeWidth={2} />
                            Message Vendor
                        </button>
                        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-sm transition-colors">
                            View and Update Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ListedProperty: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1); // Reset to first page when searching
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Prepare query params
    const queryParams = {
        page: currentPage,
        page_size: pageSize,
        search: debouncedSearchTerm || undefined,
    };

    // Fetch data with pagination and search
    const { data: listedProperty, isLoading, isError } = useGetListedPropertyApiQuery(queryParams);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    // Clear search
    const handleClearSearch = () => {
        setSearchTerm('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Calculate pagination values
    const totalPages = listedProperty?.count ? Math.ceil(listedProperty.count / pageSize) : 0;
    const totalItems = listedProperty?.count || 0;
    const startItem = totalItems > 0 ? ((currentPage - 1) * pageSize) + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading properties...</div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <div className="text-red-500 mb-4">Failed to load properties</div>
                        <p className="text-gray-400">Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full p-4">

                {/* Results Count */}
                <div className="mb-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        {totalItems > 0 ? (
                            <>
                                Showing <span className="font-semibold">{startItem}-{endItem}</span> of{' '}
                                <span className="font-semibold">{totalItems}</span> properties
                            </>
                        ) : (
                            'No properties found'
                        )}
                    </div>
                </div>

                {/* No properties state */}
                {(!listedProperty?.results || listedProperty.results.length === 0) ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <div className="text-gray-500 mb-4">
                            {searchTerm ? 'No properties match your search' : 'No properties have been listed yet'}
                        </div>
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Properties List */}
                        <div className="space-y-4">
                            {listedProperty.results.map((property: PropertyItem) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col items-center my-8">
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
                    </>
                )}
            </div>
        </div>
    );
};

export default ListedProperty;