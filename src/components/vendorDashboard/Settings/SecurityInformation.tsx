import React, { useState } from 'react';

const SecurityInformation: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Handle password change logic
    console.log('Password change requested');
  };

  return (
    <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
      {/* Security Information Section */}
      <div className="max-w-[880px]">
        <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
          Security Information
        </h2>

        <div className="space-y-6">
          {/* Current Password Field */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Change Password Button */}
          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInformation;