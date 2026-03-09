import React, { useEffect, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { adminService } from '../../services/adminApi';
import { Trash2 } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await adminService.getUsers();
                // Handle list vs paginated result
                const list = Array.isArray(data) ? data : (data.results || []);
                setUsers(list);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [refreshKey]);

    const handleDeleteUser = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await adminService.deleteUser(id);
                setRefreshKey(prev => prev + 1); // Trigger refresh
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    const columns = [
        { header: 'Username', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Full Name', accessor: (row: any) => `${row.first_name} ${row.last_name}` },
        {
            header: 'Role',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {row.role}
                </span>
            )
        },
        {
            header: 'Status',
            accessor: (row: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {row.is_active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        { header: 'Joined', accessor: (row: any) => new Date(row.date_joined).toLocaleDateString() },
        {
            header: 'Actions',
            accessor: (row: any) => (
                row.role !== 'ADMIN' && (
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteUser(row.id); }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                    >
                        <Trash2 size={16} />
                    </button>
                )
            )
        }
    ];

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-heading font-bold text-navy-900">Users Config</h1>
            </div>
            <AdminTable
                title="System Users"
                data={users}
                columns={columns}
                searchPlaceholder="Search users..."
            />
        </div>
    );
};

export default Users;
