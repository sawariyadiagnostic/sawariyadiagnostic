import { expect, test } from '@playwright/test';
import { medicalTests } from '../../src/data/publishedCatalog';
import { formatInr } from '../../src/lib/utils';

test('collects published test selections and prepares an honest WhatsApp request', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });

  const cards = page.locator('#tests .fluid-grid-cards-sm > div');
  await expect(cards.first()).toBeVisible({ timeout: 60_000 });
  const names = await cards.locator('h3').allTextContents();
  const tests = names.slice(0, 2).map((name) => medicalTests.find((item) => item.name === name)!);
  expect(tests).toHaveLength(2);
  const firstAdd = cards.nth(0).getByRole('button', { name: 'Add to request' });
  await firstAdd.click();
  await expect(cards.nth(0).getByRole('button', { name: 'Remove from request' })).toHaveAttribute('aria-pressed', 'true');
  await cards.nth(0).getByRole('button', { name: 'Remove from request' }).click();
  await expect(page.getByRole('button', { name: /Review test request/ })).toHaveCount(0);
  await cards.nth(0).getByRole('button', { name: 'Add to request' }).click();
  await cards.nth(1).getByRole('button', { name: 'Add to request' }).click();

  const subtotal = formatInr(tests.reduce((sum, item) => sum + item.price, 0));
  const review = page.getByRole('button', { name: 'Review test request, 2 selected' });
  await expect(review).toContainText(subtotal);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await review.click();

  const request = page.getByRole('dialog', { name: 'Review your selected tests' });
  for (const item of tests) {
    await expect(request.getByRole('heading', { name: item.name })).toBeVisible();
    await expect(request.getByRole('button', { name: `Remove ${item.name} from request` })).toBeVisible();
  }
  await expect(request).toContainText(`Published test-price subtotal: ${subtotal}`);
  await expect(request).toContainText('The lab confirms availability and any collection charges; no appointment is booked until confirmed.');
  await expect(request).not.toContainText(/Collection fee:|Estimated total|free collection/i);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);

  const handoff = request.getByRole('link', { name: 'Send test request on WhatsApp' });
  const handoffUrl = await handoff.getAttribute('href');
  expect(handoffUrl).toMatch(/^https:\/\/wa\.me\/919991941207\?text=/);
  await expect(handoff).toHaveAttribute('rel', /noopener/);
  const message = new URL(handoffUrl!).searchParams.get('text')!;
  for (const item of tests) expect(message).toContain(item.name);
  expect(message).toContain(subtotal);
  expect(message).toContain('Please confirm availability, final collection charges, preparation instructions, and the appointment with the lab desk.');
  expect(message).not.toMatch(/(?:patient|address|mobile|phone|age|gender):/i);
});
