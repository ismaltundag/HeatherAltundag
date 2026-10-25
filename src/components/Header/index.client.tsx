'use client'
import Link from 'next/link'
import { Suspense } from 'react'

import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

import { cn } from '@/utilities/cn'
import { usePathname } from 'next/navigation'

type Props = {
  header: Header
}

const fallbackMenu: NonNullable<Header['navItems']> = [
  { id: 'about', link: { type: 'custom', label: 'About', url: '/about' } },
  { id: 'services', link: { type: 'custom', label: 'Services', url: '/services' } },
  { id: 'portfolio', link: { type: 'custom', label: 'Portfolio', url: '/portfolio' } },
  { id: 'journal', link: { type: 'custom', label: 'Reading Journal', url: '/journal' } },
  { id: 'blog', link: { type: 'custom', label: 'Blog', url: '/blog' } },
  { id: 'faq', link: { type: 'custom', label: 'FAQ', url: '/services#faq' } },
]

export function HeaderClient({ header }: Props) {
  const menu = (header?.navItems?.length ? header.navItems : fallbackMenu).filter((item) => !['/websites', '/author-assistance', '/packages', '/find-your-service'].includes(item.link.url || ''))
  const pathname = usePathname()

  return (
    <header className="editorial-header relative z-20">
      <nav aria-label="Main navigation" className="editorial-header-inner container relative">
        <div className="editorial-mobile-menu">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <Link
          className="editorial-wordmark"
          href="/"
          aria-label="Editorial and author support home"
        >
          <span aria-hidden="true" className="editorial-monogram">
            HA
          </span>
          <span className="editorial-wordmark-text">
            <strong>Heather Altundag</strong>
            <small>Editorial & Author Support</small>
          </span>
        </Link>
        {menu.length ? (
          <ul className="editorial-header-nav">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link.url || '#'}
                  className={cn('editorial-nav-link', {
                    active:
                      item.link.url && item.link.url !== '/'
                        ? pathname.includes(item.link.url)
                        : false,
                  })}
                >
                  {item.link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link className="editorial-header-cta" href="/contact" aria-label="Work with me">
          <span className="editorial-header-cta-label">Work with me</span> <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  )
}
