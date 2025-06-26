/**
 * Simple homepage that displays countries from the API
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch countries directly from the API
    async function fetchCountries() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/countries?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched countries:', data)
        setCountries(data.countries || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching countries:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Countries...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Countries</h1>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Countries of the World</h1>
      <p className="mb-4">Total countries: {countries.length}</p>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {countries.map(country => (
          <div key={country.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="p-2 bg-blue-600 text-white text-center font-bold truncate">
              {country.name}
            </div>
            <div className="p-2 flex items-center justify-center h-32">
              <Image 
                src={country.avatar} 
                alt={`Flag of ${country.name}`} 
                width={150}
                height={100}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="px-2 py-1 bg-gray-100 text-center text-sm">
              <p>Capital: {country.capital || 'N/A'}</p>
            </div>
            <Link 
              href={`/countries/${country.slug}`}
              className="block text-center bg-blue-500 text-white py-2 hover:bg-blue-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
