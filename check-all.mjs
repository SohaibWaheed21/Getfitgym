import { v2 as cloudinary } from 'cloudinary'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

console.log('🔍 Comprehensive Database & Cloudinary Check...\n')

const uri = process.env.DATABASE_URI
console.log('Connection URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'))

const client = new MongoClient(uri)

try {
  await client.connect()
  console.log('✅ MongoDB Connected Successfully!\n')
  
  const db = client.db()
  console.log('📊 Database Name:', db.databaseName)
  console.log('')
  
  // List all collections
  const collections = await db.listCollections().toArray()
  console.log(`📁 Collections (${collections.length} total):`)
  collections.forEach(col => console.log(`   - ${col.name}`))
  console.log('')
  
  // Check Media Collection
  console.log('🖼️  Media Collection:')
  const mediaCollection = db.collection('media')
  const mediaCount = await mediaCollection.countDocuments()
  console.log(`   Total media documents: ${mediaCount}`)
  
  if (mediaCount > 0) {
    const mediaDocs = await mediaCollection.find().limit(5).toArray()
    console.log(`   Sample media (showing first ${Math.min(5, mediaCount)}):`)
    mediaDocs.forEach((doc, idx) => {
      console.log(`\n   ${idx + 1}. ${doc.filename || 'Unnamed'}`)
      console.log(`      ID: ${doc._id}`)
      console.log(`      Alt: ${doc.alt || 'N/A'}`)
      console.log(`      URL: ${doc.url || 'N/A'}`)
      console.log(`      Cloudinary ID: ${doc.cloudinary_id || '❌ Not set'}`)
      console.log(`      From Cloudinary: ${doc.url?.includes('cloudinary') ? '✅ YES' : '❌ NO'}`)
      console.log(`      Size: ${doc.filesize ? (doc.filesize / 1024).toFixed(2) + ' KB' : 'N/A'}`)
      console.log(`      Type: ${doc.mimeType || 'N/A'}`)
    })
  }
  console.log('')
  
  // Check Trainers Collection
  console.log('👥 Trainers Collection:')
  const trainersCollection = db.collection('trainers')
  const trainersCount = await trainersCollection.countDocuments()
  console.log(`   Total trainers: ${trainersCount}`)
  
  if (trainersCount > 0) {
    const trainers = await trainersCollection.find().limit(10).toArray()
    console.log(`   Trainers list:`)
    
    for (const trainer of trainers) {
      console.log(`\n   - ${trainer.name || 'Unnamed'}`)
      console.log(`     ID: ${trainer._id}`)
      console.log(`     Title: ${trainer.title || 'N/A'}`)
      console.log(`     Photo ID: ${trainer.photo || '❌ No photo'}`)
      
      if (trainer.photo) {
        const photo = await mediaCollection.findOne({ _id: trainer.photo })
        if (photo) {
          console.log(`     Photo Details:`)
          console.log(`       - Filename: ${photo.filename || 'N/A'}`)
          console.log(`       - URL: ${photo.url || 'N/A'}`)
          console.log(`       - From Cloudinary: ${photo.url?.includes('cloudinary') ? '✅ YES' : '❌ NO'}`)
          console.log(`       - Cloudinary ID: ${photo.cloudinary_id || '❌ Not set'}`)
        } else {
          console.log(`     ⚠️  Photo document not found in media collection`)
        }
      }
    }
  }
  console.log('')
  
  // Check Supplements Collection
  console.log('💊 Supplements Collection:')
  const supplementsCollection = db.collection('supplements')
  const supplementsCount = await supplementsCollection.countDocuments()
  console.log(`   Total supplements: ${supplementsCount}`)
  
  if (supplementsCount > 0) {
    const supplements = await supplementsCollection.find().limit(3).toArray()
    console.log(`   Sample supplements:`)
    for (const supp of supplements) {
      console.log(`\n   - ${supp.name || 'Unnamed'}`)
      console.log(`     Price: $${supp.price || 'N/A'}`)
      console.log(`     Image ID: ${supp.image || '❌ No image'}`)
      
      if (supp.image) {
        const image = await mediaCollection.findOne({ _id: supp.image })
        if (image) {
          console.log(`     Image URL: ${image.url || 'N/A'}`)
          console.log(`     From Cloudinary: ${image.url?.includes('cloudinary') ? '✅ YES' : '❌ NO'}`)
        }
      }
    }
  }
  console.log('')
  
  // Cloudinary Resources Check
  console.log('☁️  Cloudinary Resources:')
  try {
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'gym-media',
      max_results: 20
    })
    console.log(`   Found ${resources.resources.length} resources in gym-media folder`)
    
    if (resources.resources.length > 0) {
      console.log(`   Resources:`)
      resources.resources.forEach((resource, idx) => {
        console.log(`   ${idx + 1}. ${resource.public_id}`)
        console.log(`      Format: ${resource.format}, Size: ${(resource.bytes / 1024).toFixed(2)} KB`)
        console.log(`      URL: ${resource.secure_url}`)
      })
    }
  } catch (error) {
    console.error('   ❌ Error fetching Cloudinary resources:', error.message)
  }
  
} catch (error) {
  console.error('❌ Error:', error.message)
} finally {
  await client.close()
}

console.log('\n' + '='.repeat(80))
console.log('✅ Check Complete!')
console.log('='.repeat(80))
