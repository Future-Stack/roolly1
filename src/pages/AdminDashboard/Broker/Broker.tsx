import React, { useState, useEffect, useCallback } from 'react';
import { Search, Phone, Mail,Trash2, User, AlertCircle } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import AddBrokerModal from '@/components/AdminDashboard/Broker/AddBrokerModal';
import { useGetAllBrokerQuery } from '@/redux/features/admin/broker-management/getAllBrokerApi';
import { useActiveBrokerMutation } from '@/redux/features/admin/broker-management/activeBrokerApi';
import { useDeactiveBrokerMutation } from '@/redux/features/admin/broker-management/deactiveBrokerApi';
import { useDeleteBrokerMutation } from '@/redux/features/admin/broker-management/deleteBrokerApi';
import debounce from 'lodash/debounce';

interface BrokerData {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    image: string | null;
    last_activity: string;
    is_deactivated: boolean;
    joining_date: string;
    active_leads: number;
    close_deals: number;
}

interface UserCardProps {
    id: string;
    name: string;
    phone: string;
    email: string;
    activeLeads: number;
    closedDeals: number;
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
    activeLeads,
    closedDeals,
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
            {/* Loading overlay when changing status or deleting */}
            {(isChangingStatus || isDeleting) && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-3">
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
                <div className="flex flex-col items-end gap-2">
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

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="text-gray-500 text-sm mb-1">Active Leads</div>
                    <div className="text-gray-900 font-semibold text-base">{activeLeads.toString().padStart(2, '0')}</div>
                </div>
                <div>
                    <div className="text-gray-500 text-sm mb-1">Closed Deals</div>
                    <div className="text-gray-900 font-semibold text-base">{closedDeals.toString().padStart(2, '0')}</div>
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

            <div className="text-gray-500 text-sm mb-4">Last active: {lastActive}</div>

            {/* Message Broker Button */}
            {/* <button
                className={`${isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 hover:bg-gray-500'} text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-2 transition-colors ${!isActive || isChangingStatus || isDeleting ? 'cursor-not-allowed' : ''}`}
                disabled={!isActive || isChangingStatus || isDeleting}
            >
                <MessageSquare size={16} />
                Message Broker
            </button> */}
        </div>
    );
};

const Broker: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const itemsPerPage = 5;

    const [statusChangingId, setStatusChangingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string, name: string } | null>(null);


    // Query params for the API
    const queryParams = {
        page: currentPage,
        page_size: itemsPerPage,
        search: debouncedSearchTerm || undefined
    };

    // Fetch data with pagination and search
    const { data: brokersData, isLoading, error, refetch } = useGetAllBrokerQuery(queryParams);

    const [activeBroker] = useActiveBrokerMutation();
    const [deactiveBroker] = useDeactiveBrokerMutation();
    const [deleteBroker] = useDeleteBrokerMutation();

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

    // Show notification
    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // Handle status change
    const handleStatusChange = async (id: string, shouldBeActive: boolean) => {
        setStatusChangingId(id);

        try {
            if (shouldBeActive) {
                // Activate broker: set is_deactivated to false
                await activeBroker({ id }).unwrap();
                showNotification('success', 'Broker activated successfully');
            } else {

                await deactiveBroker({ id }).unwrap();
                showNotification('success', 'Broker deactivated successfully');
            }

            // Refresh the data
            refetch();

        } catch (err) {
            console.error('Failed to update broker status:', err);
            showNotification('error', 'Failed to update broker status');
        } finally {
            setStatusChangingId(null);
        }
    };

    // Handle delete broker
    const handleDelete = async (id: string, name: string) => {
        setConfirmDelete({ id, name });
    };

    // Confirm delete
    const confirmDeleteBroker = async () => {
        if (!confirmDelete) return;

        setDeletingId(confirmDelete.id);

        try {
            await deleteBroker(confirmDelete.id).unwrap();
            showNotification('success', `Broker "${confirmDelete.name}" deleted successfully`);
            refetch();
        } catch (err) {
            console.error('Failed to delete broker:', err);
            showNotification('error', 'Failed to delete broker');
        } finally {
            setDeletingId(null);
            setConfirmDelete(null);
        }
    };

    // Cancel delete
    const cancelDelete = () => {
        setConfirmDelete(null);
    };

    // Format date functions
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

    // Convert backend data to UserCardProps format
    const allUsers: UserCardProps[] = brokersData?.results?.map((broker: BrokerData) => ({
        id: broker.id,
        name: broker.full_name,
        phone: broker.phone_number,
        email: broker.email,
        activeLeads: broker.active_leads,
        closedDeals: broker.close_deals,
        memberSince: formatDate(broker.joining_date),
        lastActive: formatDateTime(broker.last_activity),
        // isActive is the inverse of is_deactivated
        isActive: !broker.is_deactivated,
        onStatusChange: handleStatusChange,
        onDelete: handleDelete,
        isChangingStatus: statusChangingId === broker.id,
        isDeleting: deletingId === broker.id
    })) || [];

    // Calculate pagination values from API response
    const totalUsers = brokersData?.count || 0;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    // Get current page data
    const currentUsers = allUsers;

    const handleBrokerAdded = () => {
        refetch();
        showNotification('success', 'Broker added successfully');
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset to page 1 when search term changes
    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            setCurrentPage(1);
        }
    }, [debouncedSearchTerm]);

    // Calculate display range
    const getDisplayRange = () => {
        const start = ((currentPage - 1) * itemsPerPage) + 1;
        const end = Math.min(currentPage * itemsPerPage, totalUsers);
        return { start, end };
    };

    const { start, end } = getDisplayRange();

    return (
        <div>
            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Broker</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete broker <span className="font-semibold">"{confirmDelete.name}"</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteBroker}
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

            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <AlertCircle className={`w-5 h-5 ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {notification.message}
                    </span>
                    <button
                        onClick={() => setNotification(null)}
                        className="ml-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>
            )}

            <AddBrokerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleBrokerAdded}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-900 leading-tight">
                        Broker Team Management
                    </h1>
                    <p className="mt-1 text-[14px] sm:text-[15px] text-gray-600 font-normal max-w-xl">
                        24/7 expert broker coverage with dedicated single point of contact
                    </p>
                </div>

                <div className="self-start sm:self-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="
                            bg-[#126AD8]
                            px-4 py-2.5
                            rounded-dm
                            text-white
                            flex items-center gap-2
                            text-sm font-medium
                            transition-all duration-200
                            hover:bg-[#0f5bbf]
                            hover:scale-105
                            active:scale-95
                        "
                    >
                        <User className="w-5 h-5" />
                        <span>Add Broker</span>
                    </button>
                </div>
            </div>

            <div className="w-full bg-gray-50 rounded-2xl mt-5">
                <div className="w-full p-3 ">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, email, or phone"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {debouncedSearchTerm && (
                            <div className="mt-2 text-sm text-gray-500">
                                Searching for: "{debouncedSearchTerm}"
                            </div>
                        )}
                    </div>

                    {/* Results Summary */}
                    {!isLoading && !error && totalUsers > 0 && (
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {start} to {end} of {totalUsers} broker{totalUsers !== 1 ? 's' : ''}
                            {debouncedSearchTerm && ' (filtered)'}
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="text-gray-600 mt-2">Loading brokers...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-600 text-sm">
                                Error loading brokers. Please try again.
                            </p>
                        </div>
                    )}

                    {/* User Cards */}
                    {!isLoading && !error && (
                        <div>
                            {currentUsers.length > 0 ? (
                                <>
                                    {currentUsers.map((user) => (
                                        <UserCard key={user.id} {...user} />
                                    ))}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    {debouncedSearchTerm ? (
                                        <p className="text-gray-600">No brokers found matching "{debouncedSearchTerm}"</p>
                                    ) : (
                                        <p className="text-gray-600">No brokers found. Add your first broker!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
                <div className='flex flex-col items-center my-8'>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                    <div className="mt-3 text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Broker;