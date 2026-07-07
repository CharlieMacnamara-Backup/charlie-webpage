'use client'

import { createContext, useEffect, memo } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

const ThemeWatcher = memo(function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      const systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
})

const MemoizedThemeProvider = memo(function MemoizedThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  )
})

export function Providers({ children }) {
  return (
    <MemoizedThemeProvider>
      {children}
    </MemoizedThemeProvider>
  )
}
