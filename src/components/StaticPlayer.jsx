'use client'

import { useTranslations } from 'next-intl'

export function StaticPlayer({ mediaUrl, mediaType }) {
  const t = useTranslations('staticPlayer')
  const isVideo = mediaType === 'video'
  const isAudio = mediaType === 'audio'
  const mediaLabel = isVideo
    ? t('videoLabel')
    : isAudio
      ? t('audioLabel')
      : t('mediaLabel')

  return (
    <div
      className="w-full h-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center"
      role="region"
      aria-label={mediaLabel}
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          controls
          preload="none"
          className="max-w-full max-h-full"
          aria-label={mediaLabel}
          poster={mediaUrl.replace(/\.[^/.]+$/, '.jpg')}
        >
          {t('videoFallback')}
        </video>
      ) : (
        <audio
          src={mediaUrl}
          controls
          preload="none"
          className="w-full"
          aria-label={mediaLabel}
        >
          {t('audioFallback')}
        </audio>
      )}
    </div>
  )
}
