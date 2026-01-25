/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Building2, Ruler, Maximize, ScanEye, MessageSquareText, X } from 'lucide-react';
import Pagination from '@/components/vendorDashboard/Leads/Pagination';
import { Link } from 'react-router-dom';
import { useGetAllVendorPropertyQuery } from '@/redux/features/vendor/getAllVendorPropertyApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteVendorPropertyMutation } from '@/redux/features/vendor/DeleteVendorPropertyApi';

interface Property {
  id: number;
  image: string;
  property_name: string;
  transaction: string;
  property_type: string;
  location: string;
  estimated_price: string;
  lease_duration: number;
  description: string;
  built_area: string;
  length_width: string;
  office_space?: string;
  eaves_height?: string;
  power_capacity?: string;
  phase?: string;
  roller_shutter_type?: string;
  shutters_height_width?: string;
  lighting_type?: string;
  epc_rating?: string;
  any_further_details?: string;
  yard_space?: boolean;
  yard_area?: string;
  yard_surface?: string;
  parking_include?: string;
  key_specification?: string;
  risk_level?: string;
  vehicle_repair_use?: boolean;
  vehicle_sale_use?: boolean;
  subletting?: boolean;
  leisure_use?: boolean;
  pet_business_use?: boolean;
  plastic_recycling_use?: boolean;
  whatsapp_number?: string;
  phone_number?: string;
  status?: string;
}

interface ApiResponse {
  results: Property[];
  count: number;
  next: string | null;
  previous: string | null;
}

const PropertyManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  const { data: apiResponse, isLoading, isError, refetch } = useGetAllVendorPropertyQuery({
    page: currentPage,
    page_size: 5 
  });

  const [deleteProperty, { isLoading: isDeleting }] = useDeleteVendorPropertyMutation();

  const propertiesData = apiResponse as ApiResponse;
  
  // Calculate stats
  const totalProperties = propertiesData?.count || 0;
  const availableProperties = propertiesData?.results?.filter(prop => prop.status === 'Available').length || 0;
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
    setDeleteError(null);
  };

  // Close delete modal
  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
    setDeleteError(null);
  };

  // Confirm and delete property
  const handleConfirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      const res = await deleteProperty(propertyToDelete.id).unwrap();
      console.log(res)
      
      // Show success message
      toast.success(`Property "${propertyToDelete.property_name}" deleted successfully!`);
      
      // Close modal
      handleCloseModal();
      
      refetch();
      
    } catch (error: any) {
      console.error('Delete error:', error);
      setDeleteError(error?.data?.message || 'Failed to delete property. Please try again.');
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProperties / 5);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading properties...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Error loading properties. Please try again.</div>
      </div>
    );
  }

  return (
    <>
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
          <Link to="/vendor-dashboard/add-property">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium text-[15px] transition-colors whitespace-nowrap self-start lg:self-auto">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              Add New Property
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Properties Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[15px] text-gray-600 font-normal">Total Properties</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
            </div>
            <p className="text-[36px] font-bold text-gray-900">{totalProperties}</p>
          </div>

          {/* Available Properties Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[15px] text-gray-600 font-normal">Available Properties</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
            </div>
            <p className="text-[36px] font-bold text-gray-900">{availableProperties}</p>
          </div>

          {/* Total Views Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[15px] text-gray-600 font-normal">Total views</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
            </div>
            <p className="text-[36px] font-bold text-gray-900">1000</p>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertiesData?.results?.map((property) => (
            <div key={property.id} className='bg-white rounded-lg border border-gray-200 p-3'>
              <div className="bg-white overflow-hidden">
                {/* Property Image */}
                <div className="relative w-full h-[280px]">
                  <img
                    src={property.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'}
                    alt={property.property_name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Property Details */}
                <div>
                  {/* Price and Status */}
                  <div className="flex items-center justify-between mb-3 mt-4">
                    <span className="text-[24px] font-bold text-[#126AD8]">
                      ${property.estimated_price}
                      {property.transaction === 'lease' ? '/month' : ''}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#0C7233] bg-[#C8FFDD] p-1.5 rounded-2xl">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      {property.status || 'Available'}
                    </span>
                  </div>

                  {/* border */}
                  <div className='border-b border-gray-200 mb-3'></div>

                  {/* Title */}
                  <h3 className="text-[17px] font-bold text-[#1D1F22] mb-2">
                    {property.property_name}
                  </h3>

                  {/* Address */}
                  <p className="text-[14px] text-[#82868A] font-normal mb-3">
                    PR{property.id.toString().padStart(4, '0')}: {property.location}
                  </p>

                  {/* Property Info */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-[13px] text-[#A9ACAF]">
                      <Ruler className="w-4 h-4" strokeWidth={2} />
                      <span>Built Area: {property.built_area} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-[#A9ACAF]">
                      <Maximize className="w-4 h-4" strokeWidth={2} />
                      <span>{property.length_width}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Link to={`/vendor-dashboard/edit-property/${property.id}`}>
                      <button className="flex-1 h-[44px] px-4 text-[15px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(property)}
                      className="flex-1 h-[44px] px-4 text-[15px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                    <Link to={`/vendor-dashboard/properties/${property.id}`}>
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

        {/* Show message if no properties */}
        {!propertiesData?.results?.length && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No properties found. Add your first property!</p>
          </div>
        )}

        {/* Pagination */}
        <div className='mt-10'>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                disabled={isDeleting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {deleteError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {deleteError}
                </div>
              )}

              <p className="text-gray-600 mb-4">
                Are you sure you want to delete the property 
                <span className="font-semibold text-gray-900"> "{propertyToDelete?.property_name}"</span>?
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. All property data, images, and related information will be permanently deleted.
              </p>

              {/* Property Preview */}
              {propertyToDelete && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={propertyToDelete.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop'}
                        alt={propertyToDelete.property_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{propertyToDelete.property_name}</h4>
                      <p className="text-sm text-gray-500">ID: PR{propertyToDelete.id.toString().padStart(4, '0')}</p>
                      <p className="text-sm text-gray-500">{propertyToDelete.location}</p>
                      <p className="text-sm text-gray-500">${propertyToDelete.estimated_price}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Property'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyManagement;