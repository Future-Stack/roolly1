import React, { useState } from 'react';
import { Search, Phone, Mail, Info, MessageSquare, Trash2, User } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import AddBrokerModal from '@/components/AdminDashboard/Broker/AddBrokerModal';

interface UserCardProps {
    name: string;
    phone: string;
    email: string;
    activeLeads: string;
    closedDeals: string;
    avgResponse: string;
    memberSince: string;
    lastActive: string;
    assignedTo: string;
}

const UserCard: React.FC<UserCardProps> = ({
    name,
    phone,
    email,
    activeLeads,
    closedDeals,
    avgResponse,
    memberSince,
    lastActive,
    assignedTo,
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        SJ
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-1">{name}</h3>
                        <div className="flex items-center gap-1 text-[#3E4349] text-sm mb-1">
                            <Phone size={14} />
                            <span>{phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#3E4349] text-sm">
                            <Mail size={14} />
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <button className="text-gray-700 text-sm font-medium px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        Deactivate
                    </button>
                    <div className=' w-full flex justify-center py-1 border border-gray-300 rounded'>
                        <button className="text-red-500 hover:text-red-600">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="text-gray-500 text-sm mb-1">Active Leads</div>
                    <div className="text-gray-900 font-semibold text-base">{activeLeads}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Closed Deals</div>
                    <div className="text-gray-900 font-semibold text-base">{closedDeals}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Avg Response</div>
                    <div className="text-blue-600 font-semibold text-base">{avgResponse}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Member Since</div>
                    <div className="text-gray-900 font-semibold text-base">{memberSince}</div>
                </div>
            </div>

            <div className="text-gray-500 text-sm mb-4">Last active: {lastActive}</div>

            {/* Assigned Leads Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-sm p-3 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Info size={16} className="text-blue-600" />
                    <span className="text-gray-700 text-sm">
                        <span className="font-medium">Currently Assigned Leads:</span> {assignedTo}
                    </span>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1 rounded">
                    Green
                </button>
            </div>

            {/* Message Broker Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-2">
                <MessageSquare size={16} />
                Message Broker
            </button>
        </div>
    );
};

const Broker: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const users: UserCardProps[] = [
        {
            name: 'Sarah Johnson',
            phone: '+44 7700 100123',
            email: 'sarah.broker360@gmail.com',
            activeLeads: '01',
            closedDeals: '05',
            avgResponse: '1.8h',
            memberSince: 'May 2024',
            lastActive: '22/10/2025, 09:15:00',
            assignedTo: 'Mike Chen',
        },
        {
            name: 'Sarah Johnson',
            phone: '+44 7700 100123',
            email: 'sarah.broker360@gmail.com',
            activeLeads: '01',
            closedDeals: '05',
            avgResponse: '1.8h',
            memberSince: 'May 2024',
            lastActive: '22/10/2025, 09:15:00',
            assignedTo: 'Mike Chen',
        },
        {
            name: 'Sarah Johnson',
            phone: '+44 7700 100123',
            email: 'sarah.broker360@gmail.com',
            activeLeads: '01',
            closedDeals: '05',
            avgResponse: '1.8h',
            memberSince: 'May 2024',
            lastActive: '22/10/2025, 09:15:00',
            assignedTo: 'Mike Chen',
        },
        {
            name: 'Sarah Johnson',
            phone: '+44 7700 100123',
            email: 'sarah.broker360@gmail.com',
            activeLeads: '01',
            closedDeals: '05',
            avgResponse: '1.8h',
            memberSince: 'May 2024',
            lastActive: '22/10/2025, 09:15:00',
            assignedTo: 'Mike Chen',
        },
    ];

    return (
        <div>
            <AddBrokerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left Content */}
                <div>
                    <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 leading-tight">
                        Broker Team Management
                    </h1>
                    <p className="mt-1 text-[14px] sm:text-[15px] text-gray-600 font-normal max-w-xl">
                        24/7 expert broker coverage with dedicated single point of contact
                    </p>
                </div>

                {/* Right Button */}
                <div className="self-start sm:self-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="
        bg-[#126AD8]
        px-4 py-2.5
        rounded-dm
        text-white
        flex items-center gap-2
        text-sm font-medium
        transition-all duration-200
        hover:bg-[#0f5bbf]
        hover:scale-105
        active:scale-95
      "
                    >
                        <User className="w-5 h-5" />
                        <span>Add Broker</span>
                    </button>
                </div>
            </div>

            <div className="w-full bg-gray-50 rounded-2xl mt-5">
                <div className="w-full p-3 ">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search here"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                        </div>
                    </div>

                    {/* User Cards */}
                    <div>
                        {users.map((user, index) => (
                            <UserCard key={index} {...user} />
                        ))}
                    </div>
                </div>
            </div>

            {/* pagination */}
            <div className='flex justify-center my-12'>
                <Pagination />
            </div>
        </div>
    );
};

export default Broker;