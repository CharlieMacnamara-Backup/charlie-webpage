import { memo } from 'react'
import clsx from 'clsx'

export const Loading = memo(function Loading({ 
  size = 'md', 
  className,
  fullScreen = false,
  text = 'Loading...',
  description = 'Please wait.'
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const spinner = (
    <div 
      className={clsx('relative', className)}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div 
        className={clsx(
          'animate-spin rounded-full border-2 border-current border-t-transparent text-teal-500',
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">
        {text}
      </span>
    </div>
  )

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-zinc-50/90 dark:bg-zinc-900/90"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loading-title"
        aria-describedby="loading-description"
      >
        <div className="text-center">
          {spinner}
          {text && (
            <h2 
              id="loading-title"
              className="mt-4 text-base font-medium text-zinc-900 dark:text-zinc-100"
            >
              {text}
            </h2>
          )}
          {description && (
            <p 
              id="loading-description"
              className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }

  return spinner
}) 