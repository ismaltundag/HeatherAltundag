import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { slugField } from 'payload'

export const PortfolioProjects: CollectionConfig = {
  slug: 'portfolio-projects',
  labels: { plural: 'Portfolio Projects', singular: 'Portfolio Project' },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'serviceType', 'permissionToPublish', '_status'],
    group: 'Editorial Services',
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
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
    { name: 'description', type: 'textarea', required: true },
    { name: 'clientDisplayName', type: 'text', label: 'Client attribution (only if permitted)' },
    { name: 'sampleText', type: 'textarea', label: 'Permission-cleared sample (optional)' },
    {
      name: 'permissionToPublish',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'I have permission to publish this project and attribution',
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    slugField(),
  ],
  versions: { drafts: true },
}
