import React from 'react';
import locImg1 from '../../assets/searchLocation1.svg'
import locImg2 from '../../assets/searchLocation2.svg'
import locImg3 from '../../assets/searchLocation3.svg'
import locImg4 from '../../assets/searchLocation4.svg'

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
    <div className=" w-full bg-white py-12 px-4 sm:px-6 lg:px-8 mt-15 ">
      <div className="xl:mx-[200px]">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Title */}
          <div>
            <h1 className="text-4xl lg:text-5xl  font-semibold text-black">
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
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer transition-transform duration-300 "
            >
              {/* Background Image */}
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0  group-hover:bg-opacity-40 transition-all duration-300"></div>

              {/* Content */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                
                <button className="px-6 py-2 border-2 border-white text-white rounded-md font-medium mb-4 hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Explore
                </button>

               
                <h3 className="text-white text-xl font-bold text-center uppercase tracking-wide">
                  {location.name}
                </h3>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByLocation;