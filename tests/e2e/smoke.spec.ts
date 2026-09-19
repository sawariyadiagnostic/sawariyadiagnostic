import { expect, test } from '@playwright/test';

test('renders the public homepage and core trust sections', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });

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
