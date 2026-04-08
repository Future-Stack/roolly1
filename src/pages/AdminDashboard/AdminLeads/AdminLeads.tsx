import Pagination from '@/components/ui/Pagination';
import { useGetAdminLeadDetailQuery, useGetAdminLeadListQuery } from '@/redux/features/admin/lead/getAdminLeadListApi';
import { useDeleteAdminLeadMutation } from '@/redux/features/admin/lead/deleteAdminLeadApi';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { Anchor, ArrowDown, Calendar,  Clock, Clock3, Info, Mail, MapPin, MoreVertical, Phone, Search, ShoppingBag,  User, } from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
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
    sqft_range: string | null;
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

const STATUS_OPTIONS = [
    { value: 'All', label: 'All' },
    { value: 'enquired', label: 'Enquired' },
    { value: 'viewed', label: 'Viewed' },
    { value: 'terms_sent', label: 'Terms Sent' },
    { value: 'in_legals', label: 'In Legals' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' },
];

const SOURCE_OPTIONS = [
    { value: 'All Sources', label: 'All Sources' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'land', label: 'Land' },
    { value: 'office', label: 'Office' },
    { value: 'retail', label: 'Retail' },
];

const AdminLeads = () => {
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
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
    const {data: leadsOverview} = useGetAdminLeadDetailQuery(undefined);
    console.log(totalLeads)
    console.log(leads);

    // Build query params object
    const queryParams = useMemo(() => {
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
    const { data: leadsList, isLoading, refetch } = useGetAdminLeadListQuery(queryParams);
    const [deleteAdminLead, { isLoading: isDeleting }] = useDeleteAdminLeadMutation();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<string | null>(null);


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
    // const formatBudget = (sqft_range: string | null): string => {
    //     if (!sqft_range) return 'Not specified';
    //     const amount = parseFloat(sqft_range);
    //     if (isNaN(amount)) return sqft_range;
    //     return `£${amount.toLocaleString('en-GB')}`;
    // };

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
                    budget: apiLead.sqft_range ? apiLead.sqft_range : 'Not specified',
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

    const handleMoreClick = (leadId: string) => {
        setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
    };

    const handleDeleteLeadRequest = (leadId: string) => {
        setLeadToDelete(leadId);
        setDeleteModalOpen(true);
        setOpenActionMenuId(null);
    };

    const handleDeleteConfirm = async () => {
        if (!leadToDelete) return;
        try {
            await deleteAdminLead(parseInt(leadToDelete)).unwrap();
            setDeleteModalOpen(false);
            setLeadToDelete(null);
            refetch();
        } catch (err: any) {
            alert(err?.data?.detail || 'Failed to delete lead');
        }
    };

    // Calculate unassigned leads (leads without property)
    // const unassignedLeads = leads.filter(lead => lead.propertyName === 'No property selected').length;

    const statCards = [
        {
            icon: User,
            value: leadsOverview?.total_leads?.toString(),
            label: 'TOTAL LEADS',
            trend: leadsOverview?.total_leads > 0 ? 'up' : null
        },
        {
            icon: Clock3,
            value: leadsOverview?.unassigned_leads?.toString(),
            label: 'Unassigned leads',
            trend: leadsOverview?.unassigned_leads > 0 ? 'up' : null
        },
        {
            icon: ShoppingBag,
            value: leadsOverview?.completed_leads?.toString(),
            label: 'Completed Leads',
            trend: leadsOverview?.completed_leads > 0 ? 'up' : null
        },
        {
            icon: Anchor,
            value: leadsOverview?.qualified_leads?.toString(),
            label: 'Qualified Leads',
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
            <div className="mb-6">
                <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2'>Dashboard Overview</h1>
                <p className='text-sm sm:text-base text-gray-600'>Welcome back! Here's what's happening with your platform today.</p>
            </div>
            <div className='bg-[#F8FAFC] p-2 rounded-lg'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {card.label}
                                </div>
                                <div className="bg-blue-50 p-2 rounded-xl">
                                    <card.icon className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className={`text-3xl sm:text-4xl font-black ${card.value === leadsOverview?.unassigned_leads?.toString() && leadsOverview?.unassigned_leads > 0 ? 'text-[#D81212]' : 'text-gray-900'}`}>
                                    {card.value}
                                </div>
                                {card.trend && (
                                    <span className="text-green-500 flex items-center text-sm font-bold">
                                        <ArrowDown className="w-4 h-4 rotate-180" />
                                        12%
                                    </span>
                                )}
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
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
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
                                        className="flex justify-between items-center px-5 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-white hover:border-blue-500 transition-all bg-gray-50 cursor-pointer shadow-sm"
                                    >
                                        <span className="flex-1 text-left">
                                            {STATUS_OPTIONS.find(opt => opt.value === selectedAssignment)?.label || selectedAssignment}
                                        </span>
                                        <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${assignmentFilterOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Assignment Dropdown */}
                                    {assignmentFilterOpen && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="p-1">
                                                {STATUS_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        value={opt.value}
                                                        onClick={() => handleAssignmentSelect(opt.value)}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 rounded-lg text-sm font-medium transition-colors capitalize"
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
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
                                        className="flex justify-between items-center px-5 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-white hover:border-blue-500 transition-all bg-gray-50 cursor-pointer shadow-sm"
                                    >
                                        <span className="flex-1 text-left">
                                            {SOURCE_OPTIONS.find(opt => opt.value === selectedSource)?.label || selectedSource}
                                        </span>
                                        <ArrowDown className={`w-4 h-4 flex-shrink-0 transition-transform ${sourceFilterOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Source Dropdown */}
                                    {sourceFilterOpen && (
                                        <div
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="p-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                                                {SOURCE_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        value={opt.value}
                                                        onClick={() => handleSourceSelect(opt.value)}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 rounded-lg text-sm font-medium transition-colors capitalize"
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
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

                                    {/* Action Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMoreClick(lead.id);
                                            }}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>

                                        {openActionMenuId === lead.id && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setOpenActionMenuId(null)}
                                                />
                                                <div className="absolute right-0 top-full mt-2 z-50 w-[160px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                                    <div className="p-1">
                                                        <button
                                                            disabled={isDeleting}
                                                            onClick={() => handleDeleteLeadRequest(lead.id)}
                                                            className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 rounded transition-colors flex items-center gap-2"
                                                        >
                                                            Delete Lead
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
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
                                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
                                    <div className="flex gap-3">
                                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                        <p className="text-sm text-blue-900 font-semibold">{lead.alertMessage}</p>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-5">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Property Type</p>
                                        <p className="text-sm text-gray-900 font-normal">{lead.businessType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Sqft Range</p>
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
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setLeadToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                title="Delete Lead"
                message="Are you sure you want to delete this lead? This action cannot be undone."
            />
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