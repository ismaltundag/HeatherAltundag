import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getSiteContent, copy } from '@/utilities/siteContent'
export const metadata = { title: 'Blog | Heather Altundag', description: 'Writing, editing, publishing and author business insights.' }
export default async function Page() {
  const settings = await getSiteContent()
  let posts: any[] = []
  try { const payload = await getPayload({config:configPromise}); posts = (await payload.find({collection:'blog-posts' as any,depth:1,sort:'-publishedAt',limit:50,overrideAccess:false,where:{_status:{equals:'published'}}})).docs } catch {}
  return <article className="editorial-page"><header className="editorial-page-hero">
    <p className="editorial-eyebrow">{copy(settings,'blogEyebrow','The author’s notebook')}</p>
    <h1>{copy(settings,'blogTitle','Writing & publishing insights')}</h1>
    <p>{copy(settings,'blogIntro','Helpful articles on manuscripts, publishing, reader communities, and the creative process.')}</p>
  </header><section className="editorial-section"><div className="editorial-service-grid">
    {posts.length ? posts.map(post=><Link className="editorial-service-card" href={`/blog/${post.slug}`} key={post.id}>
      <p className="editorial-eyebrow">{post.category}</p><h2>{post.title}</h2><p>{post.excerpt}</p><span className="editorial-text-link">Read article ↗</span>
    </Link>) : <p>New articles are coming soon. Check back for writing and publishing insights.</p>}
  </div></section></article>
}
