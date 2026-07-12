export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Charlie Macnamara',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        Privacy Policy
      </h1>
      <div className="mt-8 space-y-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>
          This site collects no personal data beyond standard server logs. No
          cookies are used for tracking or analytics.
        </p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Data Collection
        </h2>
        <p>
          This is a static site hosted on Cloudflare Pages. Cloudflare may log
          standard HTTP request data (IP address, user agent, requested URL) as
          part of normal operations. These logs are not used for profiling or
          advertising.
        </p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Cookies
        </h2>
        <p>
          This site does not set any cookies. No analytics, tracking, or
          advertising cookies are used.
        </p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Contact
        </h2>
        <p>
          If you have questions about this policy, contact{' '}
          <a
            href="mailto:mail@charliemacnamara.uk"
            className="text-teal-600 underline hover:text-teal-500 dark:text-teal-400"
          >
            mail@charliemacnamara.uk
          </a>
          .
        </p>
        <p className="text-sm text-zinc-400">
          Last updated: July 2026
        </p>
      </div>
    </div>
  )
}
