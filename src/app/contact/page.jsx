import Link from 'next/link'

import { Container } from '@/components/Container'

import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Get a Fixed-Price Website',
  description:
    'One-time fee. No recurring monthly costs or hidden subscriptions. Fixed-price websites for local independent businesses.',
}

export default function ContactPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Get a Fixed-Price Website
        </h1>
        <p className="mt-4 text-base/7 text-zinc-600 dark:text-zinc-400">
          One-time fee. No recurring monthly costs or hidden subscriptions.
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Built for local independent businesses like{' '}
          <Link
            href="/blog/davison-menswear"
            className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Davison Menswear
          </Link>
          .
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}
