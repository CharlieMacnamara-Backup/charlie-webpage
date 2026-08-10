const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Invalid payload' }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !message) {
    return { ok: false, error: 'Please fill in all fields.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  return { ok: true, value: { name, email, message } }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildEmailPayload({ name, email, message }) {
  return {
    from: 'Charlie Macnamara <mail@charliemacnamara.uk>',
    to: 'mail@charliemacnamara.uk',
    reply_to: email,
    subject: `New Local Lead: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(
      email,
    )}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  }
}

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'https://charliemacnamara.uk',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function jsonResponse(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders()

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, headers)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, headers)
    }

    const validation = validateContactPayload(body)
    if (!validation.ok) {
      return jsonResponse({ error: validation.error }, 400, headers)
    }

    if (!env || !env.RESEND_API_KEY) {
      return jsonResponse({ error: 'Email delivery failed' }, 500, headers)
    }

    const email = buildEmailPayload(validation.value)

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      })

      if (!res.ok) {
        console.error(`Resend request failed with status ${res.status}`)
        return jsonResponse({ error: 'Email delivery failed' }, 500, headers)
      }

      return jsonResponse({ success: true }, 200, headers)
    } catch (err) {
      console.error('Resend request threw', err)
      return jsonResponse({ error: 'Email delivery failed' }, 500, headers)
    }
  },
}
