export function generateSessionId() {
  return crypto.randomUUID()
}

export function calculateTimeOnPage(startTime) {
  return Math.floor((Date.now() - startTime) / 1000)
}

export function isBounce(timeOnPage, pageViews) {
  return pageViews === 1 && timeOnPage < 10
}
