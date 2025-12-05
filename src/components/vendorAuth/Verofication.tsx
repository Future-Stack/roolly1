import React, { useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import regiImg from '../../assets/registerImg.svg';
import logoImg from '../../assets/logo.svg';


const Verification: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleBack = () => {
    console.log('Going back');
  };

  const handleResendCode = () => {
    console.log('Resending code');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex gap-30 px-8 py-6">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden py-5">
        <div className="absolute inset-0">
          <img src={regiImg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex flex-col px-9 justify-between w-full h-full">
          <div className="flex items-center gap-2 bg-gray-200 rounded-[12px] px-4 py-2 shadow-lg w-max">
            <img src={logoImg} alt="logo" />
          </div>
          <div className="text-white px-9">
            <h2 className="text-3xl font-semibold mb-3 leading-7">Showcase your properties</h2>
            <p className="text-white text-base font-semibold leading-6 mb-22">
              Sign in or create an account to access powerful listing tools <br />
              and reach thousands of active dealers and buyers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center gap-30 p-6">
        <div className="w-full">
          {/* Progress Section */}
          <div className="mb-40">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">1 of 3 steps completed</p>
            </div>
            {/* Steps Indicator */}
            <div className="flex items-center mb-6">
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
                <div className="w-8 h-8 border-2 border-green-600 bg-white rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold mb-1">
                  3
                </div>
                <span className="text-xs text-gray-500">Verification</span>
              </div>
            </div>
          </div>

          {/* Verification Card */}
          <div className="bg-white rounded-2xl border border-[#E7F0FB] mb-9 p-8 md:p-10">
            <h1 className="text-3xl font-semibold text-[#020617] leading-11 text-center mb-4">Verification</h1>
            <p className="text-[#64748B] text-center mb-8 text-sm md:text-base">
              If you have an account, we have sent a code to{' '}
              <span className="font-semibold text-black">test@test17309u.com</span>. Enter it below.
            </p>

            {/* Code Input Fields */}
            <div className="flex justify-center gap-2 md:gap-3 mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-semibold bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              ))}
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-medium py-3 mb-4 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>

          {/* Resend Code Link */}
          <div className="text-center mt-8">
            <button
              onClick={handleResendCode}
              className="text-blue-600 mb-2 font-medium text-sm md:text-base transition"
            >
              Resend Code
            </button>
          </div>

          {/* Next Button */}
          <div className="space-y-4">
            <button className="w-full bg-[#126AD8] text-white font-medium py-3 px-4 rounded-[8px] transition shadow-sm mt-6">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
