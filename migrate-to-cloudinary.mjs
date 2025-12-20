import { v2 as cloudinary } from 'cloudinary'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

console.log('🔄 Migrating existing images to Cloudinary...\n')

const uri = process.env.DATABASE_URI
const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db()
  const mediaCollection = db.collection('media')
  
  // Get all media without cloudinary_id
  const mediaToMigrate = await mediaCollection.find({
    $or: [
      { cloudinary_id: { $exists: false } },
      { cloudinary_id: null }
    ]
  }).toArray()
  
  console.log(`Found ${mediaToMigrate.length} media files to migrate\n`)
  
  for (const media of mediaToMigrate) {
    console.log(`Processing: ${media.filename}`)
    
    try {
      // Construct the local file path
      const mediaDir = path.join(__dirname, 'media')
      const filePath = path.join(mediaDir, media.filename)
      
      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  File not found at: ${filePath}`)
        console.log(`  Skipping...\n`)
        continue
      }
      
      console.log(`  📤 Uploading to Cloudinary...`)
      
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'gym-media',
        resource_type: 'auto',
        public_id: path.parse(media.filename).name, // Use filename without extension
        use_filename: true,
      })
      
      console.log(`  ✅ Uploaded! Public ID: ${uploadResult.public_id}`)
      
      // Update database
      await mediaCollection.updateOne(
        { _id: media._id },
        {
          $set: {
            cloudinary_id: uploadResult.public_id,
            url: uploadResult.secure_url,
            width: uploadResult.width,
            height: uploadResult.height,
            format: uploadResult.format,
          }
        }
      )
      
      console.log(`  💾 Database updated`)
      console.log(`  🌐 URL: ${uploadResult.secure_url}\n`)
      
    } catch (error) {
      console.error(`  ❌ Error migrating ${media.filename}:`, error.message)
      console.log('')
    }
  }
  
  console.log('✅ Migration complete!')
  
  // Verify
  console.log('\n📊 Verification:')
  const cloudinaryCount = await mediaCollection.countDocuments({
    cloudinary_id: { $exists: true, $ne: null }
  })
  const totalCount = await mediaCollection.countDocuments()
  console.log(`   ${cloudinaryCount}/${totalCount} media files now in Cloudinary`)
  
} catch (error) {
  console.error('❌ Migration failed:', error.message)
} finally {
  await client.close()
}
