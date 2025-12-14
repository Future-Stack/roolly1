import { ChevronLeft, ChevronRight, FileText, Home} from 'lucide-react';
import React, { useState } from 'react';
import playButton from '../../../assets/play-button.png'

const PropertyDetails: React.FC = () => {
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

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-[22px] font-semibold text-gray-900 mb-1">
                    View Every Detail About This Property Property
                </h1>
                <p className="text-[14px] text-gray-600">
                    Find the perfect buyer for your property — list it today!
                </p>
            </div>

            {/* Content */}
            <div className="px-2 sm:px-4 lg:px-6 py-6 bg-white rounded-md mt-5">
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
                                    <div>
                                        <img src={playButton} alt="play-button" className="h-8 sm:h-10" />
                                    </div>
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
                            <div className='mt-6'>
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

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8">
                        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-sm transition-colors">
                            Update Property
                        </button>
                        <button className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[14px] font-medium rounded-sm transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;