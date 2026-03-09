import React, { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { adminService } from '../../services/adminApi';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { UserPlus, Eye, Trash2 } from 'lucide-react';

const Contacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

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
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await adminService.getContacts();
            const list = Array.isArray(data) ? data : (data.results || []);
            setMessages(list);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
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
            "Delete Message",
            `Are you sure you want to delete this message from ${item.name}? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.deleteContact(item.id);
                    fetchMessages();
                    if (selectedMessage?.id === item.id) setSelectedMessage(null);
                } catch (error) {
                    console.error("Failed to delete message", error);
                    alert("Failed to delete message");
                }
            },
            'danger',
            'Delete Message'
        );
    };

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Delete Multiple Messages",
            `Are you sure you want to delete ${ids.length} messages? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.bulkDeleteContacts(ids);
                    fetchMessages();
                    setSelectedMessage(null);
                } catch (error) {
                    console.error("Failed to delete messages", error);
                    alert("Failed to delete messages in bulk");
                }
            },
            'danger',
            'Delete Selection'
        );
    };

    const handleRowClick = async (item: any) => {
        setSelectedMessage(item);
        if (!item.is_read) {
            try {
                await adminService.markContactAsRead(item.id);
                setMessages((prev: any) =>
                    prev.map((msg: any) => msg.id === item.id ? { ...msg, is_read: true } : msg)
                );
            } catch (error) {
                console.error("Failed to mark as read", error);
            }
        }
    };

    const handleCreateAccount = (e: React.MouseEvent, message: any) => {
        if (e) e.stopPropagation();

        triggerConfirm(
            "Create Client Account",
            `Create a client account for ${message.name}? System will generate a random password and email it to ${message.email}.`,
            async () => {
                try {
                    const nameParts = message.name.split(' ');
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(' ') || '';

                    await adminService.createClientAccount({
                        email: message.email,
                        first_name: firstName,
                        last_name: lastName,
                        phone: message.phone
                    });

                    if (selectedMessage) setSelectedMessage(null);

                    // Success Feedback
                    setTimeout(() => {
                        triggerConfirm(
                            "Account Created",
                            `Account created successfully for ${message.name}. Credentials have been emailed to ${message.email}.`,
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
            header: 'Status',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.is_read ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600 animate-pulse'}`}>
                    {row.is_read ? 'Read' : 'New'}
                </span>
            )
        },
        { header: 'Subject', accessor: 'subject' },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Message', accessor: (row: any) => (
                <div className="max-w-xs truncate" title={row.message}>
                    {row.message}
                </div>
            )
        },
        { header: 'Date', accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
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
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(row);
                        }}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row);
                        }}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    if (loading && messages.length === 0) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy-900">Contact Inquiries 📩</h1>
                <button
                    onClick={fetchMessages}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Refresh
                </button>
            </div>
            <AdminTable
                title="Recent Messages"
                data={messages}
                columns={columns}
                loading={loading}
                onBulkDelete={handleBulkDelete}
                searchPlaceholder="Search by name, subject, or content..."
            />

            {/* Message Detail Modal */}
            {selectedMessage && (
                <Modal
                    isOpen={!!selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                    title={selectedMessage.subject}
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">From</p>
                                <p className="text-navy-900 font-semibold">{selectedMessage.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Date</p>
                                <p className="text-navy-900 font-semibold">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Email</p>
                                <p className="text-navy-900 font-semibold">{selectedMessage.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Phone</p>
                                <p className="text-navy-900 font-semibold">{selectedMessage.phone}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-2">Message</p>
                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {selectedMessage.message}
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 gap-3">
                            <button
                                onClick={(e) => handleCreateAccount(e, selectedMessage)}
                                className="px-6 py-2 bg-navy-50 text-navy-900 rounded-xl font-bold hover:bg-navy-100 transition-colors flex items-center gap-2"
                            >
                                <UserPlus size={18} />
                                Create Account
                            </button>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-6 py-2 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-colors"
                            >
                                Close
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

export default Contacts;
