const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`)
    console.log('💡 Make sure MongoDB is running locally or update MONGODB_URI in .env')
    // Don't exit in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB
