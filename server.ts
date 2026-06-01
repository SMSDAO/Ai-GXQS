/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
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

  // 🌌 Start Python Autonomous V17 Backend on port 8001...
  console.log('[SYSTEM] Starting Python Autonomous V17 Backend on port 8001...');
  const pyBackend = spawn('python3', ['gxqs_autonomous_v17.py'], {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: '8001', PYTHONUNBUFFERED: '1' }
  });

  pyBackend.on('error', (err) => {
    console.error('[ERROR] Failed to start Python V17 backend:', err);
  });

  goBackend.on('error', (err) => {
    console.error('[ERROR] Failed to start Go backend:', err);
  });

  // 🛡️ Proxy API requests to Go and Python Backends
  // IMPORTANT: Proxies MUST be defined before body-parsers to avoid consuming streams
  
  // 🌌 Autonomous V17 Proxy
  app.use(createProxyMiddleware({
    target: 'http://127.0.0.1:8001',
    pathFilter: ['/api/v17', '/api/v15', '/api/v14', '/omega'],
    changeOrigin: true,
  }));

  // 🛡️ Generic Go Backend Proxy (excluding local routes)
  app.use('/api', (req, res, next) => {
    if (req.path === '/create-user') return next();
    return createProxyMiddleware({
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    })(req, res, next);
  });

  app.use('/health', createProxyMiddleware({
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
  }));

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
