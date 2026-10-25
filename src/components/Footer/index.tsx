import type { Footer } from '@/payload-types'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import {
    siBluesky,
    siFacebook,
    siGoodreads,
    siInstagram,
    siPinterest,
    siThreads,
    siTiktok,
    siX,
    siYoutube,
} from 'simple-icons'

const SITE_NAME = 'Heather Altundag · Editorial & Author Support'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  const footer: Footer = await payload.findGlobal({ slug: 'footer', depth: 1 })
  const socialLinks = footer.socialLinks || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = currentYear

  const copyrightName = SITE_NAME

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="container">
        <div className="editorial-footer-top">
          <Link className="editorial-footer-brand-link" href="/">
            <span aria-hidden="true" className="editorial-monogram">
              HA
            </span>
            <span className="editorial-footer-brand">
              Heather Altundag <small>Editorial & Author Support</small>
            </span>
          </Link>
          <nav aria-label="Footer navigation" className="editorial-footer-nav">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/journal">Reading Journal</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/contact">Work with me</Link>
          </nav>
          {socialLinks.length ? (
            <div className="editorial-footer-social" aria-label="Social media links">
              <span className="editorial-footer-social-label">Follow along</span>
              <div className="editorial-footer-social-links">
                {socialLinks.map((social) => {
                  const icon = {
                    instagram: siInstagram,
                    facebook: siFacebook,
                    twitter: siX,
                    tiktok: siTiktok,
                    youtube: siYoutube,
                    pinterest: siPinterest,
                    goodreads: siGoodreads,
                    bluesky: siBluesky,
                    threads: siThreads,
                  }[social.platform]

                  return (
                    <a
                      aria-label={`Follow Heather Altundag on ${social.platform}`}
                      className={`editorial-social-link editorial-social-${social.platform}`}
                      href={social.url}
                      key={social.id}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={social.platform}
                    >
                      <svg aria-hidden="true" className="editorial-social-icon" viewBox="0 0 24 24">
                        <path d={icon.path} />
                      </svg>
                    </a>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-neutral-200 py-2 text-sm dark:border-neutral-700">
        <div className="container mx-auto flex w-full flex-col items-center gap-1 sm:flex-row sm:justify-between sm:gap-4 md:gap-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-px border-l border-neutral-400 md:inline-block" />
          <nav aria-label="Legal links" className="editorial-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
          <p className="md:ml-auto">
            <a
              className="text-black hover:underline dark:text-white"
              href="https://www.linkedin.com/in/ialtundag"
              rel="noopener noreferrer"
              target="_blank"
            >
              Site by Ismail Altundag
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
