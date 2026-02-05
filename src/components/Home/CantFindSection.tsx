import React, { useState } from 'react';
import finImg from '../../assets/cantFindsec.svg';
import clock from '../../assets/clock.svg';
import easy from '../../assets/easycan.svg';
import { toast } from 'react-toastify';

const CantFindSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    tel: '',
    sqftRequired: '',
    locations: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Submitted')
    setIsModalOpen(false);
    setFormData({
      name: '',
      businessName: '',
      email: '',
      tel: '',
      sqftRequired: '',
      locations: ''
    });
  };

  return (
    <div className="bg-white w-full mt-12">
      <div className="px-4 sm:px-6 md:px-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:pr-5">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={finImg}
                alt="Modern building with blue sky"
                className="w-full h-[280px] sm:h-[400px] md:h-[520px] lg:h-[700px] object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            {/* Heading */}
            <div className='sm:px-4 md:px-8 lg:px-0'>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 leading-tight">
                Can't find what you <br /> are looking for?
              </h2>

              <p className="text-[#303539] text-base sm:text-lg md:text-xl font-medium leading-7 sm:leading-8 md:leading-9 mb-6">
                Let us know your requirements. We're always updating our listings and if a property
                comes up that matches what you need, you'll be the first to know, with early access
                before it goes live.
              </p>

              {/* Explore Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3 bg-[#126AD8] hover:bg-blue-400 text-white rounded-[8px] text-base font-semibold transition-colors duration-300"
              >
                Explore
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16 lg:mt-20 sm:px-4 md:px-8 lg:px-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 hover:bg-blue-100 rounded-xl p-6 text-center h-[200px] transition-colors duration-300 border border-[#B6D1F3]"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {typeof feature.icon === 'string' ? (
                        <img src={feature.icon} alt={feature.title} />
                      ) : (
                        feature.icon
                      )}
                    </div>
                  </div>

                  <h3 className="text-[#1D1F22] font-medium text-xl mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#1D1F22] text-xl font-medium">
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
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your business name"
                  />
                </div>

                {/* Email and Tel in one row for larger screens */}
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

                  {/* Tel */}
                  <div>
                    <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                      Telephone *
                    </label>
                    <input
                      type="tel"
                      id="tel"
                      name="tel"
                      value={formData.tel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Sq ft required and Locations in one row for larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sq ft required */}
                  <div>
                    <label htmlFor="sqftRequired" className="block text-sm font-medium text-gray-700 mb-1">
                      Sq ft Required *
                    </label>
                    <input
                      type="text"
                      id="sqftRequired"
                      name="sqftRequired"
                      value={formData.sqftRequired}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., 1000-2000 sq ft"
                    />
                  </div>

                  {/* Locations */}
                  <div>
                    <label htmlFor="locations" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Locations *
                    </label>
                    <input
                      type="text"
                      id="locations"
                      name="locations"
                      value={formData.locations}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., New York, Chicago"
                    />
                  </div>
                </div>

                {/* Additional Notes (Optional) */}
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Any additional requirements or comments..."
                  ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#126AD8] hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Submit Requirements
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