interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  subtitleColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, subtitleColor }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-[15px] font-normal text-gray-600">{title}</h3>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className="space-y-2">
        <div className="text-4xl font-bold text-gray-900 leading-none">{value}</div>
        <div className={`text-sm font-normal ${subtitleColor}`}>{subtitle}</div>
      </div>
    </div>
  );
};

export default StatCard;