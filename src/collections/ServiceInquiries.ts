import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const ServiceInquiries: CollectionConfig = {
  slug: 'service-inquiries',
  labels: { plural: 'Project Inquiries', singular: 'Project Inquiry' },
  access: {
    create: () => false,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    group: 'Private Inquiries',
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'servicesRequested',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [{ name: 'service', type: 'text', required: true }],
    },
    { name: 'genre', type: 'text', required: true },
    {
      name: 'manuscriptStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'Draft in progress', value: 'drafting' },
        { label: 'Complete draft', value: 'complete' },
        { label: 'Previously published', value: 'published' },
        { label: 'Not applicable / VA support', value: 'not-applicable' },
      ],
    },
    { name: 'wordCount', type: 'number', min: 0 },
    { name: 'desiredDeadline', type: 'date' },
    { name: 'projectGoals', type: 'textarea', required: true, maxLength: 5000 },
    {
      name: 'privacyAcknowledged',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In review', value: 'in-review' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
