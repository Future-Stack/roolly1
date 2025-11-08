import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import footerImg from '../assets/footerImg.png';
import logoImg from '../assets/logo.svg';

const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(${footerImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-12 px-4 sm:px-8 lg:px-16 xl:px-28">
        
        {/* Title */}
        <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 sm:mb-10 font-Inter">
          The future of commercial property
        </h1>

        {/* Contact Section */}
        <div className="w-full max-w-md bg-transparent text-center mb-10">
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 font-Inter">
            Contact Us
          </h3>

          {/* Email */}
          <div className="flex flex-col items-center gap-2 mb-5 text-white">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 p-2">
              <Mail size={18} />
            </div>
            <a href="mailto:rolo@mark30re.com" className="hover:text-gray-300 transition-colors">
              rolo@mark30re.com
            </a>
            <a href="mailto:matthew@mark30re.com" className="hover:text-gray-300 transition-colors">
              matthew@mark30re.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 p-2">
              <Mail size={18} />
            </div>
            <a href="tel:07717340048" className="hover:text-gray-300 transition-colors">
              07717 340 048
            </a>
            <a href="tel:07717678944" className="hover:text-gray-300 transition-colors">
              07717 678 944
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {["About", "Vendors", "Property", "Team"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo and Social */}
        <div className="bg-white rounded-xl shadow-lg w-full  p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={logoImg} alt="Logo" className="w-28 sm:w-36" />

          <div className="flex flex-col items-center gap-2">
            <span className="text-black text-base font-medium">Follow us</span>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 14 23" fill="none">
                  <path d="M12.3425 0.949219H9.23527C7.8618 0.949219 6.5446 1.49937 5.57341 2.47865C4.60223 3.45793 4.05662 4.78611 4.05662 6.17102V9.3041H0.949432V13.4815H4.05662V21.8364H8.19954V13.4815H11.3067L12.3425 9.3041H8.19954V6.17102C8.19954 5.89404 8.30866 5.6284 8.5029 5.43255C8.69713 5.23669 8.96057 5.12666 9.23527 5.12666H12.3425V0.949219Z" stroke="black" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 24 20" fill="none">
                  <path d="M23 1.01006C22.0424 1.68553 20.9821 2.20217 19.86 2.54006C19.2577 1.84757 18.4573 1.35675 17.567 1.13398C16.6767 0.911216 15.7395 0.967251 14.8821 1.29451C14.0247 1.62177 13.2884 2.20446 12.773 2.96377C12.2575 3.72309 11.9877 4.62239 12 5.54006V6.54006C10.2426 6.58562 8.50127 6.19587 6.93101 5.4055C5.36074 4.61513 4.01032 3.44869 3 2.01006C3 2.01006 -1 11.0101 8 15.0101C5.94053 16.408 3.48716 17.109 1 17.0101C10 22.0101 21 17.0101 21 5.51006C20.9991 5.23151 20.9723 4.95365 20.92 4.68006C21.9406 3.67355 22.6608 2.40277 23 1.01006V1.01006Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={22} color="black" />
              </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M5.57129 8.39941C6.12353 8.39941 6.57121 8.84719 6.57129 9.39941V23.7998C6.57108 24.3519 6.12344 24.7998 5.57129 24.7998H1C0.447962 24.7997 0.000209936 24.3518 0 23.7998V9.39941C7.67564e-05 8.84728 0.44788 8.39955 1 8.39941H5.57129ZM17.001 7.19922C19.1006 7.19942 21.1041 8.07574 22.5732 9.61816C24.0409 11.1592 24.8573 13.2401 24.8574 15.3994V23.7988C24.8574 24.351 24.4095 24.7986 23.8574 24.7988H19.2861C18.734 24.7987 18.2861 24.351 18.2861 23.7988V15.3994C18.286 15.0129 18.1394 14.6507 17.8926 14.3916C17.6475 14.1344 17.3254 13.9992 17.001 13.999C16.6763 13.999 16.3537 14.1343 16.1084 14.3916C15.8616 14.6508 15.7149 15.0129 15.7148 15.3994V23.7988C15.7148 24.351 15.2669 24.7986 14.7148 24.7988H10.1436C9.59127 24.7988 9.14355 24.3511 9.14355 23.7988V15.3994C9.14364 13.2401 9.96007 11.1592 11.4277 9.61816C12.897 8.07568 14.9012 7.19922 17.001 7.19922ZM2 22.7998H4.57129V10.3994H2V22.7998ZM17.001 9.19922C15.4639 9.19922 13.9785 9.84056 12.876 10.998C11.772 12.1573 11.1436 13.74 11.1436 15.3994V22.7988H13.7148V15.3994C13.7149 14.5132 14.0499 13.6535 14.6602 13.0127C15.2721 12.3703 16.1136 11.999 17.001 11.999C17.8883 11.9992 18.729 12.3703 19.3408 13.0127C19.9511 13.6536 20.286 14.5131 20.2861 15.3994V22.7988H22.8574V15.3994C22.8573 13.7399 22.2291 12.1574 21.125 10.998C20.0226 9.84049 18.538 9.19942 17.001 9.19922ZM3.28613 0C5.14599 0.000235244 6.57129 1.5693 6.57129 3.40039C6.57086 5.23113 5.14571 6.79957 3.28613 6.7998C1.42647 6.79966 0.000433128 5.23118 0 3.40039C0 1.56924 1.42619 0.000143351 3.28613 0ZM3.28613 2C2.62156 2.00015 2 2.58076 2 3.40039C2.00042 4.21958 2.62179 4.79966 3.28613 4.7998C3.95041 4.79956 4.57087 4.21951 4.57129 3.40039C4.57129 2.58083 3.95064 2.00024 3.28613 2Z" fill="black"/>
</svg>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-gray-300 mt-10 py-4 text-center text-white text-sm sm:text-base">
          <p>© 2025 All Rights Reserved | Privacy Policy • Terms of Use</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
