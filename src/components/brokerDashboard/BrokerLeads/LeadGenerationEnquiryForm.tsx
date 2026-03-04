import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useCreateNewLeadMutation } from '@/redux/features/broker/leads/createNewLeadApi';
import { toast } from 'react-toastify';

interface FormData {
  propertyId: string;
  leadIntakeFrom: string;
  clientName: string;
  emailAddress: string;
  phoneNumber: string;
  leadStatus: string;
  sqftRange: string;
  location: string;
  financialDetailsProvided: boolean;
  message: string;
}

interface LeadGenerationEnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadGenerationEnquiryForm: React.FC<LeadGenerationEnquiryFormProps> = ({ isOpen, onClose }) => {
  const [createNewLead, { isLoading }] = useCreateNewLeadMutation();
  const [formData, setFormData] = useState<FormData>({
    propertyId: '',
    leadIntakeFrom: 'whatsapp',
    clientName: '',
    emailAddress: '',
    phoneNumber: '',
    leadStatus: 'enquired',
    sqftRange: '0-1000',
    location: '',
    financialDetailsProvided: false,
    message: ''
  });

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      propertyId: '',
      leadIntakeFrom: 'whatsapp',
      clientName: '',
      emailAddress: '',
      phoneNumber: '',
      leadStatus: 'enquired',
      sqftRange: '0-1000',
      location: '',
      financialDetailsProvided: false,
      message: ''
    });
  };

  const handleSubmit = async () => {
    if (!formData.propertyId || !formData.clientName || !formData.emailAddress || !formData.phoneNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        property: formData.propertyId.trim() ? parseInt(formData.propertyId) : null,
        client_name: formData.clientName,
        source: formData.leadIntakeFrom,
        email_address: formData.emailAddress,
        phone_number: formData.phoneNumber,
        lead_status: formData.leadStatus,
        sqft_range: formData.sqftRange,
        location: formData.location,
        financial_details_provided: formData.financialDetailsProvided,
        message: formData.message
      };

      await createNewLead(payload).unwrap();
      toast.success('Lead created successfully!');
      handleClearForm();
      onClose();
    } catch (error: any) {
      console.error('Error creating lead:', error);
      
      // Handle field-specific errors
      if (error?.data && typeof error.data === 'object' && !Array.isArray(error.data)) {
        const errorMessages = Object.entries(error.data).map(([field, messages]) => {
          const fieldName = field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
          const message = Array.isArray(messages) ? messages.join(' ') : messages;
          return `${fieldName}: ${message}`;
        });
        toast.error(errorMessages.join(' | '));
      } else {
        toast.error(error?.data?.detail || 'Failed to create lead. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[680px] mx-auto">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Lead Generation & Enquiry Intake
              </h1>
              <p className="text-base text-gray-600 font-medium">
                Capture leads from multiple channels automatically synced into the system
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Row 1: Property Id & Lead intake from */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Property Id
                  </label>
                  <input
                    type="text"
                    placeholder="e,g pharmacy"
                    value={formData.propertyId}
                    onChange={(e) => handleInputChange('propertyId', e.target.value)}
                    className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Lead intake from
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadIntakeFrom}
                      onChange={(e) => handleInputChange('leadIntakeFrom', e.target.value)}
                      className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="call">Call</option>
                      <option value="ai">AI</option>
                      <option value="chat">Chat</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Row 2: Client Name & Email Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 3: Phone Number & Lead Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 123 456 7890"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Lead Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadStatus}
                      onChange={(e) => handleInputChange('leadStatus', e.target.value)}
                      className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="enquired">Enquired</option>
                      <option value="viewed">Viewed</option>
                      <option value="terms_sent">Terms Sent</option>
                      <option value="in_legals">In Legals</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Sqft Range
                </label>
                <div className="relative">
                  <select
                    value={formData.sqftRange}
                    onChange={(e) => handleInputChange('sqftRange', e.target.value)}
                    className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="0-1000">0-1000</option>
                    <option value="1000-2000">1000-2000</option>
                    <option value="2000-3000">2000-3000</option>
                    <option value="3000-4000">3000-4000</option>
                    <option value="4000-5000">4000-5000</option>
                    <option value="5000+">5000+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
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
                      checked={formData.financialDetailsProvided}
                      onChange={(e) => handleInputChange('financialDetailsProvided', e.target.checked)}
                    />
                    Provided
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!formData.financialDetailsProvided}
                      onChange={(e) => handleInputChange('financialDetailsProvided', !e.target.checked)}
                    />
                    Not Provided
                  </label>
                </div>
              </div>

              {/* Message/Requirement */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Message/Requirement
                </label>
                <textarea
                  placeholder="Enter specific requirements or notes"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={handleClearForm}
                disabled={isLoading}
                className="px-5 py-2.5 text-[14px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Clear Form
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center justify-center min-w-[140px] px-5 py-2.5 text-[14px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationEnquiryForm;
