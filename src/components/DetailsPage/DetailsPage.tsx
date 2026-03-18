import { AlertCircle, ChevronLeft, ChevronRight, FileText, Home, Loader2, Mail, MessageCircle, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import playButton from '../../assets/play-button.png';
import { useGetUserPropertyDetailsQuery } from '@/redux/features/vendor/property/getPropertyDetailsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openChatbot, setChatbotView } from '@/redux/features/chatbot/chatbotSlice';

interface PropertyImage {
  image: string;
  name: string;
}

interface RelatedProperty {
  id: number;
  property_name: string;
  image: string;
  property_type: string;
  transaction: string;
  location: string;
  location_description: string;
}

interface PropertyDetails {
  id: number;
  images: PropertyImage[];
  related_properties: RelatedProperty[];
  property_name: string;
  postcode: string;
  transaction: string;
  pcm: string;
  pa:string;
  property_type: string;
  location: string;
  location_description: string;
  lease_duration: string | null;
  built_area: string;
  length_width: string;
  office_space: string;
  eaves_height: string;
  power_capacity: string;
  electricity_supply: string;
  roller_shutter_type: string;
  roller_shutters: number;
  dimensions_roller_shutter: string;
  lighting_type: string;
  epc_rating: string;
  ev_chaging: boolean;
  solar_panels: boolean;
  any_further_details: string;
  yard_space: string;
  yard_area: string;
  yard_surface: string;
  parking_include: number;
  key_specification: string;
  vehicle_repair_use: boolean;
  vehicle_sale_use: boolean;
  subletting: boolean;
  leisure_use: boolean;
  pet_business_use: boolean;
  plastic_recycling_use: boolean;
  floor_plans: boolean;
  other_restrictions: string | null;
  whatsapp_number: string;
  phone_number: string;
  email: string;
  occupied: boolean;
  brochure_pdf: string;
  brochure_video: string;
}


const HomePropertyDetails: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: propertyData, isLoading, error } = useGetUserPropertyDetailsQuery(id);

  const property: PropertyDetails | undefined = propertyData;
  console.log(property);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (path: string | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('https')) return path;
    return `https://broker360re.com${path}`;
  };

  const propertyImages = property?.images?.map(img => getImageUrl(img.image)) || [];
  const totalImages = propertyImages.length;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };


  const handleDownloadBrochure = () => {
    if (property?.brochure_pdf) {
      const link = document.createElement('a');
      link.href = getImageUrl(property.brochure_pdf);
      link.download = `brochure_${property.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadFlyThrough = () => {
    if (property?.brochure_video) {
      const link = document.createElement('a');
      link.href = getImageUrl(property.brochure_video);
      link.download = `fly_through_${property.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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

  return (
    <div className="min-h-screen w-full mt-4 sm:mt-6 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 ">
      {/* Header */}
      <div className='border-b border-gray-200'>
        <h1 className="text-[22px] font-semibold text-gray-900 mb-6">
          Discover Every Detail About This Property
        </h1>
      </div>

      {/* Content */}
      <div className="py-6 bg-white rounded-md mt-3">
        <div className="">
          {/* Property Address & Price */}
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold text-[#082D5B] mb-2">
              {property?.property_name}
            </h2>

            <p className="text-md text-[#126AD8] font-medium mb-2">
              Price: £{parseInt(property?.pcm || property?.pa)}/{property?.pcm ? 'PCM':'PA'}
            </p>
            {/* <p className="text-md text-[#126AD8] font-medium mb-2">
              Built Area: {parseInt(property?.built_area)} Sqft
            </p> */}
            <div className="flex items-center gap-2 text-sm text-[#082D5B]">
              <Home size={16} />
              <span>{parseInt(property?.built_area)} Sqft - {property?.location}</span>({property?.postcode})
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image Carousel */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gray-900">
                {/* Main Image with increased height */}
                <div className="h-80 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px]">
                  <img
                    src={propertyImages[currentImage]}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {propertyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentImage ? 'bg-blue-600' : 'bg-gray-400'
                        }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {currentImage + 1} / {totalImages}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2 mt-3">
                {propertyImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative rounded-lg overflow-hidden border-2 ${index === currentImage ? 'border-blue-500' : 'border-transparent'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Investment Section */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#082D5B] mb-3">
                  Key Specifications
                </h3>
                {property?.key_specification ? (
                  <ul className="list-disc list-inside space-y-1 text-base text-gray-600 leading-relaxed mb-5">
                    {property.key_specification
                      .split('\n')
                      .map(line => line.trim())
                      .filter(line => line.length > 0)
                      .map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-base text-gray-600 leading-relaxed mb-5">
                    No key specifications available.
                  </p>
                )}
                {property?.any_further_details && (
                  <p className="text-base text-gray-600 leading-relaxed mb-5">
                    {property.any_further_details}
                  </p>
                )}
                <div className='border-b'></div>
              </div>

              {/* Facts & Features */}
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-[#082D5B] mb-4">
                  Facts & features
                </h3>
                <div className="flex gap-4">

                  <button onClick={() => handleDownloadBrochure()} className="flex items-center gap-2 px-6 py-1 border border-[#0D4B99] text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <FileText size={18} />
                    <span className="text-[14px] font-medium">Brochure</span>
                  </button>
                  <button onClick={() => handleDownloadFlyThrough()} className="flex items-center gap-2 px-6 py-3 border border-[#0D4B99] text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <img src={playButton} alt="play-button" className='w-8 h-8' />
                    <span className="text-[14px] font-medium">Fly Through</span>
                  </button>
                </div>
              </div>

              {/* Internals */}
              <div className='bg-[#E7F0FB] p-3 rounded-sm'>
                <h4 className="text-xl font-semibold text-gray-900">Internals</h4>
              </div>
              <div className="p-5 mb-4">
                <h5 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  <div className="flex text-sm">
                    <li className="text-gray-600">Area-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{parseInt(property?.built_area)} sq ft</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Type of roller shutter-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.roller_shutter_type ? property?.roller_shutter_type : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Length & Width-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.length_width ? property?.length_width : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Height & width of shutters-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.dimensions_roller_shutter ? property?.dimensions_roller_shutter  : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Office space included-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.office_space ? property?.office_space + ' sq ft' : 'N/A'} </span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Type of lighting-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.lighting_type === 'LED' ? 'LED' : 'Halogen'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Eaves height (m)-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.eaves_height ? property?.eaves_height : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">EPC Rating-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.epc_rating ? property?.epc_rating : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Power capacity-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">{property?.power_capacity ? property?.power_capacity + ' KVA' : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">User restrictions-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.other_restrictions || "None"}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Electricity supply-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.electricity_supply ? property?.electricity_supply : 'N/A'}</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Any further details-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.any_further_details ? property?.any_further_details : 'N/A'}</span>
                  </div>
                </div>
              </div>
               {/* Location Description */}
              <div className='bg-[#E7F0FB] p-3 rounded-sm'>
                <h4 className="text-xl font-semibold text-gray-900">Location Description</h4>
              </div>
              <div className='mt-0 py-5 px-2'>
                <p className="text-gray-700 ml-1 font-normal">{property?.location_description}</p>
              </div>



              {/* Externals */}
              <div className='bg-[#E7F0FB] p-3 rounded-sm'>
                <h4 className="text-xl font-semibold text-gray-900">Externals</h4>
              </div>
              <div className='mt-6 p-5'>
                <h5 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Yard space included-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.yard_space === "false"? 'No' : 'Yes'}</span>
                  </div>
                  {
                    property?.yard_space === "true" && (
                      <>
                      <div className="flex text-[13px]">
                        <li className="text-gray-600">Yard surface-</li>
                        <span className="text-gray-900 ml-1 font-medium">{property?.yard_surface}</span>
                      </div>
                      <div className="flex text-[13px]">
                        <li className="text-gray-600">Area of yard-</li>
                        <span className="text-gray-900 ml-1 font-medium">{property?.yard_area}</span>
                      </div>
                      </>

                    )
                  }
                  <div className="flex text-[13px]"> 
                    <li className="text-gray-600">Parking included-</li>
                    <span className="text-gray-900 ml-1 font-medium">{property?.parking_include}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* map */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen mt-6 mb-8 gap-y-3">
        {/* Left Side - Map */}
        <div className="w-full lg:w-1/2 h-80 lg:h-full relative">
          {/* Street View Button */}
          <button className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded shadow-lg z-10 transition-colors">
            Street View
          </button>

          {/* Embedded Google Map */}
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(property?.postcode || property?.location || 'Manchester')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
            <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center transition-colors">
              +
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center transition-colors">
              −
            </button>
          </div>
        </div>

        {/* Right Side - Contact Information */}
        <div className="p-4 w-full lg:w-1/2 h-auto bg-white lg:ml-8 flex flex-col justify-start lg:overflow-y-auto border border-[#B6D1F3] rounded-md max-w-full">
          {/* Contact Us Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-6 sm:mb-8">
              Get in touch to arrange a viewing or ask questions about this property.
            </p>

            {/* Contact Buttons */}
            <div className="space-y-4">
              {/* WhatsApp and Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href={`https://wa.me/${property?.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
                <a href={`tel:${property?.phone_number}`} className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <Phone size={20} />
                  {property?.phone_number}
                </a>
                <a href={`mailto:${property?.email || 'rob@broker360re.com'}`} className="bg-[#ffedd4] hover:bg-[#ffedd4] text-[#101828] font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <Mail size={20} />
                  {property?.email || 'rob@broker360re.com' }
                </a>
              </div>

              {/* Chat Now Button */}
              <button
                onClick={() => {
                  dispatch(setChatbotView('survey'));
                  dispatch(openChatbot());
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={20} />
                Chat Now
              </button>
            </div>
          </div>

          {/* Quick Facts Section */}
          <div>
            <h2 className="text-xl font-bold text-[#101828] mb-3">Quick Facts</h2>

            <div className="space-y-4">
              {/* Property ID */}
              <div className="flex justify-between items-center py-1 border-gray-200">
                <span className="text-gray-700 text-base font-medium">Property ID:</span>
                <span className="text-gray-900 text-base font-semibold">{property?.id}</span>
              </div>

              {/* Min. Financials */}
              {/* <div className="flex justify-between items-center py-1 border-gray-200">
                  <span className="text-gray-700 text-base font-medium">Min. Financials:</span>
                  <span className="text-gray-900 text-base font-semibold">{property?.min_financials}</span>
                </div> */}
            </div>
          </div>
        </div>
      </div>


      {/* properties card */}
      <div className='mb-8 mt-4'>
        <h1 className="text-2xl sm:text-3xl text-black font-semibold mb-12 mt-5">
          Related Properties
        </h1>

        {property?.related_properties?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {property?.related_properties?.slice(0, 4).map((relProperty) => (
            <div
              key={relProperty.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] p-3  transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={getImageUrl(relProperty.image)}
                  alt={relProperty.property_name}
                  className="w-full h-full rounded-[8px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#126AD8] font-semibold text-2xl">
                    {relProperty.property_type}
                  </span>
                  <div className="flex items-center bg-[#C8FFDD] py-1 px-2 rounded-[20px]">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#0C7233] text-xs font-medium ml-1">
                      {relProperty.transaction}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 font-semibold text-xl">
                    {relProperty.property_name}
                  </h3>
                </div>

                <p className="text-[#82868A] leading-5 text-sm mb-4 line-clamp-2">
                  {relProperty.location_description}
                </p>

                <button
                  onClick={() => navigate(`/details/${relProperty.id}`)}
                  className="w-full py-2.5 border-2 border-[#126AD8] hover:bg-gray-100 text-[#126AD8] rounded-md font-medium transition-all duration-300"
                >
                  View Details
                </button>

              </div>
            </div>
          ))}
        </div>
        ) : (
          <p className="text-gray-600 text-center">No related properties found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePropertyDetails;
