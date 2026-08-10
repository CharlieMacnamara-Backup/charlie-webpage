import { getAllArticles } from '@/lib/getAllArticles'

export const dynamic = 'force-static'

const BASE_URL = 'https://charliemacnamara.uk'

export default async function sitemap() {
  const articles = await getAllArticles()

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/portfolio/`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/privacy/`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  ]

  const blogUrls = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}/`,
    lastModified: new Date(article.date),
    priority: 0.7,
    changeFrequency: 'yearly',
  }))

  return [...staticPages, ...blogUrls]
}
