import Link from 'next/link'

import { Container } from '@/components/Container'

import { ContactForm } from './ContactForm'

export const metadata = {
  title: 'Get a Fixed-Price Website',
  description:
    'Fixed-price websites for local businesses: online booking, Stripe payments, Google visibility, and customer reviews. One fee, no subscriptions.',
}

const features = [
  {
    title: 'Take bookings without the phone tag',
    body: 'Customers pick a time that suits them and get an instant confirmation. Your calendar updates itself, so no missed calls and no double-bookings.',
  },
  {
    title: 'Sell online with Stripe',
    body: 'A shop that takes card payments around the clock. The same payment system millions of shops trust.',
  },
  {
    title: 'Get found on Google',
    body: 'Pages written and structured so local customers find you when they search for what you sell.',
  },
  {
    title: 'Show your reviews',
    body: 'Your Google reviews displayed on your site, refreshed automatically. Fresh proof, zero effort.',
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
          One fee. A website that works as hard as you do — no monthly
          subscriptions, no hidden costs.
        </p>

        <h2 className="mt-12 text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          What your website can do
        </h2>
        <ul className="mt-4 space-y-6">
          {features.map((feature) => (
            <li key={feature.title}>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm/6 text-zinc-600 dark:text-zinc-400">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Built for local businesses
        </h2>
        <p className="mt-4 text-sm/6 text-zinc-600 dark:text-zinc-400">
          This is what it looks like in practice.{' '}
          <Link
            href="/blog/davison-menswear"
            className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Davison Menswear
          </Link>
          , a family kilt shop in Bruntsfield, runs its whole business from one
          page — bookings, reviews, orders, and a tartan finder. No monthly
          fees. No training course.
        </p>
        <p className="mt-4 text-sm/6 text-zinc-600 dark:text-zinc-400">
          Tell me about your business and I&apos;ll tell you what your website
          needs — with a fixed price up front.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}
