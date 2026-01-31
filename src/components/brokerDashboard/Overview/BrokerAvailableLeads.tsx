/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Clock, Calendar, Phone, Mail, MoreVertical, Info, UserCheck } from 'lucide-react';
import ScheduleViewModal from './ScheduleViewModal';
import { useState } from 'react';
import { useGetSingleScheduleQuery } from '@/redux/features/broker/schedule/getSingleScheduleApi';
import { useGetAvailableLeadsQuery } from '@/redux/features/broker/leads/getAvailableLeadsApi';
import { useMakeGrabLeadMutation } from '@/redux/features/broker/leads/makeGrabLeadApi';
import { toast } from 'react-toastify';

interface Lead {
  id: string;
  client_name: string;
  source: string;
  email_address: string;
  phone_number: string;
  lead_status: string;
  lead_traffic: string;
  budget_range: string | null;
  created_at: string;
  schedule_id?: string | null;
  property_name?: string;
  property_type?: string;
  location?: string;
  is_grabbed?: boolean;
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
  scheduleId: string | null;
  isGrabbed: boolean;
  originalId: string;
}

const BrokerAvailableLeads = () => {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [grabbingLeadId, setGrabbingLeadId] = useState<string | null>(null);
  
  const { data: brokerLeadsData, isLoading, isError, refetch } = useGetAvailableLeadsQuery(undefined);
  
  const [makeGrabLead] = useMakeGrabLeadMutation();
  
  const { 
    data: scheduleData, 
    isLoading: scheduleLoading,
    isError: scheduleError 
  } = useGetSingleScheduleQuery(selectedScheduleId || undefined, {
    skip: !selectedScheduleId,
  });

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const getTrafficStatus = (traffic: string): 'Green' | 'Blue' | 'Red' | 'Amber' => {
    switch (traffic.toLowerCase()) {
      case 'green': return 'Green';
      case 'blue': return 'Blue';
      case 'red': return 'Red';
      case 'amber': return 'Amber';
      default: return 'Blue';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getAlertMessage = (source: string, status: string, isGrabbed: boolean) => {
    if (isGrabbed) {
      return 'Lead already grabbed. You are assigned to this lead.';
    }
    if (source.toLowerCase() === 'ai') {
      return 'New AI chat lead. Ready to proceed quickly.';
    } else if (source.toLowerCase() === 'whatsapp') {
      return 'WhatsApp lead. Quick response recommended.';
    } else if (status === 'completed') {
      return 'Lead completed. Follow up for feedback.';
    } else if (status === 'terms_sent') {
      return 'Terms sent. Awaiting client response.';
    } else {
      return 'New lead received. Follow up required.';
    }
  };

  const formatBusinessType = (propertyType?: string) => {
    if (!propertyType) return 'Not specified';
    
    switch (propertyType.toLowerCase()) {
      case 'office': return 'Office Space';
      case 'industrial': return 'Industrial';
      case 'retail': return 'Retail';
      case 'residential': return 'Residential';
      default: return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
    }
  };

  const transformLeads = (data: Lead[]): FormattedLead[] => {
    if (!data) return [];

    return data.map((lead, index) => {
      // Use the actual lead ID from backend or generate one
      const id = lead.id?.toString() || `${Date.now()}-${index}`;
      
      // Generate property ID based on index or use property_name
      const propertyId = `PR${(index + 1).toString().padStart(3, '0')}`;
      
      // Get property name or use default
      const propertyName = lead.property_name || `Property ${index + 1}`;
      
      // Format budget
      const budget = lead.budget_range ? `£${lead.budget_range}` : 'Not specified';
      
      return {
        id,
        name: lead.client_name || 'Unknown Client',
        status: getTrafficStatus(lead.lead_traffic),
        secondaryStatus: formatStatus(lead.lead_status),
        propertyId,
        propertyName,
        timeAgo: getTimeAgo(lead.created_at),
        date: formatDate(lead.created_at),
        businessType: formatBusinessType(lead.property_type),
        budget,
        source: lead.source.charAt(0).toUpperCase() + lead.source.slice(1),
        financials: 'Not provided', 
        phone: lead.phone_number || 'Not provided',
        email: lead.email_address || 'Not provided',
        alertMessage: getAlertMessage(lead.source, lead.lead_status, lead.is_grabbed || false),
        scheduleId: lead.schedule_id || null,
        isGrabbed: lead.is_grabbed || false,
        originalId: lead.id
      };
    });
  };

  const leads: FormattedLead[] = brokerLeadsData?.results ? transformLeads(brokerLeadsData.results) : [];

  const handleMoreClick = (leadId: string) => {
    setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
  };

  const closeActionMenu = () => {
    setOpenActionMenuId(null);
  };

  const handleScheduleViewing = (lead: FormattedLead) => {
    if (lead.scheduleId) {
      setSelectedScheduleId(lead.scheduleId);
      setModalOpen(true);
      closeActionMenu();
    } else {
      alert('No schedule available for this lead');
    }
  };

  const handleGrabLead = async (leadId: string) => {
    try {
      // Find the original ID from the formatted lead
      const lead = leads.find(l => l.id === leadId);
      if (!lead) {
        toast.error('Lead not found');
        return;
      }

      if (lead.isGrabbed) {
        toast.error('This lead has already been grabbed');
        return;
      }

      // Set loading state for this specific lead
      setGrabbingLeadId(leadId);

      const result = await makeGrabLead(lead.originalId).unwrap();
      
      if (result) {
        toast.success('Lead grabbed successfully!');
        refetch();
      }
    } catch (error: any) {
      console.error('Error grabbing lead:', error);
      toast.error(error?.data?.message || 'Failed to grab lead. Please try again.');
    } finally {
      // Clear loading state
      setGrabbingLeadId(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedScheduleId(null);
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
      <ScheduleViewModal
        isOpen={modalOpen}
        onClose={closeModal}
        scheduleData={scheduleData}
        isLoading={scheduleLoading}
        isError={scheduleError}
      />
      
      <div className="space-y-4 relative">
        {leads.map((lead) => {
          const isThisLeadGrabbing = grabbingLeadId === lead.id;
          
          return (
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
              <div className={`border rounded-md p-3 mb-5 ${
                lead.isGrabbed ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex gap-2">
                  <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    lead.isGrabbed ? 'text-green-600' : 'text-blue-600'
                  }`} strokeWidth={2} />
                  <p className={`text-[13px] font-medium ${
                    lead.isGrabbed ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    {lead.alertMessage}
                  </p>
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
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Schedule Viewing Button */}
                  <button
                    onClick={() => handleScheduleViewing(lead)}
                    className={`px-5 py-2.5 rounded-md flex items-center gap-2 text-[14px] font-medium transition-colors ${
                      lead.scheduleId 
                        ? 'bg-[#126AD8] hover:bg-blue-700 text-white' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!lead.scheduleId}
                  >
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                    {lead.scheduleId ? 'View Schedule' : 'No Schedule'}
                  </button>
                  
                  {/* Grab Lead Button */}
                  <button
                    onClick={() => handleGrabLead(lead.id)}
                    disabled={lead.isGrabbed || isThisLeadGrabbing}
                    className={`px-5 py-2.5 rounded-md flex items-center gap-2 text-[14px] font-medium transition-colors ${
                      lead.isGrabbed
                        ? 'bg-green-600 text-white cursor-default'
                        : isThisLeadGrabbing
                        ? 'bg-blue-400 text-white cursor-wait'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" strokeWidth={2} />
                    {lead.isGrabbed ? 'Grabbed' : isThisLeadGrabbing ? 'Grabbing...' : 'Grab Lead'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrokerAvailableLeads;