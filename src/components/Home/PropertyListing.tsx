// import { useFeaturedPropertyQuery } from '@/redux/features/users/featuredPropertyApi';
// useGetAllUsersPropertyQuery removed as data comes from parent
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';

// Random image URLs for properties
const randomImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500&h=300&fit=crop'
];

// const MEDIA_BASE_URL = 'https://broker360re.com';

// Helper function to format image URL
const getFullImageUrl = (url: string | null | undefined) => {
  if (!url) return '';

  return `${url}`;
};

interface PropertyCardProps {
  id: number;
  image: string;
  // price: number;
  period: string;
  title: string;
  address: string;
  // bedrooms: number;
  // bathrooms: number;
  // privatePool: number;
  forRent: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  // price,
  period,
  title,
  address,
  // bedrooms,
  // bathrooms,
  // privatePool,
  forRent,
}) => {
  console.log(period, "period")

  return (
    <div className="bg-white p-1.5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-45 object-cover" />
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
        {/* <div className="flex items-baseline gap-1 mb-3">
          <span className="text-blue-600 text-xl font-bold">£{price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm">/{period}</span>
        </div> */}

        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-base mb-2">{title}</h3>

        {/* Address */}
        <p className="text-gray-500 text-sm mb-4">{address}</p>

        {/* Features */}
        {/* <div className="flex items-center gap-4 text-gray-600 text-xs mb-4">
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
        </div> */}


        {/* View Details Button */}
        <Link to={`/details/${id}`}>
          <button className="w-full py-2.5 border border-[#126AD8] rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

interface PropertyListingProps {
  search?: string;
  properties?: any[];
  isLoading?: boolean;
  radius?: number;
  onRadiusChange?: (radius: number) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({
  search,
  properties: passedProperties = [],
  isLoading = false,
  radius,
  onRadiusChange
}) => {
  // query map handled in parent if properties are passed
  // Helper function to get random image
  const getRandomImage = (propertyId: number) => {
    return randomImages[propertyId % randomImages.length];
  };

  // Transform API data to component data
  const transformProperties = () => {
    let propertiesList = Array.isArray(passedProperties)
      ? passedProperties
      : (passedProperties as any)?.results || [];

    if (!Array.isArray(propertiesList)) return [];

    // Limit to 4 for general view if no search
    const filteredList = search ? propertiesList : propertiesList.slice(0, 4);

    return filteredList.map((property: any) => {
      return {
        id: property.id,
        image: getFullImageUrl(property.image) || getRandomImage(property.id),
        period: property.transaction === 'sale' ? 'total' : 'month',
        title: property.property_name,
        address: property.location,
        forRent: property.transaction === 'lease',
      };
    });
  };

  const properties = transformProperties();

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="w-full p-2">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 p-1.5 rounded-lg">
                <div className="h-36 bg-gray-200 rounded"></div>
                <div className="p-1.5 mt-2">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {search ? `Properties in ${search}` : "Perfect Commercial Space Is Just a Pin Away"}
          </h1>
          {search && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Radius:</span>
                <select
                  value={radius || 5}
                  onChange={(e) => onRadiusChange?.(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 font-outfit"
                >
                  <option value={1}>1 Mile</option>
                  <option value={3}>3 Miles</option>
                  <option value={5}>5 Miles</option>
                  <option value={10}>10 Miles</option>
                  <option value={20}>20 Miles</option>
                  <option value={50}>50 Miles</option>
                  <option value={100}>100 Miles</option>
                </select>
              </div>
              <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </span>
            </div>
          )}
        </div>
        {search && (
          <p className="text-[10px] sm:text-xs text-gray-500 italic">Click markers on the map to switch areas</p>
        )}
      </div>

      {/* Property Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Building className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm sm:text-base font-medium font-outfit">No properties available in {search}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListing;