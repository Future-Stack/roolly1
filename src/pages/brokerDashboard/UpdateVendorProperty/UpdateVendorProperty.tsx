/* eslint-disable @typescript-eslint/no-explicit-any */
import RiskProfileManagementForm from '@/components/brokerDashboard/BrokerProperty/RiskProfileManagementForm';
import { useGetSinglePropertyQuery } from '@/redux/features/broker/property/getSinglePropertyApi';
import { useUpdateBrokerPropertyMutation } from '@/redux/features/broker/property/updateBrokerPropertyApi';
import { useDeletePropertyImageMutation } from '@/redux/features/broker/property/deletePropertyImageApi';
import { ImageIcon, Plus, SquarePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ImageUpload {
    id: string;
    title: string;
    description: string;
    file?: File;
    preview?: string;
    existingUrl?: string;
    backendId?: number;
}

interface PropertyFormData {
    property_name: string;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    pcm: string;
    pa: string;
    lease_duration: number;
    location_description: string;
    built_area: string;
    length_width: string;
    office_space: string;
    eaves_height: string;
    power_capacity: string;
    electricity_supply: string;
    roller_shutter_type: string;
    roller_shutters: string;
    lighting_type: number | string;
    epc_rating: number | string;
    ev_chaging: boolean;
    solar_panels: boolean;
    any_further_details: string;
    yard_space: boolean;
    yard_area: string;
    yard_surface: string;
    parking_include: number | string;
    key_specification: string;
    brochure_pdf_url?: string | null;
    brochure_video_url?: string | null;
    vehicle_repair_use: boolean;
    vehicle_sale_use: boolean;
    subletting: boolean;
    leisure_use: boolean;
    pet_business_use: boolean;
    plastic_recycling_use: boolean;
    other_restrictions: string;
    dimensions_roller_shutter: string;
    existing_images: string;
    phone_number: string;
    whatsapp_number: string;
    email:string;
}


const UpdateVendorProperty: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateVendorProperty, { isLoading: isSubmitting }] = useUpdateBrokerPropertyMutation();
    const [deletePropertyImage] = useDeletePropertyImageMutation();
    const { data: propertyData, isLoading: isLoadingProperty } = useGetSinglePropertyQuery(id);
    console.log(propertyData)

    const [formData, setFormData] = useState<PropertyFormData>({
        property_name: '',
        transaction: 'sale',
        postcode: '',
        property_type: 'industrial',
        location: '',
        pcm: '',
        pa: '',
        lease_duration: 0,
        location_description: '',
        built_area: '',
        length_width: '',
        office_space: '',
        eaves_height: '',
        power_capacity: '',
        electricity_supply: '',
        roller_shutter_type: '',
        roller_shutters: '',
        dimensions_roller_shutter: '',
        lighting_type: '1',
        epc_rating: 1,
        any_further_details: '',
        yard_space: false,
        yard_area: '',
        yard_surface: 'Concrete',
        parking_include: 0,
        key_specification: '',
        vehicle_repair_use: false,
        vehicle_sale_use: false,
        subletting: false,
        leisure_use: false,
        pet_business_use: false,
        plastic_recycling_use: false,
        other_restrictions: '',
        ev_chaging: false,
        solar_panels: false,
        existing_images: '',
        phone_number: '',
        whatsapp_number: '',
        email:'',
    });

    const [priceType, setPriceType] = useState<'pcm' | 'pa' | ''>('');


    const [brochurePdfFile, setBrochurePdfFile] = useState<File | null>(null);
    const [brochureVideoFile, setBrochureVideoFile] = useState<File | null>(null);

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

    // Initialize form with existing property data
    useEffect(() => {
        if (propertyData) {
            setFormData({
                property_name: propertyData.property_name || '',
                transaction: propertyData.transaction || 'sale',
                property_type: propertyData.property_type || 'industrial',
                location: propertyData.location || '',
                pcm: propertyData.pcm || '',
                pa: propertyData.pa || '',
                lease_duration: propertyData.lease_duration || 0,
                location_description: propertyData.location_description || '',
                built_area: propertyData.built_area || '',
                length_width: propertyData.length_width || '',
                office_space: propertyData.office_space || '',
                eaves_height: propertyData.eaves_height || '',
                power_capacity: propertyData.power_capacity || '',
                electricity_supply: propertyData.electricity_supply?.toString() || '1',
                roller_shutter_type: propertyData.roller_shutter_type || '',
                roller_shutters: propertyData.roller_shutters || '',
                dimensions_roller_shutter: propertyData.dimensions_roller_shutter || '',
                lighting_type: propertyData.lighting_type?.toString() || '1',
                epc_rating: propertyData.epc_rating?.toString() || '1',
                any_further_details: propertyData.any_further_details || '',
                yard_space: propertyData.yard_space || false,
                yard_area: propertyData.yard_area || '',
                yard_surface: propertyData.yard_surface || 'Concrete',
                parking_include: propertyData.parking_include?.toString() || '0',
                key_specification: propertyData.key_specification || '',
                vehicle_repair_use: propertyData.vehicle_repair_use || false,
                vehicle_sale_use: propertyData.vehicle_sale_use || false,
                subletting: propertyData.subletting || false,
                leisure_use: propertyData.leisure_use || false,
                pet_business_use: propertyData.pet_business_use || false,
                plastic_recycling_use: propertyData.plastic_recycling_use || false,
                postcode: propertyData.postcode || '',
                ev_chaging: propertyData.ev_chaging || false,
                solar_panels: propertyData.solar_panels || false,
                other_restrictions: propertyData.other_restrictions || '',
                existing_images: propertyData.existing_images || '',
                phone_number: propertyData.phone_number || '',
                whatsapp_number: propertyData.whatsapp_number || '',
                email:propertyData.email || '',
            });
            // Determine price type from loaded data
            if (propertyData.pcm) setPriceType('pcm');
            else if (propertyData.pa) setPriceType('pa');

            // Set existing images
            if (propertyData.existing_images && propertyData.existing_images.length > 0) {
                const imageMap = { ...images };
                propertyData.existing_images.forEach((img: any, index: number) => {
                    const imageKeys = Object.keys(imageMap);
                    if (index < imageKeys.length) {
                        const key = imageKeys[index];
                        imageMap[key] = {
                            ...imageMap[key],
                            preview: img.url,
                            existingUrl: img.url,
                            backendId: img.id
                        };
                    }
                });
                setImages(imageMap);
            }

            // Set phone number from property owner if available
            if (propertyData.property_owner?.phone_number) {
                setFormData(prev => ({
                    ...prev,
                    phone_number: propertyData.property_owner.phone_number
                }));
            }
        }
    }, [propertyData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;


        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                [name]: checkbox.checked
            }));
        } else if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? 0 : parseFloat(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                toast.error(`Invalid file type: ${file.name}. Allowed types: .jpg, .jpeg, .png, .gif`);
                event.target.value = '';
                return;
            }

            const maxSizeMB = 10;
            if (file.size > maxSizeMB * 1024 * 1024) {
                toast.error(`Image file must be smaller than ${maxSizeMB}MB.`);
                event.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => ({
                    ...prev,
                    [id]: { ...prev[id], file, preview: reader.result as string }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = async (id: string) => {
        const image = images[id];
        // If image has a backend ID, delete it from the server
        if (image?.backendId) {
            try {
                await deletePropertyImage(image.backendId).unwrap();
                toast.success('Image deleted successfully');
            } catch (error) {
                console.error('Error deleting image:', error);
                toast.error('Failed to delete image from server');
                return;
            }
        }
        setImages(prev => ({
            ...prev,
            [id]: { ...prev[id], file: undefined, preview: undefined, existingUrl: undefined, backendId: undefined }
        }));
    };

    const handleBrochurePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Invalid file type. Please upload a PDF file.');
            e.target.value = '';
            return;
        }
        const maxSizeMB = 10;
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`PDF file must be smaller than ${maxSizeMB}MB.`);
            e.target.value = '';
            return;
        }
        setBrochurePdfFile(file);
        // toast.success(`PDF selected: ${file.name}`);
    };

    const handleBrochureVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            toast.error('Invalid file type. Please upload a video file.');
            e.target.value = '';
            return;
        }
        const maxSizeMB = 100;
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`Video file must be smaller than ${maxSizeMB}MB.`);
            e.target.value = '';
            return;
        }
        setBrochureVideoFile(file);
        // toast.success(`Video selected: ${file.name}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.property_name) {
                    toast.error('Property name is required');
                    return;
                } 
                if (!formData.postcode) {
                    toast.error('Postcode is required');
                    return;
                }
        
                if (!formData.location) {
                    toast.error('Location is required');
                    return;
                }
                if (!formData.property_type) {
                    toast.error('Property type is required');
                    return;
                }
                if (!formData.transaction) {
                    toast.error('Transaction type is required');
                    return;
                }
                if (!formData.pcm?.trim() && !formData.pa?.trim()) {
                    toast.error('Price is required');
                    return;
                }
                 if (!formData.location_description) {
                    toast.error('Location description is required');
                    return;
                }
                if (!formData.built_area) {
                    toast.error('Built area is required');
                    return;
                }
                if (!formData.email) {
                    toast.error('Email is required');
                    return;
                }
                if (!formData.whatsapp_number ) {
                    toast.error('Whatsapp number is required');
                    return;
                }
                if (!formData.phone_number) {
                    toast.error('Phone number is required');
                    return;
                }


        try {
            // Create FormData object
            const formDataToSend = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'images') {
                    // Skip non-backend fields
                    if (key === 'is_poa' || key === 'price_type') return;

                    // Only send the active price field
                    if (key === 'pcm') {
                        if (value && value.toString().trim() !== '') {
                            formDataToSend.append('pcm', value.toString());
                        }
                        return;
                    }
                    if (key === 'pa') {
                        if (value && value.toString().trim() !== '') {
                            formDataToSend.append('pa', value.toString());
                        }
                        return;
                    }

                    if (typeof value === 'boolean') {
                        formDataToSend.append(key, value ? 'true' : 'false');
                    } else if (value !== undefined && value !== null) {
                        formDataToSend.append(key, value.toString());
                    }
                }
            });

            // Add images with section-based filenames
            Object.entries(images).forEach(([key, img]) => {
                if (img.file) {
                    const extension = img.file.name.split('.').pop() || 'jpg';
                    formDataToSend.append('images', img.file, `${key}.${extension}`);
                }
            });

            // Add brochure files if present
            if (brochurePdfFile) {
                formDataToSend.append('brochure_pdf', brochurePdfFile);
            }

            if (brochureVideoFile) {
                formDataToSend.append('brochure_video', brochureVideoFile);
            }

            // Call API
            const response = await updateVendorProperty({
                id: id!,
                data: formDataToSend
            }).unwrap();

            if (response?.property_name) {
                toast.success('Property updated successfully!');
                navigate(`/broker-dashboard/properties/${id}`);
            }



        } catch (error) {
            console.error('Error updating property:', error);
            // Handle error (show error message to user)
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // Loading state
    if (isLoadingProperty) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading property details...</div>
            </div>
        );
    }

    // Options for dropdowns
    const transactionOptions = ['sale', 'lease'];
    const propertyTypeOptions = ['industrial', 'land', 'office', 'retail'];
    const yardSurfaceOptions = ['Concrete', 'Tarmac', 'Gravel', 'Grass', 'Other'];
    // const riskLevelOptions = ['low', 'medium', 'high'];
    const phaseOptions = ['Single phase', 'Three Phase'];
    const lightingTypeOptions = ['Halogen', 'LED',];
    const epcRatingOptions = ['1', '2', '3', '4', '5', '6', '7'];

    return (
        <div className="w-full min-h-screen">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Edit Property
                    </h1>
                    <p className="text-base text-gray-600">
                        Update property details for the perfect buyer or tenant.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='bg-white rounded-2xl px-4 pb-6 pt-4'>

                        {/* Property Details Section */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Property details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                {/* Property name */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Property name *
                                    </label>
                                    <input
                                        type="text"
                                        name="property_name"
                                        value={formData.property_name}
                                        onChange={handleInputChange}
                                        placeholder="Premium Commercial Property"
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>


                                {/* Transaction */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Transaction *
                                    </label>
                                    <select
                                        name="transaction"
                                        value={formData.transaction}
                                        onChange={handleInputChange}
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {transactionOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* PostCode */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Post Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleInputChange}
                                        placeholder="123456"
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>


                                {/* Property Type */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Property Type *
                                    </label>
                                    <select
                                        name="property_type"
                                        value={formData.property_type}
                                        onChange={handleInputChange}
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {propertyTypeOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="City, County"
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                  {/* Rent or purchase estimated price */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-base text-gray-900">
                                            Price (£) or POA *
                                        </label>
                                        {/* <label className="flex items-center gap-2 cursor-pointer">
                                             <input
                                                 type="checkbox"
                                                 name="is_poa"
                                                 checked={formData.is_poa}
                                                 onChange={handleInputChange}
                                                 className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                             />
                                             <span className="text-sm font-medium text-gray-700">POA</span>
                                         </label> */}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name={priceType === 'pcm' ? 'pcm' : 'pa'}
                                            value={formData.pcm || formData.pa}
                                            onChange={handleInputChange}
                                            placeholder={"e.g., 10000"}
                                            className={`w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            required
                                        />
                                    </div>

                                    {/* PCM / PA Selection */}
                                    <div className="flex items-center gap-4 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price_type"
                                                value="pcm"
                                                checked={priceType === 'pcm'}
                                                onChange={() => {
                                                    setPriceType('pcm');
                                                    setFormData(prev => ({ ...prev, pa: '', pcm: prev.pcm || prev.pa }));
                                                }}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">PCM (Per Month)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price_type"
                                                value="pa"
                                                checked={priceType === 'pa'}
                                                onChange={() => {
                                                    setPriceType('pa');
                                                    setFormData(prev => ({ ...prev, pcm: '', pa: prev.pa || prev.pcm }));
                                                }}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">PA (Per Annum)</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPriceType('');
                                                setFormData(prev => ({ ...prev, pcm: '', pa: '' }));
                                            }}
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                {/* lease Duration */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Minimum lease duration (years)
                                    </label>
                                    <input
                                        type="number"
                                        name="lease_duration"
                                        value={formData.lease_duration || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3"
                                        step="0.5"
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <label className="block text-base text-gray-900 mb-2">
                                    Location Description *
                                </label>
                                <textarea
                                    name="location_description"
                                    value={formData.location_description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 text-[13px] text-gray-900 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        {/* Internal Specification */}
                        <div className="mb-8">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Internal Specification
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-dashed border-[#EA4335] rounded-lg p-2">
                                {/* Built Area */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Built Area (sq ft)
                                    </label>
                                    <input
                                        type="text"
                                        name="built_area"
                                        value={formData.built_area}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1682.80"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="">
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Built Area (sq m)
                                    </label>
                                    <input
                                        type="text"
                                        readOnly

                                        value={
                                            formData.built_area
                                                ? (parseFloat(formData.built_area) / 10.76).toFixed(2)
                                                : ""
                                        }
                                        placeholder="Calculated automatically"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-gray-100 rounded-md cursor-not-allowed border border-gray-200"
                                    />
                                </div>

                                {/* Roller Shutter Type */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Type of roller shutter
                                    </label>
                                    <input
                                        type="text"
                                        name="roller_shutter_type"
                                        value={formData.roller_shutter_type}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Manual"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {/* Roller Shutters*/}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Roller Shutters
                                    </label>
                                    <input
                                        type="text"
                                        name="roller_shutters"
                                        value={formData.roller_shutters || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 10"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Length & Width */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Length & Width (m)
                                    </label>
                                    <input
                                        type="text"
                                        name="length_width"
                                        value={formData.length_width}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 53x58 ft"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Shutters Height & Width */}
                                {/* <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Height & width of shutters
                                    </label>
                                    <input
                                        type="text"
                                        name="shutters_height_width"
                                        value={formData.shutters_height_width}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2x4 ft"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div> */}

                                {/* Office Space */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Office space included (sq ft)
                                    </label>
                                    <input
                                        type="text"
                                        name="office_space"
                                        value={formData.office_space}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 481.32"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="">
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Office space included (sq m)
                                    </label>
                                    <input
                                        type="text"
                                        readOnly

                                        value={
                                            formData.office_space
                                                ? (parseFloat(formData.office_space) / 10.76).toFixed(2)
                                                : ""
                                        }
                                        placeholder="Calculated automatically"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-gray-100 rounded-md cursor-not-allowed border border-gray-200"
                                    />
                                </div>

                                {/* Lighting Type */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Type of lighting
                                    </label>
                                    <select
                                        name="lighting_type"
                                        value={formData.lighting_type}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {lightingTypeOptions.map(option => (
                                            <option key={option} value={option}>
                                                Type {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Eaves Height */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Eaves height (m)
                                    </label>
                                    <input
                                        type="text"
                                        name="eaves_height"
                                        value={formData.eaves_height}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 13.55"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* EPC Rating */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        EPC Rating
                                    </label>
                                    <select
                                        name="epc_rating"
                                        value={formData.epc_rating}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {epcRatingOptions.map(option => (
                                            <option key={option} value={option}>
                                                Rating {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Power Capacity */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Power capacity (Amps or KVA)
                                    </label>
                                    <input
                                        type="text"
                                        name="power_capacity"
                                        value={formData.power_capacity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 207.83"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Phase */}
                                <div>
                                    <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                        Electricity Supply
                                    </label>
                                    <select
                                        name="electricity_supply"
                                        value={formData.electricity_supply}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {phaseOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Any further details */}
                                <div>
                                    <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                        Any further details
                                    </label>
                                    <input
                                        type="text"
                                        name="any_further_details"
                                        value={formData.any_further_details}
                                        onChange={handleInputChange}
                                        placeholder="Additional details"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* External Specification */}
                        <div className="mb-8">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                External Specification
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-dashed border-[#EA4335] rounded-lg p-4">
                                {/* Yard Space */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Yard space included
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="yard_space"
                                        checked={formData.yard_space}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span className="text-[13px] text-gray-900">Yes</span>
                                </div>

                                {/* Yard Surface */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Yard surface
                                    </label>
                                    <select
                                        name="yard_surface"
                                        value={formData.yard_surface}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {yardSurfaceOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Area of yard */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Area of yard (sq ft)
                                    </label>
                                    <input
                                        type="text"
                                        name="yard_area"
                                        value={formData.yard_area}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 201.22"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Parking included */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Parking included
                                    </label>
                                    <input
                                        type="number"
                                        name="parking_include"
                                        value={formData.parking_include || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 6"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Key Specification */}
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Key Specification
                            </h2>
                            <textarea
                                name="key_specification"
                                value={formData.key_specification}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Key specifications"
                                className="w-full px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Email *
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="e.g., info@gmail.com"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        placeholder="e.g., +44 7911 123456"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                


                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        WhatsApp Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsapp_number"
                                        value={formData.whatsapp_number}
                                        onChange={handleInputChange}
                                        placeholder="e.g., +44 7911 123456"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Risk Level */}
                        {/* <div className="mb-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Risk Level
                            </h2>
                            <select
                                name="risk_level"
                                value={formData.risk_level}
                                onChange={handleInputChange}
                                className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {riskLevelOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div> */}


                        {/* Image Upload Section */}
                        <div className="mb-6 border border-gray-200 rounded-lg p-4">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                                Please upload images (size less than 10MB)
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                {Object.values(images).map((img) => (
                                    <div key={img.id} className="relative bg-white border border-dashed border-[#EA4335] rounded-lg p-4">
                                        <h3 className="text-base font-medium text-[#303539] mb-3">
                                            {img.title}
                                        </h3>

                                        {img.preview && (
                                            <button
                                                type="button"
                                                onClick={() => handleImageRemove(img.id)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all z-10"
                                                title="Remove image"
                                            >
                                                ✕
                                            </button>
                                        )}


                                        <div className='flex justify-center'>
                                            <div className="w-[55%] h-[100px] bg-gray-100 rounded-md flex items-center justify-center mb-3 overflow-hidden">
                                                {img.preview ? (
                                                    <img src={img.preview} alt={img.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
                                                )}
                                            </div>
                                        </div>

                                        <div className='flex justify-center'>
                                            <label className="cursor-pointer">
                                                <div className="flex items-center justify-center gap-1.5 px-4 py-2 border border-dashed border-[#EA4335] rounded-md hover:bg-blue-50 transition-colors text-[13px] font-medium bg-[#E7F0FB]">
                                                    <span>Upload</span>
                                                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(img.id, e)}
                                                    className="hidden"
                                                />
                                            </label>
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
                            {/* Brochure Upload */}
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-4">
                                    Brochure Upload (PDF)
                                </h2>

                                <div className="border border-dashed border-[#EA4335] rounded-lg p-6">
                                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-x-4">
                                        {/* Icon Section */}
                                        <div className="flex flex-col items-center justify-center bg-gray-100 mt-2 rounded-sm w-full sm:w-auto p-4">
                                            <ImageIcon className="w-22 h-12 text-gray-500" strokeWidth={1.5} />
                                        </div>

                                        {/* Text + Button Section */}
                                        <div className="text-center sm:text-left w-full">
                                            <p className="text-md text-gray-600 font-semibold">
                                                Please upload Brochure, PDF less than 100KB
                                            </p>

                                            <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                                <label className="cursor-pointer">
                                                    <div className="px-3 py-2 bg-white border-dashed border-[#EA4335] text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium w-full sm:w-auto">
                                                        Choose File
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={handleBrochurePdfUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {brochurePdfFile ? (
                                                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-md px-2 py-1 flex-1 min-w-0">
                                                        <span className="text-green-500 text-xs">✔</span>
                                                        <span className="text-sm text-green-800 font-medium truncate flex-1">{brochurePdfFile.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setBrochurePdfFile(null)}
                                                            className="text-red-400 hover:text-red-600 text-xs font-bold shrink-0"
                                                        >✕</button>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 mt-1 sm:mt-0 sm:ml-2">No File Chosen</span>
                                                )}

                                                {/* <span className="text-sm text-gray-800 mt-2 sm:mt-0 sm:ml-5 break-all">
                                                    {brochurePdfFile ? brochurePdfFile.name : 'No File Chosen'}
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Media Upload */}
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-4">
                                    Media Upload (Video)
                                </h2>

                                <div className="border border-dashed border-[#EA4335] rounded-lg p-6">
                                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-x-4">
                                        {/* Icon Section */}
                                        <div className="flex flex-col items-center justify-center bg-gray-100 mt-2 rounded-sm w-full sm:w-auto p-4">
                                            <SquarePlay className="w-22 h-12 text-gray-500" strokeWidth={1.5} />
                                        </div>

                                        {/* Text + Button Section */}
                                        <div className="text-center sm:text-left w-full">
                                            <p className="text-md text-gray-600 font-semibold">
                                                Please upload Video, less than 100MB
                                            </p>

                                            <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                                <label className="cursor-pointer">
                                                    <div className="px-3 py-2 bg-white border-dashed border-[#EA4335] text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium w-full sm:w-auto">
                                                        Choose File
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={handleBrochureVideoUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {brochureVideoFile ? (
                                                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-md px-2 py-1 flex-1 min-w-0">
                                                        <span className="text-green-500 text-xs">✔</span>
                                                        <span className="text-sm text-green-800 font-medium truncate flex-1">{brochureVideoFile.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setBrochureVideoFile(null)}
                                                            className="text-red-400 hover:text-red-600 text-xs font-bold shrink-0"
                                                        >✕</button>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 mt-1 sm:mt-0 sm:ml-2">No File Chosen</span>
                                                )}

                                                {/* <span className="text-sm text-gray-800 mt-2 sm:mt-0 sm:ml-5 break-all">
                                                    {brochureVideoFile ? brochureVideoFile.name : 'No File Chosen'}
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RiskProfileManagementForm
                            vehicleRepairUse={formData.vehicle_repair_use}
                            vehicleSaleUse={formData.vehicle_sale_use}
                            subletting={formData.subletting}
                            leisureUse={formData.leisure_use}
                            petBusinessUse={formData.pet_business_use}
                            plasticRecyclingUse={formData.plastic_recycling_use}
                            otherRestrictions={formData.other_restrictions}
                            onRestrictionChange={(name, value) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [name]: value
                                }));
                            }}
                            onOtherRestrictionsChange={(value) => {
                                setFormData(prev => ({
                                    ...prev,
                                    other_restrictions: value
                                }));
                            }}
                        />

                        {/* Bottom Actions */}
                        <div className="flex items-center gap-3 mt-8">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-[14px] font-medium transition-colors rounded-md border border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Property'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVendorProperty;