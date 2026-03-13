import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const { login, verifyOTP } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (!isOtpStep) {
                const data = await login({ username, password });
                if (data['2fa_required']) {
                    setUserId(data.user_id);
                    setIsOtpStep(true);
                } else {
                    navigate('/secure-admin-7090/dashboard');
                }
            } else {
                if (userId) {
                    await verifyOTP({ user_id: userId, otp });
                    navigate('/secure-admin-7090/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || err.response?.data?.error || err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-gold-500 p-6 text-center">
                    <h2 className="text-2xl font-heading font-bold text-navy-900">Admin Portal</h2>
                    <p className="text-navy-800 opacity-80 mt-1">LMBS Marketing</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    {!isOtpStep ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all outline-none"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-navy-900 text-white py-3.5 rounded-xl font-bold hover:bg-navy-800 transition-all transform active:scale-95 shadow-lg"
                            >
                                Sign In
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-gray-600 text-sm">
                                    A verification code has been sent to your registered email address.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all outline-none text-center text-2xl tracking-[0.5em] font-bold"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-bold hover:bg-teal-600 transition-all transform active:scale-95 shadow-lg"
                            >
                                Verify & Login
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsOtpStep(false)}
                                className="w-full text-gray-500 text-sm hover:text-navy-900 transition-colors font-semibold"
                            >
                                Back to Login
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
