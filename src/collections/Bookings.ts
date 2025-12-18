import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => false,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'trainers',
    },
    {
      name: 'goals',
      type: 'array',
      fields: [
        {
          name: 'goal',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'preferredTime',
      type: 'text',
    },
  ],
}
