import { describe, it, expect, vi } from 'vitest'
import {
  generateSessionId,
  calculateTimeOnPage,
  isBounce,
} from './analytics'

describe('generateSessionId', () => {
  it('returns a string', () => {
    const id = generateSessionId()
    expect(typeof id).toBe('string')
  })

  it('returns unique values on successive calls', () => {
    const id1 = generateSessionId()
    const id2 = generateSessionId()
    expect(id1).not.toBe(id2)
  })
})

describe('calculateTimeOnPage', () => {
  it('returns 0 when called with Date.now()', () => {
    const now = Date.now()
    expect(calculateTimeOnPage(now)).toBe(0)
  })

  it('returns positive seconds for a past start time', () => {
    const past = Date.now() - 5000
    const result = calculateTimeOnPage(past)
    expect(result).toBeGreaterThanOrEqual(4)
    expect(result).toBeLessThanOrEqual(6)
  })
})

describe('isBounce', () => {
  it('returns true for single page view under 10 seconds', () => {
    expect(isBounce(5, 1)).toBe(true)
  })

  it('returns false for single page view over 10 seconds', () => {
    expect(isBounce(15, 1)).toBe(false)
  })

  it('returns false for multiple page views regardless of time', () => {
    expect(isBounce(3, 2)).toBe(false)
    expect(isBounce(3, 3)).toBe(false)
  })
})
