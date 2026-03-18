import { MapPin, Clock, Calendar, Phone, Mail, MoreVertical, Info } from 'lucide-react';
import ScheduleViewModal from './ScheduleViewModal';
import { useState } from 'react';
import { useGetBrokerLeadsQuery } from '@/redux/features/broker/leads/getBrokerLeadsApi';
import { useGetSingleScheduleQuery } from '@/redux/features/broker/schedule/getSingleScheduleApi';
import AddScheduleModal from './AddScheduleModal';
import { useGetBrokerLeadsListQuery } from '@/redux/features/broker/leads/getBrokerLeadsListApi';
import { useUpdateLeadMutation } from '@/redux/features/broker/leads/updateLeadApi';
import { useDeleteLeadMutation } from '@/redux/features/broker/leads/deleteLeadApi';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';


interface Property {
  property_name: string;
  property_type: string;
  location: string;
  created_at: string;
}

interface Lead {
  id: number;
  property: Property | null;
  client_name: string;
  source: string;
  email_address: string;
  phone_number: string;
  lead_status: string;
  lead_traffic: string;
  sqft_range: string | null;
  financial_details_provided: boolean;
  schedule_id: number | null;
}

interface FormattedLead {
  id: number;
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
  financial_details_provided: string;
  phone: string;
  email: string;
  alertMessage: string;
  scheduleId: number | null;
}

const BrokerLeads = () => {
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addScheduleModalOpen, setAddScheduleModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<{ id: number; name: string } | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const { data: brokerLeadsData, isLoading, refetch } = useGetBrokerLeadsQuery(undefined);
  const { data: brokerLeadsListData } = useGetBrokerLeadsListQuery(undefined);
  const [updateLead, { isLoading: isUpdatingStatus }] = useUpdateLeadMutation();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);
  // const leadsData = brokerLeadsData?.results || [];
  console.log('API Data:', brokerLeadsData);
  console.log('API Data List:', brokerLeadsListData);
  // if(brokerLeadsListData?.map((leadList) => lead.email_address) === brokerLeadsData?.map((lead) => lead.email_address)){
  //   console.log('Lead ID:', brokerLeadsListData?.map((lead) => lead.id));
  // }

  const {
    data: scheduleData,
    isLoading: scheduleLoading,
    isError: scheduleError
  } = useGetSingleScheduleQuery(selectedScheduleId?.toString() || undefined, {
    skip: !selectedScheduleId,
  });

  const getTimeAgo = (dateString: string | undefined | null) => {
    if (!dateString) return 'Just now';

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

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const getTrafficStatus = (traffic: string): 'Green' | 'Blue' | 'Red' | 'Amber' => {
    if (!traffic) return 'Blue';

    switch (traffic.toLowerCase()) {
      case 'green': return 'Green';
      case 'blue': return 'Blue';
      case 'red': return 'Red';
      case 'amber': return 'Amber';
      default: return 'Blue';
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return 'Not Specified';

    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getAlertMessage = (source: string, status: string) => {
    if (!source || !status) return 'New lead received. Follow up required.';

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

  const formatBusinessType = (propertyType: string | undefined | null) => {
    if (!propertyType) return 'Not specified';

    switch (propertyType.toLowerCase()) {
      case 'office': return 'Office Space';
      case 'industrial': return 'Industrial';
      case 'retail': return 'Retail';
      case 'residential': return 'Residential';
      case 'land': return 'Land';
      default: return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
    }
  };

  const formatBudget = (budgetRange: string | null) => {
    if (!budgetRange) return 'Not specified';

    if (budgetRange.includes('-')) {
      const [min, max] = budgetRange.split('-');
      return `${min}-${max}`;
    }

    return `${budgetRange}`;
  };



  const transformLeads = (data: Lead[]): FormattedLead[] => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((lead, index) => {
      // Use actual data or fallbacks
      const hasProperty = lead.property !== null;

      return {
        id: lead.id,
        name: lead.client_name || 'Unknown Client',
        status: getTrafficStatus(lead.lead_traffic),
        secondaryStatus: formatStatus(lead.lead_status),
        propertyId: `PR${(index + 1).toString().padStart(3, '0')}`,
        propertyName: hasProperty && lead.property?.property_name
          ? lead.property.property_name
          : 'No Property Linked',
        timeAgo: getTimeAgo(hasProperty ? lead.property?.created_at : null),
        date: formatDate(hasProperty ? lead.property?.created_at : null),
        businessType: formatBusinessType(hasProperty ? lead.property?.property_type : null),
        budget: formatBudget(lead.sqft_range),
        source: lead.source
          ? lead.source.charAt(0).toUpperCase() + lead.source.slice(1)
          : 'Unknown',
        financial_details_provided: lead.financial_details_provided === false ? 'Not Provided' : 'Provided',
        phone: lead.phone_number || 'Not provided',
        email: lead.email_address || 'Not provided',
        alertMessage: getAlertMessage(lead.source, lead.lead_status),
        scheduleId: lead.schedule_id
      };
    });
  };

  const leads: FormattedLead[] = brokerLeadsData ? transformLeads(brokerLeadsData) : [];

  const handleMoreClick = (leadId: number) => {
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

  const closeModal = () => {
    setModalOpen(false);
    setSelectedScheduleId(null);
  };
  console.log("leads", leads);

  const handleAddSchedule = (lead: FormattedLead) => {
    setSelectedLead({ id: lead.id, name: lead.name });
    console.log("FormattedLead", lead);
    setAddScheduleModalOpen(true);
  };


  const closeAddScheduleModal = () => {
    setAddScheduleModalOpen(false);
    setSelectedLead(null);
  };

  const handleStatusUpdate = async (leadId: number, status: string) => {
    try {
      await updateLead({ id: leadId, data: { lead_status: status } }).unwrap();
      toast.success(`Lead status updated to "${status.replace(/_/g, ' ')}"`);
      refetch();
      closeActionMenu();
    } catch (err: unknown) {
      const apiErr = err as { data?: { detail?: string } };
      toast.error(apiErr?.data?.detail || 'Failed to update lead status');
    }
  };

  const handleDeleteLeadRequest = (leadId: number) => {
    setLeadToDelete(leadId);
    setDeleteModalOpen(true);
    closeActionMenu();
  };

  const handleDeleteConfirm = async () => {
    if (leadToDelete === null) return;
    
    try {
      await deleteLead(leadToDelete).unwrap();
      toast.success('Lead deleted successfully');
      refetch();
      setDeleteModalOpen(false);
      setLeadToDelete(null);
    } catch (err: unknown) {
      const apiErr = err as { data?: { detail?: string } };
      toast.error(apiErr?.data?.detail || 'Failed to delete lead');
    }
  };

  console.log("selectedLead", selectedLead);
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
  // if (isError) {
  //   return (
  //     <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
  //       <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Leads</h3>
  //       <p className="text-red-600 mb-4">Unable to load leads. Please try again later.</p>
  //       <button
  //         onClick={() => window.location.reload()}
  //         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

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

      <AddScheduleModal
        isOpen={addScheduleModalOpen}
        onClose={closeAddScheduleModal}
        leadId={selectedLead?.id || null}
        leadName={selectedLead?.name || ''}
      />

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

      <div className="space-y-4 relative">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl border border-gray-200 p-5 relative">
            {/* Lead Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[16px] font-semibold text-gray-900 break-words">{lead.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded text-[12px] font-semibold whitespace-nowrap ${lead.status === 'Green' ? 'bg-green-500 text-white' :
                    lead.status === 'Blue' ? 'bg-blue-600 text-white' :
                      lead.status === 'Red' ? 'bg-red-500 text-white' :
                        'bg-amber-500 text-white'
                    }`}>
                    {lead.status}
                  </span>
                  <span className={`px-3 py-1 rounded text-[12px] font-semibold whitespace-nowrap ${lead.secondaryStatus.toLowerCase().includes('viewed') ? 'bg-orange-500 text-white' :
                    lead.secondaryStatus.toLowerCase().includes('enquired') ? 'bg-blue-600 text-white' :
                      lead.secondaryStatus.toLowerCase().includes('terms') ? 'bg-purple-600 text-white' :
                        lead.secondaryStatus.toLowerCase().includes('legal') ? 'bg-indigo-600 text-white' :
                          lead.secondaryStatus.toLowerCase().includes('completed') ? 'bg-green-600 text-white' :
                            'bg-gray-600 text-white'
                    }`}>
                    {lead.secondaryStatus}
                  </span>
                </div>
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
                      {/* Status Update Buttons */}
                      <div className="px-2 py-2">
                        <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Update Status</p>
                        {[
                          { label: 'Enquired', value: 'enquired' },
                          { label: 'Viewed', value: 'viewed' },
                          { label: 'Terms Sent', value: 'terms_sent' },
                          { label: 'In Legals', value: 'in_legals' },
                          { label: 'Completed', value: 'completed' },
                          { label: 'Closed', value: 'closed' },
                        ].map((s) => {
                          const isActive = lead.secondaryStatus.toLowerCase().replace(/ /g, '_') === s.value ||
                            lead.secondaryStatus.toLowerCase() === s.label.toLowerCase();
                          return (
                            <button
                              key={s.value}
                              disabled={isUpdatingStatus || isActive}
                              onClick={() => handleStatusUpdate(lead.id, s.value)}
                              className={`w-full text-left px-4 py-1 hover:bg-gray-50 text-sm rounded transition-colors ${isActive
                                ? 'text-blue-600 font-semibold bg-blue-50'
                                : 'text-gray-700'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {s.label}{isActive && ' ✓'}
                            </button>
                          );
                        })}
                      </div>

                      {/* Delete Action */}
                      <div className="border-t border-gray-100 px-2 py-2">
                        <button
                          disabled={isDeleting}
                          onClick={() => handleDeleteLeadRequest(lead.id)}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 rounded transition-colors flex items-center gap-2"
                        >
                          <Info className="w-4 h-4" />
                          Delete Lead
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-gray-600 mb-4">
              <div className="flex items-center gap-1.5 text-[#717182]">
                <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                <span className="line-clamp-1">{lead.propertyId}: {lead.propertyName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#717182]">
                <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                <span className="whitespace-nowrap">{lead.timeAgo}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#717182]">
                <Calendar className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                <span className="whitespace-nowrap">{lead.date}</span>
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
                <p className="text-sm text-gray-500 mb-1">Sqft Range</p>
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
                <span className={`inline-block px-3 py-1 bg-white border rounded text-sm font-medium ${lead.financial_details_provided === 'true'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-gray-400 text-gray-600'
                  }`}>
                  {lead.financial_details_provided}
                </span>
              </div>
            </div>

            {/* Client Information */}
            <div className="flex flex-col gap-2 items-start md:flex-row md:items-end justify-between pt-4 border-gray-200 bg-[#F9FAFB] p-3 rounded-lg">
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
              <div className="flex items-center gap-2">
                {lead.scheduleId && (
                  <button
                    onClick={() => handleScheduleViewing(lead)}
                    className="bg-[#126AD8] disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[14px] font-medium transition-colors"
                    disabled={!lead.scheduleId}
                  >
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                    {lead.scheduleId && 'View Schedule'}
                  </button>
                )}
                <button
                  onClick={() => handleAddSchedule(lead)}
                  className="bg-[#126AD8] disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 text-white px-5 py-2.5 rounded-md flex items-center gap-2 text-[14px] font-medium transition-colors"
                >
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  Add Schedule
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrokerLeads;