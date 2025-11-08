import React, { useState,  } from 'react';
import { ChevronDown } from 'lucide-react';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import mapProperty1 from '../../assets/mapProperty/mapProperty1.svg';
import mapProperty2 from '../../assets/mapProperty/mapProperty2.svg';
import mapProperty3 from '../../assets/mapProperty/mapProperty3.svg';
import mapProperty4 from '../../assets/mapProperty/mapProperty4.svg';
import mapProperty5 from '../../assets/mapProperty/mapProperty5.svg';
import mapProperty6 from '../../assets/mapProperty/mapProperty6.svg';
import mapImage from '../../assets/mapImg.svg'

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

//const center = { lat: 39.9526, lng: -75.1652 }; // Example center (Philadelphia)

const MapPropertySection: React.FC = () => {
  const [sortBy] = useState('Sort for you');
  // const [zoom, setZoom] = useState(13);
  // const mapRef = useRef<google.maps.Map | null>(null);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // replace with your API key
  // });

  const properties = [
    {
      image: mapProperty1,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.9526, lng: -75.1652 },
    },
    {
      image: mapProperty2,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '8391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.96, lng: -75.17 },
    },
    {
      image: mapProperty3,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6381 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.948, lng: -75.16 },
    },
    {
      image: mapProperty4,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.954, lng: -75.18 },
    },
    {
      image: mapProperty5,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '8391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.958, lng: -75.16 },
    },
    {
      image: mapProperty6,
      price: '$2,500',
      period: '/year',
      badge: 'For Rent',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      beds: '4 bedrooms',
      baths: '4 bathrooms',
      size: '2 LivingRoom',
      position: { lat: 39.950, lng: -75.17 },
    },
  ];

  // const handleZoomIn = () => {
  //   if (mapRef.current) {
  //     const newZoom = Math.min(20, mapRef.current.getZoom()! + 1);
  //     mapRef.current.setZoom(newZoom);
  //     setZoom(newZoom);
  //   }
  // };

  // const handleZoomOut = () => {
  //   if (mapRef.current) {
  //     const newZoom = Math.max(1, mapRef.current.getZoom()! - 1);
  //     mapRef.current.setZoom(newZoom);
  //     setZoom(newZoom);
  //   }
  // };

  return (
    <div className="xl:mx-[200px] mt-20">
      <div className="flex flex-col lg:flex-row gap-2 h-full">
        {/* Left Side - Google Map */}
        {/* <div className="w-full lg:w-1/2 h-96 lg:h-full relative rounded-xl overflow-hidden">
          {isLoaded ? (
          <GoogleMap
  mapContainerStyle={mapContainerStyle}
  center={center}
  zoom={zoom}
  onLoad={(map: google.maps.Map) => {
    mapRef.current = map;
  }}
>
  {properties.map((property, idx) => (
    <Marker
      key={idx}
      position={property.position}
      title={property.title}
    />
  ))}
</GoogleMap>

          ) : (
            <p>Loading Map...</p>
          )}

        
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl font-bold">-</span>
            </button>
          </div>
        </div> */}
     <div className="w-full lg:w-1/2 h-full rounded-xl overflow-hidden">
    <img src={mapImage} alt="map" className="w-full h-full object-cover" />
  </div>

        {/* Right Side - Property Listings */}
        <div className="w-full lg:w-1/2 h-full bg-[#E7F0FB] rounded-xl overflow-hidden">
          <div className="p-2">
            {/* Header */}
            <div className="mb-6 border-b border-[#B6D1F3]">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-semibold leading-9 text-gray-900">
                  Perfect Commercial Space Is Just a Pin Away
                </h2>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center justify-between mt-4 mb-6">
                <p className="text-[#444A50] font-medium text-sm">
                  {properties.length} results
                </p>
                <button className="flex items-center space-x-2 px-4 py-2 transition-colors ">
                  <span className="text-sm text-gray-700">{sortBy}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
              {properties.map((property, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
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
                        <div className="h-2 w-2 rounded-full bg-[#0C7233]"></div>
                        {property.badge}
                      </div>
                    </div>

                    <h3 className="text-[#1D1F22] font-semibold mb-1 text-sm">
                      {property.title}
                    </h3>

                    <p className="text-[#82868A] text-xs mb-3 truncate">
                      {property.address}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 whitespace-nowrap">
                      <span>{property.beds}</span>
                      <span>•</span>
                      <span>{property.baths}</span>
                      <span>•</span>
                      <span>{property.size}</span>
                    </div>

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
  );
};

export default MapPropertySection;
