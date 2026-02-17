import { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyByIdQuery, useUpdatePrivacyPolicyMutation } from '@/redux/features/admin/settings/privacyPolicyApi';
import { Loader2, Plus, Save, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SubContent {
    id?: number;
    title: string;
    content: string;
}

interface PrivacyPolicyData {
    id?: number;
    title: string;
    content: string;
    sub_contents: SubContent[];
}

interface PrivacyPolicyFormProps {
    onCancel: () => void;
    onSave: () => void;
    policyId?: number | null;
}

const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({ onCancel, onSave, policyId }) => {
    console.log(policyId)
    const [formData, setFormData] = useState<PrivacyPolicyData>({
        title: '',
        content: '',
        sub_contents: []
    });

    // API Hooks
    const { data: existingPolicy, isLoading: isFetching } = useGetPrivacyPolicyByIdQuery(policyId, {
        skip: !policyId
    });

    const [createPrivacyPolicy, { isLoading: isCreating }] = useCreatePrivacyPolicyMutation();
    const [updatePrivacyPolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

    // Initialize form data when existing policy is loaded
    useEffect(() => {
        if (existingPolicy) {
            setFormData({
                id: existingPolicy.id,
                title: existingPolicy.title,
                content: existingPolicy.content,
                sub_contents: existingPolicy.sub_contents || []
            });
        }
    }, [existingPolicy]);
    console.log(formData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubContentChange = (index: number, field: keyof SubContent, value: string) => {
        const newSubContents = [...formData.sub_contents];
        newSubContents[index] = {
            ...newSubContents[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            sub_contents: newSubContents
        }));
    };

    const addSubContent = () => {
        setFormData(prev => ({
            ...prev,
            sub_contents: [...prev.sub_contents, { title: '', content: '' }]
        }));
    };

    const removeSubContent = (index: number) => {
        const newSubContents = [...formData.sub_contents];
        newSubContents.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            sub_contents: newSubContents
        }));
    };

    const handleSubmit = async () => {
        try {
            if (policyId) {
                await updatePrivacyPolicy({ id: policyId, data: formData }).unwrap();
            } else {
                await createPrivacyPolicy(formData).unwrap();
            }
            onSave();
        } catch (error) {
            console.error("Failed to save privacy policy", error);
        }
    };

    const isLoading = isFetching || isCreating || isUpdating;

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">
                {policyId ? 'Edit Privacy Policy Section' : 'Add Privacy Policy Section'}
            </h2>

            <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">

                {/* Main Title */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Types of information we collect online"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                    />
                </div>

                {/* Main Content */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                        Content
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Main content of this section..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 resize-none leading-relaxed"
                    />
                </div>

                {/* Sub-contents */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-[14px] font-medium text-gray-900">
                            Sub-Sections
                        </label>
                        <button
                            onClick={addSubContent}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md text-sm font-medium transition-colors"
                        >
                            <Plus size={14} className="mr-1" /> Add Sub-Section
                        </button>
                    </div>

                    {formData.sub_contents.map((sub, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                            <button
                                onClick={() => removeSubContent(index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={16} />
                            </button>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Sub-Section Title</label>
                                    <input
                                        type="text"
                                        value={sub.title}
                                        onChange={(e) => handleSubContentChange(index, 'title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Sub-Section Content</label>
                                    <textarea
                                        value={sub.content}
                                        onChange={(e) => handleSubContentChange(index, 'content', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {formData.sub_contents.length === 0 && (
                        <p className="text-sm text-gray-400 italic">No sub-sections added.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save size={16} className="mr-2" /> Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors bg-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyForm;
