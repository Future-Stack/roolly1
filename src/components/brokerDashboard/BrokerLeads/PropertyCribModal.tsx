import React from 'react';
import { X, Building, MapPin, ArrowRightLeft, Ruler, Euro } from 'lucide-react';

interface Property {
    id: string;
    name: string;
    type: string;
    transaction: string;
    location: string;
    size: string;
    price: string;
}

interface PropertyCribModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property | null;
}

const PropertyCribModal: React.FC<PropertyCribModalProps> = ({
    isOpen,
    onClose,
    property
}) => {
    if (!isOpen || !property) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Property Details
                            </h2>
                            <p className="text-sm text-gray-500">
                                ID: {property.id}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Main Info Card */}
                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 capitalize">
                            {property.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm capitalize">{property.location}</span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Euro className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Price/Rent</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 ml-1">
                                £{property.price}
                            </p>
                        </div>

                        {/* Type */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Building className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Property Type</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 ml-1 capitalize">
                                {property.type}
                            </p>
                        </div>

                        {/* Size */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Ruler className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Size</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 ml-1">
                                {property.size}
                            </p>
                        </div>

                        {/* Transaction */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Transaction</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 ml-1 capitalize">
                                {property.transaction}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCribModal;
