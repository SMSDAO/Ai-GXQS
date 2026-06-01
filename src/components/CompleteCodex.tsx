import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Brain, 
  Shield, 
  Store, 
  Zap, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Terminal,
  Cpu,
  Database,
  Search,
  Sparkles,
  Layout,
  Layers,
  Code,
  Plus
} from 'lucide-react';

interface Deployment {
  deployment_id: string;
  service: string;
  from_color: string;
  to_color: string;
  status: string;
  started_at: string;
}

interface Plugin {
  id: string;
  name: string;
  category: string;
  downloads: number;
}

export const CompleteCodex: React.FC = () => {
  const [activeView, setActiveView] = useState<'cicd' | 'studio' | 'security' | 'marketplace' | 'gas'>('cicd');
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(false);
  const [gasReport, setGasReport] = useState<any>(null);

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    try {
      const res = await axios.get('/api/v19/marketplace/list');
      setPlugins(res.data);
    } catch (err) {
      console.error('Marketplace error:', err);
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/v19/deploy/blue-green');
      setDeployments(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('Deploy error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGasAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v19/gas/analyze/0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      setGasReport(res.data);
    } catch (err) {
      console.error('Gas analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* V19 Status Header */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[32px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Complete Codex V19</h2>
            <p className="text-xs text-emerald-400/60 font-mono uppercase tracking-[0.2em]">System Status: Production_Ready</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Node: GXQS_PROD_01
          </div>
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Sync Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Rail */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-[32px] p-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6 px-2">Core Ecosystem</h3>
            <div className="space-y-2">
              {[
                { id: 'cicd', label: 'CI/CD Pipeline', icon: Rocket, color: 'text-indigo-400' },
                { id: 'studio', label: 'Fine-Tuning Studio', icon: Brain, color: 'text-purple-400' },
                { id: 'security', label: 'Audit Security', icon: Shield, color: 'text-rose-400' },
                { id: 'marketplace', label: 'Plugin Market', icon: Store, color: 'text-emerald-400' },
                { id: 'gas', label: 'Gas Optimizer', icon: Zap, color: 'text-amber-400' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${
                    activeView === item.id 
                      ? 'bg-zinc-800 text-white shadow-xl' 
                      : 'text-zinc-500 hover:bg-zinc-800/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={activeView === item.id ? item.color : 'text-zinc-600'} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeView === item.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-[32px] p-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Protocol Evolution</h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
              V19 introduces the first complete production-ready codex for autonomous entity orchestration.
            </p>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeView === 'cicd' && (
              <motion.div
                key="cicd"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[600px]"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">CI/CD Pipeline</h2>
                    <p className="text-xs text-zinc-500 mt-1">Zero-downtime Blue/Green deployment protocol</p>
                  </div>
                  <button 
                    onClick={handleDeploy}
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Deploying...' : 'Execute Blue/Green'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="text-xs font-bold uppercase tracking-widest">Environment: Blue</h4>
                    </div>
                    <p className="text-2xl font-bold mb-1 tracking-tight">Active</p>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">COMMIT: 0xFXS_V19_042</p>
                  </div>
                  <div className="p-6 bg-zinc-950/40 border border-zinc-800/50 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600">Environment: Green</h4>
                    </div>
                    <p className="text-2xl font-bold mb-1 tracking-tight text-zinc-600">Standby</p>
                    <p className="text-[10px] text-zinc-700 font-mono tracking-tighter">LAST_SYCN: 12.04.26</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Recent Deployments</h4>
                  {deployments.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                      <Terminal size={32} className="mx-auto text-zinc-700 mb-4" />
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">No deployment history</p>
                    </div>
                  ) : (
                    deployments.map(dep => (
                      <div key={dep.deployment_id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                            <Rocket size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{dep.service}</p>
                            <p className="text-[10px] text-zinc-500 font-mono">{dep.deployment_id}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                           <div>
                              <p className="text-xs font-bold text-emerald-400 uppercase">{dep.status}</p>
                              <p className="text-[10px] text-zinc-600">{new Date(dep.started_at).toLocaleTimeString()}</p>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-white transition-all">
                             <ChevronRight size={14} />
                           </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeView === 'studio' && (
              <motion.div
                key="studio"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[600px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -mr-[250px] -mt-[250px]"></div>
                
                <div className="mb-12">
                  <h2 className="text-2xl font-bold">Fine-Tuning Studio</h2>
                  <p className="text-xs text-zinc-500 mt-1">Orchestrate custom AI domain intelligence</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-[32px] relative group hover:border-purple-500/30 transition-all">
                         <div className="p-4 bg-purple-500/10 text-purple-400 rounded-[24px] w-fit mb-6">
                            <Brain size={32} />
                         </div>
                         <h3 className="text-lg font-bold mb-2">Model Orchestration</h3>
                         <p className="text-xs text-zinc-500 leading-relaxed mb-8">
                           Fine-tune foundation models on your proprietary datasets to create specialized domain experts.
                         </p>
                         <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">
                           Initialize Training
                         </button>
                      </div>
                      
                      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-[28px] flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Models</p>
                            <p className="text-xl font-bold">128.4K</p>
                         </div>
                         <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-purple-500"></div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-zinc-950/40 border border-zinc-800 rounded-[32px] p-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4 px-2">Production Weights</h4>
                      <div className="space-y-3">
                         {[
                           { name: 'Financial_Sage_v9', status: 'In_Use', accuracy: '99.4%' },
                           { name: 'Legal_Codex_v4', status: 'Syncing', accuracy: '98.1%' },
                           { name: 'Medical_Core_v12', status: 'Stable', accuracy: '99.9%' }
                         ].map(model => (
                           <div key={model.name} className="p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between">
                              <div>
                                 <p className="text-xs font-bold">{model.name}</p>
                                 <p className="text-[10px] text-purple-400 font-mono">{model.status}</p>
                              </div>
                              <p className="text-xs font-bold text-white">{model.accuracy}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeView === 'marketplace' && (
              <motion.div
                key="marketplace"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[600px]"
              >
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-2xl font-bold">Plugin Marketplace</h2>
                    <p className="text-xs text-zinc-500 mt-1">Production-ready extensions for your ecosystem</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search plugins..."
                      className="bg-zinc-950 border border-zinc-800 rounded-2xl py-3 pl-12 pr-6 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all w-[300px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plugins.map(plugin => (
                    <div key={plugin.id} className="p-6 bg-zinc-950 border border-zinc-800 rounded-[32px] hover:border-emerald-500/30 transition-all group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={16} className="text-emerald-400" />
                      </div>
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Cpu size={24} />
                      </div>
                      <h4 className="font-bold text-white mb-1">{plugin.name}</h4>
                      <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-4">{plugin.category} Module</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                        <div className="flex items-center gap-2">
                           <Activity size={12} className="text-zinc-600" />
                           <span className="text-[10px] font-bold text-zinc-400">{plugin.downloads.toLocaleString()}</span>
                        </div>
                        <button className="text-[10px] font-black uppercase text-emerald-400 tracking-widest group-hover:underline">Install</button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-6 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-all cursor-pointer">
                     <Plus size={32} className="text-zinc-700 mb-4" />
                     <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Publish New Plugin</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'gas' && (
              <motion.div
                key="gas"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[600px]"
              >
                <div className="flex justify-between items-center mb-12">
                   <div>
                    <h2 className="text-2xl font-bold">Gas Optimizer</h2>
                    <p className="text-xs text-zinc-500 mt-1">Smart contract efficiency diagnostics</p>
                  </div>
                  <button 
                    onClick={handleGasAnalyze}
                    disabled={loading}
                    className="px-6 py-3 bg-amber-500 text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-amber-400 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Contract'}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   <div className="lg:col-span-8 space-y-6">
                      <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-[32px] relative overflow-hidden">
                         <div className="flex justify-between items-start mb-8">
                            <div>
                               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Diagnostic Score</p>
                               <p className="text-6xl font-bold tracking-tighter text-amber-500">{gasReport ? gasReport.gas_score : '--'}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Contract Status</p>
                               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest">Verified</span>
                            </div>
                         </div>
                         
                         <div className="h-4 bg-zinc-900 rounded-full overflow-hidden mb-8">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: gasReport ? `${gasReport.gas_score}%` : '0%' }}
                               className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
                            />
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4 px-2">Optimization Recommendations</h4>
                            {gasReport ? gasReport.recommendations.map((rec: string, i: number) => (
                               <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                     <Sparkles size={14} />
                                  </div>
                                  <p className="text-xs font-medium text-zinc-300">{rec}</p>
                               </div>
                            )) : (
                               <p className="text-xs text-zinc-600 italic px-2">Enter contract address to generate diagnostics...</p>
                            )}
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-4 space-y-6">
                      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-[28px]">
                         <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Base Network Gas</p>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center">
                               <span className="text-xs text-zinc-400">Slow</span>
                               <span className="text-xs font-bold text-white">0.001 Gwei</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-xs text-zinc-400">Standard</span>
                               <span className="text-xs font-bold text-emerald-400">0.005 Gwei</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-xs text-zinc-400">Fast</span>
                               <span className="text-xs font-bold text-amber-400">0.012 Gwei</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-[28px]">
                         <Zap size={24} className="text-amber-500 mb-4" />
                         <h4 className="text-xs font-bold text-amber-500 mb-2 uppercase">V19 AI Optimization</h4>
                         <p className="text-[10px] text-zinc-500 leading-relaxed">
                            Complete Codex V19 uses self-learning logic to automatically suggest bytecode-level optimizations for EVM contracts.
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeView === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 min-h-[600px]"
              >
                <div className="flex justify-between items-center mb-12">
                   <div>
                    <h2 className="text-2xl font-bold">Audit & Security</h2>
                    <p className="text-xs text-zinc-500 mt-1">Real-time threat detection and audit logging</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl flex items-center gap-3">
                    <Shield size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Shield Active</span>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl">
                         <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Threat Level</p>
                         <p className="text-2xl font-bold text-emerald-400">Minimal</p>
                      </div>
                      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl">
                         <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Active Alerts</p>
                         <p className="text-2xl font-bold text-white">0</p>
                      </div>
                      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl">
                         <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Integrity Score</p>
                         <p className="text-2xl font-bold text-indigo-400">100.0</p>
                      </div>
                   </div>

                   <div className="bg-zinc-950/40 border border-zinc-800 rounded-[32px] p-6 overflow-hidden relative">
                      <div className="flex items-center justify-between mb-6">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 px-2">Live Security Audit Feed</h4>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Monitoring
                         </div>
                      </div>
                      
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                         {[
                           { action: 'Identity_Sync', user: 'system_root', time: '19:04:12', status: 'SUCCESS' },
                           { action: 'API_Key_Rotation', user: 'gxqs_admin', time: '19:02:45', status: 'SUCCESS' },
                           { action: 'Firewall_Update', user: 'system_security', time: '18:55:10', status: 'SUCCESS' },
                           { action: 'Encrypted_Storage_Mount', user: 'system_root', time: '18:42:33', status: 'SUCCESS' }
                         ].map((log, i) => (
                           <div key={i} className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl flex items-center justify-between group hover:bg-zinc-900/50 transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-zinc-400 transition-all">
                                    <Terminal size={14} />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-tight">{log.action}</p>
                                    <p className="text-[10px] text-zinc-600 font-mono italic">OPERATOR: {log.user}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black text-rose-400/80 uppercase mb-1 tracking-widest">{log.status}</p>
                                 <p className="text-[10px] text-zinc-700 font-mono tracking-tighter">{log.time}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* V19 Footer Visual */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-xl">
               <h3 className="text-2xl font-bold tracking-tighter text-white">Production Integrity Unleashed</h3>
               <p className="text-xs text-zinc-500 leading-relaxed">
                 The Complete Codex V19 is the ultimate manifestation of autonomous software engineering. 
                 From deployment to security and optimization, every layer is handled by the V19 core engine.
               </p>
               <div className="flex gap-6 pt-2">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 tracking-widest">
                    <Shield size={14} /> 100% AUDITED
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 tracking-widest">
                    <Cpu size={14} /> V19_CORE_ACTIVE
                 </div>
               </div>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs font-bold hover:bg-zinc-900 transition-all">Documentation</button>
               <button className="px-8 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">System Core</button>
            </div>
         </div>
      </div>
    </div>
  );
};
