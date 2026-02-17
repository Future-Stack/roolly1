/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginImg from '../../assets/loginImg.svg'
import logoImg from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/features/auth/loginApi';
import { verifyToken } from '@/utils/verifyToken';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispacth = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const user = verifyToken(res?.access);
      dispacth(setUser({ user: user, token: res.access, refreshToken: res.refresh }));

      toast.success('Login Successful');

      if (res?.role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (res?.role === 'BROKER') {
        navigate('/broker-dashboard');
      } else {
        navigate('/vendor-dashboard');
      }

    } catch (err: any) {
      toast.error(err?.data?.non_field_errors[0])
    }

  };

  return (
    <div className="min-h-screen mb-6 px-8 py-6 flex gap-30">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden py-5">
        {/* Background layer */}
        <div className="absolute inset-0">
          <img
            src={loginImg}
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="text-2xl font-bold text-gray-900">broker</span>
            <span className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded-full">360</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#000000] mb-2 leading-11">
              Welcome Back to broker 360 !
            </h1>
            <p className="text-[#000000]">
              Log in to manage your listings.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-[#000000] mb-2">
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-base font-medium text-[#000000] mb-2">
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
              <div className="mt-2 text-right">
                <Link to="/forgot-password-req" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Forgot Password ?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#126AD8] hover:bg-[#126AD8]/80  text-white font-medium py-3 px-4 rounded-[8px] transition"
            >
              {`${isLoading ? 'Login....' : 'Login'}`}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600">
              I don't have an account ?{' '}
              <Link to="/register" className="text-blue-600 font-medium transition">
                Register
              </Link>
            </div>
          </form>

          {/* Mobile Showcase Text */}
          <div className="lg:hidden mt-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Showcase your properties
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in or create an account to access powerful listing tools and
              reach thousands of active dealers and buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;