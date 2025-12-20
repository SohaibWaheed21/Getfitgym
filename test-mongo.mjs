import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DATABASE_URI

console.log('Testing MongoDB connection...')
console.log('Connection string:', uri?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'))

const client = new MongoClient(uri)

try {
  await client.connect()
  console.log('✅ Successfully connected to MongoDB!')
  
  const db = client.db()
  console.log('Database name:', db.databaseName)
  
  const collections = await db.listCollections().toArray()
  console.log('Collections:', collections.map(c => c.name).join(', ') || 'No collections yet')
  
} catch (error) {
  console.error('❌ Failed to connect to MongoDB')
  console.error('Error:', error.message)
} finally {
  await client.close()
  console.log('\nConnection test completed.')
}
