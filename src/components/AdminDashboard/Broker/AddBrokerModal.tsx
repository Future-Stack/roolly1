import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddBrokerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AddBrokerModal: React.FC<AddBrokerModalProps> = ({ 
  isOpen = true, 
  onClose = () => {} 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-lg mt-8 mb-8 shadow-xl">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Add New Broker</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Add a new broker to your team. They will be able to view and manage leads.
          </p>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6">
          {/* Name Field */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-900 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e,g pharmacy"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email Address Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e,g pharmacy"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-5">
            <label htmlFor="phone" className="block text-gray-900 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+004 0001254"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Temporary Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-900 text-sm font-medium mb-2">
              Temporary Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="12345"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Broker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddBrokerModal;