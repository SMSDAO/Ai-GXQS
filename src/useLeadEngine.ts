/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { LeadEngineState, Lead, Activity, ChatMessage } from './types.ts';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Aris Thorne', email: 'aris@nebula.io', score: 85, status: 'qualified', source: 'Direct', timestamp: '10 mins ago' },
  { id: '2', name: 'Luna Vance', email: 'luna@stellar.com', score: 92, status: 'new', source: 'Referral', timestamp: '2 hours ago' },
  { id: '3', name: 'Silas Kael', email: 'silas@void.tech', score: 64, status: 'contacted', source: 'Search', timestamp: '5 hours ago' },
];

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'system', message: 'Smart Lead Engine V3.0 initialized successfully.', timestamp: '14:20:05', status: 'success' },
  { id: '2', type: 'lead_gen', message: 'New high-intent lead detected from organic search.', timestamp: '14:25:22', status: 'info' },
  { id: '3', type: 'analysis', message: 'Dynamic learning algorithm updated lead scoring weights.', timestamp: '14:40:12', status: 'success' },
];

export function useLeadEngine() {
  const [state, setState] = useState<LeadEngineState>({
    leads: MOCK_LEADS,
    activities: MOCK_ACTIVITIES,
    chatHistory: [],
    isProcessing: false,
    metrics: {
      conversionRate: 0.124,
      totalLeads: 1284,
      activeSessions: 42,
      dynamicLearningScore: 98.2
    }
  });

  const addActivity = useCallback((message: string, type: Activity['type'], status: Activity['status'] = 'info') => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substring(7),
      type,
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      status
    };
    setState(prev => ({
      ...prev,
      activities: [newActivity, ...prev.activities].slice(0, 50)
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, userMsg],
      isProcessing: true
    }));

    try {
      // Proxy through server Gemini API
      const response = await fetch('/api/ai/analyze-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: content }) // Reusing the analyze-logs endpoint for now or create new
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.analysis || "I have analyzed your request across the Universal SDK Gateway. Action confirmed.",
        timestamp: new Date().toISOString()
      };

      setState(prev => ({
        ...prev,
        chatHistory: [...prev.chatHistory, assistantMsg],
        isProcessing: false
      }));

      addActivity(`Deep Chat processed request: "${content.substring(0, 30)}..."`, 'chat', 'success');

    } catch (error) {
      console.error('Chat error:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      addActivity('Failed to process deep chat request.', 'chat', 'error');
    }
  }, [addActivity]);

  // Simulate real-time leads
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const names = ['Jaxen', 'Nova', 'Cyrus', 'Elara', 'Kaelen'];
        const domains = ['@pulse.com', '@core.dev', '@apex.io'];
        const name = names[Math.floor(Math.random() * names.length)];
        const email = `${name.toLowerCase()}${domains[Math.floor(Math.random() * domains.length)]}`;
        
        const newLead: Lead = {
          id: Math.random().toString(36).substring(7),
          name: `${name} ${['Reyes', 'Storm', 'Vane', 'Ash'][Math.floor(Math.random() * 4)]}`,
          email,
          score: Math.floor(Math.random() * 40) + 60,
          status: 'new',
          source: ['Direct', 'Referral', 'Search'][Math.floor(Math.random() * 3)],
          timestamp: 'Just now'
        };

        setState(prev => ({
          ...prev,
          leads: [newLead, ...prev.leads].slice(0, 20),
          metrics: {
            ...prev.metrics,
            totalLeads: prev.metrics.totalLeads + 1
          }
        }));

        addActivity(`New inbound lead identified: ${newLead.name}`, 'lead_gen', 'info');
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [addActivity]);

  return {
    state,
    sendMessage
  };
}
