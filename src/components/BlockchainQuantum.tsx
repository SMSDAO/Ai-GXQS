import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, Zap, Activity, Globe, ShieldCheck, Database, RefreshCw, ExternalLink, Layers, Cpu } from 'lucide-react';
import axios from 'axios';

interface Tx {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: string;
  chain: string;
}

export const BlockchainQuantum: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [txs, setTxs] = useState<Tx[]>([
    { hash: '0x32a1...4f2d', from: '0xGXQS...Quantum', to: '0xDEFI...Yield', value: '142.2 QNTM', status: 'confirmed', chain: 'Quantum' },
    { hash: '0xbc98...11a2', from: '0xGXQS...Quantum', to: '0xBASE...Bridge', value: '500,000 USDC', status: 'confirmed', chain: 'Base' },
    { hash: '0x77d2...99e1', from: '0xUSER...Node', to: '0xGXQS...Quantum', value: '5.5 ETH', status: 'confirmed', chain: 'Mainnet' },
    { hash: '0xee12...55b4', from: '0xGXQS...Quantum', to: '0xPOOL...Liquidity', value: '250.0 QNTM', status: 'pending', chain: 'Quantum' },
  ]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get('/api/v9/blockchain/status');
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
    const interval = setInterval(fetchInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-950/80 backdrop-blur-3xl p-8 rounded-[40px] border border-zinc-800 border-t-indigo-500/30">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Quantum Blockchain Mesh</h2>
          <p className="text-zinc-500 text-sm mt-1">V9.0 High-Performance Cross-Chain Synchronicity Matrix</p>
        </div>
        <div className="flex gap-3">
           <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Mesh Network: ACTIVE</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MonitorStat label="Active Block" value={info?.quantum_chain?.block || '15,242,100'} chain="Quantum" />
        <MonitorStat label="Mesh TPS" value={info?.quantum_chain?.tps + (info?.base_mesh?.tps || 0) || '16,500'} chain="Global" />
        <MonitorStat label="Gas Price" value="4.2 Gwei" chain="Quantum" />
        <MonitorStat label="Sync Rate" value="100.00%" chain="Cross-Chain" color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-950/50 backdrop-blur-2xl border border-zinc-900 rounded-[40px] p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold flex items-center gap-2"><RefreshCw size={18} className="text-indigo-400 animate-spin-slow" /> Mesh Transactions</h3>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View QuantumScan</button>
          </div>
          <div className="space-y-4">
            {txs.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-2xl border border-transparent hover:border-zinc-800 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-900">
                    <Layers size={18} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono text-white">{tx.hash}</p>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-[8px] font-black uppercase text-zinc-500">{tx.chain}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">FROM: {tx.from}</span>
                      <span className="text-[8px] text-zinc-800">→</span>
                      <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">TO: {tx.to}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{tx.value}</p>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${tx.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-3xl border border-indigo-500/30 p-8 rounded-[40px] relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="font-bold flex items-center gap-2 mb-6"><ShieldCheck size={20} className="text-emerald-400" /> Quantum Governance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              V9 protocols are secured by 2,048 multi-cloud validator qubits. Your node contributes to global consensus with zero-latency synchronization.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-zinc-500">Staking APY</span>
                <span className="text-emerald-400">+24.8%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
              Stake QNTM <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MonitorStat = ({ label, value, chain, color = "text-white" }: any) => (
  <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] space-y-2">
    <div className="flex justify-between items-center">
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
      <span className="text-[8px] font-black uppercase text-zinc-700">{chain}</span>
    </div>
    <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
  </div>
);
