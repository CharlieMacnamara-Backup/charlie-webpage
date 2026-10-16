import { describe, it, expect } from 'vitest'

import { getAllArticles } from './getAllArticles'

describe('getAllArticles', () => {
  const articles = getAllArticles()
  const slugs = articles.map((article) => article.slug)

  it('returns the published posts', () => {
    expect(slugs).toEqual(
      expect.arrayContaining([
        'davison-menswear',
        'markdown-cv',
        'sourdough-journey',
      ]),
    )
  })

  it('excludes posts flagged published: false', () => {
    expect(slugs).not.toContain('loquena-app')
  })

  it('excludes the _template directory', () => {
    expect(slugs).not.toContain('_template')
  })

  it('sorts newest first', () => {
    const dates = articles.map((article) => new Date(article.date).getTime())
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })
})
