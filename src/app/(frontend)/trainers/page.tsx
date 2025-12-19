import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import TrainersClient from './TrainersClient'

export default async function TrainersPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const trainersRes = await payload.find({ collection: 'trainers', limit: 50 })
  const trainers = trainersRes?.docs || []

  // Convert payload trainers to client format
  const formattedTrainers = trainers.map((trainer) => ({
    id: trainer.id,
    name: trainer.name,
    title: trainer.title,
    bio: typeof trainer.bio === 'string' ? trainer.bio : null,
    photo:
      typeof trainer.photo === 'object' && trainer.photo?.url ? { url: trainer.photo.url } : null,
    achievements: Array.isArray(trainer.achievements)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        trainer.achievements.map((a: any) => ({ achievement: a.achievement || '' }))
      : null,
    yearsExp: trainer.yearsExp,
    clients: trainer.clients,
    rating: trainer.rating,
    specialties: Array.isArray(trainer.specialties)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        trainer.specialties.map((s: any) => ({ specialty: s.specialty || '' }))
      : null,
  }))

  return <TrainersClient trainers={formattedTrainers} />
}
