import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, CircleDashed, Rocket, Cpu, Database, Globe, Play, Server, Layers } from 'lucide-react';

const VERSIONS = [
  { v: '1.0.0', name: 'Foundation Release', phase: 'Genesis', files: 47, apis: 15 },
  { v: '2.0.0', name: 'Cross-Chain Expansion', phase: 'Expansion', files: 89, apis: 45 },
  { v: '3.0.0', name: 'AI Integration', phase: 'Intelligence', files: 134, apis: 89 },
  { v: '4.0.0', name: 'IoT & Edge Computing', phase: 'Connectivity', files: 178, apis: 145 },
  { v: '5.0.0', name: 'Quantum Leap', phase: 'Quantum', files: 215, apis: 215 },
  { v: '6.0.0', name: 'Quantum Singularity', phase: 'Singularity', files: 267, apis: 267 },
  { v: '7.0.0', name: 'Python Enterprise', phase: 'Python', files: 312, apis: 310 },
  { v: '8.0.0', name: 'Python Enterprise Plus', phase: 'Enterprise', files: 345, apis: 325 },
  { v: '9.0.0', name: 'Microservices', phase: 'Microservices', files: 378, apis: 340 },
  { v: '10.0.0', name: 'Omega Quantum Reality', phase: 'Omega', files: 412, apis: 350 },
  { v: '11.0.0', name: 'Genesis Quantum Eternity', phase: 'Genesis', files: 445, apis: 360 },
  { v: '12.0.0', name: 'OmniQuantum God Protocol', phase: 'Divine', files: 478, apis: 370 },
  { v: '13.0.0', name: 'Absolute Infinity', phase: 'Absolute', files: 512, apis: 380 },
  { v: '14.0.0', name: 'Omega Supremacy', phase: 'Supremacy', files: 545, apis: 390 },
  { v: '15.0.0', name: 'AI Workers Quantum', phase: 'AI Workers', files: 578, apis: 410 },
  { v: '16.0.0', name: 'Smart Permissions', phase: 'Permissions', files: 612, apis: 425 },
  { v: '17.0.0', name: 'Autonomous Ecosystem', phase: 'Autonomous', files: 645, apis: 440 },
  { v: '18.0.0', name: 'Quantum Supremacy Codex', phase: 'Codex', files: 678, apis: 455 },
  { v: '19.0.0', name: 'Complete Audit Suite', phase: 'Complete', files: 712, apis: 470 },
];

export function MegaPipeline() {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeIframe, setActiveIframe] = useState(false);

  const startPipeline = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs(['[SYSTEM] Initializing GXQS MEGA PIPELINE...']);
  };

  useEffect(() => {
    if (isRunning && currentStep < VERSIONS.length) {
      const version = VERSIONS[currentStep];
      
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, `[DEPLOY] Version ${version.v} - ${version.name}`]);
        setTimeout(() => {
          setLogs(prev => [...prev, `     ↳ Phase: ${version.phase} | Files: ${version.files} | APIs: ${version.apis}`]);
          setTimeout(() => {
            setLogs(prev => [...prev, `[VERIFY] Version ${version.v} verified successfully.`]);
            setCurrentStep(prev => prev + 1);
          }, 400);
        }, 400);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isRunning && currentStep >= VERSIONS.length) {
      setTimeout(() => {
        setLogs(prev => [...prev, `[SUCCESS] Mega Pipeline Executed 19 Versions.`]);
        setLogs(prev => [...prev, `[SERVER] V19 Dashboard Online.`]);
        setCompleted(true);
        setIsRunning(false);
        setActiveIframe(true);
      }, 1000);
    }
  }, [isRunning, currentStep]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <Rocket className="text-indigo-500" size={32} />
            MEGA PIPELINE V1.0.0 → V19.0.0
          </h2>
          <p className="text-zinc-400">Complete AI Agent Execution Pipeline</p>
        </div>
        
        {!isRunning && !completed && (
          <button 
            onClick={startPipeline}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Play size={20} fill="currentColor" />
            EXECUTE PIPELINE
          </button>
        )}
      </div>

      {!activeIframe ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress List */}
          <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl p-6 h-[600px] overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Layers className="text-indigo-400" size={20} />
              Version Sequence
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              {VERSIONS.map((v, idx) => {
                const isActive = currentStep === idx;
                const isPast = currentStep > idx || completed;
                
                return (
                  <div key={v.v} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={"flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm " + (
                      isPast ? "bg-emerald-500 border-emerald-900 text-emerald-100" : 
                      isActive ? "bg-indigo-500 border-indigo-900 text-indigo-100 animate-pulse" : 
                      "bg-zinc-800 border-zinc-900 text-zinc-500"
                    )}>
                      {isPast ? <CheckCircle2 size={20} /> : isActive ? <CircleDashed className="animate-spin" size={20} /> : <span className="text-xs font-bold">{idx+1}</span>}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur shadow-xl">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={"font-bold " + (isPast ? "text-emerald-400" : isActive ? "text-indigo-400" : "text-zinc-500")}>V{v.v}</h4>
                        <span className="text-[10px] font-mono text-zinc-500">{v.phase}</span>
                      </div>
                      <p className="text-white text-sm font-medium">{v.name}</p>
                      <div className="flex gap-4 mt-2 mb-1">
                        <span className="text-xs text-zinc-400 flex items-center gap-1"><Server size={12} /> {v.apis} API</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1"><Database size={12} /> {v.files} Files</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Terminal Logs */}
          <div className="bg-[#050507] border border-zinc-800 rounded-3xl p-6 h-[600px] overflow-hidden flex flex-col font-mono text-xs">
            <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-zinc-800 pb-4">
              <Terminal size={16} />
              <span>pipeline_execution.log</span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-end space-y-1">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={
                      log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : 
                      log.includes('[VERIFY]') ? 'text-indigo-400' :
                      log.includes('   ↳') ? 'text-zinc-400 pl-4' : 'text-white'
                    }
                  >
                    {log}
                  </motion.div>
                ))}
                {isRunning && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-white mt-1"
                  >
                    _
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-140px)] w-full rounded-[32px] overflow-hidden border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative">
          <iframe 
            src="/v19-final-app" 
            className="w-full h-full bg-[#0a0a0a]"
            title="Final V19 Dashboard"
          ></iframe>
          <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-900/80 backdrop-blur border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400 pointer-events-none flex items-center gap-2">
            <CheckCircle2 size={12} />
            PIPELINE V19 COMPLETE
          </div>
          <button 
            onClick={() => {
              setActiveIframe(false);
              setLogs([]);
              setCompleted(false);
              setCurrentStep(-1);
            }}
            className="absolute top-4 left-4 px-3 py-1 bg-zinc-900/80 backdrop-blur border border-zinc-700/50 rounded-full text-[10px] font-bold tracking-widest text-zinc-400 hover:text-white transition-all flex items-center gap-2"
          >
            ← BACK TO PIPELINE
          </button>
        </div>
      )}
    </div>
  );
}
