import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminApi';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Folder, Calendar, User, TrendingUp, Paintbrush, Edit, Trash2 } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'One-Off',
        category: 'Development',
        status: 'Active',
        progress: 0,
        deadline: '',
        client: '' // Should be user ID
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

    const fetchData = async () => {
        try {
            const [projectsData, usersData] = await Promise.all([
                adminService.getProjects(),
                adminService.getUsers()
            ]);
            setProjects(projectsData);
            setUsers(usersData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await adminService.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await adminService.updateProject(editingProject.id, formData);
            } else {
                await adminService.createProject(formData);
            }
            setIsModalOpen(false);
            setEditingProject(null);
            fetchProjects();
        } catch (error: any) {
            console.error("Failed to save project", error);
            let msg = "Failed to save project.";
            if (error.response?.data) {
                msg += " " + JSON.stringify(error.response.data);
            } else if (error.message) {
                msg += " " + error.message;
            }
            alert(msg);
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

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Delete Projects",
            `Are you sure you want to delete ${ids.length} projects? This action cannot be undone.`,
            async () => {
                await adminService.bulkDeleteProjects(ids);
                fetchProjects();
            },
            'danger',
            'Delete Selection'
        );
    };

    const handleDelete = (project: any) => {
        triggerConfirm(
            "Delete Project",
            `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
            async () => {
                await adminService.deleteProject(project.id);
                fetchProjects();
            },
            'danger',
            'Delete'
        );
    };

    const getClientName = (clientId: number) => {
        const client = users.find(u => u.id === clientId);
        return client ? `${client.first_name} ${client.last_name} (${client.username})` : 'Unknown Client';
    };

    const columns: any[] = [
        { header: 'Project Name', accessor: 'name' },
        { header: 'Client', accessor: (row: any) => getClientName(row.client) },
        { header: 'Type', accessor: 'type' },
        {
            header: 'Status',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Progress',
            accessor: (row: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500" style={{ width: `${row.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{row.progress}%</span>
                </div>
            )
        },
        { header: 'Deadline', accessor: (row: any) => row.deadline ? new Date(row.deadline).toLocaleDateString() : 'N/A' },
        {
            header: 'Actions', accessor: (row: any) => (
                <div className="flex items-center gap-2 relative z-50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject(row);
                            setFormData({
                                name: row.name,
                                type: row.type,
                                category: row.category,
                                status: row.status,
                                progress: row.progress,
                                deadline: row.deadline,
                                client: row.client
                            });
                            setIsModalOpen(true);
                        }}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit Project"
                    >
                        <Edit size={16} />
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

    const clientUsers = users.filter(u => u.role === 'CLIENT');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Client Projects</h1>
                    <p className="text-gray-500">Track and manage active design and development projects</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setFormData({ name: '', type: 'One-Off', category: 'Development', status: 'Active', progress: 0, deadline: '', client: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-500 transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Create Project
                </button>
            </div>

            <AdminTable
                title="Active Projects"
                columns={columns}
                data={projects}
                loading={loading}
                onBulkDelete={handleBulkDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProject ? "Update Project" : "New Project"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-xl outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-xl outline-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="One-Off">One-Off</option>
                                <option value="Retainer">Retainer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full px-4 py-2 border rounded-xl outline-none"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>Active</option>
                                <option>Planning</option>
                                <option>Testing</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Progress (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full px-4 py-2 border rounded-xl outline-none"
                            value={formData.progress}
                            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Deadline</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border rounded-xl outline-none"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Client</label>
                        <select
                            required
                            className="w-full px-4 py-2 border rounded-xl outline-none"
                            value={formData.client}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        >
                            <option value="">Select Client...</option>
                            {clientUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name} ({user.username})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all"
                    >
                        {editingProject ? "Update Details" : "Create Project"}
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

export default Projects;
