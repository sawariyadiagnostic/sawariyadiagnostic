import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: wss:; frame-ancestors 'none'; form-action 'self'");
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'sawariya-diagnostic-web' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (req, res, next) => {
      if (path.extname(req.path)) return next();
      return res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.use((_req, res) => {
    if (res.headersSent) return;
    res.status(404).json({ error: 'Not found' });
  });
  app.listen(PORT, '0.0.0.0', () => console.info(`Sawariya web server listening on port ${PORT}`));
}

startServer().catch((error) => {
  console.error('Server startup failed', error instanceof Error ? error.message : 'unknown error');
  process.exitCode = 1;
});
