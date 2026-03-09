import React, { useEffect, useState } from 'react';
import { Plus, Briefcase, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import { adminService } from '../../services/adminApi';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        is_active: true
    });

    // Confirmation Modal State
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: '',
        message: '',
        type: 'danger' as 'danger' | 'success' | 'info' | 'warning',
        confirmText: 'Confirm',
    });
    const [pendingAction, setPendingAction] = useState<() => Promise<void> | void>(() => { });

    const fetchJobs = async () => {
        try {
            const data = await adminService.getJobs();
            setJobs(data);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await adminService.updateJob(editingJob.id, formData);
            } else {
                await adminService.createJob(formData);
            }
            setIsModalOpen(false);
            setEditingJob(null);
            setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', is_active: true });
            fetchJobs();
        } catch (error) {
            console.error("Failed to save job", error);
            alert("Error saving job listing");
        }
    };

    const handleEdit = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            description: job.description,
            requirements: job.requirements,
            is_active: job.is_active
        });
        setIsModalOpen(true);
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

    const handleDelete = (job: any) => {
        triggerConfirm(
            "Delete Job Listing",
            `Are you sure you want to delete the job listing for ${job.title}? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.deleteJob(job.id);
                    fetchJobs();
                } catch (error) {
                    console.error("Failed to delete job", error);
                }
            },
            'danger',
            'Delete Listing'
        );
    };

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Delete Multiple Jobs",
            `Are you sure you want to delete ${ids.length} job listings? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.bulkDeleteJobs(ids);
                    fetchJobs();
                } catch (error) {
                    console.error("Failed to delete jobs in bulk", error);
                    alert("Failed to delete jobs in bulk");
                }
            },
            'danger',
            'Delete Selection'
        );
    };

    const columns: any[] = [
        { header: 'Job Title', accessor: 'title' },
        { header: 'Department', accessor: 'department' },
        { header: 'Location', accessor: 'location' },
        { header: 'Type', accessor: 'type' },
        {
            header: 'Status',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Job Listings</h1>
                    <p className="text-gray-500">Manage careers and openings at LMBS Marketing</p>
                </div>
                <button
                    onClick={() => {
                        setEditingJob(null);
                        setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', is_active: true });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20"
                >
                    <Plus size={20} />
                    Add New Job
                </button>
            </div>

            <AdminTable
                title="Active Jobs"
                columns={columns}
                data={jobs}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBulkDelete={handleBulkDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingJob ? "Edit Job Listing" : "Add New Job"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Job Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Senior Graphic Designer"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Creative, Marketing"
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Job Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Juja, Kenya / Remote"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
                        <textarea
                            rows={3}
                            placeholder="1–2 sentence summary shown on careers page"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none text-sm"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Requirements (one per line)</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        />
                        <label htmlFor="is_active" className="text-sm font-bold text-gray-700">Active Listing</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-navy-900 text-white py-3 rounded-xl font-bold hover:bg-teal-500 transition-all"
                    >
                        {editingJob ? "Update Job" : "Create Job"}
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

export default Jobs;
