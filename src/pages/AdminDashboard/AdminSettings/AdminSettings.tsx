/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Image, Upload, X } from 'lucide-react';
import NotificationsUpdate from '@/components/AdminDashboard/AdminSettings/NotificationsUpdate';
import { useChangePasswordMutation } from '@/redux/features/admin/settings/changePasswordApi';
import { useGetAdminProfileQuery } from '@/redux/features/admin/settings/getAdminProfileApi';
import { useUpdateAdminProfileMutation } from '@/redux/features/admin/settings/updateAdminProfileApi';

type TabType = 'profile' | 'site' | 'vendor';

interface PasswordFormData {
    old_password: string;
    new_password: string;
    confirm_new_password: string;
}

interface BasicInfoFormData {
    full_name: string;
    email: string;
    phone_number: string;
}

const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [activeSection, setActiveSection] = useState<string>('picture');
    
    // Profile image states
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');
    const [imageSuccess, setImageSuccess] = useState<string>('');
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    
    // Password states
    const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    });
    const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordFormData>>({});
    const [passwordSuccess, setPasswordSuccess] = useState<string>('');
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

    // Basic info states
    const [basicInfoForm, setBasicInfoForm] = useState<BasicInfoFormData>({
        full_name: '',
        email: '',
        phone_number: ''
    });
    const [basicInfoErrors, setBasicInfoErrors] = useState<Partial<BasicInfoFormData>>({});
    const [basicInfoSuccess, setBasicInfoSuccess] = useState<string>('');
    const [basicInfoLoading, setBasicInfoLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // API calls
    const [changePassword] = useChangePasswordMutation();
    const [updateAdminProfile] = useUpdateAdminProfileMutation();
    const { data: profile, refetch: refetchProfile } = useGetAdminProfileQuery(undefined);

    // Initialize with profile data
    useEffect(() => {
        if (profile) {
            setSelectedImage(profile.image || null);
            setBasicInfoForm({
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone_number: profile.phone_number || ''
            });
        }
    }, [profile]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset errors
        setImageError('');
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image size should be less than 5MB');
            return;
        }

        // Check file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setImageError('Only JPG, JPEG, PNG images are allowed');
            return;
        }

        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setSelectedImage(profile?.image || null);
        setImageError('');
    };

    const handleImageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setImageSuccess('');
        setImageError('');

        if (!selectedFile) {
            setImageError('Please select an image to upload');
            return;
        }

        setImageLoading(true);

        try {
            // Create FormData
            const formData = new FormData();
            formData.append('image', selectedFile);

            await updateAdminProfile(formData).unwrap();

            setImageSuccess('Profile picture updated successfully!');
            setSelectedFile(null);
            
            // Refetch profile data to get updated image URL
            await refetchProfile();

        } catch (error: any) {
            console.error('Image upload error:', error);

            if (error?.data) {
                const errorData = error.data;
                
                if (errorData.image) {
                    setImageError(errorData.image[0] || 'Failed to upload image');
                } else if (errorData.non_field_errors) {
                    setImageError(errorData.non_field_errors[0]);
                } else {
                    setImageError('Failed to update profile picture. Please try again.');
                }
            } else {
                setImageError('Failed to update profile picture. Please try again.');
            }
        } finally {
            setImageLoading(false);
        }
    };

    const handleImageCancel = () => {
        setSelectedFile(null);
        setSelectedImage(profile?.image || null);
        setImageError('');
        setImageSuccess('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({
            ...prev,
            [name]: value
        }));

        if (passwordErrors[name as keyof PasswordFormData]) {
            setPasswordErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSuccess('');

        setPasswordLoading(true);

        try {
            const response = await changePassword(passwordForm).unwrap();

            setPasswordSuccess('Password updated successfully!');

            setPasswordForm({
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            });

            setPasswordErrors({});

            console.log('Password change response:', response);

        } catch (error: any) {
            console.error('Password change error:', error);

            if (error?.data) {
                const errorData = error.data;

                if (errorData.old_password) {
                    setPasswordErrors(prev => ({
                        ...prev,
                        old_password: errorData.old_password[0] || 'Current password is incorrect'
                    }));
                } else if (errorData.new_password) {
                    setPasswordErrors(prev => ({
                        ...prev,
                        new_password: errorData.new_password[0] || 'Invalid new password'
                    }));
                } else if (errorData.non_field_errors) {
                    setPasswordErrors(prev => ({
                        ...prev,
                        old_password: errorData.non_field_errors[0] || 'Unable to change password'
                    }));
                } else {
                    setPasswordErrors(prev => ({
                        ...prev,
                        old_password: 'Failed to update password. Please try again.'
                    }));
                }
            } else {
                setPasswordErrors(prev => ({
                    ...prev,
                    old_password: 'Failed to update password. Please try again.'
                }));
            }
        } finally {
            setPasswordLoading(false);
        }
    };

    const handlePasswordCancel = () => {
        setPasswordForm({
            old_password: '',
            new_password: '',
            confirm_new_password: ''
        });
        setPasswordErrors({});
        setPasswordSuccess('');
    };

    const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBasicInfoForm(prev => ({
            ...prev,
            [name]: value
        }));

        if (basicInfoErrors[name as keyof BasicInfoFormData]) {
            setBasicInfoErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBasicInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBasicInfoSuccess('');
        setBasicInfoErrors({});

        // Basic validation
        const errors: Partial<BasicInfoFormData> = {};
        if (!basicInfoForm.full_name.trim()) errors.full_name = 'Full name is required';
        if (!basicInfoForm.email.trim()) errors.email = 'Email is required';
        if (!basicInfoForm.phone_number.trim()) errors.phone_number = 'Phone number is required';

        if (Object.keys(errors).length > 0) {
            setBasicInfoErrors(errors);
            return;
        }

        setBasicInfoLoading(true);

        try {
            // Create FormData for basic info update
            const formData = new FormData();
            formData.append('full_name', basicInfoForm.full_name);
            formData.append('email', basicInfoForm.email);
            formData.append('phone_number', basicInfoForm.phone_number);

            await updateAdminProfile(formData).unwrap();

            setBasicInfoSuccess('Profile information updated successfully!');
            setIsEditing(false);
            
            // Refetch profile data
            await refetchProfile();

        } catch (error: any) {
            console.error('Basic info update error:', error);

            if (error?.data) {
                const errorData = error.data;
                
                if (errorData.full_name) {
                    setBasicInfoErrors(prev => ({ ...prev, full_name: errorData.full_name[0] }));
                } else if (errorData.email) {
                    setBasicInfoErrors(prev => ({ ...prev, email: errorData.email[0] }));
                } else if (errorData.phone_number) {
                    setBasicInfoErrors(prev => ({ ...prev, phone_number: errorData.phone_number[0] }));
                } else {
                    setBasicInfoErrors(prev => ({ 
                        ...prev, 
                        full_name: 'Failed to update profile. Please try again.' 
                    }));
                }
            } else {
                setBasicInfoErrors(prev => ({ 
                    ...prev, 
                    full_name: 'Failed to update profile. Please try again.' 
                }));
            }
        } finally {
            setBasicInfoLoading(false);
        }
    };

    const handleBasicInfoCancel = () => {
        if (profile) {
            setBasicInfoForm({
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone_number: profile.phone_number || ''
            });
        }
        setIsEditing(false);
        setBasicInfoErrors({});
        setBasicInfoSuccess('');
    };

    const handleBasicInfoEdit = () => {
        setIsEditing(true);
    };

    const renderProfileContent = () => {
        switch (activeSection) {
            case 'picture':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Picture Update</h2>
                        
                        {/* Success Message */}
                        {imageSuccess && (
                            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-600 text-sm font-medium">{imageSuccess}</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {imageError && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm font-medium">{imageError}</p>
                            </div>
                        )}

                        <form onSubmit={handleImageSubmit}>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center max-w-md">
                                <p className="text-sm font-medium text-gray-900 mb-4">Upload Profile image</p>

                                <div className="relative bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                                    {selectedImage ? (
                                        <>
                                            <img 
                                                src={selectedImage} 
                                                alt="Profile" 
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                            {selectedFile && (
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <Image size={40} className="text-gray-400" />
                                    )}
                                </div>

                                <p className="text-xs text-gray-500 mb-1">Image format - jpg png jpeg</p>
                               
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="file-upload" className="inline-block">
                                        <div className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md cursor-pointer transition-colors flex items-center justify-center gap-2">
                                            <Upload size={16} />
                                            {selectedFile ? 'Change Image' : 'Upload Profile'}
                                        </div>
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={imageLoading}
                                    />
                                    
                                    {selectedFile && (
                                        <div className="text-sm text-gray-600">
                                            <p>Selected: {selectedFile.name}</p>
                                            <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {selectedFile && (
                                <div className="flex gap-2 mt-6">
                                    <button
                                        type="submit"
                                        disabled={imageLoading}
                                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors ${imageLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {imageLoading ? 'Uploading...' : 'Update Profile Picture'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleImageCancel}
                                        disabled={imageLoading}
                                        className={`hover:bg-gray-200 text-black font-medium text-sm px-6 py-2.5 rounded-md transition-colors border border-gray-300 ${imageLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                );
            case 'basic':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information Update</h2>
                        
                        {/* Success Message */}
                        {basicInfoSuccess && (
                            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-600 text-sm font-medium">{basicInfoSuccess}</p>
                            </div>
                        )}

                        <div className="space-y-4 w-full max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Profile Image</label>
                                <div className="flex items-center space-x-4">
                                    {profile?.image ? (
                                        <img 
                                            src={profile.image} 
                                            alt="Profile" 
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Image size={32} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <form onSubmit={handleBasicInfoSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={basicInfoForm.full_name}
                                            onChange={handleBasicInfoChange}
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-2.5 border ${basicInfoErrors.full_name ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                        />
                                        {basicInfoErrors.full_name && (
                                            <p className="mt-1 text-sm text-red-600">{basicInfoErrors.full_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={basicInfoForm.email}
                                            onChange={handleBasicInfoChange}
                                            placeholder="Enter your email"
                                            className={`w-full px-4 py-2.5 border ${basicInfoErrors.email ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                        />
                                        {basicInfoErrors.email && (
                                            <p className="mt-1 text-sm text-red-600">{basicInfoErrors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            value={basicInfoForm.phone_number}
                                            onChange={handleBasicInfoChange}
                                            placeholder="Enter your phone number"
                                            className={`w-full px-4 py-2.5 border ${basicInfoErrors.phone_number ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                        />
                                        {basicInfoErrors.phone_number && (
                                            <p className="mt-1 text-sm text-red-600">{basicInfoErrors.phone_number}</p>
                                        )}
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        {!isEditing ? (
                                            <button
                                                type="button"
                                                onClick={handleBasicInfoEdit}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors"
                                            >
                                                Edit Information
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="submit"
                                                    disabled={basicInfoLoading}
                                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors ${basicInfoLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {basicInfoLoading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleBasicInfoCancel}
                                                    disabled={basicInfoLoading}
                                                    className={`hover:bg-gray-200 text-black font-medium text-sm px-6 py-2.5 rounded-md transition-colors border border-gray-300 ${basicInfoLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Password Update</h2>

                        {/* Success Message */}
                        {passwordSuccess && (
                            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-600 text-sm font-medium">{passwordSuccess}</p>
                            </div>
                        )}

                        <form onSubmit={handlePasswordSubmit} className="space-y-4 w-full max-w-md">
                            <div>
                                <label htmlFor="old_password" className="block text-sm font-medium text-gray-900 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="old_password"
                                    name="old_password"
                                    value={passwordForm.old_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your current password"
                                    className={`w-full px-4 py-2.5 border ${passwordErrors.old_password ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                    disabled={passwordLoading}
                                />
                                {passwordErrors.old_password && (
                                    <p className="mt-1 text-sm text-red-600">{passwordErrors.old_password}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="new_password" className="block text-sm font-medium text-gray-900 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    value={passwordForm.new_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your new password"
                                    className={`w-full px-4 py-2.5 border ${passwordErrors.new_password ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                    disabled={passwordLoading}
                                />
                                {passwordErrors.new_password && (
                                    <p className="mt-1 text-sm text-red-600">{passwordErrors.new_password}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirm_new_password" className="block text-sm font-medium text-gray-900 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_new_password"
                                    name="confirm_new_password"
                                    value={passwordForm.confirm_new_password}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm your new password"
                                    className={`w-full px-4 py-2.5 border ${passwordErrors.confirm_new_password ? 'border-red-300' : 'border-[#00000000]'} rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]`}
                                    disabled={passwordLoading}
                                />
                                {passwordErrors.confirm_new_password && (
                                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirm_new_password}</p>
                                )}
                            </div>
                            <div className='flex gap-2'>
                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors ${passwordLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {passwordLoading ? 'Updating...' : 'Update Password'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePasswordCancel}
                                    disabled={passwordLoading}
                                    className={`hover:bg-gray-200 text-black font-medium text-sm px-6 py-2.5 rounded-md transition-colors border border-gray-300 ${passwordLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case 'preferences':
                return (
                    <div>
                        <NotificationsUpdate />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderSiteSettings = () => {
        return (
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Site Settings</h2>
                <div className="space-y-4 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Site Name</label>
                        <input type="text" placeholder="Enter site name" defaultValue="My Broker Platform" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Site Description</label>
                        <textarea rows={4} placeholder="Enter site description" defaultValue="A comprehensive platform for managing brokers and leads" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Contact Email</label>
                        <input type="email" placeholder="Enter contact email" defaultValue="contact@broker.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Support Phone</label>
                        <input type="tel" placeholder="Enter support phone" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors">
                        Save Settings
                    </button>
                </div>
            </div>
        );
    };

    const renderVendorForm = () => {
        return (
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Vendor's Form</h2>
                <div className="space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                            <input type="text" placeholder="Enter company name" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Business Type</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Select business type</option>
                                <option>Insurance</option>
                                <option>Real Estate</option>
                                <option>Finance</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Business Address</label>
                        <input type="text" placeholder="Enter business address" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Tax ID</label>
                            <input type="text" placeholder="Enter tax ID" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">License Number</label>
                            <input type="text" placeholder="Enter license number" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Additional Information</label>
                        <textarea rows={4} placeholder="Enter additional information" className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors">
                        Submit Form
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="w-full">
                <div className="bg-white rounded-full p-1 inline-flex shadow-sm mb-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'profile'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('site')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'site'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        Site Setting
                    </button>
                    <button
                        onClick={() => setActiveTab('vendor')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'vendor'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        Vendor's Form
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {activeTab === 'profile' && (
                        <div className="lg:w-56 flex-shrink-0">
                            <div className="overflow-hidden">
                                <button
                                    onClick={() => setActiveSection('picture')}
                                    className={`w-full text-left px-6 py-3 text-md font-medium transition-colors ${activeSection === 'picture'
                                        ? 'bg-[#E7F0FB] rounded-md text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Profile Picture
                                </button>
                                <button
                                    onClick={() => setActiveSection('basic')}
                                    className={`w-full text-left px-6 py-3 text-md font-medium transition-colors ${activeSection === 'basic'
                                        ? 'bg-[#E7F0FB] rounded-md text-blue-600 '
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Basic Information
                                </button>
                                <button
                                    onClick={() => setActiveSection('security')}
                                    className={`w-full text-left px-6 py-3 text-md font-medium transition-colors ${activeSection === 'security'
                                        ? 'bg-[#E7F0FB] rounded-md text-blue-600 '
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Security Settings
                                </button>
                                <button
                                    onClick={() => setActiveSection('preferences')}
                                    className={`w-full text-left px-6 py-3 text-md font-medium transition-colors ${activeSection === 'preferences'
                                        ? 'bg-[#E7F0FB] rounded-md text-blue-600 '
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    Preferences
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1">
                        {activeTab === 'profile' && renderProfileContent()}
                        {activeTab === 'site' && renderSiteSettings()}
                        {activeTab === 'vendor' && renderVendorForm()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;