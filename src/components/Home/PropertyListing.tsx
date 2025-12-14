import React, { useState } from 'react';
import { ChevronDown, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  image: string;
  price: number;
  period: string;
  title: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  privatePool: number;
  forRent: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  price,
  period,
  title,
  address,
  bedrooms,
  bathrooms,
  privatePool,
  forRent,
}) => {
  return (
    <div className="bg-white p-1.5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        {forRent && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            For Rent
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-1.5">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-blue-600 text-xl font-bold">${price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm">/{period}</span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-base mb-2">{title}</h3>

        {/* Address */}
        <p className="text-gray-500 text-sm mb-4">{address}</p>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-600 text-xs mb-4">
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{bedrooms} bedroom</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} />
            <span>{bathrooms} bathroom</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={14} />
            <span>{privatePool} private pool</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full py-2.5 border border-[#126AD8] rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

const PropertyListing: React.FC = () => {
  const [sortOpen, setSortOpen] = useState(false);

  const properties: PropertyCardProps[] = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&h=300&fit=crop',
      price: 2500,
      period: 'year',
      title: 'Premium Family House',
      address: '6391 Elgin St. Celina, Delaware 10299',
      bedrooms: 4,
      bathrooms: 3,
      privatePool: 1,
      forRent: true,
    },
  ];

  return (
    <div>
      <div className="w-full p-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Perfect Commercial Space Is Just a Pin Away
          </h1>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-700 text-base">220 results</p>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-gray-700 text-base hover:text-gray-900"
              >
                Sort for you
                <ChevronDown size={20} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Price: Low to High
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Price: High to Low
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Newest First
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Most Popular
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;