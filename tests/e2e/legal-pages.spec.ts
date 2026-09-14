import { expect, test } from '@playwright/test';

const legalDocumentKeys = [
  'privacy',
  'terms',
  'patient-rights',
  'home-collection',
  'report-assistance',
  'accessibility',
  'grievance',
  'external-services',
] as const;

test('does not serve draft legal pages or list them in the sitemap', async ({ request }) => {
  for (const key of legalDocumentKeys) {
    const response = await request.get(`/${key}.html`);
    expect(response.status(), key).toBe(404);
    expect(await response.text(), key).not.toMatch(/privacy notice|terms of service|patient rights|review-required/i);
  }

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toMatch(/privacy|terms|patient-rights|home-collection|report-assistance|accessibility|grievance|external-services/i);
});

test('keeps the unknown-route browser response free of draft legal output', async ({ page }) => {
  const response = await page.goto('/not-a-published-route.html');
  expect(response?.status()).toBe(404);
  await expect(page.locator('body')).not.toContainText(/review-required|privacy notice|patient rights/i);
});
