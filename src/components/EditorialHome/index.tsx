import type { Journal, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

const serviceGroups = [
  {
    key: 'editing',
    title: 'Manuscript editing',
    text: 'Editorial support for story shape, sentence-level clarity, and consistency—within a scope agreed for your project.',
  },
  {
    key: 'proofreading',
    title: 'Proofreading',
    text: 'A careful final-stage pass for spelling, punctuation, consistency, and surface-level text errors.',
  },
  {
    key: 'beta-reading',
    title: 'Beta reading',
    text: 'A reader’s response to pacing, characters, clarity, and the emotional experience of your story.',
  },
  {
    key: 'author-va',
    title: 'Author VA support',
    text: 'Organized help with agreed administrative and launch tasks for your author business.',
  },
]

export async function EditorialHome() {
  let services: any[] = []
  let journal: Journal[] = []
  let testimonials: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [serviceResult, journalResult, testimonialResult] = await Promise.all([
      payload.find({
        collection: 'services',
        depth: 0,
        limit: 8,
        overrideAccess: false,
        sort: 'sortOrder',
        where: { _status: { equals: 'published' } },
      }),
      payload.find({
        collection: 'journal',
        depth: 1,
        limit: 2,
        overrideAccess: false,
        sort: '-publishedAt',
        where: {
          and: [{ _status: { equals: 'published' } }, { entryType: { equals: 'reading-review' } }],
        },
      }),
      payload.find({
        collection: 'testimonials',
        depth: 0,
        limit: 2,
        overrideAccess: true,
        sort: 'sortOrder',
        where: {
          and: [{ _status: { equals: 'published' } }, { permissionToPublish: { equals: true } }],
        },
      }),
    ])
    services = serviceResult.docs
    journal = journalResult.docs as Journal[]
    testimonials = testimonialResult.docs
  } catch {
    // CMS setup is optional during local preview; use neutral, non-claim placeholders.
  }

  const servicesToShow = services.length ? services : serviceGroups

  return (
    <div className="editorial-site">
      <section className="editorial-hero">
        <div className="editorial-hero-content">
          <p className="editorial-eyebrow">Editorial care · Reader insight · Author support</p>
          <h1>
            Your story,
            <br />
            <em>supported</em>
            <br />
            at every stage.
          </h1>
          <p className="editorial-hero-intro">
            Thoughtful editing, honest reader feedback, and dependable behind-the-scenes support for
            authors bringing their stories to life.
          </p>
          <div className="editorial-actions">
            <Link className="editorial-button editorial-button-primary" href="/services">
              Explore services <span aria-hidden="true">↗</span>
            </Link>
            <Link className="editorial-link" href="/portfolio#reading-journal">
              Visit the Reading Journal
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="editorial-hero-art">
          <div className="editorial-art-paper">
            <span>
              For the love
              <br />
              of the story
            </span>
            <i>✳</i>
          </div>
          <div className="editorial-art-note">
            A considered space
            <br />
            for your next chapter.
          </div>
          <div className="editorial-art-orbit" />
        </div>
        <div className="editorial-hero-index">
          <span>01</span>
          <span>Thoughtful work, human first</span>
        </div>
      </section>

      <section className="editorial-section editorial-services-preview" id="services">
        <div className="editorial-section-head">
          <div>
            <p className="editorial-eyebrow">Ways to work together</p>
            <h2>
              Good stories deserve
              <br />
              <em>good support.</em>
            </h2>
          </div>
          <p className="editorial-section-note">
            The right help depends on where you are in the process. We’ll begin with your goals,
            then confirm scope and availability together.
          </p>
        </div>
        <div className="editorial-service-grid">
          {servicesToShow.map((service, index) => {
            const serviceKey = service.serviceType || serviceGroups[index]?.key || 'editing'
            return (
              <Link
                className="editorial-service-card"
                href={`/services#${serviceKey}`}
                key={service.id || serviceKey}
              >
                <span className="editorial-card-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.summary || service.text}</p>
                <span className="editorial-card-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            )
          })}
        </div>
        <div className="editorial-section-foot">
          <span>Scope and availability are confirmed before work begins.</span>
          <Link className="editorial-link" href="/services">
            Compare services <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="editorial-approach">
        <div className="editorial-approach-inner">
          <p className="editorial-eyebrow">A clear, collaborative process</p>
          <h2>
            From first note
            <br />
            to <em>next chapter.</em>
          </h2>
          <div className="editorial-process">
            {[
              [
                '01',
                'Tell me about it',
                'Share your project, what you need, and what matters most.',
              ],
              [
                '02',
                'Find the right fit',
                'We’ll confirm service scope, timing, and a clear quote before starting.',
              ],
              [
                '03',
                'Do thoughtful work',
                'The agreed work begins with clear communication along the way.',
              ],
              ['04', 'Move forward', 'Receive the agreed deliverables and decide your next step.'],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {journal.length ? (
        <section className="editorial-section editorial-reading-preview" id="reading-journal">
          <div className="editorial-section-head">
            <div>
              <p className="editorial-eyebrow">A reader’s notebook</p>
              <h2>
                Stories that
                <br />
                <em>stay with us.</em>
              </h2>
            </div>
            <p className="editorial-section-note">
              Personal reading notes, separate from confidential client work.
            </p>
          </div>
          <div className="editorial-reading-list">
            {journal.map((entry, index) => {
              const cover =
                typeof entry.coverImage === 'object' ? (entry.coverImage as Media) : null
              return (
                <Link
                  className={`editorial-journal-row ${index % 2 ? 'is-reversed' : ''}`}
                  href={`/journal/${entry.slug}`}
                  key={entry.id}
                >
                  <div className="editorial-journal-art">
                    {cover?.url ? (
                      <img
                        alt={cover.alt || entry.bookTitle || entry.title}
                        loading="lazy"
                        src={cover.url}
                      />
                    ) : (
                      <div className="editorial-journal-placeholder">
                        <span>{entry.bookTitle || entry.title}</span>
                        <small>{entry.bookAuthor || 'Reading Journal'}</small>
                      </div>
                    )}
                  </div>
                  <div className="editorial-journal-copy">
                    <p className="editorial-eyebrow">
                      {entry.genre || 'Recent read'}
                      {entry.rating ? ` · ${entry.rating}/5` : ''}
                    </p>
                    <h3>{entry.bookTitle || entry.title}</h3>
                    {entry.bookAuthor ? (
                      <p className="editorial-journal-author">by {entry.bookAuthor}</p>
                    ) : null}
                    {entry.excerpt ? <p>{entry.excerpt}</p> : null}
                    {entry.containsSpoilers ? (
                      <span className="editorial-spoiler-note">Spoiler warning on full review</span>
                    ) : null}
                    <span className="editorial-link">
                      Read the review <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="editorial-centered-action">
            <Link
              className="editorial-button editorial-button-secondary"
              href="/portfolio#reading-journal"
            >
              Explore the Reading Journal
            </Link>
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="editorial-testimonials">
          <div className="editorial-testimonials-inner">
            <p className="editorial-eyebrow">Shared with permission</p>
            <h2>
              Kind words from
              <br />
              <em>collaborators.</em>
            </h2>
            <div className="editorial-quote-grid">
              {testimonials.map((item) => (
                <blockquote key={item.id}>
                  <span aria-hidden="true">“</span>
                  <p>{item.quote}</p>
                  <cite>
                    {item.displayName} · {item.serviceType}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="editorial-closing">
        <div>
          <p className="editorial-eyebrow">Have a project in mind?</p>
          <h2>
            Let’s find your
            <br />
            <em>next right step.</em>
          </h2>
        </div>
        <div>
          <p>
            Start with a few details. There’s no obligation—just a thoughtful first conversation
            about your work and what support might help.
          </p>
          <Link className="editorial-button editorial-button-light" href="/contact">
            Work with me <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
