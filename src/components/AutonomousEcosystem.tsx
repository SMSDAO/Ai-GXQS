import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Rocket, 
  Link as LinkIcon, 
  Layers, 
  Zap, 
  Plus, 
  Shield, 
  Database, 
  Layout, 
  Code,
  Globe,
  Terminal,
  Activity,
  ChevronRight,
  Search,
  Sparkles
} from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  type: string;
}

interface TeleportEndpoint {
  id: string;
  name: string;
  url: string;
}

interface Transaction {
  tx_id: string;
  asset_type: string;
  asset_id: string;
  timestamp: string;
  block_hash: string;
}

export const AutonomousEcosystem: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [endpoints, setEndpoints] = useState<TeleportEndpoint[]>([]);
  const [ledger, setLedger] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeBoard, setActiveBoard] = useState<'plugins' | 'teleport' | 'registry'>('plugins');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const ledgerRes = await axios.get('/api/v17/registry/ledger');
      setLedger(Array.isArray(ledgerRes.data.transactions) ? ledgerRes.data.transactions : []);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleGeneratePlugin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/v17/plugins/generate', {
        name: `Node_${Math.random().toString(36).substring(7).toUpperCase()}`,
        type: 'api'
      });
      console.log('Plugin generation resp:', res.data);
      setPlugins(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Plugin generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterEndpoint = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/v17/teleport/register', {
        name: `Endpoint_${Math.random().toString(36).substring(7)}`,
        url: 'https://api.example.com'
      });
      setEndpoints(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Endpoint registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Ecosystem Nodes', value: '1.2M', icon: Globe, color: 'text-indigo-400' },
          { label: 'Teleport Mesh', value: 'Active', icon: Zap, color: 'text-emerald-400' },
          { label: 'On-Chain Sync', value: '0xGXQS', icon: LinkIcon, color: 'text-purple-400' },
          { label: 'Autonomy Level', value: 'Self-Evolving', icon: Cpu, color: 'text-rose-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
            <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-[32px] p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2">
              <Terminal size={14} /> Control Mesh
            </h3>
            
            <div className="space-y-2">
              {[
                { id: 'plugins', label: 'Plugin Factory', icon: Plus },
                { id: 'teleport', label: 'Teleport Mesh', icon: Rocket },
                { id: 'registry', label: 'On-Chain Ledger', icon: LinkIcon }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBoard(tab.id as any)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${
                    activeBoard === tab.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon size={18} />
                    <span className="font-bold text-xs">{tab.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeBoard === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-800 space-y-4">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Protocol v17.0.0</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono">
                  Autonomous personality activated. Teleport mesh stable across 14 dimensions.
                </p>
              </div>
              <button 
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={activeBoard === 'plugins' ? handleGeneratePlugin : handleRegisterEndpoint}
                disabled={loading}
              >
                {loading ? 'Processing...' : activeBoard === 'plugins' ? 'Generate Node' : 'Initialize Teleport'}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeBoard === 'plugins' ? (
              <motion.div
                key="plugins"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[500px]"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold">Node Factory</h2>
                    <p className="text-xs text-zinc-500">Autonomous API and Web3 node generation</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest">Active: {plugins.length}</span>
                  </div>
                </div>

                {plugins.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                    <Database size={48} className="mb-4 opacity-20" />
                    <p className="text-xs font-bold uppercase tracking-widest">No active nodes detected</p>
                    <p className="text-[10px] mt-2">Initialize your first autonomous node from the mesh controller</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plugins.map(p => (
                      <div key={p.id} className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl hover:border-indigo-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                            <Cpu size={20} />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">0x{p.id ? p.id.substring(0,8) : 'UNKNOWN'}</span>
                        </div>
                        <h4 className="font-bold text-white mb-1">{p.name}</h4>
                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-4">Autonomous {p.type} Module</p>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold uppercase hover:bg-indigo-600 hover:text-white transition-all">Configure</button>
                          <button className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 hover:text-white transition-all">Destroy</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeBoard === 'teleport' ? (
              <motion.div
                key="teleport"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[500px]"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold">Teleport Mesh</h2>
                    <p className="text-xs text-zinc-500">Cross-dimensional API and Contract mesh routing</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {endpoints.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                      <Rocket size={48} className="mb-4 opacity-20" />
                      <p className="text-xs font-bold uppercase tracking-widest text-center">Teleport mesh silent. <br/>Awaiting gateway initialization.</p>
                    </div>
                  )}
                  {endpoints.map(e => (
                    <div key={e.id} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                          <Zap size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{e.name}</p>
                          <p className="text-[10px] text-zinc-600 font-mono italic">{e.url}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                         <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Throughput</p>
                            <p className="text-xs font-bold text-emerald-400 font-mono">1.2 TB/s</p>
                         </div>
                         <button className="p-2 bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-all"><Search size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="registry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/60 border border-zinc-800 rounded-[32px] p-8 min-h-[500px]"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold">On-Chain Ledger</h2>
                    <p className="text-xs text-zinc-500">Immutable 0xGXQS v17 block sequence</p>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">BLOCK: {ledger.length * 42}</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {ledger.map((tx, i) => (
                    <div key={i} className="p-4 bg-zinc-950/30 border border-zinc-900 rounded-xl hover:bg-zinc-900/40 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest p-1 rounded ${
                          tx.asset_type === 'plugin' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {tx.asset_type} Registered
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600">
                            <Activity size={12} />
                         </div>
                         <div className="flex-1">
                            <p className="text-[10px] font-mono text-zinc-400 truncate tracking-tight">TX: {tx.tx_id}</p>
                            <p className="text-[10px] font-mono text-indigo-400/60 truncate tracking-tight">HASH: {tx.block_hash}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                  {ledger.length === 0 && (
                    <div className="text-center py-20 text-zinc-600 font-mono text-xs uppercase tracking-widest">
                       Listening For On-Chain Events...
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Visual Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
           <div className="flex gap-12 items-center">
              <div className="space-y-4">
                 <h4 className="font-bold text-white uppercase tracking-tighter text-xl leading-none">Self-Governing Intelligence</h4>
                 <p className="text-xs text-zinc-500 leading-relaxed">
                   The V17 autonomous ecosystem uses cross-dimensional protocols to manage infrastructure without human intervention. Zero-touch deployment is now active.
                 </p>
                 <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                       <Shield size={12} /> 100% SECURE
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                       <Activity size={12} /> 99.9% UPTIME
                    </div>
                 </div>
              </div>
              <div className="hidden sm:block">
                 <Sparkles className="text-indigo-500/20 w-24 h-24" />
              </div>
           </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-600/20 to-indigo-600/20 border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between">
           <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Sync Status</h4>
           <p className="text-3xl font-bold tracking-tighter text-white">V17_ACTIVE</p>
           <div className="space-y-1">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ x: ['-100%', '100%'] }}
                   transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                   className="h-full w-1/2 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                 />
              </div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Evolution Active</p>
           </div>
        </div>
      </div>
    </div>
  );
};
