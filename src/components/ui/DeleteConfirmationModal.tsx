import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    isLoading?: boolean;
}

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Delete Confirmation',
    message = 'Are you sure you want to delete this? This action cannot be undone.',
    isLoading = false
}: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {/* Icon & Title */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="text-red-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
