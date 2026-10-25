import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { slugField } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: { group: 'Content & Resources', useAsTitle: 'title', defaultColumns: ['title','category','_status','publishedAt'] },
  access: { create: adminOnly, update: adminOnly, delete: adminOnly, read: adminOrPublishedStatus },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'category', type: 'text', required: true, defaultValue: 'Writing & Publishing' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', required: true },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
