import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import SecuritySettings from '@/components/vendorDashboard/Settings/SecuritySettings';
import { useGetBrokerProfileQuery } from '@/redux/features/broker/settings/getBrokerProfileApi';
import { useUpdateBrokerProfileMutation } from '@/redux/features/broker/settings/updateBrokerProfileApi';
import { toast } from 'react-toastify';
import BrokerNotificationSettings from '@/components/brokerDashboard/BrokerNotificationSettings/BrokerNotificationSettings';

interface ProfileData {
  image: string | null;
  full_name: string;
  email: string;
  phone_number: string;
  is_deactivated: boolean;
  id?: string;
}

const BrokerSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'general'>('profile');
    const [profileData, setProfileData] = useState<ProfileData>({
        image: null,
        full_name: '',
        email: '',
        phone_number: '',
        is_deactivated: false
    });
    
    const { data: profile, isLoading, isError, refetch } = useGetBrokerProfileQuery(undefined);
    const [updateBrokerProfile, { isLoading: isUpdating }] = useUpdateBrokerProfileMutation();
    

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        if (profile) {
            console.log('Profile Data:', profile);
            setProfileData(profile);
            setFormData({
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone_number: profile.phone_number || '',
            });
            setImagePreview(profile.image);
            setIsFormDirty(false);
        }
    }, [profile]);

    useEffect(() => {
        const hasChanges = 
            formData.full_name !== profileData.full_name ||
            formData.email !== profileData.email ||
            formData.phone_number !== profileData.phone_number ||
            selectedImageFile !== null;
        
        setIsFormDirty(hasChanges);
    }, [formData, profileData, selectedImageFile]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (jpg, png, jpeg)');
                return;
            }
            
            setSelectedImageFile(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
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
            const formDataToSend = new FormData();
            
            // Add form fields
            if (formData.full_name !== profileData.full_name) {
                formDataToSend.append('full_name', formData.full_name);
            }
            if (formData.email !== profileData.email) {
                formDataToSend.append('email', formData.email);
            }
            if (formData.phone_number !== profileData.phone_number) {
                formDataToSend.append('phone_number', formData.phone_number);
            }
            

            if (selectedImageFile) {
                formDataToSend.append('image', selectedImageFile);
            }
            
           
            if (formDataToSend.entries().next().done) {
                alert('No changes to save');
                return;
            }
            
            const result = await updateBrokerProfile(formDataToSend ).unwrap();
            
            console.log('Profile updated successfully:', result);
            
            setSelectedImageFile(null);
            refetch();
            toast.success('Profile updated successfully!');
            
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const handleCancel = () => {
        // Reset form to original profile data
        setFormData({
            full_name: profileData.full_name || '',
            email: profileData.email || '',
            phone_number: profileData.phone_number || '',
        });
        setImagePreview(profileData.image);
        setSelectedImageFile(null);
        setIsFormDirty(false);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full min-h-screen mb-5">
                <div className="pb-6">
                    <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                        Settings
                    </h1>
                    <p className="text-[15px] text-gray-600 font-normal">
                        Manage your vendor profile and preferences
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="h-48 bg-gray-100 rounded mb-6"></div>
                        <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-100 rounded"></div>
                            <div className="h-12 bg-gray-100 rounded"></div>
                            <div className="h-12 bg-gray-100 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="w-full min-h-screen mb-5">
                <div className="pb-6">
                    <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
                        Settings
                    </h1>
                    <p className="text-[15px] text-gray-600 font-normal">
                        Manage your vendor profile and preferences
                    </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Profile</h3>
                    <p className="text-red-600 mb-4">Unable to load profile data. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        Retry
                    </button>
                </div>
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
                    <div className=" border border-gray-200 p-5 rounded-2xl bg-white">
                        <h2 className="text-[17px] font-semibold text-gray-900 mb-6">
                            Profile Picture
                        </h2>

                        <div className="flex flex-col items-center">
                            {/* Upload Area */}
                            <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center mb-6">
                                <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center">
                                    {imagePreview ? (
                                        <>
                                            <div className="mb-4">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Profile Preview" 
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                                />
                                            </div>
                                            <p className="text-[15px] text-gray-900 font-semibold mb-4">
                                                Click to change profile image
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-[15px] text-gray-900 font-semibold mb-4">
                                                Upload Profile image or logo
                                            </p>
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <Image className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                                            </div>
                                        </>
                                    )}
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

                            {/* Upload Button - Only show if image is selected */}
                            {selectedImageFile && (
                                <button 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-[15px] font-medium transition-colors mb-4"
                                    onClick={handleSaveProfile}
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Uploading...' : 'Upload New Profile Picture'}
                                </button>
                            )}
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
                    <div className='flex justify-end mt-6'>
                        <button 
                            className="border border-gray-200 text-black px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors mr-3 hover:bg-gray-200"
                            onClick={handleCancel}
                            disabled={!isFormDirty || isUpdating}
                        >
                            Cancel
                        </button>
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSaveProfile}
                            disabled={!isFormDirty || isUpdating}
                        >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}

            {/* Security Settings Content */}
            {activeTab === 'security' && (
                <div>
                    <SecuritySettings />
                </div>
            )}

            {/* General Settings Content */}
            {activeTab === 'general' && (
                <div>
                    <BrokerNotificationSettings />
                </div>
            )}
        </div>
    );
};

export default BrokerSettings;