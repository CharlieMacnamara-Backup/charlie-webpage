import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { getTranslations } from 'next-intl/server'

const SocialLink = memo(function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
})

const MailIcon = memo(function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
})

export async function generateMetadata() {
  const t = await getTranslations('about')

  return {
    title: t('title'),
    description: t('description'),
  }
}

const AboutContent = memo(function AboutContent({ t }) {
  return (
    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div className="lg:pl-20">
        <div className="max-w-xs px-2.5 lg:max-w-none">
          <Image
            src={portraitImage}
            alt={t('alt')}
            sizes="(min-width: 1024px) 32rem, 20rem"
            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            priority
          />
        </div>
      </div>
      <div className="lg:order-first lg:row-span-2">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {t('heading')}
        </h1>
        <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          {t.raw('paragraphs').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      <div className="lg:pl-20">
        <ul role="list">
          <SocialLink
            href="https://github.com/CharlieMacnamara"
            icon={GitHubIcon}
            className="mt-4"
          >
            {t('followGitHub')}
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/charliemacnamara/"
            icon={LinkedInIcon}
            className="mt-4"
          >
            {t('followLinkedIn')}
          </SocialLink>
          <SocialLink
            href="mailto:mail@charliemacnamara.uk"
            icon={MailIcon}
            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
          >
            {t('email')}
          </SocialLink>
        </ul>
      </div>
    </div>
  )
})

export default async function About() {
  const t = await getTranslations('about')

  return (
    <Container className="mt-16 sm:mt-32">
      <AboutContent t={t} />
    </Container>
  )
}
