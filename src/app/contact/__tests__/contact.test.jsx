// @vitest-environment jsdom

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import { messages } from '@/data/locales'

import { ContactForm } from '../ContactForm'

function renderForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ContactForm />
    </NextIntlClientProvider>,
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function fillForm() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } })
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'lead@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Hello' },
  })
}

describe('ContactForm', () => {
  it('renders the fields and submit button', () => {
    renderForm()

    expect(screen.getByLabelText('Name')).toBeTruthy()
    expect(screen.getByLabelText('Email')).toBeTruthy()
    expect(screen.getByLabelText('Message')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Request Quote' })).toBeTruthy()
  })

  it('shows an error on empty submit and does not call fetch', async () => {
    vi.stubGlobal('fetch', vi.fn())
    renderForm()

    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText(/Please fill in all fields/i)).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('shows an error for an invalid email and does not call fetch', async () => {
    vi.stubGlobal('fetch', vi.fn())
    renderForm()

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Jane' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'nope' },
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello' },
    })

    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText(/valid email/i)).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('disables the button while the request is in flight', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    )
    renderForm()

    fillForm()
    fireEvent.submit(screen.getByRole('form'))

    const button = screen.getByRole('button', { name: /Request Quote/i })
    expect(button.disabled).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '/api/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane',
          email: 'lead@example.com',
          message: 'Hello',
        }),
      },
    )
  })

  it('swaps the form for the success banner on a 200 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    renderForm()

    fillForm()
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByText(/Message received/i)).toBeTruthy()
    expect(screen.queryByRole('form')).toBeNull()
  })

  it('renders an alert and keeps the form on a 400 response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 400 }),
    )
    renderForm()

    fillForm()
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByRole('alert')).toBeTruthy()
    expect(screen.queryByRole('form')).not.toBeNull()
  })

  it('renders an alert and keeps the form on a 500 response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    )
    renderForm()

    fillForm()
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByRole('alert')).toBeTruthy()
    expect(screen.queryByRole('form')).not.toBeNull()
  })

  it('renders an alert and keeps the form on a network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')))
    renderForm()

    fillForm()
    fireEvent.submit(screen.getByRole('form'))

    expect(await screen.findByRole('alert')).toBeTruthy()
    expect(screen.queryByRole('form')).not.toBeNull()
  })
})
