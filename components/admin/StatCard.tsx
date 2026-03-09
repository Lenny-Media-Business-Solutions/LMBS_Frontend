import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
    bgColor?: string;
    growth?: string;
    trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = 'text-gold-500', bgColor = 'bg-gray-50', growth, trend }) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${bgColor} ${color}`}>
                    <Icon size={22} />
                </div>
                {growth && (
                    <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                        {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {growth}
                    </div>
                )}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-2xl font-black text-navy-900">{value}</p>
        </div>
    );
};

export default StatCard;
