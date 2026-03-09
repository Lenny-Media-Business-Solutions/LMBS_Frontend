import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'success' | 'info' | 'warning';
    isLoading?: boolean;
    showCancel?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    isLoading = false,
    showCancel = true
}) => {
    if (!isOpen) return null;

    const colors = {
        danger: {
            bg: 'bg-red-50',
            icon: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700',
            border: 'border-red-100'
        },
        success: {
            bg: 'bg-green-50',
            icon: 'text-green-600',
            button: 'bg-green-600 hover:bg-green-700',
            border: 'border-green-100'
        },
        warning: {
            bg: 'bg-gold-50',
            icon: 'text-gold-600',
            button: 'bg-gold-500 hover:bg-gold-600',
            border: 'border-gold-100'
        },
        info: {
            bg: 'bg-navy-50',
            icon: 'text-navy-900',
            button: 'bg-navy-900 hover:bg-navy-800',
            border: 'border-navy-100'
        }
    };

    const config = colors[type];

    // Icon selection
    const Icon = type === 'danger' ? AlertTriangle :
        type === 'success' ? CheckCircle :
            type === 'warning' ? AlertTriangle : Info;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex gap-4">
                            {/* Icon Bubble */}
                            <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                                <Icon className={config.icon} size={24} />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-navy-900 mb-1">
                                    {title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {message}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            {showCancel && (
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-50 rounded-lg transition-colors text-sm disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`px-6 py-2 text-white font-bold rounded-lg transition-colors text-sm shadow-md flex items-center gap-2 ${config.button} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;
