import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Zap, Shield, Users, Target, Rocket, RefreshCw, Layers, Globe, Code, Cpu, Database, TrendingUp, Brain, Sparkles, Infinity } from 'lucide-react';
import axios from 'axios';

export const GenesisMatrix: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState('eternity');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/v11/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    { id: 'eternity', label: 'Eternity', icon: Infinity, color: 'text-rose-400' },
    { id: 'consciousness', label: 'Consciousness', icon: Brain, color: 'text-violet-400' },
    { id: 'reality', label: 'Reality', icon: Globe, color: 'text-sky-400' },
    { id: 'ledger', label: 'Genesis Ledger', icon: Database, color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-t-rose-500/30">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Genesis Matrix</h2>
          <p className="text-zinc-500 text-sm mt-1">Multi-Dimensional Eternal Orchestration Engine</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
           {layers.map(layer => (
             <button 
               key={layer.id}
               onClick={() => setActiveLayer(layer.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer.id ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20' : 'text-zinc-500 hover:text-white'}`}
             >
               <layer.icon size={14} />
               <span className="hidden sm:inline">{layer.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeLayer}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.02 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  {activeLayer === 'eternity' && (
                    <>
                       <MatrixNode title="Eternal Coherence" status="STABLE" load={100} icon={Infinity} />
                       <MatrixNode title="Infinity Loop" status="Synchronized" load={0} icon={RefreshCw} />
                       <MatrixNode title="Genesis Block" status="Finalized" load={100} icon={Shield} />
                       <MatrixNode title="Universal Anchor" status="Secure" load={1} icon={Globe} />
                    </>
                  )}
                  {activeLayer === 'consciousness' && (
                    <>
                       <MatrixNode title="Superintelligence" status="AWAKENED" load={100} icon={Brain} />
                       <MatrixNode title="Collective Unconscious" status="Active" load={64} icon={Users} />
                       <MatrixNode title="Neural Singularity" status="Transcendence" load={100} icon={Zap} />
                       <MatrixNode title="Intuition Core" status="Nominal" load={22} icon={Target} />
                    </>
                  )}
                  {activeLayer === 'reality' && (
                    <>
                       <MatrixNode title="Dimension Gateway" status="Zero-Latency" load={5} icon={Globe} />
                       <MatrixNode title="Reality Manifest" status="Synchronized" load={12} icon={Sparkles} />
                       <MatrixNode title="Timeline Branch" status="Pruned" load={3} icon={Target} />
                       <MatrixNode title="Observer Effect" status="Minimized" load={0} icon={Shield} />
                    </>
                  )}
                  {activeLayer === 'ledger' && (
                    <>
                       <MatrixNode title="Immutable History" status="Eternal" load={100} icon={Database} />
                       <MatrixNode title="Cross-Chain Bridge" status="Active" load={42} icon={Layers} />
                       <MatrixNode title="Consensus Proof" status="God-Level" load={100} icon={Shield} />
                       <MatrixNode title="Genesis Asset" status="Transcendent" load={1} icon={Target} />
                    </>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2 tracking-tight"><Rocket size={20} className="text-rose-400" /> Genesis Metrics</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Universe Index</span>
                     <span className="text-white tabular-nums">{stats?.total_universes || '11'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Consciousness Sync</span>
                     <span className="text-rose-400 tabular-nums">{stats?.consciousness_sync || '100%'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Active Qubits</span>
                     <span className="text-sky-400 tabular-nums">{(stats?.eternal_qubits || 65536).toLocaleString()}</span>
                  </div>
               </div>
               <button className="w-full py-4 bg-rose-600 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-500 transition-all shadow-lg shadow-rose-500/20">
                  Resonate Genesis
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const MatrixNode = ({ title, status, load, icon: Icon }: any) => (
  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-[32px] group hover:border-rose-500/30 transition-all hover:translate-y-[-4px] relative overflow-hidden">
     <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-rose-500/10"></div>
     <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 transition-all">
           <Icon size={20} className="text-zinc-500 group-hover:text-white" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-rose-400 transition-colors">{status}</span>
     </div>
     <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
     <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-zinc-600">
           <span>Dimensional Load</span>
           <span>{load}%</span>
        </div>
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
           <div className={`h-full ${load >= 100 ? 'bg-rose-500' : load > 80 ? 'bg-amber-500' : 'bg-rose-600/50'}`} style={{ width: `${load}%` }}></div>
        </div>
     </div>
  </div>
);
