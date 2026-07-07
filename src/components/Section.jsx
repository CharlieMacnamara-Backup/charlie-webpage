import { useId } from 'react'
import { memo } from 'react'

export const Section = memo(function Section({ 
  title, 
  children,
  description,
  className = ''
}) {
  const id = useId()
  const headingId = `section-heading-${id}`
  const contentId = `section-content-${id}`

  return (
    <section
      aria-labelledby={headingId}
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-none grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <h2
            id={headingId}
            className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
          >
            {title}
          </h2>
          {description && (
            <p 
              className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
              id={`${headingId}-description`}
            >
              {description}
            </p>
          )}
        </div>
        <div 
          className="md:col-span-3"
          id={contentId}
          aria-labelledby={headingId}
          {...(description && { 'aria-describedby': `${headingId}-description` })}
        >
          {children}
        </div>
      </div>
    </section>
  )
})
