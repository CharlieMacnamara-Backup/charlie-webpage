'use client'

import { memo, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { ImageModal } from './ImageModal'
import { Container } from '@/components/Container'
import { useTranslations } from 'next-intl'
import { images } from '@/data/photos'

export const Photos = memo(function Photos() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const slideRefs = useRef([])
  const t = useTranslations('photos')
  const captions = t.raw('captions')
  const dotLabel = t('dotLabel')

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index)
            setActiveIndex(idx)
          }
        }
      },
      { root: track, threshold: 0.6 }
    )
    const slides = slideRefs.current.filter(Boolean)
    slides.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="mt-10 sm:mt-14">
        <Container className="pb-2">
          {/* Carousel track */}
          <div
            ref={trackRef}
            className={clsx(
              '-mx-4 flex snap-x snap-mandatory snap-always gap-4 overflow-x-auto px-4 pb-10 pt-4',
              'scroll-pl-4 scroll-pr-4 -overscroll-x-contain',
              'motion-safe:scroll-smooth',
              'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 hover:scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-700 dark:hover:scrollbar-thumb-zinc-600'
            )}
          >
            {images.map((image, imageIndex) => (
              <div
                key={image.src.src}
                ref={(el) => (slideRefs.current[imageIndex] = el)}
                data-index={imageIndex}
                className="flex-none w-[80vw] md:w-96 snap-center"
              >
                <div
                  className={clsx(
                    'aspect-[4/3] rounded-xl overflow-hidden',
                    'bg-zinc-100 dark:bg-zinc-800',
                    'shadow-md',
                    'transition duration-300 ease-out',
                    'hover:shadow-xl hover:scale-[1.02]',
                    'cursor-pointer'
                  )}
                  onClick={() =>
                    setSelectedImage({
                      ...image,
                      description: captions[imageIndex],
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedImage({
                        ...image,
                        description: captions[imageIndex],
                      })
                    }
                  }}
                  aria-label={t('clickToView')}
                >
                  <Image
                    src={image.src}
                    alt={captions[imageIndex]}
                    sizes="(min-width: 640px) 18rem, 80vw"
                    className="h-full w-full object-cover transition duration-300 ease-out hover:scale-110"
                    priority={imageIndex === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-6 pb-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  slideRefs.current[i]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                  })
                }}
                className={clsx(
                  'rounded-full transition-all duration-300 cursor-pointer',
                  i === activeIndex
                    ? 'bg-teal-500 size-3'
                    : 'bg-zinc-300 dark:bg-zinc-600 size-2.5 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                )}
                aria-label={dotLabel.replace('{number}', String(i + 1))}
              />
            ))}
          </div>
        </Container>
      </div>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.src?.src || null}
        description={selectedImage?.description}
      />
    </>
  )
})
