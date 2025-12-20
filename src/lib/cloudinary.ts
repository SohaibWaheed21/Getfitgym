import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  url: string
  width?: number
  height?: number
  format?: string
  resource_type: string
  bytes: number
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  filePath: string,
  options?: {
    folder?: string
    publicId?: string
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
  }
): Promise<CloudinaryUploadResult> {
  try {
    const uploadOptions = {
      folder: options?.folder || 'gym-media',
      resource_type: options?.resourceType || 'auto',
      use_filename: true,
      unique_filename: true,
      ...(options?.publicId && { public_id: options.publicId }),
    }

    const result = await cloudinary.uploader.upload(filePath, uploadOptions as any)

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to upload to Cloudinary: ${message}`)
  }
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to delete from Cloudinary: ${message}`)
  }
}

/**
 * Generate Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
    quality?: number | 'auto'
    format?: string
  }
): string {
  if (!publicId) return ''

  const transformations: any[] = []

  if (options?.width || options?.height) {
    transformations.push({
      width: options.width,
      height: options.height,
      crop: options.crop || 'fill',
    })
  }

  if (options?.quality) {
    transformations.push({ quality: options.quality })
  }

  if (options?.format) {
    transformations.push({ fetch_format: options.format })
  }

  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true,
  })
}
