import { Bell, Menu, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import logo from '../../../assets/logo.png'
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

const BrokerNav: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, icon: "message", title: "New Message Arrived from broker", subtitle: "", badge: "New", isUnread: true },
    { id: 2, icon: "clipboard", title: "Listing is Complete", subtitle: "Appointment Confirmed", badge: "", isUnread: true },
    { id: 3, icon: "shield", title: "Security Alert", subtitle: "Appointment Confirmed", badge: "", isUnread: true },
    { id: 4, icon: "clipboard", title: "Listing is Complete", subtitle: "Appointment Confirmed", badge: "", isUnread: true }
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">

        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick} 
            className="lg:hidden block p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          {/* Logo - Hidden on mobile, visible from sm upwards */}
          <div className="hidden sm:block">
            <img src={logo} alt="logo" className="w-28 md:w-36" />
          </div>
        </div>

        {/* Search Bar - Center aligned on larger screens */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Type to search"
              className="w-full h-[44px] pl-12 pr-4 text-[15px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
                setIsProfileDropdownOpen(false);
              }}
              className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="text-gray-700" size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <NotificationDropdown
              isOpen={isNotificationDropdownOpen}
              notifications={notifications}
              onClose={() => setIsNotificationDropdownOpen(false)}
              dropdownRef={notificationDropdownRef}
            />
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
                setIsNotificationDropdownOpen(false);
              }}
              aria-label="Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
                alt="Profile"
              />
            </button>

            <ProfileDropdown
              isOpen={isProfileDropdownOpen}
              onClose={() => setIsProfileDropdownOpen(false)}
              dropdownRef={profileDropdownRef}
            />
          </div>
        </div>

      </div>

      {/* Mobile Search Bar - Only visible on mobile below sm breakpoint */}
      <div className="sm:hidden px-4 pb-3 pt-1">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Type to search"
            className="w-full h-[44px] pl-12 pr-4 text-[15px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
};

export default BrokerNav;