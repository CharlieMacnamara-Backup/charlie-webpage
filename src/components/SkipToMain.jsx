'use client'

import { messages } from '@/data/locales'

export function SkipToMain() {
  return (
    <a href="#main-content" className="skip-link">
      {messages.skipToMain}
    </a>
  )
}
