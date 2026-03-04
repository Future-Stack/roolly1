/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAnalyticsOverviewQuery } from '@/redux/features/broker/analytics/getAnalyticsOverviewApi';
import { useGetLeadPerformanceQuery } from '@/redux/features/broker/analytics/getLeadPerformanceApi';
import { useGetBrokerPropertyTypePerformanceQuery } from '@/redux/features/broker/analytics/getPropertyTypePerformanceApi';
import { useGetBrokerLeadSourceQuery } from '@/redux/features/broker/analytics/getLeadSourceApi';
import { useGetBrokerPropertyAnalysisQuery } from '@/redux/features/broker/analytics/getPropertyAnalysisApi';
import { useGetBrokerLeadsConversionQuery } from '@/redux/features/broker/analytics/getLeadsConversionApi';
import { Building2, Eye, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';


const BrokerAnalytics: React.FC = () => {
    const { data: analytisOverview } = useGetAnalyticsOverviewQuery(undefined);
    const { data: leadPerformance } = useGetLeadPerformanceQuery(undefined);
    const { data: propertyTypePerformance } = useGetBrokerPropertyTypePerformanceQuery(undefined);
    const { data: brokerLeadSource } = useGetBrokerLeadSourceQuery(undefined);
    const { data: brokerPropertyAnalysis } = useGetBrokerPropertyAnalysisQuery(undefined);
    const { data: brokerLeadsConversion } = useGetBrokerLeadsConversionQuery(undefined);

    // Map backend lead performance data to chart format
    const monthlyData = leadPerformance?.leads_data?.map((item: any) => ({
        month: getMonthName(item.month),
        leads: item.total_leads,
        conversions: item.completed_leads
    })) || [];

    const propertyTypeData = propertyTypePerformance?.map((item: any) => ({
        type: item.property_type.charAt(0).toUpperCase() + item.property_type.slice(1),
        views: item.total_views,
        enquiries: item.total_enquiries
    })) || [];


    const getSourceColor = (name: string) => {
        switch (name.toLowerCase()) {
            case 'chat':
            case 'ai':
            case 'ai chat':
                return 'bg-[#126AD8]';
            case 'whatsapp':
                return 'bg-[#126AD8]'; // Keeping consistent with broker theme or I can vary them
            case 'call':
                return 'bg-[#126AD8]';
            default:
                return 'bg-[#126AD8]';
        }
    };

    const leadSources = brokerLeadSource?.map((source: any) => ({
        name: source.source,
        percentage: source.percentage,
        color: getSourceColor(source.source)
    })) || [];


    // const propertyTypeData = [
    //     { type: 'Industrial', views: 165000, enquiries: 30000 },
    //     { type: 'Land', views: 110000, enquiries: 52000 },
    //     { type: 'Office', views: 200000, enquiries: 85000 },
    //     { type: 'Retail', views: 160000, enquiries: 55000 }
    // ];

    const leadsConversionData = brokerLeadsConversion?.map((item: any) => ({
        month: getMonthName(item.month),
        value: item.leads
    })) || [];


    // Helper function to get month name from month number
    function getMonthName(monthNumber: number): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthNumber - 1] || '';
    }

    return (
        <div className="w-full min-h-screen mb-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                    Analytics & Reporting
                </h1>
                <p className="text-[15px] text-gray-600 font-normal">
                    Comprehensive insights into lead sources, property performance, and conversion rates
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {/* Total Leads */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Assigned Leads</span>
                        <Users className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytisOverview?.assigned_leads?.value}</p>
                        <p className="text-[13px] text-green-600 font-medium">{analytisOverview?.assigned_leads?.sub_text}</p>
                    </div>
                </div>

                {/* Active Properties */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Lead</span>
                        <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytisOverview?.total_leads?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytisOverview?.total_leads?.sub_text}</p>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Conversion Rate</span>
                        <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytisOverview?.conversion_rate?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytisOverview?.conversion_rate?.sub_text}</p>
                    </div>
                </div>

                {/* Total Views */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Views</span>
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytisOverview?.property_views?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytisOverview?.property_views?.sub_text}</p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-6">Monthly Performance</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip />
                            <Legend
                                wrapperStyle={{ fontSize: '13px' }}
                                iconType="line"
                            />
                            <Line
                                type="monotone"
                                dataKey="leads"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: '#3b82f6', r: 4 }}
                                name="leads"
                            />
                            <Line
                                type="monotone"
                                dataKey="conversions"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981', r: 4 }}
                                name="conversions"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Property Type Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-6">Property Type Performance</h2>
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart data={propertyTypeData} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="type"
                                tick={{ fontSize: 13, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip />
                            <Legend
                                wrapperStyle={{ fontSize: '13px' }}
                                iconType="square"
                            />
                            <Bar dataKey="views" fill="#3b82f6" name="Views" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="enquiries" fill="#10b981" name="Enquiries" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
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
                            {brokerPropertyAnalysis?.map((property, index) => (
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

            <div className=" bg-gray-50 mt-6">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <h2 className="text-gray-900 text-xl font-semibold mb-8">
                        Closing scoring
                    </h2>

                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={leadsConversionData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E5E7EB"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 14 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 14 }}
                                    domain={[0, 20]}
                                    ticks={[0, 5, 10, 15, 20]}
                                    dx={-10}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#8B5CF6"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={60}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6">
                        <div className="w-3 h-3 bg-[#8B5CF6]"></div>
                        <span className="text-[#8B5CF6] text-sm">leads Conversion</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrokerAnalytics;