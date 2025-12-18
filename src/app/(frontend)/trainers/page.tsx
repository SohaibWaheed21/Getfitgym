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

  return <TrainersClient trainers={formattedTrainers} />
}
