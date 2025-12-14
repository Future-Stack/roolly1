import { properties } from '@/data/properties';
import { ChevronLeft, ChevronRight, FileText, Home, MessageCircle, Phone } from 'lucide-react';
import React, { useState } from 'react';
import playButton from '../../assets/play-button.png';

const HomePropertyDetails: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);


  // 5 dummy images for carousel
  const propertyImages = [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop'
  ];

  const totalImages = propertyImages.length;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const latitude = 39.7392;
  const longitude = -104.9903;

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
              6391 Eigin St. Celina, Delware 10299
            </h2>
            <p className="text-md text-[#126AD8] font-medium mb-2">
              Offer from $2,500
            </p>
            <div className="flex items-center gap-2 text-sm text-[#082D5B]">
              <Home size={16} />
              <span>X sq ft/m2 acres/hectares for land</span>
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
                  Snap up This Great Investment
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-5">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
                <div className='border-b'></div>
              </div>

              {/* Facts & Features */}
              <div className="mb-6">
                <h3 className="text-[18px] font-semibold text-[#082D5B] mb-4">
                  Facts & features
                </h3>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-1 border border-[#0D4B99] text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <FileText size={18} />
                    <span className="text-[14px] font-medium">Brochure</span>
                  </button>
                   <button className="flex items-center gap-2 px-6 py-3 border border-[#0D4B99] text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <img src={playButton} alt="play-button" className='w-8 h-8'/>
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
                    <span className="text-gray-900 ml-1 font-medium text-md">X sq ft/m2 acres/hectares for land</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Type of roller shutter-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Length & Width-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">2400<sub>cm</sub> X 1200<sub>cm</sub></span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Height & width of shutters-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Office space included-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">YES</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Type of lighting-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Eaves height-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">800</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">EPC Rating-</li>
                    <span className="text-gray-900 ml-1 font-medium">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Power capacity-</li>
                    <span className="text-gray-900 ml-1 font-medium text-md">X<sub>KVA</sub></span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">User restrictions-</li>
                    <span className="text-gray-900 ml-1 font-medium">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Single or Three phase-</li>
                    <span className="text-gray-900 ml-1 font-medium">Three</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Any further details-</li>
                    <span className="text-gray-900 ml-1 font-medium">Three</span>
                  </div>
                </div>
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
                    <span className="text-gray-900 ml-1 font-medium">2400<sub>cm</sub> X 1200<sub>cm</sub></span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Yard surface-</li>
                    <span className="text-gray-900 ml-1 font-medium">Concrete/tarmac</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Area of yard-</li>
                    <span className="text-gray-900 ml-1 font-medium">YES</span>
                  </div>
                  <div className="flex text-[13px]">
                    <li className="text-gray-600">Parking included-</li>
                    <span className="text-gray-900 ml-1 font-medium">Three</span>
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
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.4859252474224!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd`}
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
        <div className="p-4 w-full lg:w-1/2 bg-white lg:ml-8 flex flex-col justify-start lg:overflow-y-auto border border-[#B6D1F3] rounded-md max-w-full">
          {/* Contact Us Section */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-6 sm:mb-8">
              Get in touch to arrange a viewing or ask questions about this property.
            </p>

            {/* Contact Buttons */}
            <div className="space-y-4">
              {/* WhatsApp and Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <Phone size={20} />
                  000 2569 06541
                </button>
              </div>

              {/* Chat Now Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
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
                <span className="text-gray-900 text-base font-semibold">1</span>
              </div>

              {/* Min. Financials */}
              <div className="flex justify-between items-center py-1 border-gray-200">
                <span className="text-gray-700 text-base font-medium">Min. Financials:</span>
                <span className="text-gray-900 text-base font-semibold">£4,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* properties card */}
      <div className='mb-8 mt-4'>
        <h1 className="text-2xl sm:text-3xl text-black font-semibold mb-12 mt-5">
          Related Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 4).map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E7F0FB] p-3  transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full rounded-[8px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
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
                  // onClick={() => navigate(`/details/${property.id}`)}
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

export default HomePropertyDetails;