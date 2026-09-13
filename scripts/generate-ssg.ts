import fs from 'fs';
import path from 'path';
import { approvedGuideManifest } from '../src/data/approvedGuideManifest';
import { generateOgImage } from './generate-og-image';

const BASE_URL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  type: string;
  jsonLd: Record<string, unknown>;
  language?: 'en' | 'hi';
  alternatePath?: string;
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  fs.mkdirSync(dirname, { recursive: true });
}

function generateHtmlTemplate(config: RouteConfig, baseIndexHtml: string): string {
  let html = baseIndexHtml.replace(/<html lang="[^"]*">/i, `<html lang="${config.language === 'hi' ? 'hi' : 'en'}">`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${config.description}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${config.title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${config.description}" />`,
  );
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+property="og:url"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>\s*/i, '');
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>\s*/i, '');
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/i, '');

  const canonicalUrl = `${BASE_URL}/${config.path}`;
  const languageLinks = config.alternatePath
    ? `
    <link rel="alternate" hreflang="${config.language === 'hi' ? 'hi' : 'en'}" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="${config.language === 'hi' ? 'en' : 'hi'}" href="${BASE_URL}/${config.alternatePath}" />`
    : '';
  const headInject = `
    <link rel="canonical" href="${canonicalUrl}" />${languageLinks}
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <script type="application/ld+json">
      ${JSON.stringify(config.jsonLd, null, 2)}
    </script>
  </head>`;
  return html.replace('</head>', headInject);
}

export function buildSSG() {
  console.log('🚀 [SSG Engine] Generating approved guide pages and support assets...');
  if (!fs.existsSync(DIST_DIR)) throw new Error('Dist directory does not exist; run vite build first');

  const baseIndexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexHtmlPath)) throw new Error('dist/index.html not found');
  const baseIndexHtml = fs.readFileSync(baseIndexHtmlPath, 'utf-8');

  for (const entry of ['test', 'package', 'portal', '404.html', 'sitemap.xml', 'og-image.jpg', 'og-image.png']) {
    fs.rmSync(path.join(DIST_DIR, entry), { recursive: true, force: true });
  }
  fs.writeFileSync(baseIndexHtmlPath, baseIndexHtml, 'utf-8');

  const routes: RouteConfig[] = [];
  for (const guide of approvedGuideManifest) {
    const guideJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: guide.titleEn,
      description: guide.summaryEn,
      url: `${BASE_URL}/guide/${guide.slug}.html`,
      inLanguage: 'en',
      about: { '@type': 'MedicalTest', name: guide.titleEn },
    };
    routes.push({
      path: `guide/${guide.slug}.html`,
      title: `${guide.titleEn} | Sawariya Diagnostic`,
      description: guide.summaryEn,
      type: 'MedicalWebPage',
      language: 'en',
      alternatePath: `guide/${guide.slug}-hi.html`,
      jsonLd: guideJsonLd,
    });
    routes.push({
      path: `guide/${guide.slug}-hi.html`,
      title: `${guide.titleHi} | Sawariya Diagnostic`,
      description: guide.summaryHi,
      type: 'MedicalWebPage',
      language: 'hi',
      alternatePath: `guide/${guide.slug}.html`,
      jsonLd: { ...guideJsonLd, name: guide.titleHi, description: guide.summaryHi, url: `${BASE_URL}/guide/${guide.slug}-hi.html`, inLanguage: 'hi' },
    });
  }

  let generatedCount = 0;
  for (const route of routes) {
    const targetPath = path.join(DIST_DIR, route.path);
    ensureDirectoryExistence(targetPath);
    fs.writeFileSync(targetPath, generateHtmlTemplate(route, baseIndexHtml), 'utf-8');
    generatedCount++;
  }
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), baseIndexHtml, 'utf-8');

  const date = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
${routes.map((route) => `  <url><loc>${BASE_URL}/${route.path}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>${route.path.startsWith('package/') ? '0.9' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  generateOgImage(DIST_DIR);
  console.log(`✅ [SSG Engine] Generated ${generatedCount} static HTML pages, 404.html, sitemap.xml, and OG assets.`);
}

if (process.argv[1] && process.argv[1].endsWith('generate-ssg.ts')) buildSSG();
