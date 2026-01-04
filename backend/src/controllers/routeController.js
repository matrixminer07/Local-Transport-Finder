const Route = require('../models/Route')
const Edit = require('../models/Edit')

// Search routes
exports.searchRoutes = async (req, res) => {
  try {
    const { from, to, transportType } = req.query

    const query = {}

    if (from) {
      query['from.name'] = new RegExp(from, 'i')
    }

    if (to) {
      query['to.name'] = new RegExp(to, 'i')
    }

    if (transportType && transportType !== 'all') {
      query.transportType = transportType
    }

    // Only show verified or pending routes
    query['metadata.status'] = { $in: ['verified', 'pending'] }

    const routes = await Route.find(query)
      .sort({ 'metadata.verifiedVotes': -1, 'metadata.upvotes': -1 })
      .limit(50)

    res.json(routes)
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Error searching routes', error: error.message })
  }
}

// Get single route
exports.getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id)
      .populate('createdBy', 'name avatar')
      .populate('tips.userId', 'name avatar')

    if (!route) {
      return res.status(404).json({ message: 'Route not found' })
    }

    res.json(route)
  } catch (error) {
    console.error('Get route error:', error)
    res.status(500).json({ message: 'Error fetching route', error: error.message })
  }
}

// Create new route
exports.createRoute = async (req, res) => {
  try {
    const routeData = {
      ...req.body,
      createdBy: req.user?._id || null,
      metadata: {
        upvotes: 0,
        downvotes: 0,
        verifiedVotes: 0,
        status: 'pending',
      },
    }

    const route = new Route(routeData)
    await route.save()

    // Update user stats
    if (req.user) {
      req.user.stats.routesAdded += 1
      await req.user.save()
    }

    res.status(201).json(route)
  } catch (error) {
    console.error('Create route error:', error)
    res.status(400).json({ message: 'Error creating route', error: error.message })
  }
}

// Vote on route
exports.voteRoute = async (req, res) => {
  try {
    const { type } = req.body // 'up' or 'down'
    const route = await Route.findById(req.params.id)

    if (!route) {
      return res.status(404).json({ message: 'Route not found' })
    }

    if (type === 'up') {
      route.metadata.upvotes += 1
      route.metadata.verifiedVotes += 1
    } else if (type === 'down') {
      route.metadata.downvotes += 1
    }

    // Auto-verify after 10 upvotes
    if (route.metadata.upvotes >= 10 && route.metadata.status === 'pending') {
      route.metadata.status = 'verified'
      route.metadata.lastVerified = new Date()
    }

    await route.save()
    res.json(route)
  } catch (error) {
    console.error('Vote error:', error)
    res.status(500).json({ message: 'Error voting on route', error: error.message })
  }
}

// Add tip to route
exports.addTip = async (req, res) => {
  try {
    const { text } = req.body
    const route = await Route.findById(req.params.id)

    if (!route) {
      return res.status(404).json({ message: 'Route not found' })
    }

    route.tips.push({
      userId: req.user?._id,
      text,
      votes: 0,
      createdAt: new Date(),
    })

    await route.save()
    res.json(route)
  } catch (error) {
    console.error('Add tip error:', error)
    res.status(500).json({ message: 'Error adding tip', error: error.message })
  }
}

// Submit edit for approval
exports.submitEdit = async (req, res) => {
  try {
    const edit = new Edit({
      routeId: req.params.id,
      editType: req.body.editType,
      changes: req.body.changes,
      submittedBy: req.user?._id,
      status: 'pending',
    })

    await edit.save()
    res.status(201).json(edit)
  } catch (error) {
    console.error('Submit edit error:', error)
    res.status(400).json({ message: 'Error submitting edit', error: error.message })
  }
}

// Get popular routes
exports.getPopularRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ 'metadata.status': 'verified' })
      .sort({ 'metadata.upvotes': -1 })
      .limit(10)

    res.json(routes)
  } catch (error) {
    console.error('Get popular routes error:', error)
    res.status(500).json({ message: 'Error fetching popular routes', error: error.message })
  }
}

// Get nearby routes (using geospatial query)
exports.getNearbyRoutes = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query // radius in meters

    const routes = await Route.find({
      'from.coords': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    }).limit(20)

    res.json(routes)
  } catch (error) {
    console.error('Get nearby routes error:', error)
    res.status(500).json({ message: 'Error fetching nearby routes', error: error.message })
  }
}
