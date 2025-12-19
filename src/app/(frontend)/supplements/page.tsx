import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import SupplementsClient from './SupplementsClient'

import { CollectionSlug } from 'payload'

interface Supplement {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: { url: string }
  badge?: string
  badgeColor?: string
  category?: string
  benefits?: Array<{ benefit: string; id?: string }>
  specs?: string
}

export default async function SupplementsPage() {
  let supplements: Supplement[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'supplements' as CollectionSlug,
      limit: 100,
    })

    // Transform payload docs to match client interface if needed, or cast if structure matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supplements = result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      price: doc.price,
      originalPrice: doc.originalPrice,
      image:
        doc.image && typeof doc.image === 'object' && 'url' in doc.image
          ? { url: doc.image.url }
          : { url: '' },
      badge: doc.badge,
      badgeColor: doc.badgeColor,
      category: doc.category,
      benefits: doc.benefits,
      specs: doc.specs,
    }))
  } catch (error) {
    console.error('Error fetching supplements:', error)
  }

  return <SupplementsClient supplements={supplements} />
}
