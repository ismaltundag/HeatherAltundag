'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

type Rate = { title: string; category: string; pricingModel: string; price?: number | null; slug?: string }
export function AuthorTools({ offerings }: { offerings: Rate[] }) {
  const [words, setWords] = useState(80000)
  const [selected, setSelected] = useState('')
  const [stage, setStage] = useState('draft')
  const [need, setNeed] = useState('feedback')
  const priced = offerings.filter(o => typeof o.price === 'number')
  const offering = priced.find(o => o.slug === selected)
  const estimate = useMemo(() => {
    if (!offering || typeof offering.price !== 'number') return null
    return offering.pricingModel === 'per-word' ? offering.price * words : offering.price
  }, [offering, words])
  const recommendation = need === 'website' ? 'A custom author website or website refresh' : need === 'launch' ? 'Book launch and ARC team support' : need === 'admin' ? 'Monthly author assistance' : stage === 'finished' ? 'Proofreading or a final beta read' : 'A manuscript evaluation or beta read'
  return <div className="editorial-tools-grid">
    <section className="editorial-service-card">
      <p className="editorial-eyebrow">Find the right fit</p><h2>What do you need help with?</h2>
      <label htmlFor="stage">Where are you in the process?</label>
      <select id="stage" value={stage} onChange={e=>setStage(e.target.value)}>
        <option value="draft">Drafting or revising</option><option value="finished">Manuscript nearly finished</option><option value="published">Publishing or already published</option>
      </select>
      <label htmlFor="need">Your biggest priority</label>
      <select id="need" value={need} onChange={e=>setNeed(e.target.value)}>
        <option value="feedback">Feedback on my manuscript</option><option value="launch">Launching my book</option>
        <option value="admin">Ongoing author admin</option><option value="website">An author website</option>
      </select>
      <p className="editorial-tool-result"><strong>Suggested starting point:</strong> {recommendation}</p>
      <Link className="editorial-text-link" href={`/contact?service=${encodeURIComponent(recommendation)}`}>Ask about this option ↗</Link>
    </section>
    <section className="editorial-service-card">
      <p className="editorial-eyebrow">Plan your project</p><h2>Estimate your investment</h2>
      <label htmlFor="rate">Service</label>
      <select id="rate" value={selected} onChange={e=>setSelected(e.target.value)}>
        <option value="">Select a priced service</option>
        {priced.map(o=><option value={o.slug} key={o.slug}>{o.title}</option>)}
      </select>
      <label htmlFor="words">Manuscript word count</label>
      <input id="words" type="number" min="1000" max="1000000" step="1000" value={words} onChange={e=>setWords(Math.max(1000,Number(e.target.value)||1000))}/>
      {estimate!==null?<p className="editorial-tool-result"><strong>{offering?.pricingModel==='starting'?'Starting at':'Indicative price'}:</strong> ${estimate.toLocaleString('en-US',{maximumFractionDigits:2})}{offering?.pricingModel==='monthly'?'/month':''}</p>:<p className="editorial-tool-result">Prices appear here when Heather publishes a rate in the CMS. Otherwise, request a custom quote.</p>}
      <p>Estimates are informational, not a binding offer. Scope and final pricing are confirmed individually.</p>
      <Link className="editorial-text-link" href="/contact">Request a quote ↗</Link>
    </section>
  </div>
}
