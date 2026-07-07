import { describe, it, expect, vi, beforeEach } from 'vitest'

const originalEnv = process.env

beforeEach(() => {
  vi.resetModules()
  process.env = { ...originalEnv }
})

describe('validateEnv', () => {
  it('does not throw in development mode', async () => {
    process.env.NODE_ENV = 'development'
    const { validateEnv } = await import('./env-validator')
    expect(() => validateEnv()).not.toThrow()
  })

  it('skips validation during production build phase', async () => {
    process.env.NODE_ENV = 'production'
    process.env.NEXT_PHASE = 'phase-production-build'
    const { validateEnv } = await import('./env-validator')
    expect(() => validateEnv()).not.toThrow()
  })

  it('passes in production with no required vars configured', async () => {
    process.env.NODE_ENV = 'production'
    delete process.env.NEXT_PHASE
    const { validateEnv } = await import('./env-validator')
    expect(() => validateEnv()).not.toThrow()
  })
})
