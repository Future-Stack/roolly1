import React, { } from 'react';
import { properties } from '../../data/properties';
import mapImage from '../../assets/mapImg.svg';
import { useNavigate } from 'react-router-dom';

const MapPropertySection: React.FC = () => {
 // const [sortBy] = useState('Sort for you');
  const navigate = useNavigate();

  // Take first 6 properties for right side
  const rightSideProperties = properties.slice(0, 6);

  return (
    <div className="xl:mx-[200px] mt-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Map Image */}
        <div className="w-full lg:w-1/2 h-full rounded-xl overflow-hidden">
          <img src={mapImage} alt="map" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - 6 Property Cards in 2 Columns */}
        <div className="w-full lg:w-1/2 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rightSideProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#126AD8] font-semibold text-2xl">
                      {property.type}
                    </span>
                    <div className="flex items-center bg-[#C8FFDD] py-1 px-2 rounded-[20px]">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-[#0C7233] text-xs font-medium ml-1">
                        {property.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 font-semibold text-xl">
                      {property.title}
                    </h3>
                    <span className="text-gray-900 font-semibold text-xs ml-2">
                      {property.price}
                    </span>
                  </div>

                  <p className="text-[#82868A] leading-5 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <button
                    onClick={() => navigate(`/details/${property.id}`)}
                    className="w-full py-2.5 border-2 border-[#E7F0FB] text-[#126AD8] rounded-[12px] font-medium transition-all duration-300 hover:bg-[#126AD8] hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPropertySection;
