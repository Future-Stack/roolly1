import { Users, Building2, TrendingUp, Eye } from 'lucide-react';
import StatCard from './StatCard';
import { useGetAnalyticsQuery } from '@/redux/features/vendor/getAnalyticsApi';
import { useGetOverviewStatsQuery } from '@/redux/features/vendor/overview';
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

const StatsCards: React.FC = () => {
  const { data, isLoading, isError } = useGetAnalyticsQuery(undefined);
  const { data: overviewData, isLoading: isOverviewLoading } = useGetOverviewStatsQuery(undefined);
  console.log('Analytics Data:', data);
  console.log('Overview Data:', overviewData);
  
  const analyticsData = overviewData as AnalyticsData;

  // Loading state
  if (isLoading || isOverviewLoading || !analyticsData) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-start justify-between mb-6">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !analyticsData) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Leads', icon: <Users size={24} strokeWidth={2} /> },
            { title: 'Listed Properties', icon: <Building2 size={24} strokeWidth={2} /> },
            { title: 'Conversion Rate', icon: <TrendingUp size={24} strokeWidth={2} /> },
            { title: 'Total Views', icon: <Eye size={24} strokeWidth={2} /> }
          ].map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value="N/A"
              subtitle="Data unavailable"
              icon={stat.icon}
              subtitleColor="text-red-500"
            />
          ))}
        </div>
      </div>
    );
  }

  // Format the stats from backend data
  const stats = [
    {
      title: 'Total Leads',
      value: overviewData.total_leads.value.toString(),
      subtitle: overviewData.total_leads.sub_text,
      icon: <Users size={24} strokeWidth={2} />,
      subtitleColor: overviewData.total_leads.value > 0 ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Listed Properties',
      value: overviewData.active_properties.value.toString(),
      subtitle: overviewData.active_properties.sub_text,
      icon: <Building2 size={24} strokeWidth={2} />,
      subtitleColor: overviewData.active_properties.value > 0 ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Conversion Rate',
      value: overviewData.conversion_rate.value,
      subtitle: overviewData.conversion_rate.sub_text,
      icon: <TrendingUp size={24} strokeWidth={2} />,
      subtitleColor: analyticsData.conversion_rate.value !== "0%" ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Total Views',
      value: analyticsData.total_views.value.toString(),
      subtitle: analyticsData.total_views.sub_text,
      icon: <Eye size={24} strokeWidth={2} />,
      subtitleColor: analyticsData.total_views.value > 0 ? 'text-green-600' : 'text-gray-600'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            subtitleColor={stat.subtitleColor}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;