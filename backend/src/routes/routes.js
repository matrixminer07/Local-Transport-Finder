const express = require('express')
const router = express.Router()
const routeController = require('../controllers/routeController')
const { optionalAuth } = require('../middleware/auth')

// Public routes
router.get('/search', routeController.searchRoutes)
router.get('/popular', routeController.getPopularRoutes)
router.get('/nearby', routeController.getNearbyRoutes)
router.get('/:id', routeController.getRoute)

// Routes that work with or without auth
router.post('/', optionalAuth, routeController.createRoute)
router.post('/:id/vote', optionalAuth, routeController.voteRoute)
router.post('/:id/tips', optionalAuth, routeController.addTip)
router.post('/:id/edit', optionalAuth, routeController.submitEdit)

module.exports = router
