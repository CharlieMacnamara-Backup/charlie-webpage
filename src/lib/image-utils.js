export function resolveBlogImagePath(src, blogSlug = null) {
  if (!src) return ''

  if (src.startsWith('http://') || src.startsWith('https://')) return src

  if (src.startsWith('/blog/')) return src

  const legacyImagesBlog = src.match(/^\/images\/blog\/([^\/]+)\/(.*)/)
  if (legacyImagesBlog) {
    return `/blog/${legacyImagesBlog[1]}/${legacyImagesBlog[2]}`
  }

  if (blogSlug) {
    const slug = blogSlug === 'blog' ? src.split('/')[2] || blogSlug : blogSlug
    if (!src.includes('/')) return `/blog/${slug}/${src}`
  }

  return src.startsWith('/') ? src : `/${src}`
}

export async function getImagePlaceholder(src) {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
}

export function formatImageMetadata(image) {
  return {
    src: resolveBlogImagePath(image.src, image.blogSlug),
    alt: image.alt || '',
    width: image.width || 800,
    height: image.height || 600,
    blurDataURL: image.blurDataURL,
  }
}
