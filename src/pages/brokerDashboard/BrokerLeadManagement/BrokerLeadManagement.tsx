import Pagination from '@/components/ui/Pagination';
import { useGetAvailableLeadsQuery } from '@/redux/features/broker/leads/getAvailableLeadsApi';
import { ArrowDown, Mail, MoreVertical, Phone, Plus } from 'lucide-react';
import React, { useState } from 'react';

interface Lead {
  id: number;
  client_name: string;
  property_name?: string;
  property_type?: string;
  source: string;
  lead_status: string;
  lead_traffic: 'green' | 'amber' | 'red' | string;
  budget_range: string | null;
  created_at: string;
  email_address: string;
  phone_number: string;
}

const BrokerLeadManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Fetch leads from backend with pagination
  const { 
    data: leadsData, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useGetAvailableLeadsQuery({
    page: currentPage,
    page_size: pageSize
  }, {
    refetchOnMountOrArgChange: true,
  });

  console.log(leadsData)

  // Extract data from response
  const leads: Lead[] = leadsData?.results || [];
  const totalCount = leadsData?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const getTrafficColor = (traffic: string) => {
    switch (traffic.toLowerCase()) {
      case 'green': return 'bg-green-500';
      case 'amber': return 'bg-amber-500';
      case 'red': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-600';
      case 'enquired': return 'bg-purple-600';
      case 'viewed': return 'bg-orange-600';
      case 'terms sent': return 'bg-[#9333EA]';
      case 'completed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleMoreClick = (leadId: string) => {
    setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
  };

  const closeActionMenu = () => {
    setOpenActionMenuId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Format traffic light display
  const formatTraffic = (traffic: string) => {
    return traffic.charAt(0).toUpperCase() + traffic.slice(1);
  };

  // Format status display
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Format property type display
  const formatPropertyType = (type?: string) => {
    if (!type) return 'N/A';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error('Error fetching leads:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading leads. Please try again later.</p>
          <button 
            onClick={() => refetch()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Lead Management</h1>
          <p className="text-lg text-gray-600">View and manage leads</p>
        </div>

        {/* Filters Bar */}
        <div className='flex justify-between mb-5'>
          <div className="">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="flex flex-wrap gap-3 items-center">
                <div className='flex justify-between items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white w-40'>
                  <span className="text-gray-600">Property Type</span>
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div className='flex justify-between items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white w-40'>
                  <span className="text-gray-600">Status</span>
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
            <Plus className="w-5 h-5" />
            New lead
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="bg-[#EFF6FF] border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Client Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Budget</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Traffic</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">#{lead.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{lead.client_name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{lead.property_name || 'N/A'}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{formatPropertyType(lead.property_type)}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{lead.source}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{lead.budget_range || 'N/A'}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium text-white ${getTrafficColor(lead.lead_traffic)}`}>
                          {formatTraffic(lead.lead_traffic)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium text-white ${getStatusColor(lead.lead_status)}`}>
                          {formatStatus(lead.lead_status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{formatDate(lead.created_at)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => window.open(`mailto:${lead.email_address}`, '_blank')}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors" 
                            title="Send Email"
                          >
                            <Mail className="w-5 h-5 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => window.open(`tel:${lead.phone_number}`, '_blank')}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors" 
                            title="Call"
                          >
                            <Phone className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative">
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            onClick={() => handleMoreClick(`lead-${lead.id}`)}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>

                          {/* Action Menu Popup */}
                          {openActionMenuId === `lead-${lead.id}` && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={closeActionMenu}
                              />
                              <div className="absolute right-0 top-full mt-2 z-50 w-[250px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                <div className="p-2">
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Mark as Enquired
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Mark as Viewed
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Send Terms
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Move to Legal
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Mark as Completed
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Close Lead
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                      No leads available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className='flex flex-col items-center my-8'>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <div className="mt-3 text-sm text-gray-500">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} leads
            </div>
          </div>
        )}

        {/* Debug info (remove in production) */}
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
          <h3 className="font-semibold mb-1">Debug Info:</h3>
          <p>Current Page: {currentPage}</p>
          <p>Total Leads: {totalCount}</p>
          <p>Total Pages: {totalPages}</p>
          <p>API Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>API Error: {isError ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default BrokerLeadManagement;