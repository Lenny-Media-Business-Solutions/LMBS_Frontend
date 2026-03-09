import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminApi';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Image as ImageIcon, Video, Trash2, Edit, ExternalLink, AlertCircle } from 'lucide-react';

const Portfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Websites',
        description: '',
        website_url: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Confirmation Modal State
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: '',
        message: '',
        type: 'danger' as 'danger' | 'success' | 'info' | 'warning',
        confirmText: 'Confirm',
    });
    const [pendingAction, setPendingAction] = useState<() => Promise<void> | void>(() => { });

    const categories = ["Websites", "Corporate Photography", "Product Photography", "Branding", "Videography"];

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await adminService.getPortfolioItems();
            setItems(Array.isArray(data) ? data : (data.results || []));
        } catch (error) {
            console.error("Failed to fetch portfolio items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('website_url', formData.website_url);
            if (selectedFile) {
                data.append('image', selectedFile); // Backend field is called 'image' but accepts files
            }

            if (editingItem) {
                await adminService.updatePortfolioItem(editingItem.id, data);
            } else {
                if (!selectedFile) {
                    alert("Please select an image or video file.");
                    setSubmitting(false);
                    return;
                }
                await adminService.createPortfolioItem(data);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setSelectedFile(null);
            fetchItems();
        } catch (error: any) {
            console.error("Failed to save portfolio item", error);
            alert("Failed to save item. Please check the logs.");
        } finally {
            setSubmitting(false);
        }
    };

    const triggerConfirm = (
        title: string,
        message: string,
        action: () => Promise<void> | void,
        type: 'danger' | 'success' | 'info' | 'warning' = 'danger',
        confirmText: string = 'Confirm'
    ) => {
        setConfirmConfig({ title, message, type, confirmText });
        setPendingAction(() => action);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        await pendingAction();
        setConfirmOpen(false);
    };

    const handleDelete = (item: any) => {
        triggerConfirm(
            "Delete Portfolio Item",
            `Are you sure you want to delete "${item.title}"? This action cannot be undone.`,
            async () => {
                await adminService.deletePortfolioItem(item.id);
                fetchItems();
            },
            'danger',
            'Delete'
        );
    };

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Bulk Delete Items",
            `Are you sure you want to delete ${ids.length} items? This action cannot be undone.`,
            async () => {
                await adminService.bulkDeletePortfolioItems(ids);
                fetchItems();
            },
            'danger',
            'Delete All'
        );
    };

    const columns = [
        {
            header: 'Preview',
            accessor: (row: any) => {
                const isVideo = row.image?.toLowerCase().match(/\.(mp4|webm|ogg)$/);
                return (
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                        {isVideo ? (
                            <Video size={20} className="text-navy-900" />
                        ) : row.image ? (
                            <img src={row.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon size={20} className="text-gray-400" />
                        )}
                    </div>
                );
            }
        },
        { header: 'Title', accessor: 'title' },
        {
            header: 'Category',
            accessor: (row: any) => (
                <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {row.category}
                </span>
            )
        },
        {
            header: 'Website',
            accessor: (row: any) => row.website_url ? (
                <a href={row.website_url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline flex items-center gap-1">
                    Visit <ExternalLink size={12} />
                </a>
            ) : <span className="text-gray-400">-</span>
        },
        { header: 'Date Added', accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setEditingItem(row);
                            setFormData({
                                title: row.title,
                                category: row.category,
                                description: row.description || '',
                                website_url: row.website_url || '',
                            });
                            setSelectedFile(null);
                            setIsModalOpen(true);
                        }}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                    <a
                        href={row.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Full File"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Portfolio Management</h1>
                    <p className="text-gray-500">Manage images and videos showcased in your public portfolio</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ title: '', category: 'Websites', description: '', website_url: '' });
                        setSelectedFile(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-500 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Add New Item
                </button>
            </div>

            <AdminTable
                title="Portfolio Work"
                columns={columns}
                data={items}
                loading={loading}
                onBulkDelete={handleBulkDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "Update Portfolio Item" : "New Portfolio Item"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Work Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:border-teal-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Modern E-commerce Website"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:border-teal-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:border-teal-500 min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the work done..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Website URL (Optional)</label>
                        <input
                            type="url"
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:border-teal-500"
                            value={formData.website_url}
                            onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                            placeholder="https://example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            {editingItem ? "Replace File (Leave empty to keep current)" : "Upload Image or Video"}
                        </label>
                        <div className="mt-1 flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 flex items-start gap-1">
                            <AlertCircle size={12} className="mt-0.5" />
                            Supported formats: Images (JPG, PNG, WEBP) and Videos (MP4, WEBM). Max size determined by Cloudinary limits.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {editingItem ? "Update Gallery" : "Upload to Portfolio"}
                    </button>
                </form>
            </Modal>

            <ConfirmationModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                title={confirmConfig.title}
                message={confirmConfig.message}
                type={confirmConfig.type}
                confirmText={confirmConfig.confirmText}
            />
        </div>
    );
};

export default Portfolio;
