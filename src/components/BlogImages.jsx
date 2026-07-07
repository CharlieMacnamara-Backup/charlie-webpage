'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { resolveBlogImagePath } from '@/lib/image-utils'

export function SingleImage({
  src,
  alt,
  orientation = 'horizontal',
  focusArea = 'center', // 'center', 'top', 'bottom', 'left', 'right'
  zoom = 1, // 1 = no zoom, 2 = 2x zoom, etc.
  caption,
  blurBackground = false,
  variant = 'default', // Add variant prop
  blogSlug = null, // Optional blog slug for path resolution
  objectFit = 'contain', // Allow customizing object-fit (contain or cover)
  aspectRatio = 'auto', // Allow custom aspect ratio or 'auto' to use natural image ratio
}) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [naturalSize, setNaturalSize] = useState(null)

  // Process image source path using our utilities
  const processedSrc = resolveBlogImagePath(src, blogSlug)

  // Log image path resolution for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Image path resolution: ${src} → ${processedSrc}`)
    }
  }, [src, processedSrc])

  // Handle image errors more gracefully
  const handleImageError = () => {
    console.error(`Failed to load image: ${processedSrc}`)
    setError(true)
    setLoading(false)
  }

  // Handle image load to get natural dimensions
  const handleImageLoad = (e) => {
    setLoading(false)

    // Try to access the natural dimensions if available
    if (e.target && e.target.naturalWidth) {
      setNaturalSize({
        width: e.target.naturalWidth,
        height: e.target.naturalHeight,
        ratio: e.target.naturalWidth / e.target.naturalHeight,
      })
    }
  }

  if (error) {
    return (
      <div className="my-8 rounded-xl bg-amber-50 border border-amber-200 p-4 shadow-xs dark:bg-amber-900/10 dark:border-amber-700/30">
        <div className="flex items-center">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-amber-600 dark:text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
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
              Failed to load image
            </h3>
            <div className="mt-1 text-sm text-amber-700 dark:text-amber-500">
              <p>{alt}</p>
              <p className="text-xs mt-1 opacity-75">{processedSrc}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Determine the container's aspect ratio
  const containerAspectRatio = () => {
    if (aspectRatio !== 'auto') {
      return aspectRatio
    }

    if (orientation === 'vertical') {
      return '3/4'
    }

    return '16/9'
  }

  const renderImage = () => (
    <>
      <Image
        src={processedSrc}
        alt={alt}
        width={orientation === 'vertical' ? 400 : 800}
        height={orientation === 'vertical' ? 600 : 400}
        className={clsx(
          'w-full rounded-xl transition-opacity duration-300 ease-in-out',
          loading ? 'opacity-0' : 'opacity-100',
          focusArea === 'center' && 'object-center',
          focusArea === 'top' && 'object-top',
          focusArea === 'bottom' && 'object-bottom',
          focusArea === 'left' && 'object-left',
          focusArea === 'right' && 'object-right',
        )}
        style={{
          objectFit: objectFit,
          transform: zoom > 1 ? `scale(${zoom})` : 'none',
        }}
        priority={false}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-zinc-200 dark:bg-zinc-700 h-10 w-10"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )

  // Special case for diagram images
  if (variant === 'diagram') {
    return (
      <div className="my-8">
        <div className="relative w-full overflow-hidden rounded-xl shadow-xs">
          {renderImage()}
        </div>
        {caption && (
          <p className="mt-2 text-sm text-zinc-600 text-center italic dark:text-zinc-400">
            {caption}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="my-8">
      <div
        className={clsx(
          'relative overflow-hidden rounded-xl shadow-xs bg-zinc-100 dark:bg-zinc-800',
          orientation === 'vertical' ? 'max-w-lg mx-auto' : 'w-full',
          aspectRatio === 'auto'
            ? null // No forced aspect ratio if auto
            : `aspect-[${containerAspectRatio()}]`,
          blurBackground && 'backdrop-blur',
        )}
      >
        {renderImage()}
      </div>
      {caption && (
        <p className="mt-2 text-sm text-zinc-600 text-center italic dark:text-zinc-400">
          {caption}
        </p>
      )}
    </div>
  )
}

export function TwoColGrid({
  images,
  aspectRatio = '4/3', // Can be customized per layout needs
  gap = 4, // Tailwind gap size
  blogSlug = null, // Optional blog slug for path resolution
  objectFit = 'contain', // Default object-fit for all images in the grid
}) {
  return (
    <div className={clsx('grid grid-cols-1 md:grid-cols-2 my-8', `gap-${gap}`)}>
      {images.map((image, index) => (
        <SingleImage
          key={index}
          {...image}
          blogSlug={blogSlug}
          objectFit={image.objectFit || objectFit}
        />
      ))}
    </div>
  )
}

export function ThreeColGrid({
  images,
  aspectRatio = '1/1', // Square by default for 3-col
  gap = 4,
  blogSlug = null, // Optional blog slug for path resolution
  objectFit = 'contain', // Default object-fit for all images in the grid
}) {
  return (
    <div className={clsx('grid grid-cols-1 md:grid-cols-3 my-8', `gap-${gap}`)}>
      {images.map((image, index) => (
        <SingleImage
          key={index}
          {...image}
          blogSlug={blogSlug}
          objectFit={image.objectFit || objectFit}
        />
      ))}
    </div>
  )
}
