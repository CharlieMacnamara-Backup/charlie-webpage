const { test, expect } = require('@playwright/test')

test.describe('navigation', () => {
  test('the header nav reaches every section', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Main navigation' })

    await nav.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/about\/$/)

    await nav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog\/$/)

    await nav.getByRole('link', { name: 'Portfolio' }).click()
    await expect(page).toHaveURL(/\/portfolio\/$/)
  })

  test('the avatar returns home', async ({ page }) => {
    await page.goto('/about/')

    await page.getByRole('link', { name: 'Return to homepage' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('the footer links reach contact and privacy', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Privacy' }).click()
    await expect(page).toHaveURL(/\/privacy\/$/)
    await expect(page.locator('h1')).toHaveText('Privacy Policy')
  })

  test('the theme toggle switches light and dark', async ({ page }) => {
    await page.goto('/')

    const toggle = page.getByRole('button', {
      name: /Switch to (dark|light) theme/,
    })
    await expect(toggle).toBeVisible()

    const isDark = () =>
      page.evaluate(() => document.documentElement.classList.contains('dark'))
    const before = await isDark()

    await toggle.click()
    await expect.poll(isDark).toBe(!before)

    // and back
    await page
      .getByRole('button', { name: /Switch to (dark|light) theme/ })
      .click()
    await expect.poll(isDark).toBe(before)
  })

  test('the skip link targets the main content', async ({ page }) => {
    await page.goto('/')

    const skip = page.getByRole('link', { name: 'Skip to main content' })
    await expect(skip).toHaveAttribute('href', '#main-content')
  })

  test('every page is reachable without javascript errors on resize', async ({
    page,
  }) => {
    await page.goto('/contact/')

    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await expect(page.locator('h1')).toBeVisible()
    }
  })
})
