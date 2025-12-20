import type { CollectionConfig } from 'payload'
import path from 'path'
import fs from 'fs'
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinary_id',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => {
      // Use Cloudinary URL if available
      if (doc?.cloudinary_id) {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_thumb,w_400,h_300/${doc.cloudinary_id}`
      }
      return doc?.url as string
    },
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        // If we have a cloudinary_id, always use Cloudinary URL
        if (doc?.cloudinary_id) {
          doc.url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${doc.cloudinary_id}`
        }
        return doc
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        // Only process on create operations when file is uploaded
        if (operation === 'create' && req.file) {
          try {
            const filePath = req.file.tempFilePath || (req.file as any).path

            if (!filePath || !fs.existsSync(filePath)) {
              console.warn('File path not found for upload')
              return data
            }

            // Upload to Cloudinary
            const uploadResult = await uploadToCloudinary(filePath, {
              folder: 'gym-media',
              resourceType: 'auto',
            })

            // Update data with Cloudinary information
            data.cloudinary_id = uploadResult.public_id
            data.url = uploadResult.secure_url

            console.log('Successfully uploaded to Cloudinary:', uploadResult.public_id)
          } catch (error) {
            console.error('Error uploading to Cloudinary:', error)
            // Don't block the upload if Cloudinary fails, just log the error
          }
        }

        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Delete from Cloudinary when media is deleted
        if (doc?.cloudinary_id) {
          try {
            await deleteFromCloudinary(doc.cloudinary_id)
            console.log('Successfully deleted from Cloudinary:', doc.cloudinary_id)
          } catch (error) {
            console.error('Error deleting from Cloudinary:', error)
          }
        }
      },
    ],
  },
}
