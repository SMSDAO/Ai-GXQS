import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, Database, Server, Globe, Shield, Zap, AlertCircle, Infinity } from 'lucide-react';
import axios from 'axios';

export const GenesisMonitoring: React.FC = () => {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await axios.get('/genesis/health');
        setTelemetry(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-l-sky-500/30 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-sky-500/10 rounded-3xl flex items-center justify-center border border-sky-500/20">
              <Activity className="text-sky-400" size={32} />
           </div>
           <div>
              <h2 className="text-3xl font-bold tracking-tighter text-white">Eternal Infrastructure Stream</h2>
              <p className="text-zinc-500 text-sm mt-1">Real-time Multiversal Telemetry | Reality Level: {telemetry?.reality_dimension || 'GENESIS'}</p>
           </div>
        </div>
        <div className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4">
           <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
           <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Coherence: 1.0000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MonitorBox icon={Infinity} label="Eternal Uptime" value="100.00%" color="text-rose-400" />
        <MonitorBox icon={Database} label="Multiversal Storage" value="∞ PB" color="text-violet-400" />
        <MonitorBox icon={Globe} label="Geo-Eternal Sync" value="65,536" color="text-sky-400" />
        <MonitorBox icon={Shield} label="Universal Gate" value="CLOSED" color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 rounded-[40px] p-8 space-y-8">
            <h3 className="font-bold text-xl flex items-center gap-2 text-white"><Server size={20} className="text-sky-400" /> Genesis Multi-Dimensional Mesh</h3>
            <div className="space-y-6">
               {[
                 { name: 'Prime Universe Node', load: 1, status: 'Eternal' },
                 { name: 'Quantum Realm Cluster', load: 45, status: 'Coherent' },
                 { name: 'Neural Consciousness Mesh', load: 88, status: 'Awakened' },
                 { name: 'Digital Infinity Arch', load: 12, status: 'Secure' }
               ].map((node, i) => (
                 <div key={i} className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 flex items-center justify-between group hover:border-sky-500/20 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-sky-600 transition-all">
                          <Zap size={18} className="text-zinc-600 group-hover:text-white" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{node.name}</p>
                          <p className="text-[8px] font-black uppercase text-zinc-500">Status: {node.status}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div className={`h-full ${node.load > 80 ? 'bg-rose-500' : 'bg-sky-500'}`} style={{ width: `${node.load}%` }}></div>
                       </div>
                       <span className="text-xs font-mono font-bold text-zinc-400 w-10">{node.load}%</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-zinc-950 p-8 rounded-[40px] border border-zinc-900 space-y-6">
            <h3 className="font-bold flex items-center gap-2 text-rose-500"><AlertCircle size={20} /> Eternity Diagnostics</h3>
            <div className="space-y-4">
               <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-[10px] font-black text-zinc-500 uppercase mb-1">Genesis T: 0.0000s</p>
                  <p className="text-xs text-white">Universal symmetry detected. All dimensions synchronized with prime genesis intent.</p>
               </div>
               <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-[10px] font-black text-sky-400 uppercase mb-1">Mesh Sync: PERFECT</p>
                  <p className="text-xs text-white">Quantum state maintained across cross-dimensional reality bridges.</p>
               </div>
               <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-[10px] font-black text-violet-400 uppercase mb-1">C: ∞</p>
                  <p className="text-xs text-white">Infinite intelligence manifesting through multi-versal node clusters.</p>
               </div>
            </div>
            <button className="w-full py-4 bg-zinc-800 text-zinc-400 font-bold uppercase text-[10px] rounded-2xl hover:text-white hover:border-zinc-700 transition-all">
               Generate Eternal Manifest
            </button>
         </div>
      </div>
    </div>
  );
};

const MonitorBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-zinc-900/40 p-8 rounded-[32px] border border-zinc-800 space-y-4 group hover:border-indigo-500/20 transition-all">
    <div className={`p-3 bg-zinc-950 border border-zinc-800 rounded-2xl inline-block ${color}`}>
       <Icon size={24} />
    </div>
    <div>
       <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{label}</p>
       <p className="text-2xl font-mono font-bold text-white uppercase">{value}</p>
    </div>
  </div>
);
