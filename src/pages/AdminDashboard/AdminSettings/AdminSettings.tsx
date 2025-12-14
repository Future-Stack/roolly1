import React, { useState } from 'react';
import { Image } from 'lucide-react';
import NotificationsUpdate from '@/components/AdminDashboard/AdminSettings/NotificationsUpdate';

type TabType = 'profile' | 'site' | 'vendor';

const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [activeSection, setActiveSection] = useState<string>('picture');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderProfileContent = () => {
        switch (activeSection) {
            case 'picture':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Picture Update</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center max-w-md">
                            <p className="text-sm font-medium text-gray-900 mb-4">Upload Profile image</p>

                            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <Image size={32} className="text-gray-400" />
                                )}
                            </div>

                            <p className="text-xs text-gray-500 mb-1">Image format - jpg png jpeg</p>
                            <p className="text-xs text-gray-500 mb-6">Image Size - maximum size 2 MB Image Ratio - 1:1</p>

                            <label htmlFor="file-upload">
                                <div className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md inline-block cursor-pointer transition-colors">
                                    Upload Profile
                                </div>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                );
            case 'basic':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information Update</h2>
                        <div className="space-y-4 w-full">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div className='flex gap-2'>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors">
                                    Update Profile
                                </button>
                                <button className="hover:bg-gray-200 text-black font-medium text-sm px-6 py-2.5 rounded-md transition-colors border border-gray-300 ">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Password Update</h2>
                        <div className="space-y-4 w-full">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
                                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
                                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
                                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-2.5 border border-[#00000000] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#E7F0FB99]" />
                            </div>
                            <div className='flex gap-2'>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors">
                                    Update Password
                                </button>
                                <button className="hover:bg-gray-200 text-black font-medium text-sm px-6 py-2.5 rounded-md transition-colors border border-gray-300 ">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'preferences':
                return (
                    <div>
                        <NotificationsUpdate/>
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
                {/* Tab Navigation */}
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

                {/* Content Area */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Only for Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="lg:w-56 flex-shrink-0">
                            <div className=" overflow-hidden">
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

                    {/* Main Content */}
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