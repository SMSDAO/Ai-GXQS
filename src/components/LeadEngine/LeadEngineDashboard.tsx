/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Brain,
  Shield,
  ArrowRight,
  Rocket,
  ChevronRight
} from 'lucide-react';
import { LeadEngineState, Lead, Activity as ActivityType } from '../../types.ts';

interface MetricsBoardProps {
  metrics: LeadEngineState['metrics'];
}

export function MetricsBoard({ metrics }: MetricsBoardProps) {
  const cards = [
    { label: 'Conversion Rate', value: `${(metrics.conversionRate * 100).toFixed(1)}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Leads', value: metrics.totalLeads, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Sessions', value: metrics.activeSessions, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Learning Score', value: `${metrics.dynamicLearningScore}%`, icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4"
        >
          <div className={`${card.bg} p-3 rounded-xl`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface DeepChatProps {
  messages: LeadEngineState['chatHistory'];
  onSendMessage: (msg: string) => void;
  isProcessing: boolean;
}

export function DeepChat({ messages, onSendMessage, isProcessing }: DeepChatProps) {
  return (
    <div className="flex flex-col h-[500px] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <h3 className="font-bold text-slate-200 text-sm tracking-tight">Deep Chat Malaise V3</h3>
        </div>
        <div className="flex space-x-2">
          <div className="px-2 py-1 bg-slate-800 rounded-md text-[10px] font-bold text-slate-400 uppercase">AI Active</div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-8">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Universal SDK Interface</p>
              <p className="text-slate-500 text-sm italic">"Ready to analyze lead potential and system telemetry..."</p>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('msg') as HTMLInputElement;
            if (input.value.trim()) {
              onSendMessage(input.value);
              input.value = '';
            }
          }}
          className="relative"
        >
          <input
            name="msg"
            type="text"
            placeholder="Type your command..."
            autoComplete="off"
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
          >
            <Zap className="w-4 h-4 fill-current" />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ActivityMonitorProps {
  activities: ActivityType[];
}

export function ActivityMonitor({ activities }: ActivityMonitorProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-[500px] flex flex-col">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">Live Activity Monitor</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activities.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
              No activity recorded...
            </div>
          ) : (
            activities.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  act.status === 'success' ? 'bg-emerald-500' :
                  act.status === 'warning' ? 'bg-amber-500' :
                  act.status === 'error' ? 'bg-rose-500' : 'bg-indigo-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{act.message}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{act.timestamp}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface LeadListProps {
  leads: Lead[];
}

export function LeadList({ leads }: LeadListProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">Lead Gen Engine V3</h3>
        </div>
        <button className="text-[10px] font-bold text-indigo-600 uppercase border border-indigo-200 px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors">
          Export Data
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Name</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Score</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
              <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-slate-400 text-sm italic">
                  Engine warming up... Waiting for inbound leads.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                        {lead.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{lead.name}</p>
                        <p className="text-[10px] text-slate-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${lead.score}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      lead.status === 'qualified' ? 'bg-emerald-100 text-emerald-700' :
                      lead.status === 'contacted' ? 'bg-indigo-100 text-indigo-700' :
                      lead.status === 'new' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadEngineDashboard({ 
  state, 
  onSendMessage 
}: { 
  state: LeadEngineState; 
  onSendMessage: (msg: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 h-full scroll-smooth">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Smart Lead Engine <span className="text-indigo-600 font-extrabold">V3.0</span></h2>
            </div>
            <p className="text-slate-500 max-w-lg leading-relaxed flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Secure, real-time lead acceleration and system telemetry.</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Boost Engine</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-200">
              <span>Universal Deploy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <MetricsBoard metrics={state.metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chat & Monitor */}
          <div className="lg:col-span-8 space-y-8">
            <DeepChat 
              messages={state.chatHistory} 
              onSendMessage={onSendMessage} 
              isProcessing={state.isProcessing} 
            />
            <LeadList leads={state.leads} />
          </div>

          {/* Activity Sidebar */}
          <div className="lg:col-span-4">
            <ActivityMonitor activities={state.activities} />
          </div>
        </div>
      </div>
    </div>
  );
}
