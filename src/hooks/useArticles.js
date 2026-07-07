'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllArticles } from '@/lib/getAllArticles'
import Cache from '@/lib/cache'

const ARTICLES_CACHE_KEY = 'articles'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export function useArticles() {
  const [articles, setArticles] = useState(() => {
    if (typeof window === 'undefined') return []
    return Cache.get(ARTICLES_CACHE_KEY) || []
  })
  const [isLoading, setIsLoading] = useState(!articles.length)
  const [error, setError] = useState(null)

  const fetchArticles = useCallback(async (skipCache = false) => {
    try {
      setIsLoading(true)
      setError(null)

      // Check cache first unless skipCache is true
      if (!skipCache) {
        const cachedData = Cache.get(ARTICLES_CACHE_KEY)
        if (cachedData) {
          setArticles(cachedData)
          setIsLoading(false)
          return cachedData
        }
      }

      const data = await getAllArticles()
      
      // Sort articles by date
      const sortedData = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      // Cache the sorted data
      Cache.set(ARTICLES_CACHE_KEY, sortedData, CACHE_DURATION)
      setArticles(sortedData)
      return sortedData
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch articles'
      setError(errorMessage)
      console.error('Error fetching articles:', err)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Only fetch if we don't have cached data
    if (!articles.length) {
      fetchArticles()
    }

    // Cleanup expired cache entries
    Cache.clearExpired()
  }, [articles.length, fetchArticles])

  const refetch = useCallback(() => {
    return fetchArticles(true) // Skip cache when manually refetching
  }, [fetchArticles])

  return {
    articles,
    isLoading,
    error,
    refetch,
  }
} 