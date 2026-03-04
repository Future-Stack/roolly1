/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, ArrowLeft, Info, FileText } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/features/auth/registerApi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';

// Assets
import ImageIcon from '@/assets/imageIcon.svg';
import PdfIcon from '@/assets/pdfIcon.svg';

interface DocumentUploadCardProps {
  label: string;
  onSelect: (file: File) => void;
  selectedFile: File | null;
  type: 'image' | 'pdf';
}

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({ label, onSelect, selectedFile, type }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelect(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all shadow-sm h-[180px]"
    >
      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
        <img src={type === 'image' ? ImageIcon : PdfIcon} alt={label} className="w-8 h-8 opacity-40" />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center px-2 line-clamp-2 max-w-[100px]">
        {selectedFile ? selectedFile.name : label}
      </span>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={type === 'image' ? "image/*" : ".pdf,image/*"}
      />
    </div>
  );
};

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1 Data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Step 2 Data
  const [passport, setPassport] = useState<File | null>(null);
  const [driverLicence, setDriverLicence] = useState<File | null>(null);
  const [utilityBill, setUtilityBill] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [register, { isLoading }] = useRegisterMutation();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string[]> = {};
    if (!fullName) newErrors.full_name = ['Full name is required'];
    if (!email) {
      newErrors.email = ['Email is required'];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ['Enter a valid email address'];
    }
    if (!phone) {
      newErrors.phone_number = ['Phone number is required'];
    } else if (!/^\+?[0-9]+$/.test(phone)) {
      newErrors.phone_number = ['The phone number entered is not valid.'];
    }
    if (!password) {
      newErrors.password = ['Password is required'];
    } else if (password.length < 8) {
      newErrors.password = ['Password must be at least 8 characters'];
    }
    if (!confirmPassword) {
      newErrors.confirm_password = ['Confirm password is required'];
    } else if (password !== confirmPassword) {
      newErrors.confirm_password = ['Passwords do not match'];
    }
    if (!profileImage) {
      newErrors.image = ['Profile image or logo is required'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    } else {
      toast.error('Please correct the errors before proceeding');
    }
  };

  const renderError = (field: string) => {
    if (errors[field] && errors[field].length > 0) {
      return (
        <p className="text-red-500 text-xs mt-1 font-bold">
          {errors[field][0]}
        </p>
      );
    }
    return null;
  };

  const handleSubmitRegistration = async () => {
    setErrors({});
    if (!passport && !driverLicence) {
      toast.error('Please upload at least one identity document');
      return;
    }
    if (!utilityBill && !bankStatement) {
      toast.error('Please upload at least one address document');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone_number', phone || '');
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);

      if (profileImage) formData.append('image', profileImage);
      if (passport) formData.append('passport_image', passport);
      if (driverLicence) formData.append('driving_license', driverLicence);
      if (utilityBill) formData.append('utility_bill', utilityBill);
      if (bankStatement) formData.append('bank_statement', bankStatement);

      await register(formData).unwrap();
      setStep(3);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err?.status === 400 && err?.data) {
        setErrors(err.data);
        const firstErrorField = Object.keys(err.data)[0];
        const step1Fields = ['full_name', 'email', 'phone_number', 'password', 'confirm_password', 'image'];
        if (step1Fields.includes(firstErrorField)) {
          setStep(1);
          toast.error('Validation error in Registration step');
        } else {
          toast.error('Validation error in Document Upload step');
        }
      } else {
        toast.error(err?.data?.message || 'Registration failed');
      }
    }
  };

  // Custom style for phone input
  const phoneInputClass = "w-full px-4 py-3 bg-[#EBF3FF] border border-transparent rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-900";

  return (
    <div className="min-h-screen flex px-8 py-6 bg-white overflow-x-hidden">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden py-5">
        <div className="absolute inset-0">
          <img src={regiImg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex flex-col justify-between w-full h-full px-9 py-8">
          <Link to="/">
            <div className="flex items-center gap-2 bg-gray-200 rounded-[12px] px-4 py-2 shadow-lg w-max">
              <img src={logoImg} alt="logo" />
            </div>
          </Link>
          <div className="text-white">
            <h2 className="text-3xl font-semibold mb-3">Showcase your properties</h2>
            <p className="text-white text-base font-semibold leading-6">
              Sign in or create an account to access powerful listing tools <br />
              and reach thousands of active dealers and buyers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-6 lg:p-12 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-lg">
          {/* Progress Indicator */}
          <div className="mb-10 pt-4">
            <p className="text-sm font-bold text-[#10B981] mb-6">
              {step} of 3 steps completed
            </p>
            <div className="flex items-center justify-between relative px-2">
              {/* Connector Lines */}
              <div className="absolute top-4 left-0 w-full h-[1px] border-t-2 border-[#B6D1F3] border-dotted -z-10" />

              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all z-10
                    ${step >= s ? 'bg-white border-[#10B981] text-[#10B981]' : 'bg-white border-gray-300 text-gray-400'}
                  `}>
                    {s}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-2 font-medium ${step >= s ? 'text-black' : 'text-gray-400'}`}>
                    {s === 1 ? 'Registration' : s === 2 ? 'Upload' : 'Verification'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h1 className="text-[20px] md:text-[32px] font-bold text-gray-900 mb-2">Register and Get Started</h1>
                <p className="text-gray-900 font-medium">One Step Away From Getting Started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`${phoneInputClass} ${errors.full_name ? 'border-red-500 bg-red-50' : ''}`}
                    placeholder="Rob"
                  />
                  {renderError('full_name')}
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${phoneInputClass} ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                    placeholder="test1@gmail.com"
                  />
                  {renderError('email')}
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-2">Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry="GB"
                    value={phone}
                    onChange={setPhone}
                    className={`custom-phone-input ${errors.phone_number ? 'phone-input-error' : ''}`}
                    inputClassName={`${phoneInputClass} ${errors.phone_number ? 'border-red-500 bg-red-50' : ''}`}
                  />
                  {renderError('phone_number')}
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${phoneInputClass} ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
                      placeholder="**************"
                    />
                    {renderError('password')}
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-bold mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`${phoneInputClass} ${errors.confirm_password ? 'border-red-500 bg-red-50' : ''}`}
                      placeholder="**************"
                    />
                    {renderError('confirm_password')}
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {confirmPassword ? (showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />) : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className={`bg-white border-[1px] ${errors.image ? 'border-red-500 bg-red-50' : 'border-[#B6D1F3]'} rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center mt-6`}>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center overflow-hidden border border-blue-50">
                        {profileImagePreview ? (
                          <img src={profileImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <img src={ImageIcon} alt="upload" className="w-10 h-10 opacity-60" />
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">Upload Your Photo or logo</h3>
                    </div>
                    <label className="bg-[#126AD8] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                      Upload Photo
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                    </label>
                  </div>
                  {renderError('image')}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-[#126AD8] hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-8 shadow-sm transition-all text-sm uppercase tracking-wide"
                >
                  Next
                </button>

                <p className="text-center text-sm font-medium mt-6 text-gray-700">
                  I Already have an account ?{' '}
                  <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-500">
              <div className="mb-6">
                <h1 className="text-[32px] font-bold text-gray-900 mb-2">Identity Verification</h1>
                <div className="bg-[#EBF3FF] p-4 rounded-xl flex gap-3 items-start border border-blue-50">
                  <Info className="text-gray-900 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-[#126AD8] text-xs font-bold leading-relaxed">
                    You need to upload one document for better verification. Please provide all the required details.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <DocumentUploadCard
                  label="PASSPORT"
                  selectedFile={passport}
                  onSelect={setPassport}
                  type="image"
                />
                <DocumentUploadCard
                  label="DRIVER LICENCE"
                  selectedFile={driverLicence}
                  onSelect={setDriverLicence}
                  type="image"
                />
                {renderError('passport_image')}
                {renderError('driving_license')}
              </div>

              <div className="mb-6">
                <h1 className="text-[32px] font-bold text-gray-900 mb-2">Address Verification</h1>
                <div className="bg-[#EBF3FF] p-4 rounded-xl flex gap-3 items-start border border-blue-50">
                  <Info className="text-gray-900 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-[#126AD8] text-xs font-bold leading-relaxed">
                    You need to upload one document for better verification. Please provide all the required details.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DocumentUploadCard
                  label="UTILITY BILL"
                  selectedFile={utilityBill}
                  onSelect={setUtilityBill}
                  type="pdf"
                />
                <DocumentUploadCard
                  label="BANK STATEMENT"
                  selectedFile={bankStatement}
                  onSelect={setBankStatement}
                  type="pdf"
                />
                {renderError('utility_bill')}
                {renderError('bank_statement')}
              </div>

              <button
                onClick={handleSubmitRegistration}
                disabled={isLoading}
                className="w-full bg-[#126AD8] hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-10 shadow-sm transition-all disabled:opacity-50 text-sm uppercase tracking-wide"
              >
                {isLoading ? 'Processing...' : 'Verify Account'}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-2 text-gray-500 font-bold mt-4 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <p className="text-center text-sm font-medium mt-8 text-gray-700">
                I Already have an account ?{' '}
                <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in zoom-in duration-500 py-10">
              <div className="bg-[#EBF3FF] rounded-[40px] p-16 flex flex-col items-center justify-center text-center border border-blue-50">
                <div className="w-24 h-24 rounded-full bg-blue-100/50 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border-[8px] border-blue-200/30 animate-pulse"></div>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <FileText className="text-[#7C3AED] w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 px-4 leading-tight">Processing Your Application...</h1>
                <p className="text-gray-500 text-base font-medium max-w-[280px] mx-auto leading-relaxed">
                  We're verifying your documents and information. This may take a few moments.
                </p>
              </div>

              <button
                onClick={() => navigate('/admin-dashboard')}
                className="w-full bg-[#6B7280] text-white font-bold py-4 rounded-lg mt-12 shadow-sm transition-all text-sm uppercase tracking-wide"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-phone-input .PhoneInput {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .custom-phone-input .PhoneInputInput {
          background-color: #EBF3FF;
          border: 1px solid transparent;
          outline: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          color: #1F2937;
          width: 100%;
          transition: all 0.2s;
        }
        .custom-phone-input .PhoneInputInput:focus {
          background-color: white;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
        .custom-phone-input .PhoneInputCountry {
          display: flex;
          align-items: center;
          padding: 4px;
        }
      `}</style>
    </div>
  );
};

export default Register;