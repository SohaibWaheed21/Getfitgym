import type { CollectionConfig } from 'payload'

export const Trial: CollectionConfig = {
  slug: 'trial',
  admin: {
    useAsTitle: 'title',
    description: 'Manage the Trial section content on home page',
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'We\'re Not Like Others',
      admin: {
        description: 'Main heading for trial section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'At GetFit Gym, we don\'t believe in shortcuts. We believe in building stronger bodies and sharper minds. Join us and start your transformation today!',
      admin: {
        description: 'Description text',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Background image for trial section',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features List',
      defaultValue: [
        { feature: 'Personalized training' },
        { feature: 'Modern equipment' },
        { feature: 'Supportive community' },
      ],
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'List of features with checkmarks',
      },
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Start Your Trial',
      admin: {
        description: 'Form heading',
      },
    },
  ],
  timestamps: true,
}
