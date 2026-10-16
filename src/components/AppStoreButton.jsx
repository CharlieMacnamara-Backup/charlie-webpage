'use client'

import { memo } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const AppStoreButton = memo(function AppStoreButton({
  href,
  className,
  size = 'default',
  ...props
}) {
  const t = useTranslations('appStoreButton')

  const sizes = {
    small: 'h-10 min-w-[120px]',
    default: 'h-12 min-w-[140px]',
    large: 'h-14 min-w-[160px]',
  }

  const textSizes = {
    small: { sub: 'text-[8px]', main: 'text-xs' },
    default: { sub: 'text-[9px]', main: 'text-sm' },
    large: { sub: 'text-[10px]', main: 'text-base' },
  }

  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-black px-4 py-2 transition-all hover:border-zinc-400 hover:bg-zinc-900 active:scale-[0.98] dark:border-zinc-700 dark:hover:border-zinc-600',
        sizes[size],
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <svg
        className={clsx(
          'flex-shrink-0',
          size === 'small'
            ? 'h-6 w-6'
            : size === 'large'
              ? 'h-9 w-9'
              : 'h-7 w-7',
        )}
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col items-start leading-none">
        <span className={clsx('text-zinc-400', textSizes[size].sub)}>
          {t('downloadOn')}
        </span>
        <span
          className={clsx('font-semibold text-white', textSizes[size].main)}
        >
          {t('appStore')}
        </span>
      </div>
    </Link>
  )
})
