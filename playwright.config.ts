import { defineConfig, devices } from '@playwright/test';

const pagesArtifactMode = process.env.PLAYWRIGHT_PAGES_ARTIFACT === '1';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || (pagesArtifactMode ? 'http://127.0.0.1:4173/sawariyadiagnostic/' : 'http://127.0.0.1:3000'),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: pagesArtifactMode ? 'node scripts/serve-pages-artifact.cjs' : process.env.PLAYWRIGHT_PRODUCTION === '1' ? 'node scripts/serve-production.cjs' : 'npm run dev',
    url: process.env.PLAYWRIGHT_HEALTH_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
