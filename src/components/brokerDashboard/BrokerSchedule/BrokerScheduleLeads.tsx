import { useGetScheduleListQuery } from '@/redux/features/broker/schedule/getScheduleList';
import { Calendar, Clock, Info, Mail, MapPin, MoreVertical, Phone } from 'lucide-react';
import { useState } from 'react';
import ScheduleViewModal from '../Overview/ScheduleViewModal';
import { useMakeCompleteScheduleMutation } from '@/redux/features/broker/schedule/makeCompleteScheduleApi';
import { useMakeCancelScheduleMutation } from '@/redux/features/broker/schedule/makeCancelScheduleApi';

export interface Property {
    property_name: string;
    property_type: "industrial" | "land" | "office" | "retail" | "house" | "other" | string;
    location: string;
    created_at: string;
}

export interface LeadDetails {
    property: Property;
    client_name: string;
    source: string;
    email_address: string;
    phone_number: string;
    lead_status: "enquired" | "viewed" | "terms_sent" | "in_legals" | "completed" | "closed" | string;
    lead_traffic: "red" | "amber" | "green" | string;
    sqft_range: string;
    financials_details: boolean;
    schedule_id: number;
}

export interface LeadResponse {
    id: string;
    lead: LeadDetails;
    viewing_date: string;
    viewing_time: string;
    notes: string;
    status: "pending" | "complete" | "cancel" | string;
}

const BrokerScheduleLeads = () => {
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<{
        property_name: string;
        viewing_date: string;
        viewing_time: string;
        broker: string;
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: scheduleData, isLoading, refetch } = useGetScheduleListQuery(undefined);
    const [makeCompleteSchedule, { isLoading: isCompleting }] = useMakeCompleteScheduleMutation();
    const [makeCancelSchedule, { isLoading: isCancelling }] = useMakeCancelScheduleMutation();

    const handleMoreClick = (leadId: string) => {
        setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
    };

    const closeActionMenu = () => {
        setOpenActionMenuId(null);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedSchedule(null);
    };

    // Function to open modal with schedule data
    const openScheduleModal = (lead: LeadResponse) => {
        const scheduleData = {
            property_name: lead?.lead?.property?.property_name || "N/A",
            viewing_date: lead?.viewing_date || "N/A",
            viewing_time: lead?.viewing_time || "N/A",
            broker: lead?.lead?.client_name || "Unknown Broker"
        };
        setSelectedSchedule(scheduleData);
        setModalOpen(true);
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB');
        } catch {
            return dateString;
        }
    };

    // Format time from HH:mm:ss to HH:mm
    const formatTime = (timeString: string): string => {
        if (!timeString) return "N/A";
        try {
            return timeString.split(':').slice(0, 2).join(':');
        } catch {
            return timeString;
        }
    };

    const getTimeAgo = (createdAt: string): string => {
        if (!createdAt) return 'N/A';
        try {
            const created = new Date(createdAt);
            const now = new Date();
            const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));

            if (diffInMinutes < 60) {
                return `${diffInMinutes}m ago`;
            } else if (diffInMinutes < 1440) {
                const hours = Math.floor(diffInMinutes / 60);
                return `${hours}h ago`;
            } else {
                const days = Math.floor(diffInMinutes / 1440);
                return `${days}d ago`;
            }
        } catch {
            return 'Just now';
        }
    };

    // Map lead_status to display status
    const getStatusDisplay = (status: string): { status: string; color: string } => {
        const statusMap: Record<string, { status: string; color: string }> = {
            'green': { status: 'Green', color: 'bg-green-500' },
            'amber': { status: 'Amber', color: 'bg-amber-500' },
            'red': { status: 'Red', color: 'bg-red-600' },
        };
        return statusMap[status?.toLowerCase()] || { status: status || 'Unknown', color: 'bg-gray-500' };
    };

    // Map lead_status to secondary status display
    const getSecondaryStatusDisplay = (status: string): { status: string; color: string } => {
        const statusMap: Record<string, { status: string; color: string }> = {
            'enquired': { status: 'Enquired', color: 'bg-purple-600' },
            'viewed': { status: 'Viewed', color: 'bg-orange-500' },
            'terms_sent': { status: 'Terms Sent', color: 'bg-[#9333EA]' },
            'in_legals': { status: 'In Legals', color: 'bg-indigo-600' },
            'completed': { status: 'Completed', color: 'bg-green-600' },
            'closed': { status: 'Closed', color: 'bg-gray-600' },
        };
        return statusMap[status?.toLowerCase()] || { status: status || 'Unknown', color: 'bg-blue-600' };
    };

    const getSourceDisplay = (source: string): string => {
        const sourceMap: Record<string, string> = {
            'whatsapp': 'WhatsApp',
            'call': 'Call',
            'chat': 'Chat',
            'ai': 'AI',
            'other': 'Other'
        };
        return sourceMap[source?.toLowerCase()] || source || 'N/A';
    };

    const getFinancialsDisplay = (financials: boolean): string => {
        return financials ? 'Provided' : 'Not Provided';
    };

    const handleCompleteSchedule = async (scheduleId: number) => {
        if (!scheduleId) return;
        try {
            await makeCompleteSchedule(scheduleId).unwrap();
            refetch();
            closeActionMenu();
        } catch (error) {
            console.error('Failed to complete schedule:', error);
        }
    };

    const handleCancelSchedule = async (scheduleId: number) => {
        if (!scheduleId) return;
        try {
            await makeCancelSchedule(scheduleId).unwrap();
            refetch();
            closeActionMenu();
        } catch (error) {
            console.error('Failed to cancel schedule:', error);
        }
    };

    const leadsData: LeadResponse[] = scheduleData || [];
    const totalItems = leadsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentLeads = leadsData.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    //             <p className="text-red-700">Error loading schedule data</p>
    //         </div>
    //     );
    // }

    return (
        <div>
            {/* Schedule View Modal - Updated to match the component's expected props */}
            <ScheduleViewModal
                isOpen={modalOpen}
                onClose={closeModal}
                scheduleData={selectedSchedule || undefined}
                isLoading={false}
                isError={false}
            />

            {leadsData.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-gray-500">No scheduled leads found</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 relative">
                        {currentLeads.map((lead, index) => {
                            const trafficStatus = getStatusDisplay(lead?.lead?.lead_traffic);
                            const secondaryStatus = getSecondaryStatusDisplay(lead?.lead?.lead_status);

                            return (
                                <div key={lead?.id || `lead-${startIndex + index}`} className="bg-white rounded-xl border border-gray-200 p-5 relative">
                                    {/* Lead Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3
                                                className="text-[16px] font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                                                onClick={() => openScheduleModal(lead)}
                                            >
                                                {lead?.lead?.client_name || "Unknown Client"}
                                            </h3>
                                            <span className={`px-3 py-1.5 rounded text-[12px] font-semibold ${trafficStatus.color} text-white`}>
                                                {trafficStatus.status}
                                            </span>
                                            <span className={`px-3 py-1.5 rounded text-[12px] font-semibold ${secondaryStatus.color} text-white`}>
                                                {secondaryStatus.status}
                                            </span>
                                            <span className="px-3 py-1.5 rounded text-[12px] font-semibold bg-[#58ea33] text-white">
                                                {lead?.status}
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => handleMoreClick(lead.id || `lead-${startIndex + index}`)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                disabled={isCompleting || isCancelling}
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                            </button>

                                            {/* Action Menu Popup */}
                                            {openActionMenuId === (lead?.id || `lead-${startIndex + index}`) && (
                                                <>
                                                    {/* Backdrop */}
                                                    <div
                                                        className="fixed inset-0 z-40"
                                                        onClick={closeActionMenu}
                                                    />

                                                    {/* Menu */}
                                                    <div className="absolute right-0 top-full mt-2 z-50 w-[150px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                                        {/* Menu Items */}
                                                        <div className="p-2">
                                                            <button
                                                                onClick={() => openScheduleModal(lead)}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                                                            >
                                                                View Details
                                                            </button>
                                                            <button
                                                                onClick={() => handleCompleteSchedule(lead?.lead?.schedule_id)}
                                                                disabled={isCompleting || isCancelling}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isCompleting ? (
                                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700"></div>
                                                                ) : null}
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleCancelSchedule(lead?.lead?.schedule_id)}
                                                                disabled={isCompleting || isCancelling}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isCancelling ? (
                                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-700"></div>
                                                                ) : null}
                                                                Cancel
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
                                            <span>{lead?.lead?.property?.property_name || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#717182]">
                                            <Clock className="w-4 h-4" strokeWidth={2} />
                                            <span>{getTimeAgo(lead?.lead?.property?.created_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#717182]">
                                            <Calendar className="w-4 h-4" strokeWidth={2} />
                                            <span>{formatDate(lead?.viewing_date)} {formatTime(lead?.viewing_time)}</span>
                                        </div>
                                    </div>

                                    {/* Alert Message */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-5">
                                        <div className="flex gap-2">
                                            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                            <p className="text-[13px] text-blue-800 font-medium">
                                                {lead?.notes || `Viewing scheduled for ${formatDate(lead?.viewing_date)} at ${formatTime(lead?.viewing_time)}`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-5">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Property Type</p>
                                            <p className="text-sm text-gray-900 font-normal capitalize">{lead?.lead?.property?.property_type || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Sqft Range</p>
                                            <p className="text-[14px] text-gray-900 font-normal">{lead?.lead?.sqft_range || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Source</p>
                                            <span className="inline-block px-3 py-1 bg-white border border-orange-500 text-orange-600 rounded text-sm font-medium">
                                                {getSourceDisplay(lead?.lead?.source)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Financials Details</p>
                                            <span className="inline-block px-3 py-1 bg-white border border-orange-500 text-orange-600 rounded text-sm font-medium">
                                                {getFinancialsDisplay(lead?.lead?.financials_details)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Client Information */}
                                    <div className="flex items-end justify-between pt-4 border-gray-200 bg-[#F9FAFB] p-3 rounded-lg">
                                        <div>
                                            <h4 className="text-base font-semibold text-gray-900 mb-3">Client Information</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                    <Phone className="w-4 h-4 text-gray-500" strokeWidth={2} />
                                                    <span className='font-medium'>{lead?.lead?.phone_number || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                    <Mail className="w-4 h-4 text-gray-500" strokeWidth={2} />
                                                    <span className='font-medium'>{lead?.lead?.email_address || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Component */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                        <span className="font-medium">{endIndex}</span> of{' '}
                                        <span className="font-medium">{totalItems}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        {/* Page numbers */}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                                            ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                page === currentPage - 2 ||
                                                page === currentPage + 2
                                            ) {
                                                return <span key={page} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BrokerScheduleLeads;