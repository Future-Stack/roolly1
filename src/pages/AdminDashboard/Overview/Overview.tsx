/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBrokerPerformanceQuery } from '@/redux/features/admin/overview/brokerPerformanceApi';
import { useGetLeadsStatusQuery } from '@/redux/features/admin/overview/getLeadsStatusApi';
import { useGetOverviewQuery } from '@/redux/features/admin/overview/getOverviewApi';
import { useGetPerformanceQuery } from '@/redux/features/admin/overview/getPerformanceApi';
import { Clock, Mail, MessageSquare, MoreVertical, Phone, TrendingUp, User } from 'lucide-react';
import React, { useState } from 'react';

interface BrokerPerformanceData {
    id: string;
    full_name: string;
    image: string | null;
    email: string;
    joining_date: string;
    property_handling: number;
    active_leads: number;
    complete_leads: number;
    phone_number: string;
}

const AdminOverview: React.FC = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const { data: brokerPerformanceResponse, isLoading, error } = useBrokerPerformanceQuery(undefined);
    const {data:leadsStatus} = useGetLeadsStatusQuery(undefined);
    const {data:overview} = useGetOverviewQuery(undefined);
    const {data:performance} = useGetPerformanceQuery(undefined);
    console.log(performance)
    
    const brokerPerformance: BrokerPerformanceData[] = brokerPerformanceResponse?.results || brokerPerformanceResponse || [];


    const statCards = [
        { icon: User, value: overview?.total_lead, label: 'TOTAL LEADS', trend: 'up' },
        { icon: Clock, value: overview?.total_listed_property, label: 'Total Listed Property', trend: 'up' },
        { icon: MessageSquare, value: overview?.auto_reply_success_rate, label: 'AUTO-REPLY SUCCESS', trend: 'up' },
        { icon: TrendingUp, value: overview?. brokers_online, label: 'BROKERS ONLINE', trend: null }
    ];

    const metricCards = [
        { value: leadsStatus?.qualified_leads, label: 'Qualified Leads', bg: 'bg-[#FFECFF]', borderColor: 'border-[#FFCAFF]' },
        { value: leadsStatus?.completed_deals, label: 'Completed Deals', bg: 'bg-[#ECFFEC]', borderColor: 'border-[#B9FFB9]' },
        { value: leadsStatus?.partial_match, label: 'Partial Match', bg: 'bg-[#ECFDFF]', borderColor: 'border-[#ACF6FF]' },
        { value: leadsStatus?.needs_review, label: 'Needs Review', bg: 'bg-[#FFECEC]', borderColor: 'border-[#FFBCBC]' },
        { value: leadsStatus?.total_leads, label: 'Total leads', bg: 'bg-[#FEFFEC]', borderColor: 'border-[#F8FF71]' },
        { value: leadsStatus?.unassigned_leads, label: 'Unassigned Leads', bg: 'bg-[#F9ECFF]', borderColor: 'border-[#F0CEFF]' }
    ];

    const leadSources = [
        { name: 'Chat', percentage: 20, color: 'bg-blue-600' },
        { name: 'WhatsApp', percentage: 70, color: 'bg-blue-600' },
        { name: 'Call', percentage: 10, color: 'bg-blue-600' }
    ];

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Helper function to determine member color based on join date
    const getMemberColor = (joinDate: string): string => {
        const currentDate = new Date();
        const joinDateObj = new Date(joinDate);
        const diffTime = currentDate.getTime() - joinDateObj.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays > 365) { // More than 1 year
            return 'text-green-600';
        } else {
            return 'text-blue-600';
        }
    };

    // Helper function to determine lead color based on active leads count
    const getLeadColor = (activeLeads: number): string => {
        if (activeLeads === 0) {
            return 'bg-red-500';
        } else if (activeLeads <= 10) {
            return 'bg-yellow-500';
        } else {
            return 'bg-green-500';
        }
    };

    // Helper function to generate average response time
    const getAvgResponse = (index: number): string => {
        const responses = ['1.2h', '0.5h', '1h', '1.2h', '1.8h'];
        return responses[index % responses.length];
    };

    // Helper function to get response color
    const getResponseColor = (responseTime: string): string => {
        const time = parseFloat(responseTime);
        if (time < 1) return 'text-green-600';
        if (time <= 1.5) return 'text-orange-500';
        return 'text-red-500';
    };

    const getInitials = (fullName: string): string => {
        return fullName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Helper function to get placeholder image URL
    const getImageUrl = (broker: BrokerPerformanceData, index: number): string => {
        if (broker.image) return broker.image;
        
        // Use a placeholder service or initials
        const placeholderImages = [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        ];
        
        return placeholderImages[index % placeholderImages.length];
    };

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
                    {statCards?.map((card, idx) => (
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
                    {metricCards?.map((card, idx) => (
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
                            {/* <div className="h-[16px] text-xs text-gray-600 text-center mt-3">
                                {card.sublabel}
                            </div> */}
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50">
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
                                {leadSources?.map((source, index) => (
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
                                {performance?.map((property:any, index:number) => (
                                    <div
                                        key={index}
                                        className="bg-[#E8F1FD] rounded-lg px-5 py-3 flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="text-gray-900 text-base font-semibold mb-1">
                                                {property.property_name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {property.location}
                                            </p>
                                        </div>
                                        <div className="bg-[#00B327] text-white text-sm font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap">
                                            {property.leads_count} leads
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

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="text-gray-600 mt-2">Loading broker performance...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-600 text-sm">
                                Error loading broker performance. Please try again.
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && brokerPerformance.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No broker performance data available.</p>
                        </div>
                    )}

                    {/* Desktop Table */}
                    {!isLoading && !error && brokerPerformance.length > 0 && (
                        <>
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">BROKERS</th>
                                            <th className="text-left py-3 px-4 text-xs text-[#1D1F22] uppercase tracking-wider font-bold">CONTACT</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">MEMBER SINCE</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">PROPERTY HANDLING</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">ACTIVE LEADS</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">COMPLETED DEALS</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">AVG RESPONSE</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-[#1D1F22] uppercase tracking-wider">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brokerPerformance?.map((broker, idx) => {
                                            const avgResponse = getAvgResponse(idx);
                                            const responseColor = getResponseColor(avgResponse);
                                            const memberColor = getMemberColor(broker.joining_date);
                                            const leadColor = getLeadColor(broker.active_leads);
                                            const formattedDate = formatDate(broker.joining_date);
                                            const imageUrl = getImageUrl(broker, idx);

                                            return (
                                                <tr key={broker.id} className="border-b border-gray-100 last:border-b-0">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            {broker.image ? (
                                                                <img src={imageUrl} alt="profile" className='w-10 h-10 rounded-full object-cover' />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                                    {getInitials(broker.full_name)}
                                                                </div>
                                                            )}
                                                            <span className="text-sm font-medium text-[#25292C]">{broker.full_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-[#25292C]">{broker.email}</span>
                                                        <div className="text-xs text-gray-500 mt-1">{broker.phone_number}</div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`text-sm font-medium ${memberColor}`}>{formattedDate}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm font-medium text-gray-900">{broker.property_handling}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`${leadColor} text-white text-xs font-semibold px-3 py-1 rounded-md inline-block`}>
                                                            {broker.active_leads} leads
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm font-semibold text-blue-600">{broker.complete_leads}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`text-sm font-semibold ${responseColor}`}>{avgResponse}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-2 relative">
                                                            <a href={`mailto:${broker.email}`} className="p-1.5 hover:bg-gray-100 rounded">
                                                                <Mail className="w-5 h-5 text-gray-500" />
                                                            </a>
                                                            <a href={`tel:${broker.phone_number}`} className="p-1.5 hover:bg-gray-100 rounded">
                                                                <Phone className="w-5 h-5 text-gray-500" />
                                                            </a>
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
                                                                            onClick={() => handleActive(broker.full_name)}
                                                                        >
                                                                            Active
                                                                        </button>
                                                                        <button 
                                                                            className="w-full text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-gray-50 border-b border-gray-100"
                                                                            onClick={() => handleDeactive(broker.full_name)}
                                                                        >
                                                                            Deactive
                                                                        </button>
                                                                        <button 
                                                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                                                                            onClick={() => handleRemove(broker.full_name)}
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="lg:hidden space-y-4">
                                {brokerPerformance?.map((broker, idx) => {
                                    const avgResponse = getAvgResponse(idx);
                                    const responseColor = getResponseColor(avgResponse);
                                    const memberColor = getMemberColor(broker.joining_date);
                                    const leadColor = getLeadColor(broker.active_leads);
                                    const formattedDate = formatDate(broker.joining_date);
                                    const imageUrl = getImageUrl(broker, idx);

                                    return (
                                        <div key={broker.id} className="border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                {broker.image ? (
                                                    <img src={imageUrl} alt="profile" className='w-10 h-10 rounded-full object-cover' />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                        {getInitials(broker.full_name)}
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900">{broker.full_name}</div>
                                                    <div className="text-xs text-gray-600">{broker.email}</div>
                                                    <div className="text-xs text-gray-500">{broker.phone_number}</div>
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
                                                                onClick={() => handleActive(broker.full_name)}
                                                            >
                                                                Active
                                                            </button>
                                                            <button 
                                                                className="w-full text-left px-4 py-2.5 text-sm text-orange-600 hover:bg-gray-50 border-b border-gray-100"
                                                                onClick={() => handleDeactive(broker.full_name)}
                                                            >
                                                                Deactive
                                                            </button>
                                                            <button 
                                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                                                                onClick={() => handleRemove(broker.full_name)}
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
                                                    <div className={`font-medium ${memberColor} mt-0.5`}>{formattedDate}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Properties:</span>
                                                    <div className="font-semibold text-gray-900 mt-0.5">{broker.property_handling}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Active Leads:</span>
                                                    <div className="mt-0.5">
                                                        <span className={`${leadColor} text-white font-semibold px-2 py-0.5 rounded inline-block`}>
                                                            {broker.active_leads} leads
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Completed:</span>
                                                    <div className="font-semibold text-blue-600 mt-0.5">{broker.complete_leads}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Avg Response:</span>
                                                    <div className={`font-semibold ${responseColor} mt-0.5`}>{avgResponse}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                                <a href={`mailto:${broker.email}`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700">
                                                    <Mail className="w-5 h-5" />
                                                    <span className="text-xs font-medium">Email</span>
                                                </a>
                                                <a href={`tel:${broker.phone_number}`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700">
                                                    <Phone className="w-5 h-5" />
                                                    <span className="text-xs font-medium">Call</span>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;