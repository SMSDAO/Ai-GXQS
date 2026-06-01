#!/usr/bin/env python3
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"""
SmartPrompt Elite AI API V2.0.0
Dynamic key rotation + Smart Teleport to any endpoint + Auto-healing
Run: python3 smart_api_v2.py --mode production
"""

import os
import sys
import json
import time
import hashlib
import secrets
import asyncio
import aiohttp
import threading
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from collections import deque
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2
import redis
import schedule
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import requests

# ============ Smart Key Vault ============

@dataclass
class DynamicKey:
    """Dynamic API key with auto-rotation"""
    key_id: str
    key_value: str
    created_at: datetime
    expires_at: datetime
    endpoints: List[str]
    usage_count: int = 0
    last_used: Optional[datetime] = None
    is_active: bool = True
    
class SmartKeyVault:
    """Manages API keys with dynamic rotation and teleportation"""
    
    def __init__(self):
        self.keys: Dict[str, DynamicKey] = {}
        self.rotation_history: deque = deque(maxlen=1000)
        self.encryption_key = self._generate_master_key()
        self.cipher = Fernet(self.encryption_key)
        self.redis_client = redis.Redis(
            host=os.getenv('REDIS_URL', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379)),
            decode_responses=True
        )
        
    def _generate_master_key(self) -> bytes:
        """Generate master encryption key from environment"""
        seed = os.getenv('MASTER_KEY_SEED', secrets.token_urlsafe(32))
        kdf = PBKDF2(
            algorithm=hashes.SHA256(),
            length=32,
            salt=b'smartprompt_elite_salt',
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(seed.encode()))
        return key
    
    def create_key(self, endpoints: List[str], ttl_hours: int = 24) -> DynamicKey:
        """Create new dynamic API key"""
        key_id = f"spk_{secrets.token_urlsafe(16)}"
        key_value = f"smart_{secrets.token_urlsafe(32)}"
        
        dynamic_key = DynamicKey(
            key_id=key_id,
            key_value=key_value,
            created_at=datetime.now(),
            expires_at=datetime.now() + timedelta(hours=ttl_hours),
            endpoints=endpoints
        )
        
        # Encrypt and store
        encrypted = self.cipher.encrypt(json.dumps({
            'key_id': key_id,
            'key_value': key_value,
            'endpoints': endpoints,
            'expires_at': dynamic_key.expires_at.isoformat()
        }).encode())
        
        self.keys[key_id] = dynamic_key
        self.redis_client.setex(f"key:{key_id}", ttl_hours * 3600, encrypted)
        
        print(f"🔑 Created key: {key_id[:8]}... for {len(endpoints)} endpoints")
        return dynamic_key
    
    def rotate_key(self, key_id: str) -> Optional[DynamicKey]:
        """Auto-rotate key before expiration"""
        if key_id not in self.keys:
            return None
            
        old_key = self.keys[key_id]
        new_key = self.create_key(old_key.endpoints, ttl_hours=24)
        
        # Archive old key
        self.rotation_history.append({
            'old_key_id': key_id,
            'new_key_id': new_key.key_id,
            'rotated_at': datetime.now().isoformat(),
            'reason': 'auto_rotation'
        })
        
        # Remove old key
        del self.keys[key_id]
        self.redis_client.delete(f"key:{key_id}")
        
        print(f"🔄 Rotated key: {key_id[:8]} → {new_key.key_id[:8]}")
        return new_key
    
    def validate_key(self, key_value: str, endpoint: str) -> bool:
        """Validate API key for specific endpoint"""
        for key_id, key_obj in self.keys.items():
            if key_obj.key_value == key_value:
                if not key_obj.is_active:
                    return False
                if datetime.now() > key_obj.expires_at:
                    return False
                if endpoint not in key_obj.endpoints:
                    return False
                
                # Update usage
                key_obj.usage_count += 1
                key_obj.last_used = datetime.now()
                
                # Auto-rotate if >80% used or near expiry
                usage_percent = key_obj.usage_count / 10000  # 10k limit
                time_left = (key_obj.expires_at - datetime.now()).total_seconds()
                
                if usage_percent > 0.8 or time_left < 3600:  # <1 hour left
                    threading.Thread(target=self.rotate_key, args=(key_id,)).start()
                
                return True
        return False
    
    def get_key_stats(self) -> Dict:
        """Get all key statistics"""
        return {
            'total_keys': len(self.keys),
            'active_keys': sum(1 for k in self.keys.values() if k.is_active),
            'total_rotations': len(self.rotation_history),
            'keys': [
                {
                    'key_id': k.key_id[:8],
                    'endpoints': k.endpoints,
                    'usage': k.usage_count,
                    'expires_in': (k.expires_at - datetime.now()).total_seconds() / 3600
                }
                for k in self.keys.values()
            ]
        }

# ============ Smart Teleport Router ============

class SmartTeleportRouter:
    """Routes requests to optimal endpoints with automatic failover"""
    
    def __init__(self):
        self.endpoints = {
            'openai': [
                'https://api.openai.com/v1/chat/completions',
                'https://api.openai.com/v1/completions',
                'https://api.openai.com/v1/embeddings'
            ],
            'anthropic': [
                'https://api.anthropic.com/v1/messages',
                'https://api.anthropic.com/v1/complete'
            ],
            'google': [
                'https://generativelanguage.googleapis.com/v1beta/models',
                'https://aiplatform.googleapis.com/v1/projects'
            ],
            'cohere': [
                'https://api.cohere.ai/v1/generate',
                'https://api.cohere.ai/v1/embed'
            ],
            'together': [
                'https://api.together.xyz/v1/chat/completions',
                'https://api.together.xyz/v1/completions'
            ],
            'replicate': [
                'https://api.replicate.com/v1/predictions',
                'https://api.replicate.com/v1/models'
            ],
            'local': [
                f"http://localhost:{os.getenv('LOCAL_PORT', 3000)}/api/ai",
                f"http://localhost:{os.getenv('LOCAL_PORT', 3000)}/api/oracle"
            ]
        }
        
        self.health_status = {}
        self.latency_cache = {}
        self.failover_chain = {}
        
        # Teleport destinations (cross-network)
        self.teleport_gateways = {
            'solana': 'https://api.mainnet-beta.solana.com',
            'base': 'https://mainnet.base.org',
            'ethereum': 'https://cloudflare-eth.com',
            'vercel': 'https://api.vercel.com',
            'github': 'https://api.github.com'
        }
        
    async def smart_route(self, request_type: str, payload: Dict, max_retries: int = 3) -> Dict:
        """Route request to best available endpoint with teleportation"""
        
        available_endpoints = self.endpoints.get(request_type, [])
        if not available_endpoints:
            # Teleport to gateway
            return await self.teleport_to_gateway(request_type, payload)
        
        # Score endpoints by health and latency
        scored = []
        for endpoint in available_endpoints:
            health = self.health_status.get(endpoint, 1.0)
            latency = self.latency_cache.get(endpoint, 1.0)
            score = health / latency if latency > 0 else 0
            scored.append((score, endpoint))
        
        scored.sort(reverse=True)
        
        for attempt in range(max_retries):
            for score, endpoint in scored[:3]:  # Try top 3
                try:
                    result = await self._call_endpoint(endpoint, payload)
                    self._update_health(endpoint, True)
                    return {
                        'success': True,
                        'data': result,
                        'endpoint': endpoint,
                        'teleport': False,
                        'latency': self.latency_cache.get(endpoint, 0)
                    }
                except Exception as e:
                    self._update_health(endpoint, False)
                    continue
            
            # If all fail, teleport
            return await self.teleport_to_gateway(request_type, payload)
        
        return {'success': False, 'error': 'All endpoints failed'}
    
    async def teleport_to_gateway(self, request_type: str, payload: Dict) -> Dict:
        """Teleport request to external gateway network"""
        
        gateway_map = {
            'ai': 'openai',
            'blockchain': 'solana',
            'deploy': 'vercel',
            'code': 'github'
        }
        
        gateway = gateway_map.get(request_type, 'solana')
        gateway_url = self.teleport_gateways.get(gateway)
        
        if not gateway_url:
            return {'success': False, 'error': 'No teleport gateway available'}
        
        print(f"🌀 Teleporting {request_type} → {gateway_url}")
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{gateway_url}/api/teleport",
                    json={
                        'original_request': request_type,
                        'payload': payload,
                        'teleport_id': secrets.token_urlsafe(16)
                    },
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as resp:
                    result = await resp.json()
                    return {
                        'success': True,
                        'data': result,
                        'teleport': True,
                        'gateway': gateway,
                        'endpoint': gateway_url
                    }
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    async def _call_endpoint(self, endpoint: str, payload: Dict) -> Dict:
        start = time.time()
        async with aiohttp.ClientSession() as session:
            async with session.post(endpoint, json=payload, timeout=10) as resp:
                latency = time.time() - start
                self.latency_cache[endpoint] = latency
                return await resp.json()
    
    def _update_health(self, endpoint: str, success: bool):
        current = self.health_status.get(endpoint, 1.0)
        if success:
            self.health_status[endpoint] = min(1.0, current + 0.1)
        else:
            self.health_status[endpoint] = max(0.0, current - 0.2)

# ============ Smart API Server ============

app = Flask(__name__)
CORS(app)

# Initialize components
key_vault = SmartKeyVault()
teleport_router = SmartTeleportRouter()

# Background key rotator
def background_key_rotation():
    """Auto-rotate keys in background without distortion"""
    while True:
        time.sleep(300)  # Every 5 minutes
        for key_id in list(key_vault.keys.keys()):
            key = key_vault.keys[key_id]
            time_left = (key.expires_at - datetime.now()).total_seconds()
            if time_left < 3600:  # Less than 1 hour
                key_vault.rotate_key(key_id)
                print(f"🔄 Background rotated: {key_id[:8]}")

# Start background rotator
threading.Thread(target=background_key_rotation, daemon=True).start()

# ============ API Endpoints ============

@app.route('/api/v2/create-key', methods=['POST'])
def create_api_key():
    """Create new dynamic API key"""
    data = request.json
    endpoints = data.get('endpoints', ['*'])
    ttl_hours = data.get('ttl_hours', 24)
    
    key = key_vault.create_key(endpoints, ttl_hours)
    
    return jsonify({
        'success': True,
        'key_id': key.key_id,
        'key_value': key.key_value,
        'expires_at': key.expires_at.isoformat(),
        'endpoints': key.endpoints
    })

@app.route('/api/v2/ai/completion', methods=['POST'])
async def ai_completion():
    """AI completion with auto-routing and teleport"""
    api_key = request.headers.get('X-API-Key')
    if not api_key or not key_vault.validate_key(api_key, '/api/v2/ai/completion'):
        return jsonify({'error': 'Invalid API key'}), 401
    
    payload = request.json
    provider = payload.get('provider', 'openai')
    
    result = await teleport_router.smart_route(provider, payload)
    return jsonify(result)

@app.route('/api/v2/blockchain/verify', methods=['POST'])
async def blockchain_verify():
    """Verify blockchain transactions with teleport"""
    api_key = request.headers.get('X-API-Key')
    if not api_key or not key_vault.validate_key(api_key, '/api/v2/blockchain/verify'):
        return jsonify({'error': 'Invalid API key'}), 401
    
    tx_hash = request.json.get('tx_hash')
    chain = request.json.get('chain', 'base')
    
    result = await teleport_router.smart_route('blockchain', {
        'tx_hash': tx_hash,
        'chain': chain
    })
    return jsonify(result)

@app.route('/api/v2/github/verify', methods=['POST'])
async def github_verify():
    """Verify GitHub commits with teleport"""
    api_key = request.headers.get('X-API-Key')
    if not api_key or not key_vault.validate_key(api_key, '/api/v2/github/verify'):
        return jsonify({'error': 'Invalid API key'}), 401
    
    repo = request.json.get('repo')
    commit = request.json.get('commit')
    
    result = await teleport_router.smart_route('code', {
        'repo': repo,
        'commit': commit
    })
    return jsonify(result)

@app.route('/api/v2/keys/stats', methods=['GET'])
def key_stats():
    """Get key statistics (admin only)"""
    admin_key = request.headers.get('X-Admin-Key')
    if admin_key != os.getenv('ADMIN_KEY', 'smart_admin_2026'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    return jsonify(key_vault.get_key_stats())

@app.route('/api/v2/teleport/gateways', methods=['GET'])
def list_gateways():
    """List available teleport gateways"""
    return jsonify({
        'gateways': teleport_router.teleport_gateways,
        'endpoints': teleport_router.endpoints
    })

@app.route('/api/v2/health', methods=['GET'])
def health_check():
    """Health check with smart brain status"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'active_keys': len(key_vault.keys),
        'teleport_active': True,
        'version': '2.0.0'
    })

# ============ CLI & Deployment ============

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['dev', 'production', 'single-start'], default='dev')
    parser.add_argument('--port', type=int, default=8080)
    parser.add_argument('--workers', type=int, default=4)
    args = parser.parse_args()
    
    print("🚀 SmartPrompt Elite AI API V2.0.0")
    print("═" * 50)
    print(f"📡 Mode: {args.mode}")
    print(f"🔌 Port: {args.port}")
    print(f"⚡ Workers: {args.workers}")
    print(f"🧠 Smart Teleport: ACTIVE")
    print(f"🔑 Dynamic Keys: READY")
    print("═" * 50)
    
    if args.mode == 'production':
        # Production with gunicorn
        from gunicorn.app.base import BaseApplication
        
        class StandaloneApplication(BaseApplication):
            def __init__(self, app, options=None):
                self.options = options or {}
                self.application = app
                super().__init__()
            
            def load_config(self):
                for key, value in self.options.items():
                    self.cfg.set(key, value)
            
            def load(self):
                return self.application
        
        options = {
            'bind': f'0.0.0.0:{args.port}',
            'workers': args.workers,
            'worker_class': 'aiohttp.worker.GunicornWebWorker',
            'timeout': 120,
            'keepalive': 5
        }
        
        StandaloneApplication(app, options).run()
    
    elif args.mode == 'single-start':
        # Single command start with auto-setup
        print("🔧 Running single-start setup...")
        
        # Auto-create initial keys
        initial_key = key_vault.create_key(['*'], ttl_hours=168)  # 7 days
        print(f"\n📋 INITIAL API KEY (save this):")
        print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"Key ID: {initial_key.key_id}")
        print(f"Key Value: {initial_key.key_value}")
        print(f"Expires: {initial_key.expires_at}")
        print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
        
        # Start server
        app.run(host='0.0.0.0', port=args.port, debug=False, threaded=True)
    
    else:
        # Development mode
        app.run(host='0.0.0.0', port=args.port, debug=True)
