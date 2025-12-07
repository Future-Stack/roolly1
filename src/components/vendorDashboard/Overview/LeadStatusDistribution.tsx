import StatusCard from "./StatusCard";

const LeadStatusDistribution: React.FC = () => {
  const statuses = [
    {
      count: 5,
      label: 'PrimeLeads',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      count: 28,
      label: 'Warm Lead',
      bgColor: 'bg-[#FEFCE8]',
      textColor: 'text-yellow-600',
      borderColor: 'border-[#CA8A04]'
    },
    {
      count: 85,
      label: 'Cold Lead',
      bgColor: 'bg-[#FFEDD5]',
      textColor: 'text-orange-600',
      borderColor: 'border-[#F97316]'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-6">
      <h2 className="text-[17px]  text-gray-900 mb-6">
        Lead Status Distribution
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {statuses.map((status, index) => (
          <StatusCard
            key={index}
            count={status.count}
            label={status.label}
            bgColor={status.bgColor}
            textColor={status.textColor}
            borderColor={status.borderColor}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadStatusDistribution;