import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Photos } from '@/components/Photos'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'

// Critical images loaded immediately
import logoEVORA from '@/images/logos/evora_global_logo.svg'
import logoTransloadit from '@/images/logos/transloadit.svg'
import logoFreelance from '@/images/logos/freelance.svg'

import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'
import { getTranslations } from 'next-intl/server'

const BriefcaseIcon = memo(function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
})

const ArrowDownIcon = memo(function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const Article = memo(function Article({ article, readArticleLabel }) {
  return (
    <Card as="article">
      <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>{readArticleLabel}</Card.Cta>
    </Card>
  )
})

const SocialLink = memo(function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
})

const Resume = memo(function Resume({ labels, entries }) {
  const resume = entries

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-700/40 dark:bg-zinc-800/90">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{labels.experience}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-700 dark:ring-white/10">
              <Image
                src={role.logo}
                alt={labels.companyLogoAlt.replace('{company}', role.company)}
                className="h-7 w-7"
                loading="lazy"
              />
            </div>
            <dl className="flex flex-auto flex-wrap items-center gap-x-2">
              <div className="flex-1">
                <dt className="sr-only">{labels.srCompany}</dt>
                <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
                {role.title && (
                  <>
                    <dt className="sr-only">{labels.srRole}</dt>
                    <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                      {role.title}
                    </dd>
                  </>
                )}
              </div>
              <dt className="sr-only">{labels.srDate}</dt>
              <dd
                className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
                aria-label={labels.dateAriaLabel
                  .replace('{start}', role.start)
                  .replace('{end}', role.end)}
              >
                <time dateTime={role.start}>{role.start}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end}>{role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/charlie-macnamara-resume.pdf"
        download="charlie-macnamara-resume.pdf"
        className="group mt-6 w-full"
        aria-label={labels.downloadCvAriaLabel}
      >
        {labels.downloadCv}
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
})

export default async function Home() {
  const articles = await getAllArticles()
  const t = await getTranslations('home')

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {t('heading')}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {t('tagline')}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/CharlieMacnamara"
              aria-label={t('githubAriaLabel')}
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/charliemacnamara/"
              aria-label={t('linkedinAriaLabel')}
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article
                key={article.slug}
                article={article}
                readArticleLabel={t('readArticle')}
              />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume
              labels={{
                experience: t('experience'),
                downloadCv: t('downloadCv'),
                downloadCvAriaLabel: t('downloadCvAriaLabel'),
                srCompany: t('srCompany'),
                srRole: t('srRole'),
                srDate: t('srDate'),
                dateAriaLabel: t.raw('dateAriaLabel'),
                companyLogoAlt: t.raw('companyLogoAlt'),
              }}
              entries={t.raw('resume').map((entry, i) => ({
                ...entry,
                logo: [logoFreelance, logoEVORA, logoTransloadit][i],
              }))}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
