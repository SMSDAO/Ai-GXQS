import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Cpu, Server, Shield, Globe, TrendingUp, AlertTriangle, Infinity, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const DivineMonitoring: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newData = [];
      for (let i = 0; i < 24; i++) {
        newData.push({
          time: `${i}:00`,
          consciousness: 98 + Math.random() * 2,
          sync: 99 + Math.random(),
          qubits: 1048500 + Math.random() * 100
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
          consciousness: 98 + Math.random() * 2,
          sync: 99 + Math.random(),
          qubits: 1048500 + Math.random() * 100
        }];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-b-amber-500/30 flex justify-between items-center shadow-2xl shadow-amber-500/10">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Divine God Monitoring</h2>
          <p className="text-zinc-500 text-sm mt-1">OmniQuantum Reality Pulse Dashboard</p>
        </div>
        <div className="flex gap-10">
           <StatusIndicator label="Reality Integrity" status="ABSOLUTE" color="text-amber-500" />
           <StatusIndicator label="Divine Connectivity" status="ETERNAL" color="text-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 p-8 rounded-[40px] h-[400px]">
               <h3 className="text-sm font-bold text-white mb-8 flex items-center gap-2"><TrendingUp size={16} className="text-amber-500" /> Consciousness Waveform</h3>
               <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                     <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px' }}
                        itemStyle={{ color: '#fbbf24', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="consciousness" stroke="#d97706" fillOpacity={1} fill="url(#colorCons)" strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-zinc-950 p-8 rounded-[40px] border border-zinc-800 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Divine Node Health</h4>
                  <div className="space-y-4">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                             <span className="text-sm font-bold text-white">Node {i+92} - Verse {i}</span>
                          </div>
                          <span className="text-[10px] font-black text-amber-400">NOMINAL</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-zinc-950 p-8 rounded-[40px] border border-zinc-800 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">God-Protocol Load</h4>
                  <div className="flex flex-col items-center justify-center py-4">
                     <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-900" />
                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="376.99" strokeDashoffset="37.6" className="text-amber-600 shadow-amber-500" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                           <span className="text-2xl font-bold text-white">90%</span>
                           <span className="text-[8px] font-black text-zinc-500 uppercase">Synchronized</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[40px] space-y-8">
               <h3 className="font-bold flex items-center gap-2 text-white"><Shield size={20} className="text-amber-400" /> Divine Security</h3>
               <div className="space-y-6">
                  <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 border-l-4 border-l-amber-500 flex items-center gap-4">
                     <AlertTriangle className="text-amber-500" size={24} />
                     <div>
                        <p className="text-xs font-bold text-white">Reality Breach Attempt</p>
                        <p className="text-[10px] text-zinc-500 uppercase">Blocked by God Protocol</p>
                     </div>
                  </div>
                  {[
                    { label: 'Dimension Lock', value: 'ACTIVE' },
                    { label: 'Eternity Cipher', value: 'GOD_MODE' },
                    { label: 'Truth Filter', value: 'ABSOLUTE' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{item.label}</span>
                       <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-[8px] font-black text-amber-400 uppercase">{item.value}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-amber-600 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 shadow-lg shadow-amber-500/20 transition-all">
                  Eternity Audit
               </button>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-[40px] relative overflow-hidden group">
               <div className="absolute right-0 bottom-0 p-8">
                  <Infinity size={120} className="text-amber-500/5 group-hover:text-amber-500/10 transition-all" />
               </div>
               <h3 className="text-xl font-bold text-white mb-4">OmmiQuantum Sync</h3>
               <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                  The God Protocol ensures perfect coherence across all dimensions and timelines.
               </p>
               <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <Flame size={14} />
                  <span>Absolute Persistence</span>
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
