import React from 'react';
import { CheckCircle2, Home } from 'lucide-react';

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
  const {data: prop}
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
        <div>
          <PropertyStatusItem
            icon={<CheckCircle2 size={24} strokeWidth={2} />}
            label="Available"
            count="2 properties"
            percentage="92.8%"
            bgColor="bg-green-50"
            iconColor="text-green-600"
            percentageColor="text-green-600"
          />
          <PropertyStatusItem
            icon={<Home size={24} strokeWidth={2} />}
            label="Occupied"
            count="2 properties"
            percentage="22.8%"
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
            percentageColor="text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadPropertyStats;