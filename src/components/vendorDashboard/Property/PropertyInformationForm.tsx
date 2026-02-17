/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useGetSinglePropertyQuery } from '@/redux/features/vendor/getSinglePropertyApi';
import { ImageIcon, SquarePlay } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface ImageUpload {
    id: string;
    title: string;
    description: string;
    file?: File;
    preview?: string;
}

interface PropertyData {
    property_name: string;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    estimated_price: string;
    lease_duration: number;
    location_description: string;
    built_area: string;
    height_to_apex_pitch: string;
    length_width: string;
    office_space: string;
    eaves_height: string;
    power_capacity: string;
    electricity_supply: string;
    roller_shutter_type: string;
    roller_shutters: string;
    dimensions_roller_shutter: string;
    lighting_type: string;
    epc_rating: number;
    ev_chaging: boolean;
    solar_panels: boolean;
    any_further_details: string;
    yard_space: string;
    yard_area: string;
    yard_surface: string;
    parking_include: number;
    key_specification: string;
    // existing_images?: string;
    brochure_pdf_url?: string | null;
    brochure_video_url?: string | null;
    vehicle_repair_use: boolean;
    vehicle_sale_use: boolean;
    subletting: boolean;
    leisure_use: boolean;
    pet_business_use: boolean;
    plastic_recycling_use: boolean;
    floor_plans: boolean;
    other_restriction: boolean;
    existing_images?: Array<{
        name: string;
        url: string;
    }>;
    phase: number;
    shutters_height_width: string;
    risk_level: string;
}

const PropertyInformationForm: React.FC = () => {
    const { id } = useParams();
    const { data: singlePropertyData, isLoading, isError } = useGetSinglePropertyQuery(id!);
    console.log(singlePropertyData)

    const [propertyData, setPropertyData] = useState<PropertyData | null>(null);

    const [images, setImages] = useState<{ [key: string]: ImageUpload }>({
        aerial: { id: 'aerial', title: 'Aerial View', description: 'Overhead or drone shot showing building in context (site layout, access points).' },
        frontExternal: { id: 'frontExternal', title: 'Front External', description: 'Main frontage view from the street or approach road.' },
        externalRoller: { id: 'externalRoller', title: 'External – Roller Shutter', description: 'Close-up showing loading or vehicle access.' },
        internalFront: { id: 'internalFront', title: 'Internal – Front', description: 'Inside view facing towards front of the unit.' },
        internalRearLeft: { id: 'internalRearLeft', title: 'Internal – Rear (Left Side)', description: 'Rear area, left-hand view.' },
        internalRearRight: { id: 'internalRearRight', title: 'Internal – Rear (Right Side)', description: 'Rear area, left-hand view.' },
        internalSide: { id: 'internalSide', title: 'Internal – Side Angle', description: 'Diagonal shot showing depth and space.' },
        amenities: { id: 'amenities', title: 'Amenities', description: 'Cafeteria or canteen or office, kitchenette, reception, and toilets.' }
    });

    // Format transaction type
    const formatTransaction = (transaction: string) => {
        return transaction === 'lease' ? 'Lease' : 'Sale';
    };

    // Format property type
    const formatPropertyType = (type: string) => {
        const types: { [key: string]: string } = {
            'industrial': 'Industrial',
            'land': 'Land',
            'office': 'Office',
            'retail': 'Retail',
            'house': 'House',
            'other': 'Other'
        };
        return types[type] || type;
    };

    // Format boolean value
    const formatBoolean = (value: boolean | string) => {
        if (typeof value === 'string') {
            return value === 'true' ? 'Yes' : 'No';
        }
        return value ? 'Yes' : 'No';
    };

    // Format lighting type
    const formatLightingType = (type: number | string) => {
        return `Type ${type}`;
    };

    // Format EPC rating
    const formatEPCRating = (rating: number | string) => {
        return `Rating ${rating}`;
    };

    // Format phase
    // const formatPhase = (phase: number | string) => {
    //     return `${phase} Phase`;
    // };

    // Set existing images from backend
    useEffect(() => {
        if (singlePropertyData) {
            setPropertyData(singlePropertyData);

            // Map existing images to image slots
            const existingImages = singlePropertyData.existing_images || [];
            const imageKeys = Object.keys(images);

            const updatedImages = { ...images };
            existingImages.forEach((img: any, index: number) => {
                if (index < imageKeys.length) {
                    const key = imageKeys[index];
                    updatedImages[key] = {
                        ...updatedImages[key],
                        preview: img.url
                    };
                }
            });
            setImages(updatedImages);
        }
    }, [singlePropertyData]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading property information...</div>
            </div>
        );
    }

    if (isError || !propertyData) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-red-500">Error loading property information.</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Property Information
                    </h1>
                    <p className="text-base text-gray-600">
                        View property details
                    </p>
                </div>

                <div className='bg-white rounded-2xl px-4 pb-6 pt-12'>
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[15px] font-medium">
                                1
                            </div>
                            <div className="w-16 h-0.5 bg-gray-300"></div>
                            <Link to='risk'>
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[15px] font-medium">
                                    2
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Property Details Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Property details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            {/* Property name */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Property name
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    {propertyData.property_name}
                                </div>
                            </div>

                            {/* Transaction */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Transaction
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    {formatTransaction(propertyData.transaction)}
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Property Type
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    {formatPropertyType(propertyData.property_type)}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Location
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    {propertyData.location}
                                </div>
                            </div>

                            {/* Rent or purchase estimated price */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Price
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    £{propertyData.estimated_price} {propertyData.transaction === 'lease' ? '/month' : ''}
                                </div>
                            </div>

                            {/* lease Duration */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Minimum lease duration (years)
                                </label>
                                <div className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md flex items-center">
                                    {propertyData.lease_duration} years
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <label className="block text-base text-gray-900 mb-2">
                                Description
                            </label>
                            <div className="w-full px-3 py-2 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md min-h-[100px]">
                                {propertyData.location_description}
                            </div>
                        </div>
                    </div>

                    {/* Internal Specification */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Internal Specification
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-gray-200 rounded-lg p-2">
                            {/* Built Area */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Built Area (sq ft)
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.built_area} sq ft
                                </div>
                            </div>

                            {/* Eaves Height */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Eaves Height (m)
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.eaves_height} m
                                </div>
                            </div>

                            {/* Roller Shutter Type */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Type of roller shutter
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.roller_shutter_type}
                                </div>
                            </div>

                            {/* Number of Roller Shutters */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Number of Roller Shutters
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.roller_shutters}
                                </div>
                            </div>

                            {/* Length & Width */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Length & Width
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.length_width}
                                </div>
                            </div>

                            {/* Dimensions of roller shutter */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Dimensions of roller shutter
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.dimensions_roller_shutter}
                                </div>
                            </div>

                            {/* Office Space */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Office space included (sq ft)
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.office_space} sq ft
                                </div>
                            </div>

                            {/* Lighting Type */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Type of lighting
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatLightingType(propertyData.lighting_type)}
                                </div>
                            </div>

                            {/* Eaves Height */}
                            {/* <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Eaves height (ft)
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.eaves_height} ft
                                </div>
                            </div> */}

                            {/* EPC Rating */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    EPC Rating
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatEPCRating(propertyData.epc_rating)}
                                </div>
                            </div>
                            {/* EV Charging */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    EV Charging
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatBoolean(propertyData.ev_chaging)}
                                </div>
                            </div>

                            {/* Solar Panels */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Solar Panels
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatBoolean(propertyData.solar_panels)}
                                </div>
                            </div>

                            {/* Power Capacity */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Power capacity
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.power_capacity} kVA
                                </div>
                            </div>

                            {/* Electricity Supply */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Electricity Supply
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.electricity_supply}
                                </div>
                            </div>
                            {/* <div>
                                <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                    Phase
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatPhase(propertyData.phase)}
                                </div>
                            </div> */}

                            {/* Any further details */}
                            <div>
                                <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                    Any further details
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.any_further_details}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* External Specification */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            External Specification
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-gray-200 rounded-lg p-4">
                            {/* Yard Space */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Yard space included
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {formatBoolean(propertyData.yard_space)}
                                </div>
                            </div>

                            {/* Yard Surface */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Yard surface
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.yard_surface}
                                </div>
                            </div>

                            {/* Area of yard */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Area of yard (sq ft)
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.yard_area} sq ft
                                </div>
                            </div>

                            {/* Parking included */}
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Parking included
                                </label>
                                <div className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-gray-200 rounded-md flex items-center">
                                    {propertyData.parking_include} cars
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Specification */}
                    <div className="mb-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Key Specification
                        </h2>
                        <div className="w-full px-3 py-2 text-[13px] text-gray-900 bg-gray-100 border border-gray-300 rounded-md min-h-[80px]">
                            {propertyData.key_specification}
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="mb-6 border border-gray-200 rounded-lg p-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            Property Images
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            {Object.values(images).map((img) => (
                                <div key={img.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-base font-medium text-[#303539] mb-3">
                                        {img.title}
                                    </h3>

                                    <div className='flex justify-center'>
                                        <div className="w-[55%] h-[100px] bg-gray-100 rounded-md flex items-center justify-center mb-3 overflow-hidden">
                                            {img.preview ? (
                                                <img src={img.preview} alt={img.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center">
                                                    <ImageIcon className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
                                                    <span className="text-xs text-gray-500 mt-1">No image</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-[#6B21A8] mt-2 leading-tight bg-[#FAF5FF] p-1 text-center rounded-md">
                                        {img.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* File Upload Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Brochure PDF */}
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Brochure (PDF)
                            </h2>

                            <div className="border border-gray-300 rounded-lg p-6">
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-x-4">
                                    {/* Icon Section */}
                                    <div className="flex flex-col items-center justify-center bg-gray-100 mt-2 rounded-sm w-full sm:w-auto p-4">
                                        <ImageIcon className="w-22 h-12 text-gray-500" strokeWidth={1.5} />
                                    </div>

                                    {/* Text + Button Section */}
                                    <div className="text-center sm:text-left w-full">
                                        <p className="text-md text-gray-600 font-semibold">
                                            Property Brochure
                                        </p>

                                        <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                            {propertyData.brochure_pdf_url ? (
                                                <a
                                                    href={propertyData.brochure_pdf_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors text-[13px] font-medium w-full sm:w-auto"
                                                >
                                                    View PDF
                                                </a>
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded-sm text-[13px] font-medium w-full sm:w-auto">
                                                    No PDF Uploaded
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media Video */}
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Media (Video)
                            </h2>

                            <div className="border border-gray-300 rounded-lg p-6">
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-x-4">
                                    {/* Icon Section */}
                                    <div className="flex flex-col items-center justify-center bg-gray-100 mt-2 rounded-sm w-full sm:w-auto p-4">
                                        <SquarePlay className="w-22 h-12 text-gray-500" strokeWidth={1.5} />
                                    </div>

                                    {/* Text + Button Section */}
                                    <div className="text-center sm:text-left w-full">
                                        <p className="text-md text-gray-600 font-semibold">
                                            Property Video
                                        </p>

                                        <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                            {propertyData.brochure_video_url ? (
                                                <a
                                                    href={propertyData.brochure_video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors text-[13px] font-medium w-full sm:w-auto"
                                                >
                                                    View Video
                                                </a>
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded-sm text-[13px] font-medium w-full sm:w-auto">
                                                    No Video Uploaded
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center gap-3 mt-8">
                        <Link to={`/vendor-dashboard/edit-property/${id}`}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-colors">
                                Edit Property
                            </button>
                        </Link>
                        <Link to="/vendor-dashboard/properties">
                            <button className="text-gray-700 hover:text-gray-900 px-4 py-2 text-[14px] font-medium transition-colors rounded-md border border-gray-300">
                                Back to Properties
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyInformationForm;