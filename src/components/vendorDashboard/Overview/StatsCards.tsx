import { Users, Building2, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Leads',
      value: '3',
      subtitle: '2 qualified',
      icon: <Users size={24} strokeWidth={2} />,
      subtitleColor: 'text-green-600'
    },
    {
      title: 'Listed Properties',
      value: '3',
      subtitle: '2 Available',
      icon: <Building2 size={24} strokeWidth={2} />,
      subtitleColor: 'text-gray-600'
    },
    {
      title: 'Conversion Rate',
      value: '60%',
      subtitle: '+5.3% this month',
      icon: <TrendingUp size={24} strokeWidth={2} />,
      subtitleColor: 'text-gray-600'
    },
    {
      title: 'Occupancy Rate',
      value: '60%',
      subtitle: '+5.3% this month',
      icon: <TrendingUp size={24} strokeWidth={2} />,
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