/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, Settings} from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>; // Updated to accept null
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  dropdownRef
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose(); 
  };

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
      <Link 
        to="/vendor-dashboard/settings"
        onClick={onClose}
        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4F46E51A] flex items-center justify-center">
          <Settings className="w-5 h-5 text-[#4338CA]" strokeWidth={2} />
        </div>
        <span className="text-base font-medium text-gray-900">Settings</span>
      </Link>


      {/* Logout */}
      <button
        onClick={handleLogout}
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

export default ProfileDropdown;