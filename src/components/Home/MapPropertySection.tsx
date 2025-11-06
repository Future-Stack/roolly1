import React, { useState } from 'react';
import {  ChevronDown, } from 'lucide-react';
import mapImg from '../../assets/mapImg.svg'
const MapPropertySection: React.FC = () => {
  const [sortBy, ] = useState('Sort for you');

  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '8391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
    {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6381 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '8391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
    },
  ];

  return (
    <div className="">
        <div className='xl:mx-[100px]'>
      <div className="flex flex-col lg:flex-row  gap-3 ">
        {/* Left Side - Map */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full relative">
          {/* Map Container */}
          {/* <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative">
            
            <div className="absolute inset-0 overflow-hidden">
      
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${Math.random() * 90 + 5}%`,
                    top: `${Math.random() * 90 + 5}%`,
                  }}
                >
                  <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              ))}
            </div>

            
            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div> */}
          <img src={mapImg} alt="" className='w-full h-full' />
        </div>

        {/* Right Side - Property Listings */}
        <div className="w-full lg:w-1/2 h-full  bg-[#E7F0FB] ">
          <div className="p-6">
            {/* Header */}
            <div className=" mb-6 border-b border-[#B6D1F3] ">
              <div className="flex items-center space-x-3">
            
                <div>
                  <h2 className="text-2xl font-semibold leading-9 text-gray-900">
                    Perfect Commercial Space Is Just a Pin Away
                  </h2>
                 
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center justify-between mb-6 ">
                 <p className="text-[#444A50] font-medium text-sm">220 results</p>
                <button className="flex items-center space-x-2 px-4 py-2 transition-colors">
                  <span className="text-sm text-gray-700">{sortBy}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

        {/* Property Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1  mt-8 justify-items-center">
  {properties.map((property, index) => (
    <div
      key={index}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Property Image */}
      <div className="aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* For Rent + Price */}
        <div className="flex items-center justify-between mb-2">
          

          <div>
            <span className="text-[#126AD8] font-semibold text-sm">
              {property.price}
            </span>
            <span className="text-[#82868A] text-xs ml-1">
              {property.period}
            </span>
          </div>
          <div className="bg-[#C8FFDD] flex items-center gap-1 text-[#0C7233] text-xs font-semibold px-3 py-1 rounded-md">
            <div className='h-2 w-2 rounded-full bg-[#0C7233]'></div>
            {property.badge}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#1D1F22] font-semibold mb-1 text-sm">
          {property.title}
        </h3>

        {/* Address */}
        <p className="text-[#82868A] text-xs mb-3 truncate">
          {property.address}
        </p>

     <div className="flex items-center justify-center gap-2 text-xs text-gray-600 whitespace-nowrap">
  <span>{property.beds}</span>
  <span>•</span>
  <span>{property.baths}</span>
  <span>•</span>
  <span>{property.size}</span>
</div>


        {/* View Details Button */}
        <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>


          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MapPropertySection;