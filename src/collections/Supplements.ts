import type { CollectionConfig } from 'payload'

export const Supplements: CollectionConfig = {
  slug: 'supplements',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'originalPrice',
      type: 'number',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'badgeColor',
      type: 'select',
      options: ['red', 'blue', 'yellow', 'green'],
      defaultValue: 'red',
    },
    {
      name: 'category',
      type: 'select',
      options: ['Protein', 'Pre-Workout', 'Post-Workout', 'Vitamins'],
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text',
        },
      ],
    },
    {
      name: 'specs',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
