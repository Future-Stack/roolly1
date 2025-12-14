import { ArrowDown, Calendar, Clock, Clock3, Headset, Info, Mail, MapPin, Phone, Search, ShoppingBag, User, } from 'lucide-react';
import { useState } from 'react';

interface Lead {
    id: string;
    name: string;
    status: 'Green' | 'Blue';
    secondaryStatus: 'Viewed' | 'Enquired'|'NEW';
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

const AdminLeads = () => {
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
    const [assignmentFilterOpen, setAssignmentFilterOpen] = useState(false);
    const [sourceFilterOpen, setSourceFilterOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState('All');
    const [selectedSource, setSelectedSource] = useState('All Sources');

    const leads: Lead[] = [
        {
            id: '1',
            name: 'Rachel Green',
            status: 'Green',
            secondaryStatus: 'NEW',
            propertyId: 'PR001',
            propertyName: 'Central Manchester Office Suite',
            timeAgo: '6m ago',
            date: '22/10/2025',
            businessType: 'Consulting',
            budget: '£2,500-£3,500',
            source: 'AI chat',
            phone: '+44 7700 900987',
            email: 'rachel.green@example.com',
            alertMessage: 'New AI chat lead. Ready to proceed quickly.'
        },
        {
            id: '2',
            name: 'Rachel Green',
            status: 'Green',
            secondaryStatus: 'NEW',
            propertyId: 'PR001',
            propertyName: 'Central Manchester Office Suite',
            timeAgo: '6m ago',
            date: '22/10/2025',
            businessType: 'Consulting',
            budget: '£2,500-£3,500',
            source: 'AI chat',
            phone: '+44 7700 900987',
            email: 'rachel.green@example.com',
            alertMessage: 'New AI chat lead. Ready to proceed quickly.'
        }
    ];

    const closeActionMenu = () => {
        setOpenActionMenuId(null);
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
    };

    const handleSourceSelect = (option: string) => {
        setSelectedSource(option);
        setSourceFilterOpen(false);
    };

    const statCards = [
        { icon: User, value: '214', label: 'TOTAL LEADS', trend: 'up' },
        { icon: Clock3, value: '3', label: 'Unassigned leads', trend: 'up' },
        { icon: ShoppingBag, value: '1.2k', label: 'Completed Deals', trend: 'up' },
        { icon: Headset, value: '5/7', label: 'Brokers Online', trend: null }
    ];

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
                            <div className={`text-3xl font-bold mb-1 ${card.value === '3' ? 'text-[#D81212]' : 'text-blue-600 '}`}>{card.value}</div>
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
                                                    onClick={() => handleAssignmentSelect('All')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    All
                                                </button>
                                                <button 
                                                    onClick={() => handleAssignmentSelect('Assigned')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Assigned
                                                </button>
                                                <button 
                                                    onClick={() => handleAssignmentSelect('Unassigned')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Unassigned
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
                                                    onClick={() => handleSourceSelect('All Sources')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    All Sources
                                                </button>
                                                <button 
                                                    onClick={() => handleSourceSelect('Chat')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Chat
                                                </button>
                                                <button 
                                                    onClick={() => handleSourceSelect('WhatsApp')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    WhatsApp
                                                </button>
                                                <button 
                                                    onClick={() => handleSourceSelect('Call')}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 rounded text-sm"
                                                >
                                                    Call
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
                    {leads.map((lead) => (
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
                                <div className="relative">

                                    {/* Action Menu Popup - Exact same design as image */}
                                    {openActionMenuId === lead.id && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={closeActionMenu}
                                            />

                                            {/* Menu */}
                                            <div 
                                                className="absolute right-0 top-full mt-2 z-50 w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                {/* Menu Items */}
                                                <div className="p-2">
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        Enquired
                                                    </button>
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        Viewed
                                                    </button>
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        Terms sent
                                                    </button>
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        In legal
                                                    </button>
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        Completed
                                                    </button>
                                                    <button className="w-full text-left px-4 py-1 hover:bg-gray-50 text-gray-700">
                                                        Closed
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
                                    <span className="inline-block px-3 py-1 bg-white border border-orange-500 text-orange-600 rounded text-sm font-medium">
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
                                <div>
                                    <h1 className='text-base font-semibold'>Assigned to:</h1>
                                    <div className="relative inline-block w-fit">
                                        <select
                                            className="bg-[#E7F0FB] border border-[#92BAED] px-6 py-1 pr-10 rounded-md appearance-none"
                                        >
                                            <option>Floyd Miles</option>
                                            <option>Assigned</option>
                                            <option>Unassigned</option>
                                        </select>

                                        {/* Right Icon */}
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                                            ▼
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminLeads;