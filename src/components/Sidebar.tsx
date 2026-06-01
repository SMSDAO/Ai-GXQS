/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Server, Cloud, Globe, Smartphone, ChevronRight, Key, Activity, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { Environment, AppView } from '../types.ts';

interface SidebarProps {
  currentEnv: Environment;
  onEnvChange: (env: Environment) => void;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const envs: { id: Environment; label: string; icon: any }[] = [
  { id: 'local', label: 'Local Dev', icon: Smartphone },
  { id: 'vercel', label: 'Vercel Edge', icon: Globe },
  { id: 'vps', label: 'Custom VPS', icon: Server },
  { id: 'gcloud', label: 'Google Cloud', icon: Cloud },
];

export default function Sidebar({ currentEnv, onEnvChange, activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 border-r border-slate-200 bg-slate-50 h-full flex flex-col p-4 space-y-6">
      <div className="flex items-center space-x-2 px-2 py-4">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Server className="w-5 h-5 text-white" />
        </div>
        <h1 className="font-bold text-slate-800 tracking-tight text-lg">SmartPrompt Elite</h1>
      </div>

      <nav className="flex-1 space-y-6">
        <div>
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main</p>
          <div className="space-y-1">
            <button
              onClick={() => onViewChange('pipeline')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeView === 'pipeline' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Activity className={`w-4 h-4 ${activeView === 'pipeline' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="font-medium">Pipeline Monitor</span>
            </button>
            <button
              onClick={() => onViewChange('passes')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeView === 'passes' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Key className={`w-4 h-4 ${activeView === 'passes' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="font-medium">Access Passes</span>
            </button>
            <button
              onClick={() => onViewChange('lead-engine')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeView === 'lead-engine' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Rocket className={`w-4 h-4 ${activeView === 'lead-engine' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="font-medium">Lead Engine V3</span>
            </button>
          </div>
        </div>

        {activeView === 'pipeline' && (
          <div>
            <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Environments</p>
            <div className="space-y-1">
              {envs.map((env) => (
                <button
                  key={env.id}
                  onClick={() => onEnvChange(env.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    currentEnv === env.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <env.icon className={`w-3.5 h-3.5 ${currentEnv === env.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{env.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="mt-auto p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-1">Pipeline Version</p>
        <p className="text-xs text-indigo-800 font-medium">v1.0.0 Stable</p>
      </div>
    </div>
  );
}
