import React from 'react';
import { Pencil } from 'lucide-react';

interface PrivacyPolicyListProps {
    onEdit: (item: any) => void;
}

const PrivacyPolicyList: React.FC<PrivacyPolicyListProps> = ({ onEdit }) => {
    const contentItems = [
        { id: 1, title: "Types of information we collect online" },
        { id: 2, title: "Information that may be collected automatically" },
        { id: 3, title: "How we use your information" },
        { id: 4, title: "Information we share" },
        { id: 5, title: "Your privacy choice" },
        { id: 6, title: "Data security" },
        { id: 7, title: "Third party sites and social media plug-ins" },
        { id: 8, title: "Contact details" },
    ];

    return (
        <div className="w-full">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">Privacy Policy</h2>

            <div className="space-y-6">
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 
                    <div className="md:col-span-1">
                        <label className="block text-[14px] font-medium text-gray-900 mb-2">
                            Search Field
                        </label>
                        <div className="bg-blue-50 px-4 py-2.5 rounded-lg text-sm text-gray-700 font-medium inline-block w-full">
                            Privacy Policy
                        </div>
                    </div> */}

                    {/* Content List */}
                    <div className="md:col-span-3">
                        <label className="block text-[14px] font-medium text-gray-900 mb-2">
                            Number of content
                        </label>
                        <div className="space-y-3">
                            {contentItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <span className="text-sm text-gray-700">{item.title}</span>
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default PrivacyPolicyList;
