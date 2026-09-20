import fs from 'node:fs';
import path from 'node:path';
import { approvedGuideManifest } from '../src/data/approvedGuideManifest';
import { generateOgImage } from './generate-og-image';


const BASE_URL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  jsonLd: Record<string, unknown>;
  language?: 'en' | 'hi';
  alternatePath?: string;
}

export function publicUrl(relativePath: string): string {
  const normalized = relativePath.replace(/^\/+/, '');
  return normalized ? `${BASE_URL}/${normalized}` : `${BASE_URL}/`;
}

function ensureDirectoryExistence(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function generateHtmlTemplate(config: RouteConfig, baseIndexHtml: string): string {
  let html = baseIndexHtml.replace(/<html lang="[^"]*">/i, `<html lang="${config.language === 'hi' ? 'hi' : 'en'}">`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${config.description}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${config.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${config.description}" />`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+property="og:url"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>\s*/i, '');
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/i, '');

  const canonicalUrl = publicUrl(config.path);
  const languageLinks = config.alternatePath
    ? `\n    <link rel="alternate" hreflang="${config.language === 'hi' ? 'hi' : 'en'}" href="${canonicalUrl}" />\n    <link rel="alternate" hreflang="${config.language === 'hi' ? 'en' : 'hi'}" href="${publicUrl(config.alternatePath)}" />`
    : '';
  return html.replace('</head>', `\n    <link rel="canonical" href="${canonicalUrl}" />${languageLinks}\n    <meta property="og:url" content="${canonicalUrl}" />\n    <meta name="twitter:title" content="${config.title}" />\n    <meta name="twitter:description" content="${config.description}" />\n    <script type="application/ld+json">\n      ${JSON.stringify(config.jsonLd, null, 2)}\n    </script>\n  </head>`);
}

export function buildSSG() {
  console.log('🚀 [SSG Engine] Generating approved guide pages and support assets...');
  if (!fs.existsSync(DIST_DIR)) throw new Error('Dist directory does not exist; run vite build first');

  const baseIndexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexHtmlPath)) throw new Error('dist/index.html not found');
  const baseIndexHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');

  for (const entry of ['test', 'package', 'portal', '404.html', 'sitemap.xml', 'og-image.jpg', 'og-image.png']) {
    fs.rmSync(path.join(DIST_DIR, entry), { recursive: true, force: true });
  }

  const routes: RouteConfig[] = [];
  for (const guide of approvedGuideManifest) {
    const guidePath = `guide/${guide.slug}.html`;
    const hindiGuidePath = `guide/${guide.slug}-hi.html`;
    const guideJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: guide.titleEn,
      description: guide.summaryEn,
      url: publicUrl(guidePath),
      inLanguage: 'en',
      about: { '@type': 'MedicalTest', name: guide.titleEn },
    };
    routes.push({ path: guidePath, title: `${guide.titleEn} | Sawariya Diagnostic`, description: guide.summaryEn, language: 'en', alternatePath: hindiGuidePath, jsonLd: guideJsonLd });
    routes.push({
      path: hindiGuidePath,
      title: `${guide.titleHi} | Sawariya Diagnostic`,
      description: guide.summaryHi,
      language: 'hi',
      alternatePath: guidePath,
      jsonLd: { ...guideJsonLd, name: guide.titleHi, description: guide.summaryHi, url: publicUrl(hindiGuidePath), inLanguage: 'hi' },
    });
  }

  let generatedCount = 0;
  for (const route of routes) {
    const targetPath = path.join(DIST_DIR, route.path);
    ensureDirectoryExistence(targetPath);
    fs.writeFileSync(targetPath, generateHtmlTemplate(route, baseIndexHtml), 'utf8');
    generatedCount += 1;
  }
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), baseIndexHtml, 'utf8');

  const date = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${publicUrl('/')}</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n${routes.map((route) => `  <url><loc>${publicUrl(route.path)}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}\n</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  generateOgImage(DIST_DIR);
  console.log(`✅ [SSG Engine] Generated ${generatedCount} static HTML pages, 404.html, sitemap.xml, and OG assets.`);
}

if (process.argv[1]?.endsWith('generate-ssg.ts')) buildSSG();
