import Pagination from '@/components/ui/Pagination';
import { useGetAllUsersPropertyQuery } from '@/redux/features/users/getAllUsersPropertyApi';
import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
    id: number;
    image: string;
    badge: string;
    badgeType: 'sale' | 'lease';
    title: string;
    subtitle: string;
    description: string;
    propertyType: string;
    transaction: string;
}

interface ApiProperty {
    id: number;
    property_name: string;
    image: string;
    property_type: string;
    transaction: 'sale' | 'lease';
    location: string;
    description: string;
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiProperty[];
}

interface QueryParams {
    search?: string;
    property_type?: string;
    transaction?: 'sale' | 'lease';
    page?: number;
    page_size?: number;
    ordering?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    image,
    badge,
    title,
    subtitle,
    description,
    propertyType,
    transaction,
}) => {
    return (
        <div className="bg-white rounded-lg p-2 overflow-hidden border border-[#E7F0FB] hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${propertyType === 'office' ? 'bg-blue-100 text-blue-800' :
                            propertyType === 'industrial' ? 'bg-orange-100 text-orange-800' :
                                propertyType === 'retail' ? 'bg-purple-100 text-purple-800' :
                                    propertyType === 'land' ? 'bg-green-100 text-green-800' :
                                        propertyType === 'house' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                        }`}>
                        {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-sm font-semibold">{transaction === 'sale' ? 'For Sale' : 'For Lease'}</span>
                    <span className={`text-sm font-medium rounded-full px-2 ${transaction === 'sale'
                            ? 'text-green-500 bg-[#C8FFDD]'
                            : 'text-orange-500 bg-[#FFE5CC]'
                        }`}>
                        <span className=''>•</span> {badge}
                    </span>
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1">{title}</h3>
                <p className="text-gray-500 text-sm mb-2">{subtitle}</p>
                <p className="text-gray-500 text-sm mb-4">{description}</p>
                {/* Corrected: Using the id parameter */}
                <Link to={`/property-details/${id}`}>
                    <button className="w-full py-2.5 hover:bg-gray-50 text-black border border-[#126AD8] text-sm font-medium rounded transition-colors">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

const AllProperty: React.FC = () => {
    // State management
    const [activeTab, setActiveTab] = useState<'sale' | 'lease'>('sale');
    const [sortOpen, setSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Filter states
    const [propertyTypes, setPropertyTypes] = useState({
        office: false,
        industrial: false,
        retail: false,
        land: false,
        house: false,
    });

    // Build query parameters
    const buildQueryParams = useCallback((): QueryParams => {
        const params: QueryParams = {
            transaction: activeTab,
            page: currentPage,
            page_size: pageSize,
        };

        // Add search if exists
        if (searchTerm.trim()) {
            params.search = searchTerm;
        }

        // Add property type filter if any selected
        const selectedTypes = Object.entries(propertyTypes)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .map(([key]) => key);

        if (selectedTypes.length > 0) {
            params.property_type = selectedTypes.join(',');
        }

        // Add sorting
        switch (sortBy) {
            case 'newest':
                params.ordering = '-id';
                break;
            case 'oldest':
                params.ordering = 'id';
                break;
            case 'name_asc':
                params.ordering = 'property_name';
                break;
            case 'name_desc':
                params.ordering = '-property_name';
                break;
            default:
                params.ordering = '-id';
        }

        return params;
    }, [activeTab, currentPage, pageSize, searchTerm, propertyTypes, sortBy]);

    // API call with dynamic parameters
    const { data: apiData, isLoading } = useGetAllUsersPropertyQuery(buildQueryParams());

    // Transform API data to component data
    const [properties, setProperties] = useState<PropertyCardProps[]>([]);

    useEffect(() => {
        if (apiData) {
            const data = apiData as ApiResponse;

            setTotalProperties(data.count);
            setTotalPages(Math.ceil(data.count / pageSize));

            const transformedProperties: PropertyCardProps[] = data.results.map((property: ApiProperty) => {
                return {
                    id: property.id,
                    image: property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
                    badge: property.transaction === 'sale' ? 'For Sale' : 'For Lease',
                    badgeType: property.transaction,
                    title: property.property_name || 'Untitled Property',
                    subtitle: property.location || 'Location not specified',
                    description: property.description?.substring(0, 80) + (property.description?.length > 80 ? '...' : '') || 'No description available',
                    propertyType: property.property_type,
                    transaction: property.transaction,
                };
            });

            setProperties(transformedProperties);
        }
    }, [apiData, pageSize]);



    const handleTabChange = (tab: 'sale' | 'lease') => {
        setActiveTab(tab);
        setCurrentPage(1); 
    };

    const handleSortSelect = (sortOption: string) => {
        setSortBy(sortOption);
        setSortOpen(false);
        setCurrentPage(1); 
    };

    const handlePropertyTypeChange = (type: keyof typeof propertyTypes) => {
        setPropertyTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetFilters = () => {
        setPropertyTypes({
            office: false,
            industrial: false,
            retail: false,
            land: false,
            house: false,
        });
        setSearchTerm('');
        setCurrentPage(1);
        setSortBy('newest');
    };

    // Sort options mapping
    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'name_asc', label: 'Name: A to Z' },
        { value: 'name_desc', label: 'Name: Z to A' },
    ];

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row px-6 mb-6">
                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-64 bg-white p-6 border-r border-gray-200 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                    {/* Sale/Lease Tabs */}
                    <div className="flex mb-6">
                        <button
                            onClick={() => handleTabChange('sale')}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'sale'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            For Sale
                        </button>
                        <button
                            onClick={() => handleTabChange('lease')}
                            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'lease'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            For Lease
                        </button>
                    </div>

                    {/* Property Type */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-gray-900 font-bold text-sm">Property Type</h3>
                            <button
                                onClick={() => setPropertyTypes({
                                    office: false,
                                    industrial: false,
                                    retail: false,
                                    land: false,
                                    house: false,
                                })}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.office}
                                    onChange={() => handlePropertyTypeChange('office')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Office</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.industrial}
                                    onChange={() => handlePropertyTypeChange('industrial')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Industrial</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.retail}
                                    onChange={() => handlePropertyTypeChange('retail')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Retail</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.land}
                                    onChange={() => handlePropertyTypeChange('land')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Land</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.house}
                                    onChange={() => handlePropertyTypeChange('house')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">House</span>
                            </label>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        onClick={resetFilters}
                        className="w-full py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium rounded transition-colors"
                    >
                        Reset All Filters
                    </button>

                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {properties.length} of {totalProperties} properties
                        </p>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='flex-1 p-2'>
                    <div className="p-2 border border-[#E7F0FB] rounded-2xl">
                        {/* Sort Dropdown */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {activeTab === 'sale' ? 'Properties for Sale' : 'Properties for Lease'}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {totalProperties} properties found
                                </p>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setSortOpen(!sortOpen)}
                                    className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900 bg-white px-4 py-2 border border-gray-300 rounded-md"
                                >
                                    Sort by: <span className='font-semibold'>
                                        {sortOptions.find(opt => opt.value === sortBy)?.label || 'Newest'}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {sortOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleSortSelect(option.value)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Grid */}
                        <div className='border-t border-[#B6D1F3] pt-4'>
                            {properties.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {properties.map((property) => (
                                            <PropertyCard
                                                key={property.id}
                                                id={property.id} // ✅ id passed here
                                                image={property.image}
                                                badge={property.badge}
                                                badgeType={property.badgeType}
                                                title={property.title}
                                                subtitle={property.subtitle}
                                                description={property.description}
                                                propertyType={property.propertyType}
                                                transaction={property.transaction}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex justify-center mt-8">
                                        <Pagination
                                            totalPages={totalPages}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProperty;