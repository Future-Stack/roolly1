/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForgotPassReqMutation } from '@/redux/features/auth/forgotPassReqApi';
import { toast } from 'react-toastify';

const ForgotPasswordReq = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [forgotPasswordReq] = useForgotPassReqMutation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgotPasswordReq(email).unwrap();
      console.log('API Response:', response);
      navigate('/verify-email');

      if (response?.message) {
        toast.success(response.message || 'Password reset link sent successfully!');
        // Navigate to verify email page with email in state
        navigate('/verify-email', { state: { email } });
      }

    } catch (error: any) {
      console.error('Forgot Password Error:', error);
      setError(error?.data?.email ? error.data.email[0] : 'An error occurred. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };


  const submitting = isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Back to login"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-blue-100 opacity-90 text-sm mt-1">
                  Enter your email to receive a reset link
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      disabled={submitting}
                      className={`block w-full pl-10 pr-4 py-3 text-base border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed`}
                      placeholder="you@example.com"
                      aria-describedby={error ? "email-error" : undefined}
                      required
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <div id="email-error" className="mt-2 flex items-start gap-2 text-sm text-red-600 animate-fade-in">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'}`}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Login
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
            >
              Contact Support
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordReq;