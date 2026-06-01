import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  MoreVertical,
  Mail,
  Phone,
  BarChart2
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  sentiment: number;
  intent: 'high' | 'medium' | 'low';
  score: number;
  quantumState: 'entangled' | 'stable' | 'superposition';
  lastActivity: string;
}

export const LeadIntelligence: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'Alara Vance', email: 'alara@node.finance', source: 'Twitter Meta', sentiment: 0.92, intent: 'high', score: 98, quantumState: 'entangled', lastActivity: '2m ago' },
    { id: '2', name: 'Cyrus Kade', email: 'cyrus@quantum.tech', source: 'Discord Node', sentiment: 0.15, intent: 'low', score: 45, quantumState: 'superposition', lastActivity: '14m ago' },
    { id: '3', name: 'Elena Thorne', email: 'elena@v6.enterprise', source: 'Direct Sync', sentiment: 0.78, intent: 'high', score: 82, quantumState: 'stable', lastActivity: '1h ago' },
    { id: '4', name: 'Jaxon Reed', email: 'jaxon@matrix.core', source: 'Telegram BOT', sentiment: 0.54, intent: 'medium', score: 67, quantumState: 'superposition', lastActivity: '5h ago' }
  ]);

  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-900">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Elite Lead Oracle</h2>
          <p className="text-zinc-500 text-sm mt-1">V8.0 Elite Intelligence & Python-Powered Intent Prediction</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text" 
                placeholder="Search across Infinite Timelines..."
                className="bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all w-64"
              />
           </div>
           <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white transition-all">
              <Filter size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Elite Accuracy', value: '99.9%', icon: MessageSquare, color: 'text-indigo-400' },
           { label: 'Neural Intent', value: 'PREDICTED', icon: Brain, color: 'text-emerald-400' },
           { label: 'Elastic Sync', value: 'OPTIMAL', icon: ShieldCheck, color: 'text-blue-400' },
           { label: 'Elite Level Score', value: '8.0', icon: Zap, color: 'text-amber-400' }
         ].map((stat, i) => (
           <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[32px] space-y-4">
              <div className="flex justify-between items-center">
                 <stat.icon className={stat.color} size={20} />
                 <span className="text-[10px] font-black uppercase text-zinc-600">Metric 0{i+1}</span>
              </div>
              <div>
                 <p className="text-2xl font-bold tracking-tighter text-white">{stat.value}</p>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] overflow-hidden">
         <div className="p-8 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Autonomous Lead Stream</h3>
            <div className="flex gap-4">
               {['all', 'high', 'medium', 'low'].map(f => (
                 <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'text-indigo-400' : 'text-zinc-600 hover:text-zinc-300'}`}
                 >
                   {f}
                 </button>
               ))}
            </div>
         </div>
         <div className="divide-y divide-zinc-900">
            <AnimatePresence>
               {leads.map(lead => (
                 <motion.div 
                   key={lead.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group"
                 >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                       <div className="relative">
                          <div className="w-16 h-16 bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800 overflow-hidden relative group-hover:border-indigo-500/50 transition-all">
                             <Users size={24} className="text-zinc-600 group-hover:text-indigo-400 transition-all" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050507] ${lead.sentiment > 0.6 ? 'bg-emerald-500' : lead.sentiment > 0.4 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                       </div>
                       <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{lead.name}</h4>
                          <p className="text-xs text-zinc-500 font-mono tracking-tight">{lead.email}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 w-full md:w-auto px-0 md:px-10">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Source Node</p>
                          <p className="text-xs font-bold text-white">{lead.source}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sentiment</p>
                          <div className="flex items-center gap-2">
                             {lead.sentiment > 0.5 ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-rose-400" />}
                             <span className="text-xs font-mono font-bold">{(lead.sentiment * 100).toFixed(0)}%</span>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Sync</p>
                          <p className="text-xs font-bold text-indigo-400 lowercase">{lead.quantumState}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Elite Score</p>
                          <p className="text-base font-black tracking-tighter text-white">{lead.score}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                       <button className="flex-1 md:flex-none p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                          <Mail size={18} />
                       </button>
                       <button className="flex-1 md:flex-none px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all">
                          Intercept
                       </button>
                       <button className="p-3 text-zinc-600 hover:text-white transition-colors">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      <div className="bg-indigo-600 p-10 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-indigo-500/30">
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
         <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-bold flex items-center gap-3"><Zap size={24} /> Autonomous Lead Interception active</h3>
            <p className="text-white/70 text-sm max-w-xl">
               The V8 Neural Network is currently predicting intent across 64 multi-channel nodes. Proactive interception is enabled for high-sentiment targets in the Elite Space.
            </p>
         </div>
         <button className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 relative z-10 whitespace-nowrap">
            <BarChart2 size={20} /> View Neural Matrix
         </button>
      </div>
    </div>
  );
};
