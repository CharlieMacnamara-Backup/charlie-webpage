'use client'

import { useState, useCallback } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'
import { glossary } from '../data/glossary.js'

export function Definition({ term, children, className }) {
  const entry = glossary[term]
  const [open, setOpen] = useState(false)

  if (!entry) return children

  const handlePointerDown = useCallback((e) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }, [])

  const handlePointerDownOutside = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <TooltipPrimitive.Provider delayDuration={0} skipDelayDuration={0}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <span
            tabIndex={0}
            onPointerDown={handlePointerDown}
            className={cn(
              'cursor-pointer border-b-2 border-dotted border-teal-500/50 hover:border-teal-500 dark:border-teal-400/40 dark:hover:border-teal-400 text-teal-700 dark:text-teal-300 transition-colors',
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
            onPointerDownOutside={handlePointerDownOutside}
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
