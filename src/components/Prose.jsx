import { memo } from 'react'
import clsx from 'clsx'

export const Prose = memo(function Prose({ className, as: Component = 'div', ...props }) {
  return (
    <Component 
      className={clsx(
        className,
        'prose dark:prose-invert',
        // Base styles
        'prose-zinc max-w-none',
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-semibold',
        
        // Heading styles with consistent line heights
        'prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:leading-tight',
        'prose-h2:mt-12 prose-h2:text-3xl prose-h2:tracking-tight prose-h2:leading-tight',
        'prose-h3:mt-10 prose-h3:text-2xl prose-h3:leading-snug',
        'prose-h4:mt-8 prose-h4:text-xl prose-h4:leading-snug',
        
        // Text styles with improved cross-browser consistency
        'prose-p:my-6 prose-p:leading-7 prose-p:text-zinc-600 dark:prose-p:text-zinc-400',
        'prose-a:font-medium prose-a:text-teal-600 hover:prose-a:text-teal-500 prose-a:no-underline',
        'dark:prose-a:text-teal-400 dark:hover:prose-a:text-teal-300',
        'prose-strong:font-semibold prose-strong:text-zinc-900 dark:prose-strong:text-zinc-200',
        
        // Code styles with better contrast
        'prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5',
        'prose-code:text-zinc-900 prose-code:before:content-none prose-code:after:content-none',
        'dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-200',
        'prose-pre:mt-6 prose-pre:rounded-xl prose-pre:bg-zinc-50 prose-pre:px-6 prose-pre:py-4',
        'dark:prose-pre:bg-zinc-800/80 dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10',
        
        // List styles with consistent spacing
        'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-4 marker:prose-ul:text-zinc-400',
        'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-4 marker:prose-ol:text-zinc-400',
        'prose-li:my-2 prose-li:text-zinc-600 dark:prose-li:text-zinc-400',
        
        // Image styles with consistent loading behavior
        'prose-img:my-8 prose-img:rounded-2xl prose-img:shadow-lg prose-img:ring-1 prose-img:ring-zinc-100',
        'dark:prose-img:shadow-zinc-800/30 dark:prose-img:ring-zinc-700/40',
        
        // Quote styles with consistent borders
        'prose-blockquote:my-6 prose-blockquote:border-l-2 prose-blockquote:border-zinc-300',
        'prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-800/70',
        'dark:prose-blockquote:border-zinc-600/40 dark:prose-blockquote:text-zinc-300/70',
        
        // Table styles with consistent borders
        'prose-table:my-6 prose-table:w-full prose-table:text-sm prose-table:border-collapse',
        'prose-th:border prose-th:border-zinc-200 prose-th:px-4 prose-th:py-2 prose-th:bg-zinc-50',
        'prose-th:font-semibold prose-th:text-zinc-900 dark:prose-th:text-zinc-100 dark:prose-th:bg-zinc-800/50',
        'prose-td:border prose-td:border-zinc-200 prose-td:px-4 prose-td:py-2',
        'dark:prose-td:border-zinc-800',

        // Figure styles with consistent margins
        'prose-figure:my-8 prose-figure:inline-block',
        'prose-figcaption:mt-3 prose-figcaption:text-sm prose-figcaption:text-zinc-500 prose-figcaption:leading-tight',
        
        // Video styles
        'prose-video:my-8 prose-video:rounded-2xl prose-video:shadow-lg'
      )}
      {...props}
    />
  )
})
