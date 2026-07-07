import { describe, it, expect, beforeEach, vi } from 'vitest'
import Cache from './cache'

const store = {}

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k])

  globalThis.window = {}

  const ls = {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = value
      ls[key] = value
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
      delete ls[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((k) => {
        delete store[k]
        delete ls[k]
      })
    }),
  }
  globalThis.localStorage = new Proxy(ls, {
    ownKeys: () => Reflect.ownKeys(store),
    getOwnPropertyDescriptor: () => ({
      enumerable: true,
      configurable: true,
    }),
  })
})

describe('Cache', () => {
  it('sets and gets a value', () => {
    expect(Cache.set('key1', { foo: 'bar' })).toBe(true)
    expect(Cache.get('key1')).toEqual({ foo: 'bar' })
  })

  it('returns null for a missing key', () => {
    expect(Cache.get('nonexistent')).toBeNull()
  })

  it('removes a value', () => {
    Cache.set('key2', 'value')
    expect(Cache.get('key2')).toBe('value')
    expect(Cache.remove('key2')).toBe(true)
    expect(Cache.get('key2')).toBeNull()
  })

  it('clears all cached values', () => {
    Cache.set('a', 1)
    Cache.set('b', 2)
    expect(Cache.clear()).toBe(true)
    expect(Cache.get('a')).toBeNull()
    expect(Cache.get('b')).toBeNull()
  })

  it('returns null for expired entries', () => {
    Cache.set('expired', 'data', -1000)
    expect(Cache.get('expired')).toBeNull()
  })
})
