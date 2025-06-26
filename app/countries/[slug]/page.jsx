'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function CountryDetailPage() {
  const params = useParams()
  const { slug } = params
  
  const [country, setCountry] = useState(null)
  const [facts, setFacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCountryDetails() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/countries/${slug}?t=${timestamp}`, {
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
        console.log('Fetched country details:', data)
        setCountry(data.country || null)
        setFacts(data.country_facts || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching country details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    if (slug) {
      fetchCountryDetails()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Country Details...</h1>
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Country Details</h1>
        <p className="text-red-500">{error || 'Country not found'}</p>
        <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Back to Countries
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-block mb-4 text-blue-500 hover:underline">
        &larr; Back to Countries
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold">{country.name}</h1>
          <p className="text-sm opacity-80">Abbreviation: {country.abbreviation}</p>
        </div>
        
        <div className="p-4 md:flex">
          <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
            <Image 
              src={country.avatar} 
              alt={`Flag of ${country.name}`} 
              width={300}
              height={200}
              className="max-w-full max-h-64 object-contain border"
            />
          </div>
          
          <div className="md:w-2/3 md:pl-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Country Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-gray-100 p-2 rounded">
                  <span className="font-semibold">Capital:</span> {country.capital || 'N/A'}
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <span className="font-semibold">Currency:</span> {country.currency || 'N/A'}
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <span className="font-semibold">Phone Code:</span> {country.phone || 'N/A'}
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <span className="font-semibold">Population:</span> {country.population ? country.population.toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Facts</h2>
              <ul className="list-disc pl-5 space-y-1">
                {facts.map((item, index) => (
                  <li key={index} className="text-gray-700">{item.fact}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <h2 className="text-xl font-semibold mb-2">Additional Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.images && country.images.map((image, index) => (
              <div key={index} className="border rounded overflow-hidden">
                <Image 
                  src={image} 
                  alt={`${country.name} image ${index + 1}`} 
                  width={400}
                  height={300}
                  className="w-full h-48 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
