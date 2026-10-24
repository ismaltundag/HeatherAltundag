import type { Journal, Media } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Portfolio & Reading Journal | Editorial Services',
  description: 'Permission-cleared portfolio samples and personal reading reviews.',
}

export default async function PortfolioPage() {
  let projects: any[] = []
  let reviews: Journal[] = []
  let testimonials: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [projectResults, journalResults, testimonialResults] = await Promise.all([
      payload.find({
        collection: 'portfolio-projects',
        depth: 0,
        limit: 50,
        overrideAccess: true,
        sort: 'sortOrder',
        where: {
          and: [{ _status: { equals: 'published' } }, { permissionToPublish: { equals: true } }],
        },
      }),
      payload.find({
        collection: 'journal',
        depth: 1,
        limit: 100,
        overrideAccess: false,
        sort: '-publishedAt',
        where: {
          and: [{ _status: { equals: 'published' } }, { entryType: { equals: 'reading-review' } }],
        },
      }),
      payload.find({
        collection: 'testimonials',
        depth: 0,
        limit: 30,
        overrideAccess: true,
        sort: 'sortOrder',
        where: {
          and: [{ _status: { equals: 'published' } }, { permissionToPublish: { equals: true } }],
        },
      }),
    ])
    projects = projectResults.docs
    reviews = journalResults.docs as Journal[]
    testimonials = testimonialResults.docs
  } catch {
    // Empty published states remain informative until content is added.
  }

  return (
    <article className="editorial-page">
      <header className="editorial-page-hero editorial-page-hero-compact">
        <p className="editorial-eyebrow">Selected work · Personal reading</p>
        <h1>
          A portfolio of care
          <br />
          and a <em>reader’s shelf.</em>
        </h1>
        <p>
          Professional samples are shown only when permission allows. Reading Journal posts are
          personal opinions, separate from paid client work.
        </p>
        <nav aria-label="Portfolio sections" className="editorial-anchor-nav">
          <a href="#selected-work">Selected work</a>
          <a href="#reading-journal">Reading Journal</a>
          {testimonials.length ? <a href="#kind-words">Kind words</a> : null}
        </nav>
      </header>

      <section className="editorial-section" id="selected-work">
        <div className="editorial-section-head">
          <div>
            <p className="editorial-eyebrow">Permission-cleared only</p>
            <h2>
              Selected
              <br />
              <em>collaborations.</em>
            </h2>
          </div>
          <p className="editorial-section-note">
            Client names, excerpts, and project details appear only when explicit permission has
            been recorded. Confidential work remains private.
          </p>
        </div>
        {projects.length ? (
          <div className="editorial-project-grid">
            {projects.map((project) => (
              <article className="editorial-project-card" key={project.id}>
                <p className="editorial-eyebrow">{project.serviceType.replaceAll('-', ' ')}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.clientDisplayName ? (
                  <span className="editorial-project-attribution">{project.clientDisplayName}</span>
                ) : null}
                {project.sampleText ? <blockquote>{project.sampleText}</blockquote> : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="editorial-empty-panel">
            <span className="editorial-empty-mark">✳</span>
            <p>Permission-cleared samples will be added here as they become available.</p>
          </div>
        )}
      </section>

      <section className="editorial-reading-section" id="reading-journal">
        <div className="editorial-section">
          <div className="editorial-section-head">
            <div>
              <p className="editorial-eyebrow">Independent reading notes</p>
              <h2>
                Recent reads &<br />
                <em>honest reactions.</em>
              </h2>
            </div>
            <p className="editorial-section-note">
              These are personal reviews, not client feedback. Any gifted copies or other material
              relationships are disclosed on the relevant entry.
            </p>
          </div>
          {reviews.length ? (
            <div className="editorial-journal-list">
              {reviews.map((entry, index) => {
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
                      <p>{entry.excerpt}</p>
                      {entry.containsSpoilers ? (
                        <span className="editorial-spoiler-note">
                          Spoiler warning on full review
                        </span>
                      ) : null}
                      <span className="editorial-text-link">
                        Read the full review <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="editorial-empty-panel">
              <span className="editorial-empty-mark">A</span>
              <p>
                Reading Journal entries will appear here when published from the admin dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {testimonials.length ? (
        <section className="editorial-section" id="kind-words">
          <div className="editorial-section-head">
            <div>
              <p className="editorial-eyebrow">Shared with permission</p>
              <h2>
                Kind words from
                <br />
                <em>collaborators.</em>
              </h2>
            </div>
          </div>
          <div className="editorial-testimonial-list">
            {testimonials.map((item) => (
              <blockquote key={item.id}>
                <p>“{item.quote}”</p>
                <cite>
                  {item.displayName} · {item.serviceType}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      <section className="editorial-bottom-cta">
        <p className="editorial-eyebrow">Have a project in mind?</p>
        <h2>
          Let’s find your
          <br />
          <em>next right step.</em>
        </h2>
        <Link className="editorial-button editorial-button-primary" href="/contact">
          Work with me <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
