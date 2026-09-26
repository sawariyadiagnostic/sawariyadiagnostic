import { expect, test } from '@playwright/test';

const pagesBase = '/sawariyadiagnostic/';

test('serves the homepage and shared test route beneath the Pages project path', async ({ page }) => {
  const response = await page.goto(`${pagesBase}#/test/web-001`);
  expect(response?.status()).toBe(200);
  await expect(page.locator('#tests')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i })).toBeVisible({ timeout: 20_000 });
});

test('closes a shared test link without reopening it after reload', async ({ page }) => {
  await page.goto(`${pagesBase}#/test/web-001`);
  const details = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
  await expect(details).toBeVisible({ timeout: 60_000 });
  await page.getByRole('button', { name: /close/i }).first().click();
  await expect(details).toBeHidden();
  await expect.poll(() => new URL(page.url()).hash).toBe('');
  await page.reload();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('an invalid test hash does not open the wrong detail or break the catalog', async ({ page }) => {
  await page.goto(`${pagesBase}#/test/not-a-real-test`);
  await expect(page.locator('#tests')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /Individual Tests\. Transparent Pricing\./i })).toBeVisible();
});

test('returns the dedicated 404 document for unknown static routes', async ({ request }) => {
  for (const route of ['unknown-page', 'unknown-page.html']) {
    const response = await request.get(`${pagesBase}${route}`);
    expect(response.status(), route).toBe(404);
    expect(response.headers()['content-type'], route).toContain('text/html');
    const html = await response.text();
    expect(html, route).toContain('<h1>Page not found</h1>');
    expect(html, route).toContain('name="robots" content="noindex,follow"');
    expect(html, route).not.toContain('rel="canonical"');
    expect(html, route).not.toContain('property="og:url"');
    expect(html, route).not.toContain('application/ld+json');
  }
});

test('serves a crawlable canonical homepage and robots-referenced sitemap', async ({ request }) => {
  const siteBase = 'https://sawariyadiagnostic.github.io/sawariyadiagnostic/';
  const home = await request.get(pagesBase);
  expect(home.status()).toBe(200);
  const html = await home.text();
  const title = 'Diagnostic Lab in Charkhi Dadri | Sawariya Diagnostic';
  const description = 'Sawariya Diagnostic Lab in Charkhi Dadri, Haryana. Individual diagnostic tests, home-collection requests, and report assistance.';
  expect(html).toContain(`<title>${title}</title>`);
  expect(html.match(/<meta\s+name="description"[\s\S]*?content="([^"]+)"/i)?.[1]).toBe(description);
  expect(html.match(/<meta\s+property="og:title"[\s\S]*?content="([^"]+)"/i)?.[1]).toBe(title);
  expect(html.match(/<meta\s+name="twitter:title"[\s\S]*?content="([^"]+)"/i)?.[1]).toBe(title);
  const canonical = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
  expect(canonical).toContain(`href="${siteBase}"`);

  const robots = await request.get(`${pagesBase}robots.txt`);
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain(`Sitemap: ${siteBase}sitemap.xml`);
  expect(robotsText).not.toMatch(/Disallow:\s*\/\s*(?:\r?\n|$)/i);

  const sitemap = await request.get(`${pagesBase}sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  const locations = [...sitemapText.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1]);
  expect(locations).toContain(siteBase);
  expect(new Set(locations).size).toBe(locations.length);
  for (const location of locations) expect(location.startsWith(siteBase)).toBe(true);
});

test('does not expose preview server bundles or source maps', async ({ request }) => {
  for (const artifact of ['server.cjs', 'server.cjs.map', 'assets/index.js.map']) {
    const response = await request.get(`${pagesBase}${artifact}`);
    expect(response.status(), artifact).toBe(404);
  }
});

test('serves the release marker with valid build metadata', async ({ request }) => {
  const response = await request.get(`${pagesBase}release.json`);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const release = await response.json() as { buildSha: string; runId: string | null };
  expect(release.buildSha).toMatch(/^[a-f0-9]{40}$/i);
  expect(release.runId === null || /^\d+$/.test(release.runId)).toBe(true);
});

test('resolves manifest and icon paths beneath the Pages project base', async ({ page, request }) => {
  await page.goto(pagesBase);
  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestHref).toBeTruthy();
  const manifestUrl = new URL(manifestHref!, page.url());
  expect(manifestUrl.pathname).toContain(pagesBase);
  const manifestResponse = await request.get(manifestUrl.href);
  expect(manifestResponse.status()).toBe(200);
  const manifest = await manifestResponse.json();
  const iconUrl = new URL(manifest.icons[0].src, manifestUrl);
  expect(iconUrl.pathname).toContain(pagesBase);
  expect((await request.get(iconUrl.href)).status()).toBe(200);
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(favicon).toBeTruthy();
  expect(new URL(favicon!, page.url()).pathname).toContain(pagesBase);
  const touchIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href');
  expect(touchIcon).toBeTruthy();
  expect(new URL(touchIcon!, page.url()).pathname).toContain(pagesBase);
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(ogImage).toContain('/og-image.png');
  expect(new URL(ogImage!, page.url()).pathname).toContain(pagesBase);
  expect((await request.get(ogImage!)).status()).toBe(200);
  expect(await request.get(`${pagesBase}og-image.jpg`).then((response) => response.status())).toBe(404);
});

test('does not publish a masked phone in structured data', async ({ page }) => {
  await page.goto(pagesBase);
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.join('\n')).not.toMatch(/"telephone"\s*:\s*"[^"]*[*xX][^"]*"/);
});

test('keeps rendered telephone links dialable', async ({ page }) => {
  await page.goto(pagesBase);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const links = await page.locator('a[href^="tel:"]').evaluateAll((items) => items.map((item) => item.getAttribute('href')));
  expect(links.length).toBeGreaterThan(0);
  expect(links.every((href) => href && /^tel:\+?[0-9]+$/.test(href))).toBe(true);
});
