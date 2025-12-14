import React, { useState } from 'react';
import { X, Calendar, Clock, Send } from 'lucide-react';

interface ScheduleViewingModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    leadName:string;
    propertyName:string;
}

const ScheduleViewModal: React.FC<ScheduleViewingModalProps> = ({
    isOpen = true,
    onClose
}) => {
    const [viewingDate, setViewingDate] = useState('');
    const [viewingTime, setViewingTime] = useState('');
    const [notes, setNotes] = useState('');

    const handleSchedule = () => {
        console.log('Schedule viewing:', { viewingDate, viewingTime, notes });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-[1000px] w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4 border-gray-200">
                    <div>
                        <h2 className="text-[20px] font-semibold text-gray-900 mb-1">
                            Schedule Property Viewing
                        </h2>
                        <p className="text-base text-gray-600">
                            Set a date and time for the property viewing. A reminder will be sent 1 day before.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
                    </button>
                </div>

                {/* Property Info Box */}
               <div className='p-6'>
                 <div className="border border-blue-200 rounded-lg  mb-6 bg-[#B6D1F3] p-4">
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">Property:</span>
                            <span className="text-[13px] text-gray-900">PR001: Central Manchester Office Suite</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">Requester:</span>
                            <span className="text-[13px] text-gray-900">Rachel Green</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">Contact:</span>
                            <span className="text-[13px] text-gray-900">+44 7700 900654</span>
                        </div>
                    </div>
                </div>
               </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            {/* Viewing Date */}
                            <div className="mb-5">
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Viewing Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="dd/mm/yy"
                                        value={viewingDate}
                                        onChange={(e) => setViewingDate(e.target.value)}
                                        className="w-full h-[44px] px-4 pr-11 text-[14px] text-gray-900 placeholder-gray-400 bg-[#F3F3F5] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Viewing Time */}
                            <div className="mb-5">
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Viewing Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="--:--:--"
                                        value={viewingTime}
                                        onChange={(e) => setViewingTime(e.target.value)}
                                        className="w-full h-[44px] px-4 pr-11 text-[14px] text-gray-900 placeholder-gray-400 bg-[#F3F3F5]  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-5">
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    placeholder="Add any special instructions or notes..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 bg-[#F3F3F5] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* SMS Reminder Notice */}
                            <div className="bg-yellow-50 border border-[#FFD6A7] rounded-lg p-3.5">
                                <div className="flex gap-2.5">
                                    <p className="text-base text-[#7E2A0C] font-medium leading-relaxed">
                                        📱 An SMS reminder will be automatically sent to Lisa Anderson one day before the viewing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Preview */}
                        <div className="flex items-center justify-center">
                            <div className="border-2 border-dashed border-[#92BAED] rounded-lg p-8 w-full h-[400px] flex flex-col items-center justify-center">
                                <Send className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1.5} />
                                <p className="text-[14px] text-gray-500 text-center">
                                    Select a date and time to preview the<br />SMS reminder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4  border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSchedule}
                        className="px-5 py-3 text-base font-medium text-white bg-gray-400 rounded-md flex items-center gap-2 cursor-not-allowed"
                        disabled
                    >
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        Schedule Viewing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleViewModal;