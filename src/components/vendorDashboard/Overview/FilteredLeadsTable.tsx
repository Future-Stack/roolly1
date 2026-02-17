import React, { useState } from 'react';
import { useGetVendorLeadsQuery, type VendorLead } from '@/redux/features/vendor/getVendorLeadsApi';
import { Mail, Phone } from 'lucide-react';
import Pagination from '@/components/vendorDashboard/Leads/Pagination';

interface FilteredLeadsTableProps {
    selectedFilters: string[];
}

const FilteredLeadsTable: React.FC<FilteredLeadsTableProps> = ({ selectedFilters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: leadsResponse, isLoading } = useGetVendorLeadsQuery({ page: currentPage });

    const getTrafficColor = (traffic: string) => {
        switch (traffic.toLowerCase()) {
            case 'green':
                return 'bg-green-500 text-white';
            case 'amber':
                return 'bg-amber-500 text-white';
            case 'red':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const leads: VendorLead[] = leadsResponse?.results || [];
    const totalPages = Math.ceil((leadsResponse?.count || 0) / 10);

    const filteredLeads = leads.filter(lead =>
        selectedFilters.includes(lead.lead_traffic.toLowerCase())
    );

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading filtered leads...</div>;
    }


    return (
        <>
            {filteredLeads?.length > 0 && (
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-6">
            <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
                Leads for Selected Status
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="text-left px-4 py-2 text-[14px] font-semibold text-gray-900 border-b border-gray-200">ID</th>
                            <th className="text-left px-4 py-2 text-[14px] font-semibold text-gray-900 border-b border-gray-200">Leads</th>
                            <th className="text-left px-4 py-2 text-[14px] font-semibold text-gray-900 border-b border-gray-200">Property</th>
                            <th className="text-left px-4 py-2 text-[14px] font-semibold text-gray-900 border-b border-gray-200">Traffic</th>
                            <th className="text-left px-4 py-2 text-[14px] font-semibold text-gray-900 border-b border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                                <td className="px-4 py-4 text-[14px] text-gray-900">{lead.id}</td>
                                <td className="px-4 py-4 text-[14px] text-gray-900 font-medium">{lead.client_name}</td>
                                <td className="px-4 py-4 text-[14px] text-gray-600">{lead.property_name}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[12px] font-medium capitalize ${getTrafficColor(lead.lead_traffic)}`}>
                                        {lead.lead_traffic}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Call">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                        </button>
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Email">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    />
            </div>
        </div>
                )}
        </>
    );
};

export default FilteredLeadsTable;
