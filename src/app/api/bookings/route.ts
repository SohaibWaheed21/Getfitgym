import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const created = await payload.create({ collection: 'bookings', data: body })

    return NextResponse.json({ success: true, doc: created })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
