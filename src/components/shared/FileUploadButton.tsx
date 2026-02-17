/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from 'lucide-react';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

interface FileUploadButtonProps {
    onFileSelect: (files: File[]) => void;
    disabled?: boolean;
    accept?: string;
    maxSize?: number; // in MB
    multiple?: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    onFileSelect,
    disabled = false,
    accept = 'image/*,.pdf,.doc,.docx',
    maxSize = 10,
    multiple = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        // Validate file sizes
        const maxSizeBytes = maxSize * 1024 * 1024;
        const invalidFiles = files.filter(file => file.size > maxSizeBytes);

        if (invalidFiles.length > 0) {
            toast.error(`File size must be less than ${maxSize}MB`);
            return;
        }

        // Validate file types
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const invalidTypes = files.filter(file => {
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            const mimeType = file.type;

            return !acceptedTypes.some(acceptedType => {
                if (acceptedType.includes('*')) {
                    // Handle wildcards like "image/*"
                    const baseType = acceptedType.split('/')[0];
                    return mimeType.startsWith(baseType);
                }
                return acceptedType === fileExtension || acceptedType === mimeType;
            });
        });

        if (invalidTypes.length > 0) {
            toast.error('Unsupported file type');
            return;
        }

        onFileSelect(files);

        // Reset input so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />
            <button
                onClick={handleButtonClick}
                disabled={disabled}
                className="p-1 md:p-0.5 hover:bg-gray-100 transition-colors border border-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                title="Upload file"
            >
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" strokeWidth={2} />
            </button>
        </>
    );
};

export default FileUploadButton;
