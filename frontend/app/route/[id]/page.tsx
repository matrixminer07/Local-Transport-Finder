'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Clock, IndianRupee, ThumbsUp, ThumbsDown, AlertCircle, Edit, Navigation, Users, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import RouteMap from '@/components/map/RouteMap'
import api from '@/lib/api'
import { toast } from 'sonner'

export default function RouteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [route, setRoute] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'details' | 'tips' | 'map'>('details')

  useEffect(() => {
    if (params.id) {
      fetchRouteDetails()
    }
  }, [params.id])

  const fetchRouteDetails = async () => {
    if (!params.id) return
    
    try {
      const response = await api.get(`/routes/${params.id}`)
      setRoute(response.data)
    } catch (error) {
      console.error('Error fetching route:', error)
      toast.error('Failed to load route details')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!params.id) return
    
    try {
      await api.post(`/routes/${params.id}/vote`, { type: voteType })
      toast.success(`Vote recorded!`)
      fetchRouteDetails()
    } catch (error) {
      toast.error('Failed to record vote')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Route not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    )
  }

  const colorBadges: { [key: string]: string } = {
    Green: 'bg-green-500',
    Blue: 'bg-blue-500',
    Red: 'bg-red-500',
    Yellow: 'bg-yellow-500',
    White: 'bg-gray-100 border-2 border-gray-300',
    Orange: 'bg-orange-500',
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${colorBadges[route.identifier.color] || 'bg-gray-400'} flex items-center justify-center shadow-md`}
                >
                  {route.identifier.color === 'White' && (
                    <span className="text-gray-700 text-lg font-bold">W</span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {route.identifier.localName}
                  </h1>
                  <p className="text-gray-600">{route.transportType}</p>
                </div>
              </div>

              {route.metadata.status === 'verified' && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <ThumbsUp className="w-4 h-4" />
                  Verified
                </div>
              )}
            </div>

            {/* Route Path */}
            <div className="flex items-center gap-3 text-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-semibold">{route.from.name}</span>
              <span className="text-gray-400">→</span>
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-semibold">{route.to.name}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'details', label: 'Details', icon: Info },
              { id: 'tips', label: 'Local Tips', icon: Users },
              { id: 'map', label: 'Map', icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Fare */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <IndianRupee className="w-5 h-5" />
                    <span className="font-semibold text-lg">Fare</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{route.fare.min} - ₹{route.fare.max}
                  </p>
                  {route.fare.studentDiscount && (
                    <p className="text-sm text-blue-700 mt-2">
                      ✓ Student discount available
                    </p>
                  )}
                </div>

                {/* Timings */}
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Timings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">First Service</p>
                      <p className="font-semibold">{route.timings.firstService}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Last Service</p>
                      <p className="font-semibold">{route.timings.lastService}</p>
                    </div>
                  </div>
                  {route.timings.frequency && (
                    <p className="text-sm text-gray-600 mt-3">
                      Frequency: {route.timings.frequency}
                    </p>
                  )}
                </div>

                {/* Stops */}
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Stops</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="font-medium">{route.from.name}</span>
                      <span className="text-xs text-gray-500">(Start)</span>
                    </div>
                    {route.stops.map((stop: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span>{stop.name}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      <span className="font-medium">{route.to.name}</span>
                      <span className="text-xs text-gray-500">(End)</span>
                    </div>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Community Trust</span>
                    <span className="text-sm text-gray-600">
                      {route.metadata.verifiedVotes} verified
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleVote('up')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{route.metadata.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote('down')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{route.metadata.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-4">
                {route.tips && route.tips.length > 0 ? (
                  route.tips.map((tip: any, index: number) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-gray-900 mb-2">{tip.text}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {tip.votes} helpful
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No local tips yet. Be the first to add one!
                  </div>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div>
                <RouteMap routes={[route]} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.info('Opening in Google Maps...')}
                className="flex-1 sm:flex-initial bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Navigate
              </button>
              <button
                onClick={() => router.push(`/contribute?edit=${params.id || ''}`)}
                className="flex-1 sm:flex-initial bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Suggest Edit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
