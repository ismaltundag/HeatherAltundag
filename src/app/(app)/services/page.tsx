import configPromise from '@payload-config'
import type { Service } from '@/payload-types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Services | Editorial & Author Support',
  description: 'Compare editing, proofreading, beta reading, and author support services.',
}

type ServiceSummary = Pick<
  Service,
  'deliverables' | 'pricingModel' | 'scope' | 'serviceType' | 'startingPrice' | 'summary' | 'title' | 'turnaround'
>

const starterServices: ServiceSummary[] = [
  {
    serviceType: 'editing',
    title: 'Manuscript editing',
    summary:
      'Thoughtful support for story structure, prose, clarity, and consistency, based on the agreed editing scope.',
    scope:
      'Editing levels and deliverables vary. We will confirm the manuscript stage, requested depth, and exact deliverables before quoting.',
    pricingModel: 'custom-quote',
    deliverables: [],
  },
  {
    serviceType: 'proofreading',
    title: 'Proofreading',
    summary:
      'A final-stage review focused on spelling, punctuation, consistency, and surface-level text errors.',
    scope:
      'Proofreading is intended for a manuscript that is already edited. It is not a substitute for developmental or line editing.',
    pricingModel: 'custom-quote',
    deliverables: [],
  },
  {
    serviceType: 'beta-reading',
    title: 'Beta reading',
    summary:
      'Reader-response feedback on the experience of reading a complete or near-complete manuscript.',
    scope:
      'Feedback is from a reader’s perspective and is distinct from professional editing or proofreading.',
    pricingModel: 'custom-quote',
    deliverables: [],
  },
  {
    serviceType: 'author-va',
    title: 'Author virtual assistance',
    summary: 'Organized behind-the-scenes support for agreed author-business tasks and projects.',
    scope:
      'Tasks, hours, schedule, and communication expectations are agreed in writing before work begins.',
    pricingModel: 'custom-quote',
    deliverables: [],
  },
]

function quoteLabel(service: { pricingModel?: string | null; startingPrice?: number | null }) {
  if (typeof service.startingPrice === 'number') {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(service.startingPrice)
    return service.pricingModel === 'fixed' ? formatted : `Starting at ${formatted}`
  }
  return 'Custom quote'
}

export default async function ServicesPage() {
  let services: ServiceSummary[] = starterServices
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
    if (result.docs.length) services = result.docs
  } catch {
    // Keep the services overview available while the CMS is being configured.
  }

  return (
    <article className="editorial-page">
      <header className="editorial-page-hero">
        <p className="editorial-eyebrow">Services & approach</p>
        <h1>
          The right support
          <br />
          <em>for your next step.</em>
        </h1>
        <p>
          Every project is different. Start with what you need; scope, availability, deliverables,
          and any estimate are confirmed together before work begins.
        </p>
        <a className="editorial-text-link" href="#service-guide">
          Compare service areas <span aria-hidden="true">↓</span>
        </a>
      </header>
      <section className="editorial-section" id="service-guide">
        <div className="editorial-section-head">
          <div>
            <p className="editorial-eyebrow">A clear place to begin</p>
            <h2>
              Choose the kind
              <br />
              of help you need.
            </h2>
          </div>
          <p className="editorial-section-note">
            Only services currently offered and within scope should be published here. Ask about
            your project if you are unsure where it fits.
          </p>
        </div>
        <div className="editorial-services-list">
          {services.map((service, index) => (
            <article
              className="editorial-service-detail"
              id={service.serviceType}
              key={service.serviceType}
            >
              <div className="editorial-service-number">0{index + 1}</div>
              <div className="editorial-service-main">
                <p className="editorial-eyebrow">{service.serviceType.replaceAll('-', ' ')}</p>
                <h2>{service.title}</h2>
                <p className="editorial-service-summary">{service.summary}</p>
                {service.scope ? <p className="editorial-service-scope">{service.scope}</p> : null}
                {service.deliverables?.length ? (
                  <ul className="editorial-deliverables">
                    {service.deliverables.map(
                      (item: { id?: string | null; item?: string }, itemIndex: number) => (
                        <li key={item.id || itemIndex}>{item.item}</li>
                      ),
                    )}
                  </ul>
                ) : null}
              </div>
              <div className="editorial-service-aside">
                <span className="editorial-price-label">{quoteLabel(service)}</span>
                {service.turnaround ? (
                  <span className="editorial-turnaround">Timing confirmed per project</span>
                ) : (
                  <span className="editorial-turnaround">Availability confirmed per project</span>
                )}
                <Link
                  className="editorial-text-link"
                  href={`/contact?service=${service.serviceType}`}
                >
                  Ask about this service <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="editorial-disclaimer">
          Any displayed rate is indicative unless explicitly agreed in a written quote. A submission
          does not reserve availability or create a client relationship.
        </p>
      </section>
      <section className="editorial-faq-section" id="faq">
        <div className="editorial-section editorial-faq-layout">
          <div>
            <p className="editorial-eyebrow">Good to know</p>
            <h2>
              Before we
              <br />
              <em>begin.</em>
            </h2>
            <p>
              Questions are welcome. Project details are confirmed directly before any work starts.
            </p>
          </div>
          <div className="editorial-faq-list">
            <details>
              <summary>Which service fits my manuscript?</summary>
              <p>
                Share your manuscript stage and goals in the inquiry form. The appropriate service
                and scope can be discussed before a quote is prepared.
              </p>
            </details>
            <details>
              <summary>How is pricing determined?</summary>
              <p>
                Pricing depends on service, manuscript length or task scope, condition, requested
                deliverables, and scheduling. Any estimate is non-binding until confirmed in
                writing.
              </p>
            </details>
            <details>
              <summary>Do you accept every genre and project?</summary>
              <p>
                Accepted genres, formats, and availability should be confirmed before a project is
                booked. Include those details in your inquiry.
              </p>
            </details>
            <details>
              <summary>How do you handle confidentiality?</summary>
              <p>
                Unpublished material and project details should be shared only through the agreed
                process. Review the privacy and service terms before submitting sensitive
                information.
              </p>
            </details>
            <details>
              <summary>Do you offer sample edits or reports?</summary>
              <p>
                Ask about a sample or introductory conversation in your inquiry. Availability and
                scope are confirmed individually.
              </p>
            </details>
            <details>
              <summary>What are the payment and revision terms?</summary>
              <p>
                Payment, cancellation, and revision terms are provided in a written quote or service
                agreement before work begins.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="editorial-bottom-cta">
        <p className="editorial-eyebrow">Ready when you are</p>
        <h2>
          Let’s talk about
          <br />
          <em>your project.</em>
        </h2>
        <Link className="editorial-button editorial-button-primary" href="/contact">
          Work with me <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
