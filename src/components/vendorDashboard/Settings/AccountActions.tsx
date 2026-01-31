import { useUpdateBrokerProfileMutation } from '@/redux/features/broker/settings/updateBrokerProfileApi';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AccountActions: React.FC = () => {
  const [updateBrokerProfile, { isLoading: isUpdating }] = useUpdateBrokerProfileMutation();
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      console.log('Delete account requested');
      
      alert('Account deletion request has been submitted.');
      
      setShowDeleteConfirm(false);
      
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account. Please try again.');
      setShowDeleteConfirm(false);
    }
  };

  const handleDeactiveAccount = async () => {
    if (!showDeactivateConfirm) {
      setShowDeactivateConfirm(true);
      return;
    }

    try {
      const deactivationData = {
        is_deactivated: true
      };
      await updateBrokerProfile(deactivationData).unwrap();
      
      toast.success('Account deactivated successfully!');
      setShowDeactivateConfirm(false);
      
    } catch (error) {
      console.error('Failed to deactivate account:', error);
      toast.error('Failed to deactivate account. Please try again.');
      setShowDeactivateConfirm(false);
    }
  };

  const cancelDeactivate = () => {
    setShowDeactivateConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
      <div className="max-w-[880px]">
        <h2 className="text-[17px] font-semibold text-gray-900 mb-8">
          Account Actions
        </h2>

        {showDeactivateConfirm && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-amber-800 font-semibold mb-2">Confirm Deactivation</h3>
            <p className="text-amber-700 text-sm mb-3">
              Are you sure you want to deactivate your account? You can reactivate it later by contacting support.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDeactivate}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactiveAccount}
                disabled={isUpdating}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Deactivating...' : 'Yes, Deactivate'}
              </button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 font-semibold mb-2">Confirm Deletion</h3>
            <p className="text-red-700 text-sm mb-3">
              Warning: This action is irreversible. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 mb-5">
          <button
            onClick={handleDeleteAccount}
            className="w-full h-[50px] bg-[#B91C1C] hover:bg-red-700 text-white text-[15px] font-medium rounded-lg transition-colors"
          >
            {showDeleteConfirm ? 'Confirm Delete Account' : 'Delete Account'}
          </button>

          <button
            onClick={handleDeactiveAccount}
            disabled={isUpdating}
            className="w-full h-[50px] bg-[#CA8A04] hover:bg-yellow-700 text-white text-[15px] font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showDeactivateConfirm 
              ? (isUpdating ? 'Deactivating...' : 'Confirm Deactivate')
              : 'Deactivate Account'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountActions;