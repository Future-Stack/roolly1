import { type RecentLead, useGetRecentLeadsQuery } from '@/redux/features/vendor/overview';

interface LeadItemProps {
  name: string;
  property: string;
  badgeText: string;
  badgeType: 'prime' | 'cold';
  initial: string;
}

const LeadItem: React.FC<LeadItemProps> = ({ name, property, badgeText, badgeType, initial }) => {
  const bgColor = badgeType === 'prime' ? 'bg-blue-50' :
   'bg-[#FFF7ED]';
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
  const { data: leadsData, isLoading, isError } = useGetRecentLeadsQuery(undefined);

  console.log('Recent Leads Data:', leadsData);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <div className="h-6 bg-gray-100 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <div className="text-red-500">Failed to load recent leads.</div>
      </div>
    );
  }

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
        {leadsData && leadsData.length > 0 ? (
          leadsData.map((lead: RecentLead, index: number) => {
            const badgeType = lead.lead_traffic === 'red' ? 'cold' : 'prime';
            const badgeText = lead.lead_traffic === 'green' ? 'Prime lead' : lead.lead_traffic === 'amber' ? 'Warm lead' : 'Cold lead';

            return (
              <LeadItem
                key={index}
                name={lead.client_name}
                property={lead.property__property_name}
                badgeText={badgeText}
                badgeType={badgeType}
                initial={lead.client_name.charAt(0).toUpperCase()}
              />
            );
          })
        ) : (
          <div className="text-gray-500 text-center py-4">No recent leads found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentLeads;