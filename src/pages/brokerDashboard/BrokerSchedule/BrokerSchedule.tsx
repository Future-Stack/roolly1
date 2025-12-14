import React, { useState } from 'react';
import BrokerAvailableLeads from '@/components/brokerDashboard/Overview/BrokerAvailableLeads';
import LeadGenerationEnquiryForm from '@/components/brokerDashboard/BrokerLeads/LeadGenerationEnquiryForm';
import BrokerScheduleLeads from '@/components/brokerDashboard/BrokerSchedule/BrokerScheduleLeads';

const BrokerSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'available'>('my');
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false); 


  const closeNewLeadModal = () => {
    setNewLeadModalOpen(false);
  };


  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* New Lead Modal */}
      <LeadGenerationEnquiryForm
        isOpen={newLeadModalOpen}
        onClose={closeNewLeadModal}
      />


      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-gray-900 mb-1">
              Scheduled Viewings
            </h1>
            <p className="text-base text-gray-600 font-medium">
              View and Confirm to manage Lead
            </p>
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
               Scheduled Viewing
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-5 py-2 text-base font-medium rounded-full transition-colors ${activeTab === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
             Past Viewing
            </button>
          </div>
        </div>

        {/* Lead Cards */}
        {activeTab === 'my' ? <BrokerScheduleLeads/> : <BrokerAvailableLeads />}
      </div>
    </div>
  );
};

export default BrokerSchedule;