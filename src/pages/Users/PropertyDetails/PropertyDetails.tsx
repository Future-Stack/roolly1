/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { 
  Loader2, MapPin, Building, Ruler, Phone,Check, X, 
  AlertCircle, Calendar, Zap, Layers, Warehouse,
  Maximize2, Shield, ParkingCircle, TreePine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetPropertyDetailsQuery } from "@/redux/features/broker/property/getPropertyDetailsApi";

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useGetPropertyDetailsQuery(id);
  console.log(property);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Property not found</h2>
          <p className="text-gray-500 mt-2">Unable to load property details</p>
        </div>
      </div>
    );
  }

  // Helper functions
  const formatTransaction = (transaction: string) => {
    return transaction === 'sale' ? 'For Sale' : 'For Rent';
  };


  const formatPropertyType = (type: string) => {
    const types: Record<string, string> = {
      industrial: 'Industrial',
      commercial: 'Commercial',
      residential: 'Residential',
      warehouse: 'Warehouse'
    };
    return types[type] || type;
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-sm text-gray-700 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/properties" className="text-sm text-gray-700 hover:text-blue-600">
                  Properties
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-500 truncate max-w-xs">
                  {property.property_name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {property.property_name}
                  </h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col items-end">
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg mb-2">
                    {formatTransaction(property.transaction)}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Maximize2 className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.built_area ? parseFloat(property.built_area).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Built Area (sqft)</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Building className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.office_space ? parseFloat(property.office_space).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Office Space</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <TreePine className="w-5 h-5 text-amber-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.yard_area ? parseFloat(property.yard_area).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Yard Area</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Warehouse className="w-5 h-5 text-purple-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPropertyType(property.property_type)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Property Type</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-gray-500" />
                  Description
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {property.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Key Specifications */}
              {property.key_specification && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-gray-500" />
                    Key Specifications
                  </h2>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-700">{property.key_specification}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Ruler className="w-4 h-4 mr-2" />
                      Dimensions
                    </span>
                    <span className="font-semibold">{property.length_width || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Eaves Height
                    </span>
                    <span className="font-semibold">{property.eaves_height || 'N/A'} ft</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Power Capacity
                    </span>
                    <span className="font-semibold">{property.power_capacity || 'N/A'} kW</span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Power Phase</span>
                    <span className="font-semibold">{property.electricity_supply || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Lighting Type</span>
                    <span className="font-semibold">{property.lighting_type || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">EPC Rating</span>
                    <span className="font-semibold">{property.epc_rating || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Yard & Shutter Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Yard Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yard Space</span>
                      <span className="font-medium">{property.yard_space || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yard Surface</span>
                      <span className="font-medium">{property.yard_surface || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Shutter Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roller Shutter Type</span>
                      <span className="font-medium">{property.roller_shutter_type || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shutter Dimensions</span>
                      <span className="font-medium">{property.dimensions_roller_shutter || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Permitted Uses */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Permitted Uses</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Vehicle Repair', value: property.vehicle_repair_use, icon: Car },
                  { label: 'Vehicle Sales', value: property.vehicle_sale_use, icon: Car },
                  { label: 'Subletting', value: property.subletting, icon: Building },
                  { label: 'Leisure', value: property.leisure_use, icon: TreePine },
                  { label: 'Pet Business', value: property.pet_business_use, icon: TreePine },
                  { label: 'Plastic Recycling', value: property.plastic_recycling_use, icon: TreePine }
                ].map((use, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${use.value
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <div className="mb-2">
                      {use.value ? (
                        <Check className="w-6 h-6 text-blue-600" />
                      ) : (
                        <X className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="text-sm font-medium text-center">
                      {use.label}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Related Properties */}
            {property.related_properties && property.related_properties.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {property.related_properties.slice(0, 3).map((related:any) => (
                    <Link
                      key={related.id}
                      to={`/property-details/${related.id}`}
                      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"}
                          alt={related.property_name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {related.property_name}
                        </h3>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{related.location}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-blue-600 font-medium">
                            {related.transaction === 'sale' ? 'For Sale' : 'For Rent'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatPropertyType(related.property_type)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Status & Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Status</h2>
              
              {/* Occupancy Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Occupancy</span>
                  {property.occupied ? (
                    <span className="flex items-center text-red-600">
                      <X className="w-4 h-4 mr-1" />
                      Occupied
                    </span>
                  ) : (
                    <span className="flex items-center text-blue-600">
                      <Check className="w-4 h-4 mr-1" />
                      Available
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${property.occupied ? 'bg-red-500 w-3/4' : 'bg-blue-500 w-full'}`}
                  ></div>
                </div>
              </div>

              {/* Parking */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 flex items-center">
                    <ParkingCircle className="w-4 h-4 mr-2" />
                    Parking Included
                  </span>
                  <span className="font-semibold">{property.parking_include || '0'} spots</span>
                </div>
              </div>

              {/* Lease Duration */}
              {property.lease_duration && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Lease Duration
                    </span>
                    <span className="font-semibold">{property.lease_duration} months</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <a href={`tel:${property.phone_number}`} className="text-gray-900 hover:text-blue-600 font-medium">
                        {property.phone_number}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-5 h-5 mr-3 mt-0.5 flex items-center justify-center flex-shrink-0">
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">WhatsApp Number</p>
                      <a 
                        href={`https://wa.me/${property.whatsapp_number.replace('+', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-blue-600 font-medium"
                      >
                        {property.whatsapp_number}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="mt-8 space-y-3">
                  <a 
                    href={`tel:${property.phone_number}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </a>
                  <a 
                    href={`https://wa.me/${property.whatsapp_number.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Details</h2>
              
              {property.any_further_details ? (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {property.any_further_details}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No additional details provided.</p>
              )}

              {/* Property ID */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property ID</span>
                  <span className="font-mono font-semibold text-gray-900">#{property.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;