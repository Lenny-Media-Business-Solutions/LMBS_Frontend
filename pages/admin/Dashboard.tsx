import React, { useEffect, useState } from 'react';
import {
    Users,
    FileText,
    MessageSquare,
    Settings,
    Briefcase,
    ClipboardList,
    Layers,
    TrendingUp,
    BarChart3,
    Calendar,
    DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import { adminService } from '../../services/adminApi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        users: 0,
        contacts: 0,
        quotes: 0,
        services: 0,
        packages: 0,
        jobs: 0,
        applications: 0,
        projects: 0,
        usersGrowth: 0,
        quotesGrowth: 0,
        contactsGrowth: 0,
        projectsGrowth: 0,
        chartData: [] as { label: string, value: number }[],
        revenueProgress: 0,
        actualRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats({
                    users: data.total_users || 0,
                    contacts: data.total_contacts || 0,
                    quotes: data.total_quotes || 0,
                    services: data.total_services || 0,
                    packages: data.total_packages || 0,
                    jobs: data.total_jobs || 0,
                    applications: data.total_applications || 0,
                    projects: data.total_projects || 0,
                    usersGrowth: data.users_growth || 0,
                    quotesGrowth: data.quotes_growth || 0,
                    contactsGrowth: data.contacts_growth || 0,
                    projectsGrowth: data.projects_growth || 0,
                    chartData: data.chart_data || [],
                    revenueProgress: data.revenue_progress || 0,
                    actualRevenue: data.actual_revenue || 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
    );

    const formatGrowth = (val: number) => {
        const prefix = val >= 0 ? '+' : '';
        return `${prefix}${val}%`;
    };

    const statRows = [
        {
            label: 'Total Users',
            value: stats.users,
            icon: Users,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            growth: formatGrowth(stats.usersGrowth),
            trend: stats.usersGrowth >= 0 ? 'up' : 'down',
            path: '/admin/dashboard/users'
        },
        {
            label: 'Quotes',
            value: stats.quotes,
            icon: FileText,
            color: 'text-gold-500',
            bgColor: 'bg-gold-50',
            growth: formatGrowth(stats.quotesGrowth),
            trend: stats.quotesGrowth >= 0 ? 'up' : 'down',
            path: '/admin/dashboard/quotes'
        },
        {
            label: 'Contact Inquiries',
            value: stats.contacts,
            icon: MessageSquare,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
            growth: formatGrowth(stats.contactsGrowth),
            trend: stats.contactsGrowth >= 0 ? 'up' : 'down',
            path: '/admin/dashboard/contacts'
        },
        {
            label: 'Active Projects',
            value: stats.projects,
            icon: Layers,
            color: 'text-teal-500',
            bgColor: 'bg-teal-50',
            growth: formatGrowth(stats.projectsGrowth),
            trend: stats.projectsGrowth >= 0 ? 'up' : 'down',
            path: '/admin/dashboard/projects'
        },
    ];

    const secondaryStats = [
        { label: 'Jobs', value: stats.jobs, icon: Briefcase, color: 'text-purple-500', path: '/admin/dashboard/jobs' },
        { label: 'Applications', value: stats.applications, icon: ClipboardList, color: 'text-orange-500', path: '/admin/dashboard/applications' },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Agency Overview 🏢</h1>
                    <p className="text-gray-500 text-sm">Track LMBS Marketing performance in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Calendar size={16} className="text-teal-500" />
                        {new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statRows.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => navigate(stat.path)}
                        className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    >
                        <StatCard
                            title={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                            bgColor={stat.bgColor}
                            growth={stat.growth}
                            trend={stat.trend as 'up' | 'down'}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Secondary Stats List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-lg font-bold text-navy-900 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-teal-500" />
                        Infrastructure Metrics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {secondaryStats.map((stat) => (
                            <div
                                key={stat.label}
                                onClick={() => navigate(stat.path)}
                                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-teal-50 cursor-pointer transition-all duration-300 group hover:shadow-md border border-transparent hover:border-teal-100"
                            >
                                <div className={`p-4 rounded-xl bg-white shadow-sm mb-3 ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <p className="text-lg font-black text-navy-900">{stat.value}</p>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 group-hover:text-teal-600 transition-colors">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Visual BarChart */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-navy-900">Activity Overview (Historical)</h2>
                    <div className="flex gap-2">
                        {['Last 6 Months'].map(t => (
                            <button key={t} className="px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all bg-navy-900 text-white shadow-lg">
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-48 flex items-end gap-3 px-4">
                    {stats.chartData.length > 0 ? (
                        stats.chartData.map((data, i) => {
                            const maxValue = Math.max(...stats.chartData.map(d => d.value), 1);
                            const heightPercentage = (data.value / maxValue) * 100;
                            return (
                                <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group h-full flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPercentage}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.8 }}
                                        className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${heightPercentage > 80 ? 'bg-teal-500' : heightPercentage > 50 ? 'bg-navy-700' : 'bg-gold-400'}`}
                                    />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {data.value}
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {data.label}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-full flex items-center justify-center text-gray-400 text-sm">No historical data available</div>
                    )}
                </div>
                <div className="mt-8"></div>
            </div>
        </div>
    );
};
export default Dashboard;
