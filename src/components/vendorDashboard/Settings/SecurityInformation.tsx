import React, { useState } from 'react';
import { useBrokerChangePasswordMutation } from '@/redux/features/broker/settings/brokerChangePasswordApi';
import { useVendorChangePasswordMutation } from '@/redux/features/vendor/vendorChangePasswordApi';
import { toast } from 'react-toastify';

interface SecurityInformationProps {
  role?: 'broker' | 'vendor';
}

const SecurityInformation: React.FC<SecurityInformationProps> = ({ role = 'broker' }) => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_new_password, setConfirmNewPassword] = useState('');

  const [brokerChangePassword, { isLoading: isBrokerLoading }] = useBrokerChangePasswordMutation();
  const [vendorChangePassword, { isLoading: isVendorLoading }] = useVendorChangePasswordMutation();

  const isLoading = isBrokerLoading || isVendorLoading;

  const handleChangePassword = async () => {
    if (!old_password || !new_password || !confirm_new_password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (new_password !== confirm_new_password) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const payload = {
        old_password,
        new_password,
        confirm_new_password
      };

      if (role === 'broker') {
        await brokerChangePassword(payload).unwrap();
      } else {
        await vendorChangePassword(payload).unwrap();
      }

      toast.success('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      console.error('Password change error:', error);
      const errorMessage = error?.data?.message || error?.data?.detail || 'Failed to change password';
      toast.error(errorMessage);
    }
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
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm_new_password}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full h-[42px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>

          {/* Change Password Button */}
          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInformation;
