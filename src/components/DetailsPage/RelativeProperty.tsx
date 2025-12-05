import { properties } from '../../data/properties';
import { useNavigate } from 'react-router-dom';

const RelatedProperties = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="xl:mx-[100px]">

        <h1 className="text-4xl sm:text-5xl text-black font-semibold mb-12">
          Related Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden  border border-[#E7F0FB] p-3  transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full rounded-[8px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

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
                  className="w-full py-2.5 border-2 border-[#E7F0FB] text-[#126AD8] rounded-[12px] cursor-pointer font-medium transition-all duration-300"
                >
                  View Details
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RelatedProperties;
