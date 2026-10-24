import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { revalidateTag } from 'next/cache'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Heather',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      defaultValue: 'Heather Altundag Editorial & Author Support',
      label: 'Business name',
      required: true,
    },
    {
      name: 'professionalBio',
      type: 'textarea',
      label: 'Professional biography',
      admin: {
        description: 'Share only confirmed experience, qualifications, and details you want public.',
      },
    },
    {
      name: 'workingPhilosophy',
      type: 'textarea',
      label: 'Working philosophy',
    },
    {
      name: 'genresServed',
      type: 'text',
      label: 'Genres and formats accepted',
    },
    {
      name: 'experienceAndTraining',
      type: 'textarea',
      label: 'Experience and training',
    },
    {
      name: 'readingInterests',
      type: 'textarea',
      label: 'Reading interests (optional)',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Professional portrait',
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_about', 'max')
      },
    ],
  },
}
