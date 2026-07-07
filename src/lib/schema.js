const BASE_URL = 'https://charliemacnamara.com'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Charlie Macnamara',
  alternateName: [
    'Charlie McNamara',
    'charlie macnamara',
    'charlie mcnamara',
    'Charliemacnamara',
    'Charliemcnamara',
  ],
  url: BASE_URL,
  jobTitle: 'Technical Writer',
  description:
    'Technical writer making systems and concepts clear and accessible.',
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
  name: 'Charlie Macnamara',
  url: BASE_URL,
  description:
    'Technical writer making systems and concepts clear and accessible.',
}

export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Charlie Macnamara - Blog',
  url: `${BASE_URL}/blog`,
  description:
    'Articles about technical writing, documentation, and software development.',
}
