import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, Database, HardDrive, Zap, TrendingUp, AlertCircle, Clock, Server, Layers, Globe } from 'lucide-react';
import axios from 'axios';

export const SystemMonitoringQuantum: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get('/health');
        setMetrics(res.data.metrics);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-l-emerald-500/30">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Quantum System Telemetry</h2>
          <p className="text-zinc-500 text-sm mt-1">Real-time Performance Metrics & Microservices Distrubution</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <Activity size={16} className="text-indigo-400" />
              <div>
                 <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Node Synchronicity</p>
                 <p className="text-sm font-mono font-bold text-white leading-none">
                   {metrics?.node_synchronicity || '99.999%'}
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MonitorCard icon={Cpu} label="Quantum CPU Load" value={metrics?.cpu_quantum_load || '4.2%'} color="text-indigo-400" progress={4.2} />
        <MonitorCard icon={Database} label="Memory Entanglement" value={metrics?.memory_entanglement || '12.8GB'} color="text-violet-400" progress={64} />
        <MonitorCard icon={Zap} label="Active Qubits" value={metrics?.active_qubits || '2048'} color="text-emerald-400" progress={100} />
        <MonitorCard icon={Server} label="Cluster Uptime" value="99.999%" color="text-amber-400" progress={99} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 rounded-[40px] p-8 space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2"><Layers size={20} className="text-indigo-400" /> Microservices Mesh</h3>
              <div className="flex gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                 Live Infrastructure Telemetry
              </div>
           </div>

           <div className="space-y-6">
              {[
                { name: 'Gateway Edge Cluster', load: 12, status: 'Healthy' },
                { name: 'AI Inference Service', load: 84, status: 'Scaling' },
                { name: 'Blockchain Mesh Sync', load: 42, status: 'Healthy' },
                { name: 'CRM Quantum Database', load: 28, status: 'Healthy' }
              ].map((node, i) => (
                <div key={i} className="bg-zinc-950/50 p-6 rounded-[24px] border border-zinc-900 flex items-center justify-between group hover:border-zinc-700 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                         <Globe size={20} className="text-zinc-500 group-hover:text-white" />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{node.name}</p>
                         <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Status: {node.status}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                         <div className={`h-full ${node.load > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${node.load}%` }}></div>
                      </div>
                      <span className="text-sm font-mono font-bold text-zinc-400 w-10">{node.load}%</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-zinc-950/80 backdrop-blur-3xl border border-zinc-900 border-t-amber-500/30 p-8 rounded-[40px] space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-amber-400"><AlertCircle size={20} /> Quantum Diagnostics</h3>
              <div className="space-y-4">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Info: Auto-Scaling</p>
                    <p className="text-xs text-amber-200/70">Triggered expansion of AI Inference cluster in Region-EU-Beta.</p>
                 </div>
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Fixed: Mesh Sync</p>
                    <p className="text-xs text-emerald-200/70">Quantum bridge latency normalized after micro-recalibration.</p>
                 </div>
              </div>
              <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase rounded-2xl hover:text-white transition-all">
                 System Diagnostics Report
              </button>
           </div>

           <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-bold mb-2 uppercase tracking-tighter">Event Sharding: ACTIVE</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">Your infrastructure is event-driven via CQRS sharding for infinite write scalability.</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold">42,000</span>
                 <span className="text-xs font-bold text-white/50">Events/Sec</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MonitorCard = ({ icon: Icon, label, value, color, progress }: any) => (
  <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] space-y-6 group hover:border-white/10 transition-all">
     <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl bg-zinc-950 border border-zinc-800 ${color} group-hover:scale-110 transition-transform`}>
           <Icon size={24} />
        </div>
        <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
     </div>
     <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</p>
        <p className="text-3xl font-mono font-bold text-white tracking-tighter">{value}</p>
     </div>
     <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full ${color.replace('text-', 'bg-')} shadow-[0_0_10px_rgba(0,255,136,0.2)]`}
        />
     </div>
  </div>
);
