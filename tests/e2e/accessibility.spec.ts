import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.setTimeout(120_000);

test('homepage has no serious or critical automated accessibility violations', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 60_000 });
  const results = await new AxeBuilder({ page }).analyze();
  const seriousOrCritical = results.violations.filter((violation) =>
    violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
});
