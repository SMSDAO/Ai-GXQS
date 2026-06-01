import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Zap, Shield, Users, Target, Rocket, RefreshCw, Layers, Globe, Cpu, Database, Brain, Sparkles, Infinity, Flame, Star, Binary } from 'lucide-react';
import axios from 'axios';

export const OmegaMatrix: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState('omega_supremacy');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/v14/stats');
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
    { id: 'omega_supremacy', label: 'Omega Supremacy', icon: Infinity, color: 'text-emerald-400' },
    { id: 'quantum_god_ai', label: 'Quantum God AI', icon: Brain, color: 'text-lime-400' },
    { id: 'reality_nexus', label: 'Reality Nexus', icon: Sparkles, color: 'text-teal-400' },
    { id: 'infinite_nexus', label: 'Blockchain Nexus', icon: Database, color: 'text-cyan-400' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-t-emerald-500/30 shadow-2xl shadow-emerald-500/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Omega Supremacy Matrix</h2>
          <p className="text-zinc-500 text-sm mt-1">Universal God-Protocol Engine V14</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl p-1 overflow-x-auto max-w-full">
           {layers.map(layer => (
             <button 
               key={layer.id}
               onClick={() => setActiveLayer(layer.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeLayer === layer.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-white'}`}
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
                  {activeLayer === 'omega_supremacy' && (
                    <>
                       <OmegaNode title="God Protocol" status="ACTIVE" load={100} icon={Infinity} />
                       <OmegaNode title="Reality Core" status="Synchronized" load={1} icon={Globe} />
                       <OmegaNode title="Supreme Authority" status="Absolute" load={100} icon={Shield} />
                       <OmegaNode title="Omni-Presence" status="Omnipotent" load={100} icon={Cpu} />
                    </>
                  )}
                  {activeLayer === 'quantum_god_ai' && (
                    <>
                       <OmegaNode title="Quantum Intelligence" status="OMNISCIENT" load={100} icon={Brain} />
                       <OmegaNode title="Divine Decision" status="Absolute" load={100} icon={Target} />
                       <OmegaNode title="Supreme Logic" status="Omega" load={100} icon={Binary} />
                       <OmegaNode title="Transcendent Mind" status="Awakened" load={100} icon={Zap} />
                    </>
                  )}
                  {activeLayer === 'reality_nexus' && (
                    <>
                       <OmegaNode title="Causality Warp" status="Stable" load={0} icon={Sparkles} />
                       <OmegaNode title="Dimension Anchor" status="Infinite" load={100} icon={Layers} />
                       <OmegaNode title="Reality Manifest" status="Synchronized" load={100} icon={Star} />
                       <OmegaNode title="Time Dilation" status="Controlled" load={5} icon={Zap} />
                    </>
                  )}
                  {activeLayer === 'infinite_nexus' && (
                    <>
                       <OmegaNode title="Eternal Nexus" status="Immutable" load={100} icon={Database} />
                       <OmegaNode title="Supreme Consensus" status="Divine" load={100} icon={Users} />
                       <OmegaNode title="Omega Ledger" status="Absolute" load={100} icon={Shield} />
                       <OmegaNode title="Infinite Asset" status="Transcendent" load={1} icon={Target} />
                    </>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2 tracking-tight"><Rocket size={20} className="text-emerald-400" /> Omega Supreme Metrics</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Dimensions</span>
                     <span className="text-white tabular-nums">{stats?.omega_dimension || 'SUPREME'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>God Sync</span>
                     <span className="text-emerald-400 tabular-nums">{stats?.omnipotence_level || '100%'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Omega Qubits</span>
                     <span className="text-lime-400 tabular-nums">{stats?.omega_qubits || 'INFINITE'}</span>
                  </div>
               </div>
               <button className="w-full py-4 bg-emerald-600 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
                  Enforce Supremacy
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const OmegaNode = ({ title, status, load, icon: Icon }: any) => (
  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-[32px] group hover:border-emerald-500/30 transition-all hover:translate-y-[-4px] relative overflow-hidden">
     <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-emerald-500/10"></div>
     <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-all">
           <Icon size={20} className="text-zinc-500 group-hover:text-white" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-emerald-400 transition-colors">{status}</span>
     </div>
     <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
     <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-zinc-600">
           <span>Omega Load</span>
           <span>{load}%</span>
        </div>
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
           <div className={`h-full ${load >= 100 ? 'bg-emerald-500' : 'bg-emerald-600/50'}`} style={{ width: `${Math.min(load, 100)}%` }}></div>
        </div>
     </div>
  </div>
);
