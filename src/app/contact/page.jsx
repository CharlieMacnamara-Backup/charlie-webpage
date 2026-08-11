import Link from 'next/link'

import { Container } from '@/components/Container'
import { getTranslations } from 'next-intl/server'

import { ContactForm } from './ContactForm'

export async function generateMetadata() {
  const t = await getTranslations('contact')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ContactPage() {
  const t = await getTranslations('contact')
  const features = t.raw('features')

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="mt-4 text-base/7 text-zinc-600 dark:text-zinc-400">
          {t('intro')}
        </p>

        <ul className="mt-8 space-y-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="text-sm/6 text-zinc-600 dark:text-zinc-400"
            >
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </span>
              {' — '}
              {feature.body}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm/6 text-zinc-600 dark:text-zinc-400">
          {t.rich('testimonial', {
            qualityKilts: (chunks) => (
              <a
                href="https://qualitykilts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {chunks}
              </a>
            ),
            sicamon: (chunks) => (
              <a
                href="https://sicamon.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {chunks}
              </a>
            ),
            thisSite: (chunks) => (
              <Link
                href="/"
                className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <p className="mt-4 text-sm/6 text-zinc-600 dark:text-zinc-400">
          {t('ctaPrompt')}
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}
