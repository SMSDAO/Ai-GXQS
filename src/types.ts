/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Environment = 'local' | 'vercel' | 'vps' | 'gcloud';
export type AppView = 'pipeline' | 'passes' | 'lead-engine';

export interface DeploymentConfig {
  url: string;
  port: string;
  frontendPort?: string;
  oraclePort?: string;
  redisPort?: string;
  postgresPort?: string;
  autoRepair: boolean;
  projectId?: string;
}

export type DeploymentStepStatus = 'idle' | 'running' | 'completed' | 'failed';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface DeploymentState {
  currentEnvironment: Environment;
  isDeploying: boolean;
  logs: LogEntry[];
  config: DeploymentConfig;
  health: 'healthy' | 'unhealthy' | 'checking';
  scripts: {
    powershell: string;
    python: string;
  };
  verification: {
    status: 'unverified' | 'pending' | 'verified' | 'failed';
    githubRepo: string;
    commitSha: string;
  };
}

export interface NFTTier {
  id: number;
  name: string;
  price: string;
  durationDays: number;
  maxSupply: number;
  minted: number;
}

export interface NFTPass {
  tokenId: string;
  expiryTimestamp: number;
  tierId: number;
  isStaked: boolean;
  stakeRewards: number;
  isValid: boolean;
}

export interface PassState {
  ownedPasses: NFTPass[];
  isMinting: boolean;
  totalPoints: number;
  contractAddresses: {
    nft: string;
    oracle: string;
    treasury: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  source: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  type: 'chat' | 'lead_gen' | 'analysis' | 'system';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface LeadEngineState {
  leads: Lead[];
  activities: Activity[];
  chatHistory: ChatMessage[];
  isProcessing: boolean;
  metrics: {
    conversionRate: number;
    totalLeads: number;
    activeSessions: number;
    dynamicLearningScore: number;
  };
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'telegram' | 'discord';
  content: string;
  scheduledAt: string;
  status: 'scheduled' | 'posted' | 'failed';
  engagement?: {
    likes?: number;
    shares?: number;
    views?: number;
  };
}

export interface SocialPlatform {
  id: 'twitter' | 'telegram' | 'discord';
  name: string;
  connected: boolean;
  handle?: string;
  stats: {
    followers: number;
    posts: number;
    growth: number;
  };
}
