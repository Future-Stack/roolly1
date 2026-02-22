import { X, MessageSquare, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetLeadCommentQuery, useUpdateLeadCommentMutation } from '@/redux/features/broker/leads/leadCommentApi';
import { toast } from 'react-toastify';

interface AddCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: number | null;
    leadName: string;
}

const AddCommentModal = ({
    isOpen,
    onClose,
    leadId,
    leadName
}: AddCommentModalProps) => {
    const { data, isLoading: isFetching, refetch } = useGetLeadCommentQuery(leadId || 0, {
        skip: !isOpen || !leadId
    });
    console.log("data", data);
    const [updateComment, { isLoading: isUpdating }] = useUpdateLeadCommentMutation();
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (data) {
            setCommentText(data.comment || '');
        }
    }, [data]);

    useEffect(() => {
        if (isOpen) {
            setCommentText(''); // Clear initially
            refetch();
        }
    }, [isOpen, refetch]);

    if (!isOpen) return null;

    const handleSave = async () => {
        if (!leadId) return;

        try {
            await updateComment({ id: leadId, comment: commentText }).unwrap();
            toast.success('Comment saved successfully');
            onClose();
        } catch (error: any) {
            console.error('Failed to save comment:', error);
            toast.error(error?.data?.message || 'Failed to save comment');
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
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Lead Comment
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
                <div className="p-6 space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Lead Name</p>
                        <p className="text-base font-semibold text-gray-900">{leadName}</p>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                            Comment
                        </label>
                        {isFetching ? (
                            <div className="flex items-center justify-center h-[120px] bg-gray-50 rounded-lg border border-gray-200">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            </div>
                        ) : (
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add any additional notes here..."
                                className="w-full min-h-[120px] p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                            />
                        )}
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
                            type="button"
                            onClick={handleSave}
                            disabled={isUpdating || isFetching}
                            className="flex-1 h-[44px] bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : (
                                'Save Comment'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCommentModal;
