import React, { useState } from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      role="switch"
      aria-checked={enabled}
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
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);
  const [newLeadsAlerts, setNewLeadsAlerts] = useState(true);

  const handleUpdatePassword = () => {
    console.log('Update Password clicked');
    console.log({
      emailNotification,
      smsNotification,
      newLeadsAlerts,
    });
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  return (
    <div className="">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications Update</h1>

      {/* Notification Settings */}
      <div className="space-y-6 mb-8">
        {/* Email Notification */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Email Notification</h3>
            <p className="text-sm text-gray-600">Receive lead alerts via email</p>
          </div>
          <ToggleSwitch enabled={emailNotification} onChange={setEmailNotification} />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">SMS Notifications</h3>
            <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
          </div>
          <ToggleSwitch enabled={smsNotification} onChange={setSmsNotification} />
        </div>

        {/* New Leads Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">New Leads Alerts</h3>
            <p className="text-sm text-gray-600">Get notified immediately when new leads arrive</p>
          </div>
          <ToggleSwitch enabled={newLeadsAlerts} onChange={setNewLeadsAlerts} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleUpdatePassword}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Password
        </button>
        <button
          onClick={handleCancel}
          className="bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-6 py-2.5 rounded-md border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotificationsUpdate;