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
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
