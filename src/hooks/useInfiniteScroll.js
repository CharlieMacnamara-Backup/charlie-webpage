'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function useInfiniteScroll({
  items = [],
  itemsPerPage = 5,
  threshold = 100,
}) {
  const [displayedItems, setDisplayedItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const observer = useRef()

  // Reset when items change
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage))
    setPage(1)
    setHasMore(items.length > itemsPerPage)
  }, [items, itemsPerPage])

  const lastElementRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    }, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    })

    if (node) observer.current.observe(node)
  }, [isLoading, hasMore, threshold])

  const loadMore = useCallback(() => {
    setIsLoading(true)
    const nextPage = page + 1
    const start = (nextPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const newItems = items.slice(0, end)

    // Simulate network delay for smoother UX
    setTimeout(() => {
      setDisplayedItems(newItems)
      setPage(nextPage)
      setHasMore(end < items.length)
      setIsLoading(false)
    }, 300)
  }, [items, page, itemsPerPage])

  return {
    displayedItems,
    isLoading,
    hasMore,
    lastElementRef,
    loadMore,
  }
} 