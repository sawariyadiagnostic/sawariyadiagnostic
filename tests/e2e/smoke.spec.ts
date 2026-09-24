import { expect, test } from '@playwright/test';

test('renders the public homepage and core trust sections', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });

  await expect(page.getByRole('heading', { name: /Precision Pathology/i })).toBeVisible();
  await expect(page.locator('#home-collection')).toBeVisible();
  await expect(page.locator('#team')).toBeVisible();
  await expect(page.getByRole('heading', { name: /quality system built around accountable roles/i })).toBeVisible();

  const logo = page.locator('img[src*="sawariya-dna-original.svg"]').first();
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', /brand\/sawariya-dna-original\.svg/);
  expect(await logo.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const bodyText = (await page.locator('body').innerText()).toLowerCase();
  expect(bodyText).not.toContain('cms editor');
  expect(bodyText).not.toContain('schema.org structured data & seo preview');
  expect(bodyText).not.toContain('health packages');
  expect(bodyText).toContain('individual tests. transparent pricing.');
  expect(bodyText).not.toContain('the public catalog is being prepared');
  expect(bodyText).not.toMatch(/patient lab portal|doctor consultation|call 24\*7 helpline/i);
  await expect(page.getByText('Illustrative test preview')).toBeVisible();
  await expect(page.getByText('CBC • Thyroid • Glucose')).toBeVisible();
});

test('share copies the project base path and valid test hash', async ({ page, context }) => {
  test.setTimeout(90_000);
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text: string) => { (window as Window & { copiedShareUrl?: string }).copiedShareUrl = text; } },
    });
  });
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('#tests').scrollIntoViewIfNeeded();
  await page.locator('#tests').getByRole('button', { name: 'Details' }).first().click();
  await expect(page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i })).toBeVisible();
  await page.getByRole('button', { name: 'Share' }).click();

  const sharedUrl = await page.evaluate(() => (window as Window & { copiedShareUrl?: string }).copiedShareUrl);
  expect(sharedUrl).toBeTruthy();
  const shared = new URL(sharedUrl!);
  expect(shared.pathname).toBe('/sawariyadiagnostic/');
  expect(shared.hash).toBe('#/test/web-001');
});

test('test detail dialogs do not publish nonexistent canonical pages or MedicalTest schema', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.locator('#tests').scrollIntoViewIfNeeded();
  await page.locator('#tests').getByRole('button', { name: 'Details' }).first().click();
  await expect(page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"][href$=".html"]')).toHaveCount(0);
  const medicalTestSchemaCount = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.filter((script) => script.textContent?.includes('"MedicalTest"')).length,
  );
  expect(medicalTestSchemaCount).toBe(0);
});
