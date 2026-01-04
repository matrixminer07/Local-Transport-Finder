# Local Transport Finder 🚗

> Community-driven navigation for local transport in small-town India

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🎯 Overview

Local Transport Finder solves the last-mile navigation problem in small-town India by crowdsourcing local transport routes (shared autos, private buses, e-rickshaws) that Google Maps doesn't cover.

**Core Value Proposition:** Know which color auto to take, where it actually stops, and what you should actually pay—before you leave home.

## ✨ Features

- **Smart Search**: Find routes with Google Places autocomplete
- **Community Verified**: Routes verified by local travelers
- **Fair Fare Info**: Know the right price before you travel
- **Interactive Maps**: Google Maps with custom route overlays
- **Local Tips**: Crowdsourced travel tips from locals
- **Offline Support**: PWA with offline route caching
- **Multi-language**: English, Hindi, and regional languages

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **Maps**: Google Maps JavaScript API
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **API**: RESTful

### DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway
- **Database**: MongoDB Atlas
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Google Maps API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/local-transport-finder.git
cd local-transport-finder
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" >> .env.local

# Start development server
npm run dev
```

4. **Open your browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
local-transport-finder/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── search/         # Search results
│   │   ├── route/[id]/     # Route details
│   │   └── contribute/     # Add route form
│   ├── components/          # React components
│   │   ├── map/            # Map components
│   │   ├── search/         # Search components
│   │   └── shared/         # Shared components
│   └── lib/                # Utilities
│
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Main server file
│   └── package.json
│
└── docs/                   # Documentation
```

## 🔑 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/local-transport
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Routes
- `GET /api/routes/search?from=...&to=...` - Search routes
- `GET /api/routes/:id` - Get single route
- `POST /api/routes` - Create new route
- `POST /api/routes/:id/vote` - Vote on route
- `POST /api/routes/:id/tips` - Add local tip
- `GET /api/routes/popular` - Get popular routes
- `GET /api/routes/nearby?lat=...&lng=...` - Get nearby routes

## 🎨 Design System

### Colors
- Primary: `#2563EB` (Blue)
- Secondary: `#FCD34D` (Yellow)
- Success: `#10B981` (Green)
- Danger: `#EF4444` (Red)

### Typography
- Font Family: Inter
- Headings: Bold, 600-900 weight
- Body: Regular, 400 weight

### Components
- Border Radius: 12px (rounded-xl)
- Shadows: Soft, elevation-based
- Spacing: 4px base unit

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy --prod
```

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables

### Database (MongoDB Atlas)
1. Create cluster
2. Create database user
3. Whitelist IP addresses
4. Get connection string

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Your Name** - Full Stack Developer

## 🙏 Acknowledgments

- Google Maps Platform for mapping services
- Local communities for route data
- Open source community for amazing tools

## 📧 Contact

For questions or support, reach out to:
- Email: hello@localtransport.in
- Twitter: @localtransport
- GitHub Issues: [Create an issue](https://github.com/yourusername/local-transport-finder/issues)

---

Made with ❤️ for small-town India
