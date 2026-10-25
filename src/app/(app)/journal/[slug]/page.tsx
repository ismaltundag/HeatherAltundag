import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Journal, Media } from '@/payload-types'
import { RichText } from '@/components/RichText'

type Args = {
  params: Promise<{
    slug: string
  }>
}

async function queryJournalBySlug({ slug }: { slug: string }): Promise<Journal | null> {
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'journal',
    draft: isDraftMode,
    limit: 1,
    overrideAccess: isDraftMode,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const entries = await payload.find({
    collection: 'journal',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return entries.docs?.map(({ slug }) => ({ slug })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const entry = await queryJournalBySlug({ slug })

  if (!entry) return notFound()

  const metaImage = typeof entry.meta?.image === 'object' ? (entry.meta?.image as Media) : undefined
  const coverImage = typeof entry.coverImage === 'object' ? (entry.coverImage as Media) : undefined
  const seoImage = metaImage || coverImage

  return {
    title: `${entry.meta?.title || entry.title} | Heather Altundag Reading Journal`,
    description:
      entry.meta?.description ||
      entry.excerpt ||
      'Personal reading notes from Heather Altundag.',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage.alt || entry.title,
              url: seoImage.url,
            },
          ],
        }
      : null,
  }
}

export default async function JournalEntryPage({ params }: Args) {
  const { slug } = await params
  const entry = await queryJournalBySlug({ slug })

  if (!entry) return notFound()

  const cover = typeof entry.coverImage === 'object' ? (entry.coverImage as Media) : null
  const formattedDate = entry.publishedAt
    ? new Date(entry.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <article className="editorial-page min-h-screen pb-16 bg-[#F5F8FF] text-[#102347]">
      {/* Header */}
      <header className="max-w-4xl mx-auto pt-12 pb-8 px-4">
        <div className="mb-6">
          <Link
            className="storm-text-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            href="/journal"
          >
            ← Back to all entries
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest !text-black mb-3">
          <span>{entry.category || 'Journal'}</span>
          {formattedDate && (
            <>
              <span>·</span>
              <time dateTime={entry.publishedAt || ''}>{formattedDate}</time>
            </>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-normal leading-tight mb-4">
          {entry.title}
        </h1>

        {entry.excerpt && (
          <p className="text-lg md:text-xl !text-black !opacity-100 leading-relaxed pt-2">
            {entry.excerpt}
          </p>
        )}
      </header>

      {/* Cover Image */}
      {cover?.url && (
        <div className="max-w-4xl mx-auto px-4 mb-10">
          <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <img
              alt={cover.alt || entry.title}
              className="w-full h-auto max-h-[500px] object-cover"
              src={cover.url}
            />
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="editorial-review-body rounded-2xl border border-[#DCE8FA] bg-white px-5 py-8 text-[#102347] shadow-sm sm:px-9 sm:py-10">
          <RichText data={entry.content} enableGutter={false} />
        </div>

        {/* Reading Journal signoff */}
        <div className="mt-14 pt-8 border-t border-[#DCE8FA] flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg font-medium text-neutral-900 dark:text-white">
              — Heather Altundag
            </p>
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Personal Reading Journal
            </p>
          </div>
          <Link className="editorial-button editorial-button-secondary" href="/portfolio#reading-journal">
            More recent reads <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
