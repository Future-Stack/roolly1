import {
    useGetAdminAnalyticsQuery,
    useGetLeadsPerformanceQuery,
    useGetPropertyTypePerformanceQuery,
    useGetLeadsConversionQuery,
    useGetLeadSourceQuery,
    useGetPropertyPerformanceQuery
} from '@/redux/features/admin/analytics/adminAnalyticsApi';
import { Building2, Eye, TrendingUp, Users } from 'lucide-react';
import React, { useMemo } from 'react';
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';



const AdminAnalytics: React.FC = () => {
    const { data: analytics } = useGetAdminAnalyticsQuery(undefined);
    const { data: leadsPerformance } = useGetLeadsPerformanceQuery(undefined);

    const monthlyData = useMemo(() => {
        if (!leadsPerformance?.leads_data) return [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return leadsPerformance.leads_data.map((item: any) => ({
            month: monthNames[item.month - 1],
            leads: item.total_leads,
            conversions: item.completed_leads
        }));
    }, [leadsPerformance]);

    const { data: propertyTypePerformance } = useGetPropertyTypePerformanceQuery(undefined);

    const propertyTypeData = useMemo(() => {
        if (!propertyTypePerformance) return [];
        return propertyTypePerformance.map((item: any) => ({
            type: item.property_type.charAt(0).toUpperCase() + item.property_type.slice(1),
            views: item.total_views,
            enquiries: item.total_enquiries
        }));
    }, [propertyTypePerformance]);

    const { data: leadsConversion } = useGetLeadsConversionQuery(undefined);
    const { data: leadSourceData } = useGetLeadSourceQuery(undefined);
    const { data: propertyPerformance } = useGetPropertyPerformanceQuery(undefined);

    const conversionData = useMemo(() => {
        if (!leadsConversion) return [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Create an array for all 12 months initialized with 0
        const allMonths = monthNames.map(month => ({ month, value: 0 }));

        leadsConversion.forEach((item: any) => {
            if (item.month >= 1 && item.month <= 12) {
                allMonths[item.month - 1].value = item.leads;
            }
        });
        return allMonths;
    }, [leadsConversion]);

    const leadSources = useMemo(() => {
        if (!leadSourceData) return [];
        return leadSourceData.map((item: any) => ({
            name: item.source,
            percentage: item.percentage,
            color: item.source === 'Whatsapp' ? 'bg-[#25D366]' : item.source === 'AI' ? 'bg-[#8B5CF6]' : 'bg-[#126AD8]'
        }));
    }, [leadSourceData]);

    const propertyPerformanceData = useMemo(() => {
        if (!propertyPerformance) return [];
        return propertyPerformance.map((item: any) => ({
            name: item.property_name,
            location: item.location,
            leads: item.leads_count
        }));
    }, [propertyPerformance]);

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
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytics?.assigned_leads?.value}</p>
                        <p className="text-[13px] text-green-600 font-medium">{analytics?.assigned_leads?.sub_text}</p>
                    </div>
                </div>

                {/* Active Properties */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Lead</span>
                        <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytics?.total_leads?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytics?.total_leads?.sub_text}</p>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Conversion Rate</span>
                        <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytics?.conversion_rate?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytics?.conversion_rate?.sub_text}</p>
                    </div>
                </div>

                {/* Total Views */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Views</span>
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">{analytics?.property_views?.value}</p>
                        <p className="text-[13px] text-gray-600 font-normal">{analytics?.property_views?.sub_text}</p>
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
                                name="Leads"
                            />
                            <Line
                                type="monotone"
                                dataKey="conversions"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981', r: 4 }}
                                name="Conversions"
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
                            {leadSources.map((source: any, index: number) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-900 text-base font-medium capitalize">
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
                            {propertyPerformanceData?.map((property: any, index: number) => (
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

            <div className=" bg-gray-50 mt-6">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <h2 className="text-gray-900 text-xl font-semibold mb-8">
                        Closing scoring
                    </h2>

                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={conversionData}
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
                        <span className="text-[#8B5CF6] text-sm">Leads Conversion</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;