/**
 * Simple homepage that displays countries from the API
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'
import { TbSearch, TbRefresh, TbMapPin, TbInfoCircle } from 'react-icons/tb'

export default function HomePage() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [region, setRegion] = useState('')

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

  // Filter countries based on search term and region
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (country.capital && country.capital.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRegion = region === '' || (country.region && country.region.toLowerCase() === region.toLowerCase())
    return matchesSearch && matchesRegion
  })

  // Get unique regions for filter dropdown
  const regions = [...new Set(countries.filter(c => c.region).map(c => c.region))].sort()

  if (loading) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold">Loading Countries...</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch the data</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg mb-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">Error Loading Countries</h1>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary inline-flex items-center"
            >
              <TbRefresh className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <main>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <Container size="lg">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">Explore the World's Flags</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Discover information about {countries.length} countries and their flags</p>
            
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by country or capital..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Countries grid */}
      <Container size="lg" className="py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {region ? `${region} Countries` : 'All Countries'}
            <span className="text-sm font-normal ml-2 text-gray-500 dark:text-gray-400">({filteredCountries.length})</span>
          </h2>
        </div>
        
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">No countries found matching your criteria</p>
            <button 
              onClick={() => {setSearchTerm(''); setRegion('')}} 
              className="btn btn-primary mt-4"
            >
              <TbRefresh className="mr-2" />
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCountries.map(country => (
              <div key={country.id} className="card group">
                <div className="card-header bg-blue-600 dark:bg-blue-700 text-white text-center font-bold truncate">
                  {country.name}
                </div>
                <div className="p-4 flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                  <Image 
                    src={country.avatar} 
                    alt={`Flag of ${country.name}`} 
                    width={200}
                    height={120}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300 mb-1">
                    <TbMapPin className="text-blue-500" />
                    <span>{country.capital || 'N/A'}</span>
                  </div>
                  {country.region && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{country.region}</div>
                  )}
                </div>
                <Link 
                  href={`/countries/${country.slug}`}
                  className="flex items-center justify-center gap-2 text-center bg-blue-500 hover:bg-blue-600 text-white py-3 transition-colors"
                >
                  <TbInfoCircle />
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}
