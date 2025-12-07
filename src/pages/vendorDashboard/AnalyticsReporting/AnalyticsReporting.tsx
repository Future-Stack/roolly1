import { Building2, Eye, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AnalyticsReporting: React.FC = () => {
    const monthlyData = [
        { month: 'Jan', leads: 150, conversions: 50 },
        { month: 'Feb', leads: 175, conversions: 60 },
        { month: 'Mar', leads: 210, conversions: 65 },
        { month: 'Apr', leads: 250, conversions: 72 },
        { month: 'May', leads: 275, conversions: 75 },
        { month: 'Jun', leads: 300, conversions: 75 }
    ];

    const propertyTypeData = [
        { type: 'Industrial', views: 165000, enquiries: 30000 },
        { type: 'Land', views: 110000, enquiries: 52000 },
        { type: 'Office', views: 200000, enquiries: 85000 },
        { type: 'Retail', views: 160000, enquiries: 55000 }
    ];

    const leadSources = [
        { name: 'AI Chat', leads: 20, percentage: 53, color: 'bg-orange-500' },
        { name: 'Message', leads: 4, percentage: 23, color: 'bg-yellow-500' },
        { name: 'Whatsapp', leads: 2, percentage: 14, color: 'bg-green-500' },
        { name: 'Call', leads: 1, percentage: 10, color: 'bg-pink-500' }
    ];

    return (
        <div className="w-full min-h-screen">
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
                        <span className="text-[14px] text-gray-600 font-normal">Total Leads</span>
                        <Users className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">3</p>
                        <p className="text-[13px] text-green-600 font-medium">2 qualified</p>
                    </div>
                </div>

                {/* Active Properties */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Active Properties</span>
                        <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">2</p>
                        <p className="text-[13px] text-gray-600 font-normal">2 available</p>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Conversion Rate</span>
                        <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">60%</p>
                        <p className="text-[13px] text-gray-600 font-normal">+5.3% this month</p>
                    </div>
                </div>

                {/* Total Views */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Views</span>
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">20000</p>
                        <p className="text-[13px] text-gray-600 font-normal">+5.3% this month</p>
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

                {/* Lead Sources */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-6">Lead Sources</h2>
                    <div className="space-y-6">
                        {leadSources.map((source, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[14px] text-gray-900 font-normal">{source.name}</span>
                                    <span className="text-[14px] text-gray-600 font-normal">
                                        {source.leads} leads ({source.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${source.color} rounded-full`}
                                        style={{ width: `${source.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                        <Bar dataKey="enquiries" fill="#10b981" name="enquiries" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsReporting;