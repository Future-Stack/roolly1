/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useGetAdminPreferenceQuery } from '@/redux/features/admin/settings/getAdminPreferenceApi';
import { useUpdateAdminPreferenceMutation } from '@/redux/features/admin/settings/updateAdminPreferenceApi';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      role="switch"
      aria-checked={enabled}
      aria-disabled={disabled}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

const NotificationsUpdate: React.FC = () => {
  const { data: preference, isLoading, refetch } = useGetAdminPreferenceQuery(undefined);
  const [updateAdminPreference, { isLoading: isUpdating }] = useUpdateAdminPreferenceMutation();
  
  // Initialize states with API data
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [smsNotification, setSmsNotification] = useState<boolean>(false);
  const [newLeadsAlerts, setNewLeadsAlerts] = useState<boolean>(false);
  
  // State for success/error messages
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Update states when preference data is loaded
  useEffect(() => {
    if (preference) {
      setEmailNotification(preference.email_notification);
      setSmsNotification(preference.sms_notification);
      setNewLeadsAlerts(preference.new_property_alert);
    }
  }, [preference]);

  const handleUpdatePreferences = async () => {
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Prepare data to send
    const updateData = {
      email_notification: emailNotification,
      sms_notification: smsNotification,
      new_property_alert: newLeadsAlerts,
    };

    console.log('Updating preferences:', updateData);

    try {
      await updateAdminPreference(updateData).unwrap();
    
      setSuccessMessage('Preferences updated successfully!');
      
      await refetch();
    
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error: any) {
      console.error('Update error:', error);
      
      // Handle error
      if (error?.data) {
        const errorData = error.data;
        
        if (errorData.email_notification) {
          setErrorMessage(`Email Notification: ${errorData.email_notification[0]}`);
        } else if (errorData.sms_notification) {
          setErrorMessage(`SMS Notification: ${errorData.sms_notification[0]}`);
        } else if (errorData.new_leads_alert) {
          setErrorMessage(`New Leads Alert: ${errorData.new_leads_alert[0]}`);
        } else if (errorData.non_field_errors) {
          setErrorMessage(errorData.non_field_errors[0]);
        } else {
          setErrorMessage('Failed to update preferences. Please try again.');
        }
      } else {
        setErrorMessage('Failed to update preferences. Please try again.');
      }

      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCancel = () => {
    // Reset to original preferences
    if (preference) {
      setEmailNotification(preference.email_notification);
      setSmsNotification(preference.sms_notification);
      setNewLeadsAlerts(preference.new_leads_alert);
    }
    setSuccessMessage('');
    setErrorMessage('');
    console.log('Changes cancelled');
  };

  // Check if any changes were made
  const hasChanges = preference && (
    emailNotification !== preference.email_notification ||
    smsNotification !== preference.sms_notification ||
    newLeadsAlerts !== preference.new_leads_alert
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications Update</h1>
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Loading preferences...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications Update</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="space-y-6 mb-8">
        {/* Email Notification */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Email Notification</h3>
            <p className="text-sm text-gray-600">Receive lead alerts via email</p>
          </div>
          <ToggleSwitch 
            enabled={emailNotification} 
            onChange={setEmailNotification}
            disabled={isUpdating}
          />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">SMS Notifications</h3>
            <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
          </div>
          <ToggleSwitch 
            enabled={smsNotification} 
            onChange={setSmsNotification}
            disabled={isUpdating}
          />
        </div>

        {/* New Leads Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">New Leads Alerts</h3>
            <p className="text-sm text-gray-600">Get notified immediately when new leads arrive</p>
          </div>
          <ToggleSwitch 
            enabled={newLeadsAlerts} 
            onChange={setNewLeadsAlerts}
            disabled={isUpdating}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdatePreferences}
          disabled={!hasChanges || isUpdating}
          className={`bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            !hasChanges || isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Update Preferences'}
        </button>
        <button
          onClick={handleCancel}
          disabled={!hasChanges || isUpdating}
          className={`bg-white text-gray-700 font-medium text-sm px-6 py-2.5 rounded-md border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
            !hasChanges || isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
      </div>

      {/* Helper Text */}
      {!hasChanges && (
        <p className="mt-4 text-sm text-gray-500">
          No changes made to preferences
        </p>
      )}
    </div>
  );
};

export default NotificationsUpdate;