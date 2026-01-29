import React, {  useState } from 'react';
import { Target, TrendingUp, Plus, FileText, ChartLine } from 'lucide-react';
import BrokerLeads from '@/components/brokerDashboard/Overview/BrokerLeads';
import BrokerAvailableLeads from '@/components/brokerDashboard/Overview/BrokerAvailableLeads';
import LeadGenerationEnquiryForm from '@/components/brokerDashboard/BrokerLeads/LeadGenerationEnquiryForm';
import PropertyCribSheet from '@/components/brokerDashboard/BrokerLeads/PropertyCribSheet';
import { useGetBrokerLeadsQuery } from '@/redux/features/broker/leads/getBrokerLeadsApi';

const BrokerDashboardOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'available'>('my');
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false); 
  const [propertyCribModalOpen, setPropertyCribModalOpen] = useState(false); 
  const {data:brokerLeads} = useGetBrokerLeadsQuery(undefined);

  const openNewLeadModal = () => {
    setNewLeadModalOpen(true);
  };

  const closeNewLeadModal = () => {
    setNewLeadModalOpen(false);
  };

  const openPropertyCribModal = () => {
    setPropertyCribModalOpen(true);
  };

  const closePropertyCribModal = () => {
    setPropertyCribModalOpen(false);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* New Lead Modal */}
      <LeadGenerationEnquiryForm
        isOpen={newLeadModalOpen}
        onClose={closeNewLeadModal}
      />

      {/* Property Crib Sheet Modal */}
      <PropertyCribSheet
        isOpen={propertyCribModalOpen}
        onClose={closePropertyCribModal}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-gray-900 mb-1">
              Dashboard Overview
            </h1>
            <p className="text-base text-gray-600 font-medium">
              Welcome back! Here's what's happening with your platform today.
            </p>
          </div>
          <button 
            onClick={openPropertyCribModal}
            className="bg-[#EA580C] hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-medium transition-colors"
          >
            <FileText className="w-4 h-4" strokeWidth={2} />
            Property Crib Sheet
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Assigned Leads */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[13px] text-gray-600 font-normal">Assigned Leads</span>
              <Target className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[32px] font-bold text-gray-900 mb-1">3</p>
              <p className="text-[12px] text-green-600 font-medium">Active</p>
            </div>
          </div>

          {/* Available Leads */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[13px] text-gray-600 font-normal">Available Leads</span>
              <Target className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[32px] font-bold text-gray-900 mb-1">3</p>
              <p className="text-[12px] text-orange-500 font-medium">Available</p>
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[13px] text-gray-600 font-normal">Avg Response Time</span>
              <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[32px] font-bold text-gray-900">1.2h</p>
            </div>
          </div>

          {/* Closed Deals */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[13px] text-gray-600 font-normal">Closed Deals</span>
              <ChartLine className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[32px] font-bold text-gray-900">10</p>
            </div>
          </div>
        </div>

        {/* Tabs and New Lead Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-full">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-5 py-2 text-base font-medium rounded-full transition-colors ${activeTab === 'my'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              My leads({brokerLeads?.length|| 0})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-5 py-2 text-base font-medium rounded-full transition-colors ${activeTab === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              Available leads(05)
            </button>
          </div>
          <button 
            onClick={openNewLeadModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-base font-medium transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            New lead
          </button>
        </div>

        {/* Lead Cards */}
        {activeTab === 'my' ? <BrokerLeads /> : <BrokerAvailableLeads />}
      </div>
    </div>
  );
};

export default BrokerDashboardOverview;