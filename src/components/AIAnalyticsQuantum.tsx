import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, TrendingUp, Search, Zap, Activity, MessageSquare, BarChart3, ChevronRight, Cpu, Target } from 'lucide-react';
import axios from 'axios';

export const AIAnalyticsQuantum: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await axios.get('/api/v9/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAI();
  }, []);

  const handleAnalyze = async () => {
    if (!inputText) return;
    try {
      const res = await axios.post('/api/v9/ai/analyze', { text: inputText });
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-b-indigo-500/30">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-violet-500/10 rounded-3xl flex items-center justify-center border border-violet-500/20">
            <Brain className="text-violet-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-white">Quantum AI Orchestrator</h2>
            <p className="text-zinc-500 text-sm mt-1">Multi-Cloud V9 Quantum Neural Intent & Sentiment Extraction</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full flex items-center gap-2">
              <Activity size={16} className="text-violet-400 animate-pulse" />
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Neural Sync: 99.999%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Search size={20} className="text-indigo-400" />
                Quantum Intent Processing
              </h3>
              <div className="relative">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste multi-dimensional lead interaction data or social vectors..." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all min-h-[150px]"
                />
                <button 
                  onClick={handleAnalyze}
                  className="absolute bottom-4 right-4 px-6 py-3 bg-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-violet-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Zap size={16} />
                  Quantum Extraction
                </button>
              </div>

              {analysis && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-violet-500/5 border border-violet-500/20 rounded-3xl flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Quantum Intent</span>
                       <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">{analysis.intent}</span>
                    </div>
                    <p className="text-3xl font-bold tabular-nums">{(analysis.confidence * 100).toFixed(4)}%</p>
                  </div>
                  <div className="md:border-l border-zinc-800 md:pl-8 space-y-2">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Neural Vectors</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.quantum_vector.map((v: number, i: number) => (
                        <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-400">{v.toFixed(3)}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-[40px] space-y-4">
                 <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold flex items-center gap-2 tracking-tight"><TrendingUp size={16} className="text-emerald-400" /> Quantum Growth Matrix</h4>
                    <span className="text-[10px] font-black text-emerald-400">EXPONENTIAL</span>
                 </div>
                 <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                 </div>
                 <p className="text-xs text-zinc-500">Inference clusters active across 4 nodes.</p>
              </div>
              <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-[40px] space-y-4">
                 <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold flex items-center gap-2 tracking-tight"><Target size={16} className="text-indigo-400" /> Intent Accuracy Index</h4>
                    <span className="text-[10px] font-black text-indigo-400">SUPREME</span>
                 </div>
                 <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[99%] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
                 </div>
                 <p className="text-xs text-zinc-500">Synchronized across galactic consensus layer.</p>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
              <h3 className="font-bold flex items-center gap-2"><Cpu size={20} className="text-violet-400" /> Neural Fabric</h3>
              <div className="space-y-8">
                 {[
                   { label: 'Quantum Velocity', value: '1.2 PB/s', progress: 98, color: 'bg-violet-500' },
                   { label: 'Qubit Density', value: '2048/node', progress: 85, color: 'bg-indigo-500' },
                   { label: 'Entanglement Variance', value: '0.000001', progress: 99, color: 'bg-emerald-500' },
                   { label: 'Experience Buffer', value: '42.8M', progress: 72, color: 'bg-amber-500' }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                       <span className="text-sm font-bold text-white tracking-tighter">{stat.value}</span>
                     </div>
                     <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${stat.progress}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={`h-full ${stat.color} shadow-[0_0_10px_rgba(139,92,246,0.2)]`}
                       />
                     </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-4 py-4 bg-zinc-800 border border-zinc-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-2">
                 Synchronize Neural Quanta <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
