
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyEmailMutation } from '@/redux/features/auth/verifyEmailApi';
import { useResendOtpMutation } from '@/redux/features/auth/resendOtpApi';
import { toast } from 'react-toastify';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for 6 OTP digits
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Retrieve email from navigation state

    const [verifyEmail] = useVerifyEmailMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    const [timer, setTimer] = useState(60); // Countdown timer in seconds
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!email) {
            toast.error("Email not found. Please try again.");
            navigate('/forgot-password-req'); // Redirect if no email provided
        }
    }, [email, navigate]);


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);


    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            // Focus previous input
            const prevInput = (e.target as HTMLInputElement).previousSibling as HTMLInputElement;
            if (prevInput) prevInput.focus();
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setIsSubmitting(true);
        try {
            await verifyEmail({ email, otp: otpValue, purpose: 'password_reset' }).unwrap(); // purpose: 'password_reset' based on user request
            toast.success('Email verified successfully!');
            navigate('/forgot-password-confirm', { state: { email } });
        } catch (error: any) {
            console.error('Verify Email Error:', error);
            toast.error(error?.data?.error || 'Verification failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            await resendOtp({ email, purpose: 'password_reset' }).unwrap(); // purpose: 'password_reset'
            toast.success('OTP resent successfully!');
            setTimer(60);
            setCanResend(false);
        } catch (error: any) {
            console.error('Resend OTP Error:', error);
            toast.error(error?.data?.error || 'Failed to resend OTP.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-sm text-gray-600">
                        We've sent a 6-digit code to <span className="font-semibold">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || otp.some(digit => !digit)}
                        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${isSubmitting || otp.some(digit => !digit)
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={handleResendOtp}
                        disabled={!canResend || isResending}
                        className={`flex items-center justify-center gap-2 mx-auto text-sm font-medium transition-colors ${!canResend || isResending
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-800'
                            }`}
                    >
                        <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                        {isResending ? 'Resending...' : canResend ? 'Resend Code' : `Resend in ${timer}s`}
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
