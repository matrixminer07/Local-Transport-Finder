'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import RouteCard, { RouteCardSkeleton } from '@/components/search/RouteCard'
import SearchBar from '@/components/search/SearchBarOptimized'
import { Filter, MapIcon, ListIcon } from 'lucide-react'
import { motion } from 'framer-motion'

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
      setLoading(true)
      // Mock API call with sample data
      setTimeout(() => {
        setRoutes([
          {
            _id: '1',
            from: { name: from },
            to: { name: to },
            transportType: 'Shared Auto',
            fare: { min: 20, max: 30 },
            timings: { firstService: '6:00 AM', lastService: '10:00 PM' },
            upvotes: 45,
            downvotes: 3,
            status: 'verified'
          },
          {
            _id: '2',
            from: { name: from },
            to: { name: to },
            transportType: 'City Bus',
            fare: { min: 15, max: 25 },
            timings: { firstService: '5:30 AM', lastService: '11:00 PM' },
            upvotes: 32,
            downvotes: 2,
            status: 'verified'
          }
        ])
        setLoading(false)
      }, 1000)
    }
  }, [from, to])

  const filteredRoutes = routes.filter(route => 
    filterType === 'all' || route.transportType === filterType
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SearchBar onSearch={(from, to) => {
            router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
          }} />
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {transportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterType === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <>
              <RouteCardSkeleton />
              <RouteCardSkeleton />
              <RouteCardSkeleton />
            </>
          ) : filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <motion.div
                key={route._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <RouteCard route={route} />
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No routes found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find available routes.
              </p>
            </div>
          )}
        </div>
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
