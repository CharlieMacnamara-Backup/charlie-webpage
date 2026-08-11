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
