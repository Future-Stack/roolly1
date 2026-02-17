/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/ui/Pagination';
import { useGetBrokerLeadsListQuery } from '@/redux/features/broker/leads/getBrokerLeadsListApi';
import { ArrowDown, Mail, MoreVertical, Phone, Plus, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'enquired', label: 'Enquired' },
  { value: 'viewed', label: 'Viewed' },
  { value: 'terms_sent', label: 'Terms Sent' },
  { value: 'in_legals', label: 'In Legals' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' }
];

const BrokerLeadManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build query parameters
  const queryParams: any = {
    page: currentPage,
    page_size: pageSize
  };

  if (debouncedSearch.trim()) {
    queryParams.search = debouncedSearch.trim();
  }

  if (selectedStatus) {
    queryParams.lead_status = selectedStatus;
  }

  if (selectedFilters.length > 0) {
    queryParams.lead_traffic = selectedFilters.join(',');
  }
  const {
    data: leadsData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetBrokerLeadsListQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  console.log('leads data', leadsData)
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
      case 'terms_sent': return 'bg-[#9333EA]';
      case 'in_legals': return 'bg-indigo-600';
      case 'completed': return 'bg-green-600';
      case 'closed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleMoreClick = (leadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
  };

  const closeActionMenu = () => {
    setOpenActionMenuId(null);
  };

  const closeStatusDropdown = () => {
    setStatusDropdownOpen(false);
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setStatusDropdownOpen(false);
    setCurrentPage(1); // Reset to first page when changing status
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSelectedStatus('');
    setSelectedFilters([]);
    setSearchQuery('');
    setCurrentPage(1);
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

  // Get selected status label
  const getSelectedStatusLabel = () => {
    if (!selectedStatus) return 'Status';
    const status = statusOptions.find(opt => opt.value === selectedStatus);
    return status ? status.label : 'Status';
  };

  const handleEditLead = (leadId: string | number, leadData: any) => {
    // Convert leadId to string if it's a number
    const idString = typeof leadId === 'number' ? leadId.toString() : leadId;
    navigate(`/broker-dashboard/update-lead/${idString}`, {
      state: { leadData }
    });
  };
  // ✅ NEW: Toggle filter
  // const toggleFilter = (traffic: string) => {
  //   setSelectedFilters(prev => {
  //     const newFilters = prev.includes(traffic)
  //       ? prev.filter(f => f !== traffic)
  //       : [...prev, traffic];
  //     setCurrentPage(1); // Reset to first page when filtering
  //     return newFilters;
  //   });
  // };

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
        <div className='flex flex-col lg:flex-row justify-between gap-4 mb-5'>
          {/* <div className=''> */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className='flex justify-between items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white w-40'
                >
                  <span className="text-gray-700">{getSelectedStatusLabel()}</span>
                  <ArrowDown className={`w-4 h-4 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Status Dropdown */}
                {statusDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={closeStatusDropdown}
                    />
                    <div className="absolute top-full mt-2 z-40 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <div className="p-2 max-h-60 overflow-y-auto">
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusSelect(option.value)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedStatus === option.value
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Clear Filters Button */}
              {(selectedStatus || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
            {/* ✅ NEW: Traffic Filter Checkboxes */}
            {/* <div className="flex items-center gap-4 my-6">
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
            </div> */}

          {/* </div> */}

          <Link to="/broker-dashboard/create-lead">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
              <Plus className="w-5 h-5" />
              New lead
            </button>
          </Link>
        </div>

        {/* Active Filters Info */}
        {(selectedStatus || debouncedSearch) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              Showing leads
              {selectedStatus && ` filtered by ${getSelectedStatusLabel().toLowerCase()}`}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </p>
          </div>
        )}

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
                            onClick={(e) => handleMoreClick(`lead-${lead.id}`, e)}
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
                                  <button
                                    onClick={() => handleEditLead(lead.id, lead)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                                  >
                                    Edit
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
                      {selectedStatus || debouncedSearch ? 'No leads match your filters' : 'No leads available'}
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
      </div>
    </div>
  );
};

export default BrokerLeadManagement;