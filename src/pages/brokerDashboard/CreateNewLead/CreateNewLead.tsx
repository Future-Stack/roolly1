/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCreateNewLeadMutation } from '@/redux/features/broker/leads/createNewLeadApi';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
// import console from 'console';

const CreateNewLead = () => {
    const navigate = useNavigate();
    const [createNewLead, { isLoading }] = useCreateNewLeadMutation();

    // Separate state variables for each field
    const [property, setProperty] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [source, setSource] = useState<string>('whatsapp');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [leadStatus, setLeadStatus] = useState<string>('enquired');
    const [leadTraffic, setLeadTraffic] = useState<string>('green');
    const [sqftRange, setSqftRange] = useState<string>('1000-2000');
    const [location, setLocation] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [financialDetailsProvided, setFinancialDetailsProvided] = useState<boolean>(false);

    const [phoneError, setPhoneError] = useState<string>('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handlePhoneChange = (value: string | undefined) => {
        const phone = value || '';
        setPhoneNumber(phone);

        // Clear error when user starts typing
        if (phoneError) setPhoneError('');
        if (formErrors.phone_number) {
            setFormErrors(prev => ({ ...prev, phone_number: '' }));
        }
    };
    const sqftRangeOptions = [
        // { value: '', label: 'Select SQFT Range' },
        { value: '1000-2000', label: '1000-2000' },
        { value: '2000-4000', label: '2000-4000' },
        { value: '4000-6000', label: '4000-6000' },
        { value: '6000-8000', label: '6000-8000' },
        { value: '8000-15000', label: '8000-15000' },
        { value: '15000-30000', label: '15000-30000' },
        { value: '30000-60000', label: '30000-60000' },
        { value: '60000+', label: '60000+' }
    ];

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!property.trim()) errors.property = 'Property ID is required';
        if (!clientName.trim()) errors.client_name = 'Client name is required';
        if (!emailAddress.trim()) errors.email_address = 'Email address is required';
        if (!phoneNumber.trim()) {
            errors.phone_number = 'Phone number is required';
        } else if (!isValidPhoneNumber(phoneNumber)) {
            errors.phone_number = 'Please enter a valid phone number';
        }
        if (!sqftRange.trim()) errors.sqft_range = 'SQFT range is required';

        // if (!location.trim()) errors.location = 'Location is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Prepare data object directly
            const leadData = {
                property: parseInt(property) || 0,
                client_name: clientName,
                source: source,
                email_address: emailAddress,
                phone_number: phoneNumber,
                lead_status: leadStatus,
                lead_traffic: leadTraffic,
                sqft_range: sqftRange,
                location: location,
                financial_details_provided: financialDetailsProvided,
                message: message
            };
            console.log('leadData', leadData);

            await createNewLead(leadData).unwrap();
            toast.success('Lead created successfully!');


            navigate('/broker-dashboard/leads');
        } catch (err: any) {
            toast.error('Failed to create lead. Please try again.');

            if (err.data) {
                const backendErrors: Record<string, string> = {};

                // Parse backend error messages
                if (err.data.client_name) {
                    backendErrors.client_name = Array.isArray(err.data.client_name)
                        ? err.data.client_name[0]
                        : err.data.client_name;
                }
                if (err.data.email_address) {
                    backendErrors.email_address = Array.isArray(err.data.email_address)
                        ? err.data.email_address[0]
                        : err.data.email_address;
                }
                // if (err.data.phone_number) {
                //     backendErrors.phone_number = Array.isArray(err.data.phone_number)
                //         ? err.data.phone_number[0]
                //         : err.data.phone_number;
                // }
                if (err.data.property) {
                    backendErrors.property = Array.isArray(err.data.property)
                        ? err.data.property[0]
                        : err.data.property;
                }
                if (err.data.sqft_range) {
                    backendErrors.sqft_range = Array.isArray(err.data.sqft_range)
                        ? err.data.sqft_range[0]
                        : err.data.sqft_range;
                }

                if (Object.keys(backendErrors).length > 0) {
                    setFormErrors(backendErrors);
                } else {
                    console.error('Lead creation error:', err);
                    alert(err.data?.detail || 'Failed to create lead. Please try again.');
                }
            } else {
                console.error('Network or Runtime error:', err);
                alert('Network or Runtime error. Please check your connection or check console for details.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Lead</h1>
                            <p className="text-sm text-gray-600 mt-1">Fill in the details below to create a new lead</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="p-6 md:p-8">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Property ID */}
                                <div className="space-y-2">
                                    <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                                        Property ID *
                                    </label>
                                    <input
                                        type="number"
                                        id="property"
                                        name="property"
                                        value={property}
                                        onChange={(e) => {
                                            setProperty(e.target.value);
                                            if (formErrors.property) {
                                                setFormErrors(prev => ({ ...prev, property: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 border ${formErrors.property ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                        placeholder="Enter property ID"
                                        min="0"
                                    />
                                    {formErrors.property && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.property}</p>
                                    )}
                                </div>

                                {/* Client Name */}
                                <div className="space-y-2">
                                    <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                                        Client Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="client_name"
                                        name="client_name"
                                        value={clientName}
                                        onChange={(e) => {
                                            setClientName(e.target.value);
                                            if (formErrors.client_name) {
                                                setFormErrors(prev => ({ ...prev, client_name: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 border ${formErrors.client_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                        placeholder="Enter client name"
                                    />
                                    {formErrors.client_name && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.client_name}</p>
                                    )}
                                </div>

                                {/* Source */}
                                <div className="space-y-2">
                                    <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                                        Lead Source *
                                    </label>
                                    <select
                                        id="source"
                                        name="source"
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                    >
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="call">Call</option>
                                        <option value="ai">AI</option>
                                        <option value="chat">Chat</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email_address"
                                        name="email_address"
                                        value={emailAddress}
                                        onChange={(e) => {
                                            setEmailAddress(e.target.value);
                                            if (formErrors.email_address) {
                                                setFormErrors(prev => ({ ...prev, email_address: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 border ${formErrors.email_address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                        placeholder="Enter email address"
                                    />
                                    {formErrors.email_address && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.email_address}</p>
                                    )}
                                </div>

                                {/* Phone Number with Country Code */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <PhoneInput
                                            international
                                            defaultCountry="BD"
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            className={`w-full px-4 py-3 border ${formErrors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    {/* {formErrors.phone_number && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.phone_number}</p>
                                    )} */}
                                </div>

                                {/* Lead Status */}
                                <div className="space-y-2">
                                    <label htmlFor="lead_status" className="block text-sm font-medium text-gray-700">
                                        Lead Status *
                                    </label>
                                    <select
                                        id="lead_status"
                                        name="lead_status"
                                        value={leadStatus}
                                        onChange={(e) => setLeadStatus(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                    >
                                        <option value="enquired">Enquired</option>
                                        <option value="viewed">Viewed</option>
                                        <option value="terms_sent">Terms Sent</option>
                                        <option value="in_legals">In Legals</option>
                                        <option value="completed">Completed</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>

                                {/* Lead Traffic */}
                                <div className="space-y-2">
                                    <label htmlFor="lead_traffic" className="block text-sm font-medium text-gray-700">
                                        Lead Traffic *
                                    </label>
                                        <select
                                            id="lead_traffic"
                                            name="lead_traffic"
                                            value={leadTraffic}
                                            onChange={(e) => setLeadTraffic(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                        >
                                            <option value="green">Green</option>
                                            <option value="amber">Amber</option>
                                            <option value="red">Red</option>
                                        </select>
                                </div>

                                {/* Budget Range */}
                                <div className="space-y-2">
                                    <label htmlFor="sqft_range" className="block text-sm font-medium text-gray-700">
                                        SQFT Range *
                                    </label>
                                    <select
                                        id="sqft_range"
                                        name="sqft_range"
                                        value={sqftRange}
                                        onChange={(e) => {
                                            setSqftRange(e.target.value);
                                            if (formErrors.sqft_range) {
                                                setFormErrors(prev => ({ ...prev, sqft_range: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 border ${formErrors.sqft_range ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    >
                                        {sqftRangeOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.sqft_range && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.sqft_range}</p>
                                    )}
                                </div>

                            </div>
                                <div className="flex-1 mt-6 space-y-2">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <textarea
                                        id="location"
                                        name="location"
                                        value={location}
                                        rows={1}
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                            if (formErrors.location) {
                                                setFormErrors(prev => ({ ...prev, location: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 border ${formErrors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                        placeholder="Enter location"
                                    />
                                    {formErrors.location && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
                                    )}
                                </div>
                            {/* financial details provided */}
                           <div className="mt-6 space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Financial Details Provided
                                </label>

                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={financialDetailsProvided === true}
                                        onChange={() => setFinancialDetailsProvided(true)}
                                    />
                                    Provided
                                    </label>

                                    <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={financialDetailsProvided === false}
                                        onChange={() => setFinancialDetailsProvided(false)}
                                    />
                                    Not Provided
                                    </label>
                                </div>
                            </div>

                            {/* Message - Full Width */}
                            <div className="mt-6 space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message / Notes
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter any additional notes or message from the client"
                                />
                            </div>

                            {/* Status Messages */}
                            {isLoading && (
                                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
                                    Creating lead...
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex items-center justify-center px-6 py-3 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-lg transition-colors`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Create Lead
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNewLead;