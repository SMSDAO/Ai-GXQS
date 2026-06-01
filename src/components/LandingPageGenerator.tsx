import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Settings, 
  Eye, 
  Save, 
  RefreshCcw, 
  ChevronRight, 
  Monitor, 
  Smartphone, 
  Tablet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface PageConfig {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  features: Feature[];
  template: 'default' | 'saas' | 'minimal';
}

export const LandingPageGenerator: React.FC = () => {
  const [config, setConfig] = useState<PageConfig>({
    title: 'GXQS Enterprise Elite',
    description: 'Manifest your enterprise marketing with V8 elite intelligence.',
    heroTitle: 'V8: The Enterprise Elite of Marketing',
    heroSubtitle: 'The world\'s first autonomous AI intelligence for high-performance scale architecture.',
    ctaText: 'Activate Enterprise Elite',
    features: [
      { icon: '🚀', title: 'Elite Intelligence', description: 'Autonomous neural marketing orchestration.' },
      { icon: '♾️', title: 'Elastic Scale', description: 'Infinite scalability across all global regions.' },
      { icon: '🛡️', title: 'System Hardening', description: 'Absolute synchronization across physical and digital domains.' }
    ],
    template: 'default'
  });

  const [isPreview, setIsPreview] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsPreview(true);
    }, 1500);
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...config.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setConfig({ ...config, features: newFeatures });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-zinc-950/50 p-6 rounded-[32px] border border-zinc-900 border-t-4 border-t-emerald-500/20 shadow-2xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Elite Page Architect V8</h2>
          <p className="text-zinc-500 text-sm">Enterprise-level landing matrix for high-performance deployments.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsPreview(!isPreview)}
             className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${isPreview ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
           >
             {isPreview ? <Settings size={14} /> : <Eye size={14} />}
             {isPreview ? 'Edit Architect' : 'Preview Live'}
           </button>
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="px-6 py-2 bg-white text-black rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
           >
             {isGenerating ? <RefreshCcw size={14} className="animate-spin" /> : <Rocket size={14} />}
             {isGenerating ? 'Compiling...' : 'Generate Node'}
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isPreview ? (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Form Side */}
            <div className="space-y-6">
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px] space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-4">Global Meta Data</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">Page Title</label>
                    <input 
                      type="text" 
                      value={config.title}
                      onChange={(e) => setConfig({...config, title: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">Meta Description</label>
                    <textarea 
                      value={config.description}
                      onChange={(e) => setConfig({...config, description: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none h-24 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px] space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-4">Hero Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">Headliner</label>
                    <input 
                      type="text" 
                      value={config.heroTitle}
                      onChange={(e) => setConfig({...config, heroTitle: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">Sub-Headliner</label>
                    <input 
                      type="text" 
                      value={config.heroSubtitle}
                      onChange={(e) => setConfig({...config, heroSubtitle: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">CTA Button Label</label>
                    <input 
                      type="text" 
                      value={config.ctaText}
                      onChange={(e) => setConfig({...config, ctaText: e.target.value})}
                      className="w-full bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3 text-sm text-indigo-400 font-bold focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Side */}
            <div className="space-y-6">
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px] space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-800 pb-4">Feature Matrix</h3>
                <div className="space-y-6">
                  {config.features.map((feature, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl relative">
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                        <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                      </div>
                      <div className="flex gap-4">
                        <input 
                          value={feature.icon}
                          onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                          className="w-12 h-12 flex-shrink-0 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-xl text-center"
                        />
                        <div className="flex-1 space-y-2">
                           <input 
                              value={feature.title}
                              onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                              className="w-full bg-transparent text-sm font-bold border-b border-zinc-800 pb-1 focus:border-indigo-500 outline-none"
                           />
                           <input 
                              value={feature.description}
                              onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                              className="w-full bg-transparent text-[10px] text-zinc-500 focus:text-zinc-300 outline-none"
                           />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10 p-8 rounded-[32px] flex items-center justify-between">
                <div>
                   <h4 className="text-sm font-bold">Ready to Launch?</h4>
                   <p className="text-[10px] text-zinc-500 mt-1">SEO scores will be automatically updated.</p>
                </div>
                <button 
                  onClick={handleGenerate}
                  className="p-4 bg-white text-black rounded-2xl shadow-xl shadow-white/5 active:scale-95 transition-all"
                >
                  <Save size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Viewport Controls */}
            <div className="flex justify-center">
               <div className="bg-zinc-900 p-1 rounded-2xl flex gap-1 border border-zinc-800">
                  <button onClick={() => setViewport('desktop')} className={`p-3 rounded-xl transition-all ${viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}><Monitor size={18} /></button>
                  <button onClick={() => setViewport('tablet')} className={`p-3 rounded-xl transition-all ${viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}><Tablet size={18} /></button>
                  <button onClick={() => setViewport('mobile')} className={`p-3 rounded-xl transition-all ${viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}><Smartphone size={18} /></button>
               </div>
            </div>

            {/* Simulated Desktop Preview */}
            <div className="flex justify-center w-full px-4">
              <div 
                className={`bg-white text-zinc-950 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 border-[12px] border-zinc-900 ${
                  viewport === 'desktop' ? 'w-full max-w-5xl h-[600px]' : 
                  viewport === 'tablet' ? 'w-full max-w-xl h-[700px]' : 'w-full max-w-xs h-[600px]'
                }`}
              >
                <div className="h-full overflow-y-auto custom-scrollbar">
                   {/* Nav */}
                   <nav className="p-6 flex justify-between items-center border-b border-zinc-100">
                      <div className="text-xl font-black tracking-tighter bg-indigo-600 text-white px-3 py-1 rounded-lg">GX</div>
                      <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                         <span className="text-zinc-950">Features</span>
                         <span>Pricing</span>
                         <span>Contact</span>
                      </div>
                   </nav>

                   {/* Hero */}
                   <section className="px-10 py-20 text-center space-y-6 bg-gradient-to-b from-zinc-50 to-white">
                      <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900">{config.heroTitle}</h1>
                      <p className="text-lg text-zinc-500 max-w-2xl mx-auto">{config.heroSubtitle}</p>
                      <button className="px-10 py-4 bg-zinc-950 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all">
                        {config.ctaText}
                      </button>
                   </section>

                   {/* Features */}
                   <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                     {config.features.map((f, i) => (
                       <div key={i} className="space-y-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-indigo-100 transition-all">
                          <div className="text-3xl">{f.icon}</div>
                          <h4 className="font-bold text-zinc-900">{f.title}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
                       </div>
                     ))}
                   </section>

                   {/* Footer */}
                   <footer className="p-10 text-center border-t border-zinc-100">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">&copy; 2026 {config.title}. Protocol Active.</p>
                   </footer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
