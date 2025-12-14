import { ImageIcon, Plus, SquarePlay } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ImageUpload {
    id: string;
    title: string;
    description: string;
    file?: File;
    preview?: string;
}

const PropertyInformationForm: React.FC = () => {
    // const [currentStep] = useState(1);
    const [images, setImages] = useState<{ [key: string]: ImageUpload }>({
        aerial: { id: 'aerial', title: 'Aerial View', description: 'Overhead or drone shot showing building in context (site layout, access points).', preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop' },
        frontExternal: { id: 'frontExternal', title: 'Front External', description: 'Main frontage view from the street or approach road.' },
        externalRoller: { id: 'externalRoller', title: 'External – Roller Shutter', description: 'Close-up showing loading or vehicle access.' },
        internalFront: { id: 'internalFront', title: 'Internal – Front', description: 'Inside view facing towards front of the unit.' },
        internalRearLeft: { id: 'internalRearLeft', title: 'Internal – Rear (Left Side)', description: 'Rear area, left-hand view.' },
        internalRearRight: { id: 'internalRearRight', title: 'Internal – Rear (Right Side)', description: 'Rear area, left-hand view.' },
        internalSide: { id: 'internalSide', title: 'Internal – Side Angle', description: 'Diagonal shot showing depth and space.' },
        amenities: { id: 'amenities', title: 'Amenities', description: 'Cafeteria or canteen or office, kitchenette, reception, and toilets.' }
    });

    const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
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

    return (
        <div className="w-full min-h-screen">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Property Information
                    </h1>
                    <p className="text-base text-gray-600">
                        Find the perfect buyer or tenant for your property — list it today!
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
                                <label className="block text-base  text-gray-900 mb-2">
                                    Property name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Premium Commercial Property"
                                    className="w-full h-[42px] px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Transaction */}
                            <div>
                                <label className="block text-base  text-gray-900 mb-2">
                                    Transaction
                                </label>
                                <select className="w-full h-[42px] px-3 text-[13px] text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Select</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-base text-gray-900 mb-2">
                                    Property Type
                                </label>
                                <select className="w-full h-[42px] px-3 text-[13px]  bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400">
                                    <option>Commercial</option>
                                    <option>Special</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-base  text-gray-900 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="City, County"
                                    className="w-full h-[42px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Rent or purchase estimated price */}
                            <div>
                                <label className="block text-base  text-gray-900 mb-2">
                                    Rent or purchase estimated price
                                </label>
                                <select className="w-full h-[42px] px-3 text-[13px] text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>$10000-$20000</option>
                                </select>
                            </div>

                            {/* lease Duration */}
                            <div>
                                <label className="block text-base  text-gray-900 mb-2">
                                    lease Duration
                                </label>
                                <input
                                    type="text"
                                    placeholder="03"
                                    className="w-full h-[42px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <label className="block text-base text-gray-900 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-3 py-2 text-[13px] text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Internal Specification */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Internal Specification
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-gray-200 rounded-lg p-2">
                            {[
                                { label: 'Area', placeholder: 'X sq ftl' },
                                { label: 'Type of roller shutter', placeholder: 'Three' },
                                { label: 'Length & Width (comma separated)', placeholder: '2400X1600' },
                                { label: 'Height & width of shutters(comma separated)', placeholder: '400-300' },
                                { label: 'Office space included', placeholder: 'X sq ftl' },
                                { label: 'Type of lighting', placeholder: '03' },
                                { label: 'Eaves height', placeholder: 'X sq ftl' },
                                { label: 'EPC Rating', placeholder: '03' },
                                { label: 'Power capacity', placeholder: 'X kvs' },
                                { label: 'Type of lighting', placeholder: '03' }
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-base text-gray-900 mb-1.5">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        className="w-full h-[38px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                    phase
                                </label>
                                <select className="w-full h-[38px] px-3 text-[13px] text-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>03</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[13px] font-normal text-gray-900 mb-1.5">
                                    Any further details
                                </label>
                                <input
                                    type="text"
                                    placeholder="Details"
                                    className="w-full h-[38px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* External Specification */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            External Specification
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 border border-gray-200 rounded-lg p-4">
                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Yard space included(comma separated)
                                </label>
                                <input
                                    type="text"
                                    placeholder="X sq ftl"
                                    className="w-full h-[38px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-base  text-gray-900 mb-1.5">
                                    Yard surface
                                </label>
                                <select className="w-full h-[38px] px-3 text-[13px] text-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Concrete/tarmac</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-base text-gray-900 mb-1.5">
                                    Area of yard
                                </label>
                                <input
                                    type="text"
                                    placeholder="1200"
                                    className="w-full h-[38px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-basetext-gray-900 mb-1.5">
                                    Parking included
                                </label>
                                <input
                                    type="text"
                                    placeholder="03"
                                    className="w-full h-[38px] px-3 text-[13px] text-gray-400 placeholder-gray-400 bg-blue-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Key Specification */}
                    <div className="mb-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Key Specification (comma separated)
                        </h2>
                        <textarea
                            rows={3}
                            placeholder="key pharmacy"
                            className="w-full px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 bg-white 
               border border-gray-300 rounded-md focus:outline-none 
               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>

                    </div>

                    {/* Image Upload Section */}
                    <div className="mb-6 border border-gray-200 rounded-lg p-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            Please upload  image, size less than 100KB
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            {Object.values(images).map((img) => (
                                <div key={img.id} className="bg-white border border-dashed border-gray-200 rounded-lg p-4">
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
                                            <div className="flex items-center justify-center gap-1.5 px-4 py-2 border border-dashed border-[#92BAED] text-[#126AD8] rounded-md hover:bg-blue-50 transition-colors text-[13px] font-medium bg-[#E7F0FB]">
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

                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors">
                            Save
                        </button>
                    </div>

                    {/* File Upload Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Brochure Upload */}
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Brochure Upload
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
                                            Please upload Brochure, Pdf less than 100KB
                                        </p>

                                        <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                            <button className="px-3 py-2 bg-white border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium w-full sm:w-auto">
                                                Choose File
                                            </button>

                                            <span className="text-sm text-gray-800 mt-2 sm:mt-0 sm:ml-5 break-all">
                                                No File Chosen
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* Save Button */}
                                <div className="flex justify-center sm:justify-end">
                                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-colors w-full sm:w-auto">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Media Upload */}
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                Media Upload
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
                                            Please upload Brochure, Pdf less than 100KB
                                        </p>

                                        <div className="bg-[#F8FCFF] p-2 mt-1 flex flex-col sm:flex-row items-center sm:items-start w-full">
                                            <button className="px-3 py-2 bg-white border border-blue-600 text-blue-600 rounded-sm hover:bg-blue-50 transition-colors text-[13px] font-medium w-full sm:w-auto">
                                                Choose File
                                            </button>

                                            <span className="text-sm text-gray-800 mt-2 sm:mt-0 sm:ml-5 break-all">
                                                No File Chosen
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* Save Button */}
                                <div className="flex justify-center sm:justify-end">
                                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-colors w-full sm:w-auto">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center gap-3 mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[14px] font-medium transition-colors">
                            Continue
                        </button>
                        <button className="text-gray-700 hover:text-gray-900 px-4 py-2 text-[14px] font-medium transition-colors rounded-md border border-gray-300">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PropertyInformationForm;