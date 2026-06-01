import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitter, 
  Send, 
  MessageSquare, 
  Plus, 
  Calendar, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Share2,
  Trash2,
  Settings,
  RefreshCcw
} from 'lucide-react';
import { SocialPost, SocialPlatform } from '../types';

export const SocialMarketing: React.FC = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { id: 'twitter', name: 'Twitter / X', connected: true, handle: '@GXQS_Enterprise', stats: { followers: 12400, posts: 142, growth: 12.4 } },
    { id: 'telegram', name: 'Telegram', connected: true, handle: 'GXQS_Elite_Bot', stats: { followers: 5800, posts: 89, growth: 8.2 } },
    { id: 'discord', name: 'Discord', connected: false, stats: { followers: 0, posts: 0, growth: 0 } }
  ]);

  const [posts, setPosts] = useState<SocialPost[]>([
    { id: '1', platform: 'twitter', content: '🚀 GXQS Enterprise Elite V8.0.0 is live. Autonomous AI intelligence across all platforms has been achieved. #EnterpriseElite #V8 #Python', scheduledAt: '2026-06-02T09:00:00Z', status: 'scheduled' },
    { id: '2', platform: 'telegram', content: 'Elite Intelligence active across global platforms. Perfect marketing orchestration achieved. 🚀', scheduledAt: '2026-06-01T14:30:00Z', status: 'posted', engagement: { views: 1240, shares: 45 } }
  ]);

  const [newPost, setNewPost] = useState({ content: '', platform: 'twitter' as any });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setNewPost({ 
        ...newPost, 
        content: "📊 GXQS V8 Performance report: Neural sync now reaching optimal efficiency. Elite scale architecture synchronization achieved. #V8 #Enterprise" 
      });
      setIsGenerating(false);
    }, 1200);
  };

  const schedulePost = () => {
    if (!newPost.content) return;
    const post: SocialPost = {
      id: Math.random().toString(36).substr(2, 9),
      platform: newPost.platform,
      content: newPost.content,
      scheduledAt: new Date(Date.now() + 86400000).toISOString(),
      status: 'scheduled'
    };
    setPosts([post, ...posts]);
    setNewPost({ content: '', platform: 'twitter' });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-900 shadow-2xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter text-white">Elite Social Engine V8</h2>
          <p className="text-zinc-500 text-sm mt-1">Autonomous content orchestration & platform-targeted delivery.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Existence Sync: ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Platforms & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-4 px-2">Connected Platforms</h3>
            {platforms.map(platform => (
              <div key={platform.id} className="p-5 bg-zinc-950/50 border border-zinc-900 rounded-3xl flex justify-between items-center hover:border-zinc-700 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${platform.connected ? 'bg-indigo-500/10 text-indigo-400' : 'bg-zinc-900 text-zinc-600'} transition-colors`}>
                    {platform.id === 'twitter' ? <Twitter size={20} /> : platform.id === 'telegram' ? <Send size={20} /> : <MessageSquare size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{platform.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono">{platform.connected ? platform.handle : 'Disconnected'}</p>
                  </div>
                </div>
                {platform.connected ? (
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-400">+{platform.stats.growth}%</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">{platform.stats.followers.toLocaleString()} subs</p>
                  </div>
                ) : (
                  <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white px-3 py-1 bg-indigo-500/10 rounded-lg">Connect</button>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/10 p-8 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Aggregate Engagement</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold tracking-tighter">125.4K</span>
              <span className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1"><TrendingUp size={12} /> +23%</span>
            </div>
            <div className="flex gap-1 h-12 items-end">
              {[45, 67, 43, 89, 72, 95, 64, 78, 85, 45].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm group-hover:bg-indigo-500/40 transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle & Right: Post Creation & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Creator */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[40px] space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Autonomous Content Creator</h3>
              <div className="flex gap-2">
                 {['twitter', 'telegram', 'discord'].map(p => (
                   <button 
                     key={p}
                     onClick={() => setNewPost({...newPost, platform: p as any})}
                     className={`p-2 rounded-xl border transition-all ${newPost.platform === p ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:text-zinc-400'}`}
                   >
                     {p === 'twitter' ? <Twitter size={14} /> : p === 'telegram' ? <Send size={14} /> : <MessageSquare size={14} />}
                   </button>
                 ))}
              </div>
            </div>

            <div className="relative">
              <textarea 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Synchronize your message across the multi-platform node..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-32 focus:outline-none focus:border-indigo-500 transition-all text-sm leading-relaxed text-zinc-300 resize-none"
              />
              <button 
                onClick={generateAIContent}
                disabled={isGenerating}
                className="absolute right-4 bottom-4 p-2 bg-zinc-900 text-indigo-400 hover:text-indigo-300 hover:bg-zinc-800 rounded-xl transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-800"
              >
                {isGenerating ? <RefreshCcw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isGenerating ? 'Synthesizing...' : 'AI Enhance'}
              </button>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-2">
                 <Clock size={12} /> Auto-Publish Schedule: ON
              </div>
              <button 
                onClick={schedulePost}
                disabled={!newPost.content}
                className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar size={18} /> Schedule Deployment
              </button>
            </div>
          </div>

          {/* Post Stream */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-8 overflow-hidden">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 px-2">Deployment Stream</h3>
            <div className="space-y-4">
              <AnimatePresence>
                {posts.map(post => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-zinc-950/50 border border-zinc-900 rounded-[32px] hover:border-zinc-700 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-zinc-900 rounded-xl text-zinc-500">
                           {post.platform === 'twitter' ? <Twitter size={14} /> : post.platform === 'telegram' ? <Send size={14} /> : <MessageSquare size={14} />}
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] font-black uppercase text-zinc-500">{post.platform}</span>
                               <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                               <span className="text-[10px] font-bold text-zinc-600">{new Date(post.scheduledAt).toLocaleDateString()}</span>
                            </div>
                            <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${post.status === 'posted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                               {post.status === 'posted' ? <CheckCircle2 size={8} /> : <Clock size={8} />}
                               {post.status}
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-2 text-zinc-600 hover:text-white transition-colors"><Share2 size={14} /></button>
                         <button 
                           onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                           className="p-2 text-zinc-600 hover:text-rose-400 transition-colors"
                         >
                           <Trash2 size={14} />
                         </button>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{post.content}</p>
                    
                    {post.status === 'posted' && (
                      <div className="mt-4 pt-4 border-t border-zinc-900 flex gap-6">
                        <div className="flex items-center gap-2">
                           <BarChart3 size={14} className="text-zinc-600" />
                           <span className="text-[10px] font-bold text-zinc-400">{post.engagement?.views?.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Share2 size={14} className="text-zinc-600" />
                           <span className="text-[10px] font-bold text-zinc-400">{post.engagement?.shares?.toLocaleString()} shares</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-2xl font-bold tracking-tight">Enterprise Multi-Post API</h3>
          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
            Synchronize your marketing efforts across unlimited platforms. Our autonomous engine continuously tests content variations and optimizes for peak engagement windows.
          </p>
        </div>
        <button className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 relative z-10 whitespace-nowrap">
           <Settings size={20} /> Configure API Endpoints
        </button>
      </div>
    </div>
  );
};
