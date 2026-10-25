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
            <svg className="editorial-monogram-art" viewBox="0 0 230 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>HA luxury curl monogram</title>
              <text x="46" y="105" fill="currentColor" fontFamily="Bodoni MT, Didot, Times New Roman, Georgia, serif" fontSize="124" fontWeight="400" letterSpacing="-8">H</text>
              <text x="119" y="113" fill="currentColor" fontFamily="Bodoni MT, Didot, Times New Roman, Georgia, serif" fontSize="116" fontWeight="400" letterSpacing="-8">A</text>
              <path d="M55 81 C34 73 16 80 17 97 C18 119 49 121 70 107 C90 93 95 61 111 56 C128 50 128 73 116 84 C104 96 92 103 97 111 C102 120 123 112 135 100 C146 88 153 72 167 77 C183 82 194 98 207 94 C220 90 221 79 212 77" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 83 C64 59 90 67 117 81 C143 94 168 99 191 91" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M91 111 C103 116 112 119 121 116" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
