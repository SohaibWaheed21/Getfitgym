import type { CollectionConfig } from 'payload'

export const BulkAttendance: CollectionConfig = {
  slug: 'bulk-attendance',
  admin: {
    useAsTitle: 'attendanceDate',
    defaultColumns: ['attendanceDate', 'totalPresent', 'createdAt'],
    description: 'Mark attendance for multiple members at once',
    group: 'Attendance Management',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'attendanceDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Select the date for attendance',
      },
    },
    {
      name: 'presentMembers',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select all members who are present',
      },
    },
    {
      name: 'totalPresent',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Total members marked present',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Optional notes for this attendance session',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Calculate total present members
        if (data.presentMembers) {
          data.totalPresent = Array.isArray(data.presentMembers) 
            ? data.presentMembers.length 
            : 0
        }

        // If creating or updating, sync with individual attendance records
        if (operation === 'create' || operation === 'update') {
          const attendanceDate = data.attendanceDate || new Date().toISOString().split('T')[0]
          const presentMemberIds = Array.isArray(data.presentMembers) 
            ? data.presentMembers.map((m: any) => typeof m === 'string' ? m : m.id)
            : []

          // Delete existing attendance records for this date
          if (req.payload) {
            await req.payload.delete({
              collection: 'attendance',
              where: {
                date: {
                  equals: attendanceDate,
                },
              },
            })

            // Create new attendance records for present members
            for (const memberId of presentMemberIds) {
              await req.payload.create({
                collection: 'attendance',
                data: {
                  member: memberId,
                  date: attendanceDate,
                  checkmark: true,
                  timestamp: new Date().toISOString(),
                },
              })
            }
          }
        }

        return data
      },
    ],
  },
}
