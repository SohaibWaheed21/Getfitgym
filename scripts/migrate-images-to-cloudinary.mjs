import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Images to migrate from public/images folder
const imagesToMigrate = [
  'banner17.webp',
  'gulshan2.jpg',
  'islam.jpg',
  'bmi.jpg',
  'trial.jpg',
  'wahab2.png',
  'preworkout.jpg',
]

async function migrateImages() {
  console.log('🚀 Starting image migration to Cloudinary...\n')

  const publicImagesDir = path.join(__dirname, '..', 'public', 'images')
  const results = []

  for (const imageName of imagesToMigrate) {
    const imagePath = path.join(publicImagesDir, imageName)

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Skipped: ${imageName} (file not found)`)
      results.push({ name: imageName, status: 'not_found' })
      continue
    }

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'gym-media',
        public_id: path.parse(imageName).name,
        overwrite: true,
        resource_type: 'auto',
      })

      console.log(`✅ Uploaded: ${imageName}`)
      console.log(`   URL: ${result.secure_url}`)
      console.log(`   Public ID: ${result.public_id}\n`)

      results.push({
        name: imageName,
        status: 'success',
        url: result.secure_url,
        public_id: result.public_id,
      })
    } catch (error) {
      console.error(`❌ Failed: ${imageName}`)
      console.error(`   Error: ${error.message}\n`)
      results.push({ name: imageName, status: 'error', error: error.message })
    }
  }

  // Print summary
  console.log('\n📊 Migration Summary:')
  console.log('=' .repeat(60))
  
  const successful = results.filter(r => r.status === 'success')
  const failed = results.filter(r => r.status === 'error')
  const notFound = results.filter(r => r.status === 'not_found')

  console.log(`✅ Successful: ${successful.length}`)
  console.log(`❌ Failed: ${failed.length}`)
  console.log(`⚠️  Not Found: ${notFound.length}`)
  
  if (successful.length > 0) {
    console.log('\n📝 Cloudinary URLs:')
    successful.forEach(img => {
      console.log(`${img.name}: ${img.url}`)
    })
  }

  console.log('\n💡 Next Steps:')
  console.log('1. Go to Payload Admin: http://localhost:3000/admin/collections/media')
  console.log('2. Delete any old local images showing errors')
  console.log('3. Upload images through Payload - they will auto-sync to Cloudinary')
  console.log('4. For existing supplements/trainers, update their images in Payload admin')
}

migrateImages().catch(console.error)
