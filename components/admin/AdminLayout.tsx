import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileText,
    Settings,
    LogOut,
    Package,
    Briefcase,
    ClipboardList,
    Layers,
    ChevronRight
} from 'lucide-react';
import Navbar from '../Navbar';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navSections = [
        {
            title: 'Main',
            items: [
                { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
                { path: '/admin/dashboard/users', icon: Users, label: 'Users' },
            ]
        },
        {
            title: 'CRM',
            items: [
                { path: '/admin/dashboard/contacts', icon: MessageSquare, label: 'Contact Inquiries' },
                { path: '/admin/dashboard/quotes', icon: FileText, label: 'Quote Requests' },
            ]
        },

        {
            title: 'Operations',
            items: [
                { path: '/admin/dashboard/projects', icon: Layers, label: 'Client Projects' },
                { path: '/admin/dashboard/portfolio', icon: LayoutDashboard, label: 'Portfolio Gallery' },
                { path: '/admin/dashboard/jobs', icon: Briefcase, label: 'Job Listings' },
                { path: '/admin/dashboard/applications', icon: ClipboardList, label: 'Job Applications' },
            ]
        }
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden pt-[84px]">
                {/* Sidebar */}
                <aside className="w-72 bg-navy-950 text-white flex flex-col shadow-2xl z-20 flex-shrink-0">
                    <div className="p-8 border-b border-white/5">
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                                LM
                            </div>
                            <div>
                                <p className="font-bold text-sm tracking-wide">Admin Portal</p>
                                <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Welcome Admin</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar">
                        {navSections.map((section) => (
                            <div key={section.title}>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-3">{section.title}</p>
                                <div className="space-y-1">
                                    {section.items.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            end={item.end}
                                            className={({ isActive }) =>
                                                `flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                    ? 'bg-teal-500/10 text-teal-400 font-bold border-l-4 border-teal-500 shadow-inner'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={18} />
                                                <span className="text-sm">{item.label}</span>
                                            </div>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="p-8 border-t border-white/5 mt-auto">
                        {user && (
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <div className="w-8 h-8 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-xs font-bold text-teal-400 uppercase">
                                    {user.username?.[0] || 'A'}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold truncate">{user.username}</p>
                                    <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-4 py-3 w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-all border border-red-500/5 group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Logout Session</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                    {/* Sticky Header */}
                    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-teal-500 rounded-full"></div>
                            <h2 className="text-xl font-bold text-navy-900 tracking-tight">Admin Dashboard</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-navy-900">{user?.username}</p>
                                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Administrator</p>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto pb-12 px-8 pt-8">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
};

export default AdminLayout;
