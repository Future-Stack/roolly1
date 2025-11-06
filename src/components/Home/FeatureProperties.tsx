import React from 'react';
import propertyImg1 from '../../assets/featureproperty/FeaturePropertys1.svg'
import propertyImg2 from '../../assets/featureproperty/fetureProperty2.svg'
import propertyImg3 from '../../assets/featureproperty/fetureProperty3.svg'
import propertyImg4 from '../../assets/featureproperty/fetureProperty4.svg'

const FeaturedProperties: React.FC = () => {
  const properties = [
    {
      image: propertyImg1,
      type: 'POA',
      status: 'For Sale',
      title: 'Cotton Mill B9 TILEYARD',
      price: 'P 6391',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    },
    {
      image: propertyImg2,
      type: 'POA',
      status: 'For Sale',
      title: 'Cotton Mill B9 TILEYARD',
      price: 'P 6391',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    },
    {
      image: propertyImg3,
      type: 'POA',
      status: 'For Sale',
      title: 'Cotton Mill B9 TILEYARD',
      price: 'P 6391',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    },
    {
      image: propertyImg4,
      type: 'POA',
      status: 'For Sale',
      title: 'Cotton Mill B9 TILEYARD',
      price: 'P 6391',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    },
  ];

  return (
    <div className=" bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="xl:ml-[200px]">
        {/* Section Title */}
        <h1 className="text-4xl sm:text-5xl  text-black font-semibold mb-12">
          Featured Properties
        </h1>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div

              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] p-3 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Property Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full rounded-[8px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Property Details */}
              <div className="p-4">
                {/* POA and For Sale Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#126AD8] font-semibold text-2xl font-inter">
                    {property.type}
                  </span>
                  <div className="flex items-center bg-[#C8FFDD] py-1 px-2 rounded-[20px] space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#0C7233] text-xs font-medium">
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Title and Price */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 font-semibold text-xl">
                    {property.title}
                  </h3>
                  <span className="text-gray-900 font-semibold text-xs whitespace-nowrap ml-2">
                    {property.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#82868A] leading-5 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                {/* View Details Button */}
                <button className="w-full py-2.5 border-2 border-[#E7F0FB] text-[#126AD8] rounded-lg font-medium  cursor-pointer transition-all duration-300">
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

export default FeaturedProperties;