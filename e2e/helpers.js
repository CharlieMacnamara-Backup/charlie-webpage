// Shared fixtures and expectations for the E2E suite.

// Every rendered route, with the exact <h1> it must show.
const PAGES = [
  {
    name: 'home',
    path: '/',
    h1: 'Technical Writer, Web Enthusiast, Amateur Baker',
  },
  {
    name: 'about',
    path: '/about/',
    h1: 'Charlie Macnamara — Edinburgh, Scotland.',
  },
  { name: 'blog index', path: '/blog/', h1: 'Beyond Work' },
  { name: 'portfolio', path: '/portfolio/', h1: 'Selected Works' },
  { name: 'privacy', path: '/privacy/', h1: 'Privacy Policy' },
  { name: 'contact', path: '/contact/', h1: 'Websites that win customers' },
]

// Published posts only. `loquena-app` is a draft (page.dev.md) and must stay hidden.
const POSTS = [
  {
    slug: 'davison-menswear',
    title: 'Four Cloudflare Workers and a Kilt Shop',
  },
  { slug: 'markdown-cv', title: 'Markdown CV Generator' },
  { slug: 'sourdough-journey', title: 'Unconventional Sourdough' },
]

// Assets the contact page's success path posts to - mocked in tests so no real
// email is ever sent from the suite.
const CONTACT_ENDPOINT = '**/api/contact'

/**
 * Collect console errors, failed requests and any response >= 400 for a page,
 * so a test can assert the page loaded with nothing broken (missing images,
 * 404 chunks, runtime errors).
 */
function watch(page) {
  const consoleErrors = []
  const failedRequests = []
  const serverErrors = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? 'unknown'
    // Next.js prefetches routes on hover/viewport and aborts them again once a
    // navigation supersedes them. Aborted requests are cancellations, not
    // broken assets, so they are not counted.
    if (failure === 'net::ERR_ABORTED') return
    failedRequests.push(`FAILED ${request.url()} (${failure})`)
  })
  page.on('response', (response) => {
    if (response.status() >= 400) {
      serverErrors.push(`${response.status()} ${response.url()}`)
    }
  })

  return { consoleErrors, failedRequests, serverErrors }
}

/**
 * Trigger lazy-loaded images by walking down the page, then give them a moment
 * to settle so the response watcher has seen every request.
 */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const step = () => {
        y += window.innerHeight
        window.scrollTo(0, y)
        if (y < document.body.scrollHeight) {
          setTimeout(step, 60)
        } else {
          window.scrollTo(0, 0)
          setTimeout(resolve, 300)
        }
      }
      step()
    })
  })
}

module.exports = { PAGES, POSTS, CONTACT_ENDPOINT, watch, scrollThrough }
