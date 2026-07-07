import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { generateMetadata } from '@/components/SEO'

function PortfolioSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </Section>
  )
}

function ProjectCard({ title, description, event, cta, href }) {
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

function ReferenceNote({ children }) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-800/50">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>⚠️ Note on EVORA Global Articles</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    </div>
  )
}

export const metadata = generateMetadata({
  title: 'Portfolio',
  description: 'Selected Technical Writing.',
  path: '/portfolio'
})

export default function Portfolio() {
  return (
    <SimpleLayout
      title="Selected Works"
      intro={
        <>
          Technical Writers wear many hats. Once I was tasked with designing Shopify mugs...
          <br /><br />
          Here's some varied work. For extra examples, please feel free to reach out.
        </>
      }
    >
      <div className="space-y-20">
        <ReferenceNote>
          Due to EVORA's single-user configuration, Zendesk articles were published under Matt Mattias. Matt is a resume reference and former manager. Please check on the reference request.
        </ReferenceNote>

        <PortfolioSection title="Blog Posts">
          <ProjectCard
            href="https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/"
            title="Implementing AI Face Detection in Smart CDN"
            description="Guide on integrating AI face detection using CDN infrastructure."
            cta="View"
          />
          <ProjectCard
            href="https://configcat.com/blog/2020/07/08/introduction-to-configcat-api/"
            title="Deep Dive: ConfigCat Public Management API"
            description="Public Management API Demo."
            cta="View"
          />
          <ProjectCard
            href="https://www.honeybadger.io/blog/dockerize-django-preact-postgres/"
            title="How to dockerize a Django, Preact, and PostgreSQL Application"
            description="Comprehensive Dockerization Guide."
            cta="View"
          />
          <ProjectCard
            href="https://wisej.com/blog/system-drawing-managed-beyond-libgdiplus/"
            title="Enhanced Graphics in Wisej.NET: Beyond LibGDIPlus"
            description="Introducing consistent cross-platform graphics for Windows apps."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="Documentation">
          <ProjectCard
            href="https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/"
            title="SIERA API Reference: Consumption Metrics"
            description="ESG API documentation."
            cta="View"
          />
          
          <ProjectCard
            href="https://docs.wisej.com/docs/releases/whats-new-in-3.1"
            title="What's new in Wisej.NET 3.1"
            description="Version release documentation."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/transcoding/document-processing/document-convert/"
            title="Document Convert Specification"
            description="Convert documents into different formats; parameters, usage, and examples."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/robots/image-facedetect/"
            title="Image Face Detection Specification"
            description="Detect faces in images; parameters, usage, and examples."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/faq/reserved-capacity/"
            title="Transloadit Plans: Priority Job Slots"
            description="Reserved capacity and job slot claims explained."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/robots/digitalocean-import/"
            title="DigitalOcean Import Specification"
            description="Import files from DigitalOcean; parameters, usage, and examples."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/topics/template-credentials/"
            title="Template Credentials"
            description="Managing credentials in Templates securely."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="Case Studies">
          <ProjectCard
            href="https://wisej.com/case-studies/sonepar/"
            title="Sonepar: Wisej.NET-based Pricing Solution"
            description="High-scale pricing conditions solution integrated with SAP."
            cta="View"
          />
          <ProjectCard
            href="https://wisej.com/case-studies/fiuka/"
            title="FIUKA: Streamlining Metal Processing"
            description="Manufacturing processes modernized with Wisej.NET."
            cta="View"
          />
          <ProjectCard
            href="https://wisej.com/case-studies/overjoyed/"
            title="Overjoyed: Accessibility Gaming App"
            description="Input solutions using mouse or eye gaze with Wisej.NET."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="ESG Technical Content">
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/"
            title="Data Gap Analysis Methodology"
            description="Guide on identifying and addressing environmental metric gaps."
            cta="View"
          />
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/14269676332317-Net-Zero-Carbon-Guide"
            title="Net Zero Carbon Guide"
            description="Overview of SIERA's Net Zero Carbon dashboards, pathways, and modelling."
            cta="View"
          />
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/12938753435677-Unit-Conversion"
            title="Unit Conversion Guide"
            description="Product overview - conversion methodologies."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="Technical Showcases">
          <ProjectCard
            href="https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/"
            title="Wisej.NET Visual Studio Integration Guide"
            description="Youtube tutorial on using Wisej.NET with Visual Studio."
            cta="Watch"
          />
          <ProjectCard
            href="https://blog.roboflow.com/ffmpeg-computer-vision//"
            title="Computer Vision with FFmpeg"
            description="Integrating computer vision with FFmpeg video processing."
            cta="View"
          />
        </PortfolioSection>
      </div>
    </SimpleLayout>
  )
}
