interface LeadItemProps {
  name: string;
  property: string;
  badgeText: string;
  badgeType: 'prime' | 'cold';
  initial: string;
}

const LeadItem: React.FC<LeadItemProps> = ({ name, property, badgeText, badgeType, initial }) => {
  const bgColor = badgeType === 'prime' ? 'bg-blue-50' : 'bg-[#FFF7ED]';
  const badgeColor = badgeType === 'prime' 
    ? 'bg-blue-50 text-blue-600 border-blue-200' 
    : 'bg-red-50 text-red-600 border-red-200';

  return (
    <div className={`flex items-center justify-between ${bgColor} rounded-xl px-5 py-4 mb-3 last:mb-0 hover:shadow-sm transition-shadow`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-[15px] font-semibold text-blue-600">{initial}</span>
        </div>
        <div>
          <div className="text-[15px] font-semibold text-gray-900 leading-tight mb-0.5">
            {name}
          </div>
          <div className="text-[13px] font-normal text-gray-600 leading-tight">
            {property}
          </div>
        </div>
      </div>
      <div className={`${badgeColor} border-2 rounded-md px-4 py-1`}>
        <span className="text-[13px] font-medium">{badgeText}</span>
      </div>
    </div>
  );
};

const RecentLeads: React.FC = () => {
  const leads = [
    {
      name: 'Mike Chen',
      property: 'Retail Unit - High Street Birmingham',
      badgeText: 'Prime lead',
      badgeType: 'prime' as const,
      initial: 'M'
    },
    {
      name: 'Mike Chen',
      property: 'Retail Unit - High Street Birmingham',
      badgeText: 'Cold lead',
      badgeType: 'cold' as const,
      initial: 'M'
    },
    {
      name: 'Mike Chen',
      property: 'Retail Unit - High Street Birmingham',
      badgeText: 'Cold lead',
      badgeType: 'cold' as const,
      initial: 'M'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[17px] font-semibold text-gray-900">
          Recent Leads
        </h2>
        <a 
          href="#" 
          className="text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all
        </a>
      </div>
      <div>
        {leads.map((lead, index) => (
          <LeadItem
            key={index}
            name={lead.name}
            property={lead.property}
            badgeText={lead.badgeText}
            badgeType={lead.badgeType}
            initial={lead.initial}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentLeads;