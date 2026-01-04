'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import RouteCard, { RouteCardSkeleton } from '@/components/search/RouteCard'
import SearchBar from '@/components/search/SearchBarWithMaps'
import { Filter, MapIcon, ListIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import RouteMap from '@/components/map/RouteMap'
import api from '@/lib/api'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams?.get('from') || ''
  const to = searchParams?.get('to') || ''

  const [routes, setRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filterType, setFilterType] = useState<string>('all')

  const transportTypes = ['all', 'Shared Auto', 'Private Bus', 'City Bus', 'E-rickshaw']

  useEffect(() => {
    if (from && to) {
      fetchRoutes()
    }
  }, [from, to, filterType])

  const fetchRoutes = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/routes/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&transportType=${filterType}`)
      setRoutes(response.data || [])
    } catch (error) {
      console.error('Search error:', error)
      // Fallback to sample data
      const sampleRoutes = [
        {
          _id: "route1",
          from: { name: "Railway Station" },
          to: { name: "Medical College" },
          transportType: "Shared Auto",
          fare: { min: 20, max: 30, studentDiscount: true },
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
          }
        }
      ]
      
      setRoutes([sampleRoutes[0]])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (from: string, to: string) => {
    const params = new URLSearchParams()
    params.set('from', from)
    params.set('to', to)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={(newFrom, newTo) => {
              handleSearch(newFrom, newTo)
            }}
          />
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Routes from {from} to {to}
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Searching...' : `${routes.length} routes found`}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {transportTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <RouteCardSkeleton key={i} />
                ))}
              </>
            ) : routes.length > 0 ? (
              routes.map((route, index) => (
                <RouteCard key={route._id} route={route} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No routes found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to add this route and help your community!
                  </p>
                  <button
                    onClick={() => window.location.href = '/contribute'}
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add This Route
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <RouteMap routes={routes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RouteCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
