import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('privacy')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
        {t('heading')}
      </h1>
      <div className="mt-8 space-y-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        <p>{t('intro')}</p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          {t('dataCollectionHeading')}
        </h2>
        <p>{t('dataCollectionBody')}</p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          {t('cookiesHeading')}
        </h2>
        <p>{t('cookiesBody')}</p>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          {t('contactHeading')}
        </h2>
        <p>
          {t('contactLead')}
          <a
            href="mailto:mail@charliemacnamara.uk"
            className="text-teal-600 underline hover:text-teal-500 dark:text-teal-400"
          >
            {t('contactEmail')}
          </a>
          .
        </p>
        <p className="text-sm text-zinc-400">{t('lastUpdated')}</p>
      </div>
    </div>
  )
}
