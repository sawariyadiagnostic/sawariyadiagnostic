import { expect, test } from '@playwright/test';

const openPage = async (page: Parameters<typeof test>[0]['page']) => {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.locator('#main-content')).toBeVisible();
};

test('legal footer actions meet the 44px touch target', async ({ page }) => {
  await openPage(page);
  await page.locator('footer').scrollIntoViewIfNeeded();
  const heights = await page.locator('footer button').filter({ hasText: /Privacy Policy|Terms & Patient Rights|Quality Charter/i }).evaluateAll((buttons) =>
    buttons.map((button) => button.getBoundingClientRect().height),
  );
  expect(heights).toHaveLength(3);
  expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
});

test('navbar logo is keyboard accessible as Back to top', async ({ page }) => {
  await openPage(page);
  const logo = page.getByRole('button', { name: 'Back to top' });
  await expect(logo).toBeVisible();
  await logo.focus();
  await expect(logo).toBeFocused();
});

test('mobile navigation closes with browser Back and restores scroll state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPage(page);

  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const menu = page.getByRole('dialog', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  await page.goBack();

  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('mobile navigation is a dialog and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPage(page);

  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const menu = page.getByRole('dialog', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});

test('skip link moves focus to the main content landmark', async ({ page }) => {
  await openPage(page);

  await page.locator('.skip-link').focus();
  await page.locator('.skip-link').press('Enter');

  await expect(page.locator('#main-content')).toBeFocused();
});

test('current privacy policy dialog exposes the operative version and source content', async ({ page }) => {
  await openPage(page);
  const trigger = page.getByRole('button', { name: 'Privacy Policy ' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Privacy & Medical Data Policy' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('status', { name: /PRIVACY POLICY/i })).toBeVisible();
  const policyContent = dialog.locator('pre');
  await expect(policyContent).toContainText('Document Version: 2.0-Operative Standard');
  await expect(policyContent).toContainText('11. Statutory Grievance Redressal and Contact Details');
  await expect(policyContent).toContainText('sawariyadiagnosticckd11@gmail.com');

  await dialog.getByRole('button', { name: 'Back from Privacy & Medical Data Policy' }).click();

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('current terms and patient rights dialog exposes the approved version and source content', async ({ page }) => {
  await openPage(page);
  const trigger = page.getByRole('button', { name: 'Terms & Patient Rights' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Terms of Service & Patient Rights' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('status', { name: /TERMS \x26 PATIENT RIGHTS — APPROVED/i })).toBeVisible();
  const termsContent = dialog.locator('pre');
  await expect(termsContent).toContainText('Version: 2.0-Legal Standard');
  await expect(termsContent).toContainText('Release Status    : Approved for Public Notice & Clinical Operations');
  await expect(termsContent).toContainText('Effective Date    : October 1, 2025');
  await expect(termsContent).toContainText('LEGAL AND CLINICAL REVIEW SIGN-OFF LEDGER');

  await dialog.getByRole('button', { name: 'Back from Terms of Service & Patient Rights' }).click();

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('current quality charter dialog exposes the approved identifier and source content', async ({ page }) => {
  await openPage(page);
  const trigger = page.getByRole('button', { name: 'Quality Charter & Charity Camps' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Patient Quality & Community Charter' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('status', { name: /QUALITY \x26 COMMUNITY CHARTER — APPROVED; EFFECTIVE OCTOBER 1, 2025/i })).toBeVisible();
  const charterContent = dialog.locator('pre');
  await expect(charterContent).toContainText('Document Identifier: SDL-QMS-CC-2026-V2');
  await expect(charterContent).toContainText('CLINICAL GOVERNANCE & QUALITY CHARTER APPROVAL RECORD');
  await expect(charterContent).toContainText('Effective Date    : October 1, 2025');

  await dialog.getByRole('button', { name: 'Back from Patient Quality & Community Charter' }).click();

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('legal dialogs close with the browser back action', async ({ page }) => {
  await openPage(page);
  const trigger = page.getByRole('button', { name: 'Terms & Patient Rights' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Terms of Service & Patient Rights' });
  await expect(dialog).toBeVisible();

  await page.goBack();

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('remaining legal footer actions identify drafts requiring review', async ({ page }) => {
  await openPage(page);

  const legalActions = page.locator('footer button').filter({ hasText: /draft, review required/i });
  await expect(legalActions).toHaveCount(0);
});

test('homepage has no horizontal overflow at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openPage(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('individual test details show canonical test data', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  const details = page.locator('#tests').getByRole('button', { name: 'Details' }).first();
  await details.click();
  const dialog = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'COMPLETE BLOOD COUNT (CBC)' })).toBeVisible();
});



test('test card details opens from the native keyboard button', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  const details = page.locator('#tests').getByRole('button', { name: 'Details' }).first();
  await details.focus();
  await details.press('Enter');
  await expect(page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i })).toBeVisible();
});

test('catalog metadata cards do not overlap on narrow mobile viewports', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  await page.locator('#tests').getByRole('button', { name: 'Details' }).first().click();

  const dialog = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
  const boxes = await Promise.all([
    dialog.getByText('Sample Collection:', { exact: true }).locator('..').boundingBox(),
    dialog.getByText('Methodology:', { exact: true }).locator('..').boundingBox(),
  ]);
  expect(boxes[0]).not.toBeNull();
  expect(boxes[1]).not.toBeNull();

  if (boxes[0] && boxes[1]) {
    const horizontalOverlap = boxes[0].x < boxes[1].x + boxes[1].width && boxes[1].x < boxes[0].x + boxes[0].width;
    const verticalOverlap = boxes[0].y < boxes[1].y + boxes[1].height && boxes[1].y < boxes[0].y + boxes[0].height;
    expect(horizontalOverlap && verticalOverlap).toBe(false);
  }
});

test('catalog detail panel fits viewport sizes and scrolls long content', async ({ page }) => {
  test.setTimeout(90_000);
  for (const viewport of [{ width: 360, height: 800 }, { width: 768, height: 900 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openPage(page);
    await page.locator('#tests').scrollIntoViewIfNeeded();
    const details = page.locator('#tests').getByRole('button', { name: 'Details' }).first();
    await expect(details).toBeVisible();
    await details.click();

    const dialog = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
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
  const details = page.locator('#tests').getByRole('button', { name: 'Details' }).first();
  await expect(details).toBeVisible();
  await details.click();
  const dialog = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
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

test('individual test hash links restore the matching test and browser Back closes it', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/#/test/web-001', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.locator('#tests')).toBeVisible({ timeout: 60_000 });
  const dialog = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i });
  await expect(dialog).toBeVisible({ timeout: 20_000 });
  await page.goBack();
  await expect(dialog).toBeHidden({ timeout: 20_000 });
});

test('nested booking dialog closes before test details on browser Back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  await page.locator('#tests').getByRole('button', { name: 'Details' }).first().click();

  const detail = page.getByRole('dialog', { name: /COMPLETE BLOOD COUNT/i }).first();
  await expect(detail).toBeVisible();
  await detail.getByRole('button', { name: /Book Appointment/ }).click();

  const dialogs = page.locator('[role="dialog"]');
  await expect(dialogs).toHaveCount(2);
  await page.goBack();
  await expect(dialogs).toHaveCount(1);
  await expect(detail).toBeVisible();
  await page.goBack();
  await expect(detail).toBeHidden();
});

test('catalog pagination limits visible cards and resets after filtering', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  const catalog = page.locator('#tests');
  const pagination = catalog.getByRole('navigation', { name: 'Test catalog pages' });
  await expect(pagination).toBeVisible();
  await expect(pagination).toContainText(/Showing 1–24 of 74 tests/);
  await expect(catalog.getByRole('button', { name: 'Details' })).toHaveCount(24);

  await pagination.getByRole('button', { name: 'Next' }).click();
  await expect(pagination).toContainText(/Showing 25–48 of 74 tests/);
  await expect(pagination.getByRole('button', { name: 'Previous' })).toBeEnabled();

  await catalog.getByPlaceholder('Ask about an individual test…').fill('thyroid');
  await expect(catalog.getByRole('status').filter({ hasText: /tests matching/ })).toContainText(/tests matching/);
  await expect(pagination).toBeHidden();
});

test('catalog cards show real test descriptions', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();
  const card = page.locator('#tests .glass-card').filter({ hasText: 'COMPLETE BLOOD COUNT (CBC)' }).first();
  await expect(card).toBeVisible();
  await expect(card.locator('..').getByText('Comprehensive evaluation of cellular blood components.', { exact: true })).toBeVisible();
  await expect(card.locator('..').getByText(/Current test details are published/)).toHaveCount(0);
});

test('catalog search result count is announced as a status update', async ({ page }) => {
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  const search = page.locator('#tests').getByPlaceholder('Ask about an individual test…');
  await search.fill('thyroid');
  const resultCount = page.locator('#tests [role="status"][aria-live="polite"]').filter({ hasText: 'tests matching' });
  await expect(resultCount).toBeVisible();
});

test('catalog filters expose a resettable no-results state', async ({ page }) => {
  test.setTimeout(90_000);
  await openPage(page);
  await page.locator('#tests').scrollIntoViewIfNeeded();

  const search = page.locator('#tests').getByPlaceholder('Ask about an individual test…');
  await search.fill('zzzz-no-catalog-match');
  await expect(page.getByRole('status').filter({ hasText: 'No tests match this search' })).toBeVisible();

  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(page.locator('#tests').getByText('Individual Tests. Transparent Pricing.', { exact: true })).toBeVisible();
});

test('visible action buttons meet the 44px minimum target height', async ({ page }) => {
  await openPage(page);

  const heights = await page.locator('.action-button:visible').evaluateAll((buttons) =>
    buttons.map((button) => button.getBoundingClientRect().height),
  );

  expect(heights.length).toBeGreaterThan(0);
  expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
});

test('patient controls use 44px targets and a readable search placeholder at 360px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openPage(page);
  const result = await page.evaluate(() => {
    const controls = [...document.querySelectorAll<HTMLElement>('button:not(.ui-calendar-day):not([data-ui-size="icon"]), a.ui-button:not([data-ui-size="icon"]), .ui-control')]
      .filter((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden');
    const undersized = controls.map((element) => {
      const box = element.getBoundingClientRect();
      return { label: (element.innerText || element.getAttribute('aria-label') || element.getAttribute('placeholder') || element.tagName).trim(), width: box.width, height: box.height };
    }).filter((box) => box.width < 44 || box.height < 44);
    const placeholder = document.querySelector<HTMLInputElement>('input[placeholder="Ask about an individual test…"]');
    return {
      undersized,
      placeholderColor: placeholder ? getComputedStyle(placeholder, '::placeholder').color : null,
      placeholderOpacity: placeholder ? getComputedStyle(placeholder, '::placeholder').opacity : null,
    };
  });
  expect(result.undersized).toEqual([]);
  expect(result.placeholderColor).toBe('rgb(69, 84, 104)');
  expect(result.placeholderOpacity).toBe('1');
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
