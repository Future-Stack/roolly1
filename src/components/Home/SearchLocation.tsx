import React from 'react';
import locImg1 from '../../assets/searchLocation1.jpg'
import locImg2 from '../../assets/searchLocation2.jpg'
import locImg3 from '../../assets/searchLocation3.jpg'
import locImg4 from '../../assets/searchLocation4.jpg'

const SearchByLocation: React.FC = () => {
  const locations = [
    {
      name: 'MANCHESTER',
      image: locImg1,
    },
    {
      name: 'LIVERPOOL',
      image: locImg2,
    },
    {
      name: 'LANCASHIRE',
      image: locImg3,
    },
    {
      name: 'NORTH WALES',
      image: locImg4,
    },
  ];

  return (
    <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 ">
      <div className="">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl  font-semibold text-black">
              Search by Location
            </h1>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-800 text-base leading-6 font-inter ">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged.
            </p>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer 
                 transition-transform duration-300 hover:scale-105"
            >
              {/* Background Image */}
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 w-full h-full object-cover 
                   transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Center Button */}
                <div className="flex items-center justify-center flex-1">
                  <button
                    className="px-6 py-2 border-2 border-white text-white rounded-md font-medium
                 opacity-0 translate-y-4
                 group-hover:opacity-100 group-hover:translate-y-0
                 transition-all duration-300
                 hover:bg-white hover:text-gray-900"
                  >
                    Explore
                  </button>
                </div>

                {/* Bottom Title */}
                <h3 className="text-white text-xl font-bold text-center uppercase tracking-wide">
                  {location.name}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SearchByLocation;