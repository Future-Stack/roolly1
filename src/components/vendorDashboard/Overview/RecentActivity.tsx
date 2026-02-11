import React from 'react';
import { Home } from 'lucide-react';
import { type RecentListedProperty, useGetRecentListedPropertiesQuery } from '@/redux/features/vendor/overview';

const RecentActivity: React.FC = () => {
  const { data: activityData, isLoading, isError } = useGetRecentListedPropertiesQuery(undefined);

  console.log('Recent Activity Data:', activityData);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins} mins ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return past.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white mt-6 rounded-2xl border border-gray-200 p-6">
        <div className="h-6 bg-gray-100 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-white mt-6 rounded-2xl border border-gray-200 p-6">
        <div className="text-red-500">Failed to load recent activity.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white mt-6 rounded-2xl border border-gray-200">
      <div className="px-6 py-5">
        <h2 className="text-lg font-semibold text-black m-0 mb-6">
          Recent Activity
        </h2>
        
        <div className="space-y-0">
          {activityData && activityData.length > 0 ? (
            activityData.map((activity: RecentListedProperty, index: number) => (
              <div
                key={index}
                className="flex items-start gap-4 py-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50">
                  <Home className="w-5 h-5 text-emerald-500" strokeWidth={2} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-normal text-black leading-tight m-0 mb-1">
                    Property listed: {activity.property_name} ({activity.property_type})
                  </p>
                  <p className="text-sm font-normal text-gray-500 leading-tight m-0">
                    {formatTimeAgo(activity.created_at)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">No recent activity.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;