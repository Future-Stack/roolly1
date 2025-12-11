import {
  BarChart3,
  Building2,
  LayoutGrid,
  MessageSquare,
  Settings,
  // Users,
  X
} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from "react-router-dom";

interface VendorSidebarProps {
  onClose?: () => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/vendor-dashboard/overview', badge: null },
    // { icon: Users, label: 'Leads', path: '/vendor-dashboard/leads', badge: 2 },
    { icon: Building2, label: 'Properties', path: '/vendor-dashboard/properties', badge: null },
    { icon: MessageSquare, label: 'Messages', path: '/vendor-dashboard/messages', badge: 2 },
    { icon: BarChart3, label: 'Reports & Analysis', path: '/vendor-dashboard/reports', badge: null },
    { icon: Settings, label: 'Settings', path: '/vendor-dashboard/settings', badge: null },
  ];

  return (
    <div className="w-[300px] min-h-screen relative px-4 py-5 sm:mt-0 md:mt-4 sm:rounded-l-none md:rounded-2xl bg-white">

      {/* Close Button (mobile only) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <X size={20} className="text-gray-700" />
        </button>
      )}

      {/* User Profile */}
      <div className="flex items-center gap-3 px-4 py-4 border border-[#F1F5F9] rounded-sm">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[#0F172A]">Mark wins</span>
          <span className="text-lg text-[#A9ACAF] mt-0.5">vendor@vendor.com</span>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="py-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={index}
              className={`
                w-full flex items-center justify-between px-4 py-3 transition relative
                ${isActive
                  ? "bg-blue-600 text-white rounded-lg"
                  : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-white" : "text-gray-600"}
                />

                <span className="text-[15px] font-medium">
                  {item.label}
                </span>
              </div>

              {item.badge && (
                <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-[11px] font-semibold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default VendorSidebar;
