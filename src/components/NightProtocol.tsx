import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Stars, Power, Lock, Zap, Shield, Database } from 'lucide-react';

export const NightProtocol: React.FC = () => {
  const [hibernating, setHibernating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hibernating && progress < 100) {
      const timer = setInterval(() => {
        setProgress(p => Math.min(p + 2, 100));
      }, 50);
      return () => clearInterval(timer);
    }
  }, [hibernating, progress]);

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[32px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">
            <Moon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">System Hibernation</h2>
            <p className="text-xs text-indigo-400/60 font-mono uppercase tracking-[0.2em]">Good Night Protocol Active</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-[32px] p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-black pointer-events-none transition-opacity duration-1000"></div>
        
        {/* Animated stars in the background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
           {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i}
               className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
               }}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
             />
           ))}
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto text-center">
          <motion.div 
            animate={hibernating ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold tracking-tight mb-4">Initialize Night Protocol</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10">
              Engaging the Good Night protocol will compile final resources, optimize all mesh routing, flush cache buffers, and put the GXQS V19 Codex into deep learning hibernation.
            </p>
            
            <button 
              onClick={() => setHibernating(true)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 w-full justify-center"
            >
              <Power size={16} /> Execute Good Night
            </button>
          </motion.div>

          {hibernating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="w-24 h-24 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
                <Moon size={40} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2 text-indigo-400">Sleep Mode Engaged</h3>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-8">System powering down...</p>

              <div className="space-y-6 text-left">
                {[
                  { label: "Securing Vaults", icon: Lock, status: progress > 20 },
                  { label: "Flushing Neural Buffer", icon: Zap, status: progress > 50 },
                  { label: "Optimizing Block Hashes", icon: Database, status: progress > 80 },
                  { label: "Shield Harmonization", icon: Shield, status: progress >= 100 }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-600'} transition-colors duration-500`}>
                       <step.icon size={14} />
                     </div>
                     <span className={`text-xs font-bold uppercase tracking-widest ${step.status ? 'text-white' : 'text-zinc-600'}`}>
                       {step.label}
                     </span>
                     {step.status && (
                       <span className="ml-auto text-[10px] text-indigo-400 font-mono">DONE</span>
                     )}
                  </div>
                ))}
              </div>

              <div className="mt-10 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-gradient-to-r from-indigo-600 to-purple-500"
                   style={{ width: `${progress}%` }}
                />
              </div>
              
              {progress >= 100 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-emerald-400 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Stars size={16} /> Have a good night. See you tomorrow! Thanks for all the prompts.
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
