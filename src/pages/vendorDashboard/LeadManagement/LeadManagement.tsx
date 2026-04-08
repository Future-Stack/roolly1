import Pagination from '@/components/vendorDashboard/Leads/Pagination';
import { useGetVendorLeadsQuery, type VendorLead } from '@/redux/features/vendor/getVendorLeadsApi';
import { Mail, MessageSquare, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';

// interface Lead {
//     id: string;
//     name: string;
//     property: string;
//     propertyType: string;
//     budget: string;
//     client_name: string;
//     property_name: string;
//     property_type: string;
//     sqft_range: string;
//     lead_traffic: 'green' | 'amber' | 'red';
//     created_at: string;
//     broker_phone_number: string;
//     broker_email_address: string;
//     comments?: string;
// }

const LeadManagement: React.FC = () => {
    //   const [pageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    //   const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["green", "amber", "red"]);
    const { data: leadsResponse, isLoading } = useGetVendorLeadsQuery({ page: currentPage });
    console.log(leadsResponse)


    // ✅ NEW: Comment modal state
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [selectedLeadForComment, setSelectedLeadForComment] = useState<number | null>(null);
    const [comments, setComments] = useState<{ [key: number]: string }>({});

    const getTrafficColor = (traffic: string) => {
        switch (traffic.toLowerCase()) {
            case 'green':
                return 'bg-green-500 text-white';
            case 'amber':
                return 'bg-amber-500 text-white';
            case 'red':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-blue-600';
            case 'enquired': return 'bg-purple-600';
            case 'viewed': return 'bg-orange-600';
            case 'terms_sent': return 'bg-[#9333EA]';
            case 'in_legals': return 'bg-indigo-600';
            case 'completed': return 'bg-green-600';
            case 'closed': return 'bg-gray-600';
            default: return 'bg-gray-600';
        }
    };
    // Format status display
    const formatStatus = (status: string) => {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };


    const leads: VendorLead[] = leadsResponse?.results || [];
    const totalPages = Math.ceil((leadsResponse?.count || 0) / 10);

    // ✅ NEW: Filter leads based on selected traffic
    const filteredLeads = leads.filter(lead =>
        (selectedFilters.length === 0 || selectedFilters.includes(lead.lead_traffic)) &&
        (lead.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.property_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    // ✅ NEW: Toggle filter
    const toggleFilter = (traffic: string) => {
        setSelectedFilters(prev =>
            prev.includes(traffic)
                ? prev.filter(f => f !== traffic)
                : [...prev, traffic]
        );
    };

    // const handleCommentSave = () => {
    //     if (selectedLeadForComment !== null) {
    //         setCommentModalOpen(false);
    //         setSelectedLeadForComment(null);
    //     }
    // };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading leads...</div>;
    }

    return (
        <div className="w-full min-h-screen">
            {/* Header Section */}
            <div className="pt-8 pb-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                            Lead Management
                        </h1>
                        <p className="text-md text-gray-600 font-normal mt-4">
                            View and manage all property inquiries
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-[505px] mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search by client or property name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[46px] pl-12 pr-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* ✅ NEW: Traffic Filter Checkboxes */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-gray-700">Filter by Traffic:</span>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"

                            checked={selectedFilters.includes('green')}
                            onChange={() => toggleFilter('green')}
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="inline-block px-3 py-1 rounded text-[13px] font-medium bg-green-500 text-white">
                            Green
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedFilters.includes('amber')}
                            onChange={() => toggleFilter('amber')}
                            className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="inline-block px-3 py-1 rounded text-[13px] font-medium bg-amber-500 text-white">
                            Amber
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedFilters.includes('red')}
                            onChange={() => toggleFilter('red')}
                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="inline-block px-3 py-1 rounded text-[13px] font-medium bg-red-500 text-white">
                            Red
                        </span>
                    </label>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">ID</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Leads</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Property</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Property Type</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Sqft Range</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Location</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Traffic</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Status</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Date</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Comments</th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead,index) => (
                            <tr
                                key={lead.id}
                                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                            >
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">{lead.id}</td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">{lead.client_name}</td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal capitalize">{lead.property_name}</td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal capitalize whitespace-nowrap">{lead.property_type}</td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">{lead.sqft_range}</td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">{lead.location}</td>
                                <td className="px-6 py-5">
                                    <span className={`inline-block px-3 py-1 rounded text-[13px] font-medium capitalize ${getTrafficColor(lead.lead_traffic)}`}>
                                        {lead.lead_traffic}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium text-white ${getStatusColor(lead.lead_status)}`}>
                                        {formatStatus(lead.lead_status)}
                                    </span>
                                </td>

                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-5">
                                    <button
                                        onClick={() => {
                                            setSelectedLeadForComment(index);
                                            setCommentModalOpen(true);
                                        }}
                                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                        title="Add/View Comment"
                                    >
                                        <MessageSquare className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        {(comments[index] || lead.comment) && (
                                            <span className="ml-1 text-xs text-blue-600 -mt-1">•</span>
                                            )}
                                    </button>
                                </td>
                                <td className="px-6 py-5 relative">
                                    <div className="flex items-center gap-3">
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title={`Contact: ${lead.broker_phone_number}`}>
                                            <Phone onClick={() => window.location.href = `tel:${lead.broker_phone_number}`} className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title={`Email: ${lead.broker_email_address}`}>
                                            <Mail onClick={() => window.location.href = `mailto:${lead.broker_email_address}`} className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>
                                        {/* <button
                                            onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Comment Modal */}
            {commentModalOpen && selectedLeadForComment !== null && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setCommentModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comment</h3>
                        <textarea
                            value={
                                comments[selectedLeadForComment] ??
                                filteredLeads[selectedLeadForComment]?.comment ??
                                ''
                                }
                            onChange={(e) => {
                                const newComments = { ...comments };
                                newComments[selectedLeadForComment] = e.target.value;
                                setComments(newComments);
                            }}
                            
                            rows={4}
                            placeholder="Enter your comment..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        
                    </div>
                </div>
            )}

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default LeadManagement;








