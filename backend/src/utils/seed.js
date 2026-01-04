require('dotenv').config()
const mongoose = require('mongoose')
const Route = require('../models/Route')

const sampleRoutes = [
  {
    from: {
      name: 'Asansol Railway Station',
      coords: { lat: 23.6831, lng: 86.9826 },
    },
    to: {
      name: 'Kazi Nazrul University',
      coords: { lat: 23.7200, lng: 87.1200 },
    },
    transportType: 'Shared Auto',
    identifier: {
      color: 'Green',
      localName: 'University Auto',
    },
    stops: [
      { name: 'Burnpur Market', coords: { lat: 23.6950, lng: 87.0100 } },
      { name: 'IISCO Steel Plant', coords: { lat: 23.7050, lng: 87.0500 } },
    ],
    fare: {
      min: 20,
      max: 25,
      peakHourSurcharge: 5,
      studentDiscount: true,
    },
    timings: {
      firstService: '06:00',
      lastService: '21:00',
      frequency: 'Every 10 mins',
    },
    tips: [
      {
        text: "Ask for 'KNU' not just 'University'",
        votes: 12,
      },
      {
        text: 'Crowded after 5 PM during college hours',
        votes: 8,
      },
    ],
    metadata: {
      upvotes: 45,
      downvotes: 2,
      verifiedVotes: 23,
      lastVerified: new Date(),
      status: 'verified',
    },
  },
  {
    from: {
      name: 'Asansol Bus Stand',
      coords: { lat: 23.6850, lng: 86.9800 },
    },
    to: {
      name: 'Medical College',
      coords: { lat: 23.6920, lng: 87.0050 },
    },
    transportType: 'City Bus',
    identifier: {
      color: 'Blue',
      localName: 'Medical College Bus',
      routeNumber: '12A',
    },
    stops: [
      { name: 'Sen Raleigh', coords: { lat: 23.6880, lng: 86.9900 } },
      { name: 'Chelidanga', coords: { lat: 23.6900, lng: 86.9980 } },
    ],
    fare: {
      min: 10,
      max: 15,
      studentDiscount: true,
    },
    timings: {
      firstService: '05:30',
      lastService: '22:00',
      frequency: 'Every 15 mins',
    },
    tips: [
      {
        text: 'Get off at the second stop after Chelidanga',
        votes: 15,
      },
    ],
    metadata: {
      upvotes: 34,
      downvotes: 1,
      verifiedVotes: 18,
      lastVerified: new Date(),
      status: 'verified',
    },
  },
  {
    from: {
      name: 'Railway Station',
      coords: { lat: 23.6831, lng: 86.9826 },
    },
    to: {
      name: 'Burnpur',
      coords: { lat: 23.6950, lng: 87.0100 },
    },
    transportType: 'Shared Auto',
    identifier: {
      color: 'Yellow',
      localName: 'Burnpur Auto',
    },
    stops: [
      { name: 'Raniganj More', coords: { lat: 23.6880, lng: 86.9950 } },
    ],
    fare: {
      min: 15,
      max: 20,
    },
    timings: {
      firstService: '06:00',
      lastService: '20:30',
      frequency: 'Every 20 mins',
    },
    tips: [],
    metadata: {
      upvotes: 28,
      downvotes: 3,
      verifiedVotes: 12,
      status: 'verified',
    },
  },
  {
    from: {
      name: 'City Center',
      coords: { lat: 23.6900, lng: 86.9900 },
    },
    to: {
      name: 'IT Park',
      coords: { lat: 23.7100, lng: 87.0200 },
    },
    transportType: 'E-rickshaw',
    identifier: {
      color: 'Green',
      localName: 'IT Park E-rickshaw',
    },
    stops: [
      { name: 'Shopping Mall', coords: { lat: 23.6950, lng: 87.0000 } },
      { name: 'College Road', coords: { lat: 23.7000, lng: 87.0100 } },
    ],
    fare: {
      min: 10,
      max: 15,
    },
    timings: {
      firstService: '07:00',
      lastService: '19:00',
      frequency: 'On demand',
    },
    tips: [
      {
        text: 'Negotiate fare before starting',
        votes: 20,
      },
    ],
    metadata: {
      upvotes: 19,
      downvotes: 2,
      verifiedVotes: 8,
      status: 'verified',
    },
  },
  {
    from: {
      name: 'Engineering College',
      coords: { lat: 23.6750, lng: 86.9900 },
    },
    to: {
      name: 'Railway Station',
      coords: { lat: 23.6831, lng: 86.9826 },
    },
    transportType: 'Shared Auto',
    identifier: {
      color: 'Red',
      localName: 'College Station Auto',
    },
    stops: [
      { name: 'Bhanga Talaab', coords: { lat: 23.6800, lng: 86.9850 } },
    ],
    fare: {
      min: 15,
      max: 20,
      studentDiscount: true,
    },
    timings: {
      firstService: '06:30',
      lastService: '21:00',
      frequency: 'Every 10 mins during college hours',
    },
    tips: [
      {
        text: 'Very crowded during morning 8-9 AM',
        votes: 25,
      },
    ],
    metadata: {
      upvotes: 52,
      downvotes: 1,
      verifiedVotes: 30,
      lastVerified: new Date(),
      status: 'verified',
    },
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing routes
    await Route.deleteMany({})
    console.log('🗑️  Cleared existing routes')

    // Insert sample routes
    await Route.insertMany(sampleRoutes)
    console.log(`✅ Inserted ${sampleRoutes.length} sample routes`)

    console.log('🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
