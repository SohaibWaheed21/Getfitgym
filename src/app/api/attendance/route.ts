import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    // Get all members
    const membersResult = await payload.find({
      collection: 'members',
      limit: 1000,
      sort: 'name',
    })

    // Get attendance for the specified date
    const attendanceResult = await payload.find({
      collection: 'attendance',
      where: {
        date: {
          equals: date,
        },
      },
      limit: 1000,
    })

    // Create a set of member IDs who are present
    const presentMemberIds = new Set(
      attendanceResult.docs.map((record: any) => 
        typeof record.member === 'string' ? record.member : record.member?.id
      )
    )

    // Mark each member as present or absent
    const membersWithAttendance = membersResult.docs.map((member: any) => ({
      id: member.id,
      memberId: member.memberId,
      name: member.name,
      phone: member.phone,
      status: member.status,
      daysLeft: member.daysLeft,
      isPresent: presentMemberIds.has(member.id),
    }))

    return NextResponse.json({
      success: true,
      date,
      members: membersWithAttendance,
      totalMembers: membersWithAttendance.length,
      totalPresent: membersWithAttendance.filter((m: any) => m.isPresent).length,
    })
  } catch (error: any) {
    console.error('Error fetching attendance data:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { date, presentMemberIds } = body

    if (!date || !Array.isArray(presentMemberIds)) {
      return NextResponse.json(
        { success: false, error: 'Date and presentMemberIds array are required' },
        { status: 400 }
      )
    }

    // Delete existing attendance records for this date
    await payload.delete({
      collection: 'attendance',
      where: {
        date: {
          equals: date,
        },
      },
    })

    // Create new attendance records for present members
    const createdRecords = []
    for (const memberId of presentMemberIds) {
      const record = await payload.create({
        collection: 'attendance',
        data: {
          member: memberId,
          date: date,
          checkmark: true,
          timestamp: new Date().toISOString(),
        },
      })
      createdRecords.push(record)
    }

    return NextResponse.json({
      success: true,
      message: `Attendance marked for ${createdRecords.length} members`,
      date,
      totalPresent: createdRecords.length,
    })
  } catch (error: any) {
    console.error('Error saving attendance:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
