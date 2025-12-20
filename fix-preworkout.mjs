import { v2 as cloudinary } from 'cloudinary'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uri = process.env.DATABASE_URI
const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db()
  const mediaCollection = db.collection('media')
  
  // Upload preworkout.jpg
  const filePath = path.join(__dirname, 'media', 'preworkout.jpg')
  
  console.log('📤 Uploading preworkout.jpg to Cloudinary...')
  
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: 'gym-media',
    resource_type: 'auto',
    public_id: 'preworkout',
    use_filename: true,
  })
  
  console.log('✅ Uploaded successfully!')
  console.log('Public ID:', uploadResult.public_id)
  console.log('URL:', uploadResult.secure_url)
  
  // Update the database record
  await mediaCollection.updateOne(
    { _id: new ObjectId('694439a73dfae60e133cfc6f') },
    {
      $set: {
        cloudinary_id: uploadResult.public_id,
        url: uploadResult.secure_url,
        filename: 'preworkout.jpg',
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
      }
    }
  )
  
  console.log('💾 Database updated!\n')
  
  // Verify all media
  const allMedia = await mediaCollection.find().toArray()
  console.log('📊 All Media Files:')
  allMedia.forEach(media => {
    console.log(`\n- ${media.filename}`)
    console.log(`  URL: ${media.url}`)
    console.log(`  Cloudinary: ${media.cloudinary_id ? '✅ ' + media.cloudinary_id : '❌ Not set'}`)
  })
  
} catch (error) {
  console.error('❌ Error:', error.message)
} finally {
  await client.close()
}
