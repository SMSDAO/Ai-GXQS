import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Zap, Shield, Users, Target, Rocket, RefreshCw, Layers, Globe, Code, Cpu } from 'lucide-react';
import axios from 'axios';

export const QuantumMatrix: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState('application');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/v9/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    { id: 'application', label: 'App Gateway', icon: Globe, color: 'text-indigo-400' },
    { id: 'microservices', label: 'Microservices', icon: Layers, color: 'text-violet-400' },
    { id: 'quantum', label: 'Quantum AI', icon: Cpu, color: 'text-emerald-400' },
    { id: 'mesh', label: 'Blockchain Mesh', icon: RefreshCw, color: 'text-amber-400' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Quantum Matrix Control</h2>
          <p className="text-zinc-500 text-sm mt-1">Multi-Layer Autonomous Enterprise Orchestration</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl p-1">
           {layers.map(layer => (
             <button 
               key={layer.id}
               onClick={() => setActiveLayer(layer.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-white'}`}
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
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  {activeLayer === 'application' && (
                    <>
                       <MatrixNode title="Edge Logic" status="Online" load={12} icon={Zap} />
                       <MatrixNode title="User Session" status="Encrypted" load={42} icon={Users} />
                       <MatrixNode title="Lead Signal" status="Active" load={68} icon={Target} />
                       <MatrixNode title="Traffic Mesh" status="Load Balanced" load={24} icon={Globe} />
                    </>
                  )}
                  {activeLayer === 'microservices' && (
                    <>
                       <MatrixNode title="FastAPI Gateway" status="Sync" load={15} icon={Code} />
                       <MatrixNode title="Auth Service" status="Isolated" load={5} icon={Shield} />
                       <MatrixNode title="Billing Service" status="ACID Compliant" load={2} icon={Layers} />
                       <MatrixNode title="Notify Engine" status="Queueing" load={18} icon={Zap} />
                    </>
                  )}
                  {activeLayer === 'quantum' && (
                    <>
                       <MatrixNode title="Neural Inference" status="Supreme" load={88} icon={Cpu} />
                       <MatrixNode title="Vector Storage" status="Distributed" load={45} icon={Database} />
                       <MatrixNode title="Intent Classifier" status="Active" load={92} icon={TrendingUp} />
                       <MatrixNode title="Supremacy Sync" status="Synchronized" load={100} icon={RefreshCw} />
                    </>
                  )}
                  {activeLayer === 'mesh' && (
                    <>
                       <MatrixNode title="Quantum Chain" status="Validating" load={99} icon={Layers} />
                       <MatrixNode title="Base Network" status="Bridged" load={45} icon={Globe} />
                       <MatrixNode title="Eth Mainnet" status="Monitoring" load={12} icon={RefreshCw} />
                       <MatrixNode title="Validator Pool" status="Active (2048)" load={100} icon={Shield} />
                    </>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 rounded-[40px] space-y-6">
               <h3 className="font-bold flex items-center gap-2 tracking-tight"><Rocket size={20} className="text-indigo-400" /> Matrix Stats</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Total Population</span>
                     <span className="text-white tabular-nums">{stats?.total_users?.toLocaleString() || '15,200'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Global TPS</span>
                     <span className="text-emerald-400 tabular-nums">{stats?.transactions_per_second?.toLocaleString() || '42,000'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>AI Confidence</span>
                     <span className="text-indigo-400 tabular-nums">{(stats?.ai_confidence * 100).toFixed(2) || '99.98'}%</span>
                  </div>
               </div>
               <button className="w-full py-4 bg-indigo-600 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                  Optimize All Layers
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const MatrixNode = ({ title, status, load, icon: Icon }: any) => (
  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-[32px] group hover:border-zinc-700 transition-all hover:translate-y-[-4px]">
     <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
           <Icon size={20} className="text-zinc-500 group-hover:text-white" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-emerald-500 transition-colors">{status}</span>
     </div>
     <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
     <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-zinc-600">
           <span>Neural Load</span>
           <span>{load}%</span>
        </div>
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
           <div className={`h-full ${load > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${load}%` }}></div>
        </div>
     </div>
  </div>
);

const Database = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const TrendingUp = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Brain = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.78-3.06 2.5 2.5 0 0 1-2.41-4.4 2.5 2.5 0 0 1 3.28-3.81 2.5 2.5 0 0 1 4.37-2.17Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.78-3.06 2.5 2.5 0 0 0 2.41-4.4 2.5 2.5 0 0 0-3.28-3.81 2.5 2.5 0 0 0-4.37-2.17Z" />
  </svg>
);
