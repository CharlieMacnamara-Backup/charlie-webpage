export const dynamic = 'force-static'

const BASE_URL = 'https://charliemacnamara.com'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
