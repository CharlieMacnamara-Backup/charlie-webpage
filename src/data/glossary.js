export const glossary = {
  jwt: {
    term: 'JWT',
    definition:
      'Signed token that verifies identity without a database lookup.',
  },
  d1: {
    term: 'D1',
    definition:
      "Cloudflare's managed SQLite database. Queries run at the network edge — no servers to manage.",
  },
  kv: {
    term: 'KV',
    definition:
      "Cloudflare's global key-value store. Data cached worldwide for fast retrieval.",
  },
  turnstile: {
    term: 'Turnstile',
    definition:
      "Cloudflare's invisible bot detection. No CAPTCHA, no user friction — runs silently on form submit.",
  },
  resend: {
    term: 'Resend',
    definition:
      'Email API for transactional emails — receipts, alerts, notices.',
  },
  workers: {
    term: 'Workers',
    definition:
      "Cloudflare's serverless execution environment. Code runs at the network edge, close to users — no servers to manage.",
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
