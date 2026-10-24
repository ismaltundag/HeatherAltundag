import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Service Terms | Editorial & Author Support' }

export default function TermsPage() {
  return (
    <article className="editorial-legal">
      <p className="editorial-eyebrow">Working together</p>
      <h1>
        Clear scope.
        <br />
        <em>Good collaboration.</em>
      </h1>
      <p className="editorial-legal-placeholder">
        This is a launch placeholder, not a final contract. The business owner should add reviewed
        terms covering scope, deliverables, fees, deposits, payment dates, scheduling, revisions,
        cancellations, confidentiality, intellectual property, and limits of service before taking
        on paid client work.
      </p>
      <h2>Before a project begins</h2>
      <p>
        An inquiry is not a booking. Work should begin only after both parties confirm the scope,
        availability, fee, schedule, and applicable terms in writing.
      </p>
      <h2>Confidentiality and files</h2>
      <p>
        Do not promise absolute confidentiality or accept sensitive manuscript uploads until the
        actual storage, access, retention, and deletion process has been reviewed.
      </p>
    </article>
  )
}
