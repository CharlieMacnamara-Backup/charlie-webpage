import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'
import { ClientArticles } from './ClientArticles'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('blog')

  return {
    title: t('title'),
    description: t('description'),
  }
}

// Force static generation
export const dynamic = 'force-static'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex() {
  const articles = getAllArticles()

  // Debug output during build
  console.log('Articles discovered:', articles.length)
  articles.forEach((article) => {
    console.log(`- ${article.slug}: ${article.title} (${article.date})`)
  })

  // Use ClientArticles component which handles both CSR and SSR
  return <ClientArticles initialArticles={articles} />
}
