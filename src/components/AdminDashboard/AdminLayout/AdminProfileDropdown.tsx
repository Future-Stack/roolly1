/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut, Settings, HelpCircle } from "lucide-react";

const AdminProfileDropdown = ({
  isOpen,
  onClose,
  dropdownRef
}: any) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-black">
          Profile & Settings
        </h3>
      </div>

      {/* Settings */}
      <button
        onClick={onClose}
        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4F46E51A] flex items-center justify-center">
          <Settings className="w-5 h-5 text-[#4338CA]" strokeWidth={2} />
        </div>
        <span className="text-base font-medium text-gray-900">Settings</span>
      </button>

      {/* Help */}
      <button
        onClick={onClose}
        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0F766E33] flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-[#0F766E]" strokeWidth={2} />
        </div>
        <span className="text-base font-medium text-gray-900">Help & Support</span>
      </button>

      {/* Logout */}
      <button
        onClick={onClose}
        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7E22CE33] flex items-center justify-center">
          <LogOut className="w-5 h-5 text-[#7E22CE]" strokeWidth={2} />
        </div>
        <span className="text-base font-medium text-gray-900">Logout</span>
      </button>
    </div>
  );
};

export default AdminProfileDropdown;
