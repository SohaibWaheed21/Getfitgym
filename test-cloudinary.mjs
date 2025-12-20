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

console.log('🔍 Testing Cloudinary Integration...\n')

// Test 1: Check Environment Variables
console.log('1️⃣ Checking Environment Variables:')
console.log('   CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing')
console.log('   CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || '❌ Missing')
console.log('   CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '❌ Missing')
console.log('')

// Test 2: Check Cloudinary Connection
console.log('2️⃣ Testing Cloudinary Connection:')
try {
  const result = await cloudinary.api.ping()
  console.log('   ✅ Cloudinary connection successful!')
  console.log('   Status:', result.status)
} catch (error) {
  console.error('   ❌ Cloudinary connection failed:', error.message)
}
console.log('')

// Test 3: Check Cloudinary Resources
console.log('3️⃣ Checking Cloudinary Resources:')
try {
  const resources = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'gym-media',
    max_results: 10
  })
  console.log(`   Found ${resources.resources.length} resources in gym-media folder`)
  
  if (resources.resources.length > 0) {
    console.log('   First few resources:')
    resources.resources.slice(0, 3).forEach(resource => {
      console.log(`   - ${resource.public_id} (${resource.format}, ${resource.bytes} bytes)`)
      console.log(`     URL: ${resource.secure_url}`)
    })
  } else {
    console.log('   ⚠️  No images found in Cloudinary gym-media folder yet')
  }
} catch (error) {
  console.error('   ❌ Error fetching resources:', error.message)
}
console.log('')

// Test 4: Check Database Media Collection
console.log('4️⃣ Checking Database Media Collection:')
const uri = process.env.DATABASE_URI
const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db()
  const mediaCollection = db.collection('media')
  
  const mediaCount = await mediaCollection.countDocuments()
  console.log(`   Total media documents in DB: ${mediaCount}`)
  
  if (mediaCount > 0) {
    const mediaDocs = await mediaCollection.find().limit(5).toArray()
    console.log('   Sample media documents:')
    mediaDocs.forEach(doc => {
      console.log(`   - ${doc.filename || 'N/A'}`)
      console.log(`     URL: ${doc.url || 'N/A'}`)
      console.log(`     Cloudinary ID: ${doc.cloudinary_id || '❌ Not set'}`)
      console.log(`     Has Cloudinary URL: ${doc.url?.includes('cloudinary') ? '✅ Yes' : '❌ No'}`)
    })
  } else {
    console.log('   ⚠️  No media documents found in database yet')
    console.log('   Upload an image through the admin panel to test!')
  }
} catch (error) {
  console.error('   ❌ Error checking database:', error.message)
} finally {
  await client.close()
}
console.log('')

// Test 5: Check if trainers have photos
console.log('5️⃣ Checking Trainers with Photos:')
const client2 = new MongoClient(uri)
try {
  await client2.connect()
  const db = client2.db()
  const trainersCollection = db.collection('trainers')
  
  const trainersCount = await trainersCollection.countDocuments()
  console.log(`   Total trainers: ${trainersCount}`)
  
  const trainersWithPhotos = await trainersCollection.countDocuments({ photo: { $exists: true, $ne: null } })
  console.log(`   Trainers with photos: ${trainersWithPhotos}`)
  
  if (trainersWithPhotos > 0) {
    const trainers = await trainersCollection.find({ photo: { $exists: true, $ne: null } }).limit(3).toArray()
    console.log('   Sample trainers:')
    for (const trainer of trainers) {
      console.log(`   - ${trainer.name}`)
      console.log(`     Photo ID: ${trainer.photo}`)
      
      // Lookup photo details
      const photo = await db.collection('media').findOne({ _id: trainer.photo })
      if (photo) {
        console.log(`     Photo URL: ${photo.url}`)
        console.log(`     From Cloudinary: ${photo.url?.includes('cloudinary') ? '✅ Yes' : '❌ No'}`)
      }
    }
  }
} catch (error) {
  console.error('   ❌ Error checking trainers:', error.message)
} finally {
  await client2.close()
}

console.log('\n✅ Cloudinary Integration Check Complete!')
console.log('\n📝 Summary:')
console.log('   - If no images in Cloudinary yet: Upload via admin panel at http://localhost:3002/admin')
console.log('   - Images should automatically upload to Cloudinary when added through admin')
console.log('   - Check that media documents have cloudinary_id field set')
