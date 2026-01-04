# Deployment Guide

Complete guide to deploying Local Transport Finder to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring)

---

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Render account (free tier)
- MongoDB Atlas account (free tier)
- Google Cloud account with Maps API enabled

---

## MongoDB Atlas Setup

### 1. Create Production Cluster

```bash
1. Go to MongoDB Atlas (cloud.mongodb.com)
2. Create new cluster (M0 Free tier)
3. Choose cloud provider and region
4. Click "Create Cluster"
```

### 2. Configure Database Access

```bash
1. Go to "Database Access"
2. Add new database user
3. Authentication: Password
4. Username: produser
5. Generate secure password
6. Database User Privileges: Read and write to any database
7. Save credentials securely
```

### 3. Configure Network Access

```bash
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, whitelist specific IPs
4. Confirm
```

### 4. Get Connection String

```bash
1. Go to "Database" > Click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy connection string
5. Replace <password> with your database user password
6. Replace <dbname> with: local-transport

Final format:
mongodb+srv://produser:<password>@cluster0.xxxxx.mongodb.net/local-transport?retryWrites=true&w=majority
```

---

## Backend Deployment (Render)

### 1. Prepare Repository

```bash
# Ensure your code is on GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create New Web Service on Render

```bash
1. Go to dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: local-transport-api
   - Region: Choose closest to your users
   - Branch: main
   - Root Directory: backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
5. Click "Create Web Service"
```

### 3. Add Environment Variables

In Render dashboard, go to "Environment":

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://produser:<password>@cluster0.xxxxx.mongodb.net/local-transport
JWT_SECRET=<generate-secure-random-string>
GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
CORS_ORIGIN=https://your-frontend-domain.vercel.app
PORT=5000
```

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Deploy

```bash
1. Click "Manual Deploy" or wait for automatic deployment
2. Monitor deployment logs
3. Once deployed, note your backend URL:
   https://local-transport-api.onrender.com
```

### 5. Test Backend

```bash
curl https://local-transport-api.onrender.com/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2026-01-01T...",
  "uptime": 123.45
}
```

### 6. Seed Production Database

```bash
# Connect to Render shell
1. In Render dashboard, go to "Shell" tab
2. Run seed command:
   npm run seed
```

---

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard

```bash
1. Go to vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: .next
5. Don't deploy yet - add environment variables first
```

### 3. Add Environment Variables

In Vercel project settings:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
NEXT_PUBLIC_API_URL=https://local-transport-api.onrender.com/api
```

### 4. Deploy

```bash
1. Click "Deploy"
2. Wait for deployment to complete
3. Your site will be live at:
   https://your-project.vercel.app
```

### 5. Configure Custom Domain (Optional)

```bash
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning
```

---

## Environment Variables Summary

### Backend (.env on Render)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.net/dbname
JWT_SECRET=<64-char-random-string>
GOOGLE_MAPS_API_KEY=<your-key>
CORS_ORIGIN=https://your-frontend.vercel.app
PORT=5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (Vercel Environment Variables)
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-key>
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## Post-Deployment

### 1. Update Google Maps API Restrictions

```bash
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Credentials"
3. Click on your API key
4. Under "Application restrictions":
   - HTTP referrers (web sites)
   - Add: https://your-frontend.vercel.app/*
   - Add: https://*.vercel.app/* (for preview deployments)
5. Save
```

### 2. Update CORS Configuration

Ensure backend CORS_ORIGIN matches your frontend domain.

### 3. Test Production

```bash
# Test search functionality
curl "https://your-backend.onrender.com/api/routes/search?from=Station&to=College"

# Visit frontend
https://your-frontend.vercel.app

# Test complete user flow:
1. Search for routes
2. View route details
3. Add a new route
4. Vote on routes
```

### 4. Monitor Logs

**Render**:
```bash
- Dashboard → Your service → Logs tab
- Monitor for errors
```

**Vercel**:
```bash
- Project → Deployments → Click deployment → Runtime Logs
```

### 5. Set Up Monitoring

**Backend Health Check**:
```bash
# Add to uptimerobot.com or similar
Endpoint: https://your-backend.onrender.com/health
Interval: 5 minutes
```

---

## Continuous Deployment

### Automatic Deployments

**Vercel**: Automatically deploys on every push to main branch

**Render**: Automatically deploys on every push to main branch

### Branch Deployments

**Vercel**:
- Every branch gets preview deployment
- Preview URL: https://your-project-git-branch.vercel.app

**Render**:
- Can create separate services for staging
- Configure different branches per service

---

## Performance Optimization

### 1. Enable Caching

**Vercel** (automatic):
- Static assets cached on CDN
- API routes cached with headers

**Render**:
- Add Redis for caching (optional)
- Use Render's CDN

### 2. Database Indexing

```bash
# Already configured in Route model
# Verify indexes in MongoDB Atlas:
1. Go to Collections → Indexes tab
2. Ensure indexes exist on:
   - from.name, to.name (text)
   - from.coords (2dsphere)
   - transportType
   - metadata.status
```

### 3. Image Optimization

Next.js automatic image optimization is enabled.

### 4. Bundle Size

```bash
# Analyze bundle
cd frontend
npm run build
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Security Checklist

- [ ] Environment variables secured
- [ ] MongoDB credentials rotated
- [ ] Google Maps API restricted to domains
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] JWT secret is random and secure
- [ ] MongoDB network access configured
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Dependencies updated regularly

---

## Backup Strategy

### Database Backup

```bash
1. MongoDB Atlas automatic backups (enabled by default)
2. Manual backup:
   - Atlas dashboard → Clusters → Backup
   - Download backup or schedule automated backups
```

### Code Backup

```bash
# Always push to GitHub
git push origin main

# Tag releases
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

---

## Rollback Procedure

### Frontend Rollback (Vercel)

```bash
1. Go to Project → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
```

### Backend Rollback (Render)

```bash
1. Go to Dashboard → Your service
2. Click "Manual Deploy"
3. Select previous commit hash
4. Deploy
```

---

## Troubleshooting

### Backend Not Connecting to MongoDB

```bash
1. Check MONGODB_URI format
2. Verify password doesn't have special characters (URL encode if needed)
3. Check MongoDB Atlas network access
4. View Render logs for specific error
```

### Frontend Can't Reach Backend

```bash
1. Verify NEXT_PUBLIC_API_URL is correct
2. Check CORS_ORIGIN on backend
3. Test backend health endpoint directly
4. Check browser console for CORS errors
```

### Google Maps Not Loading

```bash
1. Verify API key in Vercel environment variables
2. Check Google Cloud Console for API restrictions
3. Ensure billing is enabled on Google Cloud
4. Check browser console for specific error
```

---

## Monitoring & Alerts

### Set Up Monitoring

1. **Uptime Monitoring**: Use UptimeRobot or Pingdom
2. **Error Tracking**: Add Sentry (optional)
3. **Analytics**: Add Google Analytics or Plausible

### Alert Triggers

- Backend health check fails
- MongoDB connection errors
- High error rate (>5%)
- Slow response times (>2s)

---

## Maintenance

### Regular Tasks

**Weekly**:
- Review error logs
- Check uptime metrics
- Monitor database size

**Monthly**:
- Update dependencies
- Review and optimize database queries
- Check Google Maps API usage

**Quarterly**:
- Security audit
- Performance optimization
- User feedback review

---

## Cost Estimation

### Free Tier Limits

**Vercel**: 
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic SSL

**Render**:
- 750 hours/month (single instance)
- 100 GB bandwidth/month
- Automatic SSL

**MongoDB Atlas**:
- 512 MB storage
- Shared RAM
- Shared CPU

**Google Maps**:
- $200/month credit
- ~28,000 map loads/month free

### Scaling Costs

When you exceed free tier:

**Vercel Pro**: $20/month
**Render**: $7/month per service
**MongoDB**: $9/month for M10 cluster
**Google Maps**: Pay per use after credit

---

## Next Steps

1. Monitor application for 24 hours
2. Test all user flows
3. Share with beta users
4. Collect feedback
5. Plan feature updates

---

**Congratulations! Your application is now live! 🎉**

For support: [GitHub Issues](https://github.com/yourusername/local-transport-finder/issues)
