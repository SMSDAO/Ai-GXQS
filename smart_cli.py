#!/usr/bin/env python3
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"""
SmartPrompt Elite CLI V2.0.0
Unified management for deployments, API keys, and teleportation.
"""

import os
import sys
import json
import subprocess
import argparse
import requests
import time
from pathlib import Path

class SmartCLI:
    def __init__(self):
        self.api_url = f"http://localhost:{os.getenv('API_PORT', 8080)}"
        self.admin_key = os.getenv('ADMIN_KEY', 'smart_admin_2026')

    def single_start(self):
        """Builds, deploys, and runs everything in one go."""
        print("🚀 [SMART-CLI] Starting Single-Start Sequence...")
        
        # 1. Run Universal Deployment Pipeline
        print("\n📦 Step 1: Running Universal Deployment Pipeline...")
        subprocess.run([sys.executable, "deploy-universal.py", "--brain-mode", "full"], check=True)
        
        # 2. Start Smart API Server in background
        print("\n📡 Step 2: Starting Smart API Server...")
        api_proc = subprocess.Popen(
            [sys.executable, "smart_api_v2.py", "--mode", "single-start", "--port", "8080"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        
        print("⏳ Waiting for API to initialize...")
        time.sleep(5)
        
        # 3. Check health
        try:
            resp = requests.get(f"{self.api_url}/api/v2/health", timeout=5)
            if resp.status_code == 200:
                print("✅ API Server is healthy and active.")
            else:
                print(f"⚠️ API Server health check returned status: {resp.status_code}")
        except Exception as e:
            print(f"❌ Failed to connect to API Server: {e}")

        print("\n🎉 Single-Start Sequence Complete!")
        print(f"📍 Frontend: http://localhost:3000")
        print(f"📍 API Server: {self.api_url}")

    def create_key(self, endpoints, ttl):
        """Create a new dynamic API key."""
        print(f"🔑 [SMART-CLI] Creating dynamic API key with TTL {ttl}h...")
        
        payload = {
            "endpoints": endpoints.split(",") if endpoints != "*" else ["*"],
            "ttl_hours": int(ttl)
        }
        
        try:
            resp = requests.post(f"{self.api_url}/api/v2/create-key", json=payload, timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                print("\n📋 NEW API KEY GENERATED:")
                print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                print(f"Key ID: {data['key_id']}")
                print(f"Key Value: {data['key_value']}")
                print(f"Expires: {data['expires_at']}")
                print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
            else:
                print(f"❌ Failed to create key: {resp.text}")
        except Exception as e:
            print(f"❌ Error connecting to API: {e}")
            print("💡 Tip: Make sure the API server is running (python3 smart_api_v2.py)")

    def teleport(self):
        """Test the teleport routing mechanism."""
        print("🌀 [SMART-CLI] Testing Teleport Routing...")
        
        try:
            resp = requests.get(f"{self.api_url}/api/v2/teleport/gateways", timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                print("\n🛰️  AVAILABLE TELEPORT GATEWAYS:")
                for gw, url in data['gateways'].items():
                    print(f"  - {gw.upper()}: {url}")
                
                print("\n📡 REGISTERED ENDPOINTS:")
                for category, urls in data['endpoints'].items():
                    print(f"  [{category.upper()}]")
                    for url in urls:
                        print(f"    - {url}")
            else:
                print(f"❌ Failed to fetch gateways: {resp.text}")
        except Exception as e:
            print(f"❌ Error connecting to API: {e}")

    def repair(self):
        """Triggers the AI self-healing repair mode."""
        print("🔧 [SMART-CLI] Triggering AI Self-Healing Repair...")
        subprocess.run([sys.executable, "deploy-universal.py", "--repair"], check=True)
        print("✅ Repair cycle complete.")

def main():
    parser = argparse.ArgumentParser(description="SmartPrompt Elite Management CLI")
    subparsers = parser.add_subparsers(dest="command", help="Commands")

    # single-start
    subparsers.add_parser("single-start", help="Bootstraps the entire ecosystem")

    # create-key
    key_parser = subparsers.add_parser("create-key", help="Creates a new dynamic API key")
    key_parser.add_argument("--endpoints", default="*", help="Comma-separated endpoints (default: *)")
    key_parser.add_argument("--ttl", type=int, default=24, help="Time to live in hours (default: 24)")

    # teleport
    subparsers.add_parser("teleport", help="Tests teleport gateways and routing")

    # repair
    subparsers.add_parser("repair", help="Runs the self-healing repair cycle")

    args = parser.parse_args()
    cli = SmartCLI()

    if args.command == "single-start":
        cli.single_start()
    elif args.command == "create-key":
        cli.create_key(args.endpoints, args.ttl)
    elif args.command == "teleport":
        cli.teleport()
    elif args.command == "repair":
        cli.repair()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
