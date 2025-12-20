import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import TrainersClient from './TrainersClient'

export default async function TrainersPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch trainers
  const trainersRes = await payload.find({ collection: 'trainers', limit: 50 })
  const trainers = trainersRes?.docs || []

  // Fetch page settings for trainers page
  const pageSettingsRes = await payload.find({ 
    collection: 'page-settings', 
    where: { pageName: { equals: 'trainers' } },
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

  // Convert payload trainers to client format
  const formattedTrainers = trainers.map((trainer: any) => ({
    id: trainer.id,
    name: trainer.name,
    title: trainer.title,
    bio: typeof trainer.bio === 'string' ? trainer.bio : null,
    photo: trainer.photo,
    achievements: trainer.achievements,
    yearsExp: trainer.yearsExp,
    clients: trainer.clients,
    rating: trainer.rating,
    specialties: trainer.specialties
  }))

  return <TrainersClient trainers={formattedTrainers} pageSettings={formattedSettings} />
}
