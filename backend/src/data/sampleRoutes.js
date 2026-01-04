const sampleRoutes = [
  {
    _id: "route1",
    from: {
      name: "Railway Station",
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    to: {
      name: "Medical College",
      coordinates: { lat: 28.6239, lng: 77.2091 }
    },
    transportType: "Shared Auto",
    fare: {
      min: 20,
      max: 30,
      studentDiscount: true
    },
    timings: {
      firstService: "6:00 AM",
      lastService: "10:00 PM",
      frequency: "Every 15 minutes"
    },
    stops: [
      { name: "Bus Stand" },
      { name: "City Center" },
      { name: "Market Square" }
    ],
    identifier: {
      color: "Blue",
      localName: "Medical Wala"
    },
    metadata: {
      status: "verified",
      upvotes: 156,
      downvotes: 12,
      verifiedVotes: 89
    },
    tips: [
      {
        text: "Ask for 'Medical College' - drivers know this route well",
        createdAt: new Date('2024-01-15'),
        votes: 45
      }
    ]
  },
  {
    _id: "route2",
    from: {
      name: "Bus Stand",
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    to: {
      name: "Engineering College",
      coordinates: { lat: 28.6339, lng: 77.2191 }
    },
    transportType: "City Bus",
    fare: {
      min: 15,
      max: 25,
      studentDiscount: true
    },
    timings: {
      firstService: "5:30 AM",
      lastService: "9:30 PM",
      frequency: "Every 20 minutes"
    },
    stops: [
      { name: "Railway Station" },
      { name: "Court Road" },
      { name: "College Gate" }
    ],
    identifier: {
      color: "Green",
      localName: "College Bus"
    },
    metadata: {
      status: "verified",
      upvotes: 234,
      downvotes: 18,
      verifiedVotes: 156
    },
    tips: [
      {
        text: "Bus is usually crowded during peak hours - start early",
        createdAt: new Date('2024-01-10'),
        votes: 67
      }
    ]
  },
  {
    _id: "route3",
    from: {
      name: "City Center",
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    to: {
      name: "IT Park",
      coordinates: { lat: 28.6039, lng: 77.1990 }
    },
    transportType: "E-rickshaw",
    fare: {
      min: 40,
      max: 60,
      studentDiscount: false
    },
    timings: {
      firstService: "7:00 AM",
      lastService: "9:00 PM",
      frequency: "On demand"
    },
    stops: [
      { name: "Main Market" },
      { name: "Office Complex" }
    ],
    identifier: {
      color: "Yellow",
      localName: "E-Rick"
    },
    metadata: {
      status: "verified",
      upvotes: 89,
      downvotes: 5,
      verifiedVotes: 67
    },
    tips: [
      {
        text: "Best for short distances within the city",
        createdAt: new Date('2024-01-20'),
        votes: 23
      }
    ]
  }
]

module.exports = sampleRoutes
