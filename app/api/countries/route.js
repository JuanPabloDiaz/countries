/**
 * Retrieves a list of countries from the countries.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the countries data.
 */

import countriesData from '@/data/countries.json'
import { NextResponse } from 'next/server'
import { validateImageUrl } from '@/utils/imageUrl'

export async function GET() {
  // Transform countries data to match the expected format
  const transformedCountries = countriesData.map(country => {
    // Create a slug from the name
    const slug = country.name.toLowerCase().replace(/\s+/g, '-')
    
    return {
      id: country.id,
      name: country.name,
      slug: slug,
      avatar: validateImageUrl(country.media?.flag, country.name),
      abbreviation: country.abbreviation,
      capital: country.capital,
      currency: country.currency,
      population: country.population
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ countries: transformedCountries })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  return response
}
