import Link from 'next/link'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Go back home
        </Link>
      </div>
    </Container>
  )
}
