'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MapPin, Clock, IndianRupee, Plus, X, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function ContributePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [stops, setStops] = useState<Array<{ name: string }>>([])
  const [stopInput, setStopInput] = useState('')

  const editId = searchParams.get('edit')

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    transportType: 'Shared Auto',
    fareMin: '',
    fareMax: '',
    studentDiscount: false,
    firstService: '6:00 AM',
    lastService: '10:00 PM',
    frequency: 'Every 15 minutes',
    color: 'Blue',
    localName: '',
    tip: ''
  })

  const addStop = () => {
    if (stopInput.trim()) {
      setStops([...stops, { name: stopInput.trim() }])
      setStopInput('')
    }
  }

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const routeData = {
        from: { name: formData.from },
        to: { name: formData.to },
        transportType: formData.transportType,
        fare: {
          min: parseInt(formData.fareMin),
          max: parseInt(formData.fareMax),
          studentDiscount: formData.studentDiscount
        },
        timings: {
          firstService: formData.firstService,
          lastService: formData.lastService,
          frequency: formData.frequency
        },
        stops: stops.map(stop => ({ name: stop.name })),
        identifier: {
          color: formData.color,
          localName: formData.localName
        },
        tips: formData.tip
      }

      console.log('Submitting route:', routeData)
      toast.success('Route submitted successfully! It will be reviewed by our team.')
      
      // Reset form
      setFormData({
        from: '',
        to: '',
        transportType: 'Shared Auto',
        fareMin: '',
        fareMax: '',
        studentDiscount: false,
        firstService: '6:00 AM',
        lastService: '10:00 PM',
        frequency: 'Every 15 minutes',
        color: 'Blue',
        localName: '',
        tip: ''
      })
      setStops([])
      setStopInput('')
      
    } catch (error) {
      console.error('Error submitting route:', error)
      toast.error('Failed to submit route. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              {editId ? 'Edit Route' : 'Add New Route'}
            </h1>
            <p className="text-gray-600 mt-2">
              Share your local transport knowledge with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Route Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Location
                  </label>
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    placeholder="e.g., Railway Station"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Location
                  </label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    placeholder="e.g., Medical College"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Transport Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport Type
              </label>
              <select
                value={formData.transportType}
                onChange={(e) => setFormData({...formData, transportType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="Shared Auto">Shared Auto</option>
                <option value="Private Bus">Private Bus</option>
                <option value="City Bus">City Bus</option>
                <option value="E-rickshaw">E-rickshaw</option>
              </select>
            </div>

            {/* Fare Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fare Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Fare (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.fareMin}
                    onChange={(e) => setFormData({...formData, fareMin: e.target.value})}
                    placeholder="e.g., 20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Fare (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.fareMax}
                    onChange={(e) => setFormData({...formData, fareMax: e.target.value})}
                    placeholder="e.g., 30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.studentDiscount}
                    onChange={(e) => setFormData({...formData, studentDiscount: e.target.checked})}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Student discount available</span>
                </label>
              </div>
            </div>

            {/* Timings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Timings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Service
                  </label>
                  <input
                    type="text"
                    value={formData.firstService}
                    onChange={(e) => setFormData({...formData, firstService: e.target.value})}
                    placeholder="e.g., 6:00 AM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Service
                  </label>
                  <input
                    type="text"
                    value={formData.lastService}
                    onChange={(e) => setFormData({...formData, lastService: e.target.value})}
                    placeholder="e.g., 10:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  placeholder="e.g., Every 15 minutes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Route Identifier */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Identifier</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                    <option value="Yellow">Yellow</option>
                    <option value="White">White</option>
                    <option value="Orange">Orange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local Name
                  </label>
                  <input
                    type="text"
                    value={formData.localName}
                    onChange={(e) => setFormData({...formData, localName: e.target.value})}
                    placeholder="e.g., Medical Wala"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Local Tips */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Tips (Optional)
              </label>
              <textarea
                value={formData.tip}
                onChange={(e) => setFormData({...formData, tip: e.target.value})}
                placeholder="Share any helpful tips for travelers on this route..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    {editId ? 'Update Route' : 'Add Route'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
