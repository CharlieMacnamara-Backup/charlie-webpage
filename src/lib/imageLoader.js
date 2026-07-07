const imageLoader = ({ src }) => {
  // For absolute URLs, return as-is
  if (src.startsWith('http')) {
    return src
  }
  
  // For local images, ensure they're served from the correct path
  // Remove any double slashes that might occur
  const cleanPath = src.startsWith('/') ? src : `/${src}`
  return cleanPath.replace(/\/+/g, '/')
}

export default imageLoader 