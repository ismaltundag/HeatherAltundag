import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params
  const payload=await getPayload({config:configPromise})
  const posts=await payload.find({collection:'blog-posts',depth:1,limit:1,overrideAccess:false,where:{and:[{slug:{equals:slug}},{_status:{equals:'published'}}]}})
  const post=posts.docs[0]
  if(!post) notFound()
  return <article className="editorial-page"><header className="editorial-page-hero"><p className="editorial-eyebrow">{post.category}</p><h1>{post.title}</h1><p>{post.excerpt}</p></header>
    <section className="editorial-section"><RichText data={post.body} enableGutter={false}/><p><Link className="editorial-text-link" href="/blog">← All articles</Link></p></section>
  </article>
}
