'use client'

import { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { messages } from '@/data/locales'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { MDXContent } from '@/components/MDXContent'

const ArrowLeftIcon = memo(function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 bg-zinc-200/50 dark:bg-zinc-800/50"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full rounded-r-full bg-linear-to-r from-teal-500 to-cyan-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

function ArticleMeta({ article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
      {article.author && (
        <span className="inline-flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="5"
              r="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M2 14c0-3.5 2.5-6 6-6s6 2.5 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {article.author}
        </span>
      )}
      {article.date && (
        <time
          dateTime={article.date}
          className="inline-flex items-center gap-1.5"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="3"
              width="12"
              height="11"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M2 6.5h12M5.5 1v2.5M10.5 1v2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {formatDate(article.date)}
        </time>
      )}
    </div>
  )
}

export const ArticleLayout = memo(function ArticleLayout({
  children,
  article,
  isRssFeed = false,
}) {
  if (isRssFeed) {
    return children
  }

  return (
    <>
      <ReadingProgress />
      <Container className="mt-8 lg:mt-16">
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/blog"
            aria-label={messages.articleLayout.returnToBlog}
            className={clsx(
              'group absolute -left-2 -top-8 flex h-10 w-10 items-center justify-center',
              'rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5',
              'transition-all duration-200 motion-safe:hover:-translate-x-1 motion-safe:hover:shadow-lg',
              'dark:bg-zinc-800 dark:ring-white/10 dark:hover:ring-white/20',
              'sm:-left-6 lg:-left-8',
            )}
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
          </Link>

          <article className="relative">
            <header className="space-y-6 border-b border-zinc-200 pb-8 dark:border-zinc-700/40">
              <div className="space-y-4">
                <h1 className="bg-linear-to-r from-zinc-800 to-zinc-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:to-zinc-400 sm:text-5xl">
                  {article.title}
                </h1>
              </div>
              <ArticleMeta article={article} />
              {article.description && (
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {article.description}
                </p>
              )}
            </header>

            <Prose className="mt-8 sm:mt-10">
              <MDXContent>{children}</MDXContent>
            </Prose>
          </article>
        </div>
      </Container>
    </>
  )
})
