import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AuthorTools } from '@/components/AuthorTools'
import { getSiteContent, copy } from '@/utilities/siteContent'
export const metadata={title:'Find Your Service & Pricing | Heather Altundag',description:'Find the right author support and estimate project pricing.'}
export default async function Page(){
  const settings=await getSiteContent()
  let offerings:any[]=[]
  try { const payload=await getPayload({config:configPromise});offerings=(await payload.find({collection:'offerings' as any,limit:100,overrideAccess:false,where:{_status:{equals:'published'}}})).docs }catch{}
  return <article className="editorial-page"><header className="editorial-page-hero"><p className="editorial-eyebrow">Start here</p><h1>{copy(settings,'toolsTitle','Find your next step')}</h1><p>{copy(settings,'toolsIntro','Not sure which service fits your project? Explore a recommendation and see indicative pricing where available.')}</p></header><section className="editorial-section"><AuthorTools offerings={offerings}/></section></article>
}
