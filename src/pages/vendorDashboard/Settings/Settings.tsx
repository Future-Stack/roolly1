/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import SecuritySettings from '@/components/vendorDashboard/Settings/SecuritySettings';
import NotificationSettings from '@/components/vendorDashboard/Settings/NotificationSettings';
import { useGetVendorProfileQuery } from '@/redux/features/vendor/getVendorProfileApi';
import { useUpdateVendorProfileMutation } from '@/redux/features/vendor/updateVendorProfileApi';
import { toast } from 'react-toastify';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'general'>('profile');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const { data: profileData, isLoading, isError } = useGetVendorProfileQuery(undefined);
    const [updateVendorProfile, { isLoading: isUpdating }] = useUpdateVendorProfileMutation();


    // State for editable form fields
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: ''
    });

    // Update form data when profileData is loaded
    React.useEffect(() => {
        if (profileData) {
            setFormData({
                full_name: profileData.full_name || '',
                email: profileData.email || '',
                phone_number: profileData.phone_number || ''
            });
            if (profileData.image) {
                setProfileImage(profileData.image);
            }
        }
    }, [profileData]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setSelectedImageFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async () => {
        try {
            // Create FormData object
            const formDataToSend = new FormData();

            // Add form fields to FormData
            formDataToSend.append('full_name', formData.full_name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone_number', formData.phone_number);

            // Add image file if selected
            if (selectedImageFile) {
                formDataToSend.append('image', selectedImageFile);
            }


            await updateVendorProfile(formDataToSend).unwrap();

            setSelectedImageFile(null);

            toast.success('Profile updated successfully!');

        } catch (error: any) {
            console.error('Error updating profile:', error);
            // Show error message
            alert(error?.data?.message || 'Failed to update profile. Please try again.');
        }
    };

    const handleCancel = () => {
        if (profileData) {
            setFormData({
                full_name: profileData.full_name || '',
                email: profileData.email || '',
                phone_number: profileData.phone_number || ''
            });
            setProfileImage(profileData.image || null);
            setSelectedImageFile(null);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading profile...</div>
            </div>
        );
    }

    // Show error state
    if (isError) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-red-500">Failed to load profile. Please try again.</div>
            </div>
        );
    }

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
                    <div className="border border-gray-200 p-5 rounded-2xl bg-white">
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
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <Image className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        )}
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
                            <label htmlFor="profile-upload" className="cursor-pointer">
                                <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-[15px] font-medium transition-colors">
                                    {profileImage ? 'Change Profile Picture' : 'Upload Profile'}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Profile Information Section */}
                    <div className="pb-6 mt-6">
                        <div className='border border-gray-200 p-5 rounded-2xl bg-white'>
                            <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
                                Profile Information
                            </h2>

                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label className="block text-[14px] font-medium text-gray-900 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="w-full h-[48px] px-4 text-[15px] text-gray-900 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='mt-6'>
                        <button
                            onClick={handleCancel}
                            disabled={isUpdating}
                            className="border border-gray-200 text-black px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors ml-5 me-5 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveProfile}
                            disabled={isUpdating}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}

            {/* Security Settings Content */}
            {activeTab === 'security' && (
                <div>
                    <SecuritySettings role="vendor" />
                </div>
            )}

            {/* General Settings Content */}
            {activeTab === 'general' && (
                <div>
                    <NotificationSettings />
                </div>
            )}
        </div>
    );
};

export default Settings;