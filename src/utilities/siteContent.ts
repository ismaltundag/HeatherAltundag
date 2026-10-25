import configPromise from '@payload-config'
import { getPayload } from 'payload'

/** Optional fields fall back to the current website copy until an editor saves them. */
export async function getSiteContent(): Promise<Record<string, any>> {
  try {
    const payload = await getPayload({ config: configPromise })
    return (await payload.findGlobal({ slug: 'site-content' as any, depth: 0, overrideAccess: false })) as Record<string, any>
  } catch {
    return {}
  }
}

export function copy(settings: Record<string, any>, field: string, fallback: string): string {
  return typeof settings[field] === 'string' && settings[field].trim() ? settings[field] : fallback
}
