'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, PhoneIcon } from '@/components/SocialIcons'
import { useTranslations } from 'next-intl'

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

export const Footer = memo(function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 w-full">
      <div className="w-full bg-white dark:bg-zinc-900">
        <Container.Outer>
          <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
            <Container.Inner>
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-6 sm:items-start">
                  <div className="flex gap-6">
                    {[
                      'github',
                      'linkedin',
                      ...(t('phone') ? ['phone'] : []),
                      'email',
                    ].map((key) => {
                      const hrefs = {
                        github: 'https://github.com/CharlieMacnamara',
                        linkedin:
                          'https://www.linkedin.com/in/charliemacnamara/',
                        phone: `tel:${t('phone')}`,
                        email: 'mailto:mail@charliemacnamara.uk',
                      }
                      const icons = {
                        github: GitHubIcon,
                        linkedin: LinkedInIcon,
                        phone: PhoneIcon,
                        email: MailIcon,
                      }
                      const isPhone = key === 'phone'
                      const Icon = icons[key]
                      return (
                        <Link
                          key={key}
                          href={hrefs[key]}
                          className="group relative inline-block"
                          aria-label={t(key)}
                          target={isPhone ? undefined : '_blank'}
                          rel={isPhone ? undefined : 'noopener noreferrer'}
                        >
                          <Icon className="size-6 fill-zinc-500 transition-colors duration-150 ease-in-out group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
                        </Link>
                      )
                    })}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t('copyright', { year })}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-end">
                  <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {t('builtOn')}{' '}
                    </span>
                    {t.raw('tech').map((name, i) => {
                      const hrefs = [
                        'https://nextjs.org',
                        'https://react.dev',
                        'https://tailwindcss.com',
                        'https://aws.amazon.com',
                      ]
                      return (
                        <Link
                          key={name}
                          href={hrefs[i]}
                          className="relative text-sm font-medium text-zinc-600 transition-colors duration-150 ease-in-out hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </Container.Inner>
          </div>
        </Container.Outer>
      </div>
    </footer>
  )
})
