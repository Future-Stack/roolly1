import React, { useState, useRef} from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

// UploadPhoto Component Interface
interface UploadPhotoProps {
  onSelect: () => void;
}

// Verification Component Interface
interface VerificationProps {
  onSelect: () => void;
}

// UploadPhoto Component
const UploadPhoto: React.FC<UploadPhotoProps> = ({ onSelect }) => {
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
    onSelect();
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

// Import icons for UploadPhoto component
import { User, Camera } from 'lucide-react';

// Verification Component
const Verification: React.FC<VerificationProps> = ({ onSelect }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    onSelect();
  };

  const handleResendCode = () => {
    console.log('Resend code clicked');
  };

  const handleVerifyAccount = () => {
    console.log('Verify account clicked with code:', code.join(''));
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center pt-10 sm:pt-20 px-4">
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Verification Card */}
          <div className="bg-white rounded-lg border border-[#E7F0FB] p-6 sm:p-8 md:p-12 mb-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
              Verification
            </h1>

            {/* Description */}
            <p className="text-center text-gray-600 text-sm mb-6 sm:mb-8 leading-relaxed px-2">
              If you have an account, we have sent a code to{' '}
              <span className="font-semibold text-gray-900">test@test12309u.com</span>. Enter it below.
            </p>

            {/* Code Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-hidden">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-md focus:border-blue-600 focus:outline-none transition-colors flex-shrink-0"
                />
              ))}
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center hover:text-gray-400 justify-center gap-2 text-gray-900 text-sm sm:text-base font-medium mx-auto transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          {/* Resend Code Link */}
          <div className="text-center mb-6">
            <button
              onClick={handleResendCode}
              className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
            >
              Resend Code
            </button>
          </div>

          {/* Verify Account Button */}
          <button
            onClick={handleVerifyAccount}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors"
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Import ArrowLeft icon for Verification component
import { ArrowLeft } from 'lucide-react';

// Main Register Component
const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registration' | 'upload' | 'verification'>('registration');
  const [fullName, setFullName] = useState('Rob');
  const [email, setEmail] = useState('test@gmail.com');
  const [phone, setPhone] = useState('+44 7700 800000');
  const [password, setPassword] = useState('••••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'registration':
        return (
          <>
            {/* Form Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#000000] leading-10 mb-2">
                Register and Get Started
              </h1>
              <p className="text-[#000000] text-base leading-6">
                One Step Away From Getting Started
              </p>
            </div>

            {/* Registration Form */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-md text-[#000000] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900"
                  placeholder="Rob"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-md text-[#000000] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900"
                  placeholder="test@gmail.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-md text-[#000000] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900"
                  placeholder="+44 7700 800000"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-md text-[#000000] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900 pr-12"
                    placeholder="••••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-md text-[#000000] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-blue-50 border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900 pr-12"
                    placeholder="••••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setActiveTab('upload')}
                className="w-full bg-[#126AD8] cursor-pointer text-white font-medium py-3 px-4 rounded-[8px] transition shadow-sm mt-6"
              >
                Next
              </button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600 mt-4">
                I don't have an account ?{' '}
                <Link to="/login" className="text-[#126AD8] cursor-pointer font-medium transition">
                  Log in
                </Link>
              </div>
            </div>
          </>
        );
      case 'upload':
        return <UploadPhoto onSelect={() => setActiveTab('verification')} />;
      case 'verification':
        return <Verification onSelect={() => setActiveTab('upload')} />;
      default:
        return null;
    }
  };

  // Determine which steps are completed
  const getStepStatus = (step: number) => {
    if (step === 1) return 'completed';
    if (step === 2) return activeTab === 'upload' || activeTab === 'verification' ? 'current' : 'pending';
    if (step === 3) return activeTab === 'verification' ? 'current' : 'pending';
    return 'pending';
  };

  return (
    <div className="min-h-screen flex gap-30 px-8 py-6 bg-gray-50">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden py-5">
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
        <div className="relative z-10 flex flex-col justify-between w-full h-full px-6 sm:px-9 py-6 sm:py-8">

          {/* Logo - Top */}
          <div className="flex items-center gap-2 bg-gray-200 rounded-[12px] px-4 py-2 shadow-lg w-max">
            <img src={logoImg} alt="logo" />
          </div>

          {/* Bottom Text - Bottom */}
          <div className="text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 leading-7">Showcase your properties</h2>
            <p className="text-white text-sm sm:text-base font-semibold leading-6">
              Sign in or create an account to access powerful listing tools <br className="hidden sm:block" />
              and reach thousands of active dealers and buyers.
            </p>
          </div>

        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center gap-30 p-6">
        <div className="w-full">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {activeTab === 'registration' && '1 of 3 steps completed'}
                {activeTab === 'upload' && '2 of 3 steps completed'}
                {activeTab === 'verification' && '3 of 3 steps completed'}
              </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {/* STEP 1 - Registration */}
              <button
                onClick={() => setActiveTab('registration')}
                className="flex flex-col items-center flex-1 cursor-pointer"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1
                  ${getStepStatus(1) === 'completed'
                    ? 'bg-green-600 text-white border-2 border-green-600'
                    : getStepStatus(1) === 'current'
                      ? 'bg-white border-2 border-blue-600 text-blue-600'
                      : 'bg-white border-2 border-gray-400 text-gray-500'}
                `}>
                  {getStepStatus(1) === 'completed' ? <Check size={16} /> : '1'}
                </div>
                <span className={`
                  text-xs font-medium
                  ${getStepStatus(1) === 'completed' || getStepStatus(1) === 'current'
                    ? 'text-black'
                    : 'text-gray-500'}
                `}>
                  Registration
                </span>
              </button>

              {/* DOTTED LINE 1 */}
              <div className={`flex-1 h-0.5 border-t-2 -mt-4 ${getStepStatus(2) === 'completed' || getStepStatus(2) === 'current'
                  ? 'border-blue-600'
                  : 'border-gray-400 border-dotted'
                }`}></div>

              {/* STEP 2 - Upload Photo */}
              <button
                onClick={() => setActiveTab('upload')}
                className="flex flex-col items-center flex-1 cursor-pointer"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1
                  ${getStepStatus(2) === 'completed'
                    ? 'bg-green-600 text-white border-2 border-green-600'
                    : getStepStatus(2) === 'current'
                      ? 'bg-white border-2 border-blue-600 text-blue-600'
                      : 'bg-white border-2 border-gray-400 text-gray-500'}
                `}>
                  {getStepStatus(2) === 'completed' ? <Check size={16} /> : '2'}
                </div>
                <span className={`
                  text-xs font-medium
                  ${getStepStatus(2) === 'completed' || getStepStatus(2) === 'current'
                    ? 'text-black'
                    : 'text-gray-500'}
                `}>
                  Upload photo
                </span>
              </button>

              {/* DOTTED LINE 2 */}
              <div className={`flex-1 h-0.5 border-t-2 -mt-4 ${getStepStatus(3) === 'completed' || getStepStatus(3) === 'current'
                  ? 'border-blue-600'
                  : 'border-gray-400 border-dotted'
                }`}></div>

              {/* STEP 3 - Verification */}
              <button
                onClick={() => setActiveTab('verification')}
                className="flex flex-col items-center flex-1 cursor-pointer"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1
                  ${getStepStatus(3) === 'completed'
                    ? 'bg-green-600 text-white border-2 border-green-600'
                    : getStepStatus(3) === 'current'
                      ? 'bg-white border-2 border-blue-600 text-blue-600'
                      : 'bg-white border-2 border-gray-400 text-gray-500'}
                `}>
                  {getStepStatus(3) === 'completed' ? <Check size={16} /> : '3'}
                </div>
                <span className={`
                  text-xs font-medium
                  ${getStepStatus(3) === 'completed' || getStepStatus(3) === 'current'
                    ? 'text-black'
                    : 'text-gray-500'}
                `}>
                  Verification
                </span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderActiveTab()}

        </div>
      </div>
    </div>
  );
};

export default Register;