import { InquiryForm } from '@/components/InquiryForm'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Work With Me | Editorial & Author Support',
  description: 'Share your manuscript or author-support project for an initial conversation.',
}

export default async function ContactPage() {
  let services: { slug: string; title: string }[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      depth: 0,
      limit: 20,
      overrideAccess: false,
      sort: 'sortOrder',
      where: { _status: { equals: 'published' } },
    })
    services = result.docs.map((service) => ({ slug: service.serviceType, title: service.title }))
  } catch {
    // The inquiry form includes safe service choices while CMS content is being configured.
  }

  return (
    <article className="editorial-page editorial-contact-page">
      <header className="editorial-page-hero editorial-contact-hero">
        <p className="editorial-eyebrow">A thoughtful first conversation</p>
        <h1>
          Tell me about
          <br />
          <em>your project.</em>
        </h1>
        <p>
          Share what you are working on and what kind of support you are looking for. I’ll review
          your note and follow up about fit, scope, and availability.
        </p>
      </header>
      <section className="editorial-contact-layout">
        <aside className="editorial-contact-aside">
          <p className="editorial-eyebrow">Before you send</p>
          <h2>
            A few details
            <br />
            help us begin.
          </h2>
          <p>
            This form is an initial inquiry, not a booking or agreement. Please do not send
            unpublished manuscript files yet; if a project moves forward, a secure sharing process
            can be agreed first.
          </p>
          <div className="editorial-contact-note">
            <span>01</span>
            <p>Share only what is useful to understand your project and goals.</p>
          </div>
          <div className="editorial-contact-note">
            <span>02</span>
            <p>Service scope, timeline, and any quote are confirmed before work begins.</p>
          </div>
          <div className="editorial-contact-note">
            <span>03</span>
            <p>
              See the <Link href="/privacy">privacy notice</Link> and{' '}
              <Link href="/terms">service terms</Link>.
            </p>
          </div>
        </aside>
        <div className="editorial-contact-form-wrap">
          <InquiryForm services={services.length ? services : undefined} />
        </div>
      </section>
    </article>
  )
}
