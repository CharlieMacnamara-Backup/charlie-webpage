const { defineConfig, devices } = require('@playwright/test')

const PORT = 4321
const baseURL = `http://127.0.0.1:${PORT}`

/**
 * End-to-end tests run against the real Cloudflare Worker serving the built
 * static export, so redirects, the assets binding and 404 behaviour are the
 * same as production.
 *
 * `wrangler dev` serves ./out, so a build must exist first - `npm run test:e2e`
 * builds before running. Locally an already-running server is reused.
 */
module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx wrangler dev --port ${PORT}`,
    url: `${baseURL}/contact/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
})
