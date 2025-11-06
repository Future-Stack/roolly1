
 import logo from '../assets/logo.svg'
 import loginIcon from '../assets/loginIcon.svg'
const Broker360Header: React.FC = () => {
  return (
    <header className="bg-[#F3F6F6] w-full ">
      <div className=" px-4 sm:px-5 lg:px-[200px] py-2.5 sm:py-3  ">
        <div className="flex items-center justify-between ">
          {/* Logo */}
        <img src={logo} alt="" />

           {/* --- Buttons Section --- */}
      <div className="flex items-center gap-[18px]">
        
      
        <button className="px-6 py-3 text-black text-base border font-inter border-[#444A50]  rounded-xl   transition duration-150">
          List Your Property
        </button>

  
        <button className="px-6 py-3 text-white text-base font-inter bg-[#126AD8] rounded-xl transition duration-150 shadow-md">
          Give us a Call
        </button>

       
        <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-[#126AD8] transition duration-150">
       
         <img src={loginIcon} alt="" />
      
        </button>

      </div>
        </div>
      </div>
    </header>
  );
};

export default Broker360Header;
