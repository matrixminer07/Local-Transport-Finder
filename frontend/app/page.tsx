'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Users, CheckCircle, TrendingUp } from 'lucide-react'
import SearchBar from '@/components/search/SearchBarWithMaps'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()
  const [stats] = useState({
    routes: 1247,
    users: 8934,
    cities: 12,
  })

  const popularRoutes = [
    { from: 'Railway Station', to: 'Medical College', rides: 234 },
    { from: 'Bus Stand', to: 'Engineering College', rides: 189 },
    { from: 'City Center', to: 'IT Park', rides: 156 },
  ]

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Smart Route Mapping',
      description: 'Find routes Google Maps doesn\'t know about',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Verified',
      description: 'Trusted by thousands of local travelers',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Fair Fare Info',
      description: 'Know the right price before you travel',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Get the latest route and timing information',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Know Your <span className="text-primary">Local Routes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find shared autos, buses, and e-rickshaws in your city. 
              Get verified fares, timings, and local tips—all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <SearchBar onSearch={(from, to) => {
              router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
            }} />
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span><strong>{stats.routes}</strong> routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span><strong>{stats.users}</strong> verified locals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span><strong>{stats.cities}</strong> cities</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Routes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/search?from=${route.from}&to=${route.to}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">From</p>
                    <p className="font-semibold text-gray-900">{route.from}</p>
                  </div>
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">To</p>
                  <p className="font-semibold text-gray-900">{route.to}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{route.rides} rides today</span>
                  <span className="text-primary font-medium">View →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Help Your Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Know a local route? Share it and help thousands of travelers!
          </p>
          <button
            onClick={() => router.push('/contribute')}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Add a Route
          </button>
        </div>
      </section>
    </div>
  )
}
