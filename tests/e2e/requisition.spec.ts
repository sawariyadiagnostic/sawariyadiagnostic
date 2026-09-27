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
  await cards.nth(0).getByRole('button', { name: /Add to request/i }).click();
  const remove = cards.nth(0).getByRole('button', { name: /Remove from request/i });
  await expect(remove).toHaveAttribute('aria-pressed', 'true');
  await remove.click();
  await expect(page.getByRole('button', { name: /Review test request/ })).toHaveCount(0);
  await cards.nth(0).getByRole('button', { name: /Add to request/i }).click();
  await cards.nth(1).getByRole('button', { name: /Add to request/i }).click();

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

test('one selected test is reviewable from details on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.addInitScript(() => localStorage.clear());
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });

  const card = page.locator('#tests .fluid-grid-cards-sm > div').first();
  await expect(card).toBeVisible({ timeout: 60_000 });
  await expect(card.getByRole('button', { name: 'Book Now' })).toHaveCount(0);
  const name = await card.locator('h3').innerText();
  const item = medicalTests.find((test) => test.name === name)!;
  expect(item).toBeTruthy();

  await card.getByRole('button', { name: 'Details' }).click();
  const detail = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: item.name, exact: true }) });
  await expect(detail).toBeVisible();
  await expect(detail.getByRole('button', { name: /Book Appointment/ })).toHaveCount(0);
  await detail.getByRole('button', { name: /Add to request/i }).click();
  await expect(detail).toBeHidden();
  await expect(card.getByRole('button', { name: /Remove from request/i })).toHaveAttribute('aria-pressed', 'true');

  const review = page.getByRole('button', { name: 'Review test request, 1 selected' });
  await expect(review).toContainText(formatInr(item.price));
  await review.click();
  const request = page.getByRole('dialog', { name: 'Review your selected tests' });
  await expect(request.getByRole('heading', { name: item.name })).toBeVisible();
  await expect(request).toContainText(`Published test-price subtotal: ${formatInr(item.price)}`);
  const surface = await request.evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(surface).toBe('rgb(255, 255, 255)');

  const handoff = request.getByRole('link', { name: 'Send test request on WhatsApp' });
  await expect(handoff).toBeVisible();
  const labelLines = await handoff.evaluate((element) => {
    const label = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.includes('Send test request on WhatsApp'));
    if (!label) return 0;
    const range = document.createRange();
    range.selectNodeContents(label);
    return range.getClientRects().length;
  });
  expect(labelLines).toBe(1);
  const bounds = await handoff.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  const labelFits = await handoff.evaluate((element) => element.scrollWidth <= element.clientWidth);
  expect(labelFits).toBe(true);
  expect(new URL((await handoff.getAttribute('href'))!).searchParams.get('text')).toContain(item.name);
});
