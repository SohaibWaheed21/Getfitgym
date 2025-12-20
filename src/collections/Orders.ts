import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'customerName',
    description: 'Customer orders from supplements store',
    defaultColumns: ['customerName', 'phone', 'totalAmount', 'paymentMethod', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Delivery Address',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Order Items',
      fields: [
        {
          name: 'productName',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'subtotal',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      label: 'Total Amount (PKR)',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Cash on Delivery',
          value: 'cash',
        },
        {
          label: 'WhatsApp Order',
          value: 'whatsapp',
        },
      ],
      defaultValue: 'cash',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Confirmed',
          value: 'confirmed',
        },
        {
          label: 'Processing',
          value: 'processing',
        },
        {
          label: 'Shipped',
          value: 'shipped',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      admin: {
        description: 'Order status',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Order Notes',
      admin: {
        description: 'Internal notes about the order',
      },
    },
  ],
  timestamps: true,
}
