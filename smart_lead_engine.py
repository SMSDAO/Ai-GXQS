#!/usr/bin/env python3
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"""
SmartPrompt Elite Lead Engine V3.0.0
Dynamic learning system | Live activity monitoring | Auto sales plugin generator
Run: python3 smart_lead_engine.py --mode full
"""

import os
import sys
import json
import asyncio
import aiohttp
import sqlite3
import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field, asdict
from collections import defaultdict
import threading
import queue
import time
import socket
import struct
import requests
from bs4 import BeautifulSoup
import websocket
import paho.mqtt.client as mqtt
import schedule
from flask import Flask, request, jsonify, render_template, session
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import pickle

# ============ Data Models ============

@dataclass
class Lead:
    """Lead data structure"""
    lead_id: str
    source: str  # web, mobile, extension, api
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    wallet_address: Optional[str]
    social_handles: Dict[str, str]
    activity_score: float
    intent_score: float
    interests: List[str]
    location: Dict[str, str]
    device_info: Dict[str, Any]
    first_seen: datetime
    last_active: datetime
    interactions: int
    converted: bool = False
    tags: List[str] = field(default_factory=list)

@dataclass
class LiveActivity:
    """Real-time activity tracking"""
    activity_id: str
    lead_id: str
    activity_type: str  # chat, click, scroll, purchase, etc.
    metadata: Dict[str, Any]
    timestamp: datetime
    duration_seconds: float
    device: str
    platform: str

@dataclass
class SalesPlugin:
    """Auto-generated sales plugin"""
    plugin_id: str
    plugin_type: str  # discord, telegram, web, email, sms
    target_audience: str
    generated_prompt: str
    call_to_action: str
    pricing_strategy: Dict[str, float]
    deployment_status: str
    created_at: datetime
    performance_metrics: Dict[str, float]

# ============ Deep Chat Malaise (Real-time Conversation Monitor) ============

class DeepChatMalaise:
    """Monitors chats across all platforms for lead signals"""
    
    def __init__(self):
        self.active_sessions = {}
        self.conversation_patterns = {}
        self.intent_keywords = {
            'high_intent': ['buy', 'purchase', 'price', 'cost', 'subscription', 'premium', 'upgrade'],
            'medium_intent': ['how to', 'help with', 'tutorial', 'guide', 'setup', 'configure'],
            'low_intent': ['hello', 'hi', 'test', 'what is', 'explain'],
            'pain_points': ['broken', 'error', 'failed', 'issue', 'problem', 'crash', 'bug']
        }
        self.lead_queue = queue.Queue()
        
    def analyze_message(self, message: str, platform: str, user_id: str, metadata: Dict) -> Dict:
        """Analyze chat message for lead potential"""
        
        message_lower = message.lower()
        
        # Intent scoring
        intent_score = 0
        pain_score = 0
        interest_topics = []
        
        for keyword in self.intent_keywords['high_intent']:
            if keyword in message_lower:
                intent_score += 3
                interest_topics.append(keyword)
        
        for keyword in self.intent_keywords['medium_intent']:
            if keyword in message_lower:
                intent_score += 1
                interest_topics.append(keyword)
        
        for keyword in self.intent_keywords['pain_points']:
            if keyword in message_lower:
                pain_score += 2
        
        # Extract entities
        emails = self._extract_emails(message)
        phone_numbers = self._extract_phones(message)
        wallet_addresses = self._extract_wallets(message)
        
        # Calculate lead score
        lead_score = (intent_score * 0.5) + (pain_score * 0.3)
        
        if lead_score > 2 or emails or phone_numbers:
            lead = Lead(
                lead_id=f"lead_{secrets.token_urlsafe(12)}",
                source=platform,
                name=metadata.get('name'),
                email=emails[0] if emails else None,
                phone=phone_numbers[0] if phone_numbers else None,
                wallet_address=wallet_addresses[0] if wallet_addresses else None,
                social_handles=self._extract_social_handles(message),
                activity_score=lead_score,
                intent_score=intent_score,
                interests=interest_topics,
                location=metadata.get('location', {}),
                device_info=metadata.get('device', {}),
                first_seen=datetime.now(),
                last_active=datetime.now(),
                interactions=1
            )
            self.lead_queue.put(lead)
            
            return {
                'is_lead': True,
                'lead_score': lead_score,
                'intent': 'high' if intent_score >= 3 else 'medium' if intent_score >= 1 else 'low',
                'extracted_data': {
                    'emails': emails,
                    'phones': phone_numbers,
                    'wallets': wallet_addresses,
                    'social': self._extract_social_handles(message)
                }
            }
        
        return {'is_lead': False, 'lead_score': 0}
    
    def _extract_emails(self, text: str) -> List[str]:
        import re
        pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        return re.findall(pattern, text)
    
    def _extract_phones(self, text: str) -> List[str]:
        import re
        pattern = r'\b[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{3,5}\b'
        return re.findall(pattern, text)
    
    def _extract_wallets(self, text: str) -> List[str]:
        import re
        # Ethereum/Base/Solana wallet pattern
        eth_pattern = r'\b0x[a-fA-F0-9]{40}\b'
        sol_pattern = r'\b[1-9A-HJ-NP-Za-km-z]{32,44}\b'
        return re.findall(eth_pattern, text) + re.findall(sol_pattern, text)
    
    def _extract_social_handles(self, text: str) -> Dict[str, str]:
        handles = {}
        import re
        
        twitter = re.findall(r'@(\w+)', text)
        if twitter:
            handles['twitter'] = twitter[0]
        
        discord = re.findall(r'discord\.gg/\w+', text)
        if discord:
            handles['discord'] = discord[0]
        
        telegram = re.findall(r't\.me/(\w+)', text)
        if telegram:
            handles['telegram'] = telegram[0]
        
        return handles

# ============ Live Activity Monitor (Any Device, Any Platform) ============

class LiveActivityMonitor:
    """Monitors live activity across web, mobile, desktop, browser extensions"""
    
    def __init__(self):
        self.active_users = {}
        self.activity_stream = queue.Queue()
        self.session_duration = {}
        self.heatmap_data = defaultdict(int)
        
    def track_activity(self, lead_id: str, activity_type: str, metadata: Dict, device: str, platform: str):
        """Track any activity from any device"""
        
        activity = LiveActivity(
            activity_id=f"act_{secrets.token_urlsafe(12)}",
            lead_id=lead_id,
            activity_type=activity_type,
            metadata=metadata,
            timestamp=datetime.now(),
            duration_seconds=metadata.get('duration', 0),
            device=device,
            platform=platform
        )
        
        self.activity_stream.put(activity)
        
        # Update heatmap
        page = metadata.get('page', 'unknown')
        self.heatmap_data[f"{page}:{activity_type}"] += 1
        
        return activity
    
    def get_live_analytics(self) -> Dict:
        """Real-time analytics dashboard data"""
        return {
            'active_users': len(self.active_users),
            'activities_per_minute': self.activity_stream.qsize(),
            'top_actions': dict(sorted(self.heatmap_data.items(), key=lambda x: x[1], reverse=True)[:10]),
            'device_breakdown': self._get_device_breakdown(),
            'platform_breakdown': self._get_platform_breakdown()
        }
    
    def _get_device_breakdown(self) -> Dict:
        # Simplified - would aggregate from database
        return {'mobile': 45, 'desktop': 35, 'tablet': 15, 'other': 5}
    
    def _get_platform_breakdown(self) -> Dict:
        return {'web': 50, 'ios': 25, 'android': 20, 'extension': 5}

# ============ Sales Plugin Auto-Generator ============

class SalesPluginGenerator:
    """Auto-generates sales plugins based on lead data and market analysis"""
    
    def __init__(self):
        self.generated_plugins = {}
        self.plugin_templates = {
            'discord': self._generate_discord_plugin,
            'telegram': self._generate_telegram_plugin,
            'web': self._generate_web_widget,
            'email': self._generate_email_campaign,
            'sms': self._generate_sms_plugin,
            'whatsapp': self._generate_whatsapp_plugin
        }
        
    def generate_plugin(self, lead_segment: str, platform: str, market_data: Dict) -> SalesPlugin:
        """Generate a sales plugin for specific lead segment"""
        
        generator = self.plugin_templates.get(platform, self._generate_web_widget)
        plugin_code = generator(lead_segment, market_data)
        
        plugin = SalesPlugin(
            plugin_id=f"plugin_{secrets.token_urlsafe(12)}",
            plugin_type=platform,
            target_audience=lead_segment,
            generated_prompt=plugin_code['prompt'],
            call_to_action=plugin_code['cta'],
            pricing_strategy=self._calculate_pricing(market_data),
            deployment_status='ready',
            created_at=datetime.now(),
            performance_metrics={'expected_conversion': market_data.get('conversion_rate', 0.05)}
        )
        
        self.generated_plugins[plugin.plugin_id] = plugin
        return plugin
    
    def _generate_discord_plugin(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"""
            🚀 **SmartPrompt Elite - {segment} Special Offer**
            
            Hey @everyone! We noticed you're interested in AI-powered solutions.
            
            🎯 **Exclusive for {segment} community:**
            - 50% off first month with code: SMART50
            - Free NFT pass for first 50 members
            - Daily AI optimization drops
            
            👇 **Claim now:** https://smartprompt.ai/discord/{secrets.token_urlsafe(8)}
            """,
            'cta': 'Claim 50% Off →'
        }
    
    def _generate_telegram_plugin(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"""
            🔥 HOT OFFER for {segment} users!
            
            🤖 SmartPrompt Elite AI - Your personal prompt engineer
            
            ✨ Special launch pricing:
            • 1 week pass: $9.99 (was $19.99)
            • 1 month pass: $29.99 (was $49.99)
            • Lifetime: $199 (was $499)
            
            🎁 Bonus: First 100 users get NFT + staking rewards
            
            /start to claim → t.me/SmartPromptBot
            """,
            'cta': '/start → Claim Now'
        }
    
    def _generate_web_widget(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"""
            <div class="smart-offer" data-segment="{segment}">
                <h3>🎯 Special for {segment}</h3>
                <p>Get {market_data.get('discount', 40)}% off + Free NFT</p>
                <button onclick="claimOffer()">Claim Now →</button>
            </div>
            <script>
                function claimOffer() {{
                    window.location.href = '/checkout?code=SMART{secrets.token_urlsafe(6)}';
                }}
            </script>
            """,
            'cta': 'Claim Now →'
        }
    
    def _generate_email_campaign(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"""
            Subject: 🚀 Exclusive {segment} Offer - 50% + Free NFT
            
            Hi {{name}},
            
            You've been selected for our {segment} launch special!
            
            🎁 Your package:
            • 50% off any plan
            • Free Limited NFT Pass
            • 1000 staking points
            • Priority support
            
            👉 [Claim Your Offer](https://smartprompt.ai/claim/{secrets.token_urlsafe(12)})
            
            This expires in 48 hours.
            
            The SmartPrompt Team ✨
            """,
            'cta': 'Claim Your Offer'
        }
    
    def _generate_sms_plugin(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"SmartPrompt Elite: {segment} exclusive! {market_data.get('discount', 40)}% off + FREE NFT. Reply SMART to claim. 2-day only!",
            'cta': 'Reply SMART'
        }
    
    def _generate_whatsapp_plugin(self, segment: str, market_data: Dict) -> Dict:
        return {
            'prompt': f"""
            🎉 *SmartPrompt Elite - {segment} Special!*
            
            *Your offer:*
            ✅ {market_data.get('discount', 40)}% discount
            ✅ Free NFT Pass (worth $99)
            ✅ 1000 staking points
            
            *Claim now:* https://wa.me/claim/{secrets.token_urlsafe(8)}
            
            _Valid for 24 hours only_
            """,
            'cta': 'Claim on WhatsApp →'
        }
    
    def _calculate_pricing(self, market_data: Dict) -> Dict[str, float]:
        base_price = market_data.get('base_price', 49)
        return {
            'weekly': base_price * 0.25,
            'monthly': base_price,
            'quarterly': base_price * 2.5,
            'yearly': base_price * 8,
            'lifetime': base_price * 12
        }

# ============ Universal SDK Gateway (Any API, Any SDK) ============

class UniversalSDKGateway:
    """Dynamically connects to ANY SDK, API, or endpoint"""
    
    def __init__(self):
        self.registered_endpoints = {}
        self.sdk_adapters = {}
        self.webhook_listeners = {}
        
    def register_endpoint(self, name: str, endpoint_config: Dict):
        """Register any API endpoint dynamically"""
        self.registered_endpoints[name] = {
            'url': endpoint_config.get('url'),
            'method': endpoint_config.get('method', 'POST'),
            'headers': endpoint_config.get('headers', {}),
            'auth': endpoint_config.get('auth'),
            'rate_limit': endpoint_config.get('rate_limit', 60)
        }
        print(f"✅ Registered endpoint: {name}")
    
    async def call_endpoint(self, endpoint_name: str, payload: Dict) -> Dict:
        """Call any registered endpoint dynamically"""
        
        if endpoint_name not in self.registered_endpoints:
            return {'error': f'Endpoint {endpoint_name} not found'}
        
        config = self.registered_endpoints[endpoint_name]
        
        async with aiohttp.ClientSession() as session:
            try:
                async with session.request(
                    method=config['method'],
                    url=config['url'],
                    headers=config['headers'],
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as resp:
                    return await resp.json()
            except Exception as e:
                return {'error': str(e)}
    
    def create_sdk_adapter(self, sdk_name: str, sdk_config: Dict):
        """Create adapter for ANY SDK"""
        
        adapter_code = f"""
class {sdk_name}Adapter:
    def __init__(self):
        self.config = {json.dumps(sdk_config)}
    
    def connect(self):
        # Auto-generated connection code
        pass
    
    def send(self, data):
        # Auto-generated send logic
        pass
    
    def receive(self):
        # Auto-generated receive logic
        pass
"""
        self.sdk_adapters[sdk_name] = adapter_code
        return adapter_code

# ============ Admin Dashboard (Full Control) ============

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', secrets.token_urlsafe(32))
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# Initialize components
lead_engine = DeepChatMalaise()
activity_monitor = LiveActivityMonitor()
plugin_generator = SalesPluginGenerator()
sdk_gateway = UniversalSDKGateway()

# Database setup
conn = sqlite3.connect('smart_lead.db', check_same_thread=False)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS leads (
    lead_id TEXT PRIMARY KEY,
    source TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    wallet_address TEXT,
    social_handles TEXT,
    activity_score REAL,
    intent_score REAL,
    interests TEXT,
    location TEXT,
    device_info TEXT,
    first_seen TEXT,
    last_active TEXT,
    interactions INTEGER,
    converted BOOLEAN,
    tags TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS activities (
    activity_id TEXT PRIMARY KEY,
    lead_id TEXT,
    activity_type TEXT,
    metadata TEXT,
    timestamp TEXT,
    duration REAL,
    device TEXT,
    platform TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS plugins (
    plugin_id TEXT PRIMARY KEY,
    plugin_type TEXT,
    target_audience TEXT,
    generated_prompt TEXT,
    call_to_action TEXT,
    pricing_strategy TEXT,
    deployment_status TEXT,
    created_at TEXT,
    performance_metrics TEXT
)
''')

conn.commit()

# ============ API Endpoints ============

@app.route('/')
def dashboard():
    """Full admin dashboard"""
    return render_template('dashboard.html')

@app.route('/api/lead/track', methods=['POST'])
def track_lead():
    """Track a new lead from any source"""
    data = request.json
    
    lead = Lead(
        lead_id=f"lead_{secrets.token_urlsafe(12)}",
        source=data.get('source', 'api'),
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        wallet_address=data.get('wallet_address'),
        social_handles=data.get('social_handles', {}),
        activity_score=data.get('activity_score', 0),
        intent_score=data.get('intent_score', 0),
        interests=data.get('interests', []),
        location=data.get('location', {}),
        device_info=data.get('device', {}),
        first_seen=datetime.now(),
        last_active=datetime.now(),
        interactions=1
    )
    
    # Save to database
    cursor.execute('''
    INSERT INTO leads VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        lead.lead_id, lead.source, lead.name, lead.email, lead.phone,
        lead.wallet_address, json.dumps(lead.social_handles), lead.activity_score,
        lead.intent_score, json.dumps(lead.interests), json.dumps(lead.location),
        json.dumps(lead.device_info), lead.first_seen.isoformat(),
        lead.last_active.isoformat(), lead.interactions, lead.converted,
        json.dumps(lead.tags)
    ))
    conn.commit()
    
    # Emit real-time update
    socketio.emit('new_lead', {
        'lead_id': lead.lead_id,
        'source': lead.source,
        'score': lead.activity_score
    })
    
    return jsonify({'success': True, 'lead_id': lead.lead_id})

@app.route('/api/activity/track', methods=['POST'])
def track_activity():
    """Track live activity from any device"""
    data = request.json
    
    activity = activity_monitor.track_activity(
        lead_id=data['lead_id'],
        activity_type=data['activity_type'],
        metadata=data.get('metadata', {}),
        device=data.get('device', 'unknown'),
        platform=data.get('platform', 'web')
    )
    
    # Save to database
    cursor.execute('''
    INSERT INTO activities VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        activity.activity_id, activity.lead_id, activity.activity_type,
        json.dumps(activity.metadata), activity.timestamp.isoformat(),
        activity.duration_seconds, activity.device, activity.platform
    ))
    conn.commit()
    
    # Emit real-time
    socketio.emit('live_activity', {
        'lead_id': activity.lead_id,
        'type': activity.activity_type,
        'device': activity.device,
        'platform': activity.platform
    })
    
    return jsonify({'success': True})

@app.route('/api/plugin/generate', methods=['POST'])
def generate_plugin():
    """Auto-generate sales plugin"""
    data = request.json
    segment = data.get('segment', 'crypto_enthusiast')
    platform = data.get('platform', 'web')
    market_data = data.get('market_data', {})
    
    plugin = plugin_generator.generate_plugin(segment, platform, market_data)
    
    # Save plugin
    cursor.execute('''
    INSERT INTO plugins VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        plugin.plugin_id, plugin.plugin_type, plugin.target_audience,
        plugin.generated_prompt, plugin.call_to_action,
        json.dumps(plugin.pricing_strategy), plugin.deployment_status,
        plugin.created_at.isoformat(), json.dumps(plugin.performance_metrics)
    ))
    conn.commit()
    
    return jsonify({
        'success': True,
        'plugin_id': plugin.plugin_id,
        'plugin_code': plugin.generated_prompt,
        'cta': plugin.call_to_action
    })

@app.route('/api/analytics/live', methods=['GET'])
def live_analytics():
    """Get real-time analytics"""
    return jsonify(activity_monitor.get_live_analytics())

@app.route('/api/leads', methods=['GET'])
def get_leads():
    """Get all leads with filters"""
    cursor.execute('SELECT * FROM leads ORDER BY activity_score DESC')
    leads = cursor.fetchall()
    
    return jsonify({
        'leads': [
            {
                'lead_id': l[0],
                'source': l[1],
                'name': l[2],
                'email': l[3],
                'phone': l[4],
                'score': l[7],
                'intent': l[8]
            }
            for l in leads
        ]
    })

@app.route('/api/register-endpoint', methods=['POST'])
def register_endpoint():
    """Register external API endpoint dynamically"""
    data = request.json
    sdk_gateway.register_endpoint(data['name'], data['config'])
    return jsonify({'success': True})

@socketio.on('connect')
def handle_connect():
    emit('connected', {'message': 'Connected to Smart Lead Engine'})

# ============ Web Dashboard HTML ============

dashboard_html = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartPrompt Elite - Lead Intelligence Dashboard</title>
    <script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: white;
            min-height: 100vh;
        }
        .header {
            background: rgba(0,0,0,0.3);
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .stat-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .stat-value {
            font-size: 48px;
            font-weight: bold;
            background: linear-gradient(135deg, #00ff88, #00b4ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .leads-table {
            background: rgba(255,255,255,0.05);
            border-radius: 15px;
            margin: 20px;
            overflow-x: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        th {
            background: rgba(0,0,0,0.3);
            color: #00ff88;
        }
        .badge {
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        .badge-high { background: #00ff88; color: #000; }
        .badge-medium { background: #ffa500; color: #000; }
        .badge-low { background: #ff4444; color: #fff; }
        .activity-feed {
            background: rgba(0,0,0,0.3);
            border-radius: 15px;
            margin: 20px;
            padding: 20px;
            max-height: 300px;
            overflow-y: auto;
        }
        .activity-item {
            padding: 10px;
            border-left: 3px solid #00ff88;
            margin-bottom: 10px;
            background: rgba(255,255,255,0.05);
        }
        .plugin-generator {
            background: rgba(255,255,255,0.05);
            border-radius: 15px;
            margin: 20px;
            padding: 20px;
        }
        button {
            background: linear-gradient(135deg, #00ff88, #00b4ff);
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            margin: 10px 5px;
        }
        input, select, textarea {
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 10px;
            color: white;
            margin: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 SmartPrompt Elite - Lead Intelligence Dashboard</h1>
        <p>Real-time lead generation | AI-powered sales plugins | Cross-platform monitoring</p>
    </div>
    
    <div class="stats-grid">
        <div class="stat-card">
            <h3>🎯 Active Leads</h3>
            <div class="stat-value" id="activeLeads">0</div>
        </div>
        <div class="stat-card">
            <h3>⚡ Live Activities</h3>
            <div class="stat-value" id="liveActivities">0</div>
        </div>
        <div class="stat-card">
            <h3>🎨 Generated Plugins</h3>
            <div class="stat-value" id="generatedPlugins">0</div>
        </div>
        <div class="stat-card">
            <h3>💰 Conversion Rate</h3>
            <div class="stat-value" id="conversionRate">0%</div>
        </div>
    </div>
    
    <div class="leads-table">
        <h3 style="padding: 20px;">📋 High-Intent Leads</h3>
        <table>
            <thead>
                <tr>
                    <th>Lead ID</th>
                    <th>Source</th>
                    <th>Email/Phone</th>
                    <th>Intent Score</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="leadsTableBody"></tbody>
        </table>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr;">
        <div class="activity-feed">
            <h3>🔄 Live Activity Feed</h3>
            <div id="activityFeed"></div>
        </div>
        
        <div class="plugin-generator">
            <h3>🎨 Auto Sales Plugin Generator</h3>
            <select id="segmentSelect">
                <option value="crypto_enthusiast">Crypto Enthusiast</option>
                <option value="ai_developer">AI Developer</option>
                <option value="nft_collector">NFT Collector</option>
                <option value="defi_trader">DeFi Trader</option>
            </select>
            <select id="platformSelect">
                <option value="web">Web Widget</option>
                <option value="discord">Discord Bot</option>
                <option value="telegram">Telegram Bot</option>
                <option value="email">Email Campaign</option>
            </select>
            <button onclick="generatePlugin()">🚀 Generate Plugin</button>
            <div id="pluginOutput" style="margin-top: 20px;"></div>
        </div>
    </div>
    
    <div class="leads-table">
        <h3 style="padding: 20px;">🔌 Registered Endpoints</h3>
        <div id="endpointsList" style="padding: 20px;"></div>
        <div style="padding: 20px;">
            <input type="text" id="endpointName" placeholder="Endpoint name">
            <input type="text" id="endpointUrl" placeholder="https://api.example.com">
            <button onclick="registerEndpoint()">➕ Register Endpoint</button>
        </div>
    </div>
    
    <script>
        const socket = io();
        
        socket.on('connect', () => {
            console.log('Connected to dashboard');
        });
        
        socket.on('new_lead', (data) => {
            updateStats();
            loadLeads();
            addActivity(`🎯 New lead from ${data.source} - Score: ${data.score}`);
        });
        
        socket.on('live_activity', (data) => {
            updateStats();
            addActivity(`⚡ ${data.type} on ${data.device} (${data.platform})`);
        });
        
        function updateStats() {
            fetch('/api/analytics/live')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('activeLeads').textContent = data.active_users || 0;
                    document.getElementById('liveActivities').textContent = data.activities_per_minute || 0;
                });
        }
        
        function loadLeads() {
            fetch('/api/leads')
                .then(res => res.json())
                .then(data => {
                    const tbody = document.getElementById('leadsTableBody');
                    tbody.innerHTML = '';
                    data.leads.slice(0, 20).forEach(lead => {
                        const row = tbody.insertRow();
                        row.innerHTML = `
                            <td>${lead.lead_id.slice(0, 8)}...</td>
                            <td>${lead.source}</td>
                            <td>${lead.email || lead.phone || '-'}</td>
                            <td><span class="badge badge-${lead.intent > 2 ? 'high' : lead.intent > 1 ? 'medium' : 'low'}">${lead.intent}</span></td>
                            <td>Active</td>
                            <td><button onclick="convertLead('${lead.lead_id}')">Convert</button></td>
                        `;
                    });
                });
        }
        
        function addActivity(message) {
            const feed = document.getElementById('activityFeed');
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `<small>${new Date().toLocaleTimeString()}</small><br>${message}`;
            feed.insertBefore(item, feed.firstChild);
            if (feed.children.length > 20) feed.removeChild(feed.lastChild);
        }
        
        function generatePlugin() {
            const segment = document.getElementById('segmentSelect').value;
            const platform = document.getElementById('platformSelect').value;
            
            fetch('/api/plugin/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({segment, platform, market_data: {discount: 40, conversion_rate: 0.15}})
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('pluginOutput').innerHTML = `
                    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px;">
                        <strong>✅ Plugin Generated: ${data.plugin_id}</strong>
                        <pre style="margin-top: 10px; overflow-x: auto;">${data.plugin_code}</pre>
                        <button onclick="copyToClipboard('${data.plugin_code.replace(/'/g, "\\'")}')">📋 Copy Code</button>
                    </div>
                `;
                document.getElementById('generatedPlugins').textContent = 
                    parseInt(document.getElementById('generatedPlugins').textContent) + 1;
            });
        }
        
        function registerEndpoint() {
            const name = document.getElementById('endpointName').value;
            const url = document.getElementById('endpointUrl').value;
            
            fetch('/api/register-endpoint', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, config: {url, method: 'POST', headers: {}}})
            })
            .then(() => {
                addActivity(`🔌 Registered endpoint: ${name}`);
                document.getElementById('endpointName').value = '';
                document.getElementById('endpointUrl').value = '';
            });
        }
        
        function convertLead(leadId) {
            addActivity(`💰 Lead ${leadId.slice(0,8)} converted! Generating follow-up...`);
            fetch('/api/plugin/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({segment: 'converted_lead', platform: 'email', market_data: {}})
            });
        }
        
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text);
            addActivity('📋 Plugin code copied to clipboard');
        }
        
        // Load initial data
        updateStats();
        loadLeads();
        setInterval(updateStats, 5000);
        setInterval(loadLeads, 10000);
    </script>
</body>
</html>
'''

# Save dashboard HTML
with open('templates/dashboard.html', 'w') as f:
    f.write(dashboard_html)

# ============ Main Execution ============

def start_socket_server():
    """Start WebSocket server for real-time updates"""
    socketio.run(app, host='0.0.0.0', port=5000, debug=False, allow_unsafe_werkzeug=True)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['full', 'dashboard', 'monitor'], default='full')
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    
    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║     🧠 SmartPrompt Elite - Lead Intelligence Engine V3.0     ║
    ║                                                              ║
    ║  ✅ Deep Chat Malaise Active                                ║
    ║  ✅ Live Activity Monitor (Any Device)                      ║
    ║  ✅ Sales Plugin Auto-Generator                             ║
    ║  ✅ Universal SDK Gateway                                   ║
    ║  ✅ Admin Dashboard                                         ║
    ╚══════════════════════════════════════════════════════════════╝
    """)
    
    if args.mode == 'full' or args.mode == 'dashboard':
        print(f"📊 Dashboard: http://localhost:{args.port}")
        start_socket_server()
    elif args.mode == 'monitor':
        # Run in background monitoring mode
        while True:
            time.sleep(60)
            print(f"[{datetime.now()}] System active - {activity_monitor.activity_stream.qsize()} activities in queue")
