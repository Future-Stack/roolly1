/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';

const UploadPhoto = ({onSelect}:{onSelect:any}) => {
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

  const handleSkip = () => {
    console.log('Skip clicked');
  };

  const handleSendVerification = () => {
    onSelect()
  };

  return (
    <div className="w-full sm:mt-6 md:mt-16">
      {/* Skip Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleSkip}
          className="text-gray-900 text-base font-medium underline hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Upload Photo Card */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-[#B6D1F3] p-8 sm:p-12">
          {/* Avatar Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-white" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Camera size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-gray-900 text-xl font-bold mb-6">
            Upload Your Photo or logo
          </h2>

          {/* Upload Button */}
          <div className="flex justify-center">
            <label htmlFor="photo-upload">
              <div className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-8 py-3 rounded-md cursor-pointer transition-colors inline-block">
                Upload Photo
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Send Verification Button */}
      <div className="mt-8">
        <button
          onClick={handleSendVerification}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-6 py-3 rounded-lg transition-colors mb-6"
        >
          Send Verification code
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-900 text-sm">
          I don't have an account ?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UploadPhoto;