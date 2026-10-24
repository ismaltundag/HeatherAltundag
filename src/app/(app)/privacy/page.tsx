import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Notice | Editorial & Author Support' }

export default function PrivacyPage() {
  return (
    <article className="editorial-legal">
      <p className="editorial-eyebrow">Privacy</p>
      <h1>
        A note on
        <br />
        <em>your information.</em>
      </h1>
      <p className="editorial-legal-placeholder">
        This page is a launch placeholder and must be reviewed and completed by the site owner
        before collecting real client inquiries. Explain what inquiry data is collected, why it is
        needed, where it is stored, who can access it, how long it is retained, how to request
        deletion, and how to contact the business about privacy.
      </p>
      <h2>Inquiry information</h2>
      <p>
        Until this notice is finalized, do not submit confidential manuscript material, sensitive
        personal information, or attachments through this website.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        Document any analytics, cookies, embedded services, and third-party providers used by the
        live site before launch.
      </p>
    </article>
  )
}
