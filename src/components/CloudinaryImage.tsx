'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CloudinaryImageProps {
  publicId?: string
  url?: string
  alt: string
  width?: number
  height?: number
  className?: string
  quality?: number | 'auto'
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
  priority?: boolean
}

/**
 * CloudinaryImage component for displaying images from Cloudinary
 * Automatically handles transformations and optimization
 */
export function CloudinaryImage({
  publicId,
  url,
  alt,
  width = 800,
  height = 600,
  className = '',
  quality = 'auto',
  crop = 'fill',
  priority = false,
}: CloudinaryImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    // If we have a publicId, build the Cloudinary URL with transformations
    if (publicId) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqxfjca8p'
      return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality}/${publicId}`
    }
    // Otherwise use the provided URL
    return url || '/images/placeholder.jpg'
  })

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => {
        // Fallback to original URL if transformation fails
        setImgSrc(url || '/images/placeholder.jpg')
      }}
    />
  )
}

/**
 * Get Cloudinary URL with transformations
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
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqxfjca8p'
  const transformations: string[] = []

  if (options?.width || options?.height) {
    const w = options.width ? `w_${options.width}` : ''
    const h = options.height ? `h_${options.height}` : ''
    const c = options.crop ? `c_${options.crop}` : 'c_fill'
    transformations.push([w, h, c].filter(Boolean).join(','))
  }

  if (options?.quality) {
    transformations.push(`q_${options.quality}`)
  }

  if (options?.format) {
    transformations.push(`f_${options.format}`)
  }

  const transformString = transformations.length > 0 ? transformations.join(',') + '/' : ''

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`
}
