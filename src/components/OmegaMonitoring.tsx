import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Cpu, Server, Shield, Globe, TrendingUp, AlertTriangle, Infinity, Flame, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OmegaMonitoring: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newData = [];
      for (let i = 0; i < 24; i++) {
        newData.push({
          time: `${i}:00`,
          divinity: 99.8 + Math.random() * 0.2,
          sync: 100,
          reality: 1.0
        });
      }
      setData(newData);
    };
    generateData();
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const hour = (parseInt(last.time.split(':')[0]) + 1) % 24;
        return [...prev.slice(1), {
          time: `${hour}:00`,
          divinity: 99.8 + Math.random() * 0.2,
          sync: 100,
          reality: 1.0
        }];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-b-emerald-500/30 flex justify-between items-center shadow-2xl shadow-emerald-500/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Omega Supreme Monitoring</h2>
          <p className="text-zinc-500 text-sm mt-1">Universal Reality Pulse Dashboard V14</p>
        </div>
        <div className="flex gap-10">
           <StatusIndicator label="Reality Sync" status="GOD_PROTOCOL" color="text-emerald-500" />
           <StatusIndicator label="Omnipotent Power" status="SUPREME" color="text-lime-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 p-8 rounded-[40px] h-[400px]">
               <h3 className="text-sm font-bold text-white mb-8 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-500" /> Omega Divinity Waveform</h3>
               <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorDiv" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                     <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} domain={['99', '100.5']} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px' }}
                        itemStyle={{ color: '#34d399', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="divinity" stroke="#10b981" fillOpacity={1} fill="url(#colorDiv)" strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-zinc-950 p-8 rounded-[40px] border border-zinc-800 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Universal Nexus Health</h4>
                  <div className="space-y-4">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                             <span className="text-sm font-bold text-white">Nexus {i+140} - Dimension {i}</span>
                          </div>
                          <span className="text-[10px] font-black text-emerald-400">SUPREME</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-zinc-950 p-8 rounded-[40px] border border-zinc-800 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">God Protocol Load</h4>
                  <div className="flex flex-col items-center justify-center py-4">
                     <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-900" />
                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="376.99" strokeDashoffset="0" className="text-emerald-600 shadow-emerald-500" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                           <span className="text-2xl font-bold text-white">100%</span>
                           <span className="text-[8px] font-black text-zinc-500 uppercase">Synchronized</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[40px] space-y-8">
               <h3 className="font-bold flex items-center gap-2 text-white"><Shield size={20} className="text-emerald-400" /> Divine Security</h3>
               <div className="space-y-6">
                  <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 border-l-4 border-l-emerald-500 flex items-center gap-4">
                     <Star className="text-emerald-500" size={24} />
                     <div>
                        <p className="text-xs font-bold text-white">Reality Solidified</p>
                        <p className="text-[10px] text-zinc-500 uppercase">Enforced by God Protocol</p>
                     </div>
                  </div>
                  {[
                    { label: 'Omega Lock', value: 'ACTIVE' },
                    { label: 'Divine Cipher', value: 'ABSOLUTE' },
                    { label: 'Truth Nexus', value: 'OMNISCIENT' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{item.label}</span>
                       <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[8px] font-black text-emerald-400 uppercase">{item.value}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-emerald-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all">
                  Absolute Universal Audit
               </button>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-[40px] relative overflow-hidden group">
               <div className="absolute right-0 bottom-0 p-8">
                  <Infinity size={120} className="text-emerald-500/5 group-hover:text-emerald-500/10 transition-all" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">Omega Supreme Sync</h3>
               <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                  The Omega Supreme Protocol ensures perfect coherence across the absolute multiversal singularity.
               </p>
               <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <Infinity size={14} />
                  <span>Absolute Divine Presence</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatusIndicator = ({ label, status, color }: any) => (
  <div className="text-right">
     <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-sm font-black uppercase tracking-widest ${color}`}>{status}</p>
  </div>
);
