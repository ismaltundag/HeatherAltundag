import configPromise from '@payload-config'
import type { Service } from '@/payload-types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import { getSiteContent, copy } from '@/utilities/siteContent'

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

  const settings = await getSiteContent()
  const c = (key: string, fallback: string) => copy(settings, key, fallback)
  const defaultFaqs = [
    { question: 'Which service fits my manuscript?', answer: 'Share your manuscript stage and goals in the inquiry form. The appropriate service and scope can be discussed before a quote is prepared.' },
    { question: 'How is pricing determined?', answer: 'Pricing depends on service, manuscript length or task scope, condition, requested deliverables, and scheduling. Any estimate is non-binding until confirmed in writing.' },
    { question: 'Do you accept every genre and project?', answer: 'Accepted genres, formats, and availability should be confirmed before a project is booked. Include those details in your inquiry.' },
    { question: 'How do you handle confidentiality?', answer: 'Unpublished material and project details should be shared only through the agreed process. Review the privacy and service terms before submitting sensitive information.' },
    { question: 'Do you offer sample edits or reports?', answer: 'Ask about a sample or introductory conversation in your inquiry. Availability and scope are confirmed individually.' },
    { question: 'What are the payment and revision terms?', answer: 'Payment, cancellation, and revision terms are provided in a written quote or service agreement before work begins.' },
  ]
  const faqs: { question: string; answer: string }[] = Array.isArray(settings.faqs) && settings.faqs.length ? settings.faqs : defaultFaqs

  return (
    <article className="editorial-page">
      <header className="editorial-page-hero">
        <p className="editorial-eyebrow">{c('servicePageEyebrow', "Services & approach")}</p>
        <h1>
          {c('servicePageHeading', "The right support")}
          <br />
          <em>{c('servicePageEmphasis', "for your next step.")}</em>
        </h1>
        <p>
          {c('servicePageDescription', "Every project is different. Start with what you need; scope, availability, deliverables, and any estimate are confirmed together before work begins.")}
        </p>
        <a className="editorial-text-link" href="#service-guide">
          Compare service areas <span aria-hidden="true">↓</span>
        </a>
      </header>
      <section className="editorial-section" id="service-guide">
        <div className="editorial-section-head">
          <div>
            <p className="editorial-eyebrow">{c('serviceListEyebrow', "A clear place to begin")}</p>
            <h2>
              {c('serviceListHeading', "Choose the kind")}
              <br />
              {c('serviceListEmphasis', "of help you need.")}
            </h2>
          </div>
          <p className="editorial-section-note">
            {c('serviceListDescription', "Only services currently offered and within scope should be published here. Ask about your project if you are unsure where it fits.")}
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
          {c('pricingDisclaimer', "Any displayed rate is indicative unless explicitly agreed in a written quote. A submission does not reserve availability or create a client relationship.")}
        </p>
      </section>
      <section className="editorial-faq-section" id="faq">
        <div className="editorial-section editorial-faq-layout">
          <div>
            <p className="editorial-eyebrow">{c('faqEyebrow', "Good to know")}</p>
            <h2>
              {c('faqHeading', "Before we")}
              <br />
              <em>{c('faqEmphasis', "begin.")}</em>
            </h2>
            <p>
              {c('faqIntroduction', "Questions are welcome. Project details are confirmed directly before any work starts.")}
            </p>
          </div>
          <div className="editorial-faq-list">
            {faqs.map((faq, index) => (
              <details key={index}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="editorial-bottom-cta">
        <p className="editorial-eyebrow">{c('serviceCtaEyebrow', "Ready when you are")}</p>
        <h2>
          {c('serviceCtaHeading', "Let’s talk about")}
          <br />
          <em>{c('serviceCtaEmphasis', "your project.")}</em>
        </h2>
        <Link className="editorial-button editorial-button-primary" href="/contact">
          {c('serviceCtaButton', "Work with me")} <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
