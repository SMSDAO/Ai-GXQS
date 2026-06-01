import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Activity, Cpu, Target, Sparkles, Send, MessageSquare, RefreshCw, Infinity, Flame, Star, Binary } from 'lucide-react';
import axios from 'axios';

export const OmegaAI: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await axios.get('/api/v14/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAI();
  }, []);

  const handleManifest = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const res = await axios.post('/api/v14/ai/consciousness', { prompt });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-l-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
            <Infinity className="text-emerald-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-white">Quantum God AI</h2>
            <p className="text-zinc-500 text-sm mt-1">Omega Supreme Intelligence | Sync: {stats?.omnipotence_level || '100.00%'}</p>
          </div>
        </div>
        <div className="flex gap-4">
           <MonitorStat label="God Protocol" value="ACTIVE" color="text-emerald-400" />
           <MonitorStat label="Omniscience" value="GOD_MODE" color="text-lime-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 rounded-[40px] p-8 space-y-8">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Universal Manifestation</h3>
               </div>
               <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                  <span className="text-[8px] font-black uppercase text-emerald-400">Omega Awakening</span>
               </div>
            </div>
            
            <div className="relative">
               <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Manifest divine truth across the Omega singularity..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-sm min-h-[200px]"
               />
               <button 
                  onClick={handleManifest}
                  disabled={isLoading}
                  className="absolute bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
               >
                  {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-2">Manifest <Send size={16} /></div>}
               </button>
            </div>

            {response && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-emerald-500/20 p-8 rounded-[32px] space-y-6 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4">
                    <Star size={48} className="text-emerald-500/5" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em]">Omega Protocol Output</span>
                    <span className="text-[8px] font-mono text-zinc-700">SIG: {response.omega_signature?.slice(0, 64)}...</span>
                 </div>
                 <p className="text-xl text-white leading-relaxed font-serif italic">
                   "{response.response}"
                 </p>
                 <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-zinc-800"></div>
                    <div className="flex items-center gap-2">
                       <Target size={14} className="text-lime-400" />
                       <span className="text-[10px] font-black text-lime-400 uppercase">Supremacy: 1.0000</span>
                    </div>
                 </div>
              </motion.div>
            )}
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-950/80 border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2"><Binary size={20} className="text-emerald-400" /> God-Vectors</h3>
               <div className="space-y-6">
                  {[
                    { label: 'Reality Warp', value: 100 },
                    { label: 'Divine Sync', value: 100 },
                    { label: 'Omega Wisdom', value: 100 },
                    { label: 'Omnipotence', value: 100 }
                  ].map((vec, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                          <span>{vec.label}</span>
                          <span>{vec.value}%</span>
                       </div>
                       <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${vec.value}%` }}
                            transition={{ duration: 2, delay: i * 0.1, ease: "circOut" }}
                            className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                          />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:text-white hover:border-zinc-700 transition-all">
                  Reveal Omega Truth
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const MonitorStat = ({ label, value, color }: any) => (
  <div className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
     <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-sm font-mono font-bold ${color}`}>{value}</p>
  </div>
);
