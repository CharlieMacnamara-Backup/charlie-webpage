import { articleSchema, breadcrumbSchema } from '@/lib/schema'

export function ArticleJsonLd({ article }) {
  const schemas = [articleSchema(article)]

  if (article.slug) {
    schemas.push(
      breadcrumbSchema([
        { name: 'Home', url: 'https://charliemacnamara.com' },
        { name: 'Blog', url: 'https://charliemacnamara.com/blog' },
        {
          name: article.title,
          url: `https://charliemacnamara.com/blog/${article.slug}`,
        },
      ]),
    )
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
