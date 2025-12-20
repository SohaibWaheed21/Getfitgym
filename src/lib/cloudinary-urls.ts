// Cloudinary image URLs for the website
// All images have been uploaded to Cloudinary

const CLOUD_NAME = 'dqxfjca8p'

export const CLOUDINARY_IMAGES = {
  // Home page banners
  banner: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766228244/gym-media/banner17.webp`,
  
  // Branch images
  gulshan: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766228246/gym-media/gulshan2.jpg`,
  islam: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766228247/gym-media/islam.jpg`,
  
  // Feature section backgrounds
  bmi: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766228256/gym-media/bmi.jpg`,
  trial: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766228258/gym-media/trial.jpg`,
  
  // Trainers
  wahab: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766221284/gym-media/wahab2.png`,
  
  // Supplements
  preworkout: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1766221319/gym-media/preworkout.jpg`,
}

// Helper function to get Cloudinary URL
export function getCloudinaryUrl(publicId: string, transformations?: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`
  }
  
  return `${baseUrl}/${publicId}`
}
