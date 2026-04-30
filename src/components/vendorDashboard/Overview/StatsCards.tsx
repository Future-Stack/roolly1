import { Users, Building2, TrendingUp, Eye } from 'lucide-react';
import StatCard from './StatCard';
import { useGetOverviewStatsQuery } from '@/redux/features/vendor/overview';


const StatsCards: React.FC = () => {
  const { data: overviewData, isLoading, isError } = useGetOverviewStatsQuery(undefined);
  console.log('Overview Data:', overviewData);


  // Loading state
  if (isLoading) {
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
  if (isError || !overviewData) {
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
      value: (overviewData?.lead_stats?.total_leads ?? 0).toString(),
      subtitle: `Qualified: ${overviewData?.lead_stats?.qualified_leads ?? 0}`,
      icon: <Users size={24} strokeWidth={2} />,
      subtitleColor: (overviewData?.lead_stats?.total_leads ?? 0) > 0 ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Listed Properties',
      value: (overviewData?.property_stats?.total_properties ?? 0).toString(),
      subtitle: `Available: ${overviewData?.property_stats?.available_properties ?? 0}`,
      icon: <Building2 size={24} strokeWidth={2} />,
      subtitleColor: (overviewData?.property_stats?.total_properties ?? 0) > 0 ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Conversion Rate',
      value: overviewData?.conversion_rates?.all_time ?? "0%",
      subtitle: `This Month: ${overviewData?.conversion_rates?.this_month ?? "0%"}`,
      icon: <TrendingUp size={24} strokeWidth={2} />,
      subtitleColor: (overviewData?.conversion_rates?.all_time && overviewData?.conversion_rates?.all_time !== "0%") ? 'text-green-600' : 'text-gray-600'
    },
    {
      title: 'Total Views',
      value: (overviewData?.total_views ?? 0).toString(),
      subtitle: "API data pending",
      icon: <Eye size={24} strokeWidth={2} />,
      subtitleColor: 'text-gray-600'
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