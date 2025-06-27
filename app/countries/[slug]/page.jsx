'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'
import { TbArrowLeft, TbMapPin, TbCurrency, TbPhone, TbUsers, TbWorld, TbInfoCircle, TbBulb } from 'react-icons/tb'

export default function CountryDetailPage() {
  const params = useParams()
  const { slug } = params
  
  const [country, setCountry] = useState(null)
  const [facts, setFacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(null)

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
        
        // Set first image as active if images exist
        if (data.country && data.country.images && data.country.images.length > 0) {
          setActiveImage(data.country.images[0])
        }
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
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold">Loading Country Details...</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch the data</p>
        </div>
      </Container>
    )
  }

  if (error || !country) {
    return (
      <Container size="lg" className="py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg mb-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">Error Loading Country Details</h1>
            <p className="text-red-600 dark:text-red-300 mb-4">{error || 'Country not found'}</p>
            <Link href="/" className="btn btn-primary">
              <TbArrowLeft className="mr-2" />
              Back to Countries
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <main>
      {/* Hero section with flag */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <Container size="lg">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <TbArrowLeft className="mr-1" />
            Back to Countries
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/2] overflow-hidden rounded-lg shadow-lg border-4 border-white dark:border-gray-700">
                <Image 
                  src={country.avatar} 
                  alt={`Flag of ${country.name}`} 
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-2">
                {country.region || 'Unknown Region'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">{country.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center md:justify-start gap-1">
                <TbWorld className="text-blue-500" />
                <span>Abbreviation: </span>
                <span className="font-semibold">{country.abbreviation}</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    <TbMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
                    <p className="font-medium">{country.capital || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400">
                    <TbCurrency size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                    <p className="font-medium">{country.currency || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    <TbPhone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Code</p>
                    <p className="font-medium">{country.phone || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                    <TbUsers size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                    <p className="font-medium">{country.population ? country.population.toLocaleString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Facts section */}
      {facts.length > 0 && (
        <Container size="lg" className="py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <TbBulb className="text-amber-500" size={24} />
              <h2 className="text-2xl font-bold">Interesting Facts</h2>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                {facts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item.fact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      )}
      
      {/* Gallery section */}
      {country.images && country.images.length > 0 && (
        <Container size="lg" className="py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <TbInfoCircle className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold">Photo Gallery</h2>
            </div>
            
            <div className="p-6">
              {/* Main image display */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative w-full h-[400px]">
                  <Image 
                    src={activeImage || country.images[0]} 
                    alt={`${country.name} featured image`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {country.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${activeImage === image ? 'border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                    onClick={() => setActiveImage(image)}
                  >
                    <div className="relative w-full aspect-square">
                      <Image 
                        src={image} 
                        alt={`${country.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      )}
    </main>
  )
}
