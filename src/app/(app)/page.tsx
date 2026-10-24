import type { Metadata } from 'next'

import { EditorialHome } from '@/components/EditorialHome'

export const metadata: Metadata = {
  title: 'Heather Altundag | Editorial & Author Support · Mobile Test',
  description:
    'Thoughtful editing, proofreading, beta reading, and author support for your next chapter.',
}

export default function HomePage() {
  return <EditorialHome />
}
