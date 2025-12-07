import React, { useState } from 'react';
import { Image } from 'lucide-react';
import SecuritySettings from '@/components/vendorDashboard/Settings/SecuritySettings';
import NotificationSettings from '@/components/vendorDashboard/Settings/NotificationSettings';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'general'>('profile');
    const [, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full min-h-screen mb-5">
            {/* Header */}
            <div className="pb-6">
                <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                    Settings
                </h1>
                <p className="text-[15px] text-gray-600 font-normal">
                    Manage your vendor profile and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <div className="inline-flex items-center bg-white rounded-full p-2 border border-[#CBD5E1]">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-2.5 text-[14px] font-medium rounded-full transition-colors ${activeTab === 'profile'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-6 py-2.5 text-[14px] font-medium rounded-full transition-colors ${activeTab === 'security'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        Security Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`px-6 py-2.5 text-[14px] font-medium rounded-full transition-colors ${activeTab === 'general'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        General Settings
                    </button>
                </div>
            </div>

            {/* Profile Settings Content */}
            {activeTab === 'profile' && (
                <div>
                    {/* Profile Picture Section */}
                    <div className=" border border-gray-200 p-5 rounded-2xl bg-white">
                        <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
                            Profile Picture
                        </h2>

                        <div className="flex flex-col items-center">
                            {/* Upload Area */}
                            <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center mb-6">
                                <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center">
                                    <p className="text-[15px] text-gray-900 font-semibold mb-4">
                                        Upload Profile image or logo
                                    </p>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Image className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[13px] text-gray-500 mb-1">
                                        Image format - jpg png jpeg
                                    </p>
                                    <p className="text-[13px] text-gray-500">
                                        Image Size - maximum size 2 MB Image Ratio - 1:1
                                    </p>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Upload Button */}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-[15px] font-medium transition-colors">
                                Upload Profile
                            </button>
                        </div>
                    </div>

                    {/* Profile Information Section */}
                    <div className="pb-6 mt-6">
                        <div className='border border-gray-200 p-5 rounded-2xl bg-white'>
                            <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
                                Profile Information
                            </h2>

                            <div className="space-y-6 ">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="PropLink Vendor"
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="vendor@gmail.com"
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="+44 7700 900000"
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className="border border-gray-200 text-black px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors ml-5 me-5 hover:bg-gray-200">
                            Cancel
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors">
                            Upload Profile
                        </button>
                    </div>
                </div>
            )}

            {/* Security Settings Content */}
            {activeTab === 'security' && (
                    <div>
                      <SecuritySettings/>
                    </div>
            )}

            {/* General Settings Content */}
            {activeTab === 'general' && (
                <div>
                    <NotificationSettings/>
                </div>
            )}
        </div>
    );
};

export default Settings;