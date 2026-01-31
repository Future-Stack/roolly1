import Pagination from '@/components/ui/Pagination';
import { useGetAdminLeadListQuery } from '@/redux/features/admin/lead/getAdminLeadListApi';
import { ArrowDown, Calendar, Clock, Clock3, Headset, Info, Mail, MapPin, Phone, Search, ShoppingBag, User, } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface Lead {
    id: string;
    name: string;
    status: 'Green' | 'Blue';
    secondaryStatus: 'Viewed' | 'Enquired' | 'NEW';
    propertyId: string;
    propertyName: string;
    timeAgo: string;
    date: string;
    businessType: string;
    budget: string;
    source: string;
    phone: string;
    email: string;
    alertMessage: string;
}

interface ApiLead {
    id: number;
    property: {
        id: number;
        property_onwer: {
            id: string;
            full_name: string;
            phone_number: string;
            email: string;
        };
        broker: {
            id: string;
            full_name: string;
            phone_number: string;
            email: string;
        };
        property_name: string;
        location: string;
        created_at: string;
        property_type: string;
    } | null;
    client_name: string;
    phone_number: string;
    email_address: string;
    lead_status: string;
    lead_traffic: string;
    budget_range: string | null;
    source: string;
    created_at: string;
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ApiLead[];
}

interface QueryParams {
    search?: string;
    lead_status?: string;
    property__property_type?: string;
    page?: number;
    page_size?: number;
}

const AdminLeads = () => {
    const [, setOpenActionMenuId] = useState<string | null>(null);
    const [assignmentFilterOpen, setAssignmentFilterOpen] = useState(false);
    const [sourceFilterOpen, setSourceFilterOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState('All');
    const [selectedSource, setSelectedSource] = useState('All Sources');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [totalLeads, setTotalLeads] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    
    // Build query params object
    const buildQueryParams = useCallback(() => {
        const params: QueryParams = {
            page: currentPage,
            page_size: pageSize
        };
        
        // Add search if exists
        if (searchTerm.trim()) {
            params.search = searchTerm;
        }
        
        // Add lead_status filter if not 'All'
        if (selectedAssignment !== 'All') {
            params.lead_status = selectedAssignment.toLowerCase();
        }
        
        // Add property type filter if not 'All Sources'
        if (selectedSource !== 'All Sources') {
            params.property__property_type = selectedSource.toLowerCase();
        }
        
        return params;
    }, [currentPage, pageSize, searchTerm, selectedAssignment, selectedSource]);

    // Use the query with dynamic parameters
    const { data: leadsList, isLoading } = useGetAdminLeadListQuery(buildQueryParams());


    // Format time ago
    const formatTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
        return `${Math.floor(diffInMinutes / 10080)}w ago`;
    };

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    // Format budget
    const formatBudget = (budget: string | null): string => {
        if (!budget) return 'Not specified';
        const amount = parseFloat(budget);
        if (isNaN(amount)) return budget;
        return `£${amount.toLocaleString('en-GB')}`;
    };

    // Get status display values
    const getStatusDisplay = (leadTraffic: string, leadStatus: string) => {
        // Primary status
        const statusMap: Record<string, 'Green' | 'Blue'> = {
            'green': 'Green',
            'red': 'Blue',
            'blue': 'Blue'
        };

        // Secondary status
        const secondaryStatusMap: Record<string, 'Viewed' | 'Enquired' | 'NEW'> = {
            'viewed': 'Viewed',
            'enquired': 'Enquired',
            'new': 'NEW'
        };

        return {
            status: statusMap[leadTraffic.toLowerCase()] || 'Blue',
            secondaryStatus: secondaryStatusMap[leadStatus.toLowerCase()] || 'NEW'
        };
    };

    // Transform API data to component data
    useEffect(() => {
        if (leadsList) {
            const apiData = leadsList as ApiResponse;
            console.log('API Data:', apiData);

            setTotalLeads(apiData.count);
            
            // Calculate total pages
            const calculatedPages = Math.ceil(apiData.count / pageSize);
            setTotalPages(calculatedPages > 0 ? calculatedPages : 1);

            const transformedLeads: Lead[] = apiData.results.map((apiLead: ApiLead) => {
                const { status, secondaryStatus } = getStatusDisplay(apiLead.lead_traffic, apiLead.lead_status);

                // Get alert message based on status
                const getAlertMessage = (): string => {
                    if (apiLead.source === 'AI') {
                        return 'New AI chat lead. Ready to proceed quickly.';
                    }
                    if (apiLead.lead_status === 'new') {
                        return 'New lead. Follow up required.';
                    }
                    if (apiLead.lead_status === 'enquired') {
                        return 'Client has enquired. Needs attention.';
                    }
                    return 'Lead requires follow up.';
                };

                return {
                    id: apiLead.id.toString(),
                    name: apiLead.client_name || 'Unknown',
                    status: status,
                    secondaryStatus: secondaryStatus,
                    propertyId: apiLead.property ? `PR${apiLead.property.id}` : 'N/A',
                    propertyName: apiLead.property ? apiLead.property.property_name : 'No property selected',
                    timeAgo: formatTimeAgo(apiLead.created_at),
                    date: formatDate(apiLead.created_at),
                    businessType: 'Consulting', // Default or from API if available
                    budget: formatBudget(apiLead.budget_range),
                    source: apiLead.source || 'Unknown',
                    phone: apiLead.phone_number || 'N/A',
                    email: apiLead.email_address || 'N/A',
                    alertMessage: getAlertMessage()
                };
            });

            setLeads(transformedLeads);
        }
    }, [leadsList, pageSize]);

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
            setCurrentPage(1); // Reset to first page on search
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSearch(value);
    };

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
        setOpenActionMenuId(null);
    };

    const handleAssignmentSelect = (option: string) => {
        setSelectedAssignment(option);
        setAssignmentFilterOpen(false);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleSourceSelect = (option: string) => {
        setSelectedSource(option);
        setSourceFilterOpen(false);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate unassigned leads (leads without property)
    const unassignedLeads = leads.filter(lead => lead.propertyName === 'No property selected').length;

    const statCards = [
        {
            icon: User,
            value: totalLeads.toString(),
            label: 'TOTAL LEADS',
            trend: 'up'
        },
        {
            icon: Clock3,
            value: unassignedLeads.toString(),
            label: 'Unassigned leads',
            trend: unassignedLeads > 0 ? 'up' : null
        },
        {
            icon: ShoppingBag,
            value: '1.2k',
            label: 'Completed Deals',
            trend: 'up'
        },
        {
            icon: Headset,
            value: '5/7',
            label: 'Brokers Online',
            trend: null
        }
    ];

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div onClick={closeAllDropdowns}>
            <h1 className='font-bold text-2xl mb-3'>Dashboard Overview</h1>
            <p className='mb-5'>Welcome back! Here's what's happening with your platform today.</p>
            <div className='bg-[#F8FAFC] p-2 rounded-lg'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-end mb-4">
                                <div className="bg-blue-600 p-2.5 rounded-lg">
                                    <card.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className={`text-3xl font-bold mb-1 ${card.value === unassignedLeads.toString() && unassignedLeads > 0 ? 'text-[#D81212]' : 'text-blue-600 '}`}>
                                {card.value}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {card.label}
                                {card.trend && <span className="text-green-500 text-xl font-bold">↑</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filters Bar */}
                <div className="flex justify-between mb-5 w-full">
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full">

                            {/* Search — 2/3 */}
                            <div className="relative w-full lg:w-2/3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                    onChange={handleSearchChange}
                                    defaultValue={searchTerm}
                                />
                            </div>

                            {/* Filters — 1/3 */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/3 relative">
                                {/* Assignment Filter (Lead Status) */}
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
                                                    onClick={() => handleAssignmentSelect('All')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    All
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('enquired')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Enquired
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('viewed')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Viewed
                                                </button>
                                                <button
                                                    onClick={() => handleAssignmentSelect('new')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    New
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Source Filter (Property Type) */}
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
                                                    onClick={() => handleSourceSelect('All Sources')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    All Sources
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('industrial')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Industrial
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('land')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                   Land
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('office')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Office
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('retail')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Retail
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('house')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    House
                                                </button>
                                                <button
                                                    onClick={() => handleSourceSelect('other')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                   Other
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 relative">
                    {leads.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                            <p className="text-gray-500 text-lg">No leads found</p>
                        </div>
                    ) : (
                        leads.map((lead) => (
                            <div key={lead.id} className="bg-white rounded-xl border border-gray-200 p-5 relative">
                                {/* Lead Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-[16px] font-semibold text-gray-900">{lead.name}</h3>
                                        <span className={`px-3 py-1 rounded text-[12px] font-semibold ${lead.status === 'Green' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'
                                            }`}>
                                            {lead.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded text-[12px] font-semibold ${lead.secondaryStatus === 'NEW' ? 'bg-orange-500 text-white rounded-full' : 'bg-blue-600 text-white rounded-full'
                                            }`}>
                                            {lead.secondaryStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Property Info */}
                                <div className="flex items-center gap-4 text-[13px] text-gray-600 mb-4">
                                    <div className="flex items-center gap-1.5 text-[#717182]">
                                        <MapPin className="w-4 h-4" strokeWidth={2} />
                                        <span>{lead.propertyId}: {lead.propertyName}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[#717182]">
                                        <Clock className="w-4 h-4" strokeWidth={2} />
                                        <span>{lead.timeAgo}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[#717182]">
                                        <Calendar className="w-4 h-4" strokeWidth={2} />
                                        <span>{lead.date}</span>
                                    </div>
                                </div>

                                {/* Alert Message */}
                                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-5">
                                    <div className="flex gap-2">
                                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <p className="text-[13px] text-blue-800 font-medium">{lead.alertMessage}</p>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-5">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Business Type</p>
                                        <p className="text-sm text-gray-900 font-normal">{lead.businessType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Budget</p>
                                        <p className="text-[14px] text-gray-900 font-normal">{lead.budget}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Source</p>
                                        <span className={`inline-block px-3 py-1 bg-white border rounded text-sm font-medium ${lead.source === 'AI'
                                                ? 'border-orange-500 text-orange-600'
                                                : 'border-blue-500 text-blue-600'
                                            }`}>
                                            {lead.source}
                                        </span>
                                    </div>
                                </div>

                                {/* Client Information */}
                                <div className="flex items-start justify-between pt-4 border-gray-200 bg-[#F9FAFB] p-3 rounded-lg">
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 mb-3">Client Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                <Phone className="w-4 h-4 text-gray-500" strokeWidth={2} />
                                                <span className='font-medium'>{lead.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                <Mail className="w-4 h-4 text-gray-500" strokeWidth={2} />
                                                <span className='font-medium'>{lead.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <Pagination 
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminLeads;