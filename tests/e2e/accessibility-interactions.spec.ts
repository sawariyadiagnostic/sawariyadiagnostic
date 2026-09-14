import { expect, test } from '@playwright/test';

const openPage = async (page: Parameters<typeof test>[0]['page']) => {
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.locator('#main-content')).toBeVisible();
};

test('skip link moves focus to the main content landmark', async ({ page }) => {
  await openPage(page);

  await page.locator('.skip-link').focus();
  await page.locator('.skip-link').press('Enter');

  await expect(page.locator('#main-content')).toBeFocused();
});

test('draft policy dialog exposes status, one close action, and restores focus', async ({ page }) => {
  await openPage(page);
  const trigger = page.getByRole('button', { name: 'Privacy Policy — draft, review required' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Privacy & Medical Data Policy' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Privacy & Medical Data Policy' })).toBeVisible();
  await expect(dialog.getByRole('status', { name: 'DRAFT — REVIEW REQUIRED BEFORE PUBLICATION' })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close' })).toHaveCount(1);

  await page.keyboard.press('Escape');

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('all legal footer actions identify drafts requiring review', async ({ page }) => {
  await openPage(page);

  const legalActions = page.locator('footer button').filter({ hasText: /draft, review required/i });
  await expect(legalActions).toHaveCount(3);
});

test('homepage has no horizontal overflow at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openPage(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('empty catalog offers one truthful request handoff', async ({ page }) => {
  await openPage(page);

  await expect(page.getByText('The public catalog is being prepared')).toBeVisible();
  const requestLinks = page.getByRole('link', { name: 'Request a test or package on WhatsApp' });
  await expect(requestLinks).toHaveCount(1);
  await expect(requestLinks).toHaveAttribute('href', /wa\.me/);
});

test('visible action buttons meet the 44px minimum target height', async ({ page }) => {
  await openPage(page);

  const heights = await page.locator('.action-button:visible').evaluateAll((buttons) =>
    buttons.map((button) => button.getBoundingClientRect().height),
  );

  expect(heights.length).toBeGreaterThan(0);
  expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
});

test('reduced motion disables animation and transition timing', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openPage(page);

  const motion = await page.locator('body').evaluate((body) => {
    const styles = getComputedStyle(body);
    return {
      animationDuration: styles.animationDuration,
      transitionDuration: styles.transitionDuration,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(parseFloat(motion.animationDuration)).toBeLessThanOrEqual(0.01);
  expect(parseFloat(motion.transitionDuration)).toBeLessThanOrEqual(0.01);
  expect(motion.scrollBehavior).toBe('auto');
});
