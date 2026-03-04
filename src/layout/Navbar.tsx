import logo from '../assets/logo.svg';
import loginIcon from '../assets/loginIcon.svg';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Broker360Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDetailsPage = location.pathname === `/details/${id}`;
  return (
    <header className={`${isDetailsPage ? 'bg-white shadow-md' : 'bg-[#0000002E]'} w-full fixed top-0 left-0 right-0 z-50`}>
      <div className="px-4 sm:px-6 lg:px-[200px] py-2.5 sm:py-3">
        <div className="flex items-center justify-between w-full">
          {/* Mobile Hamburger Menu (Left side) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition duration-150 ${isDetailsPage
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
                }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Logo (Centered on mobile, left on desktop) */}
          <div className="flex-shrink-0 lg:flex-1">
            <Link to="/" className="flex justify-center lg:justify-start">
              <img src={logo} alt="Broker360 Logo" className="w-32 sm:w-36 md:w-40" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <button className="px-6 py-2.5 text-black text-lg border font-inter border-[#444A50] rounded-md transition duration-150 hover:bg-gray-100 whitespace-nowrap">
                List Your Property
              </button>
            </Link>

            <a
              href="https://wa.me/447717340048"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-white text-lg font-inter bg-[#126AD8] rounded-md transition duration-150 shadow-md hover:bg-blue-600 whitespace-nowrap flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Give us a Call
            </a>

            <button
              onClick={() => navigate('/login')}
              className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-[#126AD8] transition duration-150 hover:bg-gray-100"
            >
              <img src={loginIcon} alt="Login" className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Login Icon (Right side - hidden on desktop) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => navigate('/login')}
              className={`p-2 rounded-md transition duration-150 ${isDetailsPage
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
                }`}
            >
              <img src={loginIcon} alt="Login" className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 animate-slideInLeft">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex-shrink-0 lg:flex-1">
                <Link to="/" className="flex justify-center lg:justify-start">
                  <img src={logo} alt="Broker360 Logo" className="w-32 sm:w-36 md:w-40" />
                </Link>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <div className="py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-150">
                  <span className="text-gray-700 font-medium">Home</span>
                </div>
              </Link>

              <Link to="/all-properties" onClick={() => setIsMenuOpen(false)}>
                <div className="py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-150">
                  <span className="text-gray-700 font-medium">All Properties</span>
                </div>
              </Link>

              <div>
                <a
                  href="https://wa.me/447717340048"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 bg-[#126AD8] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-150"
                >
                  <Phone className="w-4 h-4" />
                  Give us a Call
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
              <p className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} Broker360. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeaderSpacer: React.FC = () => {
  return <div className="h-16 sm:h-20" />;
};

export { HeaderSpacer };
export default Broker360Header;