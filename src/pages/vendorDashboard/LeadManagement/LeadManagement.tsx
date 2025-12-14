import ActionMenu from '@/components/vendorDashboard/Leads/ActionMenu';
import Pagination from '@/components/vendorDashboard/Leads/Pagination';
import { Mail, MoreVertical, Phone, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';


interface Lead {
    id: string;
    name: string;
    property: string;
    propertyType: string;
    budget: string;
    traffic: 'Green' | 'Amber' | 'Red';
    date: string;
}

const LeadManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    const leads: Lead[] = [
        {
            id: 'PR0001',
            name: 'Sarah Johnson',
            property: 'Unit 5 - Leeds Industrial Park',
            propertyType: 'Industrial',
            budget: '£1,500/mo',
            traffic: 'Green',
            date: '08/10/2025'
        },
        {
            id: 'PR0001',
            name: 'Sarah Johnson',
            property: 'Unit 5 - Leeds Industrial Park',
            propertyType: 'Land',
            budget: '£1,500/mo',
            traffic: 'Amber',
            date: '08/10/2025'
        },
        {
            id: 'PR0001',
            name: 'Sarah Johnson',
            property: 'Unit 5 - Leeds Industrial Park',
            propertyType: 'Industrial',
            budget: '£1,500/mo',
            traffic: 'Green',
            date: '08/10/2025'
        },
        {
            id: 'PR0001',
            name: 'Sarah Johnson',
            property: 'Unit 5 - Leeds Industrial Park',
            propertyType: 'Industrial',
            budget: '£1,500/mo',
            traffic: 'Red',
            date: '08/10/2025'
        }
    ];

    const getTrafficColor = (traffic: string) => {
        switch (traffic) {
            case 'Green':
                return 'bg-green-500 text-white';
            case 'Amber':
                return 'bg-amber-500 text-white';
            case 'Red':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="w-full min-h-screen">
            {/* Header Section */}
            <div className="pt-8 pb-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                            Lead Management
                        </h1>
                        <p className="text-md text-gray-600 font-normal mt-4">
                            View and manage all property inquiries
                        </p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium text-[15px] transition-colors whitespace-nowrap self-start lg:self-auto">
                        <Plus className="w-5 h-5 text-[#FDFEFF]" strokeWidth={2.5} />
                        Add New Property
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-[505px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Type to search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[46px] pl-12 pr-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                ID
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Leads
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Property
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Property Type
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Budget
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Traffic
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Date
                            </th>
                            <th className="text-left px-6 py-2 text-[15px] font-semibold text-gray-900 border-b border-gray-200">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                            >
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {lead.id}
                                </td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {lead.name}
                                </td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal">
                                    {lead.property}
                                </td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {lead.propertyType}
                                </td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {lead.budget}
                                </td>
                                <td className="px-6 py-5">
                                    <span
                                        className={`inline-block px-3 py-1 rounded text-[13px] font-medium ${getTrafficColor(
                                            lead.traffic
                                        )}`}
                                    >
                                        {lead.traffic}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-[15px] text-gray-900 font-normal whitespace-nowrap">
                                    {lead.date}
                                </td>
                                <td className="px-6 py-5 relative">
                                    <div className="flex items-center gap-3">
                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                            <Mail className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>

                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                            <Phone className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>

                                        {/* More Button */}
                                        <button
                                            onClick={() =>
                                                setOpenMenuIndex(openMenuIndex === index ? null : index)
                                            }
                                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-600" strokeWidth={2} />
                                        </button>
                                    </div>

                                    {/* Dropdown Menu */}
                                    {openMenuIndex === index && (
                                        <ActionMenu onClose={() => setOpenMenuIndex(null)} />
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <Pagination/>
        </div>
    );
};

export default LeadManagement;