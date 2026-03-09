import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminApi';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/admin/Modal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { ExternalLink, Trash2, Pencil, Eye } from 'lucide-react';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingApp, setViewingApp] = useState<any>(null);
    const [statusUpdate, setStatusUpdate] = useState('');

    // Confirmation Modal State
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: '',
        message: '',
        type: 'danger' as 'danger' | 'success' | 'info' | 'warning',
        confirmText: 'Confirm',
    });
    const [pendingAction, setPendingAction] = useState<() => Promise<void> | void>(() => { });

    const fetchApplications = async () => {
        try {
            const data = await adminService.getApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

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

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminService.updateApplication(viewingApp.id, { status: statusUpdate });
            setIsModalOpen(false);
            fetchApplications();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = (app: any) => {
        triggerConfirm(
            "Delete Application",
            `Are you sure you want to delete the application for ${app.first_name} ${app.last_name}?`,
            async () => {
                try {
                    await adminService.deleteApplication(app.id);
                    fetchApplications();
                } catch (error) {
                    console.error("Failed to delete application", error);
                }
            },
            'danger',
            'Delete Application'
        );
    };

    const handleBulkDelete = (ids: (string | number)[]) => {
        triggerConfirm(
            "Delete Applications",
            `Are you sure you want to delete ${ids.length} applications? This action cannot be undone.`,
            async () => {
                try {
                    await adminService.bulkDeleteApplications(ids);
                    fetchApplications();
                } catch (error) {
                    console.error("Failed to bulk delete applications", error);
                }
            },
            'danger',
            'Delete Selection'
        );
    };

    const columns: any[] = [
        {
            header: 'Status',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                    row.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Applicant', accessor: (row: any) => `${row.first_name} ${row.last_name}` },
        { header: 'Position', accessor: (row: any) => row.area_of_interest || row.job_title || 'Spontaneous' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        {
            header: 'Resume',
            accessor: (row: any) => row.resume ? (
                <a
                    href={(() => {
                        if (!row.resume) return '#';
                        if (row.resume.startsWith('http')) return row.resume;
                        // Get base URL from env or default, strip /api/v1 suffixes to get root
                        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
                        const baseUrl = apiUrl.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '');
                        // Ensure resume starts with / if it doesn't
                        const resumePath = row.resume.startsWith('/') ? row.resume : `/${row.resume}`;
                        return `${baseUrl}${resumePath}`;
                    })()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-500 hover:text-teal-600 flex items-center gap-1 font-bold text-xs"
                >
                    View <ExternalLink size={12} />
                </a>
            ) : <span className="text-gray-400">N/A</span>
        },
        {
            header: 'Actions',
            accessor: (row: any) => (
                <div className="flex items-center gap-2 relative z-50">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewingApp(row);
                            setStatusUpdate(row.status);
                            setIsModalOpen(true);
                        }}
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View/Edit Details"
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Job Applications</h1>
                <p className="text-gray-500">Review and manage candidates for LMBS Marketing</p>
            </div>

            <AdminTable
                title="Active Applications"
                columns={columns}
                data={applications}
                loading={loading}
                onBulkDelete={handleBulkDelete}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Application Details"
                size="xl"
            >
                {viewingApp && (
                    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
                        {/* Section 1: Candidate Profile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                                    <p className="font-bold text-navy-900">{viewingApp.first_name} {viewingApp.last_name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="font-medium text-navy-900">{viewingApp.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="font-medium text-navy-900">{viewingApp.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Position</p>
                                    <p className="font-bold text-teal-600">{viewingApp.area_of_interest || viewingApp.job_title || 'Spontaneous Application'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Reference</p>
                                    <p className="font-medium text-navy-900">{viewingApp.job ? `#${viewingApp.job}` : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Date</p>
                                    <p className="font-medium text-navy-900">{new Date(viewingApp.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Professional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience Level</p>
                                <p className="font-bold text-navy-900">{viewingApp.experience_level || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years of Experience</p>
                                <p className="font-bold text-navy-900">{viewingApp.years_experience} Years</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Highest Education</p>
                                <p className="font-bold text-navy-900">{viewingApp.highest_education || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Section 3: Skills & Tools */}
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Skills & Tools</p>
                            <div className="flex flex-wrap gap-2">
                                {(viewingApp.skills || '').split(',').map((skill: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Section 4: Links & Salary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <div className="space-y-4">
                                {viewingApp.linkedin && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">LinkedIn Profile</p>
                                        <a href={viewingApp.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-bold flex items-center gap-1 mt-1">
                                            Visit Profile <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                                {viewingApp.portfolio && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Portfolio Link</p>
                                        <a href={viewingApp.portfolio} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline text-sm font-bold flex items-center gap-1 mt-1">
                                            View Portfolio <ExternalLink size={14} />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4 text-right md:text-left lg:text-right">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Salary</p>
                                    <p className="font-black text-navy-900 text-lg">KES {Number(viewingApp.expected_salary || 0).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Availability</p>
                                    <p className="font-bold text-orange-500 uppercase tracking-widest text-xs">{viewingApp.availability || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Preferences */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Work Preference</p>
                                <p className="font-bold text-navy-900">{viewingApp.work_preference || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Referral Source</p>
                                <p className="font-bold text-navy-900">{viewingApp.referral_source || 'Direct'}</p>
                            </div>
                        </div>

                        {/* Section 6: Cover Letter */}
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Letter / Personal Note</p>
                            <div className="mt-1 p-4 bg-navy-900 text-gray-200 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-hide">
                                {viewingApp.cover_letter || "No cover letter provided."}
                            </div>
                        </div>

                        <form onSubmit={handleUpdateStatus} className="pt-6 border-t flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-grow w-full">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Update Application Status</label>
                                <select
                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl outline-none bg-white font-bold text-navy-900 focus:ring-4 ring-teal-500/10 transition-all"
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                >
                                    <option>Pending</option>
                                    <option>Interviewing</option>
                                    <option>Accepted</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full sm:w-auto bg-navy-900 text-white px-10 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gold-500 hover:text-navy-900 transition-all shadow-xl self-end">
                                Save Status Change
                            </button>
                        </form>
                    </div>
                )}
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

export default Applications;
