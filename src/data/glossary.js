export const glossary = {
  JWT: {
    term: 'JWT',
    definition:
      'Signed token that verifies identity without a database lookup. [docs](https://jwt.io/introduction)',
  },
  D1: {
    term: 'D1',
    definition:
      "Cloudflare's managed SQLite database. Queries run at the network edge — no servers to manage. [docs](https://developers.cloudflare.com/d1/)",
  },
  KV: {
    term: 'KV',
    definition:
      "Cloudflare's global key-value store. Data cached worldwide for fast retrieval. [docs](https://developers.cloudflare.com/kv/)",
  },
  turnstile: {
    term: 'Turnstile',
    definition:
      "Cloudflare's invisible bot detection. No CAPTCHA, no user friction — runs on submit. [docs](https://developers.cloudflare.com/turnstile/)",
  },
  resend: {
    term: 'Resend',
    definition:
      'Email API for transactional emails — receipts, alerts, notices. [docs](https://resend.com/docs)',
  },
  workers: {
    term: 'Workers',
    definition:
      "Cloudflare's serverless execution environment. Code runs at the network edge, close to users — no servers to manage. [docs](https://developers.cloudflare.com/workers/)",
  },
  async: {
    term: 'Async',
    definition:
      'A task that runs in the background without slowing things down — the booking goes through while the email sends itself.',
  },
  playwright: {
    term: 'Playwright',
    definition:
      'End-to-end testing framework that drives real browsers headlessly. [docs](https://playwright.dev/)',
  },
  lighthouse: {
    term: 'Lighthouse',
    definition:
      'Automated tool for auditing performance, accessibility, and SEO. [docs](https://developer.chrome.com/docs/lighthouse/)',
  },
  vitest: {
    term: 'Vitest',
    definition:
      'Unit test framework for Vite projects — runs tests natively in Node.js. [docs](https://vitest.dev/)',
  },
  CMS: {
    term: 'CMS',
    definition:
      'Content management system — software for creating and managing digital content without writing code.',
  },
  AAC: {
    term: 'AAC',
    definition:
      'Augmentative and Alternative Communication — tools and methods that support or replace speech, from picture boards to speech-generating apps.',
  },
  TTS: {
    term: 'TTS',
    definition:
      'Text-to-speech — software that reads written words aloud, usually with voices already built into the device.',
  },
  API: {
    term: 'API',
    definition:
      'Application Programming Interface — the defined way one piece of software asks another for data or actions.',
  },
  'offline-first': {
    term: 'Offline-first',
    definition:
      'A design approach where the app works fully without a connection and syncs in the background once one returns.',
  },
  haptic: {
    term: 'Haptic',
    definition:
      'Touch feedback — a small vibration or resistance that lets you feel an interaction.',
  },
}
