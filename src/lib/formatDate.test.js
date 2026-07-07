import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats a standard date string', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024')
  })

  it('formats dates with single-digit months and days', () => {
    expect(formatDate('2024-03-05')).toBe('March 5, 2024')
  })

  it('formats December date', () => {
    expect(formatDate('2024-12-25')).toBe('December 25, 2024')
  })
})
