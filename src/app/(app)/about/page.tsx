import type { Media } from '@/payload-types'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'About | Editorial & Author Support',
  description:
    'Learn about the person and approach behind Heather Altundag Editorial & Author Support.',
}

export default async function AboutPage() {
  let profile: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    profile = await payload.findGlobal({ slug: 'about', depth: 1 })
  } catch {
    // Render neutral placeholder-safe content until profile details are confirmed.
  }
  const portrait = typeof profile?.portrait === 'object' ? (profile.portrait as Media) : null

  return (
    <article className="editorial-page">
      <header className="editorial-page-hero editorial-about-hero">
        <p className="editorial-eyebrow">A little about the editor</p>
        <h1>
          Good work begins
          <br />
          with <em>good listening.</em>
        </h1>
        <p>
          {profile?.professionalBio ||
            'A professional biography will be added here once the owner confirms the details she would like to share.'}
        </p>
      </header>
      <section className="editorial-about-layout">
        <div className="editorial-about-portrait">
          {portrait?.url ? (
            <img alt={portrait.alt || 'Portrait'} src={portrait.url} />
          ) : (
            <div className="editorial-portrait-placeholder">
              <span>CS</span>
              <small>Portrait to be added</small>
            </div>
          )}
        </div>
        <div className="editorial-about-copy">
          <p className="editorial-eyebrow">The working relationship</p>
          <h2>
            Thoughtful, clear,
            <br />
            <em>and collaborative.</em>
          </h2>
          <p>
            {profile?.workingPhilosophy ||
              'Every project starts with a conversation about what you need, what is in scope, and what a useful outcome looks like. No assumptions, inflated promises, or one-size-fits-all packages.'}
          </p>
          {profile?.genresServed ? (
            <div className="editorial-profile-detail">
              <span className="editorial-eyebrow">Genres & formats</span>
              <p>{profile.genresServed}</p>
            </div>
          ) : null}
          {profile?.experienceAndTraining ? (
            <div className="editorial-profile-detail">
              <span className="editorial-eyebrow">Experience & training</span>
              <p>{profile.experienceAndTraining}</p>
            </div>
          ) : null}
          {!profile?.genresServed && !profile?.experienceAndTraining ? (
            <p className="editorial-owner-note">
              Genres, experience, and training will be listed here once confirmed by the owner.
            </p>
          ) : null}
          <Link className="editorial-button editorial-button-primary" href="/services">
            Explore services <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="editorial-about-values">
        <p className="editorial-eyebrow">A note on the work</p>
        <h2>
          Your manuscript is yours.
          <br />
          <em>The process should feel that way.</em>
        </h2>
        <p>
          Personal Reading Journal entries are clearly separate from client projects. Portfolio
          samples or testimonials appear only when permission has been given.
        </p>
        <Link className="editorial-text-link" href="/portfolio">
          See portfolio & Reading Journal <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </article>
  )
}
