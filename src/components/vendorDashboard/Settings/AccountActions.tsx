import React from 'react';

const AccountActions: React.FC = () => {
  const handleDeleteAccount = () => {
    // Handle delete account logic
    console.log('Delete account requested');
  };

  const handleDeactiveAccount = () => {
    // Handle deactivate account logic
    console.log('Deactivate account requested');
  };

  return (
    <div className="w-full bg-white p-6 border border-gray-200 rounded-2xl">
      <div className="max-w-[880px]">
        <h2 className="text-[17px] font-semibold text-gray-900 mb-8">
          Account Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 mb-5">
          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="w-full h-[50px] bg-[#B91C1C] hover:bg-red-700 text-white text-[15px] font-medium rounded-lg transition-colors"
          >
            Delete Account
          </button>

          {/* Deactive Account Button */}
          <button
            onClick={handleDeactiveAccount}
            className="w-full h-[50px] bg-[#CA8A04] hover:bg-yellow-700 text-white text-[15px] font-medium rounded-lg transition-colors"
          >
            Deactive Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountActions;