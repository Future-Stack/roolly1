import React, { useState } from 'react';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

const NotificationSettings: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: 'email',
            title: 'Email Notification',
            description: 'Email Notification Receive alert via email  for amber or green leads.',
            enabled: true
        },
        {
            id: 'sms',
            title: 'SMS Notifications',
            description: 'SMS Notifications receive alert via SMS for amber and green leads.',
            enabled: true
        },
        {
            id: 'broker',
            title: 'Broker alerts',
            description: 'receive an email when a broker is trying to get in contact.',
            enabled: true
        }
    ]);

    const toggleNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
            )
        );
    };

    return (
        <div>
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="max-w-[880px]">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-8">
                        Notification
                    </h2>

                    <div className="space-y-6">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex items-start justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                                        {notification.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-600 font-normal leading-relaxed">
                                        {notification.description}
                                    </p>
                                </div>

                                {/* Toggle Switch */}
                                <button
                                    onClick={() => toggleNotification(notification.id)}
                                    className={`relative inline-flex h-[28px] w-[52px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${notification.enabled ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    role="switch"
                                    aria-checked={notification.enabled}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notification.enabled ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           <div className='pt-5'>
             <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors"
            >
               Update Preference
            </button>
           </div>
        </div>
    );
};

export default NotificationSettings;