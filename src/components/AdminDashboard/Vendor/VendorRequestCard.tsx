import React from 'react';
import { Phone, Mail } from 'lucide-react';
import ImageIcon from '@/assets/imageIcon.svg';
import PdfIcon from '@/assets/pdfIcon.svg';

export interface VendorRequest {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    image: string;
    driving_license: string;
    passport_image: string;
    utility_bill: string;
    bank_statement: string;
    created_at: string;
    is_new?: boolean;
}

interface VendorRequestCardProps {
    request: VendorRequest;
    onApprove: (id: string) => void;
    onDecline: (id: string) => void;
    isProcessing: boolean;
}

const VendorRequestCard: React.FC<VendorRequestCardProps> = ({
    request,
    onApprove,
    onDecline,
    isProcessing
}) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    console.log(request)

    const ImageDocumentLink = ({ label, filename }: { label: string, filename?: string }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">{label}:</span>
            <div className='flex gap-2 items-center'>
                <div className="flex items-center gap-2 px-1.5 py-1.5 bg-white border border-gray-100 rounded-md ">
                        <img src={ImageIcon} alt="proof of identity" className="w-4 h-4" />
                    
                </div>
                <a href={filename} target="_blank" rel="noopener noreferrer">
                    <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                        {filename ? label : 'Not provided'}
                    </span>
                </a>

            </div>
        </div>
    );    
    const PdfDocumentLink = ({ label, filename }: { label: string, filename?: string }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">{label}:</span>
             <div className='flex gap-2 items-center'>
                <div className="flex items-center gap-2 px-1.5 py-1.5 bg-white border border-gray-100 rounded-md ">
                        <img src={PdfIcon} alt="address proof" className="w-4 h-4" />
                    
                </div>
                <a href={filename} target="_blank" rel="noopener noreferrer">
                    <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                        {filename ? label  : 'Not provided'}
                    </span>
                </a>

            </div>
        </div>
    );

    return (
        <div className="bg-white border border-gray-100 rounded-[10px] p-5 mb-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
            {isProcessing && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
                {/* User Info Section */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg shadow-inner">
                                {request.image ? <img src={request.image} alt="" className='w-full h-full object-cover rounded-full' /> : getInitials(request.full_name)} 
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                        {request.full_name}
                                    </h3>
                                    {request.is_new !== false && (
                                        <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Phone size={14} className="text-gray-400" />
                                        <span>{request.phone_number}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Mail size={14} className="text-gray-400" />
                                        <span>{request.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <button
                                onClick={() => onApprove(request.id)}
                                disabled={isProcessing}
                                className="px-5 py-2 bg-[#126AD8] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onDecline(request.id)}
                                disabled={isProcessing}
                                className="px-5 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                            >
                                Decline
                            </button>
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#E9F0F9] rounded-xl p-4">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">Proof of identity:</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <ImageDocumentLink
                                    label="Driving licence"
                                    filename={request.driving_license}
                                />
                                <ImageDocumentLink
                                    label="Passport"
                                    filename={request.passport_image}
                                />
                            </div>
                        </div>
                        <div className="bg-[#E9F0F9] rounded-xl p-4">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">Address:</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <PdfDocumentLink
                                    label="Utility bill"
                                    filename={request.utility_bill}
                                />
                                <PdfDocumentLink
                                    label="Bank statement"
                                    filename={request.bank_statement}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorRequestCard;
