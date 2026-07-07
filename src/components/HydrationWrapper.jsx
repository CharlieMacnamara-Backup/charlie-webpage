'use client'

import { useEffect, useState, Fragment } from 'react'

export function HydrationWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Use requestAnimationFrame to ensure we're in a browser environment
    const frame = requestAnimationFrame(() => {
      setIsMounted(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  // During SSR and initial client render, return a hidden placeholder
  if (!isMounted) {
    return (
      <div style={{ visibility: 'hidden' }} aria-hidden="true">
        <Fragment key="hydrating">{children}</Fragment>
      </div>
    )
  }

  // Once mounted on client, render children normally
  return <Fragment key="hydrated">{children}</Fragment>
} 