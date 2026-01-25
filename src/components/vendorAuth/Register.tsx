/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Check, User, Camera, ArrowLeft } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/features/auth/registerApi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useVerifyEmailMutation } from '@/redux/features/auth/verifyEmailApi';

interface UploadPhotoProps {
  onSelect: (imageFile?: File) => void;
}

interface VerificationProps {
  onSelect: () => void;
  email: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSkip = () => {
    onSelect();
  };

  const handleSendVerification = () => {
    onSelect(imageFile || undefined);
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
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

// Verification Component
const Verification: React.FC<VerificationProps> = ({ onSelect, email }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState('');
  const [verifyEmail] = useVerifyEmailMutation();

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

  const handleResendCode = async () => {
    try {
      setVerificationSuccess('Verification code resent successfully!');
      setTimeout(() => setVerificationSuccess(''), 3000);
    } catch (error) {
      console.log('error:', error);
      setVerificationError('Failed to resend code. Please try again.');
    }
  };

  const handleVerifyAccount = async () => {
    const otp = code.join('');

    if (otp.length !== 6) {
      setVerificationError('Please enter the 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');
    setVerificationSuccess('');

    try {
      const verificationData = {
        email: email,
        otp: otp,
        purpose: 'email_verification'
      };

      console.log('Sending verification data:', verificationData);
      const res = await verifyEmail(verificationData).unwrap();

      if (res?.message) {
        setVerificationSuccess('Account verified successfully! Redirecting to login...');
      }

    } catch (err: any) {
      console.error('Verification error:', err);
      setVerificationError(err?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
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
              We have sent a verification code to{' '}
              <span className="font-semibold text-gray-900">{email}</span>. Please enter the code below.
            </p>

            {/* Error Message */}
            {verificationError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                {verificationError}
              </div>
            )}

            {/* Success Message */}
            {verificationSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm text-center">
                {verificationSuccess}
              </div>
            )}

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
            disabled={isVerifying || code.join('').length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Register Component
const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registration' | 'upload' | 'verification'>('registration');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegistrationSubmit = async () => {
    // Validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate phone number format
    if (!phone || !phone.match(/^\+[1-9]\d{1,14}$/)) {
      setError('Please enter a valid phone number with country code');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone_number', phone || '');
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Call API
      const result = await register(formData).unwrap();

      setSuccess('Registration successful! Please check your email for verification.');
      console.log('Registration result:', result);

      // Move to upload photo step if image not uploaded yet
      if (!imageFile) {
        setActiveTab('upload');
      } else {
        setActiveTab('verification');
      }

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleUploadPhoto = (uploadedImageFile?: File) => {
    if (uploadedImageFile) {
      setImageFile(uploadedImageFile);
    }
    setActiveTab('verification');
  };

  const handleBackFromVerification = () => {
    setActiveTab('upload');
  };

  // Custom style for phone input
  const phoneInputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#EBF3FF',
    border: '1px solid transparent',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#1F2937',
    transition: 'all 0.2s ease',
  };

  const phoneInputFocusStyle = {
    backgroundColor: 'white',
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
    outline: 'none',
  };

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

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}

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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number with Country Code */}
              <div>
                <label htmlFor="phone" className="block text-md text-[#000000] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneInput
                    international
                    defaultCountry="BD"
                    onChange={(value) => setPhone(value || '')}
                    className="custom-phone-input"
                    style={{
                      '--PhoneInput-color--focus': '#3B82F6',
                      '--PhoneInputCountrySelectArrow-color': '#6B7280',
                      '--PhoneInputCountrySelectArrow-color--focus': '#3B82F6',
                      '--PhoneInputCountryFlag-borderColor': 'transparent',
                    } as React.CSSProperties}
                    inputStyle={phoneInputStyle}
                    inputClassName="custom-phone-input-field"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      Object.assign(e.target.style, phoneInputFocusStyle);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.backgroundColor = '#EBF3FF';
                      e.target.style.borderColor = 'transparent';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter phone number"
                  />
                  <style>{`
                    .custom-phone-input .PhoneInputInput {
                      background-color: #EBF3FF;
                      border: none;
                      outline: none;
                      padding-left: 8px;
                      font-size: 16px;
                      color: #1F2937;
                      width: 100%;
                    }
                    
                    .custom-phone-input .PhoneInputInput:focus {
                      background-color: white;
                      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                    }
                    
                    .custom-phone-input .PhoneInputCountry {
                      padding: 0 8px;
                      border-right: 1px solid #D1D5DB;
                    }
                    
                    .custom-phone-input .PhoneInputCountrySelect {
                      background-color: transparent;
                      border: none;
                    }
                    
                    .custom-phone-input .PhoneInputCountrySelect:focus {
                      outline: none;
                    }
                    
                    .PhoneInputCountryIcon {
                      border-radius: 2px;
                    }
                    
                    .PhoneInputCountrySelectArrow {
                      margin-left: 4px;
                    }
                  `}</style>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter phone number with country code (e.g., +8801302176538)
                </p>
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
                    placeholder="Enter your password"
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
                    placeholder="Confirm your password"
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
                onClick={handleRegistrationSubmit}
                disabled={isLoading}
                className="w-full bg-[#126AD8] cursor-pointer text-white font-medium py-3 px-4 rounded-[8px] transition shadow-sm mt-6 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Next'}
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
        return <UploadPhoto onSelect={handleUploadPhoto} />;
      case 'verification':
        return <Verification
          onSelect={handleBackFromVerification}
          email={email}
        />;
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