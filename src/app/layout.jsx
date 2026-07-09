import '@/lib/env-validator'
import '@/styles/tailwind.css'
import { Providers } from './providers'
import { ClientLayout } from '@/components/ClientLayout'
import { SkipToMain } from '@/components/SkipToMain'
import { Analytics } from '@/components/Analytics'
import { personSchema, websiteSchema, blogSchema } from '@/lib/schema'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('layout')

  return {
    title: {
      template: t('title.template'),
      default: t('title.default'),
    },
    description: t('description'),
    metadataBase: new URL('https://charliemacnamara.com'),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: t('twitterTitle'),
      description: t('ogDescription'),
      url: 'https://charliemacnamara.com',
      siteName: t('siteName'),
      locale: 'en_GB',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: t('twitterTitle'),
      card: 'summary_large_image',
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col bg-zinc-50/80 dark:bg-black font-['Trebuchet_MS',_sans-serif]"
        suppressHydrationWarning
      >
        <Analytics />
        <SkipToMain />
        <Providers>
          <ClientLayout>
            <div className="grow">{children}</div>
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
