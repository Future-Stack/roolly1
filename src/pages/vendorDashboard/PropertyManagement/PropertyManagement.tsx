import React from 'react';
import { Plus, Building2, Ruler, Maximize, ScanEye, MessageSquareText } from 'lucide-react';
import Pagination from '@/components/vendorDashboard/Leads/Pagination';
import { Link } from 'react-router-dom';

interface PropertyCard {
  id: string;
  price: string;
  title: string;
  address: string;
  propertyId: string;
  area: string;
  dimensions: string;
  status: 'Available';
  image: string;
}

const PropertyManagement: React.FC = () => {
  const properties: PropertyCard[] = [
    {
      id: '1',
      price: '$2,500',
      title: 'Premium Commercial Property',
      address: '6391 Elgin St. Celina, Delware 10299',
      propertyId: 'PR0001',
      area: 'X sq ft/m2 acres/hectares for land',
      dimensions: 'Length & Width-2400sq X 1200sq',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    },
    {
      id: '2',
      price: '$2,500',
      title: 'Premium Commercial Property',
      address: '6391 Elgin St. Celina, Delware 10299',
      propertyId: 'PR0001',
      area: 'X sq ft/m2 acres/hectares for land',
      dimensions: 'Length & Width-2400sq X 1200sq',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    },
    {
      id: '3',
      price: '$2,500',
      title: 'Premium Commercial Property',
      address: '6391 Elgin St. Celina, Delware 10299',
      propertyId: 'PR0001',
      area: 'X sq ft/m2 acres/hectares for land',
      dimensions: 'Length & Width-2400sq X 1200sq',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900 mb-1 leading-tight">
            Property Listings Management
          </h1>
          <p className="text-[15px] text-gray-600 font-normal">
            Create, edit, and manage all your property listings from one dashboard
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium text-[15px] transition-colors whitespace-nowrap self-start lg:self-auto">
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          Add New Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Properties Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <span className="text-[15px] text-gray-600 font-normal">Total Properties</span>
            <div className="w-10 h-10  flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[36px] font-bold text-gray-900">3</p>
        </div>

        {/* Available Properties Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <span className="text-[15px] text-gray-600 font-normal">Available Properties</span>
            <div className="w-10 h-10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[36px] font-bold text-gray-900">3</p>
        </div>

        {/* Total Views Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <span className="text-[15px] text-gray-600 font-normal">Total views</span>
            <div className="w-10 h-10  flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[36px] font-bold text-gray-900">1000</p>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
         <div className='bg-white rounded-lg border border-gray-200 p-3'>
             <div key={property.id} className="bg-white overflow-hidden">
            {/* Property Image */}
            <div className="relative w-full h-[280px]">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Property Details */}
            <div>
              {/* Price and Status */}
              <div className="flex items-center justify-between mb-3 mt-4">
                <span className="text-[24px] font-bold text-[#126AD8]">{property.price}</span>
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#0C7233] bg-[#C8FFDD] p-1.5 rounded-2xl">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  {property.status}
                </span>
              </div>

              {/* border */}
              <div className='border-b border-gray-200 mb-3'>

              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-[#1D1F22] mb-2">
                {property.title}
              </h3>

              {/* Address */}
              <p className="text-[14px] text-[#82868A] font-normal mb-3">
                {property.propertyId}: {property.address}
              </p>

              {/* Property Info */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-[13px] text-[#A9ACAF]">
                  <Ruler className="w-4 h-4" strokeWidth={2} />
                  <span>{property.area}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#A9ACAF]">
                  <Maximize className="w-4 h-4" strokeWidth={2} />
                  <span>{property.dimensions}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex-1 h-[44px] px-4 text-[15px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button className="flex-1 h-[44px] px-4 text-[15px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                  Delete
                </button>
               <Link to={`/vendor-dashboard/properties/1`}>
                <button className="w-[44px] h-[44px] flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ScanEye className="w-5 h-5 text-gray-700" strokeWidth={2} />
                </button>
               </Link>
                <button className="w-[44px] h-[44px] flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                 <MessageSquareText className="w-5 h-5 text-gray-700" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
         </div>
        ))}
      </div>
      <div className='mt-10'>
        <Pagination/>
      </div>
    </div>
  );
};

export default PropertyManagement;