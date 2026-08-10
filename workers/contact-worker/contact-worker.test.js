import { describe, it, expect, vi, afterEach } from 'vitest'

import worker, {
  validateContactPayload,
  buildEmailPayload,
  corsHeaders,
} from './index.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

const ENDPOINT_URL = 'https://charliemacnamara.uk/api/contact'

function post(url, body, env = {}) {
  return worker.fetch(
    new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    env,
  )
}

describe('validateContactPayload', () => {
  it('rejects a missing name', () => {
    const result = validateContactPayload({ email: 'a@b.com', message: 'hi' })
    expect(result.ok).toBe(false)
  })

  it('rejects a blank email', () => {
    const result = validateContactPayload({
      name: 'Jane',
      email: '   ',
      message: 'hi',
    })
    expect(result.ok).toBe(false)
  })

  it('rejects an invalid email', () => {
    const result = validateContactPayload({
      name: 'Jane',
      email: 'nope',
      message: 'hi',
    })
    expect(result.ok).toBe(false)
  })

  it('rejects a missing message', () => {
    const result = validateContactPayload({ name: 'Jane', email: 'a@b.com' })
    expect(result.ok).toBe(false)
  })

  it('accepts a valid payload and trims values', () => {
    const result = validateContactPayload({
      name: '  Jane  ',
      email: '  lead@example.com  ',
      message: '  Hello  ',
    })
    expect(result.ok).toBe(true)
    expect(result.value).toEqual({
      name: 'Jane',
      email: 'lead@example.com',
      message: 'Hello',
    })
  })
})

describe('buildEmailPayload', () => {
  it('builds the exact spec email payload with escaped html', () => {
    const payload = buildEmailPayload({
      name: 'Jane <script>',
      email: 'lead@example.com',
      message: 'Hi\nThere',
    })
    expect(payload.from).toBe('Charlie Macnamara <mail@charliemacnamara.uk>')
    expect(payload.to).toBe('mail@charliemacnamara.uk')
    expect(payload.reply_to).toBe('lead@example.com')
    expect(payload.subject).toBe('New Local Lead: Jane <script>')
    expect(payload.text).toBe(
      'Name: Jane <script>\nEmail: lead@example.com\n\nHi\nThere',
    )
    expect(payload.html).toContain('Jane &lt;script&gt;')
    expect(payload.html).toContain('Hi<br>There')
  })
})

describe('corsHeaders', () => {
  it('returns the fixed CORS policy', () => {
    expect(corsHeaders()).toEqual({
      'Access-Control-Allow-Origin': 'https://charliemacnamara.uk',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    })
  })
})

describe('worker fetch handler', () => {
  it('answers OPTIONS with 204 and CORS headers', async () => {
    const res = await worker.fetch(
      new Request(ENDPOINT_URL, { method: 'OPTIONS' }),
      {},
    )
    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(
      'https://charliemacnamara.uk',
    )
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
      'POST, OPTIONS',
    )
  })

  it('answers non-POST methods with 405', async () => {
    const res = await worker.fetch(
      new Request(ENDPOINT_URL, { method: 'GET' }),
      {},
    )
    expect(res.status).toBe(405)
    expect(await res.json()).toEqual({ error: 'Method not allowed' })
  })

  it('answers invalid JSON with 400', async () => {
    const res = await post(ENDPOINT_URL, 'not-json', {
      RESEND_API_KEY: 'test-key',
    })
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid JSON body' })
  })

  it('answers invalid payloads with 400', async () => {
    const res = await post(ENDPOINT_URL, {}, { RESEND_API_KEY: 'test-key' })
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Please fill in all fields.' })
  })

  it('returns 500 without a RESEND_API_KEY and does not call fetch', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const res = await post(ENDPOINT_URL, {
      name: 'Jane',
      email: 'lead@example.com',
      message: 'Hello',
    })
    expect(res.status).toBe(500)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('forwards a valid payload to Resend and returns 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    const res = await post(
      ENDPOINT_URL,
      { name: 'Jane', email: 'lead@example.com', message: 'Hello' },
      { RESEND_API_KEY: 'test-key' },
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(options.headers.Authorization).toBe('Bearer test-key')
    expect(options.headers['Content-Type']).toBe('application/json')

    const body = JSON.parse(options.body)
    expect(body.reply_to).toBe('lead@example.com')
    expect(body.from).toBe('Charlie Macnamara <mail@charliemacnamara.uk>')
    expect(body.to).toBe('mail@charliemacnamara.uk')
    expect(body.subject).toBe('New Local Lead: Jane')
  })

  it('maps a Resend non-2xx response to 500', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue({ ok: false, status: 422, text: async () => '{}' }),
    )

    const res = await post(
      ENDPOINT_URL,
      { name: 'Jane', email: 'lead@example.com', message: 'Hello' },
      { RESEND_API_KEY: 'test-key' },
    )
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Email delivery failed' })
  })

  it('maps a Resend network failure to 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')))

    const res = await post(
      ENDPOINT_URL,
      { name: 'Jane', email: 'lead@example.com', message: 'Hello' },
      { RESEND_API_KEY: 'test-key' },
    )
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Email delivery failed' })
  })
})
