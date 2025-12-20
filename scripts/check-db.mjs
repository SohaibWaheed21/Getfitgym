import fs from 'fs'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

// Load .env, then test.env as fallback
if (fs.existsSync('.env')) dotenv.config()
if (fs.existsSync('test.env')) dotenv.config({ path: 'test.env' })

const uri = process.env.DATABASE_URI
if (!uri) {
  console.error('DATABASE_URI is not set in your environment (.env or test.env).')
  process.exit(2)
}

console.log('Using DATABASE_URI:', uri.startsWith('mongodb') ? '[present]' : uri)

async function run() {
  let client
  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
    await client.connect()
    // ping the server
    await client.db().command({ ping: 1 })
    console.log('✅ Successfully connected to MongoDB')
    process.exit(0)
  } catch (err) {
    console.error('❌ MongoDB connection failed:')
    console.error(err.message || err)
    process.exit(3)
  } finally {
    if (client) await client.close()
  }
}

run()
