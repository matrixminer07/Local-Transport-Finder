const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  from: {
    name: { type: String, required: true },
    placeId: String,
    coords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  to: {
    name: { type: String, required: true },
    placeId: String,
    coords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  transportType: {
    type: String,
    required: true,
    enum: ['Shared Auto', 'Private Bus', 'City Bus', 'E-rickshaw'],
  },
  identifier: {
    color: {
      type: String,
      required: true,
      enum: ['Green', 'Blue', 'Red', 'Yellow', 'White', 'Orange'],
    },
    localName: { type: String, required: true },
    routeNumber: String,
  },
  stops: [{
    name: { type: String, required: true },
    coords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  }],
  fare: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    peakHourSurcharge: { type: Number, default: 0 },
    studentDiscount: { type: Boolean, default: false },
  },
  timings: {
    firstService: { type: String, required: true },
    lastService: { type: String, required: true },
    frequency: String,
  },
  tips: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  }],
  metadata: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    verifiedVotes: { type: Number, default: 0 },
    lastVerified: Date,
    status: {
      type: String,
      enum: ['pending', 'verified', 'flagged'],
      default: 'pending',
    },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
})

// Indexes for efficient querying
routeSchema.index({ 'from.name': 'text', 'to.name': 'text' })
routeSchema.index({ 'from.coords': '2dsphere' })
routeSchema.index({ 'to.coords': '2dsphere' })
routeSchema.index({ transportType: 1 })
routeSchema.index({ 'metadata.status': 1 })

module.exports = mongoose.model('Route', routeSchema)
