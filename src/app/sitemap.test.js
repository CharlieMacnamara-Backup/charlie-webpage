import { describe, it, expect, beforeAll } from 'vitest'

import sitemap from './sitemap'
import { getAllArticles } from '@/lib/getAllArticles'

const BASE_URL = 'https://charliemacnamara.uk'

const VALID_CHANGE_FREQUENCIES = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
]

let entries

beforeAll(async () => {
  entries = await sitemap()
})

describe('sitemap', () => {
  it('emits every route including static pages and blog posts', () => {
    const urls = entries.map((entry) => entry.url)
    expect(urls).toContain(BASE_URL)
    expect(urls).toContain(`${BASE_URL}/about/`)
    expect(urls).toContain(`${BASE_URL}/blog/`)
    expect(urls).toContain(`${BASE_URL}/portfolio/`)
    expect(urls).toContain(`${BASE_URL}/contact/`)
    expect(urls).toContain(`${BASE_URL}/privacy/`)
  })

  it('adds a trailing slash to every non-root URL (matches trailingSlash: true)', () => {
    const nonRoot = entries.filter((entry) => entry.url !== BASE_URL)
    expect(nonRoot.length).toBeGreaterThan(0)

    for (const entry of nonRoot) {
      expect(
        entry.url.endsWith('/'),
        `${entry.url} must end with a trailing slash`,
      ).toBe(true)
    }
  })

  it('keeps the root URL slash-free', () => {
    const root = entries.find((entry) => entry.url === BASE_URL)
    expect(root).toBeTruthy()
  })

  it('never emits double slashes in the path', () => {
    for (const entry of entries) {
      const path = new URL(entry.url).pathname
      expect(
        path.includes('//'),
        `${entry.url} path must not contain a double slash`,
      ).toBe(false)
    }
  })

  it('emits a URL for every published blog article, with trailing slash', () => {
    const articles = getAllArticles()
    const urls = entries.map((entry) => entry.url)

    expect(articles.length).toBeGreaterThan(0)
    for (const article of articles) {
      expect(urls).toContain(`${BASE_URL}/blog/${article.slug}/`)
    }
  })

  it('emits valid sitemap metadata for every entry', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\//)
      expect(entry.lastModified).toBeInstanceOf(Date)
      expect(entry.priority).toBeGreaterThan(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
      expect(VALID_CHANGE_FREQUENCIES).toContain(entry.changeFrequency)
    }
  })
})
