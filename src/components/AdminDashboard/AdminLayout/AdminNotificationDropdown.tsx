/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   MessageSquare, ClipboardCheck, Shield, ChevronRight, CircleDot
} from "lucide-react";

const AdminNotificationDropdown = ({
  isOpen,
  notifications,
  dropdownRef
}: any) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-[390px] bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Notifications
        </h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all As read
        </button>
      </div>

      {/* Items */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification: any) => (
          <button
            key={notification.id}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-x-2">

              <div className="flex-shrink-0 mt-1">
                <CircleDot
                  className={`w-4 h-4 rounded-full ${notification.isUnread ? "bg-[#4188E0]" : "bg-transparent"}`}
                />
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                {notification.icon === "message" && (
                  <MessageSquare className="w-6 h-6 text-blue-600" strokeWidth={2} />
                )}
                {notification.icon === "clipboard" && (
                  <ClipboardCheck className="w-6 h-6 text-emerald-600" strokeWidth={2} />
                )}
                {notification.icon === "shield" && (
                  <Shield className="w-6 h-6 text-orange-600" strokeWidth={2} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.title}
                </p>
                {notification.badge && (
                  <span className="text-md font-medium text-emerald-600">
                    ● <span className="text-[#3B82F6]">{notification.badge}</span>
                  </span>
                )}
              </div>
              {notification.subtitle && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {notification.subtitle}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <button className="w-full text-center text-md font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
          View all Notification
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminNotificationDropdown;
