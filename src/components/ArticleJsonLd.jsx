import { messages } from '@/data/locales'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'

export function ArticleJsonLd({ article }) {
  const schemas = [articleSchema(article)]

  if (article.slug) {
    schemas.push(
      breadcrumbSchema([
        {
          name: messages.schema.breadcrumbHome,
          url: 'https://charliemacnamara.uk',
        },
        {
          name: messages.schema.breadcrumbBlog,
          url: 'https://charliemacnamara.uk/blog',
        },
        {
          name: article.title,
          url: `https://charliemacnamara.uk/blog/${article.slug}`,
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
