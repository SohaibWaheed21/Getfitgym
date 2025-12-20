import type { CollectionConfig } from 'payload'

export const PageSettings: CollectionConfig = {
  slug: 'page-settings',
  admin: {
    useAsTitle: 'pageName',
    description: 'Manage banner images and settings for each page',
    group: 'Site Settings',
    defaultColumns: ['pageName', 'bannerImage', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageName',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Trainers Page', value: 'trainers' },
        { label: 'Supplements Page', value: 'supplements' },
        { label: 'Pricing Page', value: 'pricing' },
      ],
      admin: {
        description: 'Select the page to configure',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner image displayed at the top of the page (recommended: 1920x500px)',
      },
    },
    {
      name: 'bannerTitle',
      type: 'text',
      admin: {
        description: 'Main heading text for the banner',
      },
    },
    {
      name: 'bannerSubtitle',
      type: 'textarea',
      admin: {
        description: 'Description text below the main heading',
      },
    },
    {
      name: 'bannerOverlayColor',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Overlay (80%)', value: 'dark' },
        { label: 'Medium Overlay (60%)', value: 'medium' },
        { label: 'Light Overlay (40%)', value: 'light' },
        { label: 'No Overlay', value: 'none' },
      ],
      admin: {
        description: 'Overlay darkness on banner image for better text readability',
      },
    },
  ],
  timestamps: true,
}
