import React from 'react';
import heroImg from '../../assets/hero.jpg'
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    // <div className='w-full mx-auto mt-8 sm:mt-12 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 '>
    <div className='w-full mx-auto my-8 sm:my-12 lg:my-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 '>
      <div className="relative overflow-hidden">
        <div className=''>
          {/* Background Image with Overlay */}
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.37) 0%, rgba(0, 0, 0, 0.37) 100%), url(${heroImg}) lightgray 50% / cover no-repeat`,
            }}
          ></div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">


            {/* Main Heading */}
            <h1 className="text-white text-center font-roboto text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 px-4 max-w-4xl">
              Bridging the gap between enquiry and opportunity
            </h1>

            {/* Subheading */}
            <p className="text-white text-center text-lg sm:text-2xl md:text-3xl font-roboto font-medium mb-8 sm:mb-10 md:mb-8 px-4 max-w-2xl">
              to create better connections
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
              <Link to='/all-properties'>
                <button className="bg-[#126AD8]  text-white font-semibold py-3 px-6 rounded-md border border-[#0D4B99] shadow-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Explore
                </button>
              </Link>


              {/* <button className=" text-white  font-semibold  py-3 px-6 rounded-md border border-white shadow-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ">
                Contact
              </button> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;