// @vitest-environment jsdom

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import { Term } from './Term'

afterEach(cleanup)

describe('Term', () => {
  it('renders a semantic <dfn> using the glossary key derived from its text', () => {
    render(<Term>JWT</Term>)
    expect(screen.getByText('JWT').tagName).toBe('DFN')
  })

  it('resolves the glossary key case-insensitively', () => {
    render(<Term>jwt</Term>)
    expect(screen.getByText('jwt').tagName).toBe('DFN')
  })

  it('accepts an explicit term override for differing display text', () => {
    render(<Term term="jwt">JSON Web Token</Term>)
    expect(screen.getByText('JSON Web Token').tagName).toBe('DFN')
  })

  it('falls back to plain children when no glossary entry matches', () => {
    const { container } = render(<Term>NotARealGlossaryTerm</Term>)
    expect(container.querySelector('dfn')).toBeNull()
    expect(screen.getByText('NotARealGlossaryTerm')).toBeTruthy()
  })
})
