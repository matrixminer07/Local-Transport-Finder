'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'
import { useLoadScript } from '@react-google-maps/api'

const libraries: ('places')[] = ['places']

interface SearchBarProps {
  onSearch: (from: string, to: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const fromInputRef = useRef<HTMLInputElement>(null)
  const toInputRef = useRef<HTMLInputElement>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  useEffect(() => {
    if (isLoaded && fromInputRef.current && toInputRef.current) {
      const fromAutocomplete = new google.maps.places.Autocomplete(fromInputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'in' },
      })

      const toAutocomplete = new google.maps.places.Autocomplete(toInputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'in' },
      })

      fromAutocomplete.addListener('place_changed', () => {
        const place = fromAutocomplete.getPlace()
        if (place.name) {
          setFrom(place.name)
        }
      })

      toAutocomplete.addListener('place_changed', () => {
        const place = toAutocomplete.getPlace()
        if (place.name) {
          setTo(place.name)
        }
      })
    }
  }, [isLoaded])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (from && to) {
      setIsSearching(true)
      setTimeout(() => {
        onSearch(from, to)
        setIsSearching(false)
      }, 300)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
          <input
            ref={fromInputRef}
            type="text"
            placeholder="From (e.g., Railway Station)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
            required
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
          <input
            ref={toInputRef}
            type="text"
            placeholder="To (e.g., Medical College)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!from || !to || isSearching}
          className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Find Routes
            </>
          )}
        </button>
      </div>
    </form>
  )
}
