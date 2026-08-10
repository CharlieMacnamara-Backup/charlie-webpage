'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '/api/contact'

const inputClassName =
  'mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (status === 'submitting') return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error')
      setError('Please fill in all fields.')
      return
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
    } catch {
      setStatus('error')
      setError(
        'Something went wrong sending your message. Please try again, or email mail@charliemacnamara.uk.',
      )
    }
  }

  if (status === 'success') {
    return (
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Message received. I'll get back to you within 24 hours.
      </h2>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClassName}
          />
        </div>
        <Button
          type="submit"
          loading={status === 'submitting'}
          disabled={status === 'submitting'}
          className="w-full"
        >
          Request Quote
        </Button>
      </form>
      {status === 'error' && error ? (
        <p
          role="alert"
          className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
    </>
  )
}
