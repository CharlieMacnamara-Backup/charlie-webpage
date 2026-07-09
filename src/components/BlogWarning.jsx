import React from 'react'
import { messages } from '@/data/locales'

/**
 * A reusable warning component for blog posts that ensures proper HTML structure.
 * This prevents nested paragraph issues that cause hydration errors.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to display in the warning
 * @param {string} props.type - The type of warning ('note', 'warning', 'wip')
 * @returns {JSX.Element}
 */
export function BlogWarning({ children, type = 'note' }) {
  let icon = '⚠️'
  let title = messages.blogWarning.note

  if (type === 'warning') {
    icon = '🚫'
    title = messages.blogWarning.warning
  } else if (type === 'wip') {
    icon = '🚧'
    title = messages.blogWarning.workInProgress
  }

  return (
    <div className="my-8 p-4 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
      <div className="flex items-start">
        <span className="mr-2 text-amber-800 font-medium">{icon}</span>
        <div className="text-amber-800 font-medium">
          <strong>{title}</strong> - {children}
        </div>
      </div>
    </div>
  )
}
