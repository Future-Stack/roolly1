import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import loginImg from '../../assets/loginImg.svg'
import logoImg from '../../assets/logo.svg'
import { Link,  } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen mb-6 px-8 py-6 flex gap-30">
      {/* Left Side - Image Section */}
    <div className="hidden lg:flex lg:w-1/2 relative rounded-2xl bg-gray-900 overflow-hidden  py-5">

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


      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 ">
        <div className="w-full ">
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
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Forgot Password ?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#126AD8]  text-white font-medium py-3 px-4 rounded-[8px] transition "
            >
              log in
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600">
              I don't have an account ?{' '}
              <Link to="/register" className="text-blue-600  font-medium transition">
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