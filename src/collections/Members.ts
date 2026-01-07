import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['memberId', 'name', 'phone', 'feeStartDate', 'daysLeft', 'status'],
    listSearchableFields: ['memberId', 'name', 'phone', 'cnic'],
    description: 'Search by Member ID, Name, Phone, or CNIC',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'memberId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique Member ID (e.g., GYM001)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: 03XXXXXXXXX',
      },
    },
    {
      name: 'cnic',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: 12345-1234567-1',
      },
    },
    {
      name: 'feeStartDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'pricePaid',
      type: 'number',
      required: true,
      admin: {
        description: 'Amount paid in PKR',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['Active', 'Expired'],
      admin: {
        readOnly: true,
        description: 'Auto-calculated based on fee date',
      },
    },
    {
      name: 'daysLeft',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Auto-calculated days remaining',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate days left and status
        if (data.feeStartDate) {
          const feeStart = new Date(data.feeStartDate)
          const expiryDate = new Date(feeStart.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
          const today = new Date()
          const timeDiff = expiryDate.getTime() - today.getTime()
          const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
          
          data.daysLeft = daysLeft
          data.status = daysLeft > 0 ? 'Active' : 'Expired'
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        // Recalculate days left and status on every read
        if (doc.feeStartDate) {
          const feeStart = new Date(doc.feeStartDate)
          const expiryDate = new Date(feeStart.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
          const today = new Date()
          const timeDiff = expiryDate.getTime() - today.getTime()
          const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
          
          doc.daysLeft = daysLeft
          doc.status = daysLeft > 0 ? 'Active' : 'Expired'
        }
        return doc
      },
    ],
  },
}
