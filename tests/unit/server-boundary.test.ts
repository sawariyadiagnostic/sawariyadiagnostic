import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const serverSource = readFileSync(resolve(process.cwd(), 'server.ts'), 'utf8');

describe('production server boundary', () => {
  it('leaves missing SPA paths available to the fallback and assets to the JSON 404 handler', () => {
    expect(serverSource).toContain('app.use(express.static(distPath));');
    expect(serverSource).not.toContain('fallthrough: false');
    expect(serverSource).toContain("app.get('/{*splat}'");
    expect(serverSource).toContain('path.extname(req.path)');
  });

  it('sets modern response security headers before serving the app', () => {
    expect(serverSource).toContain("res.setHeader('X-Content-Type-Options', 'nosniff')");
    expect(serverSource).toContain("res.setHeader('X-Frame-Options', 'DENY')");
    expect(serverSource).toContain("res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')");
    expect(serverSource).not.toContain('X-XSS-Protection');
    expect(serverSource).toContain("res.setHeader('Content-Security-Policy', ");
    expect(serverSource).toContain("res.setHeader('Strict-Transport-Security', ");
  });
});
