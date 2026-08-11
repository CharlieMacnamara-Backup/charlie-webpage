'use client'

import { useMemo } from 'react'
import { renderMermaidSVG } from 'beautiful-mermaid'

import { messages } from '@/data/locales'

export default function Diagram({ definition, caption }) {
  const { svg, error } = useMemo(() => {
    try {
      const svg = renderMermaidSVG(definition, {
        bg: 'transparent',
        fg: 'var(--diagram-fg)',
        accent: 'var(--diagram-accent)',
        muted: 'var(--diagram-muted)',
        surface: 'var(--diagram-surface)',
        border: 'var(--diagram-border)',
        font: "'Geist Variable', sans-serif",
        padding: 48,
        nodeSpacing: 32,
        layerSpacing: 48,
        thoroughness: 7,
        transparent: true,
      })
      return { svg, error: null }
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  }, [definition])

  if (error) {
    return (
      <div className="my-8 rounded-xl bg-amber-50 border border-amber-200 p-4 shadow-xs dark:bg-amber-900/10 dark:border-amber-700/30">
        <div className="flex items-center">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-amber-600 dark:text-amber-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-600">
              {messages.diagram.failedToRender}
            </h3>
            <div className="mt-1 text-sm text-amber-700 dark:text-amber-500">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <figure className="not-prose my-8 w-full">
      <div className="flex justify-center overflow-x-auto overflow-y-visible rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 shadow-xs p-6">
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-zinc-600 text-center italic dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
