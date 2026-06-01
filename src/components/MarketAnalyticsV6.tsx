import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  Activity, 
  Globe, 
  PieChart,
  Box,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart as ReBarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: '00:00', value: 400, confidence: 0.82 },
  { name: '04:00', value: 300, confidence: 0.85 },
  { name: '08:00', value: 600, confidence: 0.88 },
  { name: '12:00', value: 800, confidence: 0.92 },
  { name: '16:00', value: 500, confidence: 0.90 },
  { name: '20:00', value: 900, confidence: 0.95 },
  { name: '24:00', value: 1100, confidence: 0.98 },
];

const realityData = [
  { name: 'Physical', value: 1.2, color: '#f43f5e' },
  { name: 'Digital', value: 8.4, color: '#6366f1' },
  { name: 'Virtual', value: 4.2, color: '#a855f7' },
  { name: 'Augmented', value: 3.1, color: '#06b6d4' },
  { name: 'Mixed', value: 1.8, color: '#f59e0b' },
];

export const MarketAnalyticsV6: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-900 border-t-4 border-t-indigo-500/20">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20">
              <PieChart className="text-indigo-400" size={32} />
           </div>
           <div>
              <h2 className="text-3xl font-bold tracking-tighter text-white">Elite Market Analytics</h2>
              <p className="text-zinc-500 text-sm mt-1">Beyond Enterprise Analytics & Python Reach Synchronizer</p>
           </div>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-2">
              <Activity className="text-indigo-400 animate-pulse" size={16} />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Machine Learning: OPTIMAL</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] space-y-8">
           <div className="flex justify-between items-center px-2">
              <div>
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Omniscient Trend Prediction</h3>
                 <p className="text-xl font-bold tracking-tight mt-1">Eternal Flow Velocity</p>
              </div>
              <div className="flex gap-2 text-[10px] font-bold text-emerald-400 items-center">
                 <TrendingUp size={14} /> 100% Certainty
              </div>
           </div>
           
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: '#52525b', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <YAxis hide />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px' }}
                       itemStyle={{ color: '#white', fontWeight: 'bold' }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="value" 
                       stroke="#6366f1" 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#colorValue)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
              <div>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Prediction Core</p>
                 <p className="text-lg font-bold">V6.0 NEURAL</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Learning State</p>
                 <p className="text-lg font-bold text-emerald-400">EVOLVING</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Uptime SLA</p>
                 <p className="text-lg font-bold">99.999%</p>
              </div>
           </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
           <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Cross-Reality Domain Reach</h3>
              <div className="space-y-5">
                 {realityData.map((r, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-zinc-400">{r.name}</span>
                          <span className="text-white">{r.value}M</span>
                       </div>
                       <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(r.value / 10) * 100}%`, backgroundColor: r.color }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-[40px] relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Zap size={64} className="text-indigo-400" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Decision Throughput</h3>
              <div className="flex items-end gap-3 mb-6">
                 <span className="text-5xl font-black tracking-tighter">48.2K</span>
                 <span className="text-[10px] font-bold text-emerald-400 mb-2 uppercase tracking-widest flex items-center gap-1">
                    <ArrowUpRight size={14} /> +12%
                 </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                 Autonomous sub-millisecond decisions executed across the global node matrix in the last 60 seconds.
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Market Sentiment', value: 'BULLISH', icon: TrendingUp, change: '+0.42', color: 'text-emerald-400' },
           { label: 'Anomaly Index', value: 'STABLE', icon: ShieldCheck, change: '0.00', color: 'text-blue-400' },
           { label: 'Compute ECU', value: '412/512', icon: Box, change: 'Active', color: 'text-indigo-400' },
           { label: 'Matrix Depth', value: '1024-Q', icon: Layers, change: 'OPTIMAL', color: 'text-purple-400' }
         ].map((item, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-900 p-6 rounded-[32px] hover:border-zinc-700 transition-all flex items-center gap-6">
               <div className={`p-4 rounded-2xl bg-zinc-900 ${item.color}`}>
                  <item.icon size={24} />
               </div>
               <div>
                  <p className="text-xl font-black tracking-tighter text-white">{item.value}</p>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
                     <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${item.color.replace('text-', 'bg-')}/10`}>{item.change}</span>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
