'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  generateSessionId,
  calculateTimeOnPage,
  isBounce,
} from '@/lib/analytics'

export function Analytics() {
  const sessionIdRef = useRef('')
  const pageViewsRef = useRef(0)
  const startTimeRef = useRef(0)
  const hasSentBounceRef = useRef(false)

  const sendToAnalyticsEndpoint = useCallback((type, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${type}:`, data)
    }
  }, [])

  const trackEngagement = useCallback(() => {
    if (hasSentBounceRef.current) return

    const timeOnPage = calculateTimeOnPage(startTimeRef.current)
    const bounce = isBounce(timeOnPage, pageViewsRef.current)

    sendToAnalyticsEndpoint('engagement', {
      sessionId: sessionIdRef.current,
      pagePath: window.location.pathname,
      referrer: document.referrer || 'direct',
      timeOnPage,
      bounce,
      timestamp: Date.now(),
    })
    hasSentBounceRef.current = true
  }, [sendToAnalyticsEndpoint])

  useEffect(() => {
    sessionIdRef.current = generateSessionId()
    pageViewsRef.current = 1
    startTimeRef.current = Date.now()

    const trackWebVitals = () => {
      try {
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
          const navigation = performance.getEntriesByType('navigation')[0]
          if (navigation) {
            const ttfb = navigation.responseStart - navigation.requestStart
            sendToAnalyticsEndpoint('webvital', {
              id: `ttfb-${Date.now()}`,
              name: 'TTFB',
              value: ttfb,
              rating:
                ttfb < 800
                  ? 'good'
                  : ttfb < 1800
                    ? 'needs-improvement'
                    : 'poor',
              delta: 0,
              navigationType: navigation.type,
            })
          }

          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1]
              sendToAnalyticsEndpoint('webvital', {
                id: `lcp-${Date.now()}`,
                name: 'LCP',
                value: lastEntry.startTime,
                rating:
                  lastEntry.startTime < 2500
                    ? 'good'
                    : lastEntry.startTime < 4000
                      ? 'needs-improvement'
                      : 'poor',
                delta: 0,
                navigationType: 'navigate',
              })
            })
            lcpObserver.observe({
              entryTypes: ['largest-contentful-paint'],
            })
          } catch {}

          if (
            PerformanceObserver.supportedEntryTypes?.includes('layout-shift')
          ) {
            try {
              let clsValue = 0
              const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  const layoutShift = entry
                  if (!layoutShift.hadRecentInput) {
                    clsValue += layoutShift.value || 0
                  }
                }
                sendToAnalyticsEndpoint('webvital', {
                  id: `cls-${Date.now()}`,
                  name: 'CLS',
                  value: clsValue,
                  rating:
                    clsValue < 0.1
                      ? 'good'
                      : clsValue < 0.25
                        ? 'needs-improvement'
                        : 'poor',
                  delta: 0,
                  navigationType: 'navigate',
                })
              })
              clsObserver.observe({ entryTypes: ['layout-shift'] })
            } catch {}
          }
        }
      } catch {}
    }

    sendToAnalyticsEndpoint('pageview', {
      sessionId: sessionIdRef.current,
      pagePath: window.location.pathname,
      referrer: document.referrer || 'direct',
      timeOnPage: 0,
      bounce: false,
      timestamp: Date.now(),
    })

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackEngagement()
      }
    }

    const handleBeforeUnload = () => {
      trackEngagement()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    const timer = setTimeout(trackWebVitals, 1000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      trackEngagement()
    }
  }, [sendToAnalyticsEndpoint, trackEngagement])

  return null
}
