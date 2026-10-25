import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { slugField } from 'payload'

export const Offerings: CollectionConfig = {
  slug: 'offerings',
  labels: { singular: 'Service or Package', plural: 'Services & Packages' },
  admin: { group: 'Editorial Services', useAsTitle: 'title', defaultColumns: ['title','category','pricingModel','_status','sortOrder'] },
  access: { create: adminOnly, update: adminOnly, delete: adminOnly, read: adminOrPublishedStatus },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'category', type: 'select', required: true, options: [
      {label:'Editorial & Beta Reading',value:'editorial'}, {label:'Author Assistance',value:'author-assistance'},
      {label:'Web Design & Development',value:'web-design'}, {label:'Packages',value:'packages'},
    ] },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'details', type: 'richText' },
    { name: 'deliverables', type: 'array', fields: [{name:'item',type:'text',required:true}] },
    { name: 'pricingModel', type: 'select', defaultValue: 'quote', options: [
      {label:'Custom quote',value:'quote'},{label:'Fixed price',value:'fixed'},
      {label:'Starting at',value:'starting'},{label:'Monthly retainer',value:'monthly'},
      {label:'Per word',value:'per-word'},
    ] },
    { name: 'price', type: 'number', min: 0, admin: { description: 'Optional USD amount; only published when set.' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Ask about this service' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
