const CACHE_PREFIX = 'charlie-website-'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

class Cache {
  static set(key, data, duration = CACHE_DURATION) {
    if (typeof window === 'undefined') return false
    try {
      const item = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + duration,
      }
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item))
      return true
    } catch (error) {
      console.warn('Cache write failed:', error)
      return false
    }
  }

  static get(key) {
    if (typeof window === 'undefined') return null
    try {
      const item = JSON.parse(localStorage.getItem(CACHE_PREFIX + key))
      if (!item) return null

      if (Date.now() > item.expiry) {
        this.remove(key)
        return null
      }

      return item.data
    } catch (error) {
      console.warn('Cache read failed:', error)
      return null
    }
  }

  static remove(key) {
    if (typeof window === 'undefined') return false
    try {
      localStorage.removeItem(CACHE_PREFIX + key)
      return true
    } catch (error) {
      console.warn('Cache removal failed:', error)
      return false
    }
  }

  static clear() {
    if (typeof window === 'undefined') return false
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key))
      return true
    } catch (error) {
      console.warn('Cache clear failed:', error)
      return false
    }
  }

  static clearExpired() {
    if (typeof window === 'undefined') return false
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => {
          try {
            const item = JSON.parse(localStorage.getItem(key))
            if (Date.now() > item.expiry) {
              localStorage.removeItem(key)
            }
          } catch (e) {
            localStorage.removeItem(key)
          }
        })
      return true
    } catch (error) {
      console.warn('Cache cleanup failed:', error)
      return false
    }
  }
}

export default Cache 