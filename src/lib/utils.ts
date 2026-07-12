import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderMarkdownLinks(text: string) {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline decoration-teal-500/60 hover:decoration-teal-500 dark:decoration-teal-400/60 dark:hover:decoration-teal-400">$1</a>',
  )
}
