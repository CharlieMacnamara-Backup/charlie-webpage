import Link from 'next/link'

import { Container } from '@/components/Container'

import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Get a Fixed-Price Website',
  description:
    'Fixed-price websites for local businesses: online booking, Stripe payments, Google visibility. One fee, no subscriptions.',
}

const features = [
  {
    title: 'Online booking',
    body: 'no missed calls or double-bookings',
  },
  {
    title: 'Stripe payments',
    body: 'sell around the clock',
  },
  {
    title: 'Google visibility',
    body: 'local customers find you',
  },
  {
    title: 'Reviews on your site',
    body: 'fresh proof, zero effort',
  },
]

export default function ContactPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Get a Fixed-Price Website
        </h1>
        <p className="mt-4 text-base/7 text-zinc-600 dark:text-zinc-400">
          One fee. No subscriptions. I design, build, and maintain the whole
          site — you just run your business.
        </p>

        <ul className="mt-8 space-y-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="text-sm/6 text-zinc-600 dark:text-zinc-400"
            >
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </span>
              {' — '}
              {feature.body}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm/6 text-zinc-600 dark:text-zinc-400">
          <Link
            href="/blog/davison-menswear"
            className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Davison Menswear
          </Link>
          , a Bruntsfield kilt shop, runs bookings, reviews, and orders from one
          page.
        </p>
        <p className="mt-4 text-sm/6 text-zinc-600 dark:text-zinc-400">
          Tell me about your business. Fixed price, up front.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}
