import { X, Calendar, Clock, Building, User } from 'lucide-react';

interface ScheduleData {
  property_name: string;
  viewing_date: string;
  viewing_time: string;
  broker: string;
}

interface ScheduleViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleData?: ScheduleData;
  isLoading: boolean;
  isError: boolean;
}

const ScheduleViewModal = ({ 
  isOpen, 
  onClose, 
  scheduleData,
  isLoading,
  isError 
}: ScheduleViewModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Viewing Schedule
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Error Loading Schedule
              </h3>
              <p className="text-gray-600">
                Unable to load schedule details. Please try again.
              </p>
            </div>
          ) : scheduleData ? (
            <div className="space-y-6">
              {/* Property Info */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Property</h3>
                    <p className="text-gray-700 mt-1">{scheduleData.property_name}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Date</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatDate(scheduleData.viewing_date)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Time</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatTime(scheduleData.viewing_time)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Broker</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {scheduleData.broker}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Schedule Data
              </h3>
              <p className="text-gray-600">
                No schedule information available for this lead.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ScheduleViewModal;