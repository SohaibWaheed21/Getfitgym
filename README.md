# Gym Management Website

A comprehensive gym management system built with Next.js and PayloadCMS, featuring member management, trainer bookings, supplements store, and attendance tracking.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Backend Admin Guide](#backend-admin-guide)
- [Collections Overview](#collections-overview)
- [API Routes](#api-routes)
- [Deployment](#deployment)

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image management)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/gym-management
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-management

# Payload CMS Secret (generate a random string)
PAYLOAD_SECRET=your-super-secret-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Next.js Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Getting Cloudinary Credentials:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

## Running the Application

### Development Mode

1. **Start MongoDB (if using Docker)**
   ```bash
   docker-compose up -d
   ```

2. **Run the development server**
   ```bash
   pnpm dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Production Build

```bash
pnpm build
pnpm start
```

## Backend Admin Guide

### First-Time Setup

#### 1. Create Admin Account

When you first run the application:

1. Navigate to http://localhost:3000/admin
2. You'll see the "Create First User" screen
3. Fill in the details:
   - **Email**: admin@gym.com (or your preferred email)
   - **Password**: Create a strong password
   - **Confirm Password**: Re-enter the password
4. Click **Create**

🎉 You're now logged into the admin panel!

### Admin Panel Overview

The admin panel sidebar contains all collections:

```
📊 Dashboard
👥 Users         - Admin users who can access the backend
👤 Members       - Gym members
🏋️ Trainers      - Personal trainers
💊 Supplements   - Store products
📸 Media         - Image uploads
📅 Bookings      - Training session bookings
✅ Attendance    - Member check-ins
📋 Bulk Attendance - Batch attendance records
🛒 Orders        - Supplement orders
🎯 Trial         - Trial session requests
⚙️ Page Settings - Website configuration
```

### How to Add/Manage Data

#### Adding Members

1. Click **Members** in the sidebar
2. Click **Create New** button
3. Fill in the form:
   - **Name**: Member's full name
   - **Email**: Contact email
   - **Phone**: Contact number
   - **Membership Type**: (e.g., Monthly, Yearly)
   - **Join Date**: When they joined
   - **Status**: Active/Inactive
4. Click **Save**

#### Adding Trainers

1. Click **Trainers** in the sidebar
2. Click **Create New**
3. Fill in:
   - **Name**: Trainer's full name
   - **Specialization**: (e.g., "Weight Loss, Muscle Building")
   - **Experience**: Years of experience
   - **Bio**: Short description
   - **Image**: Upload profile photo
   - **Hourly Rate**: Price per session
   - **Availability**: Working hours/days
4. Click **Save**

#### Adding Supplements

1. Click **Supplements** in the sidebar
2. Click **Create New**
3. Fill in:
   - **Name**: Product name
   - **Description**: Product details
   - **Price**: Amount
   - **Category**: (e.g., Protein, Pre-Workout)
   - **Stock**: Available quantity
   - **Image**: Product photo (uploads to Cloudinary)
   - **Featured**: Check if you want it on homepage
4. Click **Save**

#### Managing Page Settings

1. Click **Page Settings** in the sidebar
2. Configure:
   - **Site Title**: Website name
   - **Tagline**: Homepage tagline
   - **Contact Information**: Phone, email, address
   - **Social Media Links**: Facebook, Instagram, Twitter
   - **Pricing Plans**: Monthly/yearly membership costs
   - **Hero Images**: Homepage banners
   - **About Section**: Gym description
3. Click **Save**

#### Recording Attendance

**Individual Attendance:**
1. Click **Attendance** in the sidebar
2. Click **Create New**
3. Select:
   - **Member**: From dropdown
   - **Date**: Check-in date/time
   - **Type**: Check-in or Check-out
4. Click **Save**

**Bulk Attendance:**
1. Click **Bulk Attendance**
2. Click **Create New**
3. Select multiple members
4. Set date and time
5. Click **Save** to record all at once

#### Managing Bookings

1. Click **Bookings** in the sidebar
2. View all trainer booking requests
3. Click on a booking to:
   - View details
   - Update status (Pending/Confirmed/Cancelled)
   - Add notes
4. Click **Save**

#### Processing Orders

1. Click **Orders** in the sidebar
2. View supplement orders
3. Click on an order to:
   - See items ordered
   - Update status (Pending/Processing/Completed)
   - View customer details
4. Click **Save**

#### Handling Trial Requests

1. Click **Trial** in the sidebar
2. View trial session requests
3. Process each request:
   - Contact the person
   - Schedule trial session
   - Update status
4. Click **Save**

### Media Management

#### Uploading Images

1. Click **Media** in the sidebar
2. Click **Create New** or drag & drop files
3. Images are automatically uploaded to Cloudinary
4. Images are available for use in:
   - Trainer profiles
   - Supplement products
   - Page settings banners

#### Image Features:
- Automatic optimization
- Responsive sizing
- Cloud storage (Cloudinary)
- Focal point selection

### User Management

#### Adding Admin Users

1. Click **Users** in the sidebar
2. Click **Create New**
3. Fill in:
   - **Email**: User's email
   - **Password**: Create password
   - **Role**: Admin or Editor
4. Click **Save**

#### User Roles:
- **Admin**: Full access to all features
- **Editor**: Can manage content but not users

### Login & Authentication

#### Logging In

1. Go to http://localhost:3000/admin
2. Enter your email and password
3. Click **Login**

#### Forgot Password

1. Click **Forgot Password** on login page
2. Enter your email
3. Follow reset instructions sent to email

#### Logout

1. Click your email in top-right corner
2. Click **Logout**

### Search & Filters

Each collection has search and filter capabilities:

1. **Search Bar**: Type to search by name, email, etc.
2. **Filters**: Click filter icon to filter by:
   - Status
   - Date range
   - Category
   - Custom fields
3. **Sort**: Click column headers to sort

### Bulk Operations

1. Select multiple items using checkboxes
2. Click **Actions** dropdown
3. Choose action:
   - Delete selected
   - Update status
   - Export data

## Collections Overview

### Members Collection
- **Purpose**: Store gym member information
- **Fields**: Name, email, phone, membership type, status
- **Access**: Admin panel only

### Trainers Collection
- **Purpose**: Manage personal trainers
- **Fields**: Name, specialization, bio, image, rate, availability
- **Access**: Admin panel + Public API (read-only)

### Supplements Collection
- **Purpose**: E-commerce product catalog
- **Fields**: Name, price, description, image, stock, category
- **Access**: Admin panel + Public API (read-only)

### Bookings Collection
- **Purpose**: Track training session bookings
- **Fields**: Member, trainer, date, time, status
- **Access**: Admin panel + API

### Attendance Collection
- **Purpose**: Record member check-ins
- **Fields**: Member, date, time, type (in/out)
- **Access**: Admin panel + API

### Orders Collection
- **Purpose**: Supplement purchase orders
- **Fields**: Customer info, items, total, status
- **Access**: Admin panel + API

### Page Settings Collection
- **Purpose**: Website configuration
- **Fields**: Site info, pricing, contact details
- **Access**: Admin panel + Public API (read-only)

## API Routes

### Custom API Endpoints

#### Attendance API
```
POST /api/attendance
Body: { memberId, date, type }
```

#### Bookings API
```
POST /api/bookings
Body: { memberId, trainerId, date, time }
```

### Payload REST API

All collections are automatically available via REST API:

```
GET    /api/members
POST   /api/members
GET    /api/members/:id
PATCH  /api/members/:id
DELETE /api/members/:id
```

Replace `members` with any collection name: `trainers`, `supplements`, `bookings`, etc.

### GraphQL API

Available at: http://localhost:3000/api/graphql

Example query:
```graphql
query {
  Trainers {
    docs {
      name
      specialization
      hourlyRate
    }
  }
}
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure these are set in your hosting platform:
- `MONGODB_URI` - Production MongoDB connection
- `PAYLOAD_SECRET` - Strong secret key
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SERVER_URL` - Your production URL

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running: `mongosh`
- Check MONGODB_URI in `.env`
- Ensure IP whitelist (MongoDB Atlas)

### Admin Panel Not Loading
- Clear browser cache
- Check console for errors
- Verify PAYLOAD_SECRET is set

### Images Not Uploading
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file format (jpg, png, webp)

### Build Errors
```bash
rm -rf .next
pnpm dev
```

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run tests
pnpm test:e2e     # Run E2E tests
```

## Support

For issues or questions:
- Check documentation: [PayloadCMS Docs](https://payloadcms.com/docs)
- Review existing issues
- Contact development team

---

**Built with** ❤️ **using Next.js, PayloadCMS, MongoDB, and Cloudinary**
