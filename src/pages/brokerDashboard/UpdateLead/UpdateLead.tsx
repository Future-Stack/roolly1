/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Mail,
    Phone,
    DollarSign,
    Globe,
    Save,
    CheckCircle,
    XCircle,
    Hash
} from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateLeadMutation } from '@/redux/features/broker/leads/updateLeadApi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Lead {
    id: number;
    client_name: string;
    property_name?: string;
    property_type?: string;
    property?: number; 
    source: string;
    lead_status: string;
    lead_traffic: 'green' | 'amber' | 'red' | string;
    budget_range: string | null;
    created_at: string;
    email_address: string;
    phone_number: string;
}

const UpdateLead: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const leadDataFromState = location.state?.leadData as Lead | null;
    
    const [formData, setFormData] = useState<Partial<Lead & { propertyString?: string }>>(() => {
        if (leadDataFromState) {
            return {
                ...leadDataFromState,
                propertyString: leadDataFromState.property?.toString() || ''
            };
        }
        return {};
    });

    const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Update form data when state changes
    useEffect(() => {
        if (leadDataFromState) {
            setFormData({
                ...leadDataFromState,
                propertyString: leadDataFromState.property?.toString() || ''
            });
        }
    }, [leadDataFromState]);

    const handleInputChange = (field: keyof Lead | 'propertyString', value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.client_name?.trim()) {
            setErrorMessage('Client name is required');
            setShowError(true);
            return;
        }

        if (!formData.email_address?.trim()) {
            setErrorMessage('Email address is required');
            setShowError(true);
            return;
        }

        if (!formData.phone_number?.trim()) {
            setErrorMessage('Phone number is required');
            setShowError(true);
            return;
        }

        try {
            const apiData: Record<string, any> = {};
            
            Object.keys(formData).forEach(key => {
                const field = key as keyof Lead | 'propertyString';
                if (field !== 'propertyString' && formData[field] !== undefined && formData[field] !== null) {
                    apiData[field] = formData[field];
                }
            });

            // Handle property field conversion
            const propertyStringValue = formData.propertyString;
            if (propertyStringValue !== undefined && propertyStringValue !== null) {
                const trimmedValue = propertyStringValue.toString().trim();
                apiData.property = trimmedValue === '' ? 0 : Number(trimmedValue);
            }

            await updateLead({
                id,
                data: apiData
            }).unwrap();
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/broker-dashboard/leads');
            }, 2000);

        } catch (err: any) {
            console.error('Failed to update lead:', err);
            setErrorMessage(
                err?.data?.detail || 
                err?.data?.message || 
                'Failed to update lead. Please try again.'
            );
            setShowError(true);
        }
    };

    useEffect(() => {
        if (showSuccess || showError) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setShowError(false);
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, showError]);

    const propertyTypes = [
        { value: 'industrial', label: 'Industrial' },
        { value: 'land', label: 'Land' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value:'other',label:'Other' }
    ];

    const statusOptions = [
        { value: 'enquired', label: 'Enquired', color: 'bg-purple-600' },
        { value: 'viewed', label: 'Viewed', color: 'bg-orange-600' },
        { value: 'terms_sent', label: 'Terms Sent', color: 'bg-[#9333EA]' },
        { value: 'in_legals', label: 'In Legals', color: 'bg-indigo-600' },
        { value: 'completed', label: 'Completed', color: 'bg-green-600' },
        { value: 'closed', label: 'Closed', color: 'bg-gray-600' }
    ];

    const trafficOptions = [
        { value: 'green', label: 'Green', color: 'bg-green-500', selectedClass: 'ring-2 ring-green-700 ring-offset-1' },
        { value: 'amber', label: 'Amber', color: 'bg-amber-500', selectedClass: 'ring-2 ring-amber-700 ring-offset-1' },
        { value: 'red', label: 'Red', color: 'bg-red-600', selectedClass: 'ring-2 ring-red-800 ring-offset-1' }
    ];

    const sourceOptions = [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'call', label: 'Call' },
        { value: 'chat', label: 'Chat' },
        { value: 'ai', label: 'AI' },
        { value: 'other', label: 'Other' }
    ];

    if (!leadDataFromState && !formData.id) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading lead data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Success/Error Messages */}
                {showSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-700">Lead updated successfully! Redirecting...</p>
                    </div>
                )}

                {showError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-700">{errorMessage}</p>
                    </div>
                )}

                {/* Header with Back Button */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            to="/broker-dashboard/leads"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back to Leads</span>
                        </Link>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <span className="text-sm text-gray-500">Lead ID: #{id}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                Update Lead: {formData.client_name || 'Loading...'}
                            </h1>
                            <p className="text-gray-600">Edit lead details and update status</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/broker-dashboard/leads')}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isUpdating}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Update Lead
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Lead Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Client Information Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Client Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Client Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.client_name || ''}
                                                onChange={(e) => handleInputChange('client_name', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email_address || ''}
                                                    onChange={(e) => handleInputChange('email_address', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 z-10 w-5 h-5 text-gray-400" />
                                                <PhoneInput
                                                    international
                                                    defaultCountry="BD"
                                                    value={formData.phone_number || ''}
                                                    onChange={(value) => handleInputChange('phone_number', value || '')}
                                                    className="w-full"
                                                    inputClassName="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Source
                                            </label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <select
                                                    value={formData.source || ''}
                                                    onChange={(e) => handleInputChange('source', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                                                >
                                                    {sourceOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Details Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Property Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.property_name || ''}
                                                onChange={(e) => handleInputChange('property_name', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Property Type
                                            </label>
                                            <select
                                                value={formData.property_type || ''}
                                                onChange={(e) => handleInputChange('property_type', e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                                            >
                                                <option value="">Select Type</option>
                                                {propertyTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Property ID ফিল্ড (Backend এ property নামে যাবে) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Property ID
                                            </label>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    value={formData.propertyString || ''}
                                                    onChange={(e) => handleInputChange('propertyString', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="e.g., 12345"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Budget Range
                                            </label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={formData.budget_range || ''}
                                                    onChange={(e) => handleInputChange('budget_range', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="e.g., 1000-4000"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Status & Actions */}
                        <div className="space-y-6">
                            {/* Status Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Status</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Current Status
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {statusOptions.map((status) => (
                                                <button
                                                    type="button"
                                                    key={status.value}
                                                    onClick={() => handleInputChange('lead_status', status.value)}
                                                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${formData.lead_status === status.value
                                                        ? `${status.color} text-white ring-2 ring-offset-1 ${status.color.replace('bg-', 'ring-')}700`
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {status.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Traffic Light
                                        </label>
                                        <div className="flex gap-3">
                                            {trafficOptions.map((traffic) => {
                                                const isSelected = formData.lead_traffic === traffic.value;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={traffic.value}
                                                        onClick={() => handleInputChange('lead_traffic', traffic.value)}
                                                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 shadow-sm ${traffic.color} ${isSelected ? traffic.selectedClass : 'hover:opacity-90'}`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center gap-1">
                                                            <div className={`w-4 h-4 rounded-full ${isSelected ? 'bg-white' : 'bg-white/80'}`}></div>
                                                            <span>{traffic.label}</span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLead;