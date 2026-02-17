import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface PrivacyPolicyFormProps {
    onCancel: () => void;
    onSave: () => void;
    initialData?: any;
}

const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({ onCancel, onSave, initialData }) => {
    // Placeholder state for the form
    const [formData, setFormData] = useState({
        numberOfContent: initialData?.title || '',
        headline1: '',
        bodyText1: '',
        subHeading: '',
        bodyText2: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">Privacy Policy</h2>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="space-y-6">
                    {/* Search Field */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <div className="md:col-span-1">
                            <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                Search Field
                            </label>
                            <div className="bg-blue-50 px-4 py-2.5 rounded-lg text-sm text-gray-700 font-medium">
                                Privacy Policy
                            </div>
                        </div> */}

                        <div className="md:col-span-3 space-y-6">
                            {/* Number of content */}
                            <div>
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Number of content
                                </label>
                                <input
                                    type="text"
                                    name="numberOfContent"
                                    value={formData.numberOfContent}
                                    onChange={handleInputChange}
                                    placeholder="Types of information we collect online"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                            </div>

                            {/* Headline 1 */}
                            <div>
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Headline 1
                                </label>
                                <input
                                    type="text"
                                    name="headline1"
                                    value={formData.headline1}
                                    onChange={handleInputChange}
                                    placeholder="Types of information we collect online"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                            </div>

                            {/* Body Text 1 */}
                            <div>
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Body Text
                                </label>
                                <textarea
                                    name="bodyText1"
                                    value={formData.bodyText1}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="The types of Personal Data that we may collect while you use the Updevision Site are described in this section and include both information that you provide to us and information that we collect automatically when you use the *** Site."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 resize-none leading-relaxed"
                                />
                            </div>

                            {/* Sub-Heading */}
                            <div>
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Sub-Heading
                                </label>
                                <input
                                    type="text"
                                    name="subHeading"
                                    value={formData.subHeading}
                                    onChange={handleInputChange}
                                    placeholder="Types of information we collect online"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                                />
                            </div>

                            {/* Body Text 2 */}
                            <div>
                                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                    Body Text
                                </label>
                                <textarea
                                    name="bodyText2"
                                    value={formData.bodyText2}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 resize-none leading-relaxed"
                                />
                            </div>

                            {/* Add Button */}
                            <div>
                                <button className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors">
                                    Add <Plus size={16} className="ml-1" />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={onSave}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={onCancel}
                                    className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors bg-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyForm;
