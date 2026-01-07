import type { CollectionConfig } from 'payload'

export const Attendance: CollectionConfig = {
  slug: 'attendance',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['member', 'date', 'checkmark', 'timestamp'],
    description: 'Individual attendance records (auto-managed by bulk attendance)',
    group: 'Attendance Management',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hasMany: false,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'checkmark',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        readOnly: true,
        description: 'Attendance marked',
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set timestamp if not provided
        if (!data.timestamp) {
          data.timestamp = new Date().toISOString()
        }
        // Auto-set date to today if not provided
        if (!data.date) {
          data.date = new Date().toISOString().split('T')[0]
        }
        return data
      },
    ],
  },
}
