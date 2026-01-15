import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import SupplementsClient from './SupplementsClient'

export const revalidate = 0 // Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic'

export default async function SupplementsPage() {
  let supplements = []
  let pageSettings = null
  
  try {
    const payload = await getPayload({ config })
    
    // Fetch supplements
    const result = await payload.find({
      collection: 'supplements' as any,
      limit: 100,
    })
    supplements = result.docs || []
    
    // Fetch page settings for supplements page
    const pageSettingsRes = await payload.find({ 
      collection: 'page-settings' as any, 
      where: { pageName: { equals: 'supplements' } },
      limit: 1
    })
    const rawSettings = pageSettingsRes?.docs?.[0] || null
    
    // Format pageSettings to match expected type
    pageSettings = rawSettings ? {
      bannerImage: typeof rawSettings.bannerImage === 'object' && rawSettings.bannerImage !== null 
        ? { url: (rawSettings.bannerImage as any).url } 
        : null,
      bannerTitle: rawSettings.bannerTitle || null,
      bannerSubtitle: rawSettings.bannerSubtitle || null,
      bannerOverlayColor: rawSettings.bannerOverlayColor || null,
    } : null
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return <SupplementsClient supplements={supplements as any} pageSettings={pageSettings} />
}
