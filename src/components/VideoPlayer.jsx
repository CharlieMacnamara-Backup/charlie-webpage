'use client'

import { useState, useEffect } from 'react'

export function VideoPlayer({ src, poster, caption }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        className="w-full my-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="flex items-center justify-center h-full">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full my-8">
      <div
        className="w-full rounded-lg overflow-hidden bg-black"
        style={{ aspectRatio: '16/9' }}
      >
        <video
          className="w-full h-full object-contain"
          controls
          preload="metadata"
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
          <p className="p-4 text-center text-gray-700 dark:text-gray-300">
            Your browser doesn&apos;t support HTML5 video.
          </p>
        </video>
      </div>
      {caption && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}

// Also export as default for backward compatibility
export default VideoPlayer
