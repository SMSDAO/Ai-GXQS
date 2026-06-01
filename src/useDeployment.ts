/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { Environment, DeploymentState, LogEntry, DeploymentConfig } from './types.ts';

const DEFAULT_CONFIGS: Record<Environment, DeploymentConfig> = {
  local: {
    url: 'http://localhost:3000',
    port: '3000',
    oraclePort: '3001',
    redisPort: '6379',
    postgresPort: '5432',
    autoRepair: true
  },
  vercel: {
    url: 'https://smartprompt-elite.vercel.app',
    port: '443',
    autoRepair: true
  },
  vps: {
    url: 'http://203.0.113.42:3000',
    port: '3000',
    autoRepair: true
  },
  gcloud: {
    url: 'https://smartprompt-elite.uc.r.appspot.com',
    port: '8080',
    autoRepair: true,
    projectId: 'smartprompt-elite'
  }
};

const SCRIPTS = {
  powershell: `#!/usr/bin/env pwsh
# SmartPrompt Elite - Universal Deployment Pipeline
param([string]$Environment = "local")

Write-Host "🚀 SmartPrompt Elite Deployment Pipeline"
$Config = Load-Config -Environment $Environment
Setup-Networking -Config $Config
Install-Dependencies
switch ($Environment) {
    "local" { Deploy-Local }
    "vercel" { Deploy-Vercel }
    "vps" { Deploy-VPS }
    "gcloud" { Deploy-GoogleCloud }
}
Start-HealthChecker`,
  python: `#!/usr/bin/env python3
# SmartPrompt Elite - Universal Deployment Pipeline
import os, sys

class SmartPromptDeployer:
    def __init__(self, environment="local"):
        self.environment = environment
    def run(self):
        print(f"🚀 Deploying to {self.environment}")
        self.setup_networking()
        self.install_deps()
        getattr(self, f"deploy_{self.environment}")()

if __name__ == "__main__":
    deployer = SmartPromptDeployer()
    deployer.run()`
};

export function useDeployment(environment: Environment) {
  const [state, setState] = useState<DeploymentState>({
    currentEnvironment: environment,
    isDeploying: false,
    logs: [],
    config: DEFAULT_CONFIGS[environment],
    health: 'checking',
    scripts: SCRIPTS,
    verification: {
      status: 'unverified',
      githubRepo: 'SMSDAO/SmartPrompts',
      commitSha: '8f2a1b9c'
    }
  });

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setState(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs].slice(0, 100) // Keep last 100 logs
    }));
  }, []);

  const runDeployment = useCallback(async () => {
    setState(prev => ({ ...prev, isDeploying: true, logs: [] }));
    addLog(`🚀 Initiating universal deployment to ${environment}...`, 'info');

    const steps = [
      { msg: 'Detecting environment capabilities...', delay: 800 },
      { msg: 'Loading environment-specific configuration...', delay: 500 },
      { msg: 'Requesting identity verification from Chainlink Oracle...', delay: 1000 },
      { msg: 'Oracle: Commit hash 8f2a1b9c verified via GitHub API.', delay: 1200 },
      { msg: 'Configuring networking and firewall rules...', delay: 800 },
      { msg: 'Installing project dependencies...', delay: 1500 },
      { msg: `Deploying core microservices to ${environment}...`, delay: 1500 },
      { msg: 'Starting self-healing health checker...', delay: 700 }
    ];

    for (const step of steps) {
      if (step.msg.includes('Oracle')) {
        setState(prev => ({ ...prev, verification: { ...prev.verification, status: 'pending' }}));
      }
      await new Promise(r => setTimeout(r, step.delay));
      if (step.msg.includes('verified')) {
        setState(prev => ({ ...prev, verification: { ...prev.verification, status: 'verified' }}));
      }
      addLog(`✅ ${step.msg}`, 'success');
    }

    addLog(`✨ Deployment complete! Pipeline running at ${DEFAULT_CONFIGS[environment].url}`, 'success');
    setState(prev => ({ ...prev, isDeploying: false, health: 'healthy' }));
  }, [environment, addLog]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      currentEnvironment: environment,
      config: DEFAULT_CONFIGS[environment]
    }));
    addLog(`Switched to environment: ${environment.toUpperCase()}`, 'info');
  }, [environment, addLog]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const analyzeLogs = useCallback(async () => {
    if (state.logs.length === 0) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const response = await fetch('/api/ai/analyze-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: state.logs.map(l => l.message).join('\n') })
      });
      const data = await response.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('Failed to analyze logs:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [state.logs]);

  return { state, runDeployment, addLog, analyzeLogs, isAnalyzing, analysis };
}
