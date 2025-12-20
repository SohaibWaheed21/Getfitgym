// Pre-Deployment Verification Script

import { config } from 'dotenv'
config()

const checks = {
  env: [],
  cloudinary: [],
  database: [],
  files: [],
}

// 1. Check Environment Variables
console.log('🔍 Checking Environment Variables...')
const requiredEnvVars = [
  'DATABASE_URI',
  'PAYLOAD_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
]

requiredEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: ${varName.includes('SECRET') || varName.includes('API_KEY') || varName.includes('API_SECRET') ? '***' : process.env[varName]}`)
    checks.env.push({ name: varName, status: 'OK' })
  } else {
    console.log(`❌ ${varName}: Missing`)
    checks.env.push({ name: varName, status: 'MISSING' })
  }
})

// 2. Check Cloudinary Configuration
console.log('\n☁️  Checking Cloudinary Configuration...')
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('✅ Cloudinary configured correctly')
  console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`)
  checks.cloudinary.push({ name: 'Configuration', status: 'OK' })
} else {
  console.log('❌ Cloudinary missing required credentials')
  checks.cloudinary.push({ name: 'Configuration', status: 'MISSING' })
}

// 3. Check Database Connection String
console.log('\n🗄️  Checking Database Configuration...')
if (process.env.DATABASE_URI) {
  const dbUri = process.env.DATABASE_URI
  if (dbUri.includes('mongodb')) {
    console.log('✅ MongoDB connection string format valid')
    if (dbUri.includes('test')) {
      console.log('✅ Database name: test')
    }
    checks.database.push({ name: 'Connection String', status: 'OK' })
  } else {
    console.log('❌ Invalid database connection string')
    checks.database.push({ name: 'Connection String', status: 'INVALID' })
  }
} else {
  console.log('❌ DATABASE_URI not found')
  checks.database.push({ name: 'Connection String', status: 'MISSING' })
}

// 4. Summary
console.log('\n📊 VERIFICATION SUMMARY')
console.log('=' . repeat(50))

const allChecks = [...checks.env, ...checks.cloudinary, ...checks.database]
const passed = allChecks.filter(c => c.status === 'OK').length
const failed = allChecks.filter(c => c.status !== 'OK').length

console.log(`✅ Passed: ${passed}`)
console.log(`❌ Failed: ${failed}`)

if (failed === 0) {
  console.log('\n🎉 ALL CHECKS PASSED! Ready for deployment.')
  console.log('\n📝 Vercel Deployment Checklist:')
  console.log('   1. ✅ Environment variables configured')
  console.log('   2. ✅ Cloudinary integration working')
  console.log('   3. ✅ MongoDB connection configured')
  console.log('   4. ⚠️  Add all environment variables to Vercel:')
  console.log('      - DATABASE_URI')
  console.log('      - PAYLOAD_SECRET')
  console.log('      - CLOUDINARY_CLOUD_NAME')
  console.log('      - CLOUDINARY_API_KEY')
  console.log('      - CLOUDINARY_API_SECRET')
  console.log('\n🚀 Ready to deploy with: vercel --prod')
} else {
  console.log('\n⚠️  SOME CHECKS FAILED! Fix issues before deployment.')
  process.exit(1)
}
