import { memo } from 'react'
import { Button } from '@/components/Button'

const WarningIcon = memo(function WarningIcon() {
  return (
    <svg
      className="h-12 w-12 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      role="img"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  )
})

const RetryIcon = memo(function RetryIcon() {
  return (
    <svg
      className="mr-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      role="img"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
})

export const ErrorMessage = memo(function ErrorMessage({
  title = 'Error',
  message = 'Please try again or refresh the page.',
  retry,
  className = '',
}) {
  return (
    <div 
      className={`rounded-2xl bg-white p-6 dark:bg-zinc-800/90 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <WarningIcon />
        <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
        {retry && (
          <div className="mt-6">
            <Button
              variant="secondary"
              onClick={retry}
              className="inline-flex items-center"
              aria-label="Retry the failed operation"
            >
              <RetryIcon />
              <span>Retry Operation</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}) 