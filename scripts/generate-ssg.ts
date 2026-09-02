import fs from 'fs';
import path from 'path';
import { medicalTests, healthPackages } from '../src/data/mockTests';
import { generateOgImage } from './generate-og-image';

const BASE_URL = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  type: string;
  jsonLd: Record<string, unknown>;
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function generateHtmlTemplate(config: RouteConfig, baseIndexHtml: string): string {
  let html = baseIndexHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${config.title}</title>`
  );

  // Replace or inject Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${config.description}" />`
    );
  }

  // Replace OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${config.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${config.description}" />`
  );

  // Inject canonical URL and JSON-LD schema before </head>
  const canonicalUrl = `${BASE_URL}/${config.path}`;
  const headInject = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <script type="application/ld+json">
      ${JSON.stringify(config.jsonLd, null, 2)}
    </script>
  </head>`;

  html = html.replace('</head>', headInject);

  return html;
}

export function buildSSG() {
  console.log('🚀 [SSG Engine] Generating static HTML pages for all tests & packages...');

  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️ Dist directory does not exist yet. Please run vite build first.');
    return;
  }

  const baseIndexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexHtmlPath)) {
    console.error('❌ index.html not found in dist. Aborting SSG.');
    return;
  }

  const baseIndexHtml = fs.readFileSync(baseIndexHtmlPath, 'utf-8');

  // Rasterize high resolution OG images
  generateOgImage();

  const routes: RouteConfig[] = [];

  // Individual Medical Tests
  for (const test of medicalTests) {
    routes.push({
      path: `test/${test.id}.html`,
      title: `${test.name} - Price, Fasting, Turnaround | Sawariya Diagnostic Lab`,
      description: `Book ${test.name} at ₹${test.price} (Original ₹${test.originalPrice || test.price}). Fast turnaround in ${test.turnaroundTime} with free home sample collection across Charkhi Dadri.`,
      type: 'MedicalTest',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'MedicalTest',
        name: test.name,
        description: test.description,
        url: `${BASE_URL}/test/${test.id}.html`,
        offers: {
          '@type': 'Offer',
          price: test.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'DiagnosticLab',
            name: 'Sawariya Diagnostic Lab',
            telephone: '+917015290782'
          }
        }
      }
    });
  }

  // Health Packages
  for (const pkg of healthPackages) {
    routes.push({
      path: `package/${pkg.id}.html`,
      title: `${pkg.name} Health Checkup Package - ₹${pkg.price} | Sawariya Diagnostic`,
      description: `${pkg.name} includes ${pkg.testsIncluded.length} key tests: ${pkg.testsIncluded.slice(0, 3).join(', ')}. Save ${Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% with free doorstep collection.`,
      type: 'Product',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: pkg.name,
        description: pkg.description,
        url: `${BASE_URL}/package/${pkg.id}.html`,
        offers: {
          '@type': 'Offer',
          price: pkg.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }
      }
    });
  }

  // Patient Report Portal Route
  routes.push({
    path: `portal/reports.html`,
    title: `Download Doctor-Signed Lab Reports & Patient Portal | Sawariya Diagnostic`,
    description: `Access certified pathology results, download digital PDF reports with ICMR-compliant QR verification and track sample processing status online.`,
    type: 'WebPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Sawariya Diagnostic Patient Report Portal',
      description: 'Online pathology report download and digital sample tracking portal'
    }
  });

  // Generate HTML for each route
  let generatedCount = 0;
  for (const route of routes) {
    const targetPath = path.join(DIST_DIR, route.path);
    ensureDirectoryExistence(targetPath);
    const renderedHtml = generateHtmlTemplate(route, baseIndexHtml);
    fs.writeFileSync(targetPath, renderedHtml, 'utf-8');
    generatedCount++;
  }

  // GitHub Pages 404.html fallback
  const fallback404Path = path.join(DIST_DIR, '404.html');
  fs.writeFileSync(fallback404Path, baseIndexHtml, 'utf-8');

  // Generate dynamic sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/portal/reports.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}/${r.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.path.startsWith('package/') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log(`✅ [SSG Engine] Successfully generated ${generatedCount} static HTML pages, 404.html fallback, and updated sitemap.xml!`);
}

// If executed directly via tsx
if (process.argv[1] && process.argv[1].endsWith('generate-ssg.ts')) {
  buildSSG();
}
