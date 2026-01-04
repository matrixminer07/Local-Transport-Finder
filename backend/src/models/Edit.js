const mongoose = require('mongoose')

const editSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  editType: {
    type: String,
    required: true,
    enum: ['new_route', 'fare_update', 'timing_update', 'stop_add', 'tip_add'],
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewNote: String,
}, {
  timestamps: true,
})

editSchema.index({ status: 1 })
editSchema.index({ submittedBy: 1 })
editSchema.index({ routeId: 1 })

module.exports = mongoose.model('Edit', editSchema)
