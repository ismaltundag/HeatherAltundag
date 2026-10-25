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
  { id: 'faq', link: { type: 'custom', label: 'FAQ', url: '/services#faq' } },
]

export function HeaderClient({ header }: Props) {
  const menu = fallbackMenu
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
            <svg className="editorial-monogram-art" viewBox="0 0 120 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="21" y="67" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="72" letterSpacing="-8">H</text>
              <text x="68" y="70" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="67" letterSpacing="-5">A</text>
              <path d="M12 59 C-3 40 24 34 47 44 C67 53 81 67 105 55 C115 50 118 43 111 42 M21 62 C4 75 17 84 35 80 C62 74 64 28 81 17 C92 9 96 25 83 39 C75 48 64 51 61 57" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
