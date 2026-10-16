import { memo } from 'react'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { getTranslations } from 'next-intl/server'

import { ContactForm } from './ContactForm'

const CheckIcon = memo(function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a.75.75 0 0 1 .006 1.06l-7.5 7.75a.75.75 0 0 1-1.08-.006l-3.75-3.9a.75.75 0 1 1 1.084-1.038l3.212 3.34 6.966-7.2a.75.75 0 0 1 1.062-.006Z"
        clipRule="evenodd"
      />
    </svg>
  )
})

const linkClassName =
  'font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300'

export async function generateMetadata() {
  const t = await getTranslations('contact')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ContactPage() {
  const t = await getTranslations('contact')
  const includes = t.raw('includes')
  const proofSites = t.raw('proofSites')
  const steps = t.raw('steps')
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
          {t('eyebrow')}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="mt-4 text-lg/8 text-zinc-600 dark:text-zinc-400">
          {t('intro')}
        </p>
        <p className="mt-4 text-base/7 text-zinc-600 dark:text-zinc-400">
          {t.rich('pricing', {
            price: (chunks) => (
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {chunks}
              </span>
            ),
          })}
        </p>
      </header>

      <section className="mt-12 lg:mt-16">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {t('includesHeading')}
        </h2>
        <ul
          role="list"
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-12 lg:grid-cols-3"
        >
          {includes.map((item) => (
            <li key={item.title} className="flex gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm/6 text-zinc-600 dark:text-zinc-400">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {t('proofHeading')}
          </h2>
          <ul
            role="list"
            className="mt-6 list-disc space-y-2 pl-5 text-sm/6 text-zinc-600 dark:text-zinc-400"
          >
            {proofSites.map((site) => (
              <li key={site.name}>
                {site.href.startsWith('/') ? (
                  <Link href={site.href} className={linkClassName}>
                    {site.name}
                  </Link>
                ) : (
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {site.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {t('stepsHeading')}
          </h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span
                  className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <p className="text-sm/6 text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {step.title}
                  </span>
                  {' — '}
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-700/40 dark:bg-zinc-800/40">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {t('form.heading')}
            </h2>
            <p className="mt-1 text-sm/6 text-zinc-600 dark:text-zinc-400">
              {t('form.intro')}
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
            <p className="mt-4 text-sm/6 text-zinc-500 dark:text-zinc-400">
              {t('form.reassurance')}
            </p>
          </div>
          {bookingUrl ? (
            <p className="mt-2 text-sm/6 text-zinc-600 dark:text-zinc-400">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {t('form.booking')}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
