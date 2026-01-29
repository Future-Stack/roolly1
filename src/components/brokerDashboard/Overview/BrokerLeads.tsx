import { MapPin, Clock, Calendar, Phone, Mail, MoreVertical, Info } from 'lucide-react';
import ScheduleViewModal from './ScheduleViewModal';
import { useState } from 'react';
import { useGetBrokerLeadsQuery } from '@/redux/features/broker/leads/getBrokerLeadsApi';

interface Property {
  property_name: string;
  property_type: string;
  location: string;
  created_at: string;
}

interface Lead {
  property: Property;
  client_name: string;
  source: string;
  email_address: string;
  phone_number: string;
  lead_status: string;
  lead_traffic: string;
  budget_range: string;
  financials_details: boolean;
  schedule_id: string | null;
}

interface FormattedLead {
  id: string;
  name: string;
  status: 'Green' | 'Blue' | 'Red' | 'Amber';
  secondaryStatus: string;
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
  const { data: brokerLeadsData, isLoading, isError } = useGetBrokerLeadsQuery(undefined);

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Get traffic light status
  const getTrafficStatus = (traffic: string): 'Green' | 'Blue' | 'Red' | 'Amber' => {
    switch (traffic.toLowerCase()) {
      case 'green': return 'Green';
      case 'blue': return 'Blue';
      case 'red': return 'Red';
      case 'amber': return 'Amber';
      default: return 'Blue';
    }
  };

  // Format status display
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get alert message based on source and status
  const getAlertMessage = (source: string, status: string) => {
    if (source === 'ai') {
      return 'New AI chat lead. Ready to proceed quickly.';
    } else if (source === 'whatsapp') {
      return 'WhatsApp lead. Quick response recommended.';
    } else if (status === 'completed') {
      return 'Lead completed. Follow up for feedback.';
    } else if (status === 'terms_sent') {
      return 'Terms sent. Awaiting client response.';
    } else {
      return 'New lead received. Follow up required.';
    }
  };

  // Format property type for business type
  const formatBusinessType = (propertyType: string) => {
    switch (propertyType.toLowerCase()) {
      case 'office': return 'Office Space';
      case 'industrial': return 'Industrial';
      case 'retail': return 'Retail';
      case 'residential': return 'Residential';
      default: return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
    }
  };

  // Transform backend data to frontend format
  const transformLeads = (data: Lead[]): FormattedLead[] => {
    if (!data) return [];

    return data.map((lead, index) => {
      // Generate a unique ID using index and timestamp
      const id = `${Date.now()}-${index}`;
      
      return {
        id,
        name: lead.client_name,
        status: getTrafficStatus(lead.lead_traffic),
        secondaryStatus: formatStatus(lead.lead_status),
        propertyId: `PR${(index + 1).toString().padStart(3, '0')}`,
        propertyName: lead.property.property_name,
        timeAgo: getTimeAgo(lead.property.created_at),
        date: formatDate(lead.property.created_at),
        businessType: formatBusinessType(lead.property.property_type),
        budget: lead.budget_range ? `£${lead.budget_range.replace('-', '-£')}` : 'Not specified',
        source: lead.source.charAt(0).toUpperCase() + lead.source.slice(1),
        financials: lead.financials_details ? 'Provided' : 'Not provided',
        phone: lead.phone_number,
        email: lead.email_address,
        alertMessage: getAlertMessage(lead.source, lead.lead_status)
      };
    });
  };

  const leads: FormattedLead[] = brokerLeadsData ? transformLeads(brokerLeadsData) : [];

  const handleMoreClick = (leadId: string) => {
    setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
  };

  const closeActionMenu = () => {
    setOpenActionMenuId(null);
  };

  const handleScheduleViewing = (lead: FormattedLead) => {
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

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-5"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-16 bg-gray-100 rounded mb-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-5">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Leads</h3>
        <p className="text-red-600 mb-4">Unable to load leads. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (leads.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Leads Available</h3>
        <p className="text-gray-500 mb-4">You don't have any leads yet. Leads will appear here when clients express interest in your properties.</p>
      </div>
    );
  }

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
                <span className={`px-3 py-1 rounded text-[12px] font-semibold ${
                  lead.status === 'Green' ? 'bg-green-500 text-white' :
                  lead.status === 'Blue' ? 'bg-blue-600 text-white' :
                  lead.status === 'Red' ? 'bg-red-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {lead.status}
                </span>
                <span className={`px-3 py-1 rounded text-[12px] font-semibold ${
                  lead.secondaryStatus.toLowerCase().includes('viewed') ? 'bg-orange-500 text-white' :
                  lead.secondaryStatus.toLowerCase().includes('enquired') ? 'bg-blue-600 text-white' :
                  lead.secondaryStatus.toLowerCase().includes('terms') ? 'bg-purple-600 text-white' :
                  lead.secondaryStatus.toLowerCase().includes('legal') ? 'bg-indigo-600 text-white' :
                  lead.secondaryStatus.toLowerCase().includes('completed') ? 'bg-green-600 text-white' :
                  'bg-gray-600 text-white'
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
                <span className={`inline-block px-3 py-1 bg-white border rounded text-sm font-medium ${
                  lead.financials === 'Provided' 
                    ? 'border-orange-500 text-orange-600' 
                    : 'border-gray-400 text-gray-600'
                }`}>
                  {lead.financials}
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
  );
}

export default BrokerLeads;