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
    <div className="w-full mx-auto mt-6 sm:mt-10 lg:mt-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-semibold mb-8 sm:mb-12 mt-2 sm:mt-5">
          Featured Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((property: FeaturedProperty) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] p-3 transition-all duration-300 hover:shadow-md group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-3">
                <img
                  src={getImageUrl(property.image, property.property_type)}
                  alt={property.property_name}
                  className="w-full h-full rounded-[8px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#126AD8] font-bold text-xl sm:text-2xl">
                    {property.transaction === 'sale' ? 'For Sale' : 'For Lease'}
                  </span>
                  <div className="flex items-center bg-[#C8FFDD] py-1 px-2.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[#0C7233] text-[10px] sm:text-xs font-semibold ml-1.5 uppercase tracking-wider">
                      {property.transaction}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-gray-900 font-bold text-lg sm:text-xl line-clamp-1">
                    {property.property_name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shrink-0 ${property.property_type === 'office' ? 'bg-blue-100 text-blue-800' :
                    property.property_type === 'industrial' ? 'bg-orange-100 text-orange-800' :
                      property.property_type === 'retail' ? 'bg-purple-100 text-purple-800' :
                        property.property_type === 'land' ? 'bg-green-100 text-green-800' :
                          property.property_type === 'house' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {property.property_type}
                  </span>
                </div>

                <p className="text-[#82868A] leading-relaxed text-sm line-clamp-2 h-10">
                  {property.description}
                </p>

                <div className="text-gray-600 text-xs sm:text-sm flex items-center gap-1">
                  <span className="shrink-0">📍</span>
                  <span className="truncate">{property.location}</span>
                </div>

                <button
                  onClick={() => navigate(`/details/${property.id}`)}
                  className="w-full py-3 mt-2 border-2 border-[#126AD8] hover:bg-[#126AD8] hover:text-white text-[#126AD8] rounded-lg font-bold transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
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