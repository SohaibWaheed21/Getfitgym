import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import SupplementsClient from './SupplementsClient'

export default async function SupplementsPage() {
  let supplements = []
  
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'supplements' as any,
      limit: 100,
    })
    supplements = result.docs || []
  } catch (error) {
    console.error('Error fetching supplements:', error)
  }

  return <SupplementsClient supplements={supplements as any} />
}
