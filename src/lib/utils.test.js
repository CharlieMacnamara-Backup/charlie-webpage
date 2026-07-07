import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('handles conditional classes via clsx', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
    expect(cn('a', true && 'b')).toBe('a b')
  })

  it('resolves Tailwind conflicts via twMerge', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
    expect(cn('text-red-500', 'text-blue-600')).toBe('text-blue-600')
  })

  it('handles objects and arrays', () => {
    expect(cn({ a: true, b: false })).toBe('a')
    expect(cn(['a', 'b'])).toBe('a b')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })
})
