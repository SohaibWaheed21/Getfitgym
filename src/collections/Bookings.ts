import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'name',
    description: 'Trainer booking requests from customers',
    defaultColumns: ['name', 'phone', 'trainer', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone'],
    group: 'Customer Bookings',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can read all bookings
      if (user) return true
      // Public cannot read
      return false
    },
    create: () => true, // Anyone can create (public booking form)
    update: ({ req: { user } }) => Boolean(user), // Only admins can update
    delete: ({ req: { user } }) => Boolean(user), // Only admins can delete
  },
  timestamps: true,
  defaultSort: '-createdAt', // Show newest first
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'trainers',
      required: true,
      label: 'Selected Trainer',
    },
    {
      name: 'preferredTime',
      type: 'select',
      options: [
        { label: 'Morning (6 AM - 12 PM)', value: 'Morning (6 AM - 12 PM)' },
        { label: 'Afternoon (12 PM - 6 PM)', value: 'Afternoon (12 PM - 6 PM)' },
        { label: 'Evening (6 PM - 10 PM)', value: 'Evening (6 PM - 10 PM)' },
      ],
      label: 'Preferred Time Slot',
    },
    {
      name: 'goals',
      type: 'array',
      label: 'Fitness Goals',
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
      label: 'Additional Notes',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: '⏳ Pending', value: 'pending' },
        { label: '✅ Confirmed', value: 'confirmed' },
        { label: '✔️ Completed', value: 'completed' },
        { label: '❌ Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Update booking status as you process requests',
      },
    },
    {
      name: 'bookingDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Scheduled booking date (set after confirmation)',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes for admin use only',
      },
    },
  ],
}
