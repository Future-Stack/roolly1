import Pagination from '@/components/ui/Pagination';
import { useGetAllUsersPropertyQuery } from '@/redux/features/users/getAllUsersPropertyApi';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentRole } from '@/redux/features/auth/authSlice';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Home, Store, TreePine, Warehouse } from 'lucide-react';

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
    price?: number | null;
    priceType?: 'pcm' | 'pa' | null;
    isPoa?: boolean;
}

interface ApiProperty {
    id: number;
    property_name: string;
    image: string;
    property_type: string;
    transaction: 'sale' | 'lease';
    location: string;
    description: string;
    price?: number | null;
    price_type?: 'pcm' | 'pa' | null;
    pcm?: string | number | null;
    pa?: string | number | null;
    is_poa?: boolean;
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiProperty[];
}

const coordinateLookup: Record<string, [number, number]> = {
    'London': [51.5074, -0.1278],
    'Manchester': [53.4808, -2.2426],
    'Liverpool': [53.4084, -2.9916],
    'Birmingham': [52.4862, -1.8904],
    'Leeds': [53.7997, -1.5492],
    'Sheffield': [53.3811, -1.4701],
    'Glasgow': [55.8642, -4.2518],
    'Edinburgh': [55.9533, -3.1883],
    'Cardiff': [51.4816, -3.1791],
    'Belfast': [54.5973, -5.9301],
    'Lancashire': [53.7632, -2.7044],
    'North Wales': [53.1362, -4.0954],
    'South Wales': [51.6000, -3.9167],
    'West Midlands': [52.4862, -1.8904],
    'East Midlands': [52.8300, -1.3270],
    'North East England': [54.9783, -1.6178],
    'North West England': [53.483959, -2.244644],
    'South East England': [51.3556, -0.5593],
    'South West England': [51.4545, -2.5879],
    'Yorkshire and the Humber': [53.9915, -1.5412],
    'Scotland': [56.4907, -4.2026],
    'Wales': [52.1307, -3.7837],
    'Northern Ireland': [54.7877, -6.4923],
    'UK': [55.3781, -3.4360],
    'Bangladesh': [23.6850, 90.3563],
    'Dhaka': [23.8103, 90.4125],
    'Mirpur': [23.8041, 90.3673],
    'Dhanmondi': [23.7461, 90.3742],
    'Uttara': [23.8759, 90.3795],
    'Gulshan': [23.7925, 90.4078],
    'Banani': [23.7937, 90.4066],
    'Mohammadpur': [23.7662, 90.3589],
};

const getDistanceMiles = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Radius of earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};


interface QueryParams {
    search?: string;
    property_type?: string | string[];
    transaction?: 'sale' | 'lease';
    price_type?: string | string[];
    page?: number;
    page_size?: number;
    ordering?: string;
    built_area__gte?: number;
    built_area__lte?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    image,
    badge,
    title,
    subtitle,
    // location_description,
    propertyType,
    transaction,
    // price,
    // priceType,
    // isPoa,
}) => {
    const role = useAppSelector(selectCurrentRole);
    const canSeePrice = role === 'ADMIN' || role === 'BROKER' || role === 'VENDOR';

    // Get property type icon
    const getPropertyTypeIcon = (type: string) => {
        const icons: Record<string, React.ReactNode> = {
            industrial: <Building className="w-5 h-5 text-blue-500" />,
            commercial: <Building className="w-5 h-5 text-purple-500" />,
            residential: <Home className="w-5 h-5 text-green-500" />,
            land: <TreePine className="w-5 h-5 text-amber-500" />,
            retail: <Store className="w-5 h-5 text-red-500" />,
            warehouse: <Warehouse className="w-5 h-5 text-gray-500" />,
        };
        return icons[type] || <Building className="w-5 h-5 text-gray-500" />;
    };

    return (
        <div className="bg-white rounded-lg p-2 overflow-hidden border border-[#E7F0FB] hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 flex items-center gap-1">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                        {getPropertyTypeIcon(propertyType)}
                    </div>
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
                <h3 className="text-gray-900 font-bold text-base mb-1 line-clamp-1">{title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <span className="truncate">{subtitle}</span>
                </div>
                <Link to={`/details/${id}`}>
                    <button className="w-full py-2.5 hover:bg-gray-50 text-black border border-[#126AD8] text-sm font-medium rounded transition-colors hover:bg-blue-50">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

const AllProperty: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const urlSearch = queryParams.get('search') || '';
    const urlRadius = queryParams.get('radius') || '50';
    const urlPropertyType = queryParams.get('property_type') || '';
    const urlTransaction = queryParams.get('transaction') as 'sale' | 'lease' || 'sale';
    const urlBuiltAreaGte = queryParams.get('built_area__gte');
    const urlBuiltAreaLte = queryParams.get('built_area__lte');
    const urlPriceType = queryParams.getAll('price_type'); // Get all values for repeated param

    const [activeTab, setActiveTab] = useState<'sale' | 'lease'>(urlTransaction);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [searchTerm, setSearchTerm] = useState(urlSearch);
    const [radius, setRadius] = useState<number>(parseInt(urlRadius));
    const [sortBy, setSortBy] = useState('newest');

    const [searchCenter, setSearchCenter] = useState<[number, number] | null>(null);

    // Dynamic Geocoding Logic for SearchTerm
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchCenter(null);
            return;
        }
        const q = searchTerm.trim();
        const areaKey = Object.keys(coordinateLookup).find(k => k.toLowerCase() === q.toLowerCase());
        if (areaKey) {
            setSearchCenter(coordinateLookup[areaKey]);
            return;
        }
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=gb,bd`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setSearchCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                } else {
                    setSearchCenter(null);
                }
            })
            .catch(() => setSearchCenter(null));
    }, [searchTerm]);

    // Price type filter: null = show all, 'pcm' or 'pa' = filter
    const [priceTypeFilter, setPriceTypeFilter] = useState<{ pcm: boolean; pa: boolean }>({
        pcm: urlPriceType.includes('pcm'),
        pa: urlPriceType.includes('pa'),
    });

    // Filter states - Initialize from URL
    const [propertyTypes, setPropertyTypes] = useState({
        office: urlPropertyType.includes('office'),
        industrial: urlPropertyType.includes('industrial'),
        retail: urlPropertyType.includes('retail'),
        land: urlPropertyType.includes('land'),
        // house: urlPropertyType.includes('house'),
    });

    // State to store first result and all results
    const [firstResult, setFirstResult] = useState<ApiProperty | null>(null);
    console.log(firstResult)
    const [allResults, setAllResults] = useState<ApiProperty[]>([]);
    console.log(allResults)
    const hasUrlFilters = urlSearch || urlPropertyType || urlBuiltAreaGte || urlBuiltAreaLte || urlTransaction !== 'sale';
    const buildQueryParams = useCallback((): QueryParams => {
        const params: QueryParams = {
            transaction: activeTab,
            page: 1, // High static limit for local logic
            page_size: 1000,
        };
        // Removed params.search; we handle string match and distance locally

        const selectedTypes = Object.entries(propertyTypes)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .map(([key]) => key);

        if (selectedTypes.length > 0) {
            params.property_type = selectedTypes;
        }

        if (urlBuiltAreaGte) {
            params.built_area__gte = parseInt(urlBuiltAreaGte);
        }

        if (urlBuiltAreaLte) {
            params.built_area__lte = parseInt(urlBuiltAreaLte);
        }

        // Add price_type filter
        const selectedPriceTypes = Object.entries(priceTypeFilter)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        if (selectedPriceTypes.length > 0) {
            params.price_type = selectedPriceTypes;
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

        console.log('API Request Params:', params);
        return params;
    }, [activeTab, propertyTypes, priceTypeFilter, sortBy, urlBuiltAreaGte, urlBuiltAreaLte]);

    const { data: apiData, isLoading, error } = useGetAllUsersPropertyQuery(buildQueryParams());

    const [properties, setProperties] = useState<PropertyCardProps[]>([]);


    // Process API response
    useEffect(() => {
        if (apiData) {
            const data = apiData as ApiResponse;

            // Optional: local filtering via Nominatim / Distance
            let filteredResults = data.results;

            if (searchTerm.trim()) {
                filteredResults = filteredResults.filter((p: ApiProperty) => {
                    const locStr = p.location ? p.location.toLowerCase() : "";
                    const termStr = searchTerm.toLowerCase();
                    const textMatch = locStr.includes(termStr);

                    if (searchCenter) {
                        // find area pos for the property
                        const pAreaKey = Object.keys(coordinateLookup).find(k => locStr.includes(k.toLowerCase()));
                        let pPos = pAreaKey ? coordinateLookup[pAreaKey] : null;

                        if (pPos) {
                            const dist = getDistanceMiles(searchCenter[0], searchCenter[1], pPos[0], pPos[1]);
                            if (dist <= radius) return true;
                        }
                    }
                    return textMatch;
                });
            }

            setTotalProperties(filteredResults.length);
            setTotalPages(Math.ceil(filteredResults.length / pageSize));

            const slicedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

            if (slicedResults.length > 0) {
                setFirstResult(slicedResults[0]);
                setAllResults(slicedResults);
            } else {
                setFirstResult(null);
                setAllResults([]);
            }

            const transformedProperties: PropertyCardProps[] = slicedResults.map((property: ApiProperty) => {
                const finalPrice = property.price ?? (property.pcm ? parseFloat(property.pcm as string) : (property.pa ? parseFloat(property.pa as string) : null));
                const finalPriceType = property.price_type ?? (property.pcm ? 'pcm' : (property.pa ? 'pa' : null));

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
                    price: finalPrice,
                    priceType: finalPriceType as 'pcm' | 'pa' | null,
                    isPoa: property.is_poa,
                };
            });

            setProperties(transformedProperties);
        }
    }, [apiData, currentPage, pageSize, searchTerm, searchCenter, radius]);

    // Log error if any
    useEffect(() => {
        if (error) {
            console.error('API Error:', error);
        }
    }, [error]);

    // Log URL params on component mount
    useEffect(() => {
        console.log('URL Query Parameters from Banner:', {
            search: urlSearch,
            property_type: urlPropertyType,
            transaction: urlTransaction,
            built_area__gte: urlBuiltAreaGte,
            built_area__lte: urlBuiltAreaLte,
            hasUrlFilters: hasUrlFilters
        });
    }, [urlSearch, urlPropertyType, urlTransaction, urlBuiltAreaGte, urlBuiltAreaLte, hasUrlFilters]);

    const handleTabChange = (tab: 'sale' | 'lease') => {
        setActiveTab(tab);
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

    // const handlePriceTypeChange = (type: 'pcm' | 'pa') => {
    //     setPriceTypeFilter(prev => ({ ...prev, [type]: !prev[type] }));
    //     setCurrentPage(1);
    // };

    const resetFilters = () => {
        setPropertyTypes({
            office: false,
            industrial: false,
            retail: false,
            land: false,
            // house: false,
        });
        setPriceTypeFilter({ pcm: false, pa: false });
        setSearchTerm('');
        setRadius(50);
        setCurrentPage(1);
        setSortBy('newest');
    };
    const activeUrlFilters = [];
    if (urlSearch) activeUrlFilters.push(`Search: "${urlSearch}"`);
    if (urlPropertyType) activeUrlFilters.push(`Property Type: ${urlPropertyType}`);
    if (urlTransaction && urlTransaction !== 'sale') activeUrlFilters.push(`Transaction: ${urlTransaction}`);
    if (urlBuiltAreaGte && urlBuiltAreaLte) activeUrlFilters.push(`Area: ${urlBuiltAreaGte}-${urlBuiltAreaLte} sqft`);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-gray-600">Loading properties...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row px-4 md:px-6 py-4 w-full">
                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-sm mb-6 lg:mb-0 lg:mr-6 lg:sticky lg:top-4 lg:h-fit">

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

                    {/* Search Input */}
                    <div className="mb-6">
                        <h3 className="text-gray-900 font-bold text-sm mb-2">Search</h3>
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <h3 className="text-gray-900 font-bold text-sm mb-2">Distance</h3>
                        <select
                            value={radius}
                            onChange={(e) => {
                                setRadius(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={1}>+ 1 Mile</option>
                            <option value={3}>+ 3 Miles</option>
                            <option value={5}>+ 5 Miles</option>
                            <option value={10}>+ 10 Miles</option>
                            <option value={20}>+ 20 Miles</option>
                            <option value={50}>+ 50 Miles</option>
                            <option value={100}>+ 100 Miles</option>
                        </select>
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
                                    // house: false,
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
                            {/* <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={propertyTypes.house}
                                    onChange={() => handlePropertyTypeChange('house')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">House</span>
                            </label> */}
                        </div>
                    </div>

                    {/* Price Type Filter */}
                    {/* <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-gray-900 font-bold text-sm">Price Type</h3>
                            <button
                                onClick={() => setPriceTypeFilter({ pcm: false, pa: false })}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={priceTypeFilter.pcm}
                                    onChange={() => handlePriceTypeChange('pcm')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">PCM <span className="text-gray-400 text-xs">(Per Calendar Month)</span></span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={priceTypeFilter.pa}
                                    onChange={() => handlePriceTypeChange('pa')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">PA <span className="text-gray-400 text-xs">(Per Annum)</span></span>
                            </label>
                        </div>
                    </div> */}

                    {/* Reset Filters Button */}
                    <button
                        onClick={resetFilters}
                        className="w-full py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium rounded transition-colors mb-4"
                    >
                        Reset All Filters
                    </button>

                    {/* Results Count */}
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {properties.length} of {totalProperties} properties
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Page {currentPage} of {totalPages}
                        </p>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='flex-1'>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        {/* Header with Results Info */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {activeTab === 'sale' ? 'Properties for Sale' : 'Properties for Lease'}
                                </h2>
                                <div className="flex items-center space-x-4 mt-2">
                                    <p className="text-sm text-gray-600">
                                        {totalProperties} properties found
                                        {searchTerm && ` for "${searchTerm}"`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Property Grid */}
                        <div className='border-t border-gray-200 pt-6'>
                            {properties.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <Building className="w-16 h-16 mx-auto" />
                                    </div>
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
                                        {properties
                                            .map((property) => (
                                                <PropertyCard
                                                    key={property.id}
                                                    id={property.id}
                                                    image={property.image}
                                                    badge={property.badge}
                                                    badgeType={property.badgeType}
                                                    title={property.title}
                                                    subtitle={property.subtitle}
                                                    description={property.description}
                                                    propertyType={property.propertyType}
                                                    transaction={property.transaction}
                                                    price={property.price}
                                                    priceType={property.priceType}
                                                    isPoa={property.isPoa}
                                                />
                                            ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className=' pt-4'>
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
                                                {/* Pagination - Perfectly Centered */}
                                                {totalPages > 1 && (
                                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                                        <div className="flex justify-center px-4">
                                                            <div className="w-full max-w-3xl">
                                                                <Pagination
                                                                    totalPages={totalPages}
                                                                    currentPage={currentPage}
                                                                    onPageChange={handlePageChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
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