import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Plus, 
  Code, 
  BarChart3, 
  FileText, 
  Zap,
  Send,
  Copy,
  Check,
  Brain,
  Sparkles,
  Command,
  Settings
} from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  description: string;
  usage_count: number;
}

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  likes: number;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIWorkers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [activeWorker, setActiveWorker] = useState<string>('worker_001');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchInitialData = async () => {
    try {
      const [workersRes, promptsRes] = await Promise.all([
        axios.get('/api/v17/workers'),
        axios.get('/api/v17/prompts')
      ]);
      setWorkers(Array.isArray(workersRes.data) ? workersRes.data : []);
      setPrompts(Array.isArray(promptsRes.data) ? promptsRes.data : []);
    } catch (err) {
      console.error('AI Workers fetch error:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/v17/generate', {
        worker_id: activeWorker,
        input: userMessage.content
      });

      const aiMessage: Message = {
        role: 'ai',
        content: res.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Workers Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Quantum Workers</h3>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Users size={16} />
            </div>
          </div>
          
          <div className="space-y-3">
            {workers.map(worker => (
              <button
                key={worker.id}
                onClick={() => setActiveWorker(worker.id)}
                className={`w-full p-4 rounded-xl text-left transition-all border ${
                  activeWorker === worker.id 
                    ? 'bg-indigo-600/10 border-indigo-500/50 text-white' 
                    : 'border-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  {worker.id === 'worker_001' && <Code size={16} />}
                  {worker.id === 'worker_002' && <BarChart3 size={16} />}
                  {worker.id === 'worker_003' && <Zap size={16} />}
                  {worker.id === 'worker_004' && <FileText size={16} />}
                  <span className="font-bold text-sm">{worker.name}</span>
                </div>
                <p className="text-[10px] opacity-60 leading-tight">{worker.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Smart Prompts</h3>
          <div className="space-y-4">
            {prompts.map(prompt => (
              <div key={prompt.id} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl hover:border-indigo-500/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{prompt.category}</span>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-bold">
                    <Sparkles size={10} />
                    {prompt.likes}
                  </div>
                </div>
                <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{prompt.title}</p>
              </div>
            ))}
            <button className="w-full p-4 border border-dashed border-zinc-800 rounded-xl text-zinc-600 hover:text-indigo-400 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2">
              <Plus size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Create Prompt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-9 flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Brain size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {workers.find(w => w.id === activeWorker)?.name || 'AI Assistant'}
              </h3>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quantum Engine Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-zinc-500 hover:text-white transition-all"><Command size={18} /></button>
            <button className="p-2 text-zinc-500 hover:text-white transition-all"><Settings size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50">
              <div className="p-6 bg-indigo-500/10 rounded-full text-indigo-400">
                <Sparkles size={48} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Initialize V17 Intelligence</h4>
                <p className="text-sm max-w-sm">Select a mesh worker node and provide a prompt to start generating autonomous assets.</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-zinc-800/50 border border-zinc-700 text-zinc-200 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold opacity-50">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.role === 'ai' && (
                      <button className="p-1 hover:text-indigo-400 transition-all"><Copy size={12} /></button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl rounded-tl-none flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-2">Quantum Processing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-950/30 border-t border-zinc-800">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Inject quantum parameters or task description..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 pr-16 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none h-24"
            />
            <button 
              onClick={handleSend}
              className="absolute bottom-4 right-4 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2">
            <span>Autonomous Elite V17.0.0</span>
            <div className="flex gap-4">
              <span>Self-Governing Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
