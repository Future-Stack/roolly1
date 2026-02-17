import { useState } from "react";
import StatusCard from "./StatusCard";
import { useGetLeadStatusCountsQuery } from "@/redux/features/vendor/overview";

interface LeadStatusDistributionProps {
  onFilterChange?: (selectedStatuses: string[]) => void;
}

const LeadStatusDistribution: React.FC<LeadStatusDistributionProps> = ({ onFilterChange }) => {
  const { data } = useGetLeadStatusCountsQuery(undefined);

  // ✅ State to track selected filters (all selected by default)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    'PrimeLeads',
    'WarmLead',
    'ColdLead'
  ]);

  const statuses = [
    {
      count: data?.green ?? 0,
      label: 'Prime Leads',
      value: 'green',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      count: data?.amber ?? 0,
      label: 'Warm Lead',
      value: 'amber',
      bgColor: 'bg-[#FEFCE8]',
      textColor: 'text-yellow-600',
      borderColor: 'border-[#CA8A04]'
    },
    {
      count: data?.red ?? 0,
      label: 'Hot Lead',
      value: 'red',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  // ✅ Toggle filter selection
  const toggleStatus = (value: string) => {
    const newStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter(s => s !== value)
      : [...selectedStatuses, value];

    setSelectedStatuses(newStatuses);

    // Optional: notify parent component
    if (onFilterChange) {
      onFilterChange(newStatuses);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-6">
      <h2 className="text-[17px] text-gray-900 mb-6">
        Lead Status Distribution
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {statuses.map((status, index) => (
          <div
            key={index}
            onClick={() => toggleStatus(status.value)}
            className="flex-1 cursor-pointer"
          >
            <StatusCard
              count={status.count}
              label={status.label}
              bgColor={status.bgColor}
              textColor={status.textColor}
              borderColor={status.borderColor}
              isSelected={selectedStatuses.includes(status.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadStatusDistribution;







// import StatusCard from "./StatusCard";

// const LeadStatusDistribution: React.FC = () => {
//   const statuses = [
//     {
//       count: 5,
//       label: 'PrimeLeads',
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-600',
//       borderColor: 'border-blue-200'
//     },
//     {
//       count: 28,
//       label: 'Warm Lead',
//       bgColor: 'bg-[#FEFCE8]',
//       textColor: 'text-yellow-600',
//       borderColor: 'border-[#CA8A04]'
//     },
//     {
//       count: 85,
//       label: 'Cold Lead',
//       bgColor: 'bg-[#FFEDD5]',
//       textColor: 'text-orange-600',
//       borderColor: 'border-[#F97316]'
//     }
//   ];

//   return (
//     <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-6">
//       <h2 className="text-[17px]  text-gray-900 mb-6">
//         Lead Status Distribution
//       </h2>
//       <div className="flex flex-col sm:flex-row gap-4">
//         {statuses.map((status, index) => (
//           <StatusCard
//             key={index}
//             count={status.count}
//             label={status.label}
//             bgColor={status.bgColor}
//             textColor={status.textColor}
//             borderColor={status.borderColor}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LeadStatusDistribution;