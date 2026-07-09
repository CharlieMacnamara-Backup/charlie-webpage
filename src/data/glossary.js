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
      "Cloudflare's invisible bot detection. No CAPTCHA, no user friction — runs silently on form submit. [docs](https://developers.cloudflare.com/turnstile/)",
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
  deterministic: {
    term: 'Deterministic',
    definition:
      'Every operation produces the same result given the same starting conditions — no surprises.',
  },
}
