import logo from '../assets/logo.svg';
import loginIcon from '../assets/loginIcon.svg';
import { useNavigate } from 'react-router-dom';

const Broker360Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#F3F6F6] w-full">
      <div className="px-4 sm:px-5 lg:px-[200px] py-2.5 sm:py-3">
        <div className="flex items-center justify-between w-full">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Broker360 Logo" className="w-32 sm:w-36 md:w-40" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button className="px-3 sm:px-6 py-2 sm:py-3 text-black text-sm sm:text-base border font-inter border-[#444A50] rounded-xl transition duration-150 hover:bg-gray-100 whitespace-nowrap">
              List Your Property
            </button>

            <button className="px-3 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base font-inter bg-[#126AD8] rounded-xl transition duration-150 shadow-md hover:bg-blue-600 whitespace-nowrap">
              Give us a Call
            </button>

            <button
              onClick={() => navigate('/login')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center border border-[#126AD8] transition duration-150 hover:bg-gray-100"
            >
              <img src={loginIcon} alt="Login" className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Broker360Header;
