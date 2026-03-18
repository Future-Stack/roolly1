/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBrokerSettingsQuery } from '@/redux/features/broker/settings/getBrokerSettingsApi';
import { useUpdateBrokerSettingsMutation } from '@/redux/features/broker/settings/updateBrokerSettingsApi';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    apiField: keyof BackendSettings;
}

interface BackendSettings {
    email_notification: boolean;
    sms_notification: boolean;
    new_property_alert: boolean;
}

const BrokerNotificationSettings: React.FC = () => {
    const { data: settings, isLoading, isError } = useGetBrokerSettingsQuery(undefined);
    const [updateBrokerSettings, { isLoading: isUpdating }] = useUpdateBrokerSettingsMutation();
    
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
        // {
        //     id: 'new_property',
        //     title: 'New Property Alerts',
        //     description: 'Receive an email when new properties are available.',
        //     enabled: true,
        //     apiField: 'new_property_alert'
        // }
    ]);

    // Sync with backend data when it loads
    useEffect(() => {
        if (settings) {
            console.log('Backend settings loaded:', settings);
            
            setNotifications(prev => prev.map(notif => {
                // Check if this field exists in backend settings
                const backendValue = settings[notif.apiField];
                console.log(`Field ${notif.apiField}:`, backendValue);
                
                return {
                    ...notif,
                    enabled: backendValue !== undefined ? backendValue : notif.enabled
                };
            }));
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
            const updateData: Partial<BackendSettings> = {};
            
            notifications.forEach(notif => {
                updateData[notif.apiField] = notif.enabled;
            });

            console.log('Sending update data:', updateData);
            
            // Use updateBrokerSettings instead of updateVendorSettings
            await updateBrokerSettings(updateData).unwrap();
            
            toast.success('Notification preferences updated successfully!');
            
            // Refetch settings to get updated values
            // This will trigger the useEffect and update the UI
            
        } catch (error: any) {
            console.error('Error updating notification preferences:', error);
            const errorMessage = error?.data?.message || 
                               error?.data?.detail || 
                               error?.error || 
                               'Failed to update preferences. Please try again.';
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        if (settings) {
            setNotifications(prev => prev.map(notif => ({
                ...notif,
                enabled: settings[notif.apiField] !== undefined ? settings[notif.apiField] : notif.enabled
            })));
        }
    };

    // Check if there are any changes
    const hasChanges = settings && notifications.some(notif => {
        const backendValue = settings[notif.apiField];
        return backendValue !== undefined && backendValue !== notif.enabled;
    });

    // Loading state with improved skeleton
    if (isLoading) {
        return (
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="max-w-[880px]">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-2">
                        Notification Settings
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Manage your notification preferences
                    </p>

                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start justify-between gap-4 p-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                </div>
                                <div className="h-7 bg-gray-200 rounded-full w-14 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
                <div className="max-w-[880px]">
                    <h2 className="text-[17px] font-semibold text-gray-900 mb-2">
                        Notification Settings
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Manage your notification preferences
                    </p>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <h3 className="text-red-800 font-medium mb-2">Failed to Load Settings</h3>
                        <p className="text-red-600 text-sm mb-3">
                            Unable to load notification settings. Please try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Check if notifications are loaded from backend
    const isDataLoaded = settings && notifications.every(notif => 
        settings[notif.apiField] !== undefined
    );

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

                    {!isDataLoaded && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-700 text-sm">
                                Loading notification settings from server...
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {notifications.map((notification) => {
                            // Get current value from backend for comparison
                            const backendValue = settings?.[notification.apiField];
                            const isChanged = backendValue !== undefined && 
                                             backendValue !== notification.enabled;

                            return (
                                <div
                                    key={notification.id}
                                    className={`flex items-start justify-between gap-4 p-4 rounded-lg transition-colors ${isChanged ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-[15px] font-medium text-gray-900">
                                                {notification.title}
                                            </h3>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${notification.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {notification.enabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                            {isChanged && (
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                                                    Changed
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[13px] text-gray-600 font-normal leading-relaxed">
                                            {notification.description}
                                        </p>
                                        {backendValue !== undefined && isChanged && (
                                            <p className="text-xs text-blue-600 mt-1">
                                                Original setting: {backendValue ? 'Enabled' : 'Disabled'}
                                            </p>
                                        )}
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
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                <p>Changes will be applied immediately after saving.</p>
                                {hasChanges && (
                                    <p className="text-blue-600 font-medium mt-1">
                                        You have unsaved changes
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleCancel}
                                    disabled={isUpdating || !hasChanges}
                                    className="border border-gray-300 text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdatePreferences}
                                    disabled={isUpdating || !hasChanges}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Preferences'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrokerNotificationSettings;