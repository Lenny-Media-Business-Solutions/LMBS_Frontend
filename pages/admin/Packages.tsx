import React, { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import { adminService } from '../../services/adminApi';
import { Plus } from 'lucide-react';

const PackagesAdmin = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        period: '',
        slug: '',
        features: '',
        is_recommended: false
    });

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const data = await adminService.getPackages();
            setPackages(Array.isArray(data) ? data : (data.results || []));
        } catch (error) {
            console.error("Failed to fetch packages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleOpenModal = (pkg: any = null) => {
        if (pkg) {
            setSelectedPackage(pkg);
            setFormData({
                title: pkg.title,
                price: pkg.price,
                period: pkg.period,
                slug: pkg.slug,
                features: Array.isArray(pkg.features) ? pkg.features.join('\n') : pkg.features,
                is_recommended: pkg.is_recommended
            });
        } else {
            setSelectedPackage(null);
            setFormData({
                title: '',
                price: '',
                period: '',
                slug: '',
                features: '',
                is_recommended: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            features: formData.features.split('\n').filter(f => f.trim() !== '')
        };
        try {
            if (selectedPackage) {
                await adminService.updatePackage(selectedPackage.id, dataToSend);
            } else {
                await adminService.createPackage(dataToSend);
            }
            setIsModalOpen(false);
            fetchPackages();
        } catch (error) {
            console.error("Failed to save package", error);
            alert("Error saving package. Please check fields.");
        }
    };

    const handleDelete = async (pkg: any) => {
        if (window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
            try {
                await adminService.deletePackage(pkg.id);
                fetchPackages();
            } catch (error) {
                console.error("Failed to delete package", error);
            }
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Price', accessor: (row: any) => `${row.price} / ${row.period}` },
        { header: 'Recommended', accessor: (row: any) => row.is_recommended ? '✅' : '❌' },
        { header: 'Slug', accessor: 'slug' },
    ];

    if (loading && packages.length === 0) return <div>Loading packages...</div>;

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-navy-900">Packages Management</h1>
                    <p className="text-gray-500 text-sm">Create and manage your subscription packages</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-sm"
                >
                    <Plus size={20} />
                    Add Package
                </button>
            </div>

            <AdminTable
                title="Active Packages"
                data={packages}
                columns={columns}
                searchPlaceholder="Search packages..."
                onEdit={handleOpenModal}
                onDelete={handleDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedPackage ? 'Edit Package' : 'Add New Package'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Slug</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Price</label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Period</label>
                            <input
                                type="text"
                                required
                                value={formData.period}
                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                placeholder="e.g. month, one-time"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_recommended"
                            checked={formData.is_recommended}
                            onChange={(e) => setFormData({ ...formData, is_recommended: e.target.checked })}
                            className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                        />
                        <label htmlFor="is_recommended" className="text-sm font-semibold text-gray-700">Recommended Package</label>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Features (one per line)</label>
                        <textarea
                            rows={6}
                            required
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-navy-800 transition-colors font-semibold"
                        >
                            {selectedPackage ? 'Update Package' : 'Create Package'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PackagesAdmin;
