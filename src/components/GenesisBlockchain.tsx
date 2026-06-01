import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, RefreshCw, Layers, ShieldCheck, Zap, ExternalLink, Activity, Infinity } from 'lucide-react';
import axios from 'axios';

export const GenesisBlockchain: React.FC = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/v11/blockchain/status');
        setStatus(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-t-emerald-500/30 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Genesis Eternal Ledger</h2>
          <p className="text-zinc-500 text-sm mt-1">V11.0 Immortal Cross-Dimensional Mesh Level</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
           {status?.chains?.map((chain: string) => (
             <div key={chain} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-2 whitespace-nowrap">
                <Globe size={14} className="text-emerald-400" />
                <span className="text-[10px] font-black uppercase text-zinc-400">{chain}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-zinc-900/40 p-8 rounded-[32px] border border-zinc-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Eternity Bridges</p>
                  <p className="text-4xl font-mono font-bold text-white tracking-widest">{status?.active_eternity_bridges || 42}</p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                     <Infinity size={14} />
                     <span>Eternal Consensus</span>
                  </div>
               </div>
               <div className="bg-zinc-900/40 p-8 rounded-[32px] border border-zinc-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Ledger State</p>
                  <p className="text-xl font-mono text-emerald-400 uppercase tracking-widest">{status?.genesis_ledger || 'IMMUTABLE'}</p>
                  <div className="mt-4 flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-emerald-500" />
                     <span>Reality-Verified</span>
                  </div>
               </div>
            </div>

            <div className="bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-900 space-y-6">
               <h3 className="font-bold flex items-center gap-2 text-white"><RefreshCw size={18} className="text-emerald-400 animate-spin-slow" /> Universal Transmutations</h3>
               <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 rounded-2xl border border-zinc-800/50">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center">
                             <Layers size={18} className="text-zinc-600" />
                          </div>
                          <div>
                             <p className="text-xs font-mono text-white">0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}</p>
                             <p className="text-[8px] font-black text-zinc-600 uppercase">GENESIS SYNC - TIMELINE {i + 144}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-[8px] font-black text-emerald-400">FINALIZED</span>
                          <ShieldCheck size={14} className="text-emerald-500" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-3xl p-8 rounded-[40px] border border-emerald-500/30 flex flex-col justify-between">
            <div>
               <h3 className="font-bold text-2xl text-white mb-4">Genesis Bridging</h3>
               <p className="text-sm text-zinc-400 leading-relaxed">
                  The Genesis Eternal Ledger orchestrates value and data across all known and hypothetical dimensions through God-Level consensus.
               </p>
            </div>
            <div className="space-y-6">
               <div className="p-6 bg-zinc-950/80 rounded-3xl border border-zinc-800">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black text-zinc-500 uppercase">Dimensional APY</span>
                     <span className="text-emerald-400 font-bold text-sm">+100%</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                     <div className="h-full w-[100%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
               </div>
               <button className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">
                  Synchronize Universal Assets <ExternalLink size={14} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
