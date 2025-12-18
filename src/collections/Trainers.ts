import type { CollectionConfig } from 'payload'

export const Trainers: CollectionConfig = {
  slug: 'trainers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'yearsExp',
      type: 'number',
    },
    {
      name: 'clients',
      type: 'number',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [
        {
          name: 'specialty',
          type: 'text',
        },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        {
          name: 'achievement',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
