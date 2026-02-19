import React, { useState } from 'react';
import finImg from '../../assets/cantFindsec.svg';
import clock from '../../assets/clock.svg';
import easy from '../../assets/easycan.svg';
import { toast } from 'react-toastify';
import { useCreatePropertyEnquiryMutation } from '@/redux/features/public/propertyEnquiryApi';

const CantFindSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPropertyEnquiry, { isLoading }] = useCreatePropertyEnquiryMutation();

  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    email: '',
    phone_number: '',
    sqft_min: '',
    sqft_max: '',
    location: ''
  });

  const features = [
    {
      icon: clock,
      title: 'Immediate',
      subtitle: 'Response',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
          <path
            d="M6.65834 30.1771C8.42917 28.9021 10.3083 27.8944 12.2958 27.1542C14.2819 26.4125 16.4333 26.0417 18.75 26.0417C21.0667 26.0417 23.2181 26.4125 25.2042 27.1542C27.1903 27.8958 29.0694 28.9028 30.8417 30.175C32.2167 28.7514 33.3229 27.0708 34.1604 25.1333C34.9979 23.1931 35.4167 21.0653 35.4167 18.75C35.4167 14.1319 33.7938 10.1993 30.5479 6.95208C27.3021 3.70486 23.3694 2.08194 18.75 2.08333C14.1306 2.08472 10.1979 3.70833 6.95209 6.95417C3.70625 10.2 2.08334 14.1319 2.08334 18.75C2.08334 21.0653 2.50209 23.1931 3.33959 25.1333C4.17709 27.0722 5.28334 28.7528 6.65834 30.175Z"
            fill="#126AD8"
          />
        </svg>
      ),
      title: 'Personal',
      subtitle: 'Service',
    },
    {
      icon: easy,
      title: 'Easy',
      subtitle: 'Scheduling',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" fill="none">
          <path
            d="M17.6667 42.6667C17.6667 42.6667 1 30.1667 1 17.6667C1 7.25 9.33333 1 17.6667 1C26 1 34.3333 7.25 34.3333 17.6667C34.3333 30.1667 17.6667 42.6667 17.6667 42.6667Z"
            stroke="#126AD8"
            strokeWidth="2"
          />
        </svg>
      ),
      title: 'Property',
      subtitle: 'Nationwide',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPropertyEnquiry(formData).unwrap();
      toast.success('Requirement submitted successfully!');
      setIsModalOpen(false);
      setFormData({
        name: '',
        business_name: '',
        email: '',
        phone_number: '',
        sqft_min: '',
        sqft_max: '',
        location: ''
      });
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to submit enquiry');
      console.error('Failed to submit enquiry:', err);
    }
  };

  return (
    <div className="bg-white w-full mt-10 sm:mt-12 md:mt-16">
      <div className="px-4 sm:px-6 md:px-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:pr-5">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={finImg}
                alt="Modern building with blue sky"
                className="w-full h-[280px] sm:h-[400px] md:h-[520px] lg:h-[700px] object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Heading */}
            <div className='sm:px-4 md:px-8 lg:px-0'>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-4 leading-tight">
                Can't find what you <br className="hidden sm:block" /> are looking for?
              </h2>

              <p className="text-[#303539] text-base sm:text-lg md:text-xl font-medium leading-relaxed sm:leading-8 md:leading-9 mb-8">
                Let us know your requirements. We're always updating our listings and if a property
                comes up that matches what you need, you'll be the first to know, with early access
                before it goes live.
              </p>

              {/* Explore Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 bg-[#126AD8] hover:bg-blue-400 text-white rounded-[10px] text-lg font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Enquire Now
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 mt-8 lg:mt-12 sm:px-4 md:px-8 lg:px-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 hover:bg-blue-100 rounded-xl p-5 text-center min-h-[160px] sm:h-[200px] flex flex-col items-center justify-center transition-all duration-300 border border-[#B6D1F3] group hover:shadow-md"
                >
                  <div className="mb-3 transition-transform group-hover:scale-110">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      {typeof feature.icon === 'string' ? (
                        <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                      ) : (
                        feature.icon
                      )}
                    </div>
                  </div>

                  <h3 className="text-[#1D1F22] font-semibold text-lg sm:text-xl mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-[#1D1F22] text-lg sm:text-xl font-semibold">
                    {feature.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 bg-opacity-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Submit Your Requirements</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="business_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your business name"
                  />
                </div>

                {/* Email and Telephone in one row for larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Telephone *
                    </label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Min Sq ft and Max Sq ft in one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Min Sq ft */}
                  <div>
                    <label htmlFor="sqft_min" className="block text-sm font-medium text-gray-700 mb-1">
                      Min Sq ft Required *
                    </label>
                    <input
                      type="text"
                      id="sqft_min"
                      name="sqft_min"
                      value={formData.sqft_min}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., 1000"
                    />
                  </div>

                  {/* Max Sq ft */}
                  <div>
                    <label htmlFor="sqft_max" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Sq ft Required *
                    </label>
                    <input
                      type="text"
                      id="sqft_max"
                      name="sqft_max"
                      value={formData.sqft_max}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., 2000"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., Uttara"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 px-6 py-3 bg-[#126AD8] hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Requirements'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CantFindSection;
