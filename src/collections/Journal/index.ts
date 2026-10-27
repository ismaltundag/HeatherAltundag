import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'
import { revalidateDeleteJournal, revalidateJournal } from './hooks/revalidateJournal'

export const Journal: CollectionConfig = {
  slug: 'journal',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'bookAuthor', 'genre', 'rating', 'publishedAt', '_status'],
    group: 'Reading Journal',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'Reading Journal',
      options: [
        { label: 'Reading Journal', value: 'Reading Journal' },
        { label: 'Reader Notes', value: 'Reader Notes' },
        { label: 'Editorial Notes', value: 'Editorial Notes' },
        { label: 'Monthly Wrap-Up', value: 'Monthly Wrap-Up' },
        { label: 'Essays', value: 'Essays' },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'entryType',
      type: 'select',
      defaultValue: 'reading-review',
      options: [
        { label: 'Personal Reading Review', value: 'reading-review' },
        { label: 'Editorial Journal', value: 'editorial-journal' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'collapsible',
      label: 'Reading Review Details',
      admin: { initCollapsed: true },
      fields: [
        { name: 'bookTitle', type: 'text', label: 'Book Title' },
        { name: 'bookAuthor', type: 'text', label: 'Book Author' },
        { name: 'genre', type: 'text' },
        { name: 'rating', type: 'number', min: 1, max: 5 },
        { name: 'dateRead', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
        {
          name: 'readingStatus',
          type: 'select',
          options: [
            { label: 'Finished', value: 'finished' },
            { label: 'Currently reading', value: 'currently-reading' },
            { label: 'On hold', value: 'on-hold' },
          ],
        },
        { name: 'favoriteElements', type: 'textarea', label: 'What I loved' },
        {
          name: 'containsSpoilers',
          type: 'checkbox',
          defaultValue: false,
          label: 'Contains spoilers',
        },
        {
          name: 'personalReviewDisclosure',
          type: 'text',
          defaultValue: 'Personal reading review; separate from client work.',
          label: 'Disclosure (e.g. gifted copy, if applicable)',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt / Summary',
              admin: {
                description:
                  'A brief 1-2 sentence preview shown on the journal feed and search engines.',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Entry Content',
              required: true,
            },
          ],
          label: 'Content',
        },

      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateJournal],
    afterDelete: [revalidateDeleteJournal],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
