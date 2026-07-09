import { messages } from '@/data/locales'

const BASE_URL = 'https://charliemacnamara.com'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: messages.schema.personName,
  alternateName: [
    'Charlie McNamara',
    'charlie macnamara',
    'charlie mcnamara',
    'Charliemacnamara',
    'Charliemcnamara',
  ],
  url: BASE_URL,
  jobTitle: messages.schema.jobTitle,
  description: messages.schema.personDescription,
  sameAs: [
    'https://github.com/CharlieMacnamara',
    'https://www.linkedin.com/in/charliemacnamara/',
  ],
  knowsAbout: [
    'Technical Writing',
    'Documentation',
    'Web Development',
    'API Documentation',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: messages.schema.websiteName,
  url: BASE_URL,
  description: messages.schema.websiteDescription,
}

export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: messages.schema.blogName,
  url: `${BASE_URL}/blog`,
  description: messages.schema.blogDescription,
}
