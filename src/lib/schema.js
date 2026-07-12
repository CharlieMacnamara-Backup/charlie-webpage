import { messages } from '@/data/locales'

const BASE_URL = 'https://charliemacnamara.uk'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: messages.schema.personName,
  givenName: 'Charlie',
  familyName: 'Macnamara',
  alternateName: [
    'Charlie McNamara',
    'charlie macnamara',
    'charlie mcnamara',
    'Charliemacnamara',
    'Charliemcnamara',
    'Charles Macnamara',
    'Charles McNamara',
    'charlie-macnamara',
    'charlie-mcnamara',
  ],
  disambiguatingDescription:
    'Technical writer and web developer based in Edinburgh, Scotland.',
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
  alternateName: [
    'Charlie McNamara',
    'charlie macnamara',
    'charlie mcnamara',
    'Charliemacnamara',
    'Charliemcnamara',
  ],
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

export function articleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}/blog/${article.slug}`,
    author: {
      '@type': 'Person',
      name: article.author || 'Charlie Macnamara',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Charlie Macnamara',
      url: BASE_URL,
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
