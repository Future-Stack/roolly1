
import { MapPin, Clock, Calendar, Phone, Mail, MoreVertical, Info, } from 'lucide-react';
import ScheduleViewModal from './ScheduleViewModal';
import { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  status: 'Green' | 'Blue';
  secondaryStatus: 'Viewed' | 'Enquired';
  propertyId: string;
  propertyName: string;
  timeAgo: string;
  date: string;
  businessType: string;
  budget: string;
  source: string;
  financials: string;
  phone: string;
  email: string;
  alertMessage: string;
}
const BrokerLeads = () => {
    const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<{ name: string; propertyName: string } | null>(null);

    const leads: Lead[] = [
        {
            id: '1',
            name: 'Rachel Green',
            status: 'Green',
            secondaryStatus: 'Viewed',
            propertyId: 'PR001',
            propertyName: 'Central Manchester Office Suite',
            timeAgo: '6m ago',
            date: '22/10/2025',
            businessType: 'Consulting',
            budget: '£2,500-£3,500',
            source: 'AI chat',
            financials: 'Provided',
            phone: '+44 7700 900987',
            email: 'rachel.green@example.com',
            alertMessage: 'New AI chat lead. Ready to proceed quickly.'
        },
        {
            id: '2',
            name: 'Rachel Green',
            status: 'Green',
            secondaryStatus: 'Enquired',
            propertyId: 'PR001',
            propertyName: 'Central Manchester Office Suite',
            timeAgo: '6m ago',
            date: '22/10/2025',
            businessType: 'Consulting',
            budget: '£2,500-£3,500',
            source: 'AI chat',
            financials: 'Provided',
            phone: '+44 7700 900987',
            email: 'rachel.green@example.com',
            alertMessage: 'New AI chat lead. Ready to proceed quickly.'
        }
    ];

    const handleMoreClick = (leadId: string) => {
        setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
    };

    const closeActionMenu = () => {
        setOpenActionMenuId(null);
    };

    const handleScheduleViewing = (lead: Lead) => {
        setSelectedLead({
            name: lead.name,
            propertyName: lead.propertyName
        });
        setModalOpen(true);
        closeActionMenu(); // If action menu is open, close it
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedLead(null);
    };
    return (
        <div>
            {/* Schedule View Modal */}
            {selectedLead && (
                <ScheduleViewModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    leadName={selectedLead.name}
                    propertyName={selectedLead.propertyName}
                />
            )}
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
                                <span className={`px-3 py-1 rounded text-[12px] font-semibold ${lead.secondaryStatus === 'Viewed' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
                                    }`}>
                                    {lead.secondaryStatus}
                                </span>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => handleMoreClick(lead.id)}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                </button>

                                {/* Action Menu Popup - Exact same design as image */}
                                {openActionMenuId === lead.id && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={closeActionMenu}
                                        />

                                        {/* Menu */}
                                        <div className="absolute right-0 top-full mt-2 z-50 w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">

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
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Financials Details</p>
                                <span className="inline-block px-3 py-1 bg-white border border-orange-500 text-orange-600 rounded text-sm font-medium">
                                    {lead.financials}
                                </span>
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="flex items-end justify-between pt-4  border-gray-200 bg-[#F9FAFB] p-3 rounded-lg">
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
                            <button
                                onClick={() => handleScheduleViewing(lead)}
                                className="bg-[#126AD8] hover:bg-blue-700 text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[14px] font-medium transition-colors"
                            >
                                <Calendar className="w-4 h-4" strokeWidth={2} />
                                Schedule Viewing
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrokerLeads