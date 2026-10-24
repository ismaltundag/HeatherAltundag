import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { plural: 'Client Testimonials', singular: 'Client Testimonial' },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['displayName', 'serviceType', 'permissionToPublish', '_status'],
    group: 'Editorial Services',
    useAsTitle: 'displayName',
  },
  fields: [
    { name: 'displayName', type: 'text', required: true, label: 'Client display name' },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Editing', value: 'editing' },
        { label: 'Proofreading', value: 'proofreading' },
        { label: 'Beta Reading', value: 'beta-reading' },
        { label: 'Author VA', value: 'author-va' },
      ],
    },
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'permissionToPublish',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'I have explicit permission to publish this testimonial',
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  versions: { drafts: true },
}
