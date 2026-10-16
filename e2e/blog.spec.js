const { test, expect } = require('@playwright/test')

const { POSTS, watch, scrollThrough } = require('./helpers')

test.describe('blog', () => {
  test('index lists every published post', async ({ page }) => {
    await page.goto('/blog/')

    for (const { title } of POSTS) {
      // Card titles carry an aria-label of "Read more about {title}".
      await expect(
        page.getByRole('link', { name: `Read more about ${title}` }),
      ).toBeVisible()
    }
  })

  test('an unlisted post is shareable by URL but stays out of the listing', async ({
    page,
  }) => {
    await page.goto('/blog/')

    // published: false keeps it out of the index...
    await expect(page.locator('a[href*="loquena"]')).toHaveCount(0)

    // ...but the route still exists so the link can be shared for review.
    const { consoleErrors, failedRequests, serverErrors } = watch(page)
    const response = await page.goto('/blog/loquena-app/')

    expect(response?.status(), 'unlisted posts stay reachable').toBe(200)
    await expect(page.locator('h1')).toHaveText(
      'Loquena: Speak, Regulate, Grow',
    )

    // Its assets must resolve like any published post - this is what catches a
    // stale image reference after a filename change.
    await scrollThrough(page)
    expect(serverErrors, 'unlisted post requested something missing').toEqual(
      [],
    )
    expect(failedRequests, 'unlisted post had a failed request').toEqual([])
    expect(consoleErrors, 'unlisted post logged console errors').toEqual([])
  })

  test('the renamed post keeps its old URL alive', async ({ page }) => {
    // /blog/quality-kilts/ is a client-side redirect kept for the old slug.
    await page.goto('/blog/quality-kilts/')

    await page.waitForURL('**/blog/davison-menswear/')
    await expect(page.locator('h1')).toHaveText(
      'Four Cloudflare Workers and a Kilt Shop',
    )
  })

  for (const { slug, title } of POSTS) {
    test(`${slug} renders with no broken assets`, async ({ page }) => {
      const { consoleErrors, failedRequests, serverErrors } = watch(page)

      const response = await page.goto(`/blog/${slug}/`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveText(title)

      await scrollThrough(page)

      expect(serverErrors, `${slug} requested something missing`).toEqual([])
      expect(failedRequests, `${slug} had a failed request`).toEqual([])
      expect(consoleErrors, `${slug} logged console errors`).toEqual([])
    })
  }

  test('post images actually decode (not just return 200)', async ({
    page,
  }) => {
    await page.goto('/blog/sourdough-journey/')
    await scrollThrough(page)

    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
    )

    expect(broken, 'images that loaded but failed to decode').toEqual([])
  })
})
