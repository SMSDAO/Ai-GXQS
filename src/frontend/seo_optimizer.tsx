/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw, 
  Trophy,
  Zap,
  ArrowRight
} from 'lucide-react';

interface SEOResult {
  score: number;
  checks: {
    title: { score: number; text: string; rec: string };
    description: { score: number; text: string; rec: string };
    keywords: { score: number; text: string; rec: string };
    structure: { score: number; text: string; rec: string };
    images: { score: number; text: string; rec: string };
  };
  details: {
    wordCount: number;
    readability: number;
    density: { [key: string]: number };
  };
}

export const SEOOptimizer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);

  const simulateScan = () => {
    if (!url) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const mockResult: SEOResult = {
        score: Math.floor(Math.random() * 20) + 75,
        checks: {
          title: { 
            score: 95, 
            text: "Optimal Title Length", 
            rec: "Title is 58 characters. Perfectly optimized for SERP visibility." 
          },
          description: { 
            score: 82, 
            text: "Length Warning", 
            rec: "Meta description is slightly short (112 chars). Aim for 155 for better CTR." 
          },
          keywords: { 
            score: 68, 
            text: "Low Keyword Density", 
            rec: "Primary keywords appear less than 1.5% in content. Increase usage in H2 tags." 
          },
          structure: { 
            score: 100, 
            text: "Perfect Hierarchy", 
            rec: "Exactly one H1 detected with logical H2-H4 sub-structure." 
          },
          images: { 
            score: 45, 
            text: "Missing Alt Text", 
            rec: "12 images found without alt attributes. Critical for accessibility and SEO." 
          }
        },
        details: {
          wordCount: 1248,
          readability: 62.4,
          density: {
            "enterprise": 0.024,
            "marketing": 0.018,
            "automation": 0.015
          }
        }
      };
      setResult(mockResult);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-900 border-b-4 border-b-emerald-500/20">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20">
              <Globe className="text-emerald-400" size={32} />
           </div>
           <div>
              <h1 className="text-3xl font-bold tracking-tighter text-white">SEO Aggregator</h1>
              <p className="text-zinc-500 text-sm mt-1">Advanced multi-node search engine optimization scanner.</p>
           </div>
        </div>
        
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Scanner: Active</span>
           </div>
        </div>
      </div>

      <div className="relative">
         <input 
           type="text" 
           placeholder="https://node.smartelite.network/landing-alpha"
           value={url}
           onChange={(e) => setUrl(e.target.value)}
           className="w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-[32px] p-6 pr-44 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono text-sm placeholder:text-zinc-700"
         />
         <button 
           onClick={simulateScan}
           disabled={isScanning || !url}
           className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white font-bold rounded-3xl transition-all flex items-center gap-2 whitespace-nowrap"
         >
           {isScanning ? <RefreshCcw size={18} className="animate-spin" /> : <Search size={18} />}
           {isScanning ? 'Analyzing...' : 'Deep Scan'}
         </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[40px] text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl transition-all group-hover:bg-emerald-500/10"></div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-8">Aggregate Score</h3>
                  <div className="relative inline-block">
                     <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-zinc-800" />
                        <motion.circle 
                          cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" 
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (440 * (result?.score || 0) / 100) }}
                          className="text-emerald-500"
                          strokeLinecap="round"
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black tracking-tighter">{result.score}</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Points</span>
                     </div>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-2 text-emerald-400 font-bold">
                     <Trophy size={16} />
                     <span className="text-sm">94th Percentile Globally</span>
                  </div>
               </div>

               <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[40px] space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Document Meta</h3>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-zinc-500">Word Count</span>
                     <span className="font-mono text-white">{result.details.wordCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-zinc-500">Readability (FK)</span>
                     <span className="font-mono text-white">{result.details.readability}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-900"></div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Top Density</h3>
                  {Object.entries(result.details.density).map(([word, value]) => (
                    <div key={word} className="flex justify-between items-center text-xs">
                       <span className="text-zinc-400 lowercase">{word}</span>
                       <span className="font-mono text-indigo-400">{((value as number) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 px-4">Detailed Performance Audit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Object.entries(result.checks) as [string, any][]).map(([key, check]) => (
                      <div key={key} className="bg-zinc-950/50 border border-zinc-900 p-6 rounded-3xl hover:border-zinc-700 transition-all group">
                         <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{key}</span>
                            {(check as any).score > 80 ? (
                              <CheckCircle2 className="text-emerald-500" size={16} />
                            ) : (
                              <AlertCircle className="text-amber-500" size={16} />
                            )}
                         </div>
                         <h4 className="font-bold text-white mb-2">{(check as any).text}</h4>
                         <p className="text-[10px] text-zinc-500 leading-relaxed font-medium mb-4">{(check as any).rec}</p>
                         <div className="h-1 bg-zinc-900 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(check as any).score}%` }}
                               className={`h-full ${(check as any).score > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            />
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="p-8 bg-indigo-600 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-indigo-500/20">
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold flex items-center gap-2"><Zap size={20} /> AI Auto-Optimization Available</h3>
                     <p className="text-white/70 text-xs">A new landing node can be automatically generated with these recommendations applied.</p>
                  </div>
                  <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                     Initialize Generator <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

