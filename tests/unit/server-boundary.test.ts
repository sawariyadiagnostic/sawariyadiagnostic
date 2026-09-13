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
});
