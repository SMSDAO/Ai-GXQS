/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export const DynamicButton = ({ children, onClick, variant = 'primary' }: any) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                variant === 'primary' 
                ? 'bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-500' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
        >
            {children}
        </motion.button>
    );
};

export const EliteCard = ({ title, icon: Icon, children }: any) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-24 h-24 text-indigo-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                </div>
                {children}
            </div>
        </div>
    );
};
