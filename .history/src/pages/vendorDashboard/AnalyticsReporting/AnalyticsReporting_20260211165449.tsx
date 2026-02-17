import { useGetAnalyticsQuery, useGetLeadSourcesQuery } from '@/redux/features/vendor/analyticsApi';
import { useGetVendorMonthlyPerformQuery } from '@/redux/features/vendor/vendorMonthlyPerformApi';
import { Building2, Eye, TrendingUp, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AnalyticsData {
  total_leads: {
    value: number;
    sub_text: string;
  };
  active_properties: {
    value: number;
    sub_text: string;
  };
  conversion_rate: {
    value: string;
    sub_text: string;
  };
  total_views: {
    value: number;
    sub_text: string;
  };
}

interface MonthlyPerformanceData {
  leads_data: Array<{
    month: number;
    total_leads: number;
    completed_leads: number;
  }>;
}

const AnalyticsReporting: React.FC = () => {
    const { data: analytics, isLoading, isError } = useGetAnalyticsQuery(undefined);
    const { data: monthlyPerformance, isLoading: isLoadingMonthly } = useGetVendorMonthlyPerformQuery(undefined);
    const { data: leadData, isLoading: isLoadingLeadSources } = useGetLeadSourcesQuery(undefined);
    console.log(leadData);
    const analyticsData = analytics as AnalyticsData;
    const monthlyPerformanceData = monthlyPerformance as MonthlyPerformanceData;
    
    // Format month numbers to names
    const getMonthName = (monthNumber: number): string => {
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return monthNames[monthNumber - 1] || '';
    };

    // Transform backend monthly data for chart
    const transformedMonthlyData = monthlyPerformanceData?.leads_data?.map(item => ({
      month: getMonthName(item.month),
      leads: item.total_leads,
      conversions: item.completed_leads
    })) || [];

    const propertyTypeData = [
        { type: 'Industrial', views: 165000, enquiries: 30000 },
        { type: 'Land', views: 110000, enquiries: 52000 },
        { type: 'Office', views: 200000, enquiries: 85000 },
        { type: 'Retail', views: 160000, enquiries: 55000 }
    ];

    // const leadSources = [
    //     { name: 'AI Chat', leads: 20, percentage: 53, color: 'bg-orange-500' },
    //     { name: 'Message', leads: 4, percentage: 23, color: 'bg-yellow-500' },
    //     { name: 'Whatsapp', leads: 2, percentage: 14, color: 'bg-green-500' },
    //     { name: 'Call', leads: 1, percentage: 10, color: 'bg-pink-500' }
    // ];

    const leadSources = leadData?.sources.map((source: { name: string; leads: number; percentage: number }) => {
        let color = 'bg-gray-500';
        switch (source.name.toLowerCase()) {
            case 'ai chat':
                color = 'bg-orange-500';
                break;
    // Determine subtitle color based on value
    const getSubtitleColor = (value: number | string) => {
        if (typeof value === 'string') {
            // For conversion rate percentage
            const numericValue = parseFloat(value.replace('%', ''));
            return numericValue > 0 ? 'text-green-600' : 'text-gray-600';
        }
        return value > 0 ? 'text-green-600' : 'text-gray-600';
    };

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
                        <p className="text-[32px] font-bold text-gray-900 mb-1">
                            {isLoading ? '...' : isError || !analyticsData ? 'N/A' : analyticsData.total_leads.value}
                        </p>
                        <p className={`text-[13px] font-medium ${getSubtitleColor(analyticsData?.total_leads?.value || 0)}`}>
                            {isLoading ? 'Loading...' : isError || !analyticsData ? 'Data unavailable' : analyticsData.total_leads.sub_text}
                        </p>
                    </div>
                </div>

                {/* Active Properties */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Active Properties</span>
                        <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">
                            {isLoading ? '...' : isError || !analyticsData ? 'N/A' : analyticsData.active_properties.value}
                        </p>
                        <p className={`text-[13px] font-normal ${getSubtitleColor(analyticsData?.active_properties?.value || 0)}`}>
                            {isLoading ? 'Loading...' : isError || !analyticsData ? 'Data unavailable' : analyticsData.active_properties.sub_text}
                        </p>
                    </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Conversion Rate</span>
                        <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">
                            {isLoading ? '...' : isError || !analyticsData ? 'N/A' : analyticsData.conversion_rate.value}
                        </p>
                        <p className={`text-[13px] font-normal ${getSubtitleColor(analyticsData?.conversion_rate?.value || '0%')}`}>
                            {isLoading ? 'Loading...' : isError || !analyticsData ? 'Data unavailable' : analyticsData.conversion_rate.sub_text}
                        </p>
                    </div>
                </div>

                {/* Total Views */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-8">
                        <span className="text-[14px] text-gray-600 font-normal">Total Views</span>
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-gray-900 mb-1">
                            {isLoading ? '...' : isError || !analyticsData ? 'N/A' : analyticsData.total_views.value}
                        </p>
                        <p className={`text-[13px] font-normal ${getSubtitleColor(analyticsData?.total_views?.value || 0)}`}>
                            {isLoading ? 'Loading...' : isError || !analyticsData ? 'Data unavailable' : analyticsData.total_views.sub_text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-6">Monthly Performance</h2>
                    <div className="h-[320px]">
                        {isLoadingMonthly ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-500">Loading monthly data...</div>
                            </div>
                        ) : !monthlyPerformanceData?.leads_data?.length ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-500">No monthly data available</div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={transformedMonthlyData}>
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
                                    <Tooltip 
                                        formatter={(value) => [value, '']}
                                        labelFormatter={(label) => `Month: ${label}`}
                                    />
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
                                        activeDot={{ r: 6 }}
                                        name="Total Leads"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="conversions"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10b981', r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="Completed Leads"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
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