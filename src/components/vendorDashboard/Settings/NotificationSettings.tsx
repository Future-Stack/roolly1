/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetVendorSettingsQuery } from '@/redux/features/vendor/getVendorSettingsApi';
import { useUpdateVendorSettingsMutation } from '@/redux/features/vendor/updateVendorSettingApi';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    apiField: string;
}

const NotificationSettings: React.FC = () => {
    const { data: settings, isLoading, isError } = useGetVendorSettingsQuery(undefined);
    const [updateVendorSettings, { isLoading: isUpdating }] = useUpdateVendorSettingsMutation();
    
    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: 'email',
            title: 'Email Notification',
            description: 'Email Notification Receive alert via email for amber or green leads.',
            enabled: true,
            apiField: 'email_notification'
        },
        {
            id: 'sms',
            title: 'SMS Notifications',
            description: 'SMS Notifications receive alert via SMS for amber and green leads.',
            enabled: true,
            apiField: 'sms_notification'
        },
        {
            id: 'broker',
            title: 'Broker alerts',
            description: 'Receive an email when a broker is trying to get in contact.',
            enabled: true,
            apiField: 'broker_alert'
        }
    ]);

    // Update local state when settings data loads from backend
    useEffect(() => {
        if (settings) {
            setNotifications(prev => prev.map(notif => ({
                ...notif,
                enabled: settings[notif.apiField as keyof typeof settings] ?? notif.enabled
            })));
        }
    }, [settings]);

    const toggleNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
            )
        );
    };

    const handleUpdatePreferences = async () => {
        try {
            // Create data object for API
            const updateData: Record<string, boolean> = {};
            
            notifications.forEach(notif => {
                updateData[notif.apiField] = notif.enabled;
            });


           await updateVendorSettings(updateData).unwrap();
            
            toast.success('Notification preferences updated successfully!');
            
        } catch (error: any) {
            console.error('Error updating notification preferences:', error);
            alert(error?.data?.message || 'Failed to update preferences. Please try again.');
        }
    };

    const handleCancel = () => {
        // Reset to original settings from backend
        if (settings) {
            setNotifications(prev => prev.map(notif => ({
                ...notif,
                enabled: settings[notif.apiField as keyof typeof settings] ?? notif.enabled
            })));
        }
    };

    if (isLoading) {
        return (
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="text-center py-4">
                    <div className="text-gray-500">Loading notification settings...</div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="text-center py-4">
                    <div className="text-red-500">Failed to load notification settings</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="max-w-[880px]">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-2">
                        Notification Settings
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Manage your notification preferences
                    </p>

                    <div className="space-y-6">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex items-start justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-[15px] font-medium text-gray-900">
                                            {notification.title}
                                        </h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${notification.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {notification.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-gray-600 font-normal leading-relaxed">
                                        {notification.description}
                                    </p>
                                </div>

                                {/* Toggle Switch */}
                                <button
                                    onClick={() => toggleNotification(notification.id)}
                                    disabled={isUpdating}
                                    className={`relative inline-flex h-[28px] w-[52px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${notification.enabled ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    role="switch"
                                    aria-checked={notification.enabled}
                                    aria-label={`Toggle ${notification.title}`}
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
            
            {/* Action Buttons */}
            <div className='pt-5 flex items-center gap-3'>
                <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="border border-gray-300 text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdatePreferences}
                    disabled={isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? 'Updating...' : 'Update Preferences'}
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;