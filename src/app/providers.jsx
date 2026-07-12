'use client'

import { useEffect, memo } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import { messages } from '@/data/locales'

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

const MemoizedThemeProvider = memo(function MemoizedThemeProvider({
  children,
}) {
  return (
    <NextIntlClientProvider locale="en" messages={messages} timeZone="Europe/London">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
})

export function Providers({ children }) {
  return <MemoizedThemeProvider>{children}</MemoizedThemeProvider>
}
