'use client'

// Simple search bar - WORKING VERSION
import { useState } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'

interface SearchBarProps {
  onSearch: (from: string, to: string) => void
}

export default function SearchBarSimple({ onSearch }: SearchBarProps) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [isSearching, setIsSearching] = useState(false)

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
