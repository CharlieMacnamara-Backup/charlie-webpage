'use client'

import { Suspense, memo } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Loading } from '@/components/Loading'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { formatDate } from '@/lib/formatDate'
import { useTranslations } from 'next-intl'

const Article = memo(function Article({
  article,
  isLast,
  lastElementRef,
  readArticleLabel,
}) {
  const articleRef = isLast ? lastElementRef : null

  return (
    <article
      ref={articleRef}
      className="md:grid md:grid-cols-4 md:items-baseline"
    >
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
        <Card.Cta>{readArticleLabel}</Card.Cta>
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
})

const ArticlesList = memo(function ArticlesList({ articles, t }) {
  const {
    displayedItems,
    isLoading: isLoadingMore,
    hasMore,
    lastElementRef,
  } = useInfiniteScroll({
    items: articles,
    itemsPerPage: 5,
  })

  if (!articles?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400">{t('noArticles')}</p>
      </div>
    )
  }

  return (
    <div className="flex max-w-3xl flex-col space-y-16">
      {displayedItems.map((article, index) => (
        <Article
          key={article.slug}
          article={article}
          isLast={index === displayedItems.length - 1}
          lastElementRef={lastElementRef}
          readArticleLabel={t('readArticle')}
        />
      ))}
      {isLoadingMore && (
        <div className="py-4 text-center">
          <Loading size="sm" text={t('loadingMore')} />
        </div>
      )}
      {!hasMore && articles.length > 0 && (
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {t('noMore')}
        </p>
      )}
    </div>
  )
})

function ArticlesLoading({ t }) {
  return (
    <div className="flex justify-center py-12">
      <Loading text={t('loading')} />
    </div>
  )
}

export function ClientArticles({ initialArticles }) {
  const t = useTranslations('blog')

  return (
    <SimpleLayout title={t('pageTitle')} intro={t('pageIntro')}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <Suspense fallback={<ArticlesLoading t={t} />}>
          <ArticlesList articles={initialArticles} t={t} />
        </Suspense>
      </div>
    </SimpleLayout>
  )
}
