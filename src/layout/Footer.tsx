import { Instagram, Mail, MessageCircle } from 'lucide-react';
import React from 'react';
import footerImg from '../assets/footerImg.png';
import logoImg from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate()
  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(${footerImg})`,
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-full py-8 px-4 sm:px-8 lg:px-16 xl:px-28">

        {/* Title */}
        <h1 className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 font-Inter">
          The future of commercial property
        </h1>
        <div className="w-full max-w-md bg-transparent text-center mb-8">
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 font-Inter">
            Contact Us
          </h3>
          <div className="flex flex-col items-center gap-2 mb-4 text-white">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 p-2">
              <Mail size={18} />
            </div>
            <a href="mailto:rob@broker360re.com" className="hover:text-gray-300 transition-colors">
              rob@broker360re.com
            </a>
            <a href="mailto:Matt@broker360re.com" className="hover:text-gray-300 transition-colors">
              Matt@broker360re.com
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 p-2">
              <MessageCircle size={18} />
            </div>
            <a href="https://wa.me/447717340059" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              WhatsApp: 07717340059
            </a>
            <a href="tel:07717340059" className="hover:text-gray-300 transition-colors">
              Call: 07717340059
            </a>
          </div>
        </div>


        {/* Logo and Social */}
        <div className="bg-white rounded-xl shadow-lg w-full p-2 sm:p-4 flex flex-col z-20 sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 -z-1">
          <img src={logoImg} alt="Logo" className="w-24 sm:w-32" />

          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-black text-sm sm:text-base font-medium">Follow us</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 14 23" fill="none">
                  <path d="M12.3425 0.949219H9.23527C7.8618 0.949219 6.5446 1.49937 5.57341 2.47865C4.60223 3.45793 4.05662 4.78611 4.05662 6.17102V9.3041H0.949432V13.4815H4.05662V21.8364H8.19954V13.4815H11.3067L12.3425 9.3041H8.19954V6.17102C8.19954 5.89404 8.30866 5.6284 8.5029 5.43255C8.69713 5.23669 8.96057 5.12666 9.23527 5.12666H12.3425V0.949219Z" stroke="black" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 24 20" fill="none">
                  <path d="M23 1.01006C22.0424 1.68553 20.9821 2.20217 19.86 2.54006C19.2577 1.84757 18.4573 1.35675 17.567 1.13398C16.6767 0.911216 15.7395 0.967251 14.8821 1.29451C14.0247 1.62177 13.2884 2.20446 12.773 2.96377C12.2575 3.72309 11.9877 4.62239 12 5.54006V6.54006C10.2426 6.58562 8.50127 6.19587 6.93101 5.4055C5.36074 4.61513 4.01032 3.44869 3 2.01006C3 2.01006 -1 11.0101 8 15.0101C5.94053 16.408 3.48716 17.109 1 17.0101C10 22.0101 21 17.0101 21 5.51006C20.9991 5.23151 20.9723 4.95365 20.92 4.68006C21.9406 3.67355 22.6608 2.40277 23 1.01006V1.01006Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} color="black" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 w-full pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-white text-sm sm:text-base gap-2 sm:gap-0">
            <p>© 2025 All Rights Reserved</p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/privecy-policy')} className='cursor-pointer'>Privacy Policy</button>
              <button onClick={() => navigate('/terms')} className='cursor-pointer'>Terms of Use</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
