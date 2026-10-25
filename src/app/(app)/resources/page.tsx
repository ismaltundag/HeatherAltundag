import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getSiteContent, copy } from '@/utilities/siteContent'
export const metadata={title:'Resources | Heather Altundag',description:'Guides and resources for authors.'}
export default async function Page(){
  const settings=await getSiteContent()
  let items:any[]=[]
  try { const payload=await getPayload({config:configPromise});items=(await payload.find({collection:'resources' as any,depth:1,sort:'sortOrder',limit:100,overrideAccess:false,where:{_status:{equals:'published'}}})).docs }catch{}
  return <article className="editorial-page"><header className="editorial-page-hero"><p className="editorial-eyebrow">Free tools for writers</p><h1>{copy(settings,'resourcesTitle','Author resources')}</h1><p>{copy(settings,'resourcesIntro','Useful guides, checklists, and resources for your next chapter.')}</p></header><section className="editorial-section"><div className="editorial-service-grid">{items.length?items.map(item=>{
    const file=typeof item.file==='object'?item.file:null
    const href=item.externalUrl || file?.url
    return <div className="editorial-service-card" key={item.id}><p className="editorial-eyebrow">{item.category}</p><h2>{item.title}</h2><p>{item.description}</p>{href?<a className="editorial-text-link" href={href} rel="noopener noreferrer" target="_blank">View resource ↗</a>:null}</div>
  }):<p>New author resources are coming soon.</p>}</div></section></article>
}
