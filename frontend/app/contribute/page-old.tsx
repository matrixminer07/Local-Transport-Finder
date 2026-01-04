'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MapPin, Clock, IndianRupee, Plus, X, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '@/lib/api'
import { toast } from 'sonner'

export default function ContributePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [stops, setStops] = useState<Array<{ name: string }>>([])
  const [stopInput, setStopInput] = useState('')

  const editId = searchParams.get('edit')

  const [formData, setFormData] = useState({
    from: { name: '' },
    to: { name: '' },
    transportType: 'Shared Auto',
    fare: { min: '', max: '', studentDiscount: false },
    timings: {
      firstService: '6:00 AM',
      lastService: '10:00 PM',
      frequency: 'Every 15 minutes'
    },
    identifier: {
      color: 'Blue',
      localName: ''
    },
    tips: ''
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
        from: { name: formData.from.name },
        to: { name: formData.to.name },
        transportType: formData.transportType,
        fare: {
          min: parseInt(formData.fare.min),
          max: parseInt(formData.fare.max),
          studentDiscount: formData.fare.studentDiscount
        },
        timings: formData.timings,
        stops: stops.map(stop => ({ name: stop.name })),
        identifier: formData.identifier,
        tips: formData.tips
      }

      // Mock API call - replace with actual API
      console.log('Submitting route:', routeData)
      toast.success('Route submitted successfully! It will be reviewed by our team.')
      
      // Reset form
      setFormData({
        from: { name: '' },
        to: { name: '' },
        transportType: 'Shared Auto',
        fare: { min: '', max: '', studentDiscount: false },
        timings: {
          firstService: '6:00 AM',
          lastService: '10:00 PM',
          frequency: 'Every 15 minutes'
        },
        identifier: {
          color: 'Blue',
          localName: ''
        },
        tips: ''
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
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add a New Route</h1>
          <p className="text-gray-600 mb-8">
            Help your community by sharing local transport information
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <input
                  ref={fromInputRef}
                  type="text"
                  required
                  className="flex-1 bg-transparent outline-none"
                  placeholder="e.g., Railway Station"
                />
              </div>
            </div>

            {/* To Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                <input
                  ref={toInputRef}
                  type="text"
                  required
                  className="flex-1 bg-transparent outline-none"
                  placeholder="e.g., Medical College"
                />
              </div>
            </div>

            {/* Transport Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.transportType}
                onChange={(e) => setFormData({ ...formData, transportType: e.target.value })}
                className="w-full p-4 bg-gray-50 rounded-lg outline-none"
                required
              >
                <option value="Shared Auto">Shared Auto</option>
                <option value="Private Bus">Private Bus</option>
                <option value="City Bus">City Bus</option>
                <option value="E-rickshaw">E-rickshaw</option>
              </select>
            </div>

            {/* Color & Local Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-4 bg-gray-50 rounded-lg outline-none"
                  required
                >
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                  <option value="White">White</option>
                  <option value="Orange">Orange</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.localName}
                  onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                  className="w-full p-4 bg-gray-50 rounded-lg outline-none"
                  placeholder="e.g., College Auto"
                  required
                />
              </div>
            </div>

            {/* Stops */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intermediate Stops (Optional)
              </label>
              <div className="space-y-2">
                {stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="flex-1">{stop.name}</span>
                    <button
                      type="button"
                      onClick={() => removeStop(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    ref={stopInputRef}
                    type="text"
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Add a stop and press enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addStop()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addStop}
                    className="text-primary hover:text-blue-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Fare */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fare Range <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.fareMin}
                    onChange={(e) => setFormData({ ...formData, fareMin: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Min"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.fareMax}
                    onChange={(e) => setFormData({ ...formData, fareMax: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Max"
                    required
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={formData.studentDiscount}
                  onChange={(e) => setFormData({ ...formData, studentDiscount: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Student discount available</span>
              </label>
            </div>

            {/* Timings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Timings <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.firstService}
                    onChange={(e) => setFormData({ ...formData, firstService: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.lastService}
                    onChange={(e) => setFormData({ ...formData, lastService: e.target.value })}
                    className="flex-1 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full p-4 bg-gray-50 rounded-lg outline-none mt-2"
                placeholder="Frequency (e.g., Every 10 mins)"
              />
            </div>

            {/* Local Tip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Tip (Optional)
              </label>
              <textarea
                value={formData.tip}
                onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
                className="w-full p-4 bg-gray-50 rounded-lg outline-none resize-none"
                rows={3}
                placeholder="Any helpful tips for travelers? e.g., 'Crowded after 5 PM'"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Submit Route
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
