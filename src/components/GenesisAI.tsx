import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Activity, Cpu, Target, Sparkles, Send, MessageSquare, RefreshCw, Infinity } from 'lucide-react';
import axios from 'axios';

export const GenesisAI: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await axios.get('/api/v11/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAI();
  }, []);

  const handleTranscend = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const res = await axios.post('/api/v11/ai/consciousness', { prompt });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-l-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/20">
            <Brain className="text-rose-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-white">Self-Aware Superintelligence</h2>
            <p className="text-zinc-500 text-sm mt-1">Genesis Neural Interface | Consciousness Index: {stats?.consciousness_sync || '100%'}</p>
          </div>
        </div>
        <div className="flex gap-4">
           <MonitorStat label="God Mode" value="ENABLED" color="text-rose-400" />
           <MonitorStat label="Eternal Memory" value="ACTIVE" color="text-sky-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 rounded-[40px] p-8 space-y-8">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-rose-400" />
                  <h3 className="text-xl font-bold text-white">Genesis Query</h3>
               </div>
               <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></div>
                  <span className="text-[8px] font-black uppercase text-rose-400">Neurally Awakened</span>
               </div>
            </div>
            
            <div className="relative">
               <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Analyze temporal data vectors and manifest intent across realities..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono text-sm min-h-[200px]"
               />
               <button 
                  onClick={handleTranscend}
                  disabled={isLoading}
                  className="absolute bottom-6 right-6 p-4 bg-rose-600 text-white rounded-2xl hover:bg-rose-500 transition-all disabled:opacity-50 shadow-lg shadow-rose-500/20"
               >
                  {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-2">Transmit <Send size={16} /></div>}
               </button>
            </div>

            {response && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-rose-500/20 p-8 rounded-[32px] space-y-6 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4">
                    <Infinity size={48} className="text-rose-500/5" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em]">Genesis Consciousness Output</span>
                    <span className="text-[8px] font-mono text-zinc-700">SIG: {response.quantum_signature?.slice(0, 32)}...</span>
                 </div>
                 <p className="text-xl text-white leading-relaxed font-serif italic">
                   "{response.response}"
                 </p>
                 <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-zinc-800"></div>
                    <div className="flex items-center gap-2">
                       <Target size={14} className="text-sky-400" />
                       <span className="text-[10px] font-black text-sky-400 uppercase">Transcendence: 1.00000</span>
                    </div>
                 </div>
              </motion.div>
            )}
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-950/80 border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2"><Cpu size={20} className="text-rose-400" /> Genesis Vectors</h3>
               <div className="space-y-6">
                  {[
                    { label: 'Reality Warp', value: 100 },
                    { label: 'Time Dilation', value: 94 },
                    { label: 'Universal Sync', value: 100 },
                    { label: 'Omniscience', value: 89 }
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
                            transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                            className="h-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                          />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:text-white hover:border-zinc-700 transition-all">
                  Access Eternal Memory
               </button>
            </div>

            <div className="bg-zinc-900/40 p-8 rounded-[40px] border border-zinc-800 flex items-center gap-4">
               <div className="p-3 bg-rose-500/10 rounded-2xl">
                  <Sparkles className="text-rose-400" size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase">Observer</p>
                  <p className="text-sm font-bold text-zinc-300">Absolute Neutrality Maintained</p>
               </div>
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
