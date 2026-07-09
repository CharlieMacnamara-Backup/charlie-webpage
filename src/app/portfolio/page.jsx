import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { generateMetadata as seoMetadata } from '@/components/SEO'
import { getTranslations } from 'next-intl/server'

function PortfolioSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </Section>
  )
}

function ProjectCard({ title, description, cta, href }) {
  return (
    <Card as="article" className="flex h-full flex-col justify-between">
      <div>
        <Card.Title as="h3" href={href}>
          {title}
        </Card.Title>
        <Card.Description>{description}</Card.Description>
      </div>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

function ActiveSites({ data }) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-800/50">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>{data.heading}</span>
      </h2>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        {data.description}
      </p>
      <ul className="mt-4 space-y-4">
        {data.sites.map((site, i) => (
          <li key={i} className="text-sm">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              <a
                href={
                  i === 0 ? 'https://sicamon.com/' : 'https://qualitykilts.com/'
                }
                className="underline underline-offset-2"
              >
                {site.name}
              </a>
            </span>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {site.description}
              {site.readMore && (
                <>
                  {' '}
                  <a
                    href="/blog/davison-menswear"
                    className="font-medium text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    {site.readMore}
                  </a>
                  .
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateMetadata() {
  const t = await getTranslations('portfolio')

  return seoMetadata({
    title: t('title'),
    description: t('description'),
    path: '/portfolio',
  })
}

export default async function Portfolio() {
  const t = await getTranslations('portfolio')

  return (
    <SimpleLayout
      title={t('pageTitle')}
      intro={
        <>
          {t('intro')
            .split('\n\n')
            .map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : ''}>
                {para.includes('drop me a line')
                  ? para.split('drop me a line').map((part, j) => (
                      <span key={j}>
                        {j > 0 && (
                          <a
                            href="mailto:mail@charliemacnamara.uk"
                            className="text-teal-600 underline underline-offset-2 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                          >
                            {t('introLinkText')}
                          </a>
                        )}
                        {part}
                      </span>
                    ))
                  : para}
              </p>
            ))}
        </>
      }
    >
      <div className="space-y-20">
        <ActiveSites data={t.raw('activeSites')} />

        {t.raw('sections').map((section) => (
          <PortfolioSection key={section.title} title={section.title}>
            {section.projects.map((project, i) => (
              <ProjectCard
                key={i}
                href={
                  section.title === 'Blog Posts'
                    ? [
                        'https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/',
                        'https://configcat.com/blog/2020/07/08/introduction-to-configcat-api/',
                        'https://www.honeybadger.io/blog/dockerize-django-preact-postgres/',
                        'https://wisej.com/blog/system-drawing-managed-beyond-libgdiplus/',
                      ][i]
                    : section.title === 'Documentation'
                      ? [
                          'https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/',
                          'https://docs.wisej.com/docs/releases/whats-new-in-3.1',
                          'https://transloadit.com/docs/transcoding/document-processing/document-convert/',
                          'https://transloadit.com/docs/robots/image-facedetect/',
                          'https://transloadit.com/docs/faq/reserved-capacity/',
                          'https://transloadit.com/docs/robots/digitalocean-import/',
                          'https://transloadit.com/docs/topics/template-credentials/',
                        ][i]
                      : section.title === 'Case Studies'
                        ? [
                            'https://wisej.com/case-studies/sonepar/',
                            'https://wisej.com/case-studies/fiuka/',
                            'https://wisej.com/case-studies/overjoyed/',
                          ][i]
                        : section.title === 'ESG Technical Content'
                          ? [
                              'https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/',
                              'https://sieraglobal.zendesk.com/hc/en-gb/articles/14269676332317-Net-Zero-Carbon-Guide',
                              'https://sieraglobal.zendesk.com/hc/en-gb/articles/12938753435677-Unit-Conversion',
                            ][i]
                          : [
                              'https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/',
                              'https://blog.roboflow.com/ffmpeg-computer-vision//',
                            ][i]
                }
                title={project.title}
                description={project.description}
                cta={project.cta}
              />
            ))}
          </PortfolioSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
