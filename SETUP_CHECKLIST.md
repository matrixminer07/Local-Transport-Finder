# 🚀 Complete Setup Checklist

## ✅ Tasks to Complete:

### 1. Get Google Maps API Key
- [ ] Go to https://console.cloud.google.com/
- [ ] Create project: "Local Transport Finder"
- [ ] Enable: Maps JavaScript API, Geocoding API, Places API
- [ ] Create API key with HTTP referrer restrictions
- [ ] Copy your API key: `______________________`

### 2. Setup MongoDB
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create M0 Sandbox cluster (FREE)
- [ ] Create database user: `admin` with password
- [ ] Add your IP to access list
- [ ] Get connection string: `______________________`

### 3. Update Environment Files

#### Backend (.env)
Replace these values:
```bash
MONGODB_URI=your_mongodb_connection_string_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

#### Frontend (.env.local)
Replace these values:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Restart Servers
- [ ] Stop current servers (Ctrl+C in terminals)
- [ ] Restart backend: `npm run dev`
- [ ] Restart frontend: `npm run dev`

## 🎯 Quick Commands:
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

## 🌐 Access URLs:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health
