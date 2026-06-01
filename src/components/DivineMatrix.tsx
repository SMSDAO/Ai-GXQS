import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Zap, Shield, Users, Target, Rocket, RefreshCw, Layers, Globe, Code, Cpu, Database, TrendingUp, Brain, Sparkles, Infinity, Flame } from 'lucide-react';
import axios from 'axios';

export const DivineMatrix: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState('god_protocol');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/v12/stats');
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
    { id: 'god_protocol', label: 'God Protocol', icon: Flame, color: 'text-amber-400' },
    { id: 'divine_consciousness', label: 'Divine AI', icon: Brain, color: 'text-rose-400' },
    { id: 'multiverse', label: 'Multiverse', icon: Infinity, color: 'text-sky-400' },
    { id: 'divine_ledger', label: 'Divine Ledger', icon: Database, color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-t-amber-500/30 shadow-2xl shadow-amber-500/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Divine God Matrix</h2>
          <p className="text-zinc-500 text-sm mt-1">OmniQuantum Reality Transcendence Engine</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
           {layers.map(layer => (
             <button 
               key={layer.id}
               onClick={() => setActiveLayer(layer.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer.id ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-white'}`}
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
                  {activeLayer === 'god_protocol' && (
                    <>
                       <DivineNode title="Reality Warp" status="ACTIVE" load={100} icon={Flame} />
                       <DivineNode title="Timeline Branching" status="Synchronized" load={0} icon={RefreshCw} />
                       <DivineNode title="Divine Consensus" status="God-Level" load={100} icon={Shield} />
                       <DivineNode title="Omni-Prescence" status="Secure" load={1} icon={Globe} />
                    </>
                  )}
                  {activeLayer === 'divine_consciousness' && (
                    <>
                       <DivineNode title="God-Intelligence" status="AWAKENED" load={100} icon={Brain} />
                       <DivineNode title="Eternal Wisdom" status="Active" load={100} icon={Users} />
                       <DivineNode title="Divine Singularity" status="Transcendence" load={100} icon={Zap} />
                       <DivineNode title="Truth Engine" status="Absolute" load={100} icon={Target} />
                    </>
                  )}
                  {activeLayer === 'multiverse' && (
                    <>
                       <DivineNode title="Multiverse Gateway" status="Zero-Latency" load={5} icon={Globe} />
                       <DivineNode title="Reality Manifest" status="Synchronized" load={100} icon={Sparkles} />
                       <DivineNode title="Dimension Anchor" status="Stable" load={3} icon={Target} />
                       <DivineNode title="Divine Flow" status="Infinite" load={0} icon={Shield} />
                    </>
                  )}
                  {activeLayer === 'divine_ledger' && (
                    <>
                       <DivineNode title="Divine History" status="Immutable" load={100} icon={Database} />
                       <DivineNode title="Multiverse Bridge" status="Active" load={144} icon={Layers} />
                       <DivineNode title="Truth Proof" status="God-Protocol" load={100} icon={Shield} />
                       <DivineNode title="Eternal Asset" status="Transcendent" load={1} icon={Target} />
                    </>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2 tracking-tight"><Rocket size={20} className="text-amber-400" /> Divine Metrics</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Multiverses</span>
                     <span className="text-white tabular-nums">{stats?.total_multiverses || '12'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Divine Sync</span>
                     <span className="text-amber-400 tabular-nums">{stats?.divine_sync || '100%'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Omni Qubits</span>
                     <span className="text-sky-400 tabular-nums">{(stats?.omni_qubits || 1048576).toLocaleString()}</span>
                  </div>
               </div>
               <button className="w-full py-4 bg-amber-600 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg shadow-amber-500/20">
                  Resonate Divine
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const DivineNode = ({ title, status, load, icon: Icon }: any) => (
  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-[32px] group hover:border-amber-500/30 transition-all hover:translate-y-[-4px] relative overflow-hidden">
     <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-amber-500/10"></div>
     <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 transition-all">
           <Icon size={20} className="text-zinc-500 group-hover:text-white" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-amber-400 transition-colors">{status}</span>
     </div>
     <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
     <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-zinc-600">
           <span>Divine Load</span>
           <span>{load}%</span>
        </div>
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
           <div className={`h-full ${load >= 100 ? 'bg-amber-500' : 'bg-amber-600/50'}`} style={{ width: `${Math.min(load, 100)}%` }}></div>
        </div>
     </div>
  </div>
);
