'use client'

import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

/**
 * A simple, reliable video player component that properly handles loading states and errors
 */
export const SimpleVideo = ({
  src,
  poster,
  caption,
  className = '',
  aspectRatio = '16/9',
}) => {
  const videoRef = useRef(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    
    const handleError = () => {
      console.error(`Error loading video: ${src}`)
      setError(true)
      setLoading(false)
    }
    
    const handleLoaded = () => {
      setLoading(false)
    }
    
    if (videoRef.current) {
      videoRef.current.addEventListener('error', handleError)
      videoRef.current.addEventListener('loadeddata', handleLoaded)
    }
    
    const video = videoRef.current
    return () => {
      if (video) {
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadeddata', handleLoaded)
      }
    }
  }, [src])
  
  // Don't render during SSR to avoid hydration mismatches
  if (!hasMounted) {
    return (
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" 
           style={{ aspectRatio }}></div>
    )
  }
  
  if (error) {
    return (
      <div className="my-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
        <div className="text-amber-700 mb-2">
          <svg className="inline-block h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          Unable to load video
        </div>
        <a 
          href={src} 
          className="text-sm text-teal-600 hover:text-teal-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open video in new tab
        </a>
      </div>
    )
  }

  return (
    <div className="my-8">
      <div className={clsx(
        'w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative',
        className
      )}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <div className="animate-pulse">
              <svg className="h-12 w-12 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24">
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-auto block"
          controls
          preload="metadata"
          poster={poster}
          playsInline
          style={{ display: 'block', aspectRatio }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag. 
          <a href={src} className="text-teal-600 hover:text-teal-800">Download the video</a> instead.
        </video>
      </div>
      {caption && (
        <p className="text-sm text-zinc-500 mt-2 text-center italic">{caption}</p>
      )}
    </div>
  )
} 