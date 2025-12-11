import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface FormData {
  propertyId: string;
  leadIntakeFrom: string;
  clientName: string;
  emailAddress: string;
  phoneNumber: string;
  leadStatus: string;
  budgetRange: string;
  message: string;
}

const LeadGenerationEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyId: '',
    leadIntakeFrom: 'WhatsApp/Call',
    clientName: '',
    emailAddress: '',
    phoneNumber: '',
    leadStatus: 'Prime',
    budgetRange: '$2000-$50000',
    message: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      propertyId: '',
      leadIntakeFrom: 'WhatsApp/Call',
      clientName: '',
      emailAddress: '',
      phoneNumber: '',
      leadStatus: 'Prime',
      budgetRange: '$2000-$50000',
      message: ''
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-[680px] mx-auto">
        {/* Close Button */}
        <button className="mb-8 p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-gray-900 mb-2">
            Lead Generation & Enquiry Intake
          </h1>
          <p className="text-[14px] text-gray-600">
            Capture leads from multiple channels automatically synced into the system
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Row 1: Property Id & Lead intake from */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
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
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
                Lead intake from
              </label>
              <div className="relative">
                <select
                  value={formData.leadIntakeFrom}
                  onChange={(e) => handleInputChange('leadIntakeFrom', e.target.value)}
                  className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option>WhatsApp/Call</option>
                  <option>Email</option>
                  <option>Website</option>
                  <option>Walk-in</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Row 2: Client Name & Email Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
                Client Name
              </label>
              <input
                type="text"
                placeholder="e,g pharmacy"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e,g pharmacy"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 3: Phone Number & Lead Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+004 0001254"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full h-[44px] px-4 text-[14px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[14px] font-normal text-gray-900 mb-2">
                Lead Status
              </label>
              <div className="relative">
                <select
                  value={formData.leadStatus}
                  onChange={(e) => handleInputChange('leadStatus', e.target.value)}
                  className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option>Prime</option>
                  <option>Hot</option>
                  <option>Warm</option>
                  <option>Cold</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              Budget Range
            </label>
            <div className="relative">
              <select
                value={formData.budgetRange}
                onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                className="w-full h-[44px] px-4 pr-10 text-[14px] text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option>$2000-$50000</option>
                <option>$50000-$100000</option>
                <option>$100000-$200000</option>
                <option>$200000+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" strokeWidth={2} />
            </div>
          </div>

          {/* Message/Requirement */}
          <div>
            <label className="block text-[14px] font-normal text-gray-900 mb-2">
              Message/Requirement
            </label>
            <textarea
              placeholder="e,g pharmacy"
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
            className="px-5 py-2.5 text-[14px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 text-[14px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationEnquiryForm;