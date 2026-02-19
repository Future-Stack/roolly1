import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Search, Phone, Mail, Trash2, UserSquare, AlertCircle, X as XIcon } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import AddVendorModal from '@/components/AdminDashboard/Vendor/AddVendorModal';
import {
    useGetAllVendorsQuery,
    useActivateVendorMutation,
    useDeactivateVendorMutation,
    useDeleteVendorMutation
} from '@/redux/features/admin/vendor-management/vendorManagementApi';

interface VendorData {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    image: string | null;
    last_activity: string;
    is_deactivated: boolean;
    joining_date: string;
    total_property: number;
}

interface UserCardProps {
    id: string;
    name: string;
    phone: string;
    email: string;
    totalProperty: number;
    memberSince: string;
    lastActive: string;
    isActive: boolean;
    onStatusChange: (id: string, newStatus: boolean) => void;
    onDelete: (id: string, name: string) => void;
    isChangingStatus: boolean;
    isDeleting: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    id,
    name,
    phone,
    email,
    totalProperty,
    memberSince,
    lastActive,
    isActive,
    onStatusChange,
    onDelete,
    isChangingStatus,
    isDeleting
}) => {
    const getInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleStatusToggle = () => {
        onStatusChange(id, !isActive);
    };

    const handleDeleteClick = () => {
        onDelete(id, name);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 relative">
            {(isChangingStatus || isDeleting) && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className={`w-12 h-12 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'} flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
                        {getInitials(name)}
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-1">{name}</h3>
                        <div className="flex items-center gap-1 text-[#3E4349] text-sm mb-1">
                            <Phone size={14} />
                            <span>{phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#3E4349] text-sm">
                            <Mail size={14} />
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2">
                    <button
                        onClick={handleStatusToggle}
                        disabled={isChangingStatus || isDeleting}
                        className={`text-gray-700 text-sm font-medium px-3 py-1 border ${isActive ? 'border-red-300' : 'border-green-300'} rounded hover:bg-gray-50 transition-colors ${isChangingStatus || isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <div className='w-full flex justify-center py-1 border border-gray-300 rounded'>
                        <button
                            onClick={handleDeleteClick}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            disabled={isChangingStatus || isDeleting}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="text-gray-500 text-sm mb-1">Total Properties</div>
                    <div className="text-gray-900 font-semibold text-base">{totalProperty.toString().padStart(2, '0')}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Member Since</div>
                    <div className="text-gray-900 font-semibold text-base">{memberSince}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Status</div>
                    <div className={`${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white text-sm font-medium px-3 py-1 rounded text-center`}>
                        {isActive ? 'Active' : 'Inactive'}
                    </div>
                </div>
            </div>

            <div className="text-gray-500 text-sm">Last active: {lastActive}</div>
            <div className="flex md:hidden items-end gap-2 mt-5">
                <button
                    onClick={handleStatusToggle}
                    disabled={isChangingStatus || isDeleting}
                    className={`text-gray-700 text-sm font-medium px-3 py-1 border ${isActive ? 'border-red-300' : 'border-green-300'} rounded hover:bg-gray-50 transition-colors ${isChangingStatus || isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isActive ? 'Deactivate' : 'Activate'}
                </button>
                <div className='w-full flex justify-center py-1.5 border border-gray-300 rounded'>
                    <button
                        onClick={handleDeleteClick}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        disabled={isChangingStatus || isDeleting}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const VendorManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const itemsPerPage = 5;

    const [statusChangingId, setStatusChangingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string, name: string } | null>(null);


    // Memoize query params to avoid unnecessary re-renders
    const queryParams = useMemo(() => ({
        page: currentPage,
        page_size: itemsPerPage,
        search: debouncedSearchTerm.trim() || undefined
    }), [currentPage, debouncedSearchTerm]);

    const { data: vendorsData, isLoading, error, refetch } = useGetAllVendorsQuery(queryParams);
    const [activateVendor] = useActivateVendorMutation();
    const [deactivateVendor] = useDeactivateVendorMutation();
    const [deleteVendor] = useDeleteVendorMutation();


    // Debounce search input
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
            setCurrentPage(1);
        }, 500),
        []
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setCurrentPage(1);
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleStatusChange = async (id: string, shouldBeActive: boolean) => {
        setStatusChangingId(id);
        try {
            if (shouldBeActive) {
                await activateVendor(id).unwrap();
                showNotification('success', 'Vendor activated successfully');
            } else {
                await deactivateVendor(id).unwrap();
                showNotification('success', 'Vendor deactivated successfully');
            }
            refetch();
        } catch (err) {
            console.error('Failed to update vendor status:', err);
            showNotification('error', 'Failed to update vendor status');
        } finally {
            setStatusChangingId(null);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        setConfirmDelete({ id, name });
    };

    const confirmDeleteVendor = async () => {
        if (!confirmDelete) return;
        setDeletingId(confirmDelete.id);
        try {
            await deleteVendor(confirmDelete.id).unwrap();
            showNotification('success', `Vendor "${confirmDelete.name}" deleted successfully`);
            refetch();
        } catch (err) {
            console.error('Failed to delete vendor:', err);
            showNotification('error', 'Failed to delete vendor');
        } finally {
            setDeletingId(null);
            setConfirmDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');
    };

    const vendorsList = Array.isArray(vendorsData?.results)
        ? vendorsData.results
        : Array.isArray(vendorsData)
            ? vendorsData
            : [];

    // Local filtering as a fallback to ensure search works even if API filtering fails
    const filteredVendorsList = useMemo(() => {
        if (!debouncedSearchTerm.trim()) return vendorsList;
        const search = debouncedSearchTerm.toLowerCase();
        return vendorsList.filter((vendor: VendorData) =>
            vendor.full_name?.toLowerCase().includes(search) ||
            vendor.email?.toLowerCase().includes(search) ||
            vendor.phone_number?.includes(search)
        );
    }, [vendorsList, debouncedSearchTerm]);

    const currentVendors: UserCardProps[] = filteredVendorsList.map((vendor: VendorData) => ({
        id: vendor.id,
        name: vendor.full_name,
        phone: vendor.phone_number,
        email: vendor.email,
        totalProperty: vendor.total_property,
        memberSince: formatDate(vendor.joining_date),
        lastActive: formatDateTime(vendor.last_activity),
        isActive: !vendor.is_deactivated,
        onStatusChange: handleStatusChange,
        onDelete: handleDelete,
        isChangingStatus: statusChangingId === vendor.id,
        isDeleting: deletingId === vendor.id
    }));

    const totalVendors = vendorsData?.count || 0;
    const filteredCount = debouncedSearchTerm ? filteredVendorsList.length : totalVendors;
    const totalPages = Math.ceil(totalVendors / itemsPerPage);

    const handleVendorAdded = () => {
        refetch();
        showNotification('success', 'Vendor added successfully');
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getDisplayRange = () => {
        const start = ((currentPage - 1) * itemsPerPage) + 1;
        const end = Math.min(currentPage * itemsPerPage, totalVendors);
        return { start, end };
    };

    const { start, end } = getDisplayRange();

    return (
        <div>
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Vendor</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete vendor <span className="font-semibold">"{confirmDelete.name}"</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteVendor}
                                    disabled={deletingId === confirmDelete.id}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deletingId === confirmDelete.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <AlertCircle className={`w-5 h-5 ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {notification.message}
                    </span>
                    <button onClick={() => setNotification(null)} className="ml-4 text-gray-400 hover:text-gray-600">✕</button>
                </div>
            )}

            <AddVendorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleVendorAdded}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Vendor Management
                    </h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600 font-normal max-w-xl">
                        Manage your platform vendors and their properties
                    </p>
                </div>

                <div className="w-full sm:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-[#126AD8] px-5 py-3 rounded-xl text-white flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 hover:bg-[#0f5bbf] hover:shadow-lg active:scale-95 shadow-md"
                    >
                        <UserSquare className="w-5 h-5" />
                        <span>Add Vendor</span>
                    </button>
                </div>
            </div>

            <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="w-full p-4 sm:p-6">
                    <div className="mb-8">
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, email, or phone..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                            />
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    <XIcon size={18} />
                                </button>
                            )}
                        </div>
                        {debouncedSearchTerm && (
                            <div className="mt-2 text-sm text-gray-500">
                                Searching for: "{debouncedSearchTerm}"
                            </div>
                        )}
                    </div>

                    {!isLoading && !error && totalVendors > 0 && (
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {start} to {end} of {totalVendors} vendor{totalVendors !== 1 ? 's' : ''}
                            {debouncedSearchTerm && ` (filtered: ${filteredCount} found)`}
                        </div>
                    )}

                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="text-gray-600 mt-2">Loading vendors...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-center">
                            <p className="text-red-600 text-sm">Error loading vendors. Please try again.</p>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div>
                            {currentVendors.length > 0 ? (
                                <>
                                    {currentVendors.map((vendor) => (
                                        <UserCard key={vendor.id} {...vendor} />
                                    ))}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    {debouncedSearchTerm ? (
                                        <p className="text-gray-600">No vendors found matching "{debouncedSearchTerm}"</p>
                                    ) : (
                                        <p className="text-gray-600">No vendors found. Add your first vendor!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!isLoading && !error && totalPages > 1 && (
                <div className='flex flex-col items-center my-8'>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default VendorManagement;
