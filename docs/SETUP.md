# Setup Guide

Complete guide to setting up Local Transport Finder on your local machine.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Google Maps API Setup](#google-maps-api-setup)
3. [MongoDB Setup](#mongodb-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
  ```bash
  node --version  # Should be v18+
  ```

- **npm** (comes with Node.js)
  ```bash
  npm --version
  ```

- **Git**
  ```bash
  git --version
  ```

- **MongoDB** (local installation or MongoDB Atlas account)

---

## Google Maps API Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Note your project ID

2. **Enable Required APIs**
   - Navigate to "APIs & Services" > "Library"
   - Enable these APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
     - Directions API

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

4. **Restrict API Key (Recommended)**
   - Click on your API key
   - Under "Application restrictions":
     - For frontend: Select "HTTP referrers"
       - Add: `http://localhost:3000/*`
       - Add: `https://yourdomain.com/*`
     - For backend: Select "IP addresses"
       - Add your server IP
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose the 4 APIs mentioned above
   - Save changes

---

## MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB Community Server**
   - Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # macOS/Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

3. **Verify Installation**
   ```bash
   mongo --version
   ```

4. **Connection String**
   ```
   mongodb://localhost:27017/local-transport
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose "Free Shared Cluster"
   - Select region closest to you
   - Click "Create Cluster"

3. **Configure Access**
   - Go to "Database Access"
   - Add new database user
   - Choose "Password" authentication
   - Note username and password
   
4. **Whitelist IP**
   - Go to "Network Access"
   - Add IP Address
   - For development: Click "Allow Access from Anywhere"
   - For production: Add specific IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/local-transport
   ```

---

## Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd local-transport-finder/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env File**
   ```bash
   # Open .env in your editor
   nano .env  # or vim, code, etc.
   ```

   Update these values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=generate_random_secret_here
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   CORS_ORIGIN=http://localhost:3000
   ```

   To generate a secure JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Seed Database with Sample Data**
   ```bash
   npm run seed
   ```

   You should see:
   ```
   ✅ Connected to MongoDB
   🗑️  Cleared existing routes
   ✅ Inserted 5 sample routes
   🎉 Database seeded successfully!
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

   Server should start on http://localhost:5000
   
7. **Test API**
   ```bash
   curl http://localhost:5000/health
   ```

   Expected response:
   ```json
   {
     "status": "OK",
     "timestamp": "2026-01-01T...",
     "uptime": 12.345
   }
   ```

---

## Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd local-transport-finder/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   # Create .env.local file
   touch .env.local
   ```

4. **Edit .env.local File**
   ```bash
   nano .env.local
   ```

   Add these lines:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Application should start on http://localhost:3000

6. **Open in Browser**
   - Navigate to http://localhost:3000
   - You should see the landing page

---

## Troubleshooting

### MongoDB Connection Issues

**Error: `MongoServerError: Authentication failed`**
- Solution: Double-check username and password in connection string
- Ensure special characters in password are URL-encoded

**Error: `MongooseServerSelectionError: connect ECONNREFUSED`**
- Solution: Ensure MongoDB is running
  ```bash
  # Check if MongoDB is running
  ps aux | grep mongod
  
  # Start MongoDB
  sudo systemctl start mongod
  ```

### Google Maps API Issues

**Error: `Google Maps JavaScript API error: RefererNotAllowedMapError`**
- Solution: Add `http://localhost:3000/*` to HTTP referrer restrictions

**Error: Map not loading**
- Check browser console for specific error
- Verify API key is correct in .env.local
- Ensure Maps JavaScript API is enabled

### Port Already in Use

**Error: `EADDRINUSE: address already in use :::5000`**
- Solution: Kill process using the port
  ```bash
  # Find process
  lsof -i :5000
  
  # Kill process (replace PID)
  kill -9 PID
  ```

### Node Modules Issues

**Error: Module not found**
- Solution: Clear cache and reinstall
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### CORS Errors

**Error: `Access to fetch blocked by CORS policy`**
- Solution: Verify CORS_ORIGIN in backend .env matches frontend URL
- Restart backend server after changing .env

---

## Verification Checklist

After setup, verify everything works:

- [ ] Backend health check responds: `curl http://localhost:5000/health`
- [ ] MongoDB connected (check backend logs)
- [ ] Frontend loads at http://localhost:3000
- [ ] Google Maps displays on homepage
- [ ] Search autocomplete works
- [ ] Sample routes appear in search results
- [ ] Route detail page loads
- [ ] Add route form submits successfully

---

## Next Steps

Once setup is complete:

1. Explore the application
2. Try searching for routes
3. Add a new route
4. Check the API documentation in `docs/API.md`
5. Read contribution guidelines

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Search [GitHub Issues](https://github.com/yourusername/local-transport-finder/issues)
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

---

Happy coding! 🚀
