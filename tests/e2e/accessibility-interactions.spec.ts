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

test('catalog package details show canonical member names', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  await page.getByRole('button', { name: 'Overview' }).first().click();
  const dialog = page.getByRole('dialog', { name: /Master Iron Metabolism/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('COMPLETE BLOOD COUNT (CBC)', { exact: true })).toBeVisible();
  await expect(dialog.getByText('WEB-001', { exact: true })).toHaveCount(0);
});

test('package cards show canonical member names', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  const firstPackage = page.locator('#tests .glass-card').filter({ hasText: 'Master Iron Metabolism & Anemia Workup' }).first();
  await expect(firstPackage.getByText('COMPLETE BLOOD COUNT (CBC)', { exact: true })).toBeVisible();
  await expect(firstPackage.getByText('WEB-001', { exact: true })).toHaveCount(0);
});

test('catalog detail panel fits viewport sizes and scrolls long content', async ({ page }) => {
  test.setTimeout(90_000);
  for (const viewport of [{ width: 360, height: 800 }, { width: 768, height: 900 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openPage(page);
    await page.locator('#tests').scrollIntoViewIfNeeded();
    const overview = page.getByRole('button', { name: 'Overview' }).first();
    await expect(overview).toBeVisible();
    await overview.click();

    const dialog = page.getByRole('dialog', { name: /Master Iron Metabolism/i });
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    }
    const scrollState = await dialog.locator('.overflow-y-auto').evaluate((element) => ({
      scrollable: element.scrollHeight > element.clientHeight,
      hasScrollRegion: element.classList.contains('overflow-y-auto'),
    }));
    expect(scrollState.hasScrollRegion).toBe(true);
    if (viewport.width <= 360) expect(scrollState.scrollable).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  }
});

test('catalog detail modal stays above the mobile dock', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  const overview = page.getByRole('button', { name: 'Overview' }).first();
  await expect(overview).toBeVisible();
  await overview.click();
  const dialog = page.getByRole('dialog', { name: /Master Iron Metabolism/i });
  await expect(dialog).toBeVisible();
  const result = await dialog.evaluate((element) => {
    const dock = [...document.querySelectorAll('div')].find((candidate) => {
      const className = typeof candidate.className === 'string' ? candidate.className : '';
      return className.includes('fixed') && className.includes('bottom-0') && className.includes('sm:hidden');
    });
    const dockBox = dock?.getBoundingClientRect();
    const point = dockBox ? { x: dockBox.left + dockBox.width / 2, y: dockBox.top + dockBox.height / 2 } : null;
    const hit = point ? document.elementFromPoint(point.x, point.y) : null;
    return { dialogZ: getComputedStyle(element).zIndex, dockZ: dock ? getComputedStyle(dock).zIndex : null, hitInsideDialog: Boolean(hit && element.contains(hit)) };
  });
  expect(Number(result.dialogZ)).toBeGreaterThan(Number(result.dockZ));
  expect(result.hitInsideDialog).toBe(true);
});

test('catalog hash links restore the matching package and browser Back closes it', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/#/package/panel-anemia', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.locator('#tests')).toBeVisible({ timeout: 60_000 });
  const dialog = page.getByRole('dialog', { name: /Master Iron Metabolism/i });
  await expect(dialog).toBeVisible({ timeout: 20_000 });
  await expect(dialog.getByText('COMPLETE BLOOD COUNT (CBC)', { exact: true })).toBeVisible({ timeout: 20_000 });
  await page.goBack();
  await expect(dialog).toBeHidden({ timeout: 20_000 });
});

test('catalog cards show real test descriptions', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: /Individual Tests/ }).click();
  const card = page.locator('#tests').getByRole('button', { name: /View details for COMPLETE BLOOD COUNT/ }).first();
  await expect(card).toBeVisible();
  await expect(card.locator('..').getByText('Comprehensive evaluation of cellular blood components.', { exact: true })).toBeVisible();
  await expect(card.locator('..').getByText(/Current test details are published/)).toHaveCount(0);
});

test('catalog filters expose a resettable no-results state', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  const search = page.locator('#tests').getByPlaceholder('Ask about a test or package...');
  await search.fill('zzzz-no-catalog-match');
  await expect(page.getByRole('status').filter({ hasText: 'No tests match this search' })).toBeVisible();

  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(page.getByText('Individual Tests (74+)', { exact: true })).toBeVisible();
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
