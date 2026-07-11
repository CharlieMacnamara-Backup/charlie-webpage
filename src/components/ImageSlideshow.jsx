'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { resolveBlogImagePath } from '@/lib/image-utils'

export function ImageSlideshow({ images, blogSlug = null }) {
  const t = useTranslations('imageSlideshow')
  const scrollRef = useRef(null)
  const slideRefs = useRef([])
  const [current, setCurrent] = useState(0)

  const scrollTo = useCallback((index) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
    setCurrent(index)
  }, [])

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const index = Math.round(container.scrollLeft / container.clientWidth)
    if (index !== current) setCurrent(index)
  }, [current])

  return (
    <div className="my-8">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className="w-full shrink-0 snap-start flex justify-center"
          >
            <div
              className="w-full max-w-[min(90vw,800px)] rounded-xl shadow-xs bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src={resolveBlogImagePath(image.src, blogSlug)}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between px-1">
        <button
          onClick={() => scrollTo(current - 1)}
          disabled={current === 0}
          className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-600 shadow-xs transition active:scale-95 hover:border-zinc-400 hover:text-zinc-800 hover:shadow-sm disabled:opacity-30 disabled:pointer-events-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
          aria-label={t('previous')}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${
                i === current
                  ? 'h-3 w-8 bg-zinc-700 dark:bg-zinc-300'
                  : 'h-3 w-3 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500'
              }`}
              aria-label={t('goToSlide', { number: i + 1 })}
            />
          ))}
        </div>

        <button
          onClick={() => scrollTo(current + 1)}
          disabled={current === images.length - 1}
          className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-600 shadow-xs transition active:scale-95 hover:border-zinc-400 hover:text-zinc-800 hover:shadow-sm disabled:opacity-30 disabled:pointer-events-none dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
          aria-label={t('next')}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {images[current]?.caption && (
        <div className="mt-5 text-center">
          <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">
            {images[current].caption}
          </p>
        </div>
      )}
    </div>
  )
}
