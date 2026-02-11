/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddBrokerMutation } from '@/redux/features/admin/broker-management/addBrokerApi';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface AddBrokerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const AddBrokerModal: React.FC<AddBrokerModalProps> = ({
  isOpen = true,
  onClose = () => { },
  onSuccess = () => { }
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [addBroker, { isLoading, error }] = useAddBrokerMutation();

  const handleSubmit = async () => {
    try {
      const payload = {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
      };

      await addBroker(payload).unwrap();

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
      });

      onSuccess();
      onClose();

    } catch (err: any) {
      if (err) {
        toast.error(err?.data?.email?.[0] || 'Failed to add broker.');
      } else {
        toast.error('Failed to add broker.');
      }
    }
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
            disabled={isLoading}
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Add New Broker</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Add a new broker to your team. They will be able to view and manage leads.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              Error: {'data' in error ? (error.data as any)?.message || 'Failed to add broker' : 'Failed to add broker'}
            </p>
          </div>
        )}

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
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
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
              placeholder="user@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-5">
            <label htmlFor="phone" className="block text-gray-900 text-sm font-medium mb-2">
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="US"
              value={formData.phone}
              onChange={(value) => handleChange('phone', value || '')}
              className="w-full"
              inputClassName="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Temporary Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-900 text-sm font-medium mb-2">
              Temporary Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !formData.name || !formData.email || !formData.password}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Broker'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrokerModal;