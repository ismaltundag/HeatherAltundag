'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

type ServiceChoice = { slug: string; title: string }

const defaultServices: ServiceChoice[] = [
  { slug: 'editing', title: 'Manuscript editing' },
  { slug: 'proofreading', title: 'Proofreading' },
  { slug: 'beta-reading', title: 'Beta reading' },
  { slug: 'author-va', title: 'Author VA support' },
]

export function InquiryForm({ services = defaultServices }: { services?: ServiceChoice[] }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const servicesRequested = formData.getAll('servicesRequested').map(String)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      servicesRequested,
      genre: String(formData.get('genre') || ''),
      manuscriptStatus: String(formData.get('manuscriptStatus') || ''),
      wordCount: String(formData.get('wordCount') || ''),
      desiredDeadline: String(formData.get('desiredDeadline') || ''),
      projectGoals: String(formData.get('projectGoals') || ''),
      privacyAcknowledged: formData.get('privacyAcknowledged') === 'on',
      website: String(formData.get('website') || ''),
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Please review the form and try again.')
      router.push('/inquiry-received')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your inquiry could not be sent.')
    }
  }

  return (
    <form className="editorial-inquiry-form" onSubmit={submit}>
      <div className="editorial-form-grid">
        <label>
          <span>Your name</span>
          <input autoComplete="name" name="name" required />
        </label>
        <label>
          <span>Email address</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <fieldset className="editorial-service-options">
          <legend>What support are you looking for?</legend>
          {services.map((service) => (
            <label className="editorial-checkbox" key={service.slug}>
              <input name="servicesRequested" type="checkbox" value={service.slug} />
              <span>{service.title}</span>
            </label>
          ))}
        </fieldset>
        <label>
          <span>Genre</span>
          <input name="genre" placeholder="e.g. contemporary romance" required />
        </label>
        <label>
          <span>Project status</span>
          <select defaultValue="" name="manuscriptStatus" required>
            <option disabled value="">
              Choose one
            </option>
            <option value="planning">Planning</option>
            <option value="drafting">Draft in progress</option>
            <option value="complete">Complete draft</option>
            <option value="published">Previously published</option>
            <option value="not-applicable">Not applicable / VA support</option>
          </select>
        </label>
        <label>
          <span>
            Approximate word count <em>Optional</em>
          </span>
          <input min="1" name="wordCount" placeholder="e.g. 72,000" type="number" />
        </label>
        <label>
          <span>
            Desired deadline <em>Optional</em>
          </span>
          <input name="desiredDeadline" type="date" />
        </label>
        <label className="editorial-field-wide">
          <span>Tell me about your project and what you hope to achieve</span>
          <textarea maxLength={5000} minLength={20} name="projectGoals" required rows={6} />
        </label>
        <label aria-hidden="true" className="editorial-honeypot" htmlFor="inquiry-website">
          Website
          <input autoComplete="off" id="inquiry-website" name="website" tabIndex={-1} />
        </label>
      </div>
      <label className="editorial-privacy-check">
        <input name="privacyAcknowledged" required type="checkbox" />
        <span>
          I have read the <Link href="/privacy">privacy notice</Link> and agree to be contacted
          about this inquiry.
        </span>
      </label>
      {status === 'error' ? (
        <p className="editorial-form-error" role="alert">
          {message}
        </p>
      ) : null}
      <button
        className="editorial-button editorial-button-primary"
        disabled={status === 'loading'}
        type="submit"
      >
        {status === 'loading' ? 'Sending inquiry…' : 'Send project inquiry'}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="editorial-form-note">
        Sending an inquiry does not reserve a date or commit you to a service. Scope, availability,
        and any estimate will be confirmed first.
      </p>
    </form>
  )
}
