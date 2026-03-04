import LeadGenerationEnquiryForm from '@/components/brokerDashboard/BrokerLeads/LeadGenerationEnquiryForm';
import ListedProperty from '@/components/vendorDashboard/Property/ListedProperty';
// import PropertyApplication from '@/components/vendorDashboard/Property/PropertyApplication';
// import { useGetListedPropertyApiQuery } from '@/redux/features/vendor/property/getListedPropertyApi';
// import { useGetNewPropertyQuery } from '@/redux/features/vendor/property/getNewPropertyApi';
import React, { useState } from 'react';

const VendorProperty: React.FC = () => {
    // const [activeTab, setActiveTab] = useState<'application' | 'list'>('application');
    const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
    // const {data:listedProperty} = useGetListedPropertyApiQuery(undefined);
    // const {data:newProperty} = useGetNewPropertyQuery(undefined)

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
                            Property Details from Vendor
                        </h1>
                        <p className="text-base text-gray-600 font-medium">
                            View and Confirm listing Property for  Users
                        </p>
                    </div>
                </div>

                {/* Tabs and New Lead Button */}
                {/* <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-full">
                        <button
                            onClick={() => setActiveTab('application')}
                            className={`px-5 py-2 text-base font-medium rounded-full transition-colors ${activeTab === 'application'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                        {` New Property Application (${newProperty?.count})`}
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`px-5 py-2 text-base font-medium rounded-full transition-colors ${activeTab === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                           {`My Listed Property (${listedProperty?.count})`}
                        </button>
                    </div>
                </div> */}

                {/* Lead Cards */}
                {/* {activeTab === 'application' ? <PropertyApplication /> : <ListedProperty />} */}
                 <ListedProperty />
            </div>
        </div>
    );
};

export default VendorProperty;