'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function APITest() {
  const [status, setStatus] = useState('Loading...')
  const [data, setData] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      const response = await api.get('/health')
      setStatus('✅ Connected!')
      setData(response.data)
    } catch (error) {
      setStatus('❌ Connection failed')
      console.error('API Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Backend Status</h2>
          <p className="text-lg">{status}</p>
        </div>

        {data && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Backend Response</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <button
          onClick={testConnection}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Test Again
        </button>
      </div>
    </div>
  )
}
