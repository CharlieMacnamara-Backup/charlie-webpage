const { test, expect } = require('@playwright/test')

const { PAGES, watch } = require('./helpers')

test.describe('every page loads cleanly', () => {
  for (const { name, path, h1 } of PAGES) {
    test(`${name} (${path})`, async ({ page }) => {
      const { consoleErrors, failedRequests, serverErrors } = watch(page)

      const response = await page.goto(path)

      expect(response?.status(), `${path} should return 200`).toBe(200)
      await expect(page.locator('h1')).toHaveText(h1)
      await expect(page).toHaveTitle(/Macnamara/)

      expect(serverErrors, `${path} requested something missing`).toEqual([])
      expect(failedRequests, `${path} had a failed request`).toEqual([])
      expect(consoleErrors, `${path} logged console errors`).toEqual([])
    })
  }
})
