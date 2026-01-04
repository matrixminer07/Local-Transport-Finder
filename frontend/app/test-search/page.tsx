'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/search/SearchBarOptimized'

export default function TestSearchPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Search Test Page</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Test Search Functionality</h2>
          <SearchBar onSearch={(from, to) => {
            console.log('Searching for:', from, to)
            alert(`Searching from ${from} to ${to}`)
            // Uncomment below to test navigation
            // router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
          }} />
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Type "Railway" in the From field</li>
            <li>Type "Medical" in the To field</li>
            <li>Click "Find Routes" button</li>
            <li>Should see an alert with search terms</li>
            <li>Check browser console for search logs</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
