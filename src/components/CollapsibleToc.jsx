'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

// Client component that completely avoids any server rendering
export default function ClientToc({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="mt-0 mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-xs">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return children
}

// Utility function to create slug IDs from text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Create a simplified, error-resistant TOC component
export function TableOfContents() {
  const [sections, setSections] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      // Ensure we're in the browser
      if (typeof window === 'undefined') return

      // Function to process headings
      const processHeadings = () => {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
        if (!headings || headings.length === 0) return

        const processedSections = []
        let currentSection = null

        for (const heading of headings) {
          const title = heading.textContent || ''
          if (!title || title === 'Table of Contents') continue

          const id = heading.id || slugify(title)
          if (!heading.id) heading.id = id

          if (heading.tagName === 'H2') {
            if (currentSection) processedSections.push(currentSection)
            currentSection = { title, id, subsections: [] }
          } else if (heading.tagName === 'H3' && currentSection) {
            currentSection.subsections.push({ title, id })
          }
        }

        if (currentSection) processedSections.push(currentSection)
        setSections(processedSections)
      }

      // Process headings after a small delay to ensure DOM is ready
      const timer = setTimeout(processHeadings, 100)
      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error in TOC generation:', error)
    }
  }, [])

  // Show placeholder during SSR/mounting
  if (!mounted) {
    return (
      <div className="mt-0 mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-xs">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  // Don't render anything if no sections found
  if (!sections || sections.length === 0) {
    return null
  }

  // Function for smooth scrolling
  const handleClick = (e, id) => {
    e.preventDefault()
    try {
      const element = document.getElementById(id)
      if (element) {
        const offset = 80
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        })
      }
    } catch (error) {
      console.error('Error scrolling to section:', error)
    }
  }

  return (
    <nav className="mt-0 mb-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-xs">
      <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Table of Contents
      </h2>

      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="mb-2">
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className="block py-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-teal-500 dark:hover:text-teal-400"
            >
              {section.title}
            </a>

            {section.subsections.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {section.subsections.map((subsection) => (
                  <a
                    key={subsection.id}
                    href={`#${subsection.id}`}
                    onClick={(e) => handleClick(e, subsection.id)}
                    className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
                  >
                    {subsection.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
