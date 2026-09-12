import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'sawariya-diagnostic-web' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { fallthrough: false }));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
  app.listen(PORT, '0.0.0.0', () => console.info(`Sawariya web server listening on port ${PORT}`));
}

startServer().catch((error) => {
  console.error('Server startup failed', error instanceof Error ? error.message : 'unknown error');
  process.exitCode = 1;
});
