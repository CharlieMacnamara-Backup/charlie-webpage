'use client'

import { useState, useEffect, useRef } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function TableOfContents({
  title = 'On this page',
  className = '',
}) {
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    setIsDesktop(window.innerWidth >= 768)

    const timer = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'))
      if (!headings.length) return

      const processed = []
      let current = null

      for (const heading of headings) {
        const text = heading.textContent || ''
        if (!text || text === 'Table of Contents' || text === 'On this page')
          continue

        const id = heading.id || slugify(text)
        if (!heading.id) heading.id = id

        if (heading.tagName === 'H2') {
          if (current) processed.push(current)
          current = { id, title: text, subsections: [] }
        } else if (heading.tagName === 'H3' && current) {
          current.subsections.push({ id, title: text })
        }
      }
      if (current) processed.push(current)
      setSections(processed)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted || !sections.length) return

    const allIds = sections.flatMap((s) => [
      s.id,
      ...s.subsections.map((sub) => sub.id),
    ])
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )

    for (const el of elements) observerRef.current.observe(el)
    return () => observerRef.current?.disconnect()
  }, [mounted, sections])

  const handleClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return (
      <div
        className={clsx(
          'mb-4 rounded-lg border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-700/40 dark:bg-zinc-900/70',
          className,
        )}
      >
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    )
  }

  if (!sections.length) return null

  return (
    <Disclosure defaultOpen={isDesktop}>
      {({ open }) => (
        <div
          className={clsx(
            'mb-4 rounded-lg border border-zinc-200 bg-white shadow-xs dark:border-zinc-700/40 dark:bg-zinc-900/70',
            className,
          )}
        >
          <Disclosure.Button className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:text-zinc-300">
            <span>{title}</span>
            <ChevronDownIcon
              className={clsx(
                'h-4 w-4 text-zinc-400 transition-transform duration-200',
                open && 'rotate-180',
              )}
            />
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition-all duration-200 ease-out"
            enterFrom="translate-y-1 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-all duration-150 ease-in"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-1 opacity-0"
          >
            <Disclosure.Panel className="px-3 pb-3">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <div key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleClick(e, section.id)}
                      className={clsx(
                        'block rounded px-2 py-1 text-sm transition-colors',
                        activeId === section.id
                          ? 'font-medium text-teal-500'
                          : 'text-zinc-700 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-400',
                      )}
                    >
                      {section.title}
                    </a>
                    {section.subsections.length > 0 && (
                      <div className="ml-4 space-y-0.5">
                        {section.subsections.map((sub) => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            onClick={(e) => handleClick(e, sub.id)}
                            className={clsx(
                              'block rounded px-2 py-1 text-xs transition-colors',
                              activeId === sub.id
                                ? 'font-medium text-teal-500'
                                : 'text-zinc-500 hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400',
                            )}
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
