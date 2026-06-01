/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Terminal, Shield, Power, Activity, Network, FileCode, Check, Github, ExternalLink, Sparkles, BrainCircuit } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DeploymentState } from '../types.ts';

interface DashboardProps {
  state: DeploymentState;
  onDeploy: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  analysis: string | null;
}

export default function DeploymentDashboard({ state, onDeploy, onAnalyze, isAnalyzing, analysis }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'scripts' | 'analysis'>('console');
  const [scriptType, setScriptType] = useState<'powershell' | 'python'>('powershell');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyze = () => {
    onAnalyze();
    setActiveTab('analysis');
  };

  return (
    <div className="flex-1 p-8 space-y-8 overflow-y-auto bg-slate-50/30">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Pipeline: <span className="text-indigo-600 capitalize">{state.currentEnvironment}</span>
          </h2>
          <p className="text-slate-500 text-sm">Universal deployment status and orchestration.</p>
        </div>
        <button
          onClick={onDeploy}
          disabled={state.isDeploying}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg ${
            state.isDeploying
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95'
          }`}
        >
          <Power className={`w-4 h-4 ${state.isDeploying ? 'animate-pulse' : ''}`} />
          <span>{state.isDeploying ? 'Deploying...' : 'Deploy to Environment'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          icon={Activity} 
          label="Health Status" 
          value={state.health === 'healthy' ? 'Active' : 'Awaiting Deployment'} 
          sub="Self-healing v1.0"
          type={state.health === 'healthy' ? 'success' : 'neutral'}
        />
        <StatCard 
          icon={Network} 
          label="Target Port" 
          value={state.config.port} 
          sub="External Ingress"
          type="neutral"
        />
        <StatCard 
          icon={Shield} 
          label="Verification" 
          value={state.verification.status === 'verified' ? 'GitHub Verified' : 'Unverified'} 
          sub={state.verification.githubRepo}
          type={state.verification.status === 'verified' ? 'success' : 'neutral'}
        />
        <StatCard 
          icon={Terminal} 
          label="Logs" 
          value={state.logs.length.toString()} 
          sub="Session Events"
          type="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[500px]">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center space-x-2 shrink-0">
            <Network className="w-4 h-4 text-indigo-500" />
            <span>Network Config</span>
          </h3>
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <ConfigRow label="Deployment URL" value={state.config.url} />
            <ConfigRow label="Primary Port" value={state.config.port} />
            {state.config.oraclePort && <ConfigRow label="Oracle Port" value={state.config.oraclePort} />}
            {state.config.redisPort && <ConfigRow label="Redis Port" value={state.config.redisPort} />}
            {state.config.postgresPort && <ConfigRow label="Postgres Port" value={state.config.postgresPort} />}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Auto-Repair</span>
              <div className={`w-10 h-5 rounded-full p-1 transition-colors ${state.config.autoRepair ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${state.config.autoRepair ? 'translate-x-5' : ''}`} />
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                <Github className="w-3 h-3" />
                <span>Oracle Proof</span>
              </h4>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Commit Hash</span>
                  <span className="text-xs font-mono font-bold text-indigo-600">{state.verification.commitSha}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Status</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      state.verification.status === 'verified' ? 'bg-emerald-500' :
                      state.verification.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                      'bg-slate-300'
                    }`} />
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-tight">
                      {state.verification.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {state.config.projectId && <ConfigRow label="Project ID" value={state.config.projectId} />}
          </div>
        </div>

        {/* Multi-Tab Terminal/Script Panel */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4 shrink-0">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('console')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${activeTab === 'console' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Terminal className={`w-4 h-4 ${activeTab === 'console' ? 'text-emerald-400' : ''}`} />
                <span>Console</span>
              </button>
              <button 
                onClick={() => setActiveTab('scripts')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${activeTab === 'scripts' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <FileCode className={`w-4 h-4 ${activeTab === 'scripts' ? 'text-indigo-400' : ''}`} />
                <span>Scripts</span>
              </button>
              <button 
                onClick={() => setActiveTab('analysis')}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${activeTab === 'analysis' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Sparkles className={`w-4 h-4 ${activeTab === 'analysis' ? 'text-amber-400' : ''}`} />
                <span>AI Insights</span>
              </button>
            </div>
            
            {activeTab === 'console' && (
              <button
                onClick={handleAnalyze}
                disabled={state.logs.length === 0 || isAnalyzing}
                className="flex items-center space-x-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-slate-300 transition-colors border border-white/5 disabled:opacity-50"
              >
                <BrainCircuit className={`w-3 h-3 ${isAnalyzing ? 'animate-pulse text-amber-400' : 'text-amber-400'}`} />
                <span>{isAnalyzing ? 'Analyzing...' : 'AI Analyze'}</span>
              </button>
            )}

            {activeTab === 'scripts' && (
                <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
                  <button 
                    onClick={() => setScriptType('powershell')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${scriptType === 'powershell' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    PWSH
                  </button>
                  <button 
                    onClick={() => setScriptType('python')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${scriptType === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    PY
                  </button>
                </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'console' ? (
              <div className="h-full overflow-y-auto font-mono text-xs space-y-2 scroll-smooth custom-scrollbar pr-2">
                <AnimatePresence initial={false}>
                  {state.logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex space-x-3 leading-relaxed"
                    >
                      <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                      <span className={
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'warning' ? 'text-amber-400' :
                        'text-slate-300'
                      }>
                        {log.message}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {state.logs.length === 0 && (
                  <div className="text-slate-600 italic">No output in stream. Click deploy to start.</div>
                )}
              </div>
            ) : activeTab === 'scripts' ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-slate-950/50 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-y-auto custom-scrollbar border border-white/5 relative group">
                  <pre>{state.scripts[scriptType]}</pre>
                  <button 
                    onClick={() => copyToClipboard(state.scripts[scriptType])}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700 p-2 rounded-md text-white border border-white/10"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <FileCode className="w-3 h-3" />}
                  </button>
                </div>
                <div className="mt-3 text-[10px] text-slate-500 italic">
                  Note: These scripts are auto-generated for {state.currentEnvironment.toUpperCase()} environments.
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-150 animate-pulse" />
                      <BrainCircuit className="w-12 h-12 text-amber-400 animate-bounce relative" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-300 font-bold">Consulting SmartPrompt Oracle...</p>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Decoding deployment telemetry</p>
                    </div>
                  </div>
                ) : analysis ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-950/50 rounded-xl p-6 border border-amber-500/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-white text-sm">Deployment Analysis</h4>
                    </div>
                    <div className="prose prose-invert prose-xs text-slate-300 leading-relaxed max-w-none">
                      <div className="whitespace-pre-wrap">{analysis}</div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <Sparkles className="w-12 h-12 text-slate-800" />
                    <div className="space-y-1">
                      <p className="text-slate-500">Run a deployment and click 'AI Analyze' to get insights.</p>
                      <button 
                        onClick={handleAnalyze}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Start analysis now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function StatCard({ icon: Icon, label, value, sub, type = 'neutral' }: { icon: any, label: string, value: string, sub: string, type?: 'success' | 'neutral' }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-hover hover:border-indigo-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded-lg ${type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-mono text-slate-700 break-all">{value}</span>
    </div>
  );
}
