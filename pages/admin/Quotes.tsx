import React, { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { adminService } from '../../services/adminApi';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { UserPlus, Mail, Eye, Trash2 } from 'lucide-react';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState<any>(null);

    // Confirmation Modal State
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: '',
        message: '',
        type: 'danger' as 'danger' | 'success' | 'info' | 'warning',
        confirmText: 'Confirm',
    });
    const [pendingAction, setPendingAction] = useState<() => Promise<void> | void>(() => { });
    const [confirmIsLoading, setConfirmIsLoading] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(true);

    const errorTranslator = (error: any) => {
        const message = error.response?.data?.error || error.response?.data?.detail || error.message || "";
        if (message.includes("Duplicate entry") || message.includes("already exists")) {
            return "An account with this email already exists. Please use a different email or manage the existing account.";
        }
        return message || "An unexpected error occurred. Please try again.";
    };
    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const data = await adminService.getQuotes();
            const list = Array.isArray(data) ? data : (data.results || []);
            setQuotes(list);
        } catch (error) {
            console.error("Failed to fetch quotes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const triggerConfirm = (
        title: string,
        message: string,
        action: () => Promise<void> | void,
        type: 'danger' | 'success' | 'info' | 'warning' = 'danger',
        confirmText: string = 'Confirm',
        showCancel: boolean = true
    ) => {
        setConfirmConfig({ title, message, type, confirmText });
        setPendingAction(() => action);
        setShowCancelButton(showCancel);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        setConfirmIsLoading(true);
        try {
            await pendingAction();
        } finally {
            setConfirmIsLoading(false);
            setConfirmOpen(false);
        }
    };

    const handleDelete = (item: any) => {
        triggerConfirm(
            "Delete Quote Request",
            `Are you sure you want to delete this quote request from ${item.name}? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.deleteQuote(item.id);
                    fetchQuotes();
                } catch (error) {
                    console.error("Failed to delete quote", error);
                    alert("Failed to delete quote");
                }
            },
            'danger',
            'Delete Quote'
        );
    };

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Delete Multiple Quotes",
            `Are you sure you want to delete ${ids.length} quotes? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.bulkDeleteQuotes(ids);
                    fetchQuotes();
                    setSelectedQuote(null);
                } catch (error) {
                    console.error("Failed to delete quotes", error);
                    alert("Failed to delete quotes in bulk");
                }
            },
            'danger',
            'Delete Selection'
        );
    };

    const handleRowClick = async (item: any) => {
        setSelectedQuote(item);
        if (!item.is_read) {
            try {
                await adminService.markQuoteAsRead(item.id);
                setQuotes((prev: any) =>
                    prev.map((q: any) => q.id === item.id ? { ...q, is_read: true } : q)
                );
            } catch (error) {
                console.error("Failed to mark as read", error);
            }
        }
    };

    const handleCreateAccount = (e: React.MouseEvent, quote: any) => {
        if (e) e.stopPropagation();

        triggerConfirm(
            "Create Client Account",
            `Create a client account for ${quote.name}? System will generate a random password and email it to ${quote.email}.`,
            async () => {
                try {
                    const nameParts = quote.name.split(' ');
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(' ') || '';

                    await adminService.createClientAccount({
                        email: quote.email,
                        first_name: firstName,
                        last_name: lastName,
                        phone: quote.phone
                    });

                    // Update local state to reflect account created (optional, but good for UX)
                    if (selectedQuote) setSelectedQuote(null);

                    // Success Feedback
                    setTimeout(() => {
                        triggerConfirm(
                            "Account Created",
                            `Account created successfully for ${quote.name}. Credentials have been emailed to ${quote.email}.`,
                            () => { },
                            'success',
                            'Great!',
                            false
                        );
                    }, 500);
                } catch (error: any) {
                    console.error("Failed to create account", error);
                    const friendlyMessage = errorTranslator(error);

                    setTimeout(() => {
                        triggerConfirm(
                            "Creation Failed",
                            friendlyMessage,
                            () => { },
                            'danger',
                            'Understand',
                            false
                        );
                    }, 500);
                }
            },
            'info',
            'Create Account'
        );
    };

    const columns = [
        {
            header: 'Status', accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold 
                ${row.status === 'NEW' ? 'bg-blue-100 text-blue-700' :
                        row.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Name', accessor: 'name' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Date', accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Services', accessor: (row: any) => (
                <div className="max-w-xs truncate font-medium" title={Array.isArray(row.selected_services) ? row.selected_services.join(', ') : row.selected_services}>
                    {Array.isArray(row.selected_services) ? row.selected_services.join(', ') : (row.selected_services || 'N/A')}
                </div>
            )
        },
        {
            header: 'Details', accessor: (row: any) => (
                <div className="max-w-xs truncate text-gray-400 italic" title={row.message}>
                    {row.message}
                </div>
            )
        },
        {
            header: 'Read Status', accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold 
                ${row.is_read ? 'bg-gray-100 text-gray-400' : 'bg-gold-100 text-gold-600 animate-pulse'}`}>
                    {row.is_read ? 'Viewed' : 'New'}
                </span>
            )
        },
        {
            header: 'Actions', accessor: (row: any) => (
                <div className="flex items-center gap-2 relative z-50">
                    <button
                        onClick={(e) => handleCreateAccount(e, row)}
                        className="p-2 bg-navy-50 text-navy-900 rounded-lg hover:bg-navy-100 transition-colors"
                        title="Create Client Account"
                    >
                        <UserPlus size={16} />
                    </button>
                    <button
                        onClick={() => handleRowClick(row)}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(row); }}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    if (loading && quotes.length === 0) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy-900">Quote Requests 💎</h1>
                <button
                    onClick={fetchQuotes}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Refresh
                </button>
            </div>
            <AdminTable
                title="Requested Quotes"
                data={quotes}
                columns={columns}
                loading={loading}
                onBulkDelete={handleBulkDelete}
                searchPlaceholder="Search by name, phone, or details..."
            />

            {/* Quote Detail Modal */}
            {selectedQuote && (
                <Modal
                    isOpen={!!selectedQuote}
                    onClose={() => setSelectedQuote(null)}
                    title={`Quote Request: ${selectedQuote.name}`}
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Client Name</p>
                                <p className="text-navy-900 font-semibold">{selectedQuote.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Date</p>
                                <p className="text-navy-900 font-semibold">{new Date(selectedQuote.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Email</p>
                                <p className="text-navy-900 font-semibold">{selectedQuote.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Phone</p>
                                <p className="text-navy-900 font-semibold">{selectedQuote.phone}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">Services Requested</p>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(selectedQuote.selected_services) ? selectedQuote.selected_services : [selectedQuote.selected_services]).map((service: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-gold-50 text-gold-700 rounded-lg text-xs font-bold border border-gold-100">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">Additional Details</p>
                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {selectedQuote.message}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 gap-3">
                            <button
                                onClick={() => setSelectedQuote(null)}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={(e) => handleCreateAccount(e, selectedQuote)}
                                className="px-6 py-2 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-colors flex items-center gap-2"
                            >
                                <UserPlus size={18} />
                                Create Account
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <ConfirmationModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                title={confirmConfig.title}
                message={confirmConfig.message}
                type={confirmConfig.type}
                confirmText={confirmConfig.confirmText}
                isLoading={confirmIsLoading}
                showCancel={showCancelButton}
            />
        </div>
    );
};

export default Quotes;
