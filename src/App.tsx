/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate,
  useNavigate
} from 'react-router-dom';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Zap, 
  Shield, 
  Moon, 
  Sun, 
  Smartphone, 
  Monitor, 
  Home, 
  BarChart3, 
  Target, 
  Plus,
  Rocket,
  CreditCard,
  TrendingUp,
  Users,
  LogOut,
  Settings,
  Code,
  Cpu,
  Activity,
  Globe,
  LayoutGrid,
  Share2,
  Brain,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Infinity } from 'lucide-react';
import axios from 'axios';
import { useResponsive } from './hooks/useResponsive';
import { SEOOptimizer } from './frontend/seo_optimizer';
import { OmegaBlockchain as BlockchainElite } from './components/OmegaBlockchain';
import { OmegaAI as AIAnalyticsElite } from './components/OmegaAI';
import { OmegaMonitoring as SystemMonitoringElite } from './components/OmegaMonitoring';
import { OmegaMatrix as EliteMatrix } from './components/OmegaMatrix';
import { LandingPageGenerator } from './components/LandingPageGenerator';
import { SocialMarketing } from './components/SocialMarketing';
import { MarketAnalyticsV6 } from './components/MarketAnalyticsV6';
import { LeadIntelligence } from './components/LeadIntelligence';
import { AIWorkers } from './components/AIWorkers';
import { AutonomousEcosystem } from './components/AutonomousEcosystem';
import { CompleteCodex } from './components/CompleteCodex';
import { CompleteAudit } from './components/CompleteAudit';
import { NightProtocol } from './components/NightProtocol';

import { MegaPipeline } from './components/MegaPipeline';

type Role = 'super_admin' | 'admin' | 'dev' | 'user';
type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv' | 'watch';
type Theme = 'dark' | 'light' | 'oled';

interface AppUser {
  id: string;
  email: string;
  role: Role;
  apiKey: string;
}

interface Stats {
  leads: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
}

// ============ Contexts ============

const AuthContext = createContext<{
  user: AppUser | null;
  login: (email: string, role: string) => Promise<void>;
  logout: () => void;
}>(null!);

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {},
});

// ============ Components ============

const AdaptiveCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'neon' | 'minimal';
}> = ({ children, onClick, variant = 'default' }) => {
  const { device, scale } = useDeviceLogic();
  
  const variants = {
    default: 'bg-zinc-900/50 backdrop-blur-sm border border-zinc-800',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    neon: 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 ring-1 ring-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]',
    minimal: 'bg-transparent border border-zinc-800'
  };
  
  const padding = device === 'mobile' ? 'p-4' : 'p-6';
  
  return (
    <motion.div
      whileHover={{ scale: device === 'desktop' ? 1.02 : 1, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-3xl ${variants[variant]} ${padding} cursor-pointer transition-all duration-300 relative overflow-hidden`}
      onClick={onClick}
      style={{ transform: `scale(${device === 'tv' ? 1.2 : 1})` }}
    >
      {children}
    </motion.div>
  );
};

const AdaptiveGrid: React.FC<{
  children: React.ReactNode;
  cols?: { mobile: number; tablet: number; desktop: number };
}> = ({ children, cols = { mobile: 1, tablet: 2, desktop: 4 } }) => {
  const { device } = useDeviceLogic();
  
  const gridCols = device === 'mobile' ? cols.mobile : device === 'tablet' ? cols.tablet : cols.desktop;
  
  return (
    <div 
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
};

// ============ Pages ============

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  
  useEffect(() => {
    // Auto-fill gxqstudio@gmail.com for Genesis users
    if (!email) setEmail('gxqstudio@gmail.com');
    setRole('super_admin');
    
    const stored = localStorage.getItem('genesis_user');
    if (!stored) {
       console.log("Genesis Environment Detected - Ready for Initialize");
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cpu className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white leading-none">GXQS Complete Codex V19</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 opacity-80">Complete Edition V19.0.0</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2 block">Operator Identity</label>
              <input 
                type="email" 
                placeholder="identity@gxqs.v19"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2 block">Security Protocol</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-medium"
              >
                <option value="user">Ecosystem User</option>
                <option value="dev">Mesh Developer</option>
                <option value="admin">Board Admin</option>
                <option value="super_admin">Codex Overlord (V19)</option>
              </select>
            </div>
            
            <button 
              onClick={() => login(email || 'gxqstudio@gmail.com', email === 'gxqstudio@gmail.com' ? 'super_admin' : role)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              Initialize Codex V19
            </button>
            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">or genesis login</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => login('gxqstudio@gmail.com', 'super_admin')}
                className="flex items-center justify-center gap-2 p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl hover:bg-zinc-800 transition-all text-sm font-bold"
              >
                <Globe size={18} />
                Google
              </button>
              <button 
                onClick={() => login('gxqstudio@gmail.com', 'super_admin')}
                className="flex items-center justify-center gap-2 p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl hover:bg-zinc-800 transition-all text-sm font-bold"
              >
                <Code size={18} />
                GitHub
              </button>
            </div>
          </div>
          
          <p className="mt-12 text-center text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
            Protected by SmartBrain AI Encryption Layer • gxqstudio@gmail.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ============ Hooks ============

const useGestures = (onSwipe?: (dir: string) => void) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd({ x: 0, y: 0 });
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const onTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;
    
    if (Math.abs(xDistance) > Math.abs(yDistance) && Math.abs(xDistance) > minSwipeDistance) {
      onSwipe?.(xDistance > 0 ? 'left' : 'right');
    } else if (Math.abs(yDistance) > minSwipeDistance) {
      onSwipe?.(yDistance > 0 ? 'up' : 'down');
    }
  };
  
  return { onTouchStart, onTouchMove, onTouchEnd };
};

// ============ Device Detection & Scaling ============

const useDeviceLogic = (): { device: DeviceType; scale: number; fontScale: number } => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('watch') || width < 200) return 'watch';
      if (userAgent.includes('tv') || userAgent.includes('smart-tv')) return 'tv';
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };
    
    setDevice(detectDevice());
    const handleResize = () => setDevice(detectDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [scales, setScales] = useState({ scale: 1, fontScale: 1 });

  useEffect(() => {
    const deviceScales: Record<DeviceType, { scale: number; fontScale: number }> = {
      watch: { scale: 0.7, fontScale: 0.6 },
      mobile: { scale: 0.85, fontScale: 0.8 },
      tablet: { scale: 0.95, fontScale: 0.9 },
      desktop: { scale: 1, fontScale: 1 },
      tv: { scale: 1.5, fontScale: 1.3 }
    };
    setScales(deviceScales[device]);
  }, [device]);
  
  return { device, ...scales };
};

// ============ Main Dashboard ============

function UniversalDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { device, scale, fontScale } = useDeviceLogic();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [sidebarOpen, setSidebarOpen] = useState(device !== 'mobile');
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats>({
    leads: 1247,
    conversions: 342,
    revenue: 12850,
    conversionRate: 27.4
  });

  // Gesture support
  const gestures = useGestures((direction) => {
    if (direction === 'left') {
      if (activeTab === 'home') setActiveTab('stats');
      else if (activeTab === 'stats') setActiveTab('leads');
    }
    if (direction === 'right') {
      if (activeTab === 'leads') setActiveTab('stats');
      else if (activeTab === 'stats') setActiveTab('home');
    }
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const leadsRes = await axios.get('/api/leads', {
        headers: { 'X-API-Key': user?.apiKey }
      });
      setLeads(leadsRes.data.leads || []);
      
      // Update stats based on real data if available
      if (leadsRes.data.leads) {
        setStats(prev => ({
          ...prev,
          leads: leadsRes.data.leads.length
        }));
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const getGreeting = () => {
    if (user?.role === 'super_admin') return '🌌 COMPLETE CODEX GOD OVERLORD - V19.0.0';
    if (user?.role === 'admin') return 'Complete Codex Elite - V19.0.0';
    if (user?.role === 'dev') return 'Codex-Protocol Consciousness Active';
    return 'Complete Gateway Ready';
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white flex select-none" {...gestures}>
      {/* Sidebar - Desktop/Tablet */}
      {device !== 'mobile' && (
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 80 }}
          className="bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300"
        >
          <div className="p-6">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'} mb-12`}>
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Cpu size={20} className="text-white" />
              </div>
              {sidebarOpen && <span className="font-bold text-lg tracking-tight text-indigo-400">GXQS V19</span>}
            </div>
            
              <nav className="space-y-4">
                <NavItem icon={Rocket} label="Mega Pipeline" active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} collapsed={!sidebarOpen} />
                <NavItem icon={Home} label="Overview" active={activeTab === 'home'} onClick={() => setActiveTab('home')} collapsed={!sidebarOpen} />
                <NavItem icon={ShieldCheck} label="Complete Audit" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} collapsed={!sidebarOpen} />
                <NavItem icon={Sparkles} label="Complete Codex" active={activeTab === 'codex'} onClick={() => setActiveTab('codex')} collapsed={!sidebarOpen} />
                <NavItem icon={Zap} label="Autonomous" active={activeTab === 'autonomous'} onClick={() => setActiveTab('autonomous')} collapsed={!sidebarOpen} />
                <NavItem icon={Users} label="Mesh Workers" active={activeTab === 'workers'} onClick={() => setActiveTab('workers')} collapsed={!sidebarOpen} />
                <NavItem icon={LayoutGrid} label="Asset Matrix" active={activeTab === 'enterprise'} onClick={() => setActiveTab('enterprise')} collapsed={!sidebarOpen} />
                <NavItem icon={Globe} label="Teleport Mesh" active={activeTab === 'blockchain'} onClick={() => setActiveTab('blockchain')} collapsed={!sidebarOpen} />
                <NavItem icon={Brain} label="Intelligence" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} collapsed={!sidebarOpen} />
                <NavItem icon={BarChart3} label="Analytics" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} collapsed={!sidebarOpen} />
                <NavItem icon={Target} label="Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} collapsed={!sidebarOpen} />
                <NavItem icon={Activity} label="Monitoring" active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} collapsed={!sidebarOpen} />
                <NavItem icon={Rocket} label="Generator" active={activeTab === 'generator'} onClick={() => setActiveTab('generator')} collapsed={!sidebarOpen} />
                <NavItem icon={Share2} label="Social" active={activeTab === 'social'} onClick={() => setActiveTab('social')} collapsed={!sidebarOpen} />
                {(user?.role === 'admin' || user?.role === 'super_admin') && <NavItem icon={Shield} label="Security" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} collapsed={!sidebarOpen} />}
                <div className="pt-4 mt-4 border-t border-zinc-800">
                  <NavItem icon={Moon} label="Good Night" active={activeTab === 'night'} onClick={() => setActiveTab('night')} collapsed={!sidebarOpen} />
                </div>
              </nav>
          </div>
          
          <div className="mt-auto p-4 border-t border-zinc-900">
            <button 
              onClick={logout}
              className={`flex items-center gap-3 w-full p-4 rounded-2xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all ${!sidebarOpen && 'justify-center'}`}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="text-sm font-bold">Terminate Session</span>}
            </button>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 relative ${device !== 'mobile' ? (sidebarOpen ? 'ml-[260px]' : 'ml-[80px]') : 'pb-24'}`}
      >
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#050507]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-zinc-900">
          <div className="flex items-center gap-4">
             {device === 'mobile' && (
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Cpu size={20} className="text-white" />
              </div>
            )}
            <h2 className="text-lg font-bold tracking-tight hidden sm:inline">{getGreeting()}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {user?.role === 'super_admin' && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                AUTONOMOUS PROTOCOL ACTIVE
              </div>
            )}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                COMPLETE SYNC: V19
            </div>
            <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:border-zinc-700 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
               <User size={20} className="text-zinc-400" />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 min-h-[calc(100vh-80px)]">
          {activeTab === 'pipeline' ? (
            <div className="pt-10">
               <MegaPipeline />
            </div>
          ) : activeTab === 'night' ? (
            <div className="pt-10">
               <NightProtocol />
            </div>
          ) : activeTab === 'final' ? (
            <div className="h-[calc(100vh-140px)] w-full rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl relative mt-4">
              <iframe 
                src="/v19-final-app" 
                className="w-full h-full bg-[#0a0a0a]"
                title="Final V19 Dashboard"
              ></iframe>
              <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 pointer-events-none">
                Embedded Python V19 App
              </div>
            </div>
          ) : activeTab === 'audit' ? (
            <div className="pt-10">
               <CompleteAudit />
            </div>
          ) : activeTab === 'codex' ? (
            <div className="pt-10">
               <CompleteCodex />
            </div>
          ) : activeTab === 'autonomous' ? (
            <div className="pt-10">
               <AutonomousEcosystem />
            </div>
          ) : activeTab === 'workers' ? (
            <div className="pt-10">
              <AIWorkers />
            </div>
          ) : activeTab === 'seo' ? (
            <div className="pt-10">
              <SEOOptimizer />
            </div>
          ) : activeTab === 'generator' ? (
            <div className="pt-10">
              <LandingPageGenerator />
            </div>
          ) : activeTab === 'social' ? (
            <div className="pt-10">
              <SocialMarketing />
            </div>
          ) : activeTab === 'enterprise' ? (
            <div className="pt-10">
              <EliteMatrix />
            </div>
          ) : activeTab === 'blockchain' ? (
            <div className="pt-10">
              <BlockchainElite />
            </div>
          ) : activeTab === 'ai' ? (
            <div className="pt-10">
              <AIAnalyticsElite />
            </div>
          ) : activeTab === 'monitoring' ? (
            <div className="pt-10">
              <SystemMonitoringElite />
            </div>
          ) : activeTab === 'stats' ? (
            <div className="pt-10">
              <MarketAnalyticsV6 />
            </div>
          ) : activeTab === 'leads' ? (
            <div className="pt-10">
              <LeadIntelligence />
            </div>
          ) : (
            <>
              {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] mb-2">Autonomous IQ Protocol</h3>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-white to-indigo-500 bg-clip-text text-transparent">
                   Autonomous App Mesh
                </h1>
              </div>
              <div className="flex gap-3">
                 <button 
                   onClick={() => setActiveTab('autonomous')}
                   className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
                 >
                   <Plus size={16} />
                   New Node
                 </button>
                 <button 
                   onClick={() => setActiveTab('blockchain')}
                   className="px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex items-center gap-2"
                 >
                   <Target size={16} />
                   Teleport API
                 </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <AdaptiveGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
            <AdaptiveCard variant={user?.role === 'super_admin' ? "neon" : "glass"}>
              <div className="flex justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {user?.role === 'super_admin' ? 'Autonomous Synapse' : 'Mesh Integrity'}
                </p>
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400"><Cpu size={16} /></div>
              </div>
              <p className="text-3xl font-bold tabular-nums">
                {user?.role === 'super_admin' ? '99.9%' : '98.5%'}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                <span className="px-1.5 py-0.5 bg-indigo-500/20 rounded">↑ +2.1%</span>
                <span className="text-zinc-600">Sync: {user?.role === 'super_admin' ? 'V19' : 'STABLE'}</span>
              </div>
            </AdaptiveCard>

            <AdaptiveCard variant="neon">
              <div className="flex justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Conversions</p>
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><Target size={16} /></div>
              </div>
              <p className="text-3xl font-bold tabular-nums">{stats.conversions.toLocaleString()}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-rose-400">
                <span className="px-1.5 py-0.5 bg-rose-500/20 rounded">↑ +8.5%</span>
                <span className="text-zinc-600">vs last cycle</span>
              </div>
            </AdaptiveCard>

            <AdaptiveCard variant={user?.role === 'super_admin' ? "neon" : "glass"}>
              <div className="flex justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Gross Revenue</p>
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><CreditCard size={16} /></div>
              </div>
              <p className="text-3xl font-bold tabular-nums">
                {user?.role === 'super_admin' ? '∞' : `$${stats.revenue.toLocaleString()}`}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-400">
                <span className="px-1.5 py-0.5 bg-blue-500/20 rounded">↑ +21.9%</span>
                <span className="text-zinc-600">vs last cycle</span>
              </div>
            </AdaptiveCard>

            <AdaptiveCard variant="minimal">
              <div className="flex justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Success Index</p>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><TrendingUp size={16} /></div>
              </div>
              <p className="text-3xl font-bold tabular-nums">{stats.conversionRate}%</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                <span className="px-1.5 py-0.5 bg-emerald-500/20 rounded">↑ +3.2%</span>
                <span className="text-zinc-600">vs last cycle</span>
              </div>
            </AdaptiveCard>
          </AdaptiveGrid>

          {/* Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-zinc-900/40 border border-zinc-800 rounded-[32px] p-8 overflow-hidden">
                 <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold flex items-center gap-2"><Activity size={18} className="text-rose-400" /> Real-time Lead Stream</h3>
                   <div className="flex gap-2">
                     <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold">ALL</span>
                     <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-[10px] font-bold">HIGH SCORE</span>
                   </div>
                 </div>
                 
                 <div className="space-y-4">
                    {leads.length > 0 ? leads.slice(0, 5).map(lead => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-900 rounded-2xl hover:border-zinc-700 transition-all group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                               <Globe size={18} className="text-zinc-500" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white mb-0.5">{lead.source}</p>
                               <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{lead.intent} Intent</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <div className="hidden sm:flex flex-col items-end">
                               <p className="text-sm font-mono text-emerald-400">{(lead.score * 100).toFixed(0)}%</p>
                               <div className="w-16 h-1 bg-zinc-900 rounded-full mt-1 overflow-hidden">
                                  <div className="h-full bg-emerald-500" style={{ width: `${lead.score * 100}%` }}></div>
                               </div>
                            </div>
                            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                               Track
                            </span>
                         </div>
                      </div>
                    )) : (
                      <div className="text-center py-20 text-zinc-600 font-mono text-xs uppercase tracking-widest">
                        Initializing Lead Intelligence Capture...
                      </div>
                    )}
                 </div>
               </div>
            </div>

            <div className="space-y-6">
               <AdaptiveCard variant="glass">
                  <h3 className="font-bold flex items-center gap-2 mb-6"><Shield size={18} className="text-emerald-400" /> Reserve Status</h3>
                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-end mb-2">
                           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Vault</p>
                           <p className="text-xl font-bold">$1,285.42</p>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-indigo-500"></div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-900">
                           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Admin</p>
                           <p className="text-sm font-bold text-white">$424.18</p>
                        </div>
                        <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-900">
                           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Comm</p>
                           <p className="text-sm font-bold text-white">$437.04</p>
                        </div>
                     </div>
                     <button className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500/20 transition-all">
                        Execute Rebalance
                     </button>
                  </div>
               </AdaptiveCard>

               <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                  <Cpu className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
                  <h3 className="font-bold mb-2">Complete Codex V19</h3>
                  <p className="text-xs text-white/80 leading-relaxed mb-6">Unlock technical production boosters and fine-tuning AI studio for your ecosystem.</p>
                  <button className="px-6 py-3 bg-white text-indigo-600 font-bold text-xs rounded-xl shadow-xl hover:scale-105 transition-all">
                    Initialize Codex
                  </button>
               </div>
            </div>
          </div>
        </>
          )}
        </div>
      </main>

      {/* Bottom Nav - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#050507]/90 backdrop-blur-3xl border-t border-zinc-900 md:hidden z-40 flex items-center justify-around px-4">
        <NavIconButton icon={Home} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavIconButton icon={Users} active={activeTab === 'workers'} onClick={() => setActiveTab('workers')} />
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center -mt-10 shadow-xl shadow-indigo-500/30 border-4 border-[#050507] active:scale-95 transition-all">
          <Brain size={24} className="text-white" />
        </div>
        <NavIconButton icon={LayoutGrid} active={activeTab === 'enterprise'} onClick={() => setActiveTab('enterprise')} />
        <NavIconButton icon={Target} active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, collapsed }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all group ${active ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'}`}
    >
      <div className={`${active ? 'text-white' : 'group-hover:text-white'}`}>
        <Icon size={20} />
      </div>
      {!collapsed && <span className="text-sm font-bold">{label}</span>}
    </button>
  );
}

function NavIconButton({ icon: Icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all ${active ? 'bg-emerald-500/10 text-emerald-500' : 'text-zinc-500'}`}
    >
      <Icon size={24} />
      {active && <motion.div layoutId="navIndicator" className="w-1 h-1 bg-emerald-500 rounded-full mx-auto mt-1" />}
    </button>
  );
}

// ============ App Root ============

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  
  const login = async (email: string, role: string) => {
    try {
      const res = await axios.post('/api/create-user', { email, role });
      const newUser: AppUser = {
        id: res.data.user_id,
        email,
        role: role as any,
        apiKey: res.data.api_key
      };
      setUser(newUser);
      localStorage.setItem('genesis_user', JSON.stringify(newUser));
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('genesis_user');
  };

  const toggleTheme = () => {
    const next: Record<Theme, Theme> = { dark: 'light', light: 'oled', oled: 'dark' };
    setTheme(next[theme]);
  };

  useEffect(() => {
    const saved = localStorage.getItem('genesis_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div 
          className={`min-h-screen transition-colors duration-300 ${theme === 'oled' ? 'bg-black' : 'bg-[#050507]'}`}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
              <Route path="/dashboard" element={user ? <UniversalDashboard /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
