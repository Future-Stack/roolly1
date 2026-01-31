/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, Menu, Search, MessageSquare, ClipboardCheck, Shield, ChevronRight, CircleDot } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from '../../../assets/logo.png'
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import AdminProfileDropdown from "@/components/AdminDashboard/AdminLayout/AdminProfileDropdown";

// Notification Types
interface Notification {
  id: number;
  content: string;
  type: string;
  is_read: boolean;
  timestamp: string;
}

interface FormattedNotification {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
  isUnread: boolean;
  originalData: Notification;
}

interface NotificationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  unread_count: number;
  results: Notification[];
}

interface NotificationDropdownProps {
  isOpen: boolean;
  notifications: FormattedNotification[];
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onMarkAsRead: (id: number) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  notifications,
  dropdownRef,
  onMarkAsRead,
  onMarkAllAsRead,
  isLoading,
  error,
  onRetry,
}) => {
  if (!isOpen) return null;

  const handleNotificationClick = async (notificationId: number) => {
    await onMarkAsRead(notificationId);
  };

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
        {notifications.some(n => n.isUnread) && (
          <button 
            onClick={onMarkAllAsRead}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Mark all As read
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-gray-500">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500 mb-3">{error}</p>
            <button
              onClick={onRetry}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500">No notifications yet</p>
            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-x-2">
                <div className="flex-shrink-0 mt-1">
                  <CircleDot
                    className={`w-4 h-4 ${notification.isUnread ? "text-[#4188E0]" : "text-transparent"}`}
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
          ))
        )}
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

// Main BrokerNav Component
const BrokerNav: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [, setNotifications] = useState<Notification[]>([]);
  const [formattedNotifications, setFormattedNotifications] = useState<FormattedNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useAppSelector(useCurrentToken);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 1) {
        return "Just now";
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else if (diffInDays === 1) {
        return "Yesterday";
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    } catch {
      return "Recently";
    }
  };

  // Convert to formatted notifications
  const convertToFormattedNotifications = (notifs: Notification[]): FormattedNotification[] => {
    return notifs.map(notification => {
      let icon = "message";
      let badge = ""; // Initialize badge with empty string
      
      switch (notification.type) {
        case "new_lead":
          icon = "clipboard";
          badge = "New";
          break;
        case "lead_assigned":
          icon = "clipboard";
          badge = "Assigned";
          break;
        case "message":
          icon = "message";
          badge = "Message";
          break;
        case "appointment":
          icon = "clipboard";
          badge = "Appointment";
          break;
        case "task":
          icon = "clipboard";
          badge = "Task";
          break;
        case "reminder":
          icon = "clipboard";
          badge = "Reminder";
          break;
        case "security_alert":
          icon = "shield";
          badge = "Alert";
          break;
        case "system":
          icon = "shield";
          badge = "System";
          break;
        default:
          icon = "message";
          badge = "";
      }

      return {
        id: notification.id,
        icon,
        title: notification.content,
        subtitle: formatTimestamp(notification.timestamp),
        badge,
        isUnread: !notification.is_read,
        originalData: notification,
      };
    });
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!token) {
        setError("Please login to view notifications");
        setIsLoading(false);
        return;
      }

      console.log("Fetching notifications with token:", token.substring(0, 20) + "...");

      const response = await axios.get(
        "https://broker360re.com/api/notifications/list/",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          timeout: 10000
        }
      );
      
      console.log("API Response:", response.data);
      
      // Check if response is valid
      if (response.data && typeof response.data === 'object') {
        const data = response.data;
        
        // Check for PRO FEATURE ONLY response
        const responseData = response.data as any;
        const isProFeatureOnly = 
          responseData === 'PRO FEATURE ONLY' || 
          (typeof responseData === 'string' && responseData.includes('PRO FEATURE')) ||
          (data && typeof data === 'object' && 'detail' in data && data.detail === 'PRO FEATURE ONLY');
        
        if (isProFeatureOnly) {
          throw new Error("API is not available in demo mode");
        }
        
        // Cast to NotificationsResponse
        const notificationData = data as NotificationsResponse;
        
        // Check if results is an array
        if (notificationData.results && Array.isArray(notificationData.results)) {
          setNotifications(notificationData.results);
          setFormattedNotifications(convertToFormattedNotifications(notificationData.results));
          setUnreadCount(notificationData.unread_count || 0);
        } else {
          throw new Error("Invalid response format: results is not an array");
        }
      } else {
        throw new Error("Invalid response format");
      }
      
    } catch (err: any) {
      console.error("Error fetching notifications:", err);
      
      // Check for specific error types
      if (err.response) {
        // Server responded with error
        console.error("Response error:", err.response.status, err.response.data);
        
        if (err.response.status === 401) {
          setError("Session expired. Please login again.");
        } else if (err.response.status === 403) {
          setError("You don't have permission to view notifications");
        } else if (err.response.status === 404) {
          setError("Notifications endpoint not found");
        } else if (err.response.data === 'PRO FEATURE ONLY') {
          setError("Notifications feature requires premium subscription");
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        // No response received
        console.error("No response received:", err.request);
        setError("Network error. Please check your internet connection.");
      } else if (err.message && err.message.includes("demo mode")) {
        setError("Notifications feature is in demo mode");
      } else {
        setError("Failed to load notifications. Please try again.");
      }
      
      // Clear any existing data
      setNotifications([]);
      setFormattedNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark single notification as read
  const markAsRead = async (notificationId: number) => {
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Marking notification as read:", notificationId);

      await axios.patch(
        `https://broker360re.com/api/notifications/read/${notificationId}/`,
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );
      
      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
      
      setFormattedNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, isUnread: false, badge: "" }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      
    } catch (err: any) {
      console.error("Error marking notification as read:", err);
      
      // Even if API fails, update UI for better UX
      setFormattedNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, isUnread: false, badge: "" }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Show error but continue
      if (err.response?.data === 'PRO FEATURE ONLY') {
        console.log("Read operation requires premium subscription");
      }
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Marking all notifications as read");

      await axios.patch(
        "https://broker360re.com/api/notifications/read-all/",
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );
      
      // Update local state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, is_read: true }))
      );
      
      setFormattedNotifications(prev =>
        prev.map(notif => ({ ...notif, isUnread: false, badge: "" }))
      );
      
      setUnreadCount(0);
      
      console.log("All notifications marked as read successfully");
      
    } catch (err: any) {
      console.error("Error marking all notifications as read:", err);
      
      // Even if API fails, update UI for better UX
      setFormattedNotifications(prev =>
        prev.map(notif => ({ ...notif, isUnread: false, badge: "" }))
      );
      setUnreadCount(0);
      
      // Show error but continue
      if (err.response?.data === 'PRO FEATURE ONLY') {
        console.log("Read-all operation requires premium subscription");
      }
    }
  };

  // Click outside handler
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

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isNotificationDropdownOpen && token) {
      fetchNotifications();
    }
  }, [isNotificationDropdownOpen, token]);

  // Initial fetch for badge count
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        if (!token) return;
        
        console.log("Fetching initial notification count");
        
        const response = await axios.get<NotificationsResponse>(
          "https://broker360re.com/api/notifications/list/",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            timeout: 5000
          }
        );
        
        if (response.data && typeof response.data === 'object') {
          setUnreadCount(response.data.unread_count || 0);
          console.log("Initial unread count:", response.data.unread_count);
        }
      } catch (err: any) {
        console.error("Error fetching initial notification count:", err);
        setUnreadCount(0);
      }
    };
    
    if (token) {
      fetchInitialCount();
      
      // Refresh every 5 minutes
      const interval = setInterval(fetchInitialCount, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

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
          <div className="relative" ref={notificationDropdownRef}>
            <button
              onClick={() => {
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
                setIsProfileDropdownOpen(false);
                if (!isNotificationDropdownOpen && token) {
                  fetchNotifications();
                }
              }}
              className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="text-gray-700" size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotificationDropdownOpen}
              notifications={formattedNotifications}
              onClose={() => setIsNotificationDropdownOpen(false)}
              dropdownRef={notificationDropdownRef}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              isLoading={isLoading}
              error={error}
              onRetry={fetchNotifications}
            />
          </div>

          {/* Profile */}
          <div className="relative" ref={profileDropdownRef}>
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

            <AdminProfileDropdown
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