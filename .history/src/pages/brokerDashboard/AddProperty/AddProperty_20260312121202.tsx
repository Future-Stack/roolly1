/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageIcon, Plus, SquarePlay } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiskProfileManagementForm from '@/components/brokerDashboard/BrokerProperty/RiskProfileManagementForm';
// import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAddPropertyMutation } from '@/redux/features/broker/property/addPropertyApi';
import { useGetVendorListQuery } from '@/redux/features/broker/property/vendorListApi';

interface ImageUpload {
    id: string;
    title: string;
    description: string;
    file?: File;
    preview?: string;
}

interface PropertyFormData {
    property_name: string;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    estimated_price: string;
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
    lighting_type: string;
    epc_rating: string;
    ev_chaging: boolean;
    solar_panels: boolean;
    any_further_details: string;
    yard_space: boolean;
    yard_area: string;
    yard_surface: string;
    parking_include: number;
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
    email: string;
    vendor_id: string | number;
}

const AddProperty: React.FC = () => {
    const navigate = useNavigate();
    const [addProperty, { isLoading: isSubmitting }] = useAddPropertyMutation();
    const { data: vendorsData } = useGetVendorListQuery({});
    console.log(vendorsData);

    const [formData, setFormData] = useState<PropertyFormData>({
        property_name: '',
        vendor_id: '',
        transaction: 'sale',
        postcode: '',
        property_type: 'industrial',
        location: '',
        estimated_price: '',
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
        lighting_type: '',
        epc_rating: '',
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
        email: '',
        phone_number: '',
        whatsapp_number: '',
    });

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

        try {
            // ── Required field validation ──────────────────────────────────
            const missing: string[] = [];

            // Property Details
            if (!formData.property_name.trim()) missing.push('Property Name');
            if (!formData.vendor_id) missing.push('Vendor');
            if (!formData.location.trim()) missing.push('Location');
            if (!formData.postcode.trim()) missing.push('Post Code');
            if (!formData.estimated_price.trim()) missing.push('Price');
            // if (!formData.lease_duration && formData.lease_duration !== 0) missing.push('Minimum Lease Duration');
            if (!formData.location_description.trim()) missing.push('Location Description');

            // Internal Specification
            if (!formData.built_area.trim()) missing.push('Built Area');

            // if (!formData.eaves_height.trim()) missing.push('Eaves Height');
            // if (!formData.power_capacity.trim()) missing.push('Power Capacity');
            // if (!formData.length_width.trim()) missing.push('Length & Width');
            // if (!formData.dimensions_roller_shutter.trim()) missing.push('Dimensions of Roller Shutter');
            // if (!formData.office_space.trim()) missing.push('Office Space');

            // External Specification
            if (!formData.email.trim()) missing.push('Email');
            if (!formData.phone_number.trim()) missing.push('Phone Number');
            if (!formData.whatsapp_number.trim()) missing.push('Whatsapp Number');

            if (missing.length > 0) {
                toast.error(`Please fill in required fields: ${missing.join(', ')}`);
                return;
            }

            // Check if at least one image is uploaded
            const hasImage = Object.values(images).some(img => img.file);
            if (!hasImage) {
                alert('Please upload at least one image');
                return;
            }

            // Create FormData object
            const formDataToSend = new FormData();

            // Add all form fields — skip empty strings to avoid API rejecting empty numeric fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'images' || key === 'brochure_pdf_url' || key === 'brochure_video_url' || key === 'existing_images') return;

                if (typeof value === 'boolean') {
                    formDataToSend.append(key, value ? 'true' : 'false');
                } else if (typeof value === 'number') {
                    // Always send numbers (including 0)
                    formDataToSend.append(key, value.toString());
                } else if (typeof value === 'string' && value.trim() !== '') {
                    // Skip empty strings — API rejects them for numeric fields
                    formDataToSend.append(key, value);
                }
            });

            // Add images with section-based filenames
            Object.entries(images).forEach(([key, img]) => {
                if (img.file) {
                    const extension = img.file.name.split('.').pop() || 'jpg';
                    formDataToSend.append('images', img.file, `${key}.${extension}`);
                }
            });

            // // Add brochure files if present
            if (brochurePdfFile) {
                formDataToSend.append('brochure_pdf', brochurePdfFile);
            }

            if (brochureVideoFile) {
                formDataToSend.append('brochure_video', brochureVideoFile);
            }
            // formDataToSend.append('office_space', (parseFloat(formData.office_space) / 10.76).toFixed(2));

            // Call API to add property
            const response = await addProperty(formDataToSend).unwrap();

            console.log('Property added successfully:', response);

            toast.success('Property added successfully!');

            // Redirect to properties list page or property details page
            navigate('/broker-dashboard/properties');

        } catch (error: any) {
            console.error('Error adding property:', error.data);
            toast.error('Failed to add property. Please try again.');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
            navigate(-1);
        }
    };

    // Options for dropdowns
    const transactionOptions = ['sale', 'lease'];
    const propertyTypeOptions = ['industrial', 'land', 'office', 'retail'];
    const yardSurfaceOptions = ['Concrete', 'Tarmac', 'Gravel', 'Grass', 'Other'];
    // const riskLevelOptions = ['low', 'medium', 'high'];
    const phaseOptions = ['Single phase', 'Three Phase',];
    const lightingTypeOptions = ['Halogen', 'LED',];

    const epcRatingOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const evChanging = ['yes', 'no',];
    const solarPanel = ['yes', 'no',];
    return (
        <div className="w-full min-h-screen">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Add New Property
                    </h1>
                    <p className="text-base text-gray-600">
                        Add property details for the perfect buyer or tenant.
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
                                        required
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
                                        required
                                    >
                                        {transactionOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Post Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleInputChange}
                                        placeholder="Post Code "
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
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
                                        required
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
                                        required
                                    />
                                </div>

                                {/* Rent or purchase estimated price */}
                                <div>
                                    <label className="block text-base text-gray-900 mb-2">
                                        Price (£) or POA *
                                    </label>
                                    <input
                                        type="text"
                                        name="estimated_price"
                                        value={formData.estimated_price}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 10000"
                                        step="0.01"
                                        min="0"
                                        className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
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
                                        min="0"
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
                                    placeholder="Describe the property in detail..."
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
                                        Built Area (sq ft) *
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

                                {/* add new filed */}

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


                                {/* Eaves Height  */}
                                <div className="">
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Eaves height (m)
                                    </label>
                                    <input
                                        type="text"
                                        name="eaves_height"
                                        value={formData.eaves_height}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 6.5"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Height to apex/pitch */}
                                <div className="">
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Height to apex/pitch (m)
                                    </label>
                                    <input
                                        type="text"
                                        name="height_apex_pitch"
                                        placeholder="Enter height"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Power capacity  */}
                                <div className="">
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Power capacity (Amps or KVA)
                                    </label>
                                    <input
                                        type="text"
                                        name="power_capacity"
                                        value={formData.power_capacity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 100 Amps"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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


                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Number of roller shutters
                                    </label>
                                    <input
                                        type="number"
                                        name="roller_shutters"
                                        value={formData.roller_shutters || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Manual"
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
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Dimensions of roller shutter
                                    </label>
                                    <input
                                        type="text"
                                        name="dimensions_roller_shutter"
                                        value={formData.dimensions_roller_shutter}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2x4 ft"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

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
                                {/* <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Eaves height (ft)
                                    </label>
                                    <input
                                        type="text"
                                        name="eaves_height"
                                        value={formData.eaves_height}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 13.55"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div> */}

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


                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        EV charging
                                    </label>
                                    <select
                                        name="ev_chaging"
                                        value={formData.ev_chaging ? 'yes' : 'no'}
                                        onChange={(e) => {
                                            const val = e.target.value === 'yes';
                                            setFormData(prev => ({ ...prev, ev_chaging: val }));
                                        }}
                                        className="w-full h-[38px] capitalize px-3 text-[13px] text-gray-900 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {evChanging.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Solar Panels
                                    </label>
                                    <select
                                        name="solar_panels"
                                        value={formData.solar_panels ? 'yes' : 'no'}
                                        onChange={(e) => {
                                            const val = e.target.value === 'yes';
                                            setFormData(prev => ({ ...prev, solar_panels: val }));
                                        }}
                                        className="w-full h-[38px] capitalize px-3 text-[13px] text-gray-900 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {solarPanel.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>



                                {/* Power Capacity */}
                                {/* <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Power capacity
                                    </label>
                                    <input
                                        type="text"
                                        name="power_capacity"
                                        value={formData.power_capacity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 207.83"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div> */}

                                {/* Phase */}
                                {/* <div>
                                    <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                        Electricity supply
                                    </label>
                                    <select 
                                        name="phase"
                                        value={formData.phase}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {phaseOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option} 
                                            </option>
                                        ))}
                                    </select>
                                </div> */}



                                <div>
                                    <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                        Electricity supply
                                    </label>
                                    <select
                                        name="electricity_supply"
                                        value={formData.electricity_supply}
                                        onChange={handleInputChange}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 bg-blue-50 border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Electricity Supply type</option>
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
                                        Area of yard (sq ft or acres)
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
                                        min="0"
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

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                <div>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="e.g., info@gmail.com"
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-dashed border-[#EA4335] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="mb-6 border border-gray-200 rounded-lg p-4">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                                Please upload images (size less than 10MB) *
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                {Object.values(images).map((img) => (
                                    <div key={img.id} className="bg-white border border-dashed border-[#EA4335] rounded-lg p-4">
                                        <h3 className="text-base font-medium text-[#303539] mb-3">
                                            {img.title}
                                        </h3>

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

                                        <div className="flex flex-col items-center justify-center bg-gray-100 mt-2 rounded-sm w-full sm:w-auto p-4">
                                            <ImageIcon className="w-22 h-12 text-gray-500" strokeWidth={1.5} />
                                        </div>


                                        <div className="text-center sm:text-left w-full">
                                            <p className="text-md text-gray-600 font-semibold">
                                                Please upload Brochure, PDF less than 100KB
                                            </p>

                                            <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full gap-2">
                                                <label className="cursor-pointer shrink-0">
                                                    <div className="px-3 py-2 bg-white border border-dashed border-[#EA4335] text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium">
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
                                                Please upload Video, less than 100MB (approx. 1 minute duration)
                                            </p>

                                            <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full gap-2">
                                                <label className="cursor-pointer shrink-0">
                                                    <div className="px-3 py-2 bg-white border border-dashed border-[#EA4335] text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium">
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
                            onRestrictionChange={(name: string, value: any) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [name]: value
                                }));
                            }}
                            onOtherRestrictionsChange={(value: string) => {
                                setFormData(prev => ({
                                    ...prev,
                                    other_restrictions: value
                                }));
                            }}
                        />
                        {/* Assigned Vendor */}
                        <div>
                            <label className="block text-base text-gray-900 mb-1.5 font-medium">
                                Assigned Vendor *
                            </label>
                            <select
                                name="vendor_id"
                                value={formData.vendor_id}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="" className="text-gray-900">Select Vendor</option>
                                {(Array.isArray(vendorsData?.results) ? vendorsData.results : (Array.isArray(vendorsData) ? vendorsData : [])).map((vendor: any) => (
                                    <option key={vendor.id} value={vendor.id} className="text-gray-900">
                                        {vendor.full_name || vendor.name || vendor.username || vendor.email || `Vendor #${vendor.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                {isSubmitting ? 'Adding...' : 'Add Property'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;