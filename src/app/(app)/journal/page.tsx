import type { Journal, Media } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Reading Journal | Editorial & Author Support',
  description: 'Personal reading notes, recent reads, and honest book reactions.',
}

export default async function JournalPage() {
  let entries: Journal[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'journal',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        and: [{ _status: { equals: 'published' } }, { entryType: { equals: 'reading-review' } }],
      },
    })
    entries = result.docs as Journal[]
  } catch {
    // Keep the public Reading Journal available while the CMS is being configured.
  }

  return (
    <article className="editorial-page">
      <header className="editorial-page-hero editorial-page-hero-compact">
        <p className="editorial-eyebrow">Personal reading notes</p>
        <h1>
          Recent reads &<br />
          <em>honest reactions.</em>
        </h1>
        <p>
          A personal shelf of books read for pleasure, the story moments that linger, and ideas
          worth carrying forward. These are personal opinions, separate from confidential client
          work.
        </p>
        <div className="editorial-journal-disclosure">
          Gifted copies, paid reviews, or other material relationships are disclosed on the relevant
          entry.
        </div>
      </header>
      <section className="editorial-section">
        <div className="editorial-section-head">
          <div>
            <p className="editorial-eyebrow">The Reading Journal</p>
            <h2>
              One book at a<br />
              <em>time.</em>
            </h2>
          </div>
          <p className="editorial-section-note">
            Select a review to read longer thoughts on the characters, pacing, prose, and who might
            enjoy the book.
          </p>
        </div>
        {entries.length ? (
          <div className="editorial-journal-list">
            {entries.map((entry, index) => {
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
                    <h2>{entry.bookTitle || entry.title}</h2>
                    {entry.bookAuthor ? (
                      <p className="editorial-journal-author">by {entry.bookAuthor}</p>
                    ) : null}
                    {entry.excerpt ? <p>{entry.excerpt}</p> : null}
                    <span className="editorial-text-link">
                      Read full review <span aria-hidden="true">↗</span>
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
              Reading Journal entries will appear here when published. The site owner can add a
              review in the Payload dashboard.
            </p>
          </div>
        )}
      </section>
    </article>
  )
}
