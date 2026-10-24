import { Banner } from '@payloadcms/ui'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Heather Altundag Editorial &amp; Author Support.</h4>
      </Banner>
      Use this space to keep the public site accurate and current:
      <ul className={`${baseClass}__instructions`}>
        <li>
          {'Create a draft in '}
          <strong>Reading Journal</strong>
          {' to add a personal review, then preview and publish it when ready.'}
        </li>
        <li>
          {'Manage only permission-cleared projects and testimonials in '}
          <strong>Editorial Services</strong>
          {'.'}
        </li>
        <li>
          {'Review prospective-client submissions in '}
          <strong>Private Inquiries</strong>
          {'. Unpublished manuscripts and inquiry details stay private.'}
        </li>
        <li>
          {'Update your professional profile, social links, and other shared details in '}
          <strong>Site &amp; Pages</strong>
          {', then '}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">visit your website</a>
          {' to confirm the published result.'}
        </li>
      </ul>
    </div>
  )
}
