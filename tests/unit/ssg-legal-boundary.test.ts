import { readFileSync } from 'node:fs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generate404Html, publicUrl } from '../../scripts/generate-ssg';
import { generateOgImage } from '../../scripts/generate-og-image';
import { filterApprovedLegalMetadata } from '../../scripts/legal-publication';
import { stagePagesArtifact, validatePublicArtifact } from '../../scripts/stage-pages-artifact';
import { legalDocumentIndex } from '../../src/data/legal-document-index';

describe('approval-gated legal SSG boundary', () => {
  it('stages only static files and rejects server bundles and source maps', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sawariya-pages-'));
    const source = path.join(root, 'dist');
    const target = path.join(root, 'dist-pages');
    fs.mkdirSync(path.join(source, 'assets'), { recursive: true });
    for (const file of ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'assets/app.js', 'assets/app.js.map', 'server.cjs', 'server.cjs.map']) {
      const filePath = path.join(source, file);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, 'fixture');
    }

    try {
      stagePagesArtifact(source, target);
      expect(validatePublicArtifact(target)).toBe(true);
      expect(fs.existsSync(path.join(target, 'assets/app.js'))).toBe(true);
      expect(fs.existsSync(path.join(target, 'assets/app.js.map'))).toBe(false);
      expect(fs.existsSync(path.join(target, 'server.cjs'))).toBe(false);
      expect(fs.existsSync(path.join(target, 'server.cjs.map'))).toBe(false);
      const release = JSON.parse(fs.readFileSync(path.join(target, 'release.json'), 'utf8')) as { buildSha: string; runId: string | null };
      expect(release.buildSha).toBeTruthy();
      expect(release.buildSha).not.toBe('local');
      expect(release.runId).toBeNull();
      fs.writeFileSync(path.join(target, 'release.json'), JSON.stringify({ buildSha: 'not-a-sha', runId: null }));
      expect(() => validatePublicArtifact(target)).toThrow('invalid release.json');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('generates a dedicated non-indexable 404 without homepage identity metadata', () => {
    const html = generate404Html();
    expect(html).toContain('<h1>Page not found</h1>');
    expect(html).toContain('name="robots" content="noindex,follow"');
    expect(html).toContain('href="https://sawariyadiagnostic.github.io/sawariyadiagnostic/"');
    expect(html).toContain('href="https://sawariyadiagnostic.github.io/sawariyadiagnostic/#tests"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('property="og:url"');
    expect(html).not.toContain('application/ld+json');
    expect(html).not.toContain('<script');
  });

  it('keeps only the supplied terms document approved in metadata', () => {
    const documents = Object.values(legalDocumentIndex);

    expect(documents).toHaveLength(8);
    expect(filterApprovedLegalMetadata(legalDocumentIndex).map((document) => document.key)).toEqual(['terms', 'patient-rights']);
    expect(documents.filter((document) => document.state === 'draft')).toHaveLength(6);
  });

  it('does not include legal routes or draft prose in the SSG generator', () => {
    const generator = readFileSync(resolve(process.cwd(), 'scripts/generate-ssg.ts'), 'utf8');

    expect(generator).not.toMatch(/privacy\.html|terms\.html|patient-rights\.html/);
    expect(generator).not.toMatch(/review-required|0\.0\.0|Privacy notice|Patient rights and responsibilities/);
  });

  it('resolves canonical URLs below the GitHub Pages repository base path', () => {
    expect(publicUrl('/guide/example.html')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/guide/example.html');
    expect(publicUrl('guide/example-hi.html')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/guide/example-hi.html');
    expect(publicUrl('/')).toBe('https://sawariyadiagnostic.github.io/sawariyadiagnostic/');
  });

  it('generates one correctly named PNG social image', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sawariya-og-'));
    try {
      generateOgImage(root);
      expect(fs.readFileSync(path.join(root, 'og-image.png')).subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
      expect(fs.existsSync(path.join(root, 'og-image.jpg'))).toBe(false);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
