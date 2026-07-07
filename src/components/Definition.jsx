'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'
import { glossary } from '../data/glossary.js'

export function Definition({ term, children, className }) {
  const entry = glossary[term]
  if (!entry) return children

  return (
    <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span
            className={cn(
              'cursor-help border-b border-dotted border-zinc-300 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-400 transition-colors',
              className,
            )}
          >
            {children}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            align="center"
            sideOffset={6}
            className="z-50 max-w-xs rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          >
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {entry.term}
            </span>
            <span className="mt-1 block leading-relaxed text-zinc-500 dark:text-zinc-400">
              {entry.definition}
            </span>
            <TooltipPrimitive.Arrow className="fill-white dark:fill-zinc-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
