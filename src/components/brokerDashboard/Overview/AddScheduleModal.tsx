import { X, Calendar, Clock, FileText } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useCreateViewingScheduleMutation } from '@/redux/features/broker/schedule/createViewingScheduleApi';
import { toast } from 'react-toastify';

interface AddScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: number | null;
    leadName: string;
}

interface ScheduleFormData {
    viewing_date: string;
    viewing_time: string;
    notes: string;
}

const AddScheduleModal = ({
    isOpen,
    onClose,
    leadId,
    leadName
}: AddScheduleModalProps) => {
    const [createViewingSchedule, { isLoading }] = useCreateViewingScheduleMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ScheduleFormData>({
        defaultValues: {
            viewing_date: new Date().toISOString().split('T')[0],
            viewing_time: '12:00',
            notes: ''
        }
    });
    console.log("leadId", leadId);

    if (!isOpen) return null;

    const onSubmit: SubmitHandler<ScheduleFormData> = async (data) => {
        if (leadId === null) {
            toast.error("Lead ID is missing");
            return;
        }

        try {
            const payload = {
                lead_id: leadId,
                viewing_date: data.viewing_date,
                viewing_time: `${data.viewing_time}:00`,
                notes: data.notes
            };

            await createViewingSchedule(payload).unwrap();
            toast.success('Viewing schedule created successfully');
            reset();
            onClose();
        } catch (error: any) {
            console.error('Failed to create schedule:', error);
            toast.error(error?.data?.message || 'Failed to create viewing schedule');
        }
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
                            Add Viewing Schedule
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Lead Name</p>
                        <p className="text-base font-semibold text-gray-900">{leadName}</p>
                    </div>

                    {/* Viewing Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            Viewing Date
                        </label>
                        <input
                            type="date"
                            {...register('viewing_date', { required: 'Date is required' })}
                            className={`w-full h-[44px] px-4 rounded-lg border ${errors.viewing_date ? 'border-red-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                        />
                        {errors.viewing_date && (
                            <p className="mt-1 text-xs text-red-500">{errors.viewing_date.message}</p>
                        )}
                    </div>

                    {/* Viewing Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            Viewing Time
                        </label>
                        <input
                            type="time"
                            {...register('viewing_time', { required: 'Time is required' })}
                            className={`w-full h-[44px] px-4 rounded-lg border ${errors.viewing_time ? 'border-red-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                        />
                        {errors.viewing_time && (
                            <p className="mt-1 text-xs text-red-500">{errors.viewing_time.message}</p>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            Notes
                        </label>
                        <textarea
                            {...register('notes')}
                            placeholder="Add any additional notes here..."
                            className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-[44px] border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 h-[44px] bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScheduleModal;
