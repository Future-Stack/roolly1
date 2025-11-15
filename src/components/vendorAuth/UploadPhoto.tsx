import React, { useState } from 'react';
import {  Check, Upload,  } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg'
import logoImg from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';

const UploadPhoto: React.FC = () => {

   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const navigate = useNavigate()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleSkip = () => {
    console.log('Skipped photo upload');
  };



  return (
    <div className="min-h-screen flex gap-30 px-8 py-6 bg-gray-50">
      {/* Left Side - Image Section */}
    <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden  py-5">

  {/* Background layer */}
  <div className="absolute inset-0">
    <img
      src={regiImg}
      alt="background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* CONTENT WRAPPER - This makes padding work */}
  <div className="relative z-10 flex flex-col px-9 justify-between w-full h-full">

    {/* Logo */}
    <div className="flex items-center gap-2 bg-gray-200 rounded-[12px] px-4 py-2 shadow-lg w-max">
      <img src={logoImg} alt="logo" />
    </div>

    {/* Bottom Text */}
    <div className="text-white px-9">
      <h2 className="text-3xl font-semibold mb-3 leading-7">Showcase your properties</h2>
      <p className="text-ehite text-base font-semibold leading-6 mb-22 ">
        Sign in or create an account to access powerful listing tools <br />
        and reach thousands of active dealers and buyers.
      </p>
    </div>

  </div>
</div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center gap-30 p-6 ">
        <div className="w-full ">
          {/* Progress Section */}
          <div className="mb-40">
            <div className="flex items-center justify-between mb-6">
            
              <p className="text-sm text-gray-500">1 of 3 steps completed</p>
            </div>

            {/* Steps Indicator */}
          <div className="flex items-center gap-2 mb-6">

  {/* STEP 1 */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-8 h-8 border-2 border-green-600 bg-white rounded-full flex items-center justify-center text-green-600 text-sm font-semibold mb-1">
      <Check size={16} />
    </div>
    <span className="text-xs text-black font-medium">Registration</span>
  </div>

  {/* DOTTED LINE */}
  <div className="flex-1 h-0.5 border-t-2 border-dotted border-gray-400 -mt-4"></div>

  {/* STEP 2 */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-8 h-8 border-2 border-green-600 bg-white rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold mb-1">
      2
    </div>
    <span className="text-xs text-gray-500">Upload photo</span>
  </div>

  {/* DOTTED LINE */}
  <div className="flex-1 h-0.5 border-t-2 border-dotted border-gray-400 -mt-4"></div>

  {/* STEP 3 */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-8 h-8 border-2 border-gray-400 bg-white rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold mb-1">
      3
    </div>
    <span className="text-xs text-gray-500">Verification</span>
  </div>

</div>

          </div>

          <div className="w-full max-w-4xl">
        {/* Skip Button */}
        <div className="flex justify-end mb-7">
          <button
            onClick={handleSkip}
            className="text-gray-900 font-medium cursor-pointer hover:text-blue-600 transition underline"
          >
            Skip
          </button>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-2xl  border border-[#B6D1F3] p-8 md:p-12 lg:p-16">
          <div className="flex flex-col items-center justify-center">
            {/* Avatar Section */}
            <div className="relative mb-6">
              {/* Main Avatar Circle */}
              <div className="w-32 h-32 md:w-40 md:h-40  rounded-full flex items-center justify-center relative overflow-hidden">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Uploaded" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                    <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <path d="M54.6275 9.37263C48.5834 3.32863 40.5475 0 32 0C23.4525 0 15.4166 3.32863 9.3725 9.37263C3.32863 15.4166 0 23.4525 0 32C0 40.5475 3.32863 48.5834 9.3725 54.6274C15.4166 60.6714 23.4525 64 32 64C40.5475 64 48.5834 60.6714 54.6275 54.6274C60.6714 48.5834 64 40.5475 64 32C64 23.4525 60.6714 15.4166 54.6275 9.37263ZM32 60.25C23.6414 60.25 16.1204 56.5998 10.9435 50.8111C14.1529 42.3027 22.3685 36.25 32 36.25C25.7868 36.25 20.75 31.2132 20.75 25C20.75 18.7868 25.7868 13.75 32 13.75C38.2132 13.75 43.25 18.7868 43.25 25C43.25 31.2132 38.2132 36.25 32 36.25C41.6315 36.25 49.8471 42.3027 53.0565 50.8111C47.8796 56.5998 40.3586 60.25 32 60.25Z" fill="#418AFF"/>
</svg>
{/* <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9439 6.73005L13.9274 7.50998C13.8506 11.1376 10.843 14.0206 7.21534 13.9438L6.43541 13.9273C2.80775 13.8505 -0.0751669 10.8429 0.00161584 7.21523L0.0181236 6.4353C0.0949064 2.80764 3.1025 -0.0752774 6.73016 0.0015054L7.51009 0.0180132C11.1377 0.0947959 14.0207 3.10239 13.9439 6.73005ZM6.43948 7.4838L6.39158 9.74674C6.38554 10.0322 6.61727 10.274 6.90275 10.28C7.18823 10.2861 7.42997 10.0543 7.43602 9.76885L7.48391 7.50591L9.74685 7.55381C10.0323 7.55985 10.2741 7.32812 10.2801 7.04264C10.2862 6.75717 10.0544 6.51542 9.76896 6.50937L7.50602 6.46148L7.55392 4.19854C7.55996 3.91306 7.32823 3.67131 7.04275 3.66527C6.75728 3.65923 6.51553 3.89096 6.50949 4.17643L6.46159 6.43937L4.19865 6.39147C3.91317 6.38543 3.67142 6.61716 3.66538 6.90264C3.65934 7.18812 3.89107 7.42986 4.17655 7.43591L6.43948 7.4838Z" fill="#418AFF"/>
</svg> */}
</div>

                )}
              </div>

            
            </div>

            {/* Upload Text */}
            <h2 className="text-xl md:text-3xl font-semibold text-[#000000] leading-8 mb-8 text-center">
              Upload Your Photo or logo
            </h2>

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload Button */}
            <button
              onClick={handleUploadClick}
              className="bg-[#126AD8] cursor-pointer text-white font-medium py-3 px-8 rounded-[8px] transition shadow-sm flex items-center gap-2"
            >
              <Upload size={20} />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

  
          <div className="space-y-4">

           {/* Next Button */}
            <button
              onClick={()=> navigate('/verification')}
              className="w-full bg-[#126AD8] cursor-pointer  text-white font-medium py-3 px-4 rounded-[8px] transition shadow-sm mt-6"
            >
              Next
            </button>

            {/* Login Link */}
            <div className="text-center text-base font-medium text-gray-600 mt-4">
              I don't have an account ?{' '}
              <Link to="/login" className="text-[#126AD8] cursor-pointer font-medium transition">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;