import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
    description: 'Main navigation only. Keep Website Design, Author Assistance and Packages under Services; those pages are linked from the Services overview.',
  },
  fields: [
    {
      name: 'navItems',
      admin: { description: 'Top-level links only (e.g. About, Services, Portfolio, Reading Journal, Blog). Service detail pages are managed under Services.' },
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 14,
    },
  ],
}
