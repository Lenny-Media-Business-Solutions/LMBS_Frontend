import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  FileText,
  LogOut,
  Loader2,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Settings,
  User as UserIcon,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { useClientAuth } from '../context/ClientAuthContext';
import { clientApi } from '../services/clientApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

type DashboardTab = 'overview' | 'projects' | 'quotes' | 'settings';

const SettingsTab: React.FC<{ user: any, updateUser: any }> = ({ user, updateUser }) => {
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setIsUpdatingPassword(true);
    setMessage({ type: '', text: '' });
    try {
      await clientApi.changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      console.error('Password update error:', err);
      let errorMsg = err.response?.data?.error || 'Failed to update password.';
      if (err.response?.data && !err.response.data.error) {
        const data = err.response.data;
        if (typeof data === 'object') {
          errorMsg = Object.entries(data)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ');
        }
      }
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {message.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-black text-navy-900 mb-6 flex items-center gap-2">
          <Lock size={20} className="text-gold-500" /> Change Password
        </h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={passwordData.old_password}
                onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-gold-500 outline-none font-bold text-sm pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-900 transition-colors"
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Password (Min. 8 characters)</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordData.new_password}
                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-gold-500 outline-none font-bold text-sm pr-12"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-900 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-gold-500 outline-none font-bold text-sm pr-12"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-900 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="w-full bg-navy-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-800 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isUpdatingPassword ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </div>
            ) : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const { user, logout, updateUser } = useClientAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Data states
  const [projectsData, setProjectsData] = useState<any>(null);
  const [quotesData, setQuotesData] = useState<any>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [projects, quotes] = await Promise.all([
        clientApi.getProjects(),
        clientApi.getQuotes(),
      ]);

      setProjectsData(projects);
      setQuotesData(quotes);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      let errorMessage = 'Failed to load data.';

      if (err.response) {
        errorMessage += ` Server returned ${err.response.status}: ${JSON.stringify(err.response.data)}`;
      } else if (err.message) {
        errorMessage += ` ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/client-login');
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete')) return 'bg-green-100 text-green-600';
    if (statusLower.includes('progress')) return 'bg-blue-100 text-blue-600';
    if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-100 text-gray-600';
  };

  const renderOverview = () => {
    if (!projectsData || !quotesData) return null;

    const activeProjects = projectsData.summary?.active || 0;
    const totalQuotes = quotesData.summary?.total || 0;

    return (
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Active Projects',
              value: activeProjects,
              icon: Briefcase,
              color: 'text-blue-500',
              bg: 'bg-blue-50',
              target: 'projects'
            },
            {
              label: 'Total Quotes',
              value: totalQuotes,
              icon: FileText,
              color: 'text-purple-500',
              bg: 'bg-purple-50',
              target: 'quotes'
            },
            {
              label: 'Completed',
              value: projectsData.summary?.completed || 0,
              icon: CheckCircle2,
              color: 'text-green-500',
              bg: 'bg-green-50',
              target: 'projects'
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveTab(stat.target as DashboardTab)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-navy-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
              <Clock size={20} className="text-gold-500" /> Recent Projects
            </h2>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-bold text-gold-600 hover:underline px-2 py-1 rounded-lg hover:bg-gold-50 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {projectsData.projects?.slice(0, 3).map((project: any) => (
              <div
                key={project.id}
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110 ${project.status === 'Completed' ? 'bg-green-500' : 'bg-gold-500'
                    }`}>
                    {project.status === 'Completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{project.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{project.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-navy-900">{project.progress}%</p>
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gold-500 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (!projectsData) return null;

    if (projectsData.projects?.length === 0) {
      return (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-black text-navy-900 mb-2">No Active Projects</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You don't have any active projects yet. Request a quote to get started!
          </p>
          <button
            onClick={() => navigate('/quote')}
            className="bg-gold-500 text-navy-900 px-8 py-3 rounded-xl font-bold hover:bg-gold-400 transition-all"
          >
            Request a Quote
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.projects?.map((project: any) => (
          <div key={project.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${project.type === 'Retainer' ? 'bg-teal-50 text-teal-600' : 'bg-gold-50 text-gold-600'
                }`}>
                <Briefcase size={20} />
              </div>
              <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <h3 className="text-xl font-black text-navy-900 mb-1">{project.name}</h3>
            <p className="text-[10px] text-gray-400 font-black uppercase mb-6 tracking-widest">{project.category}</p>
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gold-500" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
            {project.deadline && (
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold pt-4 border-t border-gray-50">
                <Calendar size={14} /> Deadline: {new Date(project.deadline).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderQuotes = () => {
    if (!quotesData) return null;

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-black text-navy-900">Your Quote Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <th className="px-8 py-4 w-1/4">Name</th>
                <th className="px-8 py-4 w-1/4">Services</th>
                <th className="px-8 py-4 w-1/3">Additional Details</th>
                <th className="px-8 py-4">Date Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {quotesData.quotes?.map((quote: any) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-navy-900">{quote.name}</td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-600">
                    {Array.isArray(quote.selected_services)
                      ? quote.selected_services.join(', ')
                      : (quote.selected_services || 'N/A')}
                  </td>
                  <td className="px-8 py-6 text-xs text-gray-500 max-w-xs truncate" title={quote.message}>
                    {quote.message}
                  </td>
                  <td className="px-8 py-6 text-xs text-gray-400">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-gold-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAllData}
            className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-[84px]">
        {/* Sidebar */}
        <aside className="w-72 bg-navy-900 hidden lg:flex flex-col text-white border-r border-white/5 shadow-2xl z-20">
          <div className="p-8">
            {/* User Info */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-navy-900 font-black">
                  {user?.first_name?.[0] || user?.username?.[0] || 'C'}
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight truncate w-32">
                    {user?.first_name || user?.username || 'Client'}
                  </p>
                  <p className="text-[9px] text-gold-500 font-black uppercase">Client Portal</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              {[
                { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
                { id: 'projects', name: 'Projects', icon: Briefcase },
                { id: 'quotes', name: 'Quotes', icon: FileText },
                { id: 'settings', name: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative z-[70] cursor-pointer ${activeTab === tab.id
                    ? 'bg-gold-500 text-navy-900 shadow-xl'
                    : 'text-gray-500 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <tab.icon size={18} /> {tab.name}
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 relative">
          <div className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur-md px-4 md:px-10 py-6 border-b border-gray-100">
            <div className="max-w-6xl mx-auto">
              <header className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black text-navy-900 tracking-tight">
                    {activeTab === 'overview' && 'Overview'}
                    {activeTab === 'projects' && 'Active Projects'}
                    {activeTab === 'quotes' && 'Quote Requests'}
                    {activeTab === 'settings' && 'Account Settings'}
                  </h1>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Welcome back, {user?.first_name || user?.username}
                  </p>
                </div>
              </header>
            </div>
          </div>

          <div className="max-w-6xl mx-auto pt-8 pb-12 px-4 md:px-10">
            {/* Main Content Area */}

            {/* Mobile Tab Switcher - Visible only on mobile/tablet */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 pb-6 mb-8 border-b border-gray-100">
              {[
                { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
                { id: 'projects', name: 'Projects', icon: Briefcase },
                { id: 'quotes', name: 'Quotes', icon: FileText },
                { id: 'settings', name: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                    ? 'bg-gold-500 text-navy-900 shadow-xl scale-105'
                    : 'bg-white text-gray-500 border border-gray-100'
                    }`}
                >
                  <tab.icon size={14} /> {tab.name}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'projects' && renderProjects()}
              {activeTab === 'quotes' && renderQuotes()}
              {activeTab === 'settings' && <SettingsTab user={user} updateUser={updateUser} />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;