import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getSiteContent, copy } from '@/utilities/siteContent'

const defaults: Record<string, { eyebrow: string; title: string; intro: string; examples: string[] }> = {
  'web-design': {
    eyebrow: 'Digital experiences for authors',
    title: 'Websites for authors',
    intro: 'Thoughtful websites that make it easier for readers to discover your books. Website design and development are provided in collaboration with a software developer.',
    examples: ['Author website starter', 'Professional author website', 'Custom author website', 'Website redesign', 'Website maintenance', 'Newsletter and book catalog integration'],
  },
  'author-assistance': {
    eyebrow: 'Behind-the-scenes support',
    title: 'Author assistance',
    intro: 'Organized, practical help for the publishing tasks that compete with writing time. Every project is scoped and confirmed individually.',
    examples: ['ARC team management', 'Newsletter management', 'Book launch coordination', 'Author inbox and calendar', 'Social media scheduling', 'Reader community support'],
  },
  packages: {
    eyebrow: 'Ways to work together',
    title: 'Packages & pricing',
    intro: 'Choose focused, one-time support or discuss an ongoing partnership. Published prices are estimates until confirmed in writing.',
    examples: ['Manuscript Checkup', 'Beta Reader Plus', 'Author Essentials', 'Launch Partner', 'Author Website Starter', 'Website Care Plan'],
  },
}
export async function ExpandedServices({ category }: { category: 'web-design' | 'author-assistance' | 'packages' }) {
  const settings = await getSiteContent()
  const data = defaults[category]
  let items: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({ collection: 'offerings' as any, limit: 100, sort: 'sortOrder', depth: 0, overrideAccess: false,
      where: { and: [{ category: { equals: category } }, { _status: { equals: 'published' } }] } })
    items = result.docs
  } catch { /* The CMS may not yet have content. */ }
  const prefix = category === 'web-design' ? 'web' : category === 'author-assistance' ? 'assistant' : 'packages'
  return <article className="editorial-page">
    <header className="editorial-page-hero">
      <p className="editorial-eyebrow">{copy(settings, prefix+'Eyebrow', data.eyebrow)}</p>
      <h1>{copy(settings, prefix+'Title', data.title)}</h1>
      <p>{copy(settings, prefix+'Intro', data.intro)}</p>
      <Link className="editorial-button editorial-button-primary" href="/contact">Discuss your project ↗</Link>
    </header>
    <section className="editorial-section">
      <div className="editorial-section-head"><div><p className="editorial-eyebrow">Explore your options</p><h2>Support for your <em>next chapter.</em></h2></div></div>
      <div className="editorial-service-grid">
        {(items.length ? items : data.examples.map((title,i) => ({ id: title, title, summary: 'Ask about availability, scope, and a custom quote for this service.', sortOrder: i }))).map((item:any, index:number) =>
          <div className="editorial-service-card" key={item.id || index}>
            <span className="editorial-card-index">{String(index+1).padStart(2,'0')}</span>
            <h3>{item.title}</h3><p>{item.summary}</p>
            {item.deliverables?.length ? <ul>{item.deliverables.map((d:any,i:number)=><li key={i}>{d.item}</li>)}</ul> : null}
            <p className="editorial-price-label">{typeof item.price === 'number' ? `${item.pricingModel === 'starting' ? 'From ' : ''}$${item.price.toLocaleString('en-US')}${item.pricingModel === 'monthly' ? '/month' : item.pricingModel === 'per-word' ? '/word' : ''}` : 'Custom quote'}</p>
            <Link className="editorial-text-link" href={`/contact?service=${encodeURIComponent(item.slug || category)}`}>{item.ctaLabel || 'Ask about this service'} ↗</Link>
          </div>)}
      </div>
    </section>
  </article>
}
