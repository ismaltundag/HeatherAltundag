import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { getSiteContent, copy } from '@/utilities/siteContent'
import { HeaderClient } from './index.client'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  const settings = await getSiteContent()
  return <HeaderClient header={header} siteName={copy(settings, 'siteName', 'Heather Altundag')} siteTagline={copy(settings, 'siteTagline', 'Editorial & Author Support')} headerCta={copy(settings, 'headerCta', 'Work with me')} />
}
