import { ChevronLeft, ChevronRight, FileText, Home } from 'lucide-react';
import React, { useState } from 'react';
import playButton from '../../../assets/play-button.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPropertyDetailsQuery } from '@/redux/features/vendor/property/getPropertyDetailsApi';

// interface PropertyImage {
//     name: string;
//     url: string;
// }

interface PropertyBroker {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
}

interface PropertyDetailsType {
    id: number;
    property_broker: PropertyBroker;
    property_name: string;
    existing_images: any;
    brochure_pdf_url: string | null;
    brochure_video_url: string | null;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    location_description: string;
    price:string;
    service_charge: string;
    insurance: string;
    business_rates: string;
    price_type: string;
    lease_duration: number | null;
    description: string;
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
    risk_level: string;
    vehicle_repair_use: boolean;
    vehicle_sale_use: boolean;
    subletting: boolean;
    leisure_use: boolean;
    pet_business_use: boolean;
    plastic_recycling_use: boolean;
    floor_plans: boolean;
    other_restrictions: string;
    whatsapp_number: string;
    phone_number: string;
    is_listed: boolean;
    occupied: boolean;
    created_at: string;
    updated_at: string;
    user: string;
}

const MEDIA_BASE_URL = 'https://broker360re.com';

const VendorPropertyDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const { data: property, isLoading } = useGetPropertyDetailsQuery(id);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading property details...</div>
            </div>
        );
    }

    // Error state
    // if (isError) {
    //     return (
    //         <div className="min-h-screen p-4">
    //             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
    //                 <div className="text-red-500 mb-4">Failed to load property details</div>
    //                 <p className="text-gray-400">Please try again later.</p>
    //             </div>
    //         </div>
    //     );
    // }

    if (!property) {
        return (
            <div className="min-h-screen p-4">
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <div className="text-gray-500 mb-4">Property not found</div>
                </div>
            </div>
        );
    }

    const propertyData = property as PropertyDetailsType;
    console.log(propertyData)

    // Helper to format image URL
    const getFullImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${MEDIA_BASE_URL}${url}`;
    };

    // Parse existing images - API might return array of objects, array of strings, or a string
    let parsedImages: string[] = [];
    if (Array.isArray(propertyData.existing_images)) {
        parsedImages = propertyData.existing_images
            .map(img => typeof img === 'string' ? img : img.url)
            .filter(Boolean)
            .map(getFullImageUrl);
    } else if (typeof propertyData.existing_images === 'string' && propertyData.existing_images.trim() !== '') {
        try {
            // Try to parse if it's a JSON string
            const jsonParsed = JSON.parse(propertyData.existing_images);
            if (Array.isArray(jsonParsed)) {
                parsedImages = jsonParsed
                    .map(img => typeof img === 'string' ? img : img.url)
                    .filter(Boolean)
                    .map(getFullImageUrl);
            } else {
                parsedImages = [getFullImageUrl(propertyData.existing_images)];
            }
        } catch (e) {
            // If not JSON, assume it's a single URL
            parsedImages = [getFullImageUrl(propertyData.existing_images)];
        }
    }
    console.log('parsedImages', parsedImages)

    // Use current images from API or fallback to dummy images
  
    const propertyImages = parsedImages.length > 0
        ? parsedImages
        : [
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



    // Helper function to format transaction type
    const formatTransaction = (transaction: string) => {
        return transaction.charAt(0).toUpperCase() + transaction.slice(1);
    };

    // Helper function to format property type
    const formatPropertyType = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    // Helper function to format boolean values
    const formatBoolean = (value: boolean) => {
        return value ? 'YES' : 'NO';
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-[22px] font-semibold text-gray-900 mb-1">
                    View Every Detail About This Property
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
                            {propertyData.property_name}
                        </h2>
                        <p className="text-md text-[#126AD8] font-medium mb-2">
                            Price: {propertyData.price_type === "sale" ? `£${Math.abs(parseInt(propertyData.price)).toLocaleString()}` : propertyData.price_type === "pcm" ? `£${Math.abs(parseInt(propertyData.price)).toLocaleString()}/PCM` : `£${Math.abs(parseInt(propertyData.price)).toLocaleString()}/PA`}

                        </p>
                        {propertyData.service_charge && <p className="text-sm text-gray-600 mb-1">Service Charge: £{propertyData.service_charge}</p>}
                        {propertyData.insurance && <p className="text-sm text-gray-600 mb-1">Insurance: £{propertyData.insurance}</p>}
                        {propertyData.business_rates && <p className="text-sm text-gray-600 mb-2">Business Rates: £{propertyData.business_rates}</p>}
                        <div className="flex items-center gap-2 text-sm text-[#082D5B]">
                            <Home size={16} />
                            <span>{parseFloat(propertyData.built_area).toLocaleString()} sq ft • {propertyData.location} {propertyData.postcode && `(${propertyData.postcode})`}</span>
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
                                        onError={(e) => {
                                            // Fallback image if URL fails
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop';
                                        }}
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
                            {parsedImages.length > 0 && (
                                <div className="grid grid-cols-5 gap-2 mt-3">
                                    {parsedImages.map((img, index) => (
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
                                                onError={(e) => {
                                                    // Fallback image if URL fails
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop';
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Details */}
                        <div>
                            {/* Investment Section */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-[#082D5B] mb-3">
                                    {propertyData.property_name}
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed mb-5">
                                    {propertyData.location_description || 'No description available.'}
                                </p>
                                <div className='border-b'></div>
                            </div>

                            {/* Facts & Features */}
                            <div className="mb-6">
                                <h3 className="text-[18px] font-semibold text-[#082D5B] mb-4">
                                    Facts & Features
                                </h3>
                                <div className="flex gap-4">
                                    {propertyData.brochure_pdf_url && (
                                        <a
                                            href={propertyData.brochure_pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-1 border border-[#0D4B99] text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                                        >
                                            <FileText size={18} />
                                            <span className="text-[14px] font-medium">Brochure</span>
                                        </a>
                                    )}
                                    {propertyData.brochure_video_url && (
                                        <a
                                            href={propertyData.brochure_video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <img src={playButton} alt="play-button" className="h-8 sm:h-10" />
                                        </a>
                                    )}
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
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.built_area ? parseFloat(propertyData.built_area).toLocaleString() + ' sq ft' : 'N/A'} 
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Type of roller shutter-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.roller_shutter_type || 'N/A'} {propertyData.roller_shutters ? `(${propertyData.roller_shutters} unit)` : ''}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Length & Width-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.length_width ? `${propertyData.length_width} m` : 'N/A'} 
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Dimensions of Roller Shutter-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.dimensions_roller_shutter || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Office space-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.office_space ? `${propertyData.office_space} sq m` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Type of lighting-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.lighting_type || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Eaves height-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.eaves_height ? `${propertyData.eaves_height} m` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">EPC Rating-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.epc_rating ?`${propertyData.epc_rating === 'U' ? 'Unknown' : propertyData.epc_rating + ' Amps or KVA'} ` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Power capacity-</li>
                                        <span className="text-gray-900 ml-1 font-medium text-md">
                                            {propertyData.power_capacity || 'N/A'}
                                        </span>
                                    </div>
                                    {/* <div className="flex text-[13px]">
                                        <li className="text-gray-600">User restrictions-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.u || 'N/A'}
                                        </span>
                                    </div> */}
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Single or Three phase-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.electricity_supply || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Any further details-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.any_further_details || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">EV Charging-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.ev_chaging)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Solar Panels-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.solar_panels)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Floor Plans-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.floor_plans)}
                                        </span>
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
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.yard_space === "false" ? "No" : "Yes"}
                                        </span>
                                    </div>
                                    {
                                        propertyData.yard_space === "true" && (
                                            <>
                                                <div className="flex text-[13px]">
                                                    <li className="text-gray-600">Yard surface-</li>
                                                    <span className="text-gray-900 ml-1 font-medium">
                                                        {propertyData.yard_surface || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="flex text-[13px]">
                                                    <li className="text-gray-600">Area of yard-</li>
                                                    <span className="text-gray-900 ml-1 font-medium">
                                                        {propertyData.yard_area ? `${propertyData.yard_area} sq ft` : 'N/A'}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Parking included-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.parking_include || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Restrictions */}
                            <div className='bg-[#E7F0FB] p-3 rounded-sm mt-6'>
                                <h4 className="text-xl font-semibold text-gray-900">Restrictions</h4>
                            </div>
                            <div className='mt-6'>
                                <h5 className="text-xl font-semibold text-gray-900 mb-3">Usage Restrictions</h5>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Vehicle repair use-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.vehicle_repair_use)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Vehicle sale use-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.vehicle_sale_use)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Subletting-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.subletting)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Leisure use-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.leisure_use)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Pet business use-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.pet_business_use)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Plastic recycling use-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {formatBoolean(propertyData.plastic_recycling_use)}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Risk level-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.risk_level || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex text-[13px]">
                                        <li className="text-gray-600">Other restrictions-</li>
                                        <span className="text-gray-900 ml-1 font-medium">
                                            {propertyData.other_restrictions || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className='bg-[#E7F0FB] p-3 rounded-sm mt-6'>
                                <h4 className="text-xl font-semibold text-gray-900">Contact Information</h4>
                            </div>
                            <div className='mt-6'>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">Property Owner:</div>
                                        <div className="text-gray-900 font-medium">
                                            {propertyData.property_broker.full_name}
                                        </div>
                                    </div>
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">Email:</div>
                                        <div className="text-gray-900 font-medium">
                                            {propertyData.property_broker.email}
                                        </div>
                                    </div>
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">Phone:</div>
                                        <div className="text-gray-900 font-medium">
                                            {propertyData.property_broker.phone_number}
                                        </div>
                                    </div>
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">WhatsApp:</div>
                                        <div className="text-gray-900 font-medium">
                                            {propertyData.whatsapp_number || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">Transaction Type:</div>
                                        <div className="text-gray-900 font-medium">
                                            {formatTransaction(propertyData.transaction)}
                                        </div>
                                    </div>
                                    <div className="text-[13px]">
                                        <div className="text-gray-600">Property Type:</div>
                                        <div className="text-gray-900 font-medium">
                                            {formatPropertyType(propertyData.property_type)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8">
                        <Link to={`/vendor-dashboard/property/${propertyData.id}`}>
                            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-sm transition-colors">
                                Update Property
                            </button>
                        </Link>
                        <button onClick={() => navigate('/vendor-dashboard/property')} className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[14px] font-medium rounded-sm transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorPropertyDetails;