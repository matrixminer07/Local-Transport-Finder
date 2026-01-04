'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, IndianRupee, Users, ThumbsUp, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Route {
  _id: string
  from: { name: string }
  to: { name: string }
  transportType: string
  identifier: {
    color: string
    localName: string
  }
  fare: {
    min: number
    max: number
    studentDiscount?: boolean
  }
  timings: {
    lastService: string
    frequency?: string
  }
  metadata: {
    upvotes: number
    verifiedVotes: number
    status: string
  }
  stops: Array<{ name: string }>
}

interface RouteCardProps {
  route: Route
  index?: number
}

const colorBadges: { [key: string]: string } = {
  Green: 'bg-green-500',
  Blue: 'bg-blue-500',
  Red: 'bg-red-500',
  Yellow: 'bg-yellow-500',
  White: 'bg-gray-100 border-2 border-gray-300',
  Orange: 'bg-orange-500',
}

export default function RouteCard({ route, index = 0 }: RouteCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/route/${route._id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* Header with color badge */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full ${colorBadges[route.identifier.color] || 'bg-gray-400'} flex items-center justify-center`}
            >
              {route.identifier.color === 'White' && (
                <span className="text-gray-700 text-xs font-bold">W</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {route.identifier.localName}
              </h3>
              <p className="text-sm text-gray-500">{route.transportType}</p>
            </div>
          </div>

          {route.metadata.status === 'verified' && (
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <ThumbsUp className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>

        {/* Route path */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-medium">{route.from.name}</span>
          <span className="text-gray-400">→</span>
          <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="font-medium">{route.to.name}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3">
        {/* Fare */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold">
              ₹{route.fare.min}
              {route.fare.max > route.fare.min && `-₹${route.fare.max}`}
            </span>
            {route.fare.studentDiscount && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                Student discount
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{route.metadata.verifiedVotes} verified</span>
          </div>
        </div>

        {/* Timing */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Last service: {route.timings.lastService}</span>
          {route.timings.frequency && (
            <span className="text-gray-400">• {route.timings.frequency}</span>
          )}
        </div>

        {/* Stops preview */}
        {route.stops.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              Via: {route.stops.slice(0, 2).map(s => s.name).join(', ')}
              {route.stops.length > 2 && ` +${route.stops.length - 2} more`}
            </span>
          </div>
        )}

        {/* Trust score */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4" />
            <span>{route.metadata.upvotes} upvotes</span>
          </div>
          <button className="text-primary text-sm font-medium hover:underline">
            View Details →
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function RouteCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  )
}
