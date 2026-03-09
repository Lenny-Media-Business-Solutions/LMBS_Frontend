import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';

const ClientRegister: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2">
                        <span className="text-gold-500">LMBS</span> Marketing
                    </h1>
                    <p className="text-gray-400">Client Portal Access</p>
                </div>

                {/* Access Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-navy-900" size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Invitation Only Access</h2>

                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Access to the Client Portal is currently by invitation only.
                        If you have requested a quote or are an existing client,
                        an account will be created for you and credentials sent to your email.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-navy-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all flex items-center justify-center gap-2"
                        >
                            Request a Quote <ArrowRight size={20} />
                        </Link>

                        <Link
                            to="/client-login"
                            className="bg-white text-navy-900 border-2 border-navy-900 px-8 py-3 rounded-xl font-bold hover:bg-navy-50 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Need help accessing your account?{' '}
                            <Link to="/contact" className="text-gold-600 font-bold hover:text-gold-700">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ClientRegister;
