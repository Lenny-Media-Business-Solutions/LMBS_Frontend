import React, { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import { adminService } from '../../services/adminApi';
import { Plus } from 'lucide-react';

const ServicesAdmin = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price_range: '',
        slug: '',
        category_id: ''
    });

    const fetchServices = async () => {
        setLoading(true);
        try {
            const [servicesData, categoriesData] = await Promise.all([
                adminService.getServices(),
                adminService.getServiceCategories()
            ]);
            setServices(Array.isArray(servicesData) ? servicesData : (servicesData.results || []));
            setCategories(Array.isArray(categoriesData) ? categoriesData : (categoriesData.results || []));
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleOpenModal = (service: any = null) => {
        if (service) {
            setSelectedService(service);
            setFormData({
                title: service.title,
                description: service.description,
                price_range: service.price_range,
                slug: service.slug,
                category_id: service.category?.id || ''
            });
        } else {
            setSelectedService(null);
            setFormData({
                title: '',
                description: '',
                price_range: '',
                slug: '',
                category_id: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedService) {
                await adminService.updateService(selectedService.id, formData);
            } else {
                await adminService.createService(formData);
            }
            setIsModalOpen(false);
            fetchServices();
        } catch (error) {
            console.error("Failed to save service", error);
            alert("Error saving service. Please check fields (e.g. unique slug).");
        }
    };

    const handleDelete = async (service: any) => {
        if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
            try {
                await adminService.deleteService(service.id);
                fetchServices();
            } catch (error) {
                console.error("Failed to delete service", error);
            }
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Category', accessor: (row: any) => row.category?.name || 'Uncategorized' },
        { header: 'Price Range', accessor: 'price_range' },
        { header: 'Slug', accessor: 'slug' },
    ];

    if (loading && services.length === 0) return <div>Loading services...</div>;

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-navy-900">Services Management</h1>
                    <p className="text-gray-500 text-sm">Create and manage your service offerings</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-sm"
                >
                    <Plus size={20} />
                    Add Service
                </button>
            </div>

            <AdminTable
                title="Active Services"
                data={services}
                columns={columns}
                searchPlaceholder="Search services..."
                onEdit={handleOpenModal}
                onDelete={handleDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedService ? 'Edit Service' : 'Add New Service'}
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
                            <label className="text-sm font-semibold text-gray-700">Price Range</label>
                            <input
                                type="text"
                                value={formData.price_range}
                                onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                                placeholder="e.g. $500 - $1000"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gold-500 focus:outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                            {selectedService ? 'Update Service' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ServicesAdmin;
