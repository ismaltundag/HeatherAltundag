'use client'

import type { Header } from '@/payload-types'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger aria-label="Open navigation menu" className="editorial-menu-trigger">
        <MenuIcon aria-hidden="true" className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent side="left" className="editorial-mobile-sheet bg-black px-4 text-white [&>button]:text-white">
        <SheetHeader className="px-0 pt-4 pb-0">
          <SheetTitle className="text-white">Heather Altundag</SheetTitle>

          <SheetDescription />
        </SheetHeader>

        <div className="py-4">
          {menu?.length ? (
            <ul className="flex w-full flex-col">
              {menu.map((item) => (
                <li className="py-2" key={item.id}>
                  <Link className="editorial-mobile-nav-link text-white hover:text-[#FFEB00] focus-visible:text-[#FFEB00]" href={item.link.url || '/'} prefetch={false} onClick={() => setIsOpen(false)}>
                    {item.link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}
