/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const io = new SocketServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });
  const PORT = 3000;

  // 🚀 Start Go Backend as a child process
  console.log('[SYSTEM] Starting Go Backend on port 8080...');
  const goBackend = spawn('go', ['run', 'backend/main.go'], {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: '8080' }
  });

  // (Python backends removed because pip is not available in the sandbox)


  goBackend.on('error', (err) => {
    console.error('[ERROR] Failed to start Go backend:', err);
  });

  // 🛡️ Proxy API requests to Go and Python Backends
  // IMPORTANT: Proxies MUST be defined before body-parsers to avoid consuming streams
  
  app.get('/v19-final-app', (req, res) => {
    const html = readFileSync(path.join(process.cwd(), 'public/final_dashboard.html'), 'utf8');
    res.send(html);
  });

  // 🛡️ Generic Go Backend Proxy (excluding local routes)
  app.use('/api', (req, res, next) => {
    if (req.path === '/create-user') return next();
    if (req.path.startsWith('/v17')) return next();
    if (req.path.startsWith('/v19')) return next();
    if (req.path.startsWith('/v19_audit')) return next();
    return createProxyMiddleware({
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    })(req, res, next);
  });

  app.use('/health', createProxyMiddleware({
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
  }));

  // 🌌 Mock APIs for Python backend dependencies (Parse JSON only for these specific local routes)
  app.use(express.json());
  
  app.get('/api/v17/registry/ledger', (req, res) => {
    res.json({ blocks: 1, transactions: [
      { tx_id: '1234567890abcdef', asset_type: 'genesis', asset_id: 'gen_1', timestamp: new Date().toISOString() }
    ] });
  });

  app.get('/api/v17/workers', (req, res) => {
    res.json([
      { id: 'worker_001', name: 'Alpha Coder', description: 'Expert in system code', usage_count: 50 },
      { id: 'worker_002', name: 'Beta Writer', description: 'Generates great content', usage_count: 30 }
    ]);
  });

  app.get('/api/v17/prompts', (req, res) => {
    res.json([
      { id: 'prompt_1', title: 'React Expert', content: 'You are an expert...', category: 'Code', likes: 12 }
    ]);
  });

  app.post('/api/v17/generate', (req, res) => {
    res.json({ response: `Processed by ${req.body.worker_id}: ${req.body.input}` });
  });

  app.post('/api/v17/plugins/generate', (req, res) => {
    const id = 'plg_' + Math.random().toString(36).substring(7);
    res.json({
      id: id,
      name: req.body.name || 'Anonymous',
      type: req.body.type || 'api'
    });
  });

  app.post('/api/v17/teleport/register', (req, res) => {
    res.json({
      id: 'ep_' + Math.random().toString(36).substring(7),
      name: req.body.name,
      url: req.body.url
    });
  });

  // Mock API for V19
  app.get('/api/v19/deployments', (req, res) => {
    res.json({ environment: 'production', status: 'stable', nodes: [] });
  });

  // Mock API for V19 Audit
  app.get('/api/v19_audit/logs', (req, res) => {
    res.json({ status: 'ok', logs: [] });
  });

  app.get('/api/v19_audit/status', (req, res) => {
    res.json({ status: 'active', modules: [] });
  });

  app.post('/api/v19_audit/verify', (req, res) => {
    res.json({ verified: true, score: 100 });
  });

  // 🛡️ Local Route Handlers (With specific body parsing)
  app.post('/api/create-user', express.json(), (req, res) => {
    try {
      const email = req.body?.email || 'gxqstudio@gmail.com';
      const role = req.body?.role || 'user';
      const userId = `id_${Math.random().toString(36).substring(2, 11)}`;
      const apiKey = `sk_${Math.random().toString(36).substring(2, 11)}`;
      
      console.log(`[AUTH] Generating identity for ${email} as ${role}`);
      
      res.json({
        user_id: userId,
        api_key: apiKey,
        message: "Autonomous Identity provisioned"
      });
    } catch (err) {
      console.error('[ERROR] Local Auth Failure:', err);
      res.status(500).json({ error: "Auth Protocol Failure" });
    }
  });

  // 🌌 Other specific proxies
  app.use('/python-admin', createProxyMiddleware({
    target: 'http://127.0.0.1:5000',
    changeOrigin: true,
    pathRewrite: { '^/python-admin': '/' }
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartPrompt Elite Gateway running at http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
