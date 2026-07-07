'use client'

export function StaticPlayer({ mediaUrl, mediaType }) {
  const isVideo = mediaType === 'video'
  const isAudio = mediaType === 'audio'
  const mediaLabel = isVideo ? 'Video player' : isAudio ? 'Audio player' : 'Media player'

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
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio
          src={mediaUrl}
          controls
          preload="none"
          className="w-full"
          aria-label={mediaLabel}
        >
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
} 