export const dynamic = 'force-static'

const BASE_URL = 'https://charliemacnamara.com'

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/blog/davison-menswear`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'yearly',
    },
    {
      url: `${BASE_URL}/blog/sourdough-journey`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'yearly',
    },
    {
      url: `${BASE_URL}/blog/markdown-cv`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'yearly',
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly',
    },
  ]
}
