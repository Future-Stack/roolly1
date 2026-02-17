import { useGetPrivacyPolicyQuery } from '@/redux/features/admin/settings/privacyPolicyApi';
import { Pencil, Plus, Loader2, AlertCircle } from 'lucide-react';
import React from 'react';

interface PrivacyPolicyListProps {
    onEdit: (item: any) => void;
    onAddNew: () => void;
}

const PrivacyPolicyList: React.FC<PrivacyPolicyListProps> = ({ onEdit, onAddNew }) => {
    const { data: policies, isLoading, error } = useGetPrivacyPolicyQuery({});

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-red-500">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p>Failed to load privacy policies.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-gray-900">Privacy Policy</h2>
                <button
                    onClick={onAddNew}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Add New
                </button>
            </div>

            <div className="space-y-6">
                <div className="md:col-span-3">
                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                        Privacy Policy Sections
                    </label>
                    <div className="space-y-3">
                        {policies?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                            >
                                <span className="text-sm text-gray-700 font-medium">{item.title}</span>
                                <button
                                    onClick={() => onEdit(item)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        ))}
                        {policies?.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No privacy policy sections found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyList;
