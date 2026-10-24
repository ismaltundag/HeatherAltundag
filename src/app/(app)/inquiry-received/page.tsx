import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inquiry Received | Editorial & Author Support',
  robots: { index: false, follow: false },
}

export default function InquiryReceivedPage() {
  return (
    <main className="editorial-confirmation">
      <span aria-hidden="true" className="editorial-confirmation-mark">
        ✓
      </span>
      <p className="editorial-eyebrow">Note received</p>
      <h1>
        Thank you for
        <br />
        <em>sharing your story.</em>
      </h1>
      <p>
        Your inquiry has been received. It is not a booking or confirmation of availability. I’ll
        review the project details and follow up when I can.
      </p>
      <Link className="editorial-button editorial-button-secondary" href="/">
        Return home
      </Link>
    </main>
  )
}
