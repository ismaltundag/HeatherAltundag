import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { slugField } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { plural: 'Services & Pricing', singular: 'Service' },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'serviceType', 'pricingModel', '_status', 'updatedAt'],
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
        { label: 'Developmental / Line / Copy Editing', value: 'editing' },
        { label: 'Proofreading', value: 'proofreading' },
        { label: 'Beta Reading', value: 'beta-reading' },
        { label: 'Author Virtual Assistance', value: 'author-va' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'scope', type: 'textarea', label: 'Scope and approach' },
    {
      name: 'deliverables',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'pricingModel',
      type: 'select',
      defaultValue: 'custom-quote',
      options: [
        { label: 'Custom quote', value: 'custom-quote' },
        { label: 'Starting at', value: 'starting-at' },
        { label: 'Fixed price', value: 'fixed' },
      ],
    },
    {
      name: 'startingPrice',
      type: 'number',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.pricingModel !== 'custom-quote',
        description: 'Leave blank until the rate is confirmed.',
      },
    },
    { name: 'turnaround', type: 'text', label: 'Estimated turnaround (optional)' },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    slugField(),
  ],
  versions: { drafts: true },
}
