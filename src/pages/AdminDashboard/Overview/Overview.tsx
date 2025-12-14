import { Clock, Mail, MessageSquare, MoreVertical, Phone, TrendingUp, User } from 'lucide-react';
import React, { useState } from 'react';

const AdminOverview: React.FC = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const statCards = [
        { icon: User, value: '214', label: 'TOTAL LEADS', trend: 'up' },
        { icon: Clock, value: '2.4h', label: 'AVG RESPONSE TIME', trend: 'up' },
        { icon: MessageSquare, value: '98%', label: 'AUTO-REPLY SUCCESS', trend: 'up' },
        { icon: TrendingUp, value: '5/7', label: 'BROKERS ONLINE', trend: null }
    ];

    const metricCards = [
        { value: '6', label: 'Qualified Leads', sublabel: 'Meeting all criteria', bg: 'bg-[#FFECFF]', borderColor: 'border-[#FFCAFF]' },
        { value: '125', label: 'Completed Deals', sublabel: 'Meeting all criteria', bg: 'bg-[#ECFFEC]', borderColor: 'border-[#B9FFB9]' },
        { value: '24', label: 'Partial Match', sublabel: 'Some criteria met', bg: 'bg-[#ECFDFF]', borderColor: 'border-[#ACF6FF]' },
        { value: '8', label: 'Needs Review', sublabel: 'Below threshold', bg: 'bg-[#FFECEC]', borderColor: 'border-[#FFBCBC]' },
        { value: '12K+', label: 'Total leads', sublabel: 'Below threshold', bg: 'bg-[#FEFFEC]', borderColor: 'border-[#F8FF71]' },
        { value: '$4K+', label: 'Monthly Revenue', sublabel: 'From 2 units', bg: 'bg-[#F9ECFF]', borderColor: 'border-[#F0CEFF]' }
    ];

    const leadSources = [
        { name: 'Chat', percentage: 20, color: 'bg-blue-600' },
        { name: 'WhatsApp', percentage: 70, color: 'bg-blue-600' },
        { name: 'Call', percentage: 10, color: 'bg-blue-600' }
    ];

    const properties = [
        { name: 'Leeds Industrial Park', location: 'Leeds, West Yorkshire', leads: 24, color: 'bg-green-500' },
        { name: 'Leeds Industrial Park', location: 'Leeds, West Yorkshire', leads: 19, color: 'bg-green-500' },
        { name: 'Leeds Industrial Park', location: 'Leeds, West Yorkshire', leads: 8, color: 'bg-green-500' }
    ];

    const brokers = [
        { name: 'Floyd Miles', email: 'email@email.com', memberSince: 'December 2, 2018', memberColor: 'text-blue-600', properties: 5, activeLeads: 24, leadsColor: 'bg-green-500', completedDeals: 124, avgResponse: '1.2h', responseColor: 'text-orange-500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s' },
        { name: 'Cameron Williamson', email: 'email@email.com', memberSince: 'March 13, 2014', memberColor: 'text-green-600', properties: 24, activeLeads: 0, leadsColor: 'bg-red-500', completedDeals: 78, avgResponse: '0.5h', responseColor: 'text-orange-500', img: 'https://media.gettyimages.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=gi&k=20&c=LsB3LmCoN69U82LEYU78IC2tNwOMjy7LJlmEj30UOSs=' },
        { name: 'Darrell Steward', email: 'email@email.com', memberSince: 'March 23, 2013', memberColor: 'text-green-600', properties: 32, activeLeads: 22, leadsColor: 'bg-green-500', completedDeals: 82, avgResponse: '1h', responseColor: 'text-orange-500', img: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg' },
        { name: 'Marvin McKinney', email: 'email@email.com', memberSince: 'February 9, 2015', memberColor: 'text-blue-600', properties: 7, activeLeads: 17, leadsColor: 'bg-green-500', completedDeals: 175, avgResponse: '1.2h', responseColor: 'text-orange-500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s' },
        { name: 'Guy Hawkins', email: 'email@email.com', memberSince: 'October 25, 2019', memberColor: 'text-blue-600', properties: 14, activeLeads: 13, leadsColor: 'bg-green-500', completedDeals: 200, avgResponse: '1.8h', responseColor: 'text-orange-500', img: 'https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg' }
    ];

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleActive = (brokerName: string) => {
        console.log(`Active clicked for ${brokerName}`);
        setActiveDropdown(null);
    };

    const handleDeactive = (brokerName: string) => {
        console.log(`Deactive clicked for ${brokerName}`);
        setActiveDropdown(null);
    };

    const handleRemove = (brokerName: string) => {
        console.log(`Remove clicked for ${brokerName}`);
        setActiveDropdown(null);
    };

    return (
        <div>
            <h1 className='font-bold text-2xl mb-3'>Dashboard Overview</h1>
            <p className='mb-5'>Welcome back! Here's what's happening with your platform today.</p>
            <div className='bg-[#F8FAFC] p-2 rounded-lg'>
                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-end mb-4">
                                <div className="bg-blue-600 p-2.5 rounded-lg">
                                    <card.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">{card.value}</div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 uppercase tracking-wide">
                                {card.label}
                                {card.trend && <span className="text-green-500 font-bold text-xl">↑</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {metricCards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${card.bg} border ${card.borderColor} rounded-2xl p-6 min-h-[180px] flex flex-col`}
                        >
                            {/* Value (same position) */}
                            <div className="h-[44px] flex items-center justify-center text-3xl font-bold text-[#1D1F22] mb-3">
                                {card.value}
                            </div>

                            {/* Label (same position) */}
                            <div className="h-[20px] text-sm font-semibold text-[#25292C] mb-1 text-center">
                                {card.label}
                            </div>

                            {/* Sublabel (same position) */}
                            <div className="h-[16px] text-xs text-gray-600 text-center mt-3">
                                {card.sublabel}
                            </div>
                        </div>
                    ))}
                </div>


                <div className=" bg-gray-50">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Lead Sources Tracking Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-gray-900 text-xl font-semibold mb-2">
                                Lead Sources Tracking
                            </h2>
                            <p className="text-gray-600 text-sm mb-8">
                                Track performance and insights
                            </p>

                            <div className="space-y-8">
                                {leadSources.map((source, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-900 text-base font-medium">
                                                {source.name}
                                            </span>
                                            <span className="text-gray-900 text-base font-semibold">
                                                {source.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${source.color} h-2 rounded-full transition-all duration-300`}
                                                style={{ width: `${source.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Property Performance Analysis Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-gray-900 text-xl font-semibold mb-2">
                                Property Performance Analysis
                            </h2>
                            <p className="text-gray-600 text-sm mb-8">
                                Property performance and insights
                            </p>

                            <div className="space-y-4">
                                {properties.map((property, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#E8F1FD] rounded-lg px-5 py-3 flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="text-gray-900 text-base font-semibold mb-1">
                                                {property.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {property.location}
                                            </p>
                                        </div>
                                        <div className="bg-[#00B327] text-white text-sm font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap">
                                            {property.leads} leads
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Broker Performance Table */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                    <h3 className="text-xl font-semibold text-[#25292C] mb-1">Broker Performance</h3>
                    <p className="text-md text-[#25292C] mb-6">Leads handle by assigned brokers</p>

                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">BROKERS</th>
                                    <th className="text-left py-3 px-4 text-xs  text-[#1D1F22] uppercase tracking-wider font-bold">CONTACT</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">MEMBER SINCE</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">PROPERTY HANDLING</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">ACTIVE LEADS</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">COMPLETED DEALS</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">AVG RESPONSE</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brokers.map((broker, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-b-0">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <img src={broker.img} alt="profile" className='w-10 h-10 rounded-full' />
                                                <span className="text-sm font-medium text-[#25292C]">{broker.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-[#25292C]">{broker.email}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-sm font-medium ${broker.memberColor}`}>{broker.memberSince}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-medium text-gray-900">{broker.properties}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`${broker.leadsColor} text-white text-xs font-semibold px-3 py-1 rounded-md inline-block`}>
                                                {broker.activeLeads} leads
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm font-semibold text-blue-600">{broker.completedDeals}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-sm font-semibold ${broker.responseColor}`}>{broker.avgResponse}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2 relative">
                                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                                    <Mail className="w-5 h-5 text-gray-500" />
                                                </button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                                    <Phone className="w-5 h-5 text-gray-500" />
                                                </button>
                                                <div className="relative">
                                                    <button 
                                                        className="p-1.5 hover:bg-gray-100 rounded"
                                                        onClick={() => toggleDropdown(idx)}
                                                    >
                                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                                    </button>
                                                    
                                                    {/* Dropdown Menu */}
                                                    {activeDropdown === idx && (
                                                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                            <button 
                                                                className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-gray-50 border-b border-gray-100"
                                                                onClick={() => handleActive(broker.name)}
                                                            >
                                                                Active
                                                            </button>
                                                            <button 
                                                                className="w-full text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-gray-50 border-b border-gray-100"
                                                                onClick={() => handleDeactive(broker.name)}
                                                            >
                                                                Deactive
                                                            </button>
                                                            <button 
                                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                                                                onClick={() => handleRemove(broker.name)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {brokers.map((broker, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={broker.img} alt="profile" className='w-10 h-10 rounded-full' />
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-900">{broker.name}</div>
                                        <div className="text-xs text-gray-600">{broker.email}</div>
                                    </div>
                                    <div className="relative">
                                        <button 
                                            className="p-1.5 hover:bg-gray-100 rounded"
                                            onClick={() => toggleDropdown(idx)}
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-500" />
                                        </button>
                                        
                                        {/* Mobile Dropdown Menu */}
                                        {activeDropdown === idx && (
                                            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <button 
                                                    className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-gray-50 border-b border-gray-100"
                                                    onClick={() => handleActive(broker.name)}
                                                >
                                                    Active
                                                </button>
                                                <button 
                                                    className="w-full text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-gray-50 border-b border-gray-100"
                                                    onClick={() => handleDeactive(broker.name)}
                                                >
                                                    Deactive
                                                </button>
                                                <button 
                                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                                                    onClick={() => handleRemove(broker.name)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">Member Since:</span>
                                        <div className={`font-medium ${broker.memberColor} mt-0.5`}>{broker.memberSince}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Properties:</span>
                                        <div className="font-semibold text-gray-900 mt-0.5">{broker.properties}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Active Leads:</span>
                                        <div className="mt-0.5">
                                            <span className={`${broker.leadsColor} text-white font-semibold px-2 py-0.5 rounded inline-block`}>
                                                {broker.activeLeads} leads
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Completed:</span>
                                        <div className="font-semibold text-blue-600 mt-0.5">{broker.completedDeals}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Avg Response:</span>
                                        <div className={`font-semibold ${broker.responseColor} mt-0.5`}>{broker.avgResponse}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700">
                                        <Mail className="w-5 h-5" />
                                        <span className="text-xs font-medium">Email</span>
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700">
                                        <Phone className="w-5 h-5" />
                                        <span className="text-xs font-medium">Call</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;