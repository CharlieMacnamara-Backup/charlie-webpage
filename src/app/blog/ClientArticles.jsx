'use client'

import { Suspense, memo } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { formatDate } from '@/lib/formatDate'
import { useTranslations } from 'next-intl'

const ArticleSkeleton = memo(function ArticleSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 ring-2 ring-zinc-200/50 dark:bg-zinc-800/40 dark:ring-zinc-700/40">
      <div className="mb-3 h-4 w-24 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      <div className="mb-2 h-6 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-700/50" />
        <div className="h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-700/50" />
      </div>
      <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
})

const Article = memo(function Article({
  article,
  isLast,
  lastElementRef,
  readArticleLabel,
}) {
  const articleRef = isLast ? lastElementRef : null

  return (
    <article ref={articleRef}>
      <Card>
        <Card.Eyebrow as="time" dateTime={article.date} decorate>
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Description>{article.description}</Card.Description>
        <div className="relative z-10 mt-2 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {article.readingTime}
          </span>
        </div>
        <Card.Cta>{readArticleLabel}</Card.Cta>
      </Card>
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
      <div className="flex flex-col items-center py-16 text-center">
        <svg
          className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6h16M4 12h16M4 18h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {t('noArticles')}
        </p>
      </div>
    )
  }

  return (
    <div className="flex max-w-3xl flex-col space-y-10">
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
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <ArticleSkeleton key={i} />
          ))}
        </div>
      )}
      {!hasMore && articles.length > 0 && (
        <p className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
          {t('noMore')}
        </p>
      )}
    </div>
  )
})

function ArticlesLoading({ t }) {
  return (
    <div className="flex max-w-3xl flex-col space-y-10">
      {[1, 2, 3].map((i) => (
        <ArticleSkeleton key={i} />
      ))}
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
