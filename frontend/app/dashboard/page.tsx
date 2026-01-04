'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  MapPin, 
  Plus, 
  Star, 
  TrendingUp, 
  Users, 
  Clock,
  Award,
  Navigation,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userStats, setUserStats] = useState({
    contributedRoutes: 0,
    upvotesReceived: 0,
    helpfulTips: 0,
    reputation: 0
  })
  const [userRoutes, setUserRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchUserData()
    }
  }, [session])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      // Mock data - replace with actual API calls
      setUserStats({
        contributedRoutes: 12,
        upvotesReceived: 156,
        helpfulTips: 23,
        reputation: 892
      })
      
      setUserRoutes([
        {
          _id: 'route1',
          from: { name: 'Railway Station' },
          to: { name: 'Medical College' },
          transportType: 'Shared Auto',
          status: 'verified',
          upvotes: 45,
          downvotes: 3,
          createdAt: new Date('2024-01-15')
        },
        {
          _id: 'route2',
          from: { name: 'Bus Stand' },
          to: { name: 'Engineering College' },
          transportType: 'City Bus',
          status: 'pending',
          upvotes: 12,
          downvotes: 1,
          createdAt: new Date('2024-01-20')
        }
      ])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your routes and track your contributions to the community.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{userStats.contributedRoutes}</span>
            </div>
            <p className="text-gray-600 text-sm">Routes Contributed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{userStats.upvotesReceived}</span>
            </div>
            <p className="text-gray-600 text-sm">Upvotes Received</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{userStats.helpfulTips}</span>
            </div>
            <p className="text-gray-600 text-sm">Helpful Tips</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{userStats.reputation}</span>
            </div>
            <p className="text-gray-600 text-sm">Reputation Points</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Link
            href="/contribute"
            className="bg-primary hover:bg-blue-700 text-white p-6 rounded-xl shadow-sm transition-colors"
          >
            <div className="flex items-center gap-4">
              <Plus className="w-8 h-8" />
              <div>
                <h3 className="font-semibold text-lg">Add New Route</h3>
                <p className="text-blue-100 text-sm">Share a local route with the community</p>
              </div>
            </div>
          </Link>

          <Link
            href="/search"
            className="bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Navigation className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Browse Routes</h3>
                <p className="text-gray-600 text-sm">Find routes in your area</p>
              </div>
            </div>
          </Link>

          <Link
            href="/profile"
            className="bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Edit Profile</h3>
                <p className="text-gray-600 text-sm">Update your information</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Your Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Contributed Routes</h2>
          </div>
          
          <div className="p-6">
            {userRoutes.length > 0 ? (
              <div className="space-y-4">
                {userRoutes.map((route) => (
                  <div key={route._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {route.from.name} → {route.to.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            route.status === 'verified' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {route.status === 'verified' ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {route.transportType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {route.createdAt.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {route.upvotes} upvotes
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/route/${route._id}`}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/contribute?edit=${route._id}`}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No routes yet</h3>
                <p className="text-gray-600 mb-4">
                  Start contributing by adding your first local route.
                </p>
                <Link
                  href="/contribute"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Route
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
