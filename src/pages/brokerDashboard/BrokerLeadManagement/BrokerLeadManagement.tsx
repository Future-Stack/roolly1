import { ArrowDown, Mail, MoreVertical, Phone, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  property: string;
  propertyType: string;
  leadFrom: string;
  budget: string;
  traffic: 'Green' | 'Amber' | 'Red';
  status: 'Enquired' | 'Viewed' | 'Terms Sent' | 'Completed';
  date: string;
}

const BrokerLeadManagement: React.FC = () => {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [leads] = useState<Lead[]>([
    { id: 'PR0001', name: 'Sarah Johnson', property: 'Unit 5 - Leeds Industrial Park', propertyType: 'Industrial', leadFrom: 'Admin Assigned', budget: '£1,500/mo', traffic: 'Green', status: 'Enquired', date: '08/10/2025' },

    { id: 'PR0001', name: 'Robert Fox', property: 'Unit 5 - Leeds Industrial Park', propertyType: 'Land', leadFrom: 'From Vendor', budget: '£1,500/mo', traffic: 'Amber', status: 'Viewed', date: '08/10/2025' },

    { id: 'PR0001', name: 'Jane Cooper', property: 'Unit 5 - Leeds Industrial Park', propertyType: 'Industrial', leadFrom: 'Platform', budget: '£1,500/mo', traffic: 'Green', status: 'Terms Sent', date: '08/10/2025' },
    ...Array(9).fill(null).map((_, i) => ({
      id: 'PR0001',
      name: 'Annette Black',
      property: 'Unit 5 - Leeds Industrial Park',
      propertyType: 'Industrial',
      leadFrom: 'Platform',
      budget: '£1,500/mo',
      traffic: (i === 2 ? 'Red' : 'Green') as 'Green' | 'Red',
      status: 'Completed' as const,
      date: '08/10/2025'
    }))
  ]);

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Green': return 'bg-green-500';
      case 'Amber': return 'bg-amber-500';
      case 'Red': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enquired': return 'bg-purple-600';
      case 'Viewed': return 'bg-orange-600';
      case 'Scheduled': return 'bg-[#9333EA]';
      case 'Completed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const handleMoreClick = (leadId: string) => {
    setOpenActionMenuId(openActionMenuId === leadId ? null : leadId);
  };

  const closeActionMenu = () => {
    setOpenActionMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Lead Management</h1>
          <p className="text-lg text-gray-600">View and manage Lead</p>
        </div>

        {/* Search and Filters Bar */}
        <div className='flex justify-between mb-5'>
          <div className="">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <div className='flex justify-between items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white w-50'>
                  <button className=" ">
                    Land
                  </button>
                  <ArrowDown className="w-4 h-4" />
                </div>

                <div className='flex justify-between items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white w-50'>
                  <button className=" ">
                    Enquired
                  </button>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Leads</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Property Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Lead From</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Budget</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Traffic</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{lead.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{lead.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.property}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.propertyType}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.leadFrom}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.budget}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium text-white ${getTrafficColor(lead.traffic)}`}>
                        {lead.traffic}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium text-white ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.date}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 relative">
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <Mail className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <Phone className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="relative">
                          <button 
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            onClick={() => handleMoreClick(`${lead.id}-${index}`)} // Unique ID তৈরি করা
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          
                          {/* Action Menu Popup */}
                          {openActionMenuId === `${lead.id}-${index}` && (
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
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Enquired
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Viewed
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Terms sent
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    In legal
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Completed
                                  </button>
                                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm">
                                    Closed
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerLeadManagement;