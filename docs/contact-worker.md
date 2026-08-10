# Contact Worker

Cloudflare Worker that handles lead-capture form submissions from `/contact`. Validates input, then forwards to Resend as an email.

## Overview

```
Browser → POST /api/contact → contact-worker (validation + CORS) → Resend API → email to mail@charliemacnamara.uk
```

The worker runs on a **path route** (`charliemacnamara.uk/api/contact`) that takes precedence over the main site's custom domain. The main worker (`charlie-webpage`) continues to serve everything else.

**Source**: `workers/contact-worker/` (wrangler.jsonc + index.js + contact-worker.test.js)

## API contract

### Endpoints

| Method | Path | Response | Description |
|--------|------|----------|-------------|
| `OPTIONS` | `/api/contact` | `204` + CORS headers | Preflight — returns no body |
| `POST` | `/api/contact` | `200` `{success:true}` | Valid payload — email sent via Resend |
| `POST` | `/api/contact` | `400` `{error: "..."}` | Validation failure or bad JSON |
| `POST` | `/api/contact` | `500` `{error: "Email delivery failed"}` | Resend API error or missing secret |
| Any other | `/api/contact` | `405` `{error: "Method not allowed"}` | Non-POST, non-OPTIONS |

### Request body (POST)

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I need a website for my bakery."
}
```

All three fields are required. `name` and `message` must be non-empty after trimming. `email` must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

### Response headers

Every response includes CORS headers:

```
Access-Control-Allow-Origin: https://charliemacnamara.uk
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

Non-204 responses also include `Content-Type: application/json`.

### Email payload (sent to Resend)

```json
{
  "from": "Charlie Macnamara <mail@charliemacnamara.uk>",
  "to": "mail@charliemacnamara.uk",
  "reply_to": "jane@example.com",
  "subject": "New Local Lead: Jane Smith",
  "text": "Name: Jane Smith\nEmail: jane@example.com\n\nI need a website for my bakery.",
  "html": "<p><strong>Name:</strong> Jane Smith<br><strong>Email:</strong> jane@example.com</p><p>I need a website for my bakery.</p>"
}
```

The `reply_to` field is the client's email — when you reply to the notification, it goes to the lead.

## Deployment

### Prerequisites

- `wrangler` installed (`devDependencies` in root `package.json`)
- Cloudflare account authenticated (`wrangler login` or env var)
- Resend API key (rotate after any exposure)

### Deploy

```sh
cd workers/contact-worker
npx wrangler deploy
```

Wrangler resolves from the repo root `node_modules`. The config (`wrangler.jsonc`) specifies the route `charliemacnamara.uk/api/contact` with `zone_name: charliemacnamara.uk`.

### Set secrets

```sh
cd workers/contact-worker
npx wrangler secret put RESEND_API_KEY
# Paste the Resend API key when prompted
```

**Critical**: run this from `workers/contact-worker/`, NOT from the repo root. Running from the root targets the main worker (`charlie-webpage`) which doesn't need this secret.

### Verify secrets

```sh
cd workers/contact-worker
npx wrangler secret list
# Should show: [{ "name": "RESEND_API_KEY", "type": "secret_text" }]
```

If the list is empty, the secret was set on the wrong worker.

## Operations

### Smoke test

```sh
# OPTIONS (preflight)
curl -i -X OPTIONS https://charliemacnamara.uk/api/contact

# POST empty body → 400
curl -s -w "\nstatus: %{http_code}\n" -X POST https://charliemacnamara.uk/api/contact \
  -H "Content-Type: application/json" -d '{}'

# POST bad email → 400
curl -s -w "\nstatus: %{http_code}\n" -X POST https://charliemacnamara.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"not-an-email","message":"hi"}'

# Valid POST → 200
curl -s -w "\nstatus: %{http_code}\n" -X POST https://charliemacnamara.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","email":"test@example.com","message":"Plan verification"}'

# Non-POST → 405
curl -s -w "\nstatus: %{http_code}\n" -X GET https://charliemacnamara.uk/api/contact
```

### Monitoring

The worker has observability enabled (`wrangler.jsonc`: `head_sampling_rate: 1`). View logs:

```sh
cd workers/contact-worker
npx wrangler tail
```

The worker logs two error conditions via `console.error`:
- `Resend request failed with status <code>` — Resend returned a non-2xx
- `Resend request threw <error>` — network or runtime error

### Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `500 "Email delivery failed"` | Secret missing on contact-worker | `cd workers/contact-worker && npx wrangler secret put RESEND_API_KEY` |
| `500 "Email delivery failed"` | Resend domain unverified | Check resend.com/domains; temporarily use `from: onboarding@resend.dev` for testing |
| `404` on `/api/contact` | Worker not deployed or route not matching | `cd workers/contact-worker && npx wrangler deploy`; check route pattern has no trailing slash |
| `502` / `503` | Worker runtime error | `npx wrangler tail` to see the error; check worker logs in Cloudflare dashboard |
| CORS error in browser | `Access-Control-Allow-Origin` mismatch | Worker hardcodes `https://charliemacnamara.uk` — ensure the page is served from that exact origin |

### Secret rotation

If the API key is compromised (e.g. exposed in chat/logs):

1. Go to [Resend API Keys](https://resend.com/api-keys) and **delete** the old key
2. Create a new key
3. Update the secret on the worker:
   ```sh
   cd workers/contact-worker
   npx wrangler secret put RESEND_API_KEY
   # Paste the new key
   ```
4. No redeployment needed — secrets are bound at runtime, not baked into the worker bundle

## Testing

### Unit tests

```sh
# Run worker tests only
npx vitest run workers/contact-worker/contact-worker.test.js

# Run all tests (worker + frontend)
npx vitest run
```

15 tests covering: input validation (5), email payload building (1), CORS headers (1), fetch handler (8 — OPTIONS, non-POST, invalid JSON, invalid payload, missing key, Resend forward, non-2xx, network failure).

### Full gate

```sh
npm run check
```

Chain: `validate:mdx → format:check → lint → vitest → node -c workers/contact-worker/index.js → next build`

## Architecture notes

### Why a path route (not a custom domain)

Cloudflare routes take precedence over custom domains on the same hostname. The pattern `charliemacnamara.uk/api/contact` intercepts requests to that exact path before the main worker's custom domain (`charliemacnamara.uk`) handles them. This means:

- No extra DNS records or certificates
- No CORS needed (same origin)
- Independent deploys (contact-worker and main worker are separate)
- The main worker continues to serve everything else unchanged

### Why zero dependencies

The worker uses the platform-native `fetch` API to call Resend's REST endpoint directly. This means:

- No `node_modules` or `package.json` in the worker directory
- No bundler step — wrangler deploys the raw ESM
- Deterministic behavior — no dependency versions to drift
- Smaller bundle (3.62 KiB uploaded, 1.30 KiB gzipped)

### Trailing slash interaction

The worker route pattern (`charliemacnamara.uk/api/contact`) must NOT end with a trailing slash. Cloudflare route patterns are prefix matches:

- `/api/contact` → matches the worker ✓
- `/api/contact/` → also matches (prefix) ✓
- Pattern `/api/contact/` → would only match `/api/contact/` requests, missing the form's POST to `/api/contact` ✗

The contact page (`src/app/contact/page.jsx`) posts to `/api/contact` (no trailing slash), matching the route pattern exactly.

## File reference

| File | Purpose |
|------|---------|
| `workers/contact-worker/wrangler.jsonc` | Worker config: name, route, compatibility date, observability |
| `workers/contact-worker/index.js` | Worker implementation: validation, CORS, Resend forward |
| `workers/contact-worker/contact-worker.test.js` | Vitest unit tests (15 tests, node env) |
| `src/app/contact/page.jsx` | Contact page (server component, metadata, proof banner) |
| `src/app/contact/ContactForm.jsx` | Client form component (controlled inputs, fetch, status states) |
| `src/app/contact/__tests__/contact.test.jsx` | Frontend tests (8 tests, jsdom env) |
| `src/app/sitemap.js` | Sitemap entry for `/contact` |
