import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { slugField } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: { group: 'Content & Resources', useAsTitle: 'title' },
  access: { create: adminOnly, update: adminOnly, delete: adminOnly, read: adminOrPublishedStatus },
  versions: { drafts: true },
  fields: [
    {name:'title',type:'text',required:true},slugField(),
    {name:'description',type:'textarea',required:true},
    {name:'category',type:'text'},
    {name:'file',type:'upload',relationTo:'media'},
    {name:'externalUrl',type:'text',admin:{description:'Optional external download or resource URL.'}},
    {name:'sortOrder',type:'number',defaultValue:0},
  ],
}
