import { expect, test } from '@playwright/test';

const openPage = async (page: Parameters<typeof test>[0]['page']) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.locator('#main-content')).toBeVisible();
};

test('mobile navigation locks body scroll and restores inline styles', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openPage(page);

  await page.evaluate(() => {
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'pan-y';
  });

  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => ({
    overflow: document.body.style.overflow,
    touchAction: document.body.style.touchAction,
  }))).toEqual({ overflow: 'hidden', touchAction: 'none' });

  await page.getByRole('button', { name: 'Close Menu' }).click();
  await expect.poll(() => page.evaluate(() => ({
    overflow: document.body.style.overflow,
    touchAction: document.body.style.touchAction,
  }))).toEqual({ overflow: 'auto', touchAction: 'pan-y' });
});
