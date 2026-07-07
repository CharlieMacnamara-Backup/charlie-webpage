import { memo } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const ChevronRightIcon = memo(function ChevronRightIcon(props) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      fill="none" 
      aria-hidden="true" 
      role="img"
      {...props}
    >
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

export const Card = memo(function Card({ as: Component = 'div', className, children }) {
  return (
    <Component
      className={clsx(
        className,
        'group relative flex flex-col items-start',
        'rounded-2xl p-6',
        'bg-white ring-2 ring-zinc-200/50 transition-all duration-200',
        'hover:bg-zinc-50 hover:ring-zinc-300/70 hover:shadow-lg',
        'dark:bg-zinc-800/40 dark:ring-zinc-700/40',
        'dark:hover:bg-zinc-800/60 dark:hover:ring-zinc-700'
      )}
      role={Component === 'article' ? 'article' : undefined}
    >
      {children}
    </Component>
  )
})

Card.Link = memo(function CardLink({ children, ...props }) {
  return (
    <>
      <div 
        className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50/70 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/70 sm:-inset-x-6 sm:rounded-2xl" 
        aria-hidden="true"
      />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
})

Card.Title = memo(function CardTitle({ as: Component = 'h2', href, children }) {
  return (
    <Component className="text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-teal-600 dark:text-zinc-100 dark:group-hover:text-teal-400">
      {href ? (
        <Card.Link href={href} aria-label={`Read more about ${children}`}>
          {children}
        </Card.Link>
      ) : children}
    </Component>
  )
})

Card.Description = memo(function CardDescription({ children }) {
  return (
    <p className="relative z-10 mt-3 text-sm text-zinc-700 transition-colors group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-300">
      {children}
    </p>
  )
})

Card.Cta = memo(function CardCta({ children }) {
  return (
    <div
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-600 transition-colors group-hover:text-teal-700 dark:text-teal-400 dark:group-hover:text-teal-300"
    >
      <span className="sr-only">Click to </span>
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </div>
  )
})

Card.Eyebrow = memo(function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
})
