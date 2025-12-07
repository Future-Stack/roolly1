import React from 'react';
import { Home, Users } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'property' | 'lead';
  title: string;
  time: string;
  icon: 'home' | 'users';
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'property',
      title: 'Property listed: Spacious Family Home',
      time: 'Recently',
      icon: 'home'
    },
    {
      id: 2,
      type: 'property',
      title: 'Property listed: Spacious Family Home',
      time: 'Recently',
      icon: 'home'
    },
    {
      id: 3,
      type: 'lead',
      title: 'New lead(Cozy Studio Loft)',
      time: '14:50:20',
      icon: 'users'
    }
  ];

  return (
    <div className="w-full  bg-white mt-6 rounded-2xl border border-gray-200">
      <div className="px-6 py-5">
        <h2 className="text-lg font-semibold text-black m-0 mb-6">
          Recent Activity
        </h2>
        
        <div className="space-y-0">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 py-4"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                activity.icon === 'home' 
                  ? 'bg-emerald-50' 
                  : 'bg-blue-50'
              }`}>
                {activity.icon === 'home' ? (
                  <Home className="w-5 h-5 text-emerald-500" strokeWidth={2} />
                ) : (
                  <Users className="w-5 h-5 text-blue-500" strokeWidth={2} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal text-black leading-tight m-0 mb-1">
                  {activity.title}
                </p>
                <p className="text-sm font-normal text-gray-500 leading-tight m-0">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;