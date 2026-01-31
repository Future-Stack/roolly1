import { useFeaturedPropertyQuery } from '@/redux/features/users/featuredPropertyApi';
import { useNavigate } from 'react-router-dom';

interface FeaturedProperty {
  id: number;
  property_name: string;
  image: string | null;
  property_type: string;
  transaction: 'sale' | 'lease';
  location: string;
  description: string;
}

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { data: featured, isLoading, error } = useFeaturedPropertyQuery(undefined);

  // Get default image URL
  const getImageUrl = (image: string | null, propertyType: string) => {
    if (image) return image;
    
    const defaultImages: Record<string, string> = {
      office: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop',
      industrial: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop',
      retail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
      land: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
      house: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop',
    };
    
    return defaultImages[propertyType] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop';
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <div>
          <h1 className="text-3xl sm:text-4xl text-black font-semibold mb-12 mt-5">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-64"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <h1 className="text-3xl sm:text-4xl text-black font-semibold mb-12 mt-5">
          Featured Properties
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Error loading featured properties</p>
        </div>
      </div>
    );
  }

  if (!featured || featured.length === 0) {
    return (
      <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <h1 className="text-3xl sm:text-4xl text-black font-semibold mb-12 mt-5">
          Featured Properties
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No featured properties available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
      <div>
        <h1 className="text-3xl sm:text-4xl text-black font-semibold mb-12 mt-5">
          Featured Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property: FeaturedProperty) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] p-3 transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={getImageUrl(property.image, property.property_type)}
                  alt={property.property_name}
                  className="w-full h-full rounded-[8px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#126AD8] font-semibold text-2xl">
                    {property.transaction === 'sale' ? 'For Sale' : 'For Lease'}
                  </span>
                  <div className="flex items-center bg-[#C8FFDD] py-1 px-2 rounded-[20px]">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#0C7233] text-xs font-medium ml-1">
                      {property.transaction === 'sale' ? 'Sale' : 'Lease'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 font-semibold text-xl">
                    {property.property_name}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${property.property_type === 'office' ? 'bg-blue-100 text-blue-800' :
                    property.property_type === 'industrial' ? 'bg-orange-100 text-orange-800' :
                      property.property_type === 'retail' ? 'bg-purple-100 text-purple-800' :
                        property.property_type === 'land' ? 'bg-green-100 text-green-800' :
                          property.property_type === 'house' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
                  </span>
                </div>

                <p className="text-[#82868A] leading-5 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="text-gray-600 text-sm mb-4">
                  📍 {property.location}
                </div>

                <button
                  onClick={() => navigate(`/property-details/${property.id}`)}
                  className="w-full py-2.5 border-2 border-[#126AD8] hover:bg-gray-100 text-[#126AD8] rounded-md font-medium transition-all duration-300"
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

export default FeaturedProperties;