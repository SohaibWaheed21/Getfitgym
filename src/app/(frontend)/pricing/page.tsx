import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import PricingClient from './PricingClient'

export default async function PricingPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch page settings for pricing page
  const pageSettingsRes = await payload.find({ 
    collection: 'page-settings', 
    where: { pageName: { equals: 'pricing' } },
    limit: 1
  })
  const pageSettings = pageSettingsRes?.docs?.[0] || null

  // Format pageSettings to match expected type
  const formattedSettings = pageSettings ? {
    bannerImage: typeof pageSettings.bannerImage === 'object' && pageSettings.bannerImage !== null 
      ? { url: (pageSettings.bannerImage as any).url } 
      : null,
    bannerTitle: pageSettings.bannerTitle || null,
    bannerSubtitle: pageSettings.bannerSubtitle || null,
    bannerOverlayColor: pageSettings.bannerOverlayColor || null,
  } : null

  return <PricingClient pageSettings={formattedSettings} />
}
