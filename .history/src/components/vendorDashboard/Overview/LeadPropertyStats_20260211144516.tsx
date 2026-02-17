import React from 'react';
import { CheckCircle2, Home } from 'lucide-react';
import { useGetLeadDistributionTypeQuery, useGetPropertyStatusCountsQuery } from '@/redux/features/vendor/overview';

interface LeadTypeItemProps {
  label: string;
  count: number;
}

const LeadTypeItem: React.FC<LeadTypeItemProps> = ({ label, count }) => {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[15px] font-normal text-gray-900">{label}</span>
        <span className="text-[15px] font-semibold text-gray-900">{count}</span>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
      </div>
    </div>
  );
};

interface PropertyStatusItemProps {
  icon: React.ReactNode;
  label: string;
  count: string;
  percentage: string;
  bgColor: string;
  iconColor: string;
  percentageColor: string;
}

const PropertyStatusItem: React.FC<PropertyStatusItemProps> = ({
  icon,
  label,
  count,
  percentage,
  bgColor,
  iconColor,
  percentageColor
}) => {
  const { data: leadTypeData, isLoading, isError } = useGetLeadDistributionTypeQuery(undefined);
  console.log()

  return (
    <div className={`flex items-center justify-between ${bgColor} rounded-xl px-5 py-4 mb-3 last:mb-0`}>
      <div className="flex items-center gap-4">
        <div className={iconColor}>
          {icon}
        </div>
        <div>
          <div className="text-[15px] font-semibold text-gray-900 leading-tight">{label}</div>
          <div className="text-[13px] font-normal text-gray-600 leading-tight mt-0.5">{count}</div>
        </div>
      </div>
      <div className={`text-[17px] font-bold ${percentageColor}`}>
        {percentage}
      </div>
    </div>
  );
};

const LeadPropertyStats: React.FC = () => {
    const { data: propertyData, isLoading: propertyLoading, isError: propertyError } = useGetPropertyStatusCountsQuery(undefined);
    console.log(propertyData)
    const availableCount = propertyData?.available ?? 0;
    const occupiedCount = propertyData?.occupied ?? 0;
    const totalProperties = availableCount + occupiedCount;

    const availablePercentage = totalProperties > 0 
        ? ((availableCount / totalProperties) * 100).toFixed(1) 
        : "0";
    
    const occupiedPercentage = totalProperties > 0 
        ? ((occupiedCount / totalProperties) * 100).toFixed(1) 
        : "0";

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            {/* Lead Type Distribution */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-[17px] font-sm text-gray-900 mb-6">
                    Lead Type Distribution
                </h2>
                <div>
                    <LeadTypeItem label="Tenant Leads" count={10} />
                    <LeadTypeItem label="Buyer Leads" count={10} />
                </div>
            </div>

            {/* Property Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-[17px] font-sm text-gray-900 mb-6">
                    Property Status
                </h2>
                {propertyLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-16 bg-gray-100 rounded-xl"></div>
                        <div className="h-16 bg-gray-100 rounded-xl"></div>
                    </div>
                ) : propertyError ? (
                    <div className="text-red-500 text-sm">Failed to load property status.</div>
                ) : (
                    <div>
                        <PropertyStatusItem
                            icon={<CheckCircle2 size={24} strokeWidth={2} />}
                            label="Available"
                            count={`${availableCount} properties`}
                            percentage={`${availablePercentage}%`}
                            bgColor="bg-green-50"
                            iconColor="text-green-600"
                            percentageColor="text-green-600"
                        />
                        <PropertyStatusItem
                            icon={<Home size={24} strokeWidth={2} />}
                            label="Occupied"
                            count={`${occupiedCount} properties`}
                            percentage={`${occupiedPercentage}%`}
                            bgColor="bg-blue-50"
                            iconColor="text-blue-600"
                            percentageColor="text-blue-600"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadPropertyStats;