const { test, expect } = require('@playwright/test')

const ROUTES = [
  'https://charliemacnamara.uk',
  'https://charliemacnamara.uk/about/',
  'https://charliemacnamara.uk/blog/',
  'https://charliemacnamara.uk/portfolio/',
  'https://charliemacnamara.uk/contact/',
  'https://charliemacnamara.uk/privacy/',
  'https://charliemacnamara.uk/blog/davison-menswear/',
  'https://charliemacnamara.uk/blog/sourdough-journey/',
  'https://charliemacnamara.uk/blog/markdown-cv/',
]

test.describe('seo files and 404 handling', () => {
  test('sitemap lists every published route and no drafts', async ({
    request,
  }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)

    const body = await response.text()

    for (const route of ROUTES) {
      expect(body, `sitemap should contain ${route}`).toContain(route)
    }

    expect(body, 'draft must not be in the sitemap').not.toContain('loquena')
    expect(body, 'old slug should not be in the sitemap').not.toContain(
      'quality-kilts',
    )
  })

  test('robots.txt allows crawling and points at the sitemap', async ({
    request,
  }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)

    const body = await response.text()
    expect(body).toContain('User-Agent: *')
    expect(body).toContain('Allow: /')
    expect(body).toContain('Sitemap: https://charliemacnamara.uk/sitemap.xml')
  })

  test('each page declares a canonical URL', async ({ page }) => {
    for (const path of ['/', '/about/', '/contact/']) {
      await page.goto(path)
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical, `${path} canonical`).toHaveCount(1)
      await expect(canonical).toHaveAttribute(
        'href',
        new RegExp(`charliemacnamara\\.uk${path === '/' ? '/?$' : path}`),
      )
    }
  })

  test('unknown URLs serve the styled 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-real-page/')

    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toHaveText('Page not found')
    await expect(page.getByRole('link', { name: 'Go back home' })).toBeVisible()
  })
})
