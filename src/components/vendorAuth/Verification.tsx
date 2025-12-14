/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

const Verification= ({ onSelect }: { onSelect: any }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    onSelect()
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
                  // ref={(el) => (inputRefs.current[index] = el)}
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

export default Verification;