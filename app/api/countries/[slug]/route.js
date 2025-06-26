/**
 * Retrieves a country's details based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the country.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the country details, or an error response.
 */

import countriesData from '@/data/countries.json'
import { NextResponse } from 'next/server'
import { validateImageUrl } from '@/utils/imageUrl'

export async function GET(req, { params }) {
  try {
    // Find the country by name converted to slug format
    const country = countriesData.find(
      item => item.name.toLowerCase().replace(/\s+/g, '-') === params.slug
    )
    
    if (!country) {
      return new NextResponse('not found', { status: 404 })
    }

    // Create a slug from the name
    const slug = country.name.toLowerCase().replace(/\s+/g, '-')
    
    // Create fallback text for images
    const flagText = country.name;
    const emblemText = `${country.name} Emblem`;
    const mapText = `${country.name} Map`;
    
    // Create an enhanced country object with additional fields
    const enhancedCountry = {
      id: country.id,
      name: country.name,
      slug: slug,
      abbreviation: country.abbreviation,
      capital: country.capital,
      currency: country.currency,
      phone: country.phone,
      population: country.population,
      description: `${country.name} is a country with capital ${country.capital}.`,
      avatar: validateImageUrl(country.media?.flag, flagText),
      images: [
        validateImageUrl(country.media?.emblem, emblemText),
        validateImageUrl(country.media?.orthographic, mapText)
      ]
    }

    // Generate some facts about the country
    const country_facts = [
      { fact: `The capital of ${country.name} is ${country.capital || 'unknown'}.` },
      { fact: `${country.name} uses ${country.currency || 'unknown'} as its currency.` },
      { fact: country.population ? `${country.name} has a population of approximately ${country.population.toLocaleString()}.` : `Population data for ${country.name} is not available.` }
    ]

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      country: enhancedCountry,
      country_facts
    })
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching country:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
