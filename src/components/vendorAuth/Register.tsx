import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg'
import logoImg from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('Rob');
  const [email, setEmail] = useState('test@gmail.com');
  const [phone, setPhone] = useState('+44 7700 800000');
  const [password, setPassword] = useState('••••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const navigate = useNavigate()

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
          <div className="mb-8">
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
    <div className="w-8 h-8 border-2 border-gray-400 bg-white rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold mb-1">
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

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#000000] leading-10 mb-2">
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
              <label htmlFor="fullName" className="block text-xl text-[#000000] mb-2">
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
              <label htmlFor="email" className="block text-xl  text-[#000000] mb-2">
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
              <label htmlFor="phone" className="block text-xl text-[#000000] mb-2">
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
              <label htmlFor="password" className="block text-xl  text-[#000000] mb-2">
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
              <label htmlFor="confirmPassword" className="block text-xl text-[#000000] mb-2">
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
              onClick={()=> navigate('/upload_photo')}
              className="w-full bg-[#126AD8] cursor-pointer  text-white font-medium py-3 px-4 rounded-[8px] transition shadow-sm mt-6"
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
        </div>
      </div>
    </div>
  );
};

export default Register;